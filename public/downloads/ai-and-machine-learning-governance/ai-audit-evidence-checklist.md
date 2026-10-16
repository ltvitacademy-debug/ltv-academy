# AI Audit Evidence Checklist

Built on Lesson 27's six pieces of evidence a real AI audit should be able to produce for any system in scope. Use this before an audit begins — request every item by name, and treat a missing item as a finding, not an assumption that it exists somewhere.

---

## Scope

**System(s) in this audit:** `<name>`
**Risk tier(s):** `<from Lesson 24>`
**Audit date:** `<date>`
**Auditor:** `<name>`
**Audit type:** `<internal / external>`

## Evidence checklist

For each item, mark whether it exists, where it lives, and if it's missing, write the finding now rather than waiting for the summary.

| # | Evidence item | Exists? (Y/N) | Location / link | Finding if missing |
|---|---|---|---|---|
| 1 | Model card or equivalent documentation (Chapter 3) | | | |
| 2 | Risk tier assignment with documented justification (Lesson 24) | | | |
| 3 | Evidence of bias or fairness testing appropriate to this risk tier | | | |
| 4 | Access log showing who can reach the model and training data, matching the approved list (Chapter 4) | | | |
| 5 | Monitoring and drift records showing post-deployment performance is being watched (Lessons 20-21) | | | |
| 6 | Record of the approval workflow this system passed through before going live, including sign-offs (Lesson 16) | | | |

## Walkthrough

Have the system's accountable owner (Lesson 4) walk through how one real decision was made, end to end. Note any step where the walkthrough didn't match the documented evidence above.

```
<walkthrough notes>
```

## Findings and remediation

| Finding | Owner | Deadline | Status |
|---|---|---|---|
| | | | |
| | | | |

## Audit conclusion

`<does the evidence show governance is real and operating, or aspirational and undocumented? One paragraph.>`
