# Lesson 6 — Declarative vs. Programmatic

**Chapter 1 · Architecture Tradeoffs · Lesson 6 of 20**

## What you'll learn

- What Flow (declarative) and Apex (programmatic) each genuinely do better
- Why "admins can maintain it" is a real architecture requirement, not a nice-to-have
- The concrete signals that should push a decision toward Apex
- Why this is usually a hybrid decision, not an either/or

## Two different owners, two different ceilings

Flow is Salesforce's primary declarative automation tool: point-and-click logic, visible as a diagram, buildable and — critically — *maintainable* by an admin with no coding background. Apex is Salesforce's programmatic language: full control over transaction behavior, governor limits, asynchronous processing, and anything Flow's built-in elements don't directly express. The real tradeoff isn't "Flow is for simple things, Apex is for complex things," though that's the rough shape of it. The sharper tradeoff is about who can own the result afterward, and what happens when the logic needs to scale or branch in ways the declarative tool wasn't built for.

A Flow that an admin built, and that another admin can open, read as a diagram, and safely modify next year, is a genuine organizational asset — not because Flow is simpler in some abstract sense, but because it keeps ownership inside the team that will actually maintain it day to day, without requiring a developer (in-house or contracted) every time a business rule changes. That ownership property disappears the moment the logic becomes complex enough that only the original flow's author can safely trace what it does — a sprawling flow with dozens of branching decision elements can become just as unmaintainable as bad Apex, just without the benefit of version control, code review tooling, or unit tests to catch a regression. Apex, conversely, gives a developer full control over exactly how a transaction behaves, lets logic be covered by genuine automated tests, and scales to volumes and branching complexity that strain Flow's execution model — but it requires a developer to build it and a developer to safely change it later, which is a real ongoing cost if the team doesn't have one.

## Where Apex actually wins

A few concrete signals, grounded in how the two tools actually perform, that should push a decision toward Apex rather than Flow:

- **High data volumes or recursive logic.** Automation that needs to run cleanly against large batches of records, or that would otherwise require careful recursion-guarding that's fragile to build declaratively, is a stronger fit for Apex's explicit control over bulkification and governor-limit management.
- **Logic too complex for Flow's elements to express cleanly.** When a requirement needs nested conditional logic, complex data transformations, or integration patterns that would require an unreasonable number of Flow elements and sub-flows to approximate, that complexity is often more maintainable, more testable, and more reviewable as actual code.
- **A need for genuine automated test coverage and CI/CD rigor.** Apex can be covered by unit tests run automatically on every deployment, caught in code review, and tracked in version control with a real diff history. Flow versioning exists, but the testing discipline around it is comparatively immature.
- **An existing trigger framework or integration pattern the team already maintains in code.** If an org already has a disciplined Apex trigger framework, adding one more encapsulated piece of logic to it can be more consistent than introducing a parallel declarative automation that fires on the same object and has to be reasoned about alongside the triggers.

## Where Flow actually wins, and the hybrid option

Flow wins decisively when the logic is simple-to-moderate, when the team maintaining it is admins rather than developers, and when visibility matters — a business stakeholder can look at a Flow diagram and roughly follow the logic in a way they can't with Apex. And the two aren't mutually exclusive: a common, genuinely good pattern is to keep the orchestration and business-rule visibility in Flow, and have the Flow call an invocable Apex method for the one piece of logic that's too complex, too high-volume, or too much in need of test coverage to build declaratively. That hybrid gets the maintainability and visibility of Flow for the parts that benefit from it, and the control and rigor of Apex for the part that actually needs it — without forcing the whole feature to live entirely on one side of the tradeoff.

## Key terms

| Term | Meaning |
|---|---|
| Flow | Salesforce's primary declarative automation tool, built and maintained visually without code |
| Apex | Salesforce's programmatic language, giving full control over transaction behavior and governor limits |
| Invocable method | An Apex method exposed so that a Flow can call it, enabling a hybrid declarative/programmatic design |
| Maintainability by role | Whether the team actually responsible for upkeep (admins vs. developers) can safely read and modify the automation later |

## Lab

A services company's admin team built a 40-element Flow to handle lead routing, and it's grown complex enough that even the original author takes twenty minutes to trace a bug. The routing logic now needs to also handle a new case: recursively re-evaluating leads in batches of up to 10,000 when a territory realignment happens. Using the criteria above, propose a redesign: what, if anything, should move to Apex, what should stay in Flow, and how would you structure the hybrid so each tool is doing the part it's actually good at?

## Check yourself

Can you explain, beyond "Flow is for simple things," what specific property of Flow and Apex this lesson says actually drives the decision? Can you name at least two concrete signals that should push a decision toward Apex, and describe what a good hybrid design between the two looks like?
