# Lesson 27 — Naming Conventions and Documentation

**Chapter 5 · Flow in Practice · Lesson 27 of 31**

## What you'll learn

- Why "Flow 1," "Flow 2," and "New Flow (3)" are a real operational cost, not a cosmetic annoyance
- A practical flow-naming pattern: Object + Trigger Context + Purpose
- Why every element's label matters just as much as the flow's own name
- What belongs in the flow's Description field, and why it's not optional on anything but a throwaway test

## An unnamed flow is a tax on every person who opens it after you

Flow Builder will happily let you save a flow called "New Flow" or an element called "Decision" with no further detail. Nothing breaks. But six months later, when that flow needs a fix and someone who isn't you opens it — or when *you* open it, having forgotten the details — every unclear name is a small tax paid in time spent figuring out what something does instead of just reading it.

## A flow-naming pattern that scales

A workable convention for flow labels: **Object – Trigger Context – Purpose**. For example:

```
Case - Before Save - Priority and Routing
Opportunity - After Save - Account Rollup Update
Lead - Autolaunched - Convert and Assign
```

This does real work beyond being tidy: anyone scanning the Flows list in Setup can immediately tell what object a flow touches, when it fires, and roughly what it does — without opening a single one. Combined with the one-flow-per-object-per-context rule from the last lesson, this naming pattern also makes it obvious at a glance whether a new rule belongs in an existing flow (same Object + Trigger Context) or genuinely needs a new one.

## Element labels matter just as much as the flow's name

The flow's own name is only the entry point. Inside it, a Decision element named "Decision" or a Get Records element named "Get Records 2" tells a future reader nothing about *why* it exists. Compare:

```
Vague:                        Clear:
Decision                      Check Case Severity
Get Records                   Get Related Account
Update Records                Update SLA Fields
Assignment                    Set Default Owner
```

The clear column costs nothing extra to type and turns the canvas itself into documentation — a person can often understand what a flow does just from reading the element labels top to bottom, without opening a single element's configuration.

## The Description field is not optional

Every flow (and ideally every non-trivial element) has a **Description** field. At minimum, a flow's description should capture: what business problem it solves, who asked for it or why it exists, and anything non-obvious about how it works — a specific exception, an edge case, a dependency on another flow or Apex class. This is the one place that survives even if the person who built the flow leaves the org entirely.

## Key terms

| Term | Meaning |
|---|---|
| Flow label | The flow's display name — ideally Object + Trigger Context + Purpose |
| Element label | The name shown on an individual element's box on the canvas |
| Description field | Free-text field on the flow (and elements) documenting intent, not just mechanics |
| Self-documenting canvas | A flow where element labels alone convey what it does, without opening each one |

## Check yourself

You open a flow named "New Flow 2" with elements labeled "Decision," "Decision 2," and "Update Records." What specifically makes this flow harder to maintain than one with descriptive names, and what would you rename it to follow this lesson's convention?
