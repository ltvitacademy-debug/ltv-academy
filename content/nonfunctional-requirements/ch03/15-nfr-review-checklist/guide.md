# Lesson 15 — NFR Review Checklist

**Chapter 3 · Practice · Lesson 15 of 18**

## What you'll learn

- Why a review checklist is different from the elicitation checklist in Lesson 8
- A practical, six-category review checklist an architect can run against any design before it ships
- What a "pass" actually needs to look like for each line item, not just a checked box
- How to use the checklist without turning it into box-ticking theater

## Elicitation checklist vs. review checklist

Lesson 8 introduced a checklist as an elicitation tool: running through the six NFR categories early, during discovery, to make sure nothing was skipped when requirements were being gathered. This lesson's checklist does a different job later in the project: **reviewing a design that's already been built**, to verify each NFR category was actually addressed the way the requirements said it would be, not just that someone thought about it once at the start. Elicitation asks "did we identify what's needed?" Review asks "did we actually build what was identified?" — these can diverge quietly over the course of a project as deadlines compress and decisions get made under pressure.

## The checklist

For each of the six categories, the review should produce a specific answer, not a checkbox:

**Performance** — Is there a stated metric, target, and condition for every performance-sensitive flow in this design? Has it actually been load-tested (Lesson 10) under the stated condition, with documented results, not just assumed from a quick manual click-through?

**Security** — Does field-level and record-level access actually match what the security NFR specified, verified by testing with a real user assigned the relevant profile — not just by reading the permission set configuration and assuming it's correct? Has Security Health Check (Lesson 10) been run, and have any flagged gaps been explicitly accepted or resolved?

**Scalability** — Does the design account for the stated growth curve (Lesson 4), not just today's data volume? If an archival or indexing strategy was decided on, does it actually exist as a scheduled, running process — not a plan that was written down and never built?

**Reliability** — Has every integration's failure path been tested with failure injection (Lesson 10), not just its happy path? Is every write operation that could plausibly be retried actually idempotent (Lesson 5), verified by actually submitting a duplicate request and checking the result, not just by reading the code and assuming it's correct?

**Maintainability and recoverability** — Is there exactly one automation tool per object trigger context, or is the order-of-execution risk from competing Flows and triggers still present? Does a working, tested backup and restore process actually exist, or does "we have backups" mean nobody has ever actually tried a restore?

**Compliance** — Has every compliance NFR been reviewed and signed off by the actual compliance or legal stakeholder who owns it (Lesson 7), not just implemented based on the architect's own best guess at what the regulation requires?

## What "pass" actually requires

A checklist item only means something if "pass" requires evidence, not a verbal assurance. "Performance: pass" because someone clicked through the UI once and it felt fast is not the same thing as "Performance: pass, load test run against 50,000 simulated cases in a Full sandbox on [date], 95th percentile response time measured at 1.8 seconds, meeting the 2-second target." The second version can be defended later, shown to an auditor, or handed to the next architect; the first version is just an opinion with "pass" written next to it.

## Avoiding checklist theater

A review checklist run mechanically, without anyone actually willing to say "no" to an item that doesn't really pass, becomes worse than useless — it creates false confidence that something was verified when it wasn't. The checklist's value depends entirely on whoever runs it being willing to mark an item as failed or incomplete, and on that finding actually triggering a fix rather than a shrug. A checklist with every box checked on a project that still has obvious gaps is a sign the review itself wasn't done honestly, not a sign the project is actually ready.

## Key terms

| Term | Meaning |
|---|---|
| Review checklist | A structured check, run against a design already built, verifying each NFR category was actually delivered as specified |
| Evidence-based pass | A checklist result supported by documented proof (a test result, a log, a sign-off), not just an assurance that something was done |
| Checklist theater | Running a checklist mechanically with no real willingness to fail an item, producing false confidence rather than genuine verification |

## Lab

Run this lesson's six-category checklist against the high-volume service-org case study from Lesson 13. For each category, state what specific evidence (a test result, a configuration check, a sign-off) would need to exist to honestly mark it as "pass" rather than just assuming it based on the design decisions already described. Identify at least one category where the case study, as described, doesn't yet have enough detail to actually pass a rigorous review.

## Check yourself

Can you explain the difference between the elicitation checklist from Lesson 8 and the review checklist from this lesson? Can you give an example of an evidence-based pass versus a verbal-assurance pass for at least two of the six NFR categories?
