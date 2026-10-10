# Lesson 1 — What a Tradeoff Is

**Chapter 1 · Architecture Tradeoffs · Lesson 1 of 20**

## What you'll learn

- Why "best practice" is the wrong frame for most real architecture decisions
- The difference between a tradeoff and a mistake
- The three questions every real tradeoff decision has to answer
- Why the same decision can be correct for one org and wrong for another

## "Best practice" is a trap

Ask ten Salesforce architects whether you should build a feature with Flow or with Apex, and you'll get ten answers that start with "it depends." That's not evasiveness — it's the honest answer. A junior admin wants a rule: "always use Flow" or "always use Apex." A Technical Architect has to resist that pull, because almost nothing in real architecture work is universally best. Most of what looks like a best-practices checklist is actually a tradeoff that someone already made for a *specific context*, and then wrote down the answer without writing down the context that made it correct.

This course is about naming those contexts explicitly. A **tradeoff** is a decision where gaining more of one desirable quality costs you some of another desirable quality — and no option gets you everything. If one option were simply better on every dimension that mattered, it wouldn't be a tradeoff at all; it would just be the right answer, and there'd be nothing to decide. The moment you catch yourself saying "it depends," you've found a real tradeoff, and your job is to figure out what it depends *on*.

## A tradeoff is not a mistake

Students new to architecture often treat "we made a tradeoff" as an admission of failure — as if a better architect would have found the option with no downside. That's a misunderstanding worth correcting early. A system that uses batch processing instead of real-time integration isn't a flawed system; it might be exactly the right system for an org that doesn't need sub-second data and would rather spend that engineering effort elsewhere. A mistake is choosing an option without understanding what you gave up, or choosing the option that fits a different org's constraints instead of your own. A well-made tradeoff, documented with its reasoning, is a sign of mature architecture — not a shortcut you'll have to apologize for later.

The difference matters because it changes what you're accountable for. You are not accountable for picking the option with zero downside — none exists. You're accountable for knowing what the downside is, confirming it's a downside this organization can live with, and being able to explain that reasoning to someone else later.

## Three questions every tradeoff answers

Every tradeoff decision in this course reduces to three questions, and you should be able to answer all three before you commit to an option:

1. **What are we optimizing for, and what are we willing to spend to get it?** Every option on one side of a tradeoff buys you something (speed, security, flexibility, cost savings) by spending something else (money, time, usability, long-term adaptability).
2. **What does this specific organization actually need, right now, and for the foreseeable future?** The same tradeoff resolves differently for a 50-person startup than for a regulated bank, and differently again for the same bank in year one versus year five of a platform's life.
3. **What happens when the context changes?** A tradeoff made correctly today can become wrong in two years if the org's scale, regulatory environment, or team composition shifts. Part of a good tradeoff decision is naming the conditions under which you'd revisit it.

This course walks through the recurring tradeoffs that show up constantly in real Salesforce architecture work — security vs. usability, performance vs. complexity, build vs. buy, synchronous vs. asynchronous, declarative vs. programmatic, real-time vs. batch, and more — and for each one, gives you the real criteria an architect uses to pick a side for a given scenario, not a one-size-fits-all rule.

## Key terms

| Term | Meaning |
|---|---|
| Tradeoff | A decision where gaining more of one desirable quality costs you some of another, with no option that maximizes both |
| Best practice | A previously-made tradeoff decision, correct in its original context, often repeated without that context |
| Context | The specific constraints (scale, budget, team, regulatory environment, timeline) that make one side of a tradeoff correct for a given organization |
| Decision criteria | The concrete, checkable factors used to decide which side of a tradeoff fits a specific scenario |

## Lab

Pick any Salesforce feature decision you've heard described as a "best practice" (for example: "always build integrations asynchronously," or "never put business logic in a trigger," or "prefer declarative automation over code"). Write two or three sentences identifying the tradeoff hiding underneath that advice — what does following it cost you, and in what kind of organization would the opposite choice actually be correct? If you can't find a cost, you haven't found a real tradeoff yet — look again.

## Check yourself

Can you explain, in your own words, why a decision with a real cost on one side isn't automatically a mistake? Can you name the three questions a tradeoff decision should answer before you commit to an option, and apply them to a scenario of your own choosing?
