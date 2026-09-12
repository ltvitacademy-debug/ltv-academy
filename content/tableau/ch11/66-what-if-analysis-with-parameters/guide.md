# Lesson 66 — What-If Analysis with Parameters

**Chapter 11 · Parameters · Lesson 66 of 95**

## What you'll learn

- What **what-if analysis** means in a Tableau context, and why
  parameters are the tool that enables it
- How to drive a **reference line's position** directly from a
  parameter, so a target line moves as someone adjusts an input
- How to combine a target parameter with a calculated field to answer
  "what happens if...?" questions interactively
- A worked scenario: adjustable profit-margin and pricing what-ifs

## What "what-if analysis" means here

**What-if analysis** is asking "what would happen to my results if this
one input were different?" — without changing your actual data. What if
we raised prices 5%? What if our target margin were 25% instead of
20%? A parameter is exactly the tool for the "input" half of that
question: a value someone can adjust live, that flows into a
calculation representing "what would happen."

There's no single dedicated "What-If" menu in Tableau — you build it
from tools you already have: a Range parameter for the adjustable
input, a calculated field for the "what happens" logic, and (often) a
reference line to make the target visible on the chart itself.

## Driving a reference line from a parameter

A reference line normally sits at a fixed value — the average, a
constant number you type in. Point it at a parameter instead, and the
line moves live as someone adjusts that parameter's control:

![Edit Reference Line, Band, or Box dialog, with the Value dropdown open showing "My Parameter" as a selectable option alongside aggregations like CNT(Orders).](/courses/tableau/ch11/66-what-if-analysis-with-parameters/parameter-reference-line.png)
*The real Edit Reference Line dialog — a parameter can drive the line's position directly.*
Source: [Tableau Help — Create a Parameter](https://help.tableau.com/current/pro/desktop/en-us/parameters_create.htm)

Right-click the axis, choose **Add Reference Line**, and in the Value
dropdown pick your parameter instead of an aggregation. Now the
reference line represents a movable target — a sales goal, a margin
target, a headcount cap — instead of a fixed historical number.

## A worked what-if scenario

Combine a target parameter with a calculated field that measures the
gap between actual results and that target:

```
// Parameter: [Target Profit Margin] (Float, Range 0.00-0.50, step 0.01)
// Calculated field: Margin Gap vs. Target
(SUM([Profit]) / SUM([Sales])) - [Target Profit Margin]
```

Drag `Margin Gap vs. Target` onto Color for a bar chart of
Sub-Category, and add a reference line at `[Target Profit Margin]`
itself on a companion view of actual margin by Sub-Category. Now
someone can ask "what if our target were 25% instead of 20%?" by
moving one slider — watching, in real time, which sub-categories flip
from meeting the target to missing it, without editing a single filter
or touching the underlying data.

This is the same input/behavior split from Lesson 64, aimed at a
specific job: making a *movable target* visible and comparable against
actual performance, live.

## Key terms

| Term | Meaning |
|---|---|
| What-if analysis | Testing how results would change under a different input, without altering the underlying data |
| Parameter-driven reference line | A reference line whose position comes from a parameter instead of a fixed value or aggregation |
| `Margin Gap vs. Target` (example) | A calculated field measuring the difference between an actual result and an adjustable target parameter |

## Lab

1. Build a Float, Range parameter named `Target Profit Margin` (0.00 to
   0.50, step 0.01).
2. Build a bar chart of `SUM([Profit]) / SUM([Sales])` by
   `Sub-Category`. Add a reference line on that axis and set its Value
   to your parameter instead of an aggregation.
3. Show the parameter's control and move the slider. Confirm the
   reference line moves with it, and note which sub-categories sit
   above versus below the line at different target values.

## Check yourself

You're ready for Lesson 67 when you've built a reference line driven by
a parameter instead of a fixed value, and can explain in one sentence
what "what-if analysis" means without your data ever actually changing.
