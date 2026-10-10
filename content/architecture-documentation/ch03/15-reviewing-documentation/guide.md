# Lesson 15 — Reviewing Documentation

**Chapter 3 · Practice · Lesson 15 of 17**

## What you'll learn

- What "documentation rot" is and why it's a predictable, structural problem, not a discipline failure
- A practical review checklist for keeping an SDD and its diagrams current
- Who should own documentation review, and why "whoever has time" doesn't work
- How internal documentation review connects to the formal review a Salesforce CTA Review Board conducts

## Documentation rot is structural, not a discipline failure

**Documentation rot** is what happens when written documentation quietly stops matching the real system — a diagram still shows an integration that was decommissioned eight months ago, an SDD's security section describes a sharing rule that was replaced, an ADR's "Accepted" status never got updated to "Superseded" after the team changed direction. It's tempting to treat rot as a sign that a team is undisciplined. It's more accurate, and more useful, to treat it as structural: nothing in a typical change process automatically updates documentation when the system changes, so without a deliberate counter-process, rot is simply the default outcome of ordinary, legitimate change over time — the same dynamic Lesson 1's "classification drift"-style gap and documentation debt both describe, now applied specifically to keeping documentation current rather than writing it the first time.

## A review checklist

A documentation review — whether a quick self-check before a release or a scheduled periodic pass — should walk through the same questions every time, so it catches rot reliably rather than depending on whoever happens to remember to look:

1. **Does every diagram still match the current org?** Pull up Schema Builder (Lesson 9) or the actual Setup configuration and compare against the ERD, system context diagram, and any sequence diagrams — has anything been added, removed, or changed that the diagram doesn't reflect?
2. **Is every ADR's status accurate?** Any decision the team has since reversed should have a "Superseded by ADR-0XX" status, per Lesson 6's immutable-log convention — not a silently stale "Accepted."
3. **Do the assumptions and open items still hold?** An assumption stated a year ago ("data volume stays under 2 million records") may no longer be true; an "open item" from a year ago may have been quietly resolved without anyone updating the SDD to say so.
4. **Does the access matrix (Lesson 14) still match the real sharing configuration?** Permission sets and sharing rules tend to accumulate small changes over a project's life that rarely get reflected back into the original security documentation.
5. **Is the integration documentation's error-handling section still accurate?** Retry policies and alerting destinations are exactly the kind of detail that gets quietly adjusted during an incident response and then never written back into the document.

## Who owns documentation review

"Whoever has time" is not a real ownership model — it means review happens inconsistently or not at all, which is exactly how rot accumulates unchecked. A workable model assigns documentation review the same way code review is assigned: tied to a trigger, not to spare time. Two triggers work well in practice: **release-triggered review** (any release that changes an object, sharing rule, or integration touches the corresponding documentation section as part of the release checklist, not as an afterthought) and **scheduled periodic review** (a calendar cadence — quarterly for actively-changing solutions, annually for stable ones — independent of whether a release happened, catching the rot that accumulates from small changes nobody thought warranted an immediate documentation update).

## How this connects to the CTA Review Board

A Salesforce CTA Review Board candidate who presents a design built on documentation that doesn't match reality faces exactly the problem this lesson describes, compressed into a single high-stakes session: a panel asking pointed questions will quickly surface any place the presented design and the candidate's actual reasoning don't line up. The discipline of regularly reviewing and correcting documentation against reality — practiced on real projects — is the same discipline that lets an architect walk into a review board session (or any design review) with a design they can actually defend, because it still accurately describes what they built and why.

## Key terms

| Term | Meaning |
|---|---|
| Documentation rot | Written documentation quietly falling out of sync with the real system over time |
| Release-triggered review | Reviewing the documentation sections affected by a release as part of that release's checklist |
| Scheduled periodic review | A calendar-driven documentation review independent of whether a release happened, to catch slow, small-change rot |

## Lab

Take the SDD you've been building across this course's labs (data model, integration, security sections from Lessons 12-14). Imagine six months have passed: the Project__c to Skill__c junction object gained a new `Hourly_Rate__c` field with sensitive compensation data, the inventory-check integration from Lesson 13 switched from a Named Credential-based OAuth flow to a different auth mechanism after a security audit, and one ADR's decision was reversed. Walk through the five-point review checklist against this scenario and write exactly what in your documentation would now need updating, and why each one would have gone unnoticed without a deliberate review.

## Check yourself

Can you explain why documentation rot is better understood as a structural, predictable outcome of ordinary change rather than a discipline failure? Can you name the five items on this lesson's review checklist? Can you explain the difference between release-triggered review and scheduled periodic review, and why a mature practice uses both rather than just one?
