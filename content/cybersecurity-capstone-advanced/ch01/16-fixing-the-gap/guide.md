# Lesson 16 — Fixing the Gap and Validating the Fix

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 16 of 26**

## What you'll learn

- The actual security fix: revoking the 5 stale break-glass grants, under proper change control
- The real Azure and AWS commands used to remove direct, individually-assigned access
- How Mara validates the fix — by re-running both counting methods and confirming they now agree
- Why "the numbers now match" is itself the proof the fix worked

## The fix is the revocation, not the reconciliation

Finding and explaining the gap, across Lessons 11 through 15, didn't fix anything by itself. Five accounts still hold standing, unrevoked admin access to Hartwell's OT/SCADA segment, fourteen months after the incident that justified granting it ended. The actual security fix is removing that access — and because this is the OT/SCADA segment, it goes through Hartwell's change-management process, with a ticket, a review, and a scheduled maintenance window, not an ad hoc fix typed in during a meeting.

## Revoking the direct grants

Each of the 5 accounts' access was granted directly — not through group membership — so the fix is removing that specific role or policy attachment from each account individually. On the Azure side, where direct access was an Entra ID directory role or app role assignment:

```powershell
# Remove a direct Entra ID app role assignment (not a group membership)
Remove-MgUserAppRoleAssignment -UserId <userId> -AppRoleAssignmentId <assignmentId>
```

On the AWS side, where direct access was an IAM policy attached straight to a user or role:

```bash
# Detach a policy attached directly to a user, not inherited via a group
aws iam detach-user-policy \
  --user-name <username> \
  --policy-arn arn:aws:iam::<account-id>:policy/OTSCADAAdminAccess
```

Each of the 5 removals is logged with a change ticket referencing this finding, and scheduled during an approved maintenance window — because removing standing admin access from an OT boundary, even stale access, is itself a change that could affect operations if done carelessly.

## Validating the fix

A fix to an access discrepancy isn't validated by assuming it worked — it's validated the same way the discrepancy was found in the first place: by re-measuring. After the revocations complete, Mara does two things:

1. **Re-runs a corrected manual review** — this time explicitly checking both group membership *and* direct assignment, not repeating the audit's original group-only method.
2. **Re-runs the Python automation** against the OT/SCADA segment.

## The result

Both now report the same number:

> **14 accounts hold standing admin access to the OT/SCADA segment** — all 14 via group membership in `OT-SCADA-Admins` and `ot-scada-admins`, and **zero** via direct, individual assignment.

The automation's count dropped from 19 to 14. The corrected manual review, now checking both sources, also lands on 14. The group-membership count itself never changed — those 14 accounts were never part of the problem. The fix didn't just make a number go away; it made two independently run counts, using two different methods, agree with each other for the first time. That agreement is the actual proof the fix worked — not a feeling that it should have.

## Key terms

| Term | Meaning |
|---|---|
| Change control | A formal process of ticketing, review, and scheduling for a change to a production system, including an access revocation |
| Remediation | The concrete action taken to close a confirmed security gap, as distinct from identifying or explaining it |
| Validation | Confirming a fix actually worked by re-measuring the same thing that originally revealed the problem, rather than assuming success |

## Lab

1. Write the change-ticket description you'd file for revoking one of these 5 accounts' direct access, referencing the Substation 12 incident and this reconciliation finding.
2. Explain why re-running *both* counting methods after the fix is stronger proof than re-running just the automation a second time.

## Check yourself

You're ready for Lesson 17 when you can state the post-fix numbers from memory — 14 and 14, matching — and explain exactly why that agreement, not just the revocation itself, is what proves the gap is actually closed.
