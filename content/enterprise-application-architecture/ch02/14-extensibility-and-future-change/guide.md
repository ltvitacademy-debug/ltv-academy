# Lesson 14 — Extensibility and Future Change

**Chapter 2 · Quality Attributes · Lesson 14 of 25**

## What you'll learn

- What extensibility means as distinct from maintainability, even though the two are closely related
- Why designing for "the next plausible change" is different from designing for "every conceivable change"
- Concrete patterns that keep a design extensible without over-building it
- How this quality attribute closes the loop with technical debt and premature abstraction

## Extensibility is about tomorrow's requirement, not today's bug

**Maintainability** (Lesson 9) is about how easily an existing piece of behavior can be safely *changed or fixed*. **Extensibility** is a related but distinct quality: how easily a *new* capability can be *added* to an existing design without having to tear up and rebuild what's already there. A solution can be highly maintainable (easy to safely fix a bug in the existing approval logic) and still poorly extensible (adding a second approval path for a different record type requires rebuilding the whole thing from scratch) — the two qualities overlap but aren't identical, and a design review should check both.

## The next plausible change, not every conceivable one

This lesson's central tension is the same one Lesson 10 raised about premature abstraction, applied specifically to future-proofing: designing for *every conceivable future requirement* is wasteful and usually wrong, because most imagined futures never actually arrive and the generality built for them sits as unused complexity. Designing for *zero* future change is reckless, because some kinds of change are genuinely foreseeable from the requirements already on the table. The skill is in reading the requirements analysis (Lesson 2) for signals of **plausible** near-term change — a stakeholder who says "we're starting with three regions, but we're actively evaluating international expansion next year" is giving a real signal; a stakeholder who says nothing at all about future scope is not, and building flexibility for a scenario nobody has actually indicated is coming is speculative work, not extensibility.

## Patterns that buy real extensibility cheaply

- **Picklists and Custom Metadata Types instead of hardcoded values**, when a plausible future value is foreseeable — a region picklist is cheap to extend with a fourth value; a hardcoded `if region == "East"` chain in Apex is not.
- **A service-layer method that takes a parameter for "which rule set applies," even with only one rule set implemented today**, if a second rule set is a plausible near-term addition — this costs almost nothing extra to build now and avoids a structural rewrite later.
- **Lookup relationships over hardcoded references** where a plausible future requirement would add a second related record type.
- **Clear extension points documented in the design** — a comment or a design doc note saying "this is where a second approval path would plug in, if one is ever added" costs nothing to write and saves real time for whoever has to add it.

None of these costs much more than the version with no extensibility built in — that's the point. Real extensibility work is usually small, deliberate seams left in a design, not large speculative frameworks built in advance.

## Where this closes the loop

Extensibility, premature abstraction (Lesson 10), and technical debt (Lesson 11) are three faces of the same underlying judgment call: how much should today's design anticipate tomorrow's requirements? Too little anticipation, and reasonable future requests become expensive rewrites — a debt the business didn't know it was taking on. Too much anticipation, and today's design carries unused complexity paid for by nobody who needed it — also a cost, just a different one. An Application Architect's judgment on this specific trade-off, lesson after lesson, project after project, is arguably the single most repeated skill the role actually exercises.

## Key terms

| Term | Meaning |
|---|---|
| Extensibility | How easily a new capability can be added to an existing design without rebuilding what's already there |
| Plausible near-term change | A future requirement signaled, even informally, by a stakeholder during requirements analysis — distinct from a purely speculative "what if" |
| Extension point | A deliberately designed, documented seam in a solution where a future capability is expected to plug in |

## Lab

During requirements analysis for a new discount-approval feature, a stakeholder mentions, almost in passing, "for now it's just percentage discounts, but Finance has been talking about adding dollar-amount discounts at some point." Using this lesson's patterns, propose one small, cheap design choice you'd make now to keep dollar-amount discounts easy to add later, and explain specifically why it costs little today. Then explain what you would deliberately *not* build in anticipation of this change, and why building it now would be premature.

## Check yourself

Can you explain the difference between maintainability and extensibility, with an original example of a solution that's strong on one and weak on the other? Can you explain how to tell the difference between a "plausible near-term change" worth designing for and a purely speculative one that isn't?
