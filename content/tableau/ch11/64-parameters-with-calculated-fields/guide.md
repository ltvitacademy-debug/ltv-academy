# Lesson 64 — Parameters with Calculated Fields

**Chapter 11 · Parameters · Lesson 64 of 95**

## What you'll learn

- How to reference a parameter inside a calculated field
- Why this combination is what makes a parameter actually *do*
  something in your view
- A worked example: a user-adjustable reorder-threshold calculation
- The general pattern you'll reuse in Lessons 65-67: parameter defines
  the input, calculated field defines the behavior

## The missing piece from last lesson

Last lesson ended on a deliberately unsatisfying note: you built a
parameter, showed its control, and dragging the slider changed a
number — but nothing else in the view reacted. That's because a
parameter is inert until a **calculated field references it**. Once
one does, moving the parameter's slider or picking a new list value
recalculates that field immediately, and everything built on top of it
— the view, a filter, a color — updates too.

You reference a parameter inside a calculated field exactly like you'd
reference any other field: type its name, and Tableau's autocomplete
offers it alongside your dimensions and measures:

![Calculated field editor: "IF [Quantity] < my" with Tableau's autocomplete suggesting "# My Parameter" as a match, inside an IF/THEN/ELSE calculation.](/courses/tableau/ch11/64-parameters-with-calculated-fields/parameter-in-calculated-field.png)
*A parameter referenced directly inside a calculated field — the real Tableau calculation editor.*
Source: [Tableau Help — Create a Parameter](https://help.tableau.com/current/pro/desktop/en-us/parameters_create.htm)

## A worked example

Here's a complete, realistic version of that same pattern — a
reorder-alert calculation driven by a user-adjustable threshold
parameter instead of a number hardcoded into the formula:

```
// Parameter: [Reorder Threshold] (Integer, Range 0-500)
IF SUM([Quantity]) < [Reorder Threshold]
THEN "Reorder Now"
ELSE "Stock OK"
END
```

*A calculated field ("Stock Status") referencing a Range parameter called Reorder Threshold.*
Written in real Tableau calculation syntax, following the exact IF/parameter-reference pattern shown in the screenshot above.

Drag `Stock Status` onto Color in a bar chart of products by quantity
on hand, show the `Reorder Threshold` parameter's control, and now
moving that slider actually re-colors the view — because the
calculated field re-evaluates against the parameter's new current value
every time it changes.

## Why this combination matters

This is the general pattern behind every remaining lesson in this
chapter:

| Lesson | The parameter | The calculated field |
|---|---|---|
| 65 | A List of field names ("Sales," "Profit," "Quantity") | A CASE that returns the chosen measure |
| 66 | A Range for a target value | A calculation comparing actual results against that target |
| 67 | Updated live by a Set Action or Parameter Action | Whatever calculation already references it |

The parameter is always the **input** a person controls. The
calculated field is always the **behavior** — what actually happens
with that input. Neither one does anything interesting alone; the
combination is the entire point.

## Key terms

| Term | Meaning |
|---|---|
| Parameter reference | Using a parameter's name inside a calculated field's formula, exactly like referencing a regular field |
| Reorder Threshold (example) | A Range parameter representing a user-adjustable numeric input |
| `Stock Status` (example) | A calculated field whose output changes as the referenced parameter changes |

## Lab

1. Rebuild the `Profit Margin Target` parameter from last lesson if you
   don't still have it (Float, Range, 0 to 1, step 0.05).
2. Create a calculated field named `Above Target?`:
   `SUM([Profit]) / SUM([Sales]) >= [Profit Margin Target]`
3. Drag `Above Target?` onto Color in a bar chart of Sub-Category.
   Show the `Profit Margin Target` parameter's control and drag its
   slider. Confirm which sub-categories flip color as the target
   moves.

## Check yourself

You're ready for Lesson 65 when you've built one calculated field that
references a parameter, dragged it onto a shelf, and can explain — in
one sentence — why the parameter alone didn't do anything until the
calculated field referenced it.
