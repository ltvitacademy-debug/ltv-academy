# Lesson 25 — What-If Analysis & Goal Seek

**Chapter 7 · Charts & Data Analysis · Lesson 25 of 25**

## What you'll learn

- What Goal Seek actually does — solving backward from a target result
  to the input that produces it
- The three fields every Goal Seek run needs, and what each one means
- A concrete worked example: finding the unit price that hits a revenue
  target
- How Goal Seek differs from a Data Table, in one sentence

## Every formula runs forward. Goal Seek runs it backward.

Normally you plug numbers into a formula and read off whatever result
comes out. Goal Seek flips that: you already know the result you want,
and you're missing one input. Instead of guessing values and re-checking
the formula by hand, Goal Seek does that guessing for you, automatically,
until the formula lands on your target.

It lives under **Data > What-If Analysis > Goal Seek**, and Microsoft's
own documentation demonstrates it with a loan example — you know the
payment you can afford, and you're solving for the interest rate that
gets you there:

![Screenshot of a small worksheet with Loan Amount ($100,000), Term in Months (180), Interest Rate (7.02%), and a computed Payment of ($900.00) shown in red.](/courses/excel/ch07/25-what-if-analysis-and-goal-seek/goal-seek.png)
*After Goal Seek finished adjusting the interest rate, this is what the solved worksheet looks like — the Payment formula now lands on exactly the target result.*
Source: [Microsoft Support — Use Goal Seek to find the result you want](https://support.microsoft.com/en-us/office/use-goal-seek-to-find-the-result-you-want-by-adjusting-an-input-value-320cb99e-f4a4-417f-b1c3-4f369d6e66c7)

## The three fields, every time

Every Goal Seek run — no matter the scenario — asks for exactly three
things:

- **Set cell** — the cell containing the *formula* whose result you
  care about (never a plain input value)
- **To value** — the exact target number you want that formula to reach
- **By changing cell** — the one input cell Goal Seek is allowed to
  adjust to get there

Goal Seek only ever changes one input cell per run, and that cell must
feed into the Set cell's formula — otherwise there's nothing for Goal
Seek to adjust that would actually move the result.

## A worked example: solving for a price

Say you have a simple model: `Unit Price × Units Sold = Total Revenue`,
and Total Revenue currently comes in under your $50,000 target. Rather
than guess-and-check unit prices by hand, set up Goal Seek like this:

- **Set cell**: the cell holding the Total Revenue formula
- **To value**: `50000`
- **By changing cell**: the Unit Price cell that formula depends on

Run it, and Excel finds the exact unit price — to the cent — that makes
Total Revenue land on $50,000, holding Units Sold fixed. That's the
whole value of Goal Seek: turning "what price do I need?" from a guessing
game into a solved equation.

## One-sentence contrast: Goal Seek vs. a Data Table

Goal Seek solves for **one** target using **one** changing input. If you
instead want to see the result for *many* different input values at
once — what revenue looks like at ten different unit prices side by
side, say — that's a job for a **Data Table** (under the same What-If
Analysis menu), which tests a whole range of scenarios in one pass
rather than solving backward for a single answer. Data Tables aren't
covered in depth in this course, but knowing the name — and that it
exists for a different job than Goal Seek — is worth having.

## Key terms

| Term | Meaning |
|---|---|
| Goal Seek | Solves backward: finds the input value a formula needs to hit a specific target result |
| Set cell | The cell holding the formula whose result you're targeting |
| To value | The exact target number you want the Set cell's formula to reach |
| By changing cell | The single input cell Goal Seek is allowed to adjust |
| Data Table | A related What-If Analysis tool that tests many input scenarios at once, instead of solving for one |

## Lab

1. Build a simple formula with one clear input and one clear output —
   price × quantity = revenue works well.
2. Open **Data > What-If Analysis > Goal Seek**. Set the Set cell to
   your output formula, type a target To value, and set the By changing
   cell to your input.
3. Run it, and confirm the input cell updated to a value that makes the
   formula hit your target exactly.
4. Change the target value and re-run Goal Seek — confirm it re-solves
   for a different input each time.

## Check yourself — and a note on finishing this course

You're done with Chapter 7, and with the course, when you can set up a
Goal Seek run from scratch — Set cell, To value, By changing cell — for
any formula with one clear unknown input.

That's the last lesson of Advanced Excel for Data Analysts. Twenty-five
lessons back, this course opened by refreshing the ribbon, the Name Box,
and a handful of shortcuts. It closes here, with a purpose-built
transformation engine (Power Query) and a tool that solves formulas
backward (Goal Seek) — both firmly outside what a beginner course ever
touches. That gap is the whole point: everything between Lesson 1 and
here was aimed at exactly the slice of Excel that shows up in real
analyst work, day after day.
