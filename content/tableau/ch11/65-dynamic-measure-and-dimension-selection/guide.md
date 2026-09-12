# Lesson 65 — Dynamic Measure & Dimension Selection

**Chapter 11 · Parameters · Lesson 65 of 95**

## What you'll learn

- How to let a viewer **swap which measure (or dimension) drives an
  entire view**, using one List parameter and one CASE calculation
- Why this is the single most common real-world use of parameters in
  published Tableau dashboards
- How to build it end to end, on both axes of a scatter plot
- The limits of this technique, and when it starts to strain

## The problem this solves

Picture a scatter plot of Profit against Sales. It's useful, but a
stakeholder immediately asks: "Can I see Quantity against Discount
instead?" Without parameters, the answer is "sure, I'll build you a
second worksheet" — and a third, and a fourth, for every combination
anyone asks for. **Dynamic measure selection** solves this with one
worksheet and one control: a parameter that lets the viewer pick which
measure fills a given axis.

## Building the selector parameter

Create a **String** parameter with **Allowable values** set to
**List**, and enter the names of every measure you want selectable:

![Create Parameter dialog for "Placeholder 1 Selector," a String parameter with Allowable values set to List, containing Discount, Profit, Quantity, and Sales as entries.](/courses/tableau/ch11/65-dynamic-measure-and-dimension-selection/parameter-swap-values-list.png)
*The real Create Parameter dialog — a List of measure names a viewer can choose between.*
Source: [Tableau Help — Swap Measures or Dimensions Using Parameters](https://help.tableau.com/current/pro/desktop/en-us/parameters_swap.htm)

Note that this parameter's value is the measure's *name*, as a string
— not the measure itself. That distinction is exactly what the
calculated field in the next step bridges.

## The CASE calculation that does the swapping

With the parameter holding a string like "Profit" or "Sales," you build
a calculated field that returns the *actual value* of whichever measure
that string names:

```
CASE [Placeholder 1 Selector]
WHEN "Discount" THEN SUM([Discount])
WHEN "Profit"   THEN SUM([Profit])
WHEN "Quantity" THEN SUM([Quantity])
WHEN "Sales"    THEN SUM([Sales])
END
```

Drag that calculated field onto Rows (or Columns), and repeat the whole
pattern with a second parameter and a second CASE calculation for the
other axis. Show both parameters' controls in the view, and now anyone
can pick any pair of measures without you building a single extra
worksheet:

![Scatter plot with "Placeholder 1 Selector" and "Placeholder 2 Selector" dropdown controls above the view, letting the viewer choose which measure drives each axis.](/courses/tableau/ch11/65-dynamic-measure-and-dimension-selection/parameter-swap-viz.png)
*The finished result — one scatter plot, any combination of measures the viewer wants.*
Source: [Tableau Help — Swap Measures or Dimensions Using Parameters](https://help.tableau.com/current/pro/desktop/en-us/parameters_swap.htm)

## Doing the same thing for dimensions

The identical pattern works for dimensions — a List parameter holding
dimension names ("Region," "Segment," "Category"), and a CASE
calculation returning the actual dimension value for whichever name is
selected. Drop that CASE field onto Color or Detail, and a viewer can
change what the view is broken out by, again without a second
worksheet.

## Where this technique strains

Every entry in the CASE statement has to be typed and kept in sync with
the parameter's list by hand — add a new measure to the data source,
and you must remember to add it to *both* the parameter's list and the
CASE statement, or selecting it will silently do nothing. This is a
manual, "set it up once" technique — it doesn't scale gracefully to
dozens of measures, but for the common case of letting someone pick
between four or five key metrics, it's the standard, expected pattern.

## Key terms

| Term | Meaning |
|---|---|
| Selector parameter | A List parameter whose values are the *names* of measures or dimensions, as strings |
| CASE-based swap | A calculated field that returns the actual value of whichever field the selector currently names |
| Dynamic measure selection | The overall pattern: parameter + CASE calculation, letting a viewer change what a view measures |

## Lab

1. Build a String, List parameter named `Y-Axis Selector` with values
   "Sales," "Profit," "Quantity," "Discount."
2. Build a calculated field `Y-Axis Value` using the CASE pattern
   above, referencing `Y-Axis Selector`.
3. Build a bar chart with `Category` on Columns and `Y-Axis Value` on
   Rows. Show the parameter's control and confirm the chart's Y-axis
   swaps between all four measures as you change the dropdown.

## Check yourself

You're ready for Lesson 66 when you've built one working
measure-selector (parameter + CASE calculation) and can explain why the
parameter's value has to be a string that *names* a measure, rather
than the measure itself.
