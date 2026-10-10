# Lesson 15 — Lifecycle Architecture Review Board Practice

**Chapter 3 · Architecture Practice · Lesson 15 of 16**

## What you'll learn

- A fuller picture of what an architecture review board (ARB) does, building on the preview in Lesson 5
- Where an ARB sits in the overall lifecycle relative to the CAB and change control
- What an ARB actually evaluates a proposal against, concretely
- How ARB review scales with change significance, rather than reviewing everything
- The relationship between Salesforce's own CTA-level architecture review culture and an internal ARB

## Revisiting the ARB, now in full

Lesson 5 introduced the architecture review board (ARB) briefly, distinguishing it from the CAB: the CAB asks whether a specific, already-designed change is safe to deploy now; the ARB asks, earlier, whether a proposed approach actually fits the organization's architecture before anyone builds it. This lesson covers the ARB as a standing practice in its own right — who's on it, what it actually checks, and when it should be invoked.

## Where the ARB sits in the lifecycle

An ARB operates at **design time**, before significant build work begins — ideally before a single field is created or a line of Apex is written, when changing course still costs almost nothing. This puts it earlier than every other review mechanism in this course: before the change-control process of Lesson 4 even has anything concrete to evaluate, before the CAB of Lesson 5 has a deployable artifact to assess for safety, and well before the go/no-go checkpoint of Lesson 7. A proposal that passes ARB review still goes through the full build, test, change-control, and CAB process afterward — the ARB doesn't replace any of that, it adds a gate before any of it starts, specifically for proposals significant enough to warrant it.

## What an ARB actually checks

A design-time architecture review evaluates a proposal against a short, concrete set of questions, not a vague sense of "is this good":

- **Does this duplicate something that already exists?** The exact failure from Lesson 12's Worked Scenario 2 — a new custom object recreating what an existing one already does. This is where the data dictionary from Lessons 13-14 earns its keep: an ARB can check a proposal against documented existing structure in minutes instead of relying on institutional memory.
- **Does this fit the org's data model standards and naming conventions?** The tactical-governance standards from Lesson 3, applied concretely to one proposal.
- **Does this create a new dependency or coupling that will complicate future changes?** For example, a new integration that has several other processes start depending on near-real-time data from an external system, raising the stakes of that system's own availability for the Salesforce org.
- **Is this the right mechanism for the problem?** Declarative versus programmatic, a Flow versus a trigger, a new object versus a new field — the ARB is where that foundational build choice gets a second, more experienced set of eyes before the team commits real effort to one path.
- **Does this interact with other teams' known plans?** Connecting back to Lesson 8's multi-team coordination and the shared release calendar from Lesson 7.

## Scaling review to significance

Just as Lesson 5 warned against sending every change through the full CAB regardless of risk, an ARB that reviews every single proposed field or report would become an even worse bottleneck than an overloaded CAB, because it sits earlier and would slow down far more work for far less benefit. Mature practice defines clear triggers for ARB review — a new custom object, a new integration, anything touching a core, widely-shared object like Account or Opportunity in a structurally new way — while leaving routine, well-understood changes (a new field following an established pattern, a report) to proceed without a design-time gate at all. This mirrors the risk-tiering logic from Lesson 1 and Lesson 4, applied one step earlier in the lifecycle.

## The connection to Salesforce's own architecture culture

Lesson 12 touched on Salesforce's Certified Technical Architect (CTA) review process as an example of rigorous, scenario-based architecture evaluation. An internal ARB isn't the same thing — it's not an industry certification, and its membership is specific to one organization's own architects and senior stakeholders rather than an independent panel — but it borrows the same underlying discipline: evaluating a proposed design against real trade-offs and alternatives, with people experienced enough to ask the hard "why this and not that" question, before the organization commits to building it.

## Key terms

| Term | Meaning |
|---|---|
| Architecture review board (ARB) | A design-time review body evaluating whether a proposed approach fits the org's architecture, before significant build work begins |
| Design time | The point in a change's life before significant build work has started, when course correction is cheapest |

## Lab

A team proposes integrating a new third-party scheduling tool with Salesforce via near-real-time API calls triggered from an Opportunity automation, so that scheduling status updates instantly reflect in Salesforce. Using this lesson's checklist, write an ARB review of this proposal: address at least three of the five check areas above, and state whether you'd approve it as proposed, request changes, or reject it, with your reasoning.

## Check yourself

Can you explain where an ARB sits in the lifecycle relative to change control and the CAB, and why that ordering matters? Can you list at least four concrete things an ARB checks a proposal against? Can you explain why an ARB, like a CAB, needs significance-based triggers rather than reviewing every single change?
