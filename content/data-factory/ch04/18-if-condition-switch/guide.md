# Lesson 18 — If Condition & Switch Activities

**Chapter 4 · Control Flow & Orchestration · Lesson 2 of 6**

## What you'll learn

- How If Condition branches a pipeline into two paths
- How Switch branches into many paths from one expression
- When to reach for Switch instead of nesting If Conditions
- The real limit on how many cases a Switch can hold

## If Condition: exactly two paths

The **If Condition** activity works exactly like an if statement in
any programming language: it evaluates one expression to `true` or
`false`, and runs a completely different set of activities depending
on which:

![Screenshot of the If Condition activity's Activities tab, showing the expression field and separate activity lists for True and False branches.](/courses/data-factory/ch04/18-if-condition-switch/if-condition-activity.png)

1. Enter an expression that evaluates to a boolean — any combination
   of parameters, variables, system variables, or another activity's
   output.
2. Configure the **True** activities — what runs when the expression
   evaluates true.
3. Configure the **False** activities — what runs when it doesn't.

A real example: check whether a Lookup activity's row count is
greater than zero, copy the data if it is, and run a Fail activity
(Lesson 15) with a clear message if it isn't.

## Switch: many paths, one expression

**Switch** works exactly like a switch statement: it evaluates one
expression to a string, then runs whichever **case's** activities
match that value — or the **default** activities, if nothing matches:

![Screenshot of the Switch activity's UI, with numbered callouts showing the expression field, Add case button, and per-case activity editing.](/courses/data-factory/ch04/18-if-condition-switch/switch-activity-ui.png)

1. Enter the expression to evaluate — it must resolve to a string.
2. Select **Add case** for each distinct value you need to handle.
3. Enter each case's matching value, then edit its activities.
4. Configure **Default** for anything that doesn't match any case.

A real example: route a pipeline's behavior based on a `region`
parameter — `"US"`, `"EU"`, `"APAC"` — each case copying data into a
different destination, with `Default` handling anything unexpected.

## Why reach for Switch instead of nested If Conditions

Three or more distinct outcomes from one single value get genuinely
hard to read as nested If Conditions — an if inside the false branch
of another if, inside the false branch of another. Switch expresses
the exact same logic flatter and more legibly: one expression, a
clearly labeled case per outcome. Reach for If Condition when there
are truly only two paths; reach for Switch the moment there are three
or more.

## One real limit

A Switch activity supports a **maximum of 25 cases**. If a real
scenario genuinely needs more distinct outcomes than that, that's
usually a sign the routing logic itself belongs in a Lookup-driven
table instead — read the destination from data, rather than
hard-coding dozens of cases into the pipeline.

## Key terms

| Term | Meaning |
|---|---|
| If Condition | Branches into True or False activities, based on one boolean expression |
| Switch | Branches into a matching case's activities (or Default), based on one string expression |
| Case | One value-and-activities pair inside a Switch activity |

## Lab

1. Build an If Condition that checks a Bool variable from Lesson 17's
   lab, running one Wait activity if true and a different one if
   false.
2. Build a Switch activity with three cases and a Default, driven by
   a String parameter you define.
3. Write one sentence explaining when you'd reach for Switch instead
   of nesting two If Conditions inside each other.

## Check yourself

You're ready for Lesson 19 when you can explain, in one sentence,
why three or more distinct outcomes are easier to read as a Switch
than as nested If Conditions.
