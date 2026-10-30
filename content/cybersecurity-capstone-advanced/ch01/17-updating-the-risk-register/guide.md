# Lesson 17 — Updating the Risk Register with the Real Finding

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 17 of 26**

## What you'll learn

- Why this finding gets written into Hartwell's register as its own new risk, not folded into R-03
- The exact sixth row Mara adds, in the same format as R-01 through R-05
- The concrete compensating control that makes this risk more than words on a page
- Why the fix from Lesson 16 doesn't make this row go away

## Back to the register Lesson 10 built

The register Mara opened in Lesson 10 was built for exactly this moment — a place for a real finding to land, with the same columns, the same discipline, applied to something that actually happened instead of something anticipated. Lessons 11 through 16 produced a finding precise enough to write down cleanly: a 14-versus-19 discrepancy, traced to 5 stale break-glass grants from the Substation 12 outage, caused by a methodology gap in how the compliance audit measures standing access — now fixed and validated.

## Why this is a new row, not an update to R-03

R-03 already named the general risk: break-glass access has no automatic expiration. It would be tempting to just mark R-03 "Mitigated" and stop there, but that would understate what Lessons 11 through 15 actually found. R-03 is about the break-glass procedure itself. This finding is about something broader and still unresolved even after the Lesson 16 fix: **Hartwell's compliance audit process has no way to detect this category of access at all, for any segment, going forward** — not just for these 5 accounts, which are now gone. If a different break-glass grant goes stale on a different segment next year, the same audit method would miss it the same way, again. That's a distinct risk, and it gets its own row.

## R-06, written into the register

| ID | Description | Likelihood | Impact | Owner | Treatment | Compensating control | Status |
|---|---|---|---|---|---|---|---|
| R-06 | Compliance audits that review Azure AD / AWS group membership only cannot detect direct, individually-assigned access — proven when the Q4 OT/SCADA audit undercounted standing admin access by 5 accounts (14 reported vs. 19 actual) due to unrevoked break-glass grants from the Substation 12 outage | Medium | High | Mara Voss | Mitigate | Every compliance audit of a Critical-tier segment must be reconciled against the Python/SIEM inventory automation's direct-assignment report before the audit can be marked closed; break-glass grants now use time-bound Azure AD PIM eligible assignments and AWS IAM session policies with a maximum session duration, so they expire automatically instead of relying on manual revocation | Mitigated |

## Why the compensating control has two parts

A single fix for the 5 specific accounts wouldn't prevent this exact gap from recurring, so the compensating control addresses both halves of the problem:

1. **The audit process itself** — no compliance audit of a Critical-tier segment can close without being reconciled against the automation's direct-assignment data, closing the methodology gap structurally rather than hoping someone remembers to check twice.
2. **The break-glass mechanism** — future emergency grants now expire automatically, through Azure AD PIM time-bound eligible assignments and AWS IAM session policies with a capped session duration, instead of depending on a manual 72-hour follow-up ticket that can be — and was — forgotten.

## Why Status is "Mitigated," not "Closed"

Even with both controls in place, R-06 stays open as a tracked row with review dates ahead, the same discipline Lesson 10 established with R-04. A compensating control working today doesn't mean the risk disappears from the register — it means the register now shows exactly what's in place to keep it from happening again, available for anyone who checks a year from now.

## Key terms

| Term | Meaning |
|---|---|
| Register update | Adding a new, fully-specified row to an existing risk register for a finding the program actually produced |
| Recurring risk | A risk that remains possible going forward even after a specific instance of it has been fixed |
| Time-bound eligible assignment | An access grant (via Azure AD PIM or AWS IAM session policies) that expires automatically after a set duration, rather than requiring manual revocation |

## Lab

1. Explain, in one sentence, why R-06 is a distinct row from R-03 rather than an update to it.
2. Write the review date and trigger you'd set for R-06, given that its compensating control depends on next quarter's audit cycle actually following the new reconciliation requirement.

## Check yourself

You're ready for Lesson 18 when you can recite R-06 from memory — the finding, both counts, the owner, and both halves of the compensating control — well enough to brief it to someone who wasn't in the room for Lessons 11 through 16.
