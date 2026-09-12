# Lesson 24 — Formatting Numbers, Dates, Axes & Headers

**Chapter 4 · Formatting & Visual Design · Lesson 24 of 95**

## What you'll learn

- Where all field formatting happens in Tableau: the Format pane
- How to format numbers as currency, percentage, or a custom pattern
- How to build a custom date format from format symbols
- The difference between an axis (continuous) and a header (discrete),
  and how to format each

## The Format pane

Right-click almost anything in a Tableau view — a field on a shelf, a
number in the table, an axis, a header — and choose **Format**. It opens
the Format pane on the left, scoped to whatever you clicked.

## Formatting numbers

![The Format pane for SUM(Profit), with the Numbers dropdown open showing Automatic, Number (Standard), Number (Custom), Currency (Standard) selected and highlighted, Currency (Custom), Scientific, Percentage, and Custom, plus a Currency (Standard) locale panel set to English (United States).](/courses/tableau/ch04/24-formatting-numbers-dates-axes-headers/format-numbers.png)
*The Numbers dropdown in the Format pane — Currency (Standard) is selected here, with a locale control on the right.*
Source: [Tableau Help — Format Numbers and Null Values](https://help.tableau.com/current/pro/desktop/en-us/formatting_specific_numbers.htm)

Options include Automatic, Number (Standard/Custom), Currency
(Standard/Custom), Scientific, Percentage, and a fully open-ended Custom
pattern using special format characters. This applies to any numeric
field — measures, calculated fields, and parameters all format the same
way.

## Formatting dates

![The Format pane for QUARTER(Order Date), showing the Header tab active, with Font, Alignment, Dates set to a custom pattern (3/14/2001), and Shading fields.](/courses/tableau/ch04/24-formatting-numbers-dates-axes-headers/format-dates.png)
*The same Format pane, applied to a date field — the Dates dropdown offers presets plus a fully custom pattern.*
Source: [Tableau Help — Custom Date Formats](https://help.tableau.com/current/pro/desktop/en-us/dates_custom_date_formats.htm)

Right-click a date field and choose Format to see the Dates dropdown.
For continuous dates and exact discrete dates, the last item in the list
is **Custom** — you combine format symbols (day, month name, four-digit
year, and so on) into your own pattern, the same idea as a custom number
format but for dates.

## Formatting axes

An **axis** is what a continuous field renders as: a scaled line of
values along the edge of the chart.

![A stacked column chart of Sales by Region and Segment, with a currency-formatted vertical axis running from $0 to $700,000.](/courses/tableau/ch04/24-formatting-numbers-dates-axes-headers/format-axes.png)
*The Sales axis is formatted as currency — every gridline value reads with a dollar sign, not a raw number.*
Source: [Tableau Help — Parts of the View](https://help.tableau.com/current/pro/desktop/en-us/view_parts.htm)

Because an axis is just a continuous field's rendering, it gets formatted
through the exact same Numbers dropdown you just saw for Profit — right-
click the axis, choose Format, and pick a number format.

## Formatting headers

A **header** is what a discrete field renders as: the row or column
labels showing each member's name.

![A table with column headers showing Order Date broken into years 2012-2015, and row headers listing Sub-Category names like Accessories, Appliances, Art, and Binders, each with a currency value per year.](/courses/tableau/ch04/24-formatting-numbers-dates-axes-headers/format-headers.png)
*Column headers here show Order Date by year; row headers show each Sub-Category — both are discrete-field renderings, controllable via Format.*
Source: [Tableau Help — Parts of the View](https://help.tableau.com/current/pro/desktop/en-us/view_parts.htm)

You can show or hide headers entirely (right-click → Show Header), and
format their font, alignment, and shading the same way as any other part
of the view.

## Key terms

| Term | Meaning |
|---|---|
| Format pane | The left-side panel for formatting any selected field, axis, or header |
| Axis | A continuous field's rendering — a scaled line of values |
| Header | A discrete field's rendering — labels for each member |
| Custom format | A user-built number or date pattern, for cases the presets don't cover |

## Lab

1. Build a bar chart of Sales by Region. Format the Sales axis as
   Currency (Standard), then compare it to Currency (Custom) with zero
   decimal places.
2. Add Order Date to Columns at the Quarter level, and apply a Custom
   date format so quarters display as "Q1 '24" instead of the default.
3. Hide and re-show the row headers on a text table, and notice exactly
   what disappears and reappears.

## Check yourself

You're ready for Lesson 25 when you can explain, without looking, the
difference between an axis and a header, and name where in Tableau you'd
go to change either one's format.
