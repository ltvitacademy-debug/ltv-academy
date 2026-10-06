# Lesson 7 — Choosing Declarative vs. Programmatic Solutions

**Chapter 2 · Choosing the Right Tool · Lesson 7 of 18**

## What you'll learn

- A concrete checklist for deciding between declarative automation and Apex, instead of a vague rule of thumb
- Why "Flow can do almost everything Apex used to require" has changed this decision over the last several platform releases
- The specific situations that still genuinely call for code
- Why this decision is rarely permanent — requirements and tools both change

## "Clicks before code" is a default, not a law

Lesson 1 introduced "clicks before code" as the admin's default order of operations. This lesson gives you the actual checklist behind that default, because treating it as an absolute rule leads to two opposite failures: forcing genuinely complex logic into an unmaintainable tangle of Flow elements, or reaching for Apex out of habit when a validation rule would have taken ten minutes.

## Run through these questions, in order

1. **Can this be expressed as a formula?** If the logic is "evaluate some fields, return true/false or a value," a validation rule or formula field is almost always correct, and almost always simpler than anything else on this list.

2. **Does a human need to make a judgment call?** That's an approval process (Lessons 2-3), not a formula and not Apex — code can't ask someone to decide something.

3. **Can Flow express the logic without becoming unreadable?** Flow today handles record changes, scheduled actions, screen-based data collection, loops, and even some integration via HTTP callout actions. A Flow with 40 decision elements and unclear branching, though, is a maintenance liability even though it's "declarative."

4. **Does it require complex, multi-object transactional logic that has to be provably correct?** Apex's testing framework (required, enforced code coverage, assertions) gives you a level of verification Flow doesn't have an equivalent for. If a bug here means money moves incorrectly, that verification matters.

5. **Does it need genuine bulk-processing performance?** Apex, written correctly, can process large data volumes more predictably within governor limits than an equivalent Flow, particularly across deeply related records.

6. **Does it need to call an external system in a way Flow's built-in actions can't handle?** Custom authentication, complex request/response shaping, or anything needing a callout from a context Flow doesn't support (like certain trigger contexts) usually means Apex.

7. **Who maintains this after you leave?** A declarative solution can be read and changed by the next admin. Apex requires a developer. For a small team with no dedicated developer, that's a real operational cost, not just a technical one.

## What actually tips the scale toward Apex today

Salesforce's own Flow has absorbed a large share of what used to require code. In a modern org, Apex still earns its place for:

- Complex, deeply nested business logic that's genuinely hard to express declaratively without becoming unreadable
- Processing large volumes of records with predictable, tested performance
- Integrations with external systems beyond what a simple HTTP callout action covers
- Logic that needs the kind of automated test coverage and version-controlled deployment a regulated or high-stakes process demands

## This decision isn't permanent

A Flow that was the right call two years ago might not be today — Salesforce ships new declarative capability three times a year, and some things that required Apex at one release don't anymore. Equally, a validation rule that's grown into a 15-condition monster might be a sign the actual requirement has outgrown declarative tools. Revisit the decision when the requirement changes significantly, not just when it was first built.

## Recap

- Run through formula → approval → Flow → Apex, in that order, rather than defaulting to any one tool out of habit.
- Apex still wins for provably-correct complex logic, bulk performance, and integrations Flow's built-in actions don't cover.
- Maintainability — who can actually support this after you're gone — is a real criterion, not an afterthought.
- Re-evaluate the decision when the requirement changes, not just once at the beginning.

## Try it yourself

Take the discount approval process you've built across Lessons 2-6. Walk through the checklist above for each piece (the validation rule, the approval routing, the notification) and confirm each one landed on the right tool for genuine reasons, not just because it's what the course used.

## Check yourself

A stakeholder asks for a process that recalculates a rolling 90-day average across thousands of related records every time any one of them changes, and must never silently produce a wrong number. Walk through the checklist — where does this land, and why?
