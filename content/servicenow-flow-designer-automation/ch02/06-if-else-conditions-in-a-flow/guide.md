# Lesson 6 — If/Else Conditions in a Flow

**Chapter 2 · Flow Logic & Data · Lesson 6 of 27**

## What you'll learn

- What an If/Else construct does inside Flow Designer, natively, with no scripting
- How a flow condition is built — the same field/operator/value pattern from ACLs and list filters
- How to branch a flow into two distinct sets of subsequent actions
- A real example: urgent SMS vs. standard email based on Priority
- What happens to each branch's steps once the condition evaluates

## Branching without a script

Up to this lesson, every flow you've built has run top to bottom:
trigger, then Step 1, then Step 2, then Step 3, in a single straight
line. Real business processes aren't straight lines — a critical
incident needs different handling than a low-priority one, an
expensive purchase needs a different approval path than a cheap one.
Flow Designer's native **If/Else** logic handles this without a
single line of script: you define a condition, and the flow takes
one of two paths of subsequent actions depending on whether that
condition evaluates true or false.

## Building the condition

The condition itself uses a pattern you've already seen twice in
this platform's ServiceNow courses: field, operator, value — the
same structure behind an ACL condition and a list filter. Inside the
If/Else step, you pick a field (often a data pill from the trigger
or an earlier step), an operator (is, is not, greater than, contains,
is empty, and so on), and a value to compare against. "Priority is
Critical." "Cost is greater than 1000." "Assignment Group is
empty." Multiple conditions can be combined with AND/OR, exactly like
a list filter's condition builder.

## Two paths, not one

Once the condition is in place, Flow Designer gives you two branches
in the canvas: the **If** branch, which runs its own sequence of
actions only when the condition evaluates true, and the **Else**
branch, which runs a separate sequence only when it evaluates false.
Each branch can contain as many steps as the process needs — an If
branch that sends an urgent notification and creates an escalation
task, an Else branch that simply sends a standard notification and
ends. Steps inside one branch never run as part of the other; the
flow evaluates the condition exactly once and commits to a single
path for that execution.

## A real example

Take an Incident Created trigger. The If/Else condition checks
whether the incident's Priority field equals "Critical." If true,
the If branch sends an urgent SMS notification to the on-call
engineer. If false, the Else branch sends a standard email
notification to the assignment group instead. Both branches can
continue on to shared downstream steps after the branch completes, or
each can end the flow on its own — Flow Designer doesn't require the
branches to reconverge.

## Why this replaces a script

In a pre-Flow-Designer world, this branching logic lived in a
Business Rule or Script Include, written in server-side JavaScript
with an actual `if` statement. Flow Designer's If/Else gives an
administrator — not a developer — the same decision-making power
through a visual condition builder, keeping the logic inside the
flow's canvas where anyone maintaining the process later can read it
at a glance.

## Key terms

| Term | Meaning |
|---|---|
| If/Else | A native Flow Designer construct that branches a flow's path based on a condition |
| Condition | A field/operator/value comparison, the same pattern used by ACLs and list filters |
| If branch | The sequence of actions that runs only when the condition evaluates true |
| Else branch | The sequence of actions that runs only when the condition evaluates false |

## Check yourself

Without looking back: a flow's If/Else condition checks "Cost is
greater than 1000." Which branch runs for a requested item costing
exactly $1,000 — the If branch, the Else branch, or neither — and
why does the operator you chose for the condition matter here?
