# Lesson 19 — Knowledge Article Approval Workflow

**Chapter 5 · Implementing Knowledge Management · Lesson 19 of 32**

## What you'll learn

- The three real Workflow state values an article moves through: Draft, Review, Published
- Why an approval gate between Review and Published is a real quality-control mechanism, not just
  bureaucracy
- How to implement that gate with a Flow Designer approval action, the way Flow Designer & Platform
  Automation covered requesting approvals
- Who should actually sit in the approver seat, and why that choice matters
- What happens to an article when a reviewer rejects it, instead of approving it

## The three real states: Draft, Review, Published

Lesson 18 introduced Workflow state as a field on `kb_knowledge`. Three of its values form the
publishing path every article walks: **Draft** (an author is still writing or editing it, not
visible to end users), **Review** (the author considers it finished and has submitted it for
sign-off), and **Published** (it has cleared review and is now visible to whoever that Knowledge
Base's permissions allow). A fourth value, **Retired**, covers an article's life after it stops
being current — that's Lesson 20's subject.

## Why the gate between Review and Published is real quality control

It is tempting to treat the approval step as red tape slowing down a helpful author. The real
reason it exists is scale. One author's draft, published straight to the Self-Service Knowledge
Base with no second set of eyes, might contain a step that's subtly wrong, a command that's been
superseded, or guidance that was true for an environment that no longer exists. Multiply that
across hundreds of articles and thousands of readers, and an inaccurate article doesn't just
mislead one person — it spreads bad guidance at scale, and other agents start citing it as fact.
The approval gate is the control that catches that before it goes live, not after.

## Implementing the gate with Flow Designer

Flow Designer & Platform Automation covered building an approval into any record flow; Knowledge
Management reuses that exact mechanism. A flow triggers when a `kb_knowledge` record's Workflow
state changes to Review, and its action is **Ask for Approval**, routed to a Knowledge manager or
a subject-matter expert for that Knowledge Base's Category. The flow waits on that approval record
the same way a change request flow waits on CAB sign-off. On approval, the flow sets Workflow state
to Published and stamps a Published date. There is no path from Draft straight to Published that
skips this flow — the state transition itself is what the approval is gating.

## What happens on rejection

A reviewer who finds a problem doesn't just leave a comment and move on — rejecting the approval
record routes the flow back to setting Workflow state to Draft, with the reviewer's comments
attached to the record for the original author to act on. The article never reaches end users in
its flawed form; it simply returns to the same Draft state it started in, now with specific
feedback instead of a silent rejection.

## Key terms

| Term | Meaning |
|---|---|
| Draft | Workflow state while an article is still being written, not visible to end users |
| Review | Workflow state once an author submits the article for sign-off |
| Published | Workflow state once the article has cleared approval and is visible per its KB's permissions |
| Ask for Approval | The Flow Designer action that routes a Review-state article to a Knowledge manager or SME |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: what actually happens to an
article's Workflow state when a reviewer rejects it, and why does skipping the approval gate
entirely become a real risk once a Knowledge Base has hundreds of articles and thousands of
readers?
