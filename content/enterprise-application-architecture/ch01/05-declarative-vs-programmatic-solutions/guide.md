# Lesson 5 — Declarative vs. Programmatic Solutions

**Chapter 1 · Designing Applications · Lesson 5 of 25**

## What you'll learn

- Why "declarative-first" is the platform's default guidance, and what that guidance actually means in practice
- A concrete set of factors for deciding when a requirement should move from declarative to programmatic
- Why this decision isn't permanent, and how it should be revisited as a solution's requirements grow
- How this choice connects to the governor-limit model that programmatic solutions must live inside

## "Declarative-first" is guidance, not a law

Salesforce's platform is built around **point-and-click, metadata-driven configuration** — Flow, validation rules, approval processes, Lightning App Builder — as the primary way to build on the platform, with **programmatic customization** (Apex, Lightning Web Components, Apex triggers) available for anything declarative tools genuinely can't reach. The common guidance across Salesforce's own architecture materials and the wider practitioner community is to default to declarative tools and reach for code only when a specific requirement outgrows them — not because code is inferior, but because declarative solutions are generally faster to build, easier for an admin (not just a developer) to maintain, and less likely to need a developer involved every time a business rule changes.

That guidance is a starting point for judgment, not a rule that overrides judgment. An architect who reflexively builds everything in Flow because "declarative-first" is a slogan, even once a requirement has clearly outgrown it, is making the same mistake as one who reflexively writes Apex because it's familiar. The question is always: *which tool actually fits this specific requirement*, evaluated honestly against real factors.

## The factors that actually decide it

- **Complexity of logic.** A small number of straightforward conditions fits Flow comfortably. Deeply nested conditional logic, complex recursive calculations, or logic that needs genuine object-oriented structure to stay readable starts to work against Flow's visual model rather than with it.
- **Volume and bulk behavior.** Both Flow and Apex are expected to handle bulk operations correctly, but Apex gives a developer direct, fine-grained control over how records are processed in bulk (batched DML, custom collection handling) in a way that's harder to reason about and tune inside a Flow's visual canvas as volume grows.
- **Need for asynchronous or scheduled processing.** Batch Apex, Queueable Apex, and Scheduled Apex cover asynchronous and scheduled patterns that have no equivalent fidelity in pure declarative tooling.
- **Integration and complex API work.** Calling out to external systems with non-trivial response handling, retries, or complex payload transformation tends to be more maintainable in Apex than in a Flow with many HTTP Callout elements chained together.
- **Testability and auditability requirements.** Apex's unit-testing framework gives a level of automated regression coverage that a Flow's native testing tools don't fully match for complex branching logic.
- **Who maintains it going forward.** A solution a business admin needs to tweak monthly without filing a developer ticket is a real argument for staying declarative, even if a slightly more elegant Apex solution exists.

None of these factors is individually decisive — a requirement with high volume but trivial logic might still be fine in Flow; a requirement with complex logic but low volume might still be worth building in Apex for long-term maintainability. The architect weighs them together.

## This decision isn't permanent

A Flow built when a requirement was simple can legitimately be replaced by Apex once the business adds five more conditional branches and a bulk data-load use case nobody anticipated at launch. Treating the declarative/programmatic choice as a one-time decision made at project kickoff, rather than something revisited as requirements evolve, is itself an architecture mistake — covered further in Lesson 25.

## Where governor limits enter the picture

Whichever tool is chosen, Apex code runs inside Salesforce's enforced **governor limits** — real, documented ceilings that exist because the platform is multi-tenant and no single customer's code can be allowed to consume unbounded shared resources. Two of the most load-bearing limits an architect should know by heart: a single Apex transaction can issue at most **100 SOQL queries synchronously (200 asynchronously)**, and a single transaction can process at most **10,000 records via DML operations**. These aren't arbitrary trivia — they directly shape how Apex has to be written (bulkified, outside of loops) and are part of why "can this realistically be built and run within governor limits" is itself a factor in the declarative-vs-programmatic decision, not an afterthought for later.

## Key terms

| Term | Meaning |
|---|---|
| Declarative customization | Point-and-click, metadata-driven configuration: Flow, validation rules, approval processes, Lightning App Builder |
| Programmatic customization | Code-based customization: Apex (classes, triggers, Batch/Queueable/Scheduled Apex), Lightning Web Components |
| Governor limit | A platform-enforced ceiling on resource consumption per transaction, existing because the platform is multi-tenant |
| Bulkification | Writing Apex so it processes collections of records efficiently in a single pass, rather than one-record-at-a-time inside a loop |

## Lab

A business asks for automation that: (1) runs when an Opportunity closes as Won, (2) checks three straightforward conditions on the Opportunity, and (3) updates two related records. Argue for building this in Flow. Now add a new requirement: the same automation must also call an external shipping-rate API, handle a retry if the API times out, and process up to 5,000 Opportunities at once during a nightly batch reconciliation. Explain, using the factors from this lesson, which specific new requirement(s) tip the decision toward Apex, and which original requirements would have stayed comfortably declarative on their own.

## Check yourself

Can you name at least four of the factors this lesson gives for choosing programmatic over declarative, and explain why none of them alone is automatically decisive? Can you state, correctly, the synchronous and asynchronous SOQL query limits per Apex transaction, and explain why that number exists on a multi-tenant platform?
