# Lesson 18 — Automating Ticket Creation and Updates from an Alert

**Chapter 5 · Security Orchestration Across Tools · Lesson 2 of 4**

## What you'll learn

- The generic REST pattern almost every ticketing or case-management
  system shares: create, update, and comment on a case
- How to map an alert's severity onto a ticket's priority field
- How to avoid opening a duplicate ticket every time the same
  underlying alert fires or retries
- How to append follow-up context to an existing ticket instead of
  spamming a new one

## From a verified webhook event to a real case

Lesson 17 left you with a verified, deduplicated alert sitting inside
`process_alert`. On its own, that alert is just a Python dict — nobody
on the security team sees it unless it becomes something they actually
work from, and for most teams that means a ticket in a case-management
system: Jira, ServiceNow, a homegrown case tool, whatever the team
already lives in day to day. The automation's job isn't to replace that
system, it's to populate it correctly and quickly, the same way a human
analyst would if they were triaging the alert by hand at 2 a.m.

This lesson treats "the ticketing tool" generically, because the exact
product doesn't matter nearly as much as the pattern — almost every
ticketing REST API exposes the same three operations: create a case,
update fields on an existing case, and add a comment to a case's
timeline. Once you understand that pattern, adapting it to whichever
specific tool your employer uses is a matter of reading one API
reference, not relearning the approach.

## Creating a ticket from an alert

A create call is a POST with a JSON body describing the new case. The
interesting part isn't the HTTP call itself — it's deciding what goes
into the body:

```python
import requests

def create_ticket(alert: dict) -> dict:
    severity_to_priority = {"critical": "P1", "high": "P2", "medium": "P3", "low": "P4"}
    body = {
        "title": f"[{alert['source_tool']}] {alert['title']}",
        "description": alert["description"],
        "priority": severity_to_priority.get(alert["severity"], "P4"),
        "external_ref": alert["event_id"],  # ties the ticket back to the source alert
    }
    resp = requests.post(
        "https://tickets.internal.example.com/api/cases",
        json=body,
        headers={"Authorization": f"Bearer {API_TOKEN}"},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()
```

Two fields do real work here. `priority` translates the alert's own
severity into whatever scale the ticketing tool uses, so a critical
finding doesn't quietly land in a queue sorted by creation time. And
`external_ref` stores the original alert's `event_id` on the ticket
itself — that's what lets your automation find this ticket again
later without keeping its own separate database.

## Avoiding duplicate tickets

If the same alert can fire more than once — a recurring detection rule,
a retried webhook, a correlated alert from two different tools for one
real incident — creating a ticket every single time floods the queue
analysts actually have to work. Before creating, search for an
existing open ticket with the same `external_ref`:

```python
def find_existing_ticket(event_id: str) -> dict | None:
    resp = requests.get(
        "https://tickets.internal.example.com/api/cases",
        params={"external_ref": event_id, "status": "open"},
        headers={"Authorization": f"Bearer {API_TOKEN}"},
        timeout=10,
    )
    resp.raise_for_status()
    results = resp.json().get("results", [])
    return results[0] if results else None

def create_or_update_ticket(alert: dict) -> dict:
    existing = find_existing_ticket(alert["event_id"])
    if existing:
        add_comment(existing["id"], f"Alert recurred at {alert['observed_at']}")
        return existing
    return create_ticket(alert)
```

This is the same idempotency instinct from the webhook lesson, applied
one layer up the stack: the webhook's dedupe check stops you from
processing the same delivery twice, and this check stops you from
opening the same case twice even when two genuinely different alerts
describe the same underlying problem.

## Updating and commenting on an existing case

Most ticketing APIs separate "change a field" from "add a note,"
because they render differently in the case's timeline. A field update
is a PATCH or PUT against the case; a comment is its own POST to a
sub-resource:

```python
def add_comment(ticket_id: str, text: str) -> None:
    requests.post(
        f"https://tickets.internal.example.com/api/cases/{ticket_id}/comments",
        json={"body": text},
        headers={"Authorization": f"Bearer {API_TOKEN}"},
        timeout=10,
    ).raise_for_status()

def escalate_ticket(ticket_id: str) -> None:
    requests.patch(
        f"https://tickets.internal.example.com/api/cases/{ticket_id}",
        json={"priority": "P1", "status": "in_progress"},
        headers={"Authorization": f"Bearer {API_TOKEN}"},
        timeout=10,
    ).raise_for_status()
```

Keeping those as two small, separate functions matters once your
automation grows — enrichment steps later in a playbook can call
`add_comment` to leave an audit trail ("checked threat intel, IP has
no prior reputation hits") without ever touching the ticket's status,
while a genuinely new, more severe signal is the only thing that should
call `escalate_ticket`.

## Key terms

| Term | Meaning |
|---|---|
| `external_ref` | A field stored on the ticket holding the originating alert's ID, used to find the same ticket again later |
| Priority mapping | Translating a security tool's severity scale (critical/high/medium/low) into the ticketing system's own priority field |
| Dedupe-before-create | Searching for an existing open ticket by `external_ref` before creating a new one, to avoid duplicate cases |
| Comment vs. update | Appending context to a case's timeline (comment) versus changing a tracked field like priority or status (update) |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: why
does storing the original alert's `event_id` as `external_ref` on the
ticket matter, and what specifically would go wrong for the security
team's queue if you skipped the dedupe-before-create check?
