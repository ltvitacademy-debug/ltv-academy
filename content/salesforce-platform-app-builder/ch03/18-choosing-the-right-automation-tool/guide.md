# Choosing the Right Automation Tool

**Chapter 3 · Business Logic · Lesson 18 of 24**

Five lessons, five tools. This lesson doesn't add a sixth — it's the decision framework that turns "I know what each tool does" into "I know which one to reach for," which is both the skill the Platform App Builder exam tests directly and the skill that actually matters when a stakeholder describes a requirement in plain English.

## What you'll learn

- A single decision path through all five declarative tools, plus Apex
- Why "it depends on what the requirement actually needs to happen" beats memorizing a chart
- Worked examples that sound similar but resolve to different tools
- When the honest answer is "more than one tool, working together"

## The decision path

Ask these questions about the requirement, in order:

1. **Does this only need to stop a bad save?** No data changes, no routing, just "don't let this get saved." → **Validation rule.**
2. **Does this only need to display a calculated value, never store it?** No side effects, recalculates live. → **Formula field.**
3. **Does this need a stored aggregate from direct child records?** COUNT/SUM/MIN/MAX, and a master-detail relationship already exists (or can). → **Roll-up summary field.**
4. **Does this need one or more named humans to explicitly sign off, with locking and an audit trail?** → **Approval process** (possibly triggered by a Flow's own logic for *when* to submit).
5. **Does this need multiple steps, branching, loops, a screen, or to touch several objects/records?** → **Flow** — and if it's also a legacy Workflow Rule or Process Builder process you're rebuilding, Flow is the default target regardless.
6. **Does it still not fit after all five?** Bulk, transactional, callout-heavy, or algorithmically complex logic beyond what Flow can cleanly express → **Apex**, built by or with a developer.

## Why a chart alone isn't enough

Two requirements can sound almost identical and resolve to completely different tools:

- *"Require a reason when an opportunity is marked Closed Lost"* — one condition, one record, no side effect. **Validation rule.**
- *"When an opportunity is marked Closed Lost, notify the sales manager and log a follow-up task"* — same trigger, but now there's a side effect (an email, a new record). That's an action, not a block. **Flow** (or a legacy Workflow Rule, if one already exists and isn't worth migrating yet).

The surface language — "when X, require/do Y" — is identical. What changes the answer is whether the requirement blocks, calculates, aggregates, routes for approval, or acts.

## Worked examples

| Requirement | Tool | Why |
|---|---|---|
| Block saving a Case with no Description | Validation rule | Pure block, no side effect |
| Show days-since-created on a Case | Formula field | Calculated, never stored, no action |
| Total value of all open Opportunities on an Account | Roll-up summary | Stored aggregate from direct children |
| Director sign-off before a Contract over $100K activates | Approval process | Named human, sequential sign-off, audit trail |
| Auto-assign a new Lead to a rep based on territory AND current workload | Flow | Branching logic across multiple criteria, likely multiple objects |
| Nightly batch recalculating loyalty tier for 200,000 customers from a complex formula with external data | Apex (scheduled batch) | Volume and complexity beyond Flow's practical limits |

## When it's more than one tool

Real apps rarely use exactly one. A Lesson 16 roll-up summary might feed a Lesson 14 validation rule's threshold (`IF( Total_Open_Amount__c > Credit_Limit__c, ... )`). A Lesson 17 Flow might evaluate conditions and then call Submit for Approval. A formula field might compute the value a validation rule checks. Choosing the right tool *per requirement*, then letting them compose, is the actual skill — not finding one tool that does everything.

## Recap

Work the decision path in order: block → calculate → aggregate → route for approval → branch/loop/act → and only then, code. Two requirements that sound alike can need different tools depending on whether they block, calculate, or act. Most real applications compose several of these five tools rather than relying on just one. Chapter 4 picks up from here: how a finished application actually gets delivered — reported on, secured, deployed, and adopted.

## Check yourself

A requirement says: "When a Support Case's Priority is set to Critical, automatically create a follow-up Task for the case owner due in 2 hours." Walk the decision path and name the tool, explaining why a validation rule would be the wrong choice even though the trigger condition is simple.
