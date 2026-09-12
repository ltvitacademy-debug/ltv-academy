# Lesson 23 — Labels, Tooltips & Viz in Tooltip

**Chapter 4 · Formatting & Visual Design · Lesson 23 of 95**

## What you'll learn

- The difference between labels (always-on) and tooltips (on hover)
- How to rewrite a tooltip's text and fields in the Edit Tooltip dialog
- What Viz in Tooltip is, and why it's one of Tableau's most distinctive
  features
- When to reach for each of the three

## Labels

A **label** is text baked directly onto a mark — always visible, no
hovering required. Turn labels on from the Marks card's Label button, or
by checking **Show Mark Labels** on the toolbar. Labels are useful when
the audience needs the exact value at a glance (an executive dashboard,
a printed export) — but too many labels on a dense view turns into
clutter fast, which Lesson 26 covers directly.

## Tooltips

A **tooltip** is the text box that appears when you hover over a mark.
Click **Tooltip** on the Marks card to open the Edit Tooltip dialog:

![The Edit Tooltip dialog box, showing placeholder text for Category, Customer Name, Segment, Sub-Category, Profit, and Sales, with a formatting toolbar and checkboxes for Show tooltips, Include command buttons, and Allow selection by category.](/courses/tableau/ch04/23-labels-tooltips-viz-in-tooltip/edit-tooltip-dialog.png)
*Tableau auto-populates a new tooltip with every field currently in the view — you can freely delete, reorder, reformat, or add to it.*
Source: [Tableau Help — Control the Appearance of Marks in the View](https://help.tableau.com/current/pro/desktop/en-us/viewparts_marks_markproperties.htm)

By default, Tableau fills the tooltip with a placeholder for every field
on the shelves and the Marks card. From there you can:

- Delete fields you don't want shown
- Rewrite the surrounding text in plain language
- Use the formatting toolbar (bold, italic, alignment, color)
- Use **Insert** to add fields, or dynamic text like sheet name and page
  number

## Viz in Tooltip

**Viz in Tooltip** is Tableau's signature move: instead of just text, an
entire second worksheet renders inside the tooltip.

![A bar chart titled "Sales By Category" with a tooltip open over the Office Supplies bar, showing Category: Office Supplies, Sales: $719,047, and a full sub-category breakdown table with mini bars for Fasteners, Labels, Envelopes, Art, Supplies, Paper, Appliances, Binders, and Storage.](/courses/tableau/ch04/23-labels-tooltips-viz-in-tooltip/viz-in-tooltip.png)
*Hovering over Office Supplies reveals a fully separate worksheet — a sub-category breakdown — embedded directly in the tooltip.*
Source: [Tableau Help — Create Views for Tooltips (Viz in Tooltip)](https://help.tableau.com/current/pro/desktop/en-us/viz_in_tooltip.htm)

To build one:

1. Build a **target worksheet** — the chart that will appear inside the
   tooltip (keep its filters minimal).
2. On the **source worksheet**, click Tooltip on the Marks card, then
   **Insert → Sheets**, and pick the target sheet.
3. Tableau inserts a `<Sheet Name>` placeholder that renders the target
   worksheet live, filtered to whatever mark you're hovering over.

## Key terms

| Term | Meaning |
|---|---|
| Label | Always-on text attached directly to a mark |
| Tooltip | Hover-triggered text box, fully customizable per sheet |
| Viz in Tooltip | An entire second worksheet embedded inside a tooltip |
| Target sheet | The worksheet a Viz in Tooltip inserts and renders |

## Lab

1. On a bar chart of Sales by Category, open Edit Tooltip and rewrite the
   default text into a full sentence using the Insert menu.
2. Build a second worksheet showing Sales by Sub-Category, then insert it
   as a Viz in Tooltip on your Category bar chart.
3. Compare: turn on Show Mark Labels on the same chart and note how it
   changes the view differently than the tooltip does.

## Check yourself

You're ready for Lesson 24 when you can explain, in one sentence each,
what a label is, what a tooltip is, and what makes Viz in Tooltip
different from a normal tooltip.
