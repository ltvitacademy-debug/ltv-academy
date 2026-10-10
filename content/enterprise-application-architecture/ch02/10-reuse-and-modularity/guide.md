# Lesson 10 — Reuse and Modularity

**Chapter 2 · Quality Attributes · Lesson 10 of 25**

## What you'll learn

- The difference between reuse and modularity, and why they're related but not the same quality
- Where reuse pays off on Salesforce, and where chasing it too early actually costs more than it saves
- Concrete reusable building blocks: subflows, invocable Apex methods, utility LWCs, selector/service classes
- How to recognize premature abstraction — the failure mode of over-investing in reuse before it's earned

## Two related but distinct qualities

**Modularity** is about how cleanly a solution is broken into independent, well-bounded pieces, each with a clear responsibility — it's a property of the solution's structure. **Reuse** is about whether those pieces (or others) actually get used in more than one place instead of being rebuilt from scratch each time — it's a property of how the solution's pieces get consumed. A highly modular solution makes reuse *possible*, but modularity without anything actually reusing those modules is just tidy structure with no realized payoff; reuse without modularity tends to mean copy-pasting the same logic into multiple places, which isn't reuse at all — it's duplication with extra steps, since each copy now drifts independently as it gets modified over time.

## Where reuse actually pays off on this platform

- **Subflows** for logic genuinely used by more than one automation — a standard approval-notification pattern, a standard data-validation check — built once, called from multiple places, changed once when the business rule changes.
- **Invocable Apex methods** exposed to Flow, so a piece of logic that's awkward or impossible to express declaratively (a complex calculation, a call to an external system with specific error handling) can still be triggered from multiple Flows without being reimplemented as Apex in each one.
- **Selector and service classes** (from Lesson 6's layering pattern) are inherently reuse-oriented: a query written once in a selector gets called from every piece of code that needs that same data, instead of five slightly different versions of the same SOQL scattered across the codebase.
- **Utility Lightning Web Components** — a reusable date-range picker, a reusable confirmation modal — built once and dropped into multiple pages, rather than rebuilt per page with small inconsistencies each time.

## Premature abstraction is the opposite failure

Not every piece of logic deserves to be built as a generic, reusable component from the start. **Premature abstraction** is the mistake of over-engineering a flexible, configurable, reusable version of something before there's a second real use case that actually needs that flexibility — paying the cost of generality (more complexity, more configuration options, more edge cases to handle) for a benefit that may never materialize. A generic "notification engine" built to handle every conceivable future notification type, when the business has exactly one notification requirement today and no concrete second one on the roadmap, is speculative work that adds real complexity for a hypothetical future that may look nothing like what was guessed.

The practical rule practitioners generally converge on: build the specific solution first; refactor it into a reusable piece once a second, real use case actually shows up and the shared logic becomes concretely visible — not before. This isn't an argument against ever planning for reuse; it's an argument against speculatively building for reuse that hasn't been demonstrated yet.

## Weighing the trade-off honestly

Every reuse decision has a real cost: a shared subflow or Apex method now has more than one caller depending on its exact behavior, which means a future change to it has to be checked against every consumer, not just the one that prompted the change. That's a worthwhile trade when the logic is genuinely shared and stable. It's a bad trade when it's forced prematurely onto logic that was never really the same thing in two different places — just superficially similar.

## Key terms

| Term | Meaning |
|---|---|
| Modularity | How cleanly a solution is broken into independent, well-bounded pieces with clear responsibilities |
| Reuse | Whether a piece of a solution is actually consumed in more than one place rather than rebuilt |
| Invocable Apex method | An Apex method exposed so it can be called directly from Flow |
| Premature abstraction | Over-engineering a generic, reusable version of something before a second real use case demonstrates the need for that flexibility |

## Lab

Two different Flows in an org each independently implement logic that checks whether an Opportunity's Amount exceeds a regional threshold and, if so, requires an extra approval step — built by two different people, six months apart, with slightly different threshold values because nobody knew the other Flow existed. Propose a reuse-oriented fix using one of this lesson's concrete mechanisms (subflow or invocable Apex method), and explain specifically what risk this fix removes that the current duplicated version carries.

## Check yourself

Can you explain, in your own words, why modularity and reuse are related but not the same thing? Can you describe premature abstraction with an original example, and explain the practical rule for when to actually build something as reusable?
