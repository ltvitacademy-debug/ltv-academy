# Lesson 29 — Lab: Building an End-to-End Detection-to-Containment Script

**Chapter 8 · Capstone: An Automated Detection-to-Response Pipeline · Lesson 29 of 32**

## What you'll learn

- How to structure a polling loop that pulls only new, high-severity findings
  from a SIEM instead of re-processing everything on every run
- How to chain enrichment onto a raw finding before any decision gets made,
  the same pattern Chapter 4's threat-intel lessons and Chapter 3's SOAR
  lessons both built toward
- How to build a containment action as data first — a proposed action a human
  or gate can inspect — before any code is allowed to execute it
- Why `dry_run=True` has to be the function's default, not an optional flag
  someone has to remember to pass

## The scenario

Bramwell Logistics runs a lean three-person SOC watching a Microsoft Sentinel
workspace. Every high-severity incident Sentinel raises currently waits for a
human to open it, check the flagged user's recent sign-ins by hand, and decide
whether to revoke their session. That manual lookup takes ten to fifteen
minutes per incident — and at 2 a.m., with one analyst on shift, it's the
reason some real containments happen hours later than they should. This
lesson builds the pipeline that every earlier chapter in this course was
aimed at: a script that polls for new high-severity findings, enriches each
one automatically, and prepares — but never silently executes — a
containment action.

## Step 1: poll for only what's new

Re-running a fresh query against every incident in the workspace on every pass
would re-process the same findings endlessly. The script tracks which
incident IDs it has already handled, and only looks at a rolling time window
for the rest:

```python
import json
import time
from pathlib import Path

PROCESSED_FILE = Path("processed_findings.json")
POLL_INTERVAL_SECONDS = 300
SEVERITY_FLOOR = {"High", "Critical"}

def load_processed_ids():
    if PROCESSED_FILE.exists():
        return set(json.loads(PROCESSED_FILE.read_text()))
    return set()

def save_processed_ids(ids):
    PROCESSED_FILE.write_text(json.dumps(sorted(ids)))

def poll_sentinel_incidents(sentinel_client, since_iso):
    """Returns only High/Critical incidents created or updated since since_iso."""
    incidents = sentinel_client.incidents.list(
        filter=f"properties/createdTimeUtc ge {since_iso}"
    )
    return [i for i in incidents if i.properties.severity in SEVERITY_FLOOR]
```

The severity filter happens in Python, not just in the query string, because
different Sentinel API versions and data connectors don't always expose
severity the same way in server-side filters — Chapter 2 already covered why
you double-check what an API actually returned instead of trusting the filter
alone.

## Step 2: enrich before anything is decided

A bare incident object is just an ID, a severity, and an owner. The script
pulls the flagged user's recent sign-ins through Microsoft Graph and checks
any unfamiliar source IPs against a threat-intel lookup — the exact pattern
Chapter 4 built, now feeding a live pipeline instead of a batch job:

```python
def enrich_incident(incident, graph_client, intel_client):
    user = incident.properties.owner.user_principal_name
    recent_sign_ins = graph_client.sign_ins.list(user_id=user, top=10)
    unfamiliar_ips = [s.ip_address for s in recent_sign_ins if s.risk_level != "none"]
    intel_hits = [intel_client.lookup_ip(ip) for ip in unfamiliar_ips]

    return {
        "incident_id": incident.name,
        "user": user,
        "unfamiliar_ips": unfamiliar_ips,
        "intel_hits": intel_hits,
    }
```

Everything returned here is read-only lookup data. Nothing in this function
can change a single thing about the user's account — that separation matters
for what comes next.

## Step 3: propose the action as data, not as a side effect

The script never jumps straight from "enriched data" to "disable the
account." It first builds a plain, inspectable description of the action it
*wants* to take:

```python
def propose_containment(enriched):
    """Builds the action but does not execute it."""
    return {
        "action": "revoke_refresh_tokens",
        "target_user": enriched["user"],
        "scope": "single_user",
        "reason": f"High-severity incident; {len(enriched['intel_hits'])} known-bad IP match(es)",
    }
```

A dict is a deliberate choice here. It can be printed, logged, posted to a
Teams channel for the Chapter 5 ChatOps-style approval step, or handed to a
unit test — all without a single real credential being touched.

## Step 4: gate the one function that actually acts

Exactly one function in this entire pipeline is allowed to change account
state, and it refuses to run unattended:

```python
def execute_containment(action, graph_client, dry_run=True, approved_by=None):
    if dry_run:
        print(f"[DRY RUN] Would execute: {action}")
        return {"executed": False, "action": action}

    if approved_by is None:
        raise RuntimeError(
            "Containment actions require an approved_by value -- refusing to run unattended."
        )

    graph_client.users.revoke_sign_in_sessions(user_id=action["target_user"])
    return {"executed": True, "action": action, "approved_by": approved_by}
```

Two separate guardrails stack here: `dry_run=True` is the default, so a
script run without thinking about it logs instead of acting, and even with
`dry_run=False` explicitly set, a missing `approved_by` still blocks
execution. This is the Chapter 3 approval-gate lesson and the Lesson 12
containment-and-approval pattern, written as code instead of described as a
diagram.

## Step 5: wire the loop together

```python
def run_pipeline(sentinel_client, graph_client, intel_client, dry_run=True):
    since = iso_minutes_ago(POLL_INTERVAL_SECONDS // 60)
    processed = load_processed_ids()

    for incident in poll_sentinel_incidents(sentinel_client, since):
        if incident.name in processed:
            continue

        enriched = enrich_incident(incident, graph_client, intel_client)
        action = propose_containment(enriched)
        post_to_approval_channel(action)  # Chapter 5's ChatOps pattern
        execute_containment(action, graph_client, dry_run=dry_run)
        processed.add(incident.name)

    save_processed_ids(processed)

while True:
    run_pipeline(sentinel_client, graph_client, intel_client, dry_run=True)
    time.sleep(POLL_INTERVAL_SECONDS)
```

## Step 6: prove it against a fixture before it ever sees Sentinel

Before this runs against a live workspace, test it against a canned incident
object with a known user and a known set of risky IPs, asserting that
`propose_containment` builds the expected action dict and that
`execute_containment` with `dry_run=True` never calls
`graph_client.users.revoke_sign_in_sessions` at all. Chapter 5's lesson on
error handling and idempotency already covered why: re-running this script
twice against the same incident must never revoke the same user's session
twice, and the `processed` set plus a dry-run-by-default execute function are
what guarantee that.

## Key terms

| Term | Meaning |
|---|---|
| Processed-ID tracking | Storing which finding IDs a pipeline has already handled, so re-running the poll loop doesn't reprocess old incidents |
| Proposed action | A plain data structure describing a containment action before anything executes it — inspectable, loggable, testable |
| Dry-run default | `dry_run=True` as a function's default value, so a script run without an explicit override only logs, never acts |
| Approval gate | A required parameter (like `approved_by`) that a dangerous function refuses to run without, even when dry-run is turned off |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does
`execute_containment` check for `dry_run` *and* `approved_by` separately,
instead of relying on just one of those two guards?
