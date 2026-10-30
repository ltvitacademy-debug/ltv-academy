# Lesson 18 — Briefing the CISO

**Chapter 1 · Advanced Capstone: Zero Trust, Dual-Cloud Identity, and a Cross-Team Incident · Lesson 18 of 26**

## What you'll learn

- The five-part structure Mara uses to brief Howard Okonjo on the full discrepancy
- Why the briefing explicitly avoids assigning blame to the compliance audit team
- The one forward-looking recommendation Mara brings beyond the fix already made
- How this briefing sets up the after-action report in Lesson 19

## Why this briefing matters beyond this one finding

Howard Okonjo sponsored this entire program at board level. He's already seen one number — 14 — in the formal audit report. If Mara doesn't brief him directly, the next thing he hears could be a confusing, informal mention of "19" from somewhere else, with no context for why two numbers exist at all. A clear, structured briefing, delivered by the person who actually did the reconciliation, is how a discrepancy like this stays a routine governance success instead of becoming a trust problem between compliance and security engineering.

## The five-part structure

Mara briefs Howard in a deliberate order, each part building on the last:

1. **The discrepancy, stated plainly.** The compliance audit reported 14 accounts with standing admin access to the OT/SCADA segment as of October 12. The Python inventory automation reported 19 for the exact same access, the exact same day.
2. **The root cause.** Both numbers were accurate for what each method measured. The audit checked group membership only; the automation checked group membership and direct, individually-assigned access. The 5-account gap traced to break-glass emergency grants from the Substation 12 outage, fourteen months earlier, that were never revoked after the incident closed.
3. **The fix.** The 5 stale grants were revoked through change control. A corrected manual review and a re-run of the automation now both report 14, with zero remaining direct assignments — independent confirmation the gap is closed.
4. **The new standing risk.** R-06 is now in Hartwell's GRC risk register: compliance audits that check group membership only cannot detect this category of access, on any segment, going forward — not just this one instance.
5. **The compensating control already in place.** Every future Critical-tier audit must reconcile against the automation's direct-assignment data before closing, and break-glass grants now expire automatically instead of relying on manual revocation.

## Why Mara doesn't frame this as the audit team's error

Howard's first instinct, hearing "the audit missed 5 accounts," could reasonably be to ask why the audit team got it wrong. Mara heads that off directly, using exactly the distinction Lesson 15 established: the audit team followed its documented checklist correctly; the checklist itself never included a step for direct assignment. Framing this as an individual or team failure would be both inaccurate and counterproductive — it would make the compliance team defensive about a method they executed exactly as instructed, instead of getting their buy-in on the one recommendation that actually matters.

## The one recommendation beyond the fix

Mara's closing recommendation goes further than "this specific gap is fixed": she recommends Hartwell formally update the compliance audit charter itself, for every Critical-tier segment, to require a direct-assignment check as a standard, scoped step — not something left to coincide with whether Mara's automation happens to be running that quarter. That's the difference between closing one gap and closing the kind of gap that produced it.

## What this sets up

Howard receives the full picture — not just a fixed number, but a resolved discrepancy, a documented root cause, a validated fix, and a new, owned risk-register entry with a real compensating control. Lesson 19 picks this exact material up again, formalized into Hartwell's after-action report.

## Key terms

| Term | Meaning |
|---|---|
| Executive briefing structure | A deliberate order — discrepancy, root cause, fix, new risk, compensating control — that lets a non-technical sponsor follow a technical finding without confusion |
| No-blame root-cause framing | Explaining a finding by its process cause rather than assigning fault to the individuals who executed that process correctly |
| Audit scope recommendation | A forward-looking proposal to change what a recurring audit checks, so it catches an entire category of future gap, not just the specific instance already fixed |

## Lab

1. Write Howard Okonjo's briefing in five sentences, one per part of Mara's structure, using the exact numbers and names from this chapter.
2. Explain why recommending a change to the audit charter itself is a stronger outcome than simply reporting that the 5 accounts were fixed.

## Check yourself

You're ready for Lesson 19 when you can deliver this five-part briefing yourself, from memory, in order — the discrepancy, the root cause, the fix, the new risk, and the compensating control — without reading back through Lessons 11 through 17.
