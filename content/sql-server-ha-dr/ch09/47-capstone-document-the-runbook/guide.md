# Capstone: Document the Runbook

Lessons 45 and 46 proved AG_Bellhaven works — a planned failover and a forced disaster failover
both succeeded. But the knowledge of *how* they succeeded currently lives in the head of whoever
ran the test. Chapter 8's "DR Testing & Runbooks" lesson made the case that a plan nobody but its
author can execute isn't really a plan. This lesson writes the actual runbook Bellhaven's on-call
team would use during a real incident, at 3 AM, without the person who built AG_Bellhaven on the
phone.

## What you'll learn

- What a real runbook needs that a lesson's narrative explanation doesn't
- The decision tree that routes an incident to the right procedure
- Why the runbook has to include verification steps and rollback, not just the failover command

## What makes this different from what Lessons 45 and 46 already covered

Those lessons explained *why* each command was correct. A runbook can't assume the reader has
that context at 3 AM under pressure — it has to be usable by whoever is on call, verbatim, with
no interpretation required. Bellhaven's runbook for AG_Bellhaven has four sections.

## Section 1: trigger criteria and decision tree

The first job of any runbook is routing the incident to the right procedure before any command
runs:

```text
IS SQLPRD01 (primary) unreachable?
  NO  → not a failover event. Investigate the actual symptom first.
  YES → Is SQLPRD02 reachable and showing SYNCHRONIZED?
          YES → LOCAL FAILURE. Run Procedure A (planned/automatic failover, Lesson 45).
          NO  → Is SQLDR01 the only reachable replica?
                  YES → SITE DISASTER. Escalate to IT Director before Procedure B.
                        Confirm this is a real, declared disaster — not a network blip —
                        because Procedure B accepts possible data loss.
```

The escalation gate before Procedure B is deliberate: `FORCE_FAILOVER_ALLOW_DATA_LOSS` should
never be a decision the on-call DBA makes alone under time pressure without a second person
confirming the scope of the outage.

## Section 2: the procedures themselves

**Procedure A — local failure (Lesson 45's command):**

```sql
-- Run on SQLPRD02
ALTER AVAILABILITY GROUP AG_Bellhaven FAILOVER;
```

**Procedure B — declared site disaster (Lesson 46's command), only after escalation:**

```sql
-- Run on SQLDR01 — after IT Director confirms this is a real disaster
ALTER AVAILABILITY GROUP AG_Bellhaven FORCE_FAILOVER_ALLOW_DATA_LOSS;
```

## Section 3: verification checklist (identical after either procedure)

- `sys.dm_hadr_availability_replica_states` confirms the intended replica is now `PRIMARY`
- `sys.dm_hadr_database_replica_states` shows `SYNCHRONIZED` (Procedure A) or a known state
  (Procedure B — expect `SYNCHRONIZING` while SQLPRD01/02 are absent)
- Application connectivity confirmed through `BHFS-AGL`, not a hardcoded server name
- For Procedure B only: measure and log the actual data-loss window (Lesson 46) before declaring
  recovery complete

## Section 4: communication and rollback

Every runbook entry names who gets notified and when — Bellhaven's calls for notifying the IT
Director immediately on any Procedure A event, and the VP of Operations plus IT Director
immediately on any Procedure B event, given the customer-facing dispatch impact. Rollback for
Procedure A is simply re-running the same command targeting the original primary once the root
cause is fixed. Procedure B has no simple rollback — recovering Columbus means rejoining SQLPRD01
and SQLPRD02 as new secondaries under SQLDR01, per Lesson 46, not reverting anything.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | A step-by-step, usable-without-context procedure document for a specific incident type |
| Decision tree | The routing logic that determines which procedure an incident actually calls for |
| Escalation gate | A required second-person confirmation before an irreversible or data-loss-accepting step |
| Rollback | The defined way to reverse a procedure once its root cause is resolved — only meaningful for Procedure A here |

## Check yourself

Why does Bellhaven's runbook require IT Director escalation before Procedure B, but not before
Procedure A?
