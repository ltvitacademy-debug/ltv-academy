# Lesson 11 — NFR Conflicts and Prioritization

**Chapter 2 · Applying Nonfunctional Requirements · Lesson 11 of 18**

## What you'll learn

- Why NFRs routinely conflict with each other, and with functional scope, cost, and timeline
- Common real conflict pairs on the Salesforce platform, with worked examples
- A simple, defensible framework for prioritizing when NFRs can't all be fully satisfied
- Why "we'll do all of it" is usually a sign the trade-off hasn't actually been made yet

## NFRs compete for the same budget

Every NFR category in this course sounds reasonable in isolation: of course the system should be fast, secure, scalable, reliable, maintainable, and compliant. The problem is that these aren't independent dials — improving one often costs another, and all of them compete for the same finite budget of time, money, and architectural complexity. An architect's job during design is not to maximize every NFR; it's to make the trade-offs explicit, defensible, and agreed to by the people accountable for the outcome, rather than letting them happen by accident or get quietly decided by whoever built the feature last.

## Common conflict pairs on Salesforce

- **Security vs. performance.** Field-level encryption, additional access checks, and detailed audit logging all add processing overhead to a transaction. A security NFR that requires every field access to be logged for audit purposes can measurably slow down a transaction that a performance NFR wants under a tight response-time target — both are legitimate, and the resolution has to pick which one bends, and by how much.
- **Security vs. usability/maintainability.** Strict field-level security and narrowly scoped permission sets are good security practice, but every additional permission set and sharing rule is more configuration to maintain, more places for an admin to make a mistake, and more friction for a user legitimately trying to do their job. A security posture that's airtight but unmaintainable tends to erode over time as admins grant broad access "just to make things work" — which is itself a security failure, just a slower one.
- **Scalability vs. cost and timeline.** Designing for a three-year data-volume projection (Lesson 4) — archival jobs, indexed access patterns, Big Objects — costs real development time now, against a business case that might not materialize if growth is slower than projected. Under-building risks an expensive redesign later; over-building spends budget today against an uncertain future.
- **Compliance vs. almost everything.** A compliance NFR (Lesson 7) frequently isn't negotiable the way the others are, which means when compliance conflicts with performance, cost, or timeline, the other NFR is usually the one that has to bend — the project timeline slips, or the budget grows, rather than the regulatory requirement being quietly dropped.

## A framework for prioritizing when NFRs conflict

1. **Name the conflict explicitly.** "Meeting the audit-logging requirement for every field view adds roughly 200ms to this transaction, which puts us over the performance NFR's target under peak load." Most conflicts never get resolved well because they're never stated this plainly — they get absorbed silently into whichever decision the last person to touch the code happened to make.
2. **Identify which NFR is less negotiable.** Compliance and, often, core security requirements tend to be the least negotiable, because they carry legal or contractual consequences the business has already accepted. Performance and scalability targets, while important, are more often true engineering trade-offs with some genuine flexibility.
3. **Look for a design that reduces the conflict rather than just picking a side.** Before accepting "slower, but compliant," ask whether the logging can move off the synchronous path (an async write to the audit log after the transaction completes, rather than blocking on it) — the same idempotency and async-design thinking from Lessons 5 and 9 often applies directly to conflict resolution, not just to the original requirement.
4. **Document the decision and who approved it.** A resolved conflict needs the same kind of record as the design decisions in Lesson 9: what the conflict was, which NFR took priority, why, and who accepted the trade-off. This matters most when the decision gets questioned later by someone who wasn't in the room — a documented, approved trade-off is defensible; an undocumented one looks like an oversight.

## "We'll do all of it" is usually a warning sign

When a team responds to a named conflict with "we'll just do all of it fully," that's often a sign the conflict hasn't actually been engaged with — either the cost of fully satisfying both NFRs hasn't been estimated, or the conflict has been resolved by assumption rather than analysis. A real trade-off conversation ends with a specific, bounded decision ("audit logging moves async, accepting a short window where a log write could be delayed relative to the transaction it describes") — not an unbounded commitment to excellence in every dimension at once.

## Key terms

| Term | Meaning |
|---|---|
| NFR conflict | A situation where satisfying one NFR to its full target degrades another NFR, cost, or timeline |
| Negotiability | How much flexibility exists in how fully an NFR must be met — compliance and core security tend to be least negotiable |
| Trade-off record | A documented account of a resolved NFR conflict: what conflicted, what was decided, why, and who approved it |

## Lab

Using the security-vs-performance conflict pair from this lesson, write a full trade-off record for a specific scenario: a financial-services client wants every view of an account balance field logged for audit purposes, and also wants the account summary page to load in under 1.5 seconds. Name the conflict explicitly, decide which NFR bends and by how much, propose a design that reduces the conflict rather than just picking a side, and state who in a real organization should be the one to approve this trade-off.

## Check yourself

Can you name at least two common NFR conflict pairs on the Salesforce platform and explain why each one is a genuine trade-off, not a design mistake? Can you walk through this lesson's four-step framework for resolving an NFR conflict using an example of your own?
