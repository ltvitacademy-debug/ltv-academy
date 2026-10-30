# Lesson 19 — Writing the After-Action Report

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 19 of 26**

## What you'll learn

- Why an after-action report (AAR) is a different document from Lesson
  17's risk register update, and why Hartwell needs both
- The real timeline of the audit/SIEM discrepancy, laid out in
  sequence from first finding to CISO briefing
- Why the root cause is a methodology gap, not a data error — and why
  that distinction changes what the AAR actually recommends fixing
- How to write corrective actions that are named, owned, and dated,
  not vague promises to "do better"

## A different document than the risk register

Lesson 17 updated Hartwell's GRC risk register with the real finding
as an ongoing risk entry, **GRC-RISK-0147** — current status, owner,
residual exposure, next review date. The register is a living
document that tracks risk forward in time. The AAR is the opposite: a
one-time narrative record of exactly what happened in this incident,
written while the details are still fresh, so the organization — not
just Mara Voss — can learn from it. Skipping the AAR because the
register already got updated is a common mistake; the register says
*what the risk looks like now*, the AAR says *how this specific thing
happened and what it teaches*.

## The timeline

| Day | Event |
|---|---|
| Day 1 (Fri) | Compliance Officer **Renee Castellano**'s quarterly privileged-access audit closes, reporting 12 standing admins on the OT/SCADA segment — counted by querying the `OT-SCADA-Admins` and `OT-Engineering-Admins` Active Directory security groups |
| Day 4 (Tue) | Mara's scheduled Python enrichment job runs its weekly OT/SCADA correlation pass, cross-referencing those same two groups against 90 days of SIEM privileged-logon telemetry from the OT jump hosts — and flags 5 accounts with privileged logons that belong to neither group |
| Day 4 (Tue) | Mara opens a reconciliation ticket against the discrepancy |
| Day 5 (Wed) | Tracing the 5 accounts back to a March emergency vendor patch on the SCADA historian, where they were granted direct local-admin ACL entries on specific jump hosts to meet the emergency change window |
| Day 6 (Thu) | Root cause confirmed: the audit's group-membership-only query structurally cannot see a direct ACL grant that bypasses both groups — a methodology blind spot, not a wrong number anywhere |
| Day 8 (Mon) | Fix applied and revalidated: 4 of the 5 accounts fully revoked (the emergency had long closed); 1 was genuinely still in use and migrated into a PAM-managed, 4-hour auto-expiring break-glass workflow tied to a ticket |
| Day 9 (Tue) | Risk register updated with the real finding, logged as GRC-RISK-0147 |
| Day 10 (Wed) | CISO Howard Okonjo briefed ahead of the board meeting |

## Root cause: a methodology gap, not a data error

It would be easy — and wrong — to write this AAR as "the audit was
wrong and the automation was right." Both were internally accurate.
Renee's audit correctly counted everyone in the two tracked AD groups.
Mara's automation correctly counted everyone in those same two groups
*plus* everyone with a direct ACL grant the groups never captured. The
real root cause is narrower and more useful than "someone made a
mistake": the audit's methodology was scoped to group membership only,
and direct grants were never in scope to begin with. Writing the root
cause this precisely is what makes Corrective Action 1 below possible
— you can't fix "the audit was wrong" with a specific change, but you
can fix "the audit's query never looked at direct ACL grants."

## What went right, what went wrong

**What went right:** the automation's dual-check design — checking
group membership *and* direct grants *and* actual SIEM logon activity
— is specifically what caught a gap a single-method audit structurally
could not. That was the design intent from Lesson 8, and it worked
exactly as intended the first time it mattered.

**What went wrong:** the 5 break-glass grants from the March emergency
were never formally revoked once the emergency closed. There was no
expiry on the grants, no ticket requiring closure, and no scheduled
sweep that would have caught them sitting open for months. The gap
wasn't that break-glass access existed — emergency access sometimes
has to — it's that nothing enforced its own cleanup.

## Corrective actions

| Action | Owner | Due |
|---|---|---|
| Rewrite the quarterly audit query to include direct ACL/IAM grants recursively, not group membership alone | Renee Castellano | 30 days |
| Migrate the one retained break-glass pattern into Hartwell's standard PAM workflow platform-wide, not just this segment | Theo Brandt, Identity & Access Engineering Lead | 45 days |
| Stand up a recurring 30-day sweep comparing all direct ACL grants against open, linked tickets | Mara Voss | Effective immediately, monthly thereafter |
| Formalize the dual-check automation as the standing validation layer for every future privileged-access audit, not only OT/SCADA | Mara Voss, sign-off by Howard Okonjo | 30 days |

## Key terms

| Term | Meaning |
|---|---|
| After-action report (AAR) | A one-time narrative record of exactly what happened in an incident, written for organizational learning |
| Methodology gap | A root cause where the detection or audit process itself never covered a category of risk, as opposed to a data entry error |
| Break-glass access | Emergency access granted outside normal process to meet an urgent need, intended to be temporary and formally revoked |
| Dual-check validation | Checking the same control two independent ways on purpose, so a gap in one method has a real chance of being caught by the other |

## Lab

1. Write the one-paragraph root-cause statement for this incident in
   your own words, being careful to describe a methodology gap rather
   than blaming either Renee's audit or Mara's automation.
2. Draft one additional corrective action, with a named owner and a
   specific due date, for a gap you think this AAR hasn't fully closed
   yet.

## Check yourself

You're ready for Lesson 20 when you can explain, without notes, why
this incident's root cause is written as a methodology gap rather than
a data error, and why that specific phrasing is what makes the four
corrective actions above actionable instead of vague.
