# User Acceptance Testing

SIT proved the project team's own build works. User Acceptance Testing (UAT) proves something different and arguably more important: that the people who will actually use Oracle Fusion every day agree it meets their needs. This lesson covers what makes UAT distinct from SIT, and why a formal UAT sign-off is almost always a go-live gate.

## What you'll learn

- How UAT differs from SIT in who runs it and what "pass" really means
- Why UAT uses real business scenarios, not just the SIT scripts verbatim
- What a formal UAT sign-off actually certifies
- How Brightfield's partial-payment defect from Lesson 17 played out in UAT

## Who runs UAT, and why that matters

UAT is executed by **actual business users** — the same Treasury Manager, AP clerk, or AR specialist who will use the system after go-live — not by the project team. This matters because a Functional Consultant, however skilled, tests against their understanding of the requirement; a business user tests against their actual daily experience, and sometimes surfaces a usability problem or a missed edge case that a consultant never would have thought to script. UAT is run in an environment that is, by this point, configuration-complete and SIT-clean, so business users aren't wasting their time on defects the project team should have already caught.

## Real scenarios, not just scripted steps

While UAT often reuses or adapts SIT's test scripts, a strong UAT also asks business users to run their **own real scenarios** — the exact kind of transaction they process weekly, with the exact edge cases they know to expect from experience. This is deliberate: a script written by a consultant can miss a pattern that's obvious to someone who lives in the process every day.

## What UAT sign-off actually certifies

A formal **UAT sign-off**, usually from the relevant Business Process Owners and often the Executive Sponsor, certifies that the system meets the business's acceptance criteria — not that it's bug-free (minor, lower-severity defects can remain open with an agreed remediation plan), but that it's ready for the business to run on. This sign-off is the exit criterion for TCM's Validate phase and the entry criterion for Transition (the phase gate concept from Lesson 3) — one of the most consequential go/no-go decisions on the entire project.

## Brightfield Industrial Group: UAT closes the loop

The Treasury Manager runs Brightfield's UAT for Cash Management, including a retest of the partial-payment scenario that failed in SIT (Lesson 17) — now fixed, after the Technical Consultant adjusted the reconciliation matching rule's tolerance logic. The Treasury Manager also runs a scenario the SIT script never covered: a wire transfer received in a foreign currency, which the team hadn't anticipated needing special handling for. That becomes a new defect, triaged and fixed before the Treasury Manager signs off UAT for Cash Management — closing Validate for that module.

## Key terms

| Term | Meaning |
|---|---|
| UAT (User Acceptance Testing) | Testing run by actual business users to confirm the system meets their needs |
| UAT sign-off | Business certification that the system is ready to go live, not that it's defect-free |
| Validate phase | The TCM phase UAT sign-off closes out |

## Recap

UAT puts real business users in the driver's seat, running both adapted test scripts and their own real scenarios, and a formal sign-off certifies readiness for go-live rather than a defect-free system. Brightfield's Treasury Manager both confirmed a prior fix and found a new edge case UAT was specifically designed to catch. Next up, lesson 19: how defects like these get managed from discovery to closure.
