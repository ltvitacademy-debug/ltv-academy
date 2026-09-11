# Lesson 7 — The Report Design Surface

**Chapter 2 · Building Reports · Lesson 7 of 40**

## What you'll learn

- The eight regions of the Report Builder window, and what lives in
  each one
- Why the design surface is **not WYSIWYG** — item position affects
  layout, but the canvas size itself doesn't equal the printed page
- How to toggle the **Ruler** and **Properties** panes on when you need
  them
- Where **Report Properties**, **Body Properties**, and individual
  **item Properties** each live, and why right-clicking the wrong area
  gets you the wrong dialog

## Eight regions, one window

Report Builder's window is built around a central design surface, with
the ribbon and a set of panes arranged around it. Here's the exact same
window you'll open every time you build a report, with each region
numbered:

![The Report Builder interface with eight numbered callouts: 1 Ribbon, 2 Parameters, 3 Report Part Gallery, 4 Properties, 5 Report design surface, 6 Report Data, 7 Grouping, 8 Run.](/courses/ssrs/ch02/07-the-report-design-surface/ssrb-designview.png)
*Every region you'll touch while building a report, in one window.*

1. **Ribbon** — Home, Insert, and View tabs; the commands you reach for
   most often.
2. **Parameters** — where report parameters appear once you add them
   (empty until you do).
3. **Report Part Gallery** — a deprecated feature for reusing published
   report parts; you'll rarely open this pane.
4. **Properties** — every property of whatever's currently selected,
   from the report body down to a single text box.
5. **Report design surface** — the actual canvas where data regions,
   text boxes, images, and lines get placed.
6. **Report Data** — the pane from Lesson 6: data sources, datasets,
   parameters, images, all in one tree.
7. **Grouping** — Row Groups and Column Groups for whatever data region
   is currently selected; more in Lesson 10.
8. **Run** — switches from design view to a live preview of the report.

## Not WYSIWYG — and the design surface isn't the page

The single most common surprise for someone new to Report Builder: the
design surface's size has **no relationship** to the physical page size
you'll print or export to. Growing the canvas doesn't grow your print
area, and shrinking it doesn't shrink it either. Item position on the
canvas *does* matter — Report Builder preserves relative spacing between
items when it renders — but the canvas itself is just a workspace, not
a page preview. To actually see page breaks, switch to **Print Layout**
from the **Run** tab once you're previewing.

## Three different right-click targets, three different dialogs

Report Builder overloads "Properties" across three separate surfaces,
and which one you get depends on exactly where you right-click:

| Right-click here | You get |
|---|---|
| The white area of the design surface, outside any item | **Body Properties** — border, fill color for the report body |
| The gray/blue area *around* the design surface | **Report Properties** — page setup, code, report-level settings |
| Any specific report item (a table, text box, image) | That item's own **Properties** dialog |

Getting the wrong one is the single most common early mistake — if
Page Setup isn't where you expect it, you probably right-clicked the
white body instead of the gray margin around it.

## Turning panes on

**Ruler** and **Properties** are both off by default. Turn them on from
the **View** tab's **Show/Hide** group — the Ruler is genuinely useful
once you start caring about exact inch measurements for print layout.

## Key terms

| Term | Meaning |
|---|---|
| Design surface | The central canvas where report items get placed — not a page preview |
| Report Data pane | Data sources, datasets, parameters, images — the report's data tree |
| Grouping pane | Row Groups / Column Groups for the currently selected data region |
| Body Properties | Border/fill for the report body — accessed by right-clicking the white area |
| Report Properties | Page setup and report-level settings — accessed by right-clicking the gray area around the surface |

## Lab

1. Open Report Builder (or SSDT) and open any report, even a blank one.
2. Turn on the **Ruler** and **Properties** panes from the **View** tab.
3. Right-click the white body area and confirm you get **Body
   Properties**; right-click the gray area around it and confirm you
   get **Report Properties** with a **Page Setup** section instead.

## Check yourself

You're ready for Lesson 8 when you can point to (or name) all eight
regions of the Report Builder window from memory, and explain why
right-clicking the white body vs. the gray area around it gets you two
completely different Properties dialogs.
