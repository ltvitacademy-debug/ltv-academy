# Lesson 18 — Common NFR Mistakes

**Chapter 3 · Practice · Lesson 18 of 18**

## What you'll learn

- A consolidated list of the recurring NFR mistakes this course has named across all 17 prior lessons
- Why each mistake keeps happening even on teams that know better
- How to spot each mistake early, before it becomes an expensive production problem
- How this list functions as a final, practical summary of the whole course

## Mistake 1: Writing an NFR with no metric, target, or condition

"The system must be fast," "the system must be secure," "we need good DR" — these appear throughout this course (Lessons 1, 2, 5, 12) as the recurring shape of a non-requirement. It keeps happening because it's genuinely harder to state a specific number and condition than to gesture at a quality, and because a vague statement is harder to disagree with in a meeting, which makes it attractive for avoiding conflict in the short term. The fix is the discipline from Lesson 2: force every NFR into metric, target, condition before accepting it as finished.

## Mistake 2: Treating a demo or pilot as proof an NFR is satisfied

A system that works in a demo with ten records, or a pilot with a handful of friendly early users, has told you nothing about whether it holds up at real volume, under real attack conditions, or when something actually fails (Lessons 1, 10, 13). It keeps happening because a successful demo feels like validation, and because the conditions that would actually test the NFR — a spike, an outage, an audit — are by definition rare and easy to not think about until they happen. The fix is Lesson 10's discipline: test the actual stated condition, not the easy condition that happens to be available.

## Mistake 3: Assuming the platform vendor's guarantees cover the customer's implementation

Lessons 7 and 12 both named this directly: Salesforce's own compliance certifications and whatever uptime information it publishes describe Salesforce's infrastructure and shared responsibilities, not whether a specific org's field-level security, integration design, or backup strategy actually satisfies a specific customer's compliance or availability requirement. It keeps happening because it's genuinely convenient to believe the platform has already solved the problem, and because the distinction between "the vendor is compliant" and "our implementation is compliant" is easy to blur in a sales conversation. The fix is to always ask, specifically, what the customer's own implementation still has to deliver on top of whatever the vendor provides.

## Mistake 4: Deciding a design without ever stating which NFR drove it

Lesson 9's trace pattern exists because this mistake is so common: a real design decision gets made (move this to async, archive this object, add this index) for genuinely good reasons, but the reasons never get written down as a trace back to a specific NFR. It keeps happening because the architect making the decision usually does understand the reasoning in the moment — the gap only becomes visible once someone else has to maintain or defend the decision later, without that context. The fix is Lesson 9's rule: no design decision is finished until its trace to a specific NFR is written down.

## Mistake 5: Pretending a genuine NFR conflict has no trade-off

Lesson 11 named this directly, and Lesson 17 named it again as a specific way a board defense falls apart: when two NFRs genuinely conflict, "we'll just do both, fully" is usually a sign the trade-off was never actually engaged with. It keeps happening because naming a real trade-off means someone has to accept a specific cost or risk, which is an uncomfortable thing to put your name on, compared to an unbounded promise that sounds better in the moment but isn't actually true.

## Mistake 6: Letting NFR documentation go stale

Lesson 16 covered this directly: an NFR register written once at kickoff and never revisited describes a system that no longer exists by the time anyone needs to rely on the documentation. It keeps happening because revisiting documentation has no natural trigger unless one is deliberately built in — nobody's calendar reminds them to check whether a two-year-old scalability assumption still holds.

## Mistake 7: Confusing an elicitation checklist pass with a review checklist pass

Lesson 15 drew this distinction explicitly: identifying an NFR during discovery (elicitation) is not the same as verifying it was actually delivered in the finished system (review). It keeps happening because teams that do good elicitation work often assume the hard part is over, when documenting the requirement and actually building and testing it to that standard are two separate pieces of work, each of which can fail independently.

## Using this list

This list isn't a replacement for any single lesson in this course — it's a fast way to scan a project for the most common, most predictable failure patterns before they become production incidents or a failed review-board defense. A useful habit: before calling any Salesforce design "NFR-complete," run it against these seven mistakes specifically, the same way Lesson 15's checklist runs a design against the six NFR categories.

## Key terms

| Term | Meaning |
|---|---|
| Non-requirement | A stated NFR missing a metric, target, or condition, making it untestable |
| Vendor/implementation gap | The difference between what a platform vendor guarantees and what a specific customer implementation actually delivers |
| NFR-complete | A practical standard meaning a design has been checked against both the six NFR categories (Lesson 15) and this lesson's seven common mistakes |

## Lab

Pick any one design decision from Lesson 13 or Lesson 14's case studies. Check it against all seven mistakes in this lesson, one at a time, and state explicitly whether that decision avoids each mistake or is at risk of it. For any mistake you find a real risk of, write the specific fix (in the terms of the lesson that mistake traces back to) that would close the gap.

## Check yourself

Can you name all seven common NFR mistakes from this lesson, and for each one, name the earlier lesson in this course where it was first introduced? Can you explain, in your own words, why each mistake keeps recurring even on teams that already know the correct practice?
