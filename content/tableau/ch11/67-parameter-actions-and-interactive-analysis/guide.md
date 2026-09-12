# Lesson 67 — Parameter Actions & Interactive Analysis

**Chapter 11 · Parameters · Lesson 67 of 95**

## What you'll learn

- What a **Parameter Action** is, and how it differs from manually
  moving a parameter's slider or dropdown
- How to build one using the real Add Action / Edit Parameter Action
  dialogs
- A worked example: clicking a mark updates a parameter, which updates
  a calculated field, which updates the whole view
- How this closes the loop on everything this chapter has built —
  parameters, calculated fields, reference lines, and now direct
  interaction

## From manual control to direct interaction

Every parameter so far has been driven by a person manually operating
its control — dragging a slider, picking from a dropdown. A **Parameter
Action** removes that middle step: hovering over, clicking, or
selecting from a menu on a mark *directly in the view* sets a
parameter's value, using data from whatever was just interacted with.

You build one from **Worksheet > Actions > Add Action > Change
Parameter**:

![Actions dialog with Add Action expanded, showing "Change Parameter..." as an option alongside Filter, Highlight, Go to URL, and Go to Sheet.](/courses/tableau/ch11/67-parameter-actions-and-interactive-analysis/add-action-change-parameter.png)
*The real Actions menu — Change Parameter sits alongside the other action types you may already know.*
Source: [Tableau Help — Use Parameter Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_parameters.htm)

That opens the Edit Parameter Action dialog, where you configure the
whole interaction:

![Edit Parameter Action dialog, configuring an action named "Select Fruit" that runs on Hover, sourced from a "Fruit" sheet, targeting a parameter named "ChooseAType," with its value set from the "Fruit type" field.](/courses/tableau/ch11/67-parameter-actions-and-interactive-analysis/edit-parameter-action-dialog.png)
*The real Edit Parameter Action dialog, shown in the full Tableau Desktop workspace.*
Source: [Tableau Help — Use Parameter Actions](https://help.tableau.com/current/pro/desktop/en-us/actions_parameters.htm)

The key settings:

| Setting | What it controls |
|---|---|
| **Source Sheet(s)** | Which worksheet(s) the interaction is captured from |
| **Run action on** | Hover, Select, or Menu |
| **Target Parameter** | Which parameter gets updated |
| **Field / Value** | Which field's value (from the mark that was interacted with) gets written into the parameter |

## A worked example

Take the `Target Profit Margin` what-if parameter from last lesson.
Instead of forcing someone to type in a competitor's or a peer
region's margin manually, add a Parameter Action that runs on **Select**,
sourced from a small reference table of regional benchmarks, targeting
`Target Profit Margin`, with its value pulled from a `Benchmark Margin`
field. Now clicking "West Region Benchmark: 22%" in a small reference
table instantly sets the target parameter to 0.22 — and every
calculated field and reference line built on that parameter (from
Lessons 64 and 66) updates immediately, with no typing at all.

This is the same chain you've built the whole chapter, with one new
link at the front:

```
Click a mark  →  Parameter Action sets the parameter
             →  Calculated field re-evaluates (Lesson 64)
             →  Reference line moves (Lesson 66)
             →  Whole view updates
```

## Why this matters for dashboards

Parameter Actions are what let a published dashboard feel like a real
application instead of a static report: clicking a competitor's name
updates a comparison; clicking a month updates a "compared to" baseline
everywhere else on the page. Combined with the Set Actions from Lesson
61, Parameter Actions are one of the two main mechanisms behind almost
every interactive, click-driven Tableau dashboard you've ever used.

## Key terms

| Term | Meaning |
|---|---|
| Parameter Action | An interaction (hover/select/menu) on a mark that sets a parameter's value automatically |
| Change Parameter | The Add Action type used to create a Parameter Action |
| Target Parameter | The parameter a given Parameter Action is configured to update |

## Lab

1. Reuse (or rebuild) the `Target Profit Margin` parameter and
   `Margin Gap vs. Target` calculated field from Lesson 66.
2. Build a small worksheet listing a few benchmark values (e.g., "20%
   Industry Average," "25% Stretch Goal") as a dimension with a
   corresponding numeric field.
3. Add a Parameter Action (**Worksheet > Actions > Add Action > Change
   Parameter**) that runs on **Select**, targets `Target Profit Margin`,
   and sets its value from your benchmark field. Click each benchmark
   and confirm the target — and everything built on it — updates
   instantly.

## Check yourself

You're ready to move on to Chapter 12 (Level of Detail Expressions)
when you've built one working Parameter Action, and can trace, in one
sentence, the full chain from "click a mark" to "the view updates" that
this chapter's four lessons built one link at a time.
