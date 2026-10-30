# Lesson 14 — Tracing the Real Sequence of Events

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 14 of 26**

## What you'll learn

- How Mara traces each of the 5 accounts back to how it actually got its access
- The real incident all 5 accounts trace back to: the Substation 12 outage
- What Hartwell's break-glass emergency-access procedure actually requires — and where it broke down
- Why this is a sequence of events, not a single mistake

## Starting from the access, working backward

Lesson 13 narrowed the question to exactly 5 accounts. Mara's next step is to trace each one back to its origin: when was this specific grant made, by what mechanism, and under what authorization. She pulls each account's access history — Microsoft Entra ID sign-in and audit logs on the Azure side, AWS CloudTrail events on the AWS side — filtered to the OT/SCADA boundary's admin role and policy, and looks for the event where each grant was actually created.

## What the logs show

All 5 accounts show the same pattern, down to the timestamp:

- Each account's direct, individually-assigned admin access to the OT/SCADA segment was created on the **same date**, fourteen months earlier.
- None of the 5 grants went through Hartwell's normal access-request and approval workflow — the one that would have added the account to `OT-SCADA-Admins` or `ot-scada-admins` instead.
- Each grant's audit log entry references the same authorization code: Hartwell's documented **break-glass emergency-access procedure**.

## The incident: the Substation 12 outage

Fourteen months earlier, Hartwell experienced an unplanned outage at Substation 12 that required immediate, hands-on remediation from five specific engineers and responders. Hartwell's break-glass procedure exists precisely for this situation — a documented, pre-approved path to grant emergency responders direct, individual access immediately, without waiting on the normal group-membership change-approval workflow that could take hours Hartwell didn't have during an active outage. All 5 responders were granted direct admin access to the OT/SCADA segment through that procedure, correctly, in order to resolve the outage.

## Where the procedure actually breaks down

Hartwell's break-glass procedure doesn't stop at granting access — it requires a follow-up: any break-glass grant must be reviewed and revoked within 72 hours of the incident's resolution, with a ticket closed out confirming the revocation happened. Mara checks Hartwell's change-management records for the Substation 12 incident and finds exactly what the access logs already implied: the incident ticket was closed as *resolved* once the outage itself was fixed, but no follow-up ticket was ever opened to revoke the 5 responders' emergency access. The outage ended. The access didn't.

This is exactly the structural weakness Lesson 10's register already named in **R-03** — a break-glass procedure with no automatic expiration, dependent on someone remembering to manually revoke it. R-03 was written as a general risk, before anyone knew it had already happened, specifically, 14 months earlier, with these 5 accounts.

## A sequence, not a single mistake

No single person did anything wrong in isolation. Granting the emergency access was correct. Closing the outage ticket once the lights came back on was correct. The gap is that nothing in the process *forced* the revocation step to happen — it depended entirely on someone separately remembering to open a second ticket after the first one closed, for an incident that, by the time it was resolved, already felt finished. That's not a data error, and it's not the compliance audit's fault either — it's a sequence of individually reasonable actions that left 5 accounts with standing, unrevoked access to Hartwell's most sensitive segment for fourteen months.

## Key terms

| Term | Meaning |
|---|---|
| Break-glass access | A documented emergency-access procedure that grants immediate, direct access during an active incident, bypassing normal approval workflows |
| Audit trail correlation | Matching an access grant's timestamp and authorization code against incident and change-management records to establish why and when it was created |
| Standing access decay | Access that was appropriate when granted but was never revoked once the reason for granting it ended |

## Lab

1. Write the one missing process step that, if it had existed, would have prevented these 5 grants from still being active fourteen months later.
2. Explain why this lesson describes the outcome as "a sequence of individually reasonable actions" rather than naming a single person or team at fault.

## Check yourself

You're ready for Lesson 15 when you can state the full chain from memory: the Substation 12 outage, the correct use of break-glass access, the required 72-hour revocation step, and exactly where that step failed to happen.
