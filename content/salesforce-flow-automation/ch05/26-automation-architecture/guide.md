# Lesson 26 — Automation Architecture

**Chapter 5 · Flow in Practice · Lesson 26 of 31**

## What you'll learn

- Why an org with automation scattered across many flows on the same object causes real problems
- Salesforce's own guidance: one record-triggered flow per object, per trigger context
- How to combine what used to be "five little flows" into one well-organized flow using Decision elements
- Why trigger order and execution order become unpredictable once automation is spread too thin

## The problem: automation sprawl

Nothing stops an org from having ten separate record-triggered flows all firing on **Before Save** for the Case object, built by ten different people solving ten different problems over several years. Each one, on its own, looks reasonable. Together, they create a real architecture problem: nobody can predict the order they'll run in relative to each other, debugging means opening ten flows instead of one, and the org eventually has duplicate logic, conflicting updates, or flows quietly undoing each other's work.

## Salesforce's own recommendation: one flow per object, per trigger context

Salesforce's official guidance for record-triggered flows is to build **one flow per object per trigger context** — one for Before Save, one for After Save, one for Before Delete, rather than several separate flows all triggering on the same event. Inside that single flow, you use **Decision elements** to branch into the different pieces of logic that used to live in separate flows, instead of separate flows that each independently decide whether they should run.

## What consolidation actually looks like

Five scattered flows, each checking its own narrow condition and doing its own update:

- Flow A: if Case Type = Downtime, set Priority = High
- Flow B: if Case Origin = Phone, assign to Phone Queue
- Flow C: if Account Tier = Platinum, set SLA = 4 Hours
- Flow D: if Subject contains "security," flag for review
- Flow E: if Status = Escalated, notify the manager

...become one flow, with a Decision element (or a sequence of them) routing to the right logic block based on which conditions are actually true — same outcomes, same business rules, but one place to read, one place to debug, and one predictable order of execution.

## Why order becomes unpredictable with scattered flows

When multiple flows trigger on the same object and event, Salesforce does define *an* order (flows generally run before most other Before-Save automation, and administrators can set relative order for record-triggered flows specifically), but relying on that mechanism across many independently built flows is fragile — every new flow added changes the picture, and nobody remembers to check the full list before adding one more. A single consolidated flow with internal Decision logic sidesteps the question of cross-flow ordering entirely, because there's only one flow to reason about.

## This is a planning discipline, not a one-time cleanup

Automation architecture isn't something you do once to fix an existing mess — it's a standing rule for every new piece of automation: before building a new flow, check whether a flow already exists for that object and trigger context, and extend it with a new Decision branch rather than creating flow number eleven.

## Key terms

| Term | Meaning |
|---|---|
| Automation sprawl | Many separate flows on the same object/trigger, built independently over time |
| Trigger context | The specific event a record-triggered flow runs on (Before Save, After Save, Before Delete) |
| One flow per object per context | Salesforce's recommended pattern: consolidate logic into one flow using Decision elements |
| Execution order | The sequence multiple flows or automations run in — unpredictable and fragile when sprawled across many flows |

## Check yourself

An org has six separate After-Save record-triggered flows on the Opportunity object, each checking a different field. What's the recommended fix, and what specifically does it solve that leaving them separate does not?
