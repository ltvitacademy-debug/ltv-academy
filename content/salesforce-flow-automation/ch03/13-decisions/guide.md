# Lesson 13 — Decisions

**Chapter 3 · Flow Logic · Lesson 13 of 31**

## What you'll learn

- What the Decision element does, and why it's the if-then of Flow Builder
- How outcomes, condition requirements, and outcome order fit together
- Why outcomes are evaluated top to bottom, and what happens when none match
- The newer "Define with AI" option, and why Define Manually is still the default

## The Decision element is an if-then statement

Every flow eventually has to do different things depending on the data. The **Decision** element is how Flow Builder expresses that branching. Salesforce's own description is blunt about it: *"Evaluate a set of conditions, and route users through the flow based on the outcomes of those conditions. This element performs the equivalent of an if-then statement."*

A Decision element has one or more **outcomes**. Each outcome has:

- An **Outcome Label** — what shows on the canvas connector
- **Condition Requirements to Execute Outcome** — the logic (All Conditions Are Met, Any Condition Is Met, or a custom formula) plus the actual field/operator/value conditions
- Optionally, **When to Execute Outcome** (record-triggered flows only) — run this path only when the *change itself* caused the record to start meeting the conditions

If no outcome's conditions are met, the flow falls through to the **Default Outcome** — a path you can relabel, but which never has its own conditions.

## A real example: routing a support case by severity

Here's a Decision element named **Check Case Details**, with four outcomes — Severity 0, Severity 1, Severity 2, and the Default Outcome relabeled Severity 3. The first outcome's condition checks whether the triggering case's Case Type equals "Downtime":

![The Decision element's configuration panel: Label "Check Case Details", four outcomes listed in Outcome Order (Severity 0, Severity 1, Severity 2, Severity 3 as Default), and the Severity 0 outcome's condition — Triggering Case > Case Type Equals Downtime.](/courses/salesforce-flow-automation/ch03/13-decisions/decision-outcomes-panel.png)

Resize the side panel and you can see every outcome's details lined up at once — useful once a Decision element has more than two or three branches:

![The Decision side panel showing all four outcomes (Severity 0 through 3) stacked, each with its own condition requirements visible.](/courses/salesforce-flow-automation/ch03/13-decisions/decision-side-panel-four-outcomes.png)

On the canvas, that single element fans out into four separate paths:

![The Flow Builder canvas: a single Decision element splitting into four outgoing paths, one per severity outcome.](/courses/salesforce-flow-automation/ch03/13-decisions/decision-canvas-four-paths.png)

## Order matters — for Define Manually

With **Define Manually** (the default method), outcomes are evaluated **in the order they're listed**, top to bottom. The flow checks the first outcome's conditions; if true, it takes that path and stops evaluating. If false, it moves to the next outcome. This means two outcomes could theoretically both be "true" for a given record, but only the first one in the list ever runs — so outcome order is a real design decision, not just cosmetic.

This also means a downstream element can only safely reference an outcome's value if that specific outcome actually ran. An outcome listed after the one that matched is never evaluated, so its value is null — and the Default Outcome, since it has no conditions of its own, never has a "value" to reference at all.

## Define with AI (Advanced) — evaluated differently

Flow Builder now also offers **Define with AI (Advanced)**: instead of field/operator/value conditions, you write plain-language **Outcome Instructions**, and AI decides which outcome to take at run time. The key behavioral difference: AI-defined outcomes are evaluated **simultaneously**, not in listed order — so, unlike Define Manually, reordering AI outcomes has no effect on which one wins. AI Decision isn't available for Marketing Cloud flows or record-triggered flows, and Define Manually remains the default method for a new Decision element.

## Key terms

| Term | Meaning |
|---|---|
| Outcome | One labeled path out of a Decision element, with its own conditions |
| Condition Requirements | The AND/OR/custom logic plus field-operator-value conditions for one outcome |
| Default Outcome | The path taken when no outcome's conditions are met; has no conditions of its own |
| Define with AI (Advanced) | Newer decision method using written instructions instead of conditions; evaluated simultaneously, not in order |

## Check yourself

A Decision element (Define Manually) has three outcomes in this order: "VIP," "Repeat Customer," "New Customer," plus a Default. A record matches both the VIP and Repeat Customer conditions. Which outcome's path does the flow actually take, and why?
