# Lesson 11 — Technical Debt

**Chapter 2 · Quality Attributes · Lesson 11 of 25**

## What you'll learn

- Technical debt as a deliberate trade-off metaphor, not simply a synonym for "bad code"
- Why some technical debt is a legitimate, even correct, architectural choice
- Salesforce-specific sources of technical debt that accumulate quietly over time
- How to make debt visible and trackable instead of letting it become invisible risk

## Debt, not just "bad work"

**Technical debt** is the deferred cost of a shortcut taken now in exchange for faster delivery — the metaphor is deliberate: like financial debt, it isn't inherently irresponsible to take on, but it accrues "interest" (the shortcut gets more expensive to fix the longer it's left in place and the more other things get built on top of it), and if it's never paid down, the interest eventually dominates every future change. Treating all technical debt as simply a sign of incompetent work misses the point: a seasoned architect sometimes takes on debt deliberately, because a deadline, a budget, or an unclear future requirement makes the full, correct solution genuinely not worth building right now.

## When taking on debt is the right call

Shipping a hardcoded list of three regions when the business has three regions today and no concrete plan to add a fourth, rather than building a fully configurable region-management system nobody asked for, is a reasonable, even correct, decision — it's premature abstraction's cousin and the right call for the same reason Lesson 10 argues against building generic flexibility before it's needed. The difference between a reasonable deferral and a reckless one isn't whether a shortcut was taken — it's whether the shortcut was taken *knowingly*, with the limitation documented, versus discovered by accident by whoever hits it next.

## Sources of technical debt specific to this platform

- **Flow and trigger sprawl**, covered in Lesson 9, is one of the most common forms: automation added incrementally over years, each piece reasonable in isolation, that collectively becomes an undocumented tangle nobody fully understands.
- **Legacy automation left running after a migration.** Process Builder and Workflow Rules were retired by Salesforce and needed migration to Flow; an org that still has old Workflow Rules or Process Builder processes running alongside newer Flow automation, left in place "because it still works," is carrying real, specific debt with a known deadline pressure behind it.
- **Hardcoded assumptions that quietly become false.** A validation rule or formula that assumed "this picklist will only ever have these 4 values" becomes debt the moment a 5th value gets added and nobody revisits the rule.
- **Deferred data-model fixes.** A field that was given the wrong data type at launch, left in place because migrating existing data is disruptive, that every new feature now has to work around rather than fix.

## Making debt visible instead of invisible

The single most important discipline around technical debt is making it *visible* rather than letting it live only in the memory of whoever created it. A short, living list — even a simple tracked backlog item or a comment in the relevant Flow/Apex description — that states what the shortcut is, why it was taken, and what would trigger revisiting it, turns invisible risk into a known, manageable, prioritizable item. An architect reviewing a design (Lesson 20) should be explicitly asking "what debt is this design knowingly taking on, and is it written down anywhere?" as a standard part of that review — not treating a clean-looking design as evidence that no trade-offs were made.

## Key terms

| Term | Meaning |
|---|---|
| Technical debt | The deferred cost of a shortcut taken now in exchange for faster delivery, which accrues cost the longer it's left unaddressed |
| Deliberate debt | A shortcut taken knowingly, with the trade-off and its limitation documented |
| Reckless debt | A shortcut taken (or left in place) without documenting the limitation, later discovered by accident |
| Legacy automation debt | Technical debt from retired automation tools (such as old Workflow Rules or Process Builder processes) left running instead of migrated |

## Lab

A team ships a feature with a hardcoded assumption that every Account belongs to exactly one of three sales regions, because that's true today and there's no funded plan to expand. Six months later, the business opens a fourth region and the feature breaks in several places nobody anticipated. Write a short retrospective: was the original decision reasonable debt or reckless debt, based on whether it was documented at the time? What would you have written down at the time of the original decision to make this debt visible, and where would you have written it?

## Check yourself

Can you explain why technical debt isn't automatically a sign of poor work, using the deliberate-vs-reckless distinction? Can you name at least two Salesforce-specific sources of technical debt from this lesson and describe how each one tends to accumulate quietly?
