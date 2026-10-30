# Lesson 12 — The SIEM Says Something Different

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 12 of 26**

## What you'll learn

- What Mara's Python automation (built in Lessons 8 and 9) actually checks that the audit's method doesn't
- The exact, different number it reports for the same access, the same segment, the same day
- Why Mara's first move is not to assume either number is wrong
- The precise shape of the discrepancy she's now holding

## The automation runs on the same day

Mara's access-inventory automation — the Python script built in Lesson 8 and scheduled in Lesson 9 — runs its regular pull against the OT/SCADA boundary on October 12, the same cutoff date the compliance audit used. It wasn't built in response to the audit; it was already running on its own schedule. The coincidence of the date is exactly what makes what it finds impossible to wave away as "measuring something different."

## What the automation checks that the audit didn't

The audit's method, from Lesson 11, was group membership only. Mara's automation was built, from the start, to check two things, not one:

1. **Group membership** — the same `OT-SCADA-Admins` (Entra ID) and `ot-scada-admins` (AWS) rosters the audit pulled, via Microsoft Graph's group-member endpoint and AWS's `iam get-group`.
2. **Direct, individually-assigned access** — any account with an admin-level Entra ID directory role or AWS IAM policy attached *straight to that account*, not inherited through either group, found via Microsoft Graph's `appRoleAssignments` / directory role assignment endpoints on the Azure side, and `aws iam list-attached-user-policies` / `list-attached-role-policies` on the AWS side.

The script consolidates both checks into a single de-duplicated list — exactly the same logical operation the audit performed, just over a wider set of inputs.

## The number

Mara's automation reports, for the same OT/SCADA boundary, as of the same October 12 cutoff:

> **19 accounts hold standing admin access to the OT/SCADA segment** — 14 of them via group membership, and 5 via a direct, individually-assigned role or policy that isn't tied to either group at all.

Nineteen. Not fourteen. The same access, the same segment, the same day — and a different authoritative-looking number from a tool Mara built and trusts.

## Mara's first move: neither number is "wrong" yet

It would be easy, and wrong, to react to this moment in either direction — assuming the compliance audit missed something because automation is more thorough by nature, or assuming the automation over-counted because the audit is the official, board-facing report. Mara does neither. A discrepancy between two measurements of the same thing means exactly one fact is certain: **at least one of the two methods is measuring something the other one isn't.** Which one, and why, is a question with an actual answer — but finding it requires looking at the underlying accounts, not just arguing about which number to trust by default. That comparison is Lesson 13's job.

## Key terms

| Term | Meaning |
|---|---|
| Direct (individual) assignment | A permission or role attached straight to a single account, rather than inherited through group membership |
| Reconciliation discrepancy | A measurable difference between two independently produced counts of the same underlying thing |
| Consolidated check | Combining two or more independent data sources (here, group membership and direct assignment) into one de-duplicated result |

## Lab

1. Write out, in your own words, the one capability the audit's method lacked that the automation's method had.
2. State both numbers from memory — the audit's and the automation's — and the exact size of the gap between them.

## Check yourself

You're ready for Lesson 13 when you can explain, without looking back, exactly what the automation checks that the audit doesn't, and why a five-account gap between 14 and 19 is not, by itself, proof that either number is incorrect.
