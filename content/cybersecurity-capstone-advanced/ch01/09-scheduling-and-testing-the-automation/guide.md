# Lesson 9 — Scheduling and Testing the Automation

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 9 of 26**

## What you'll learn

- Why Mara schedules the Lesson 8 script as an Azure Automation Runbook
  rather than a cron job on a server someone has to remember exists
- The exact test case used to validate the script catches direct,
  non-group access before it's trusted in production
- Why idempotency matters for a script that runs unattended, every day
- How this lesson closes out the target architecture and sets up the GRC
  risk register and compliance audit that follow

## Choosing where the script runs: Azure Automation Runbook

A script that only runs when someone remembers to run it isn't automation —
it's a manual process with extra steps. Mara has two realistic scheduling
options: a cron job on a Linux jump host, or an **Azure Automation
Runbook**. Since Hartwell's identity plane is now centered on Entra ID
(Lesson 6), and Azure Automation Runbooks can run a Python 3 runbook using a
system-assigned **managed identity** — meaning the runbook authenticates to
Microsoft Graph and Azure Resource Manager with no stored secret at all —
Mara chooses the runbook. It removes exactly the kind of standing credential
this whole capstone has been trying to eliminate.

The runbook is configured with a daily schedule, running at **03:00 UTC**,
chosen deliberately outside Hartwell's business hours so a transient API
throttling response doesn't compete with real traffic, and early enough
that a failure gets investigated the same morning rather than discovered a
day later:

```
Runbook: ScadaAccessInventory-Daily
  Type: Python 3 (managed identity)
  Schedule: Daily at 03:00 UTC
  Identity: System-assigned managed identity,
            granted Security Reader (Graph) + Reader (scoped to
            rg-hartwell-scada-prod) — read-only, nothing more
```

The managed identity is deliberately scoped read-only. This script's job is
to report on access, not to change it — giving it write permissions would
widen its own blast radius for no benefit.

## The test case: proving the direct-access gap actually gets caught

Before trusting this script's output, Mara runs one deliberate test. She
has the AWS team temporarily attach the `SCADA-Emergency-Access` policy
**directly** to a disposable test account, `svc-scada-test-01` — explicitly
not adding that account to the `scada-ot-admins` group:

1. Run the script. **Expected:** `svc-scada-test-01` appears in the output
   with `access_path: "direct_assignment"`, and `scada-ot-admins` group
   membership is unaffected.
2. Detach the policy from the test account. Run the script again.
   **Expected:** `svc-scada-test-01` no longer appears at all.
3. Re-run the script a second time with no changes in between.
   **Expected:** identical output both times — same accounts, same
   `access_path` values, same counts.

Step 1 is the test that matters most for this whole capstone: it's direct
proof that the script catches exactly the kind of access a group-
membership-only review would miss, before that capability is ever relied on
for a real finding. Step 3 validates something just as important for a
script that will run unattended every day: **idempotency** — running it
twice with no underlying change produces the same result both times, which
is what makes a daily schedule trustworthy instead of a source of
false-looking "changes" that are really just inconsistent output.

## Error handling for an unattended daily run

A script a human watches can fail loudly and get manually re-run. A script
running unattended at 3 a.m. needs to handle its own failures:

```python
import logging

logging.basicConfig(level=logging.INFO)

try:
    inventory = build_scada_access_inventory()
    ingest_to_sentinel(inventory, table="ScadaAccessInventory_CL")
    logging.info(f"Ingested {inventory['total_unique_accounts_with_scada_access']} records successfully")
except requests.exceptions.RequestException as e:
    logging.error(f"API call failed: {e}")
    raise  # surfaces as a failed runbook run -> alerts the on-call engineer
```

A failed run has to be visible — surfaced as a failed Azure Automation job,
alerting on-call — rather than silently skipped, because a silent failure
here means `ScadaAccessInventory_CL` quietly goes stale with nobody aware of
it.

## Running cleanly in production

With the test case passed and error handling in place, the runbook goes
live on its daily schedule. `ScadaAccessInventory_CL` now refreshes every
morning with no manual step, giving Hartwell a current, queryable answer to
"who has standing access to the OT/SCADA boundary" for the first time in
the company's history. That inventory becomes the direct input to Lesson
10's GRC risk register — and, separately and independently, it's about to
be checked against a compliance audit's own count in Lesson 11, which is
where this capstone's central discrepancy begins.

## Key terms

| Term | Meaning |
|---|---|
| Azure Automation Runbook | A scheduled, serverless script execution in Azure, able to authenticate via a managed identity with no stored secret |
| Managed identity | An Azure-managed identity automatically assigned to a resource, eliminating the need for a stored credential |
| Idempotency | A property where running the same operation multiple times with no underlying change produces the same result every time |
| `access_path: "direct_assignment"` | The exact value this script's test case confirms it correctly assigns to a non-group-based access grant |

## Lab

1. Write the three steps of the test case in order, and state the expected
   result of each step.
2. Explain why the managed identity is scoped read-only rather than given
   write access to Entra ID or AWS.
3. Explain, in one sentence, why idempotency matters specifically for a
   script that runs unattended on a daily schedule.

## Check yourself

You're ready for Lesson 10 when you can describe the full test case from
memory, explain why Azure Automation Runbook with a managed identity was
chosen over a cron job with a stored credential, and explain why this
lesson's successful production run is what the GRC risk register and the
coming compliance audit comparison both depend on.
