# Lesson 64 — Dashboard Layout & Visual Hierarchy

**Chapter 8 · Dashboard Design & Storytelling · Lesson 3 of 5**

## What you'll learn

- Why reading order should drive where visuals go on the page
- How to make the most important number impossible to miss
- Fitting everything on one screen, without scrollbars
- A real example, read the way its designer intended

## Reading order decides placement

Most audiences read top to bottom, left to right. That single fact
drives real layout advice: put the highest-level information in the top
left corner, and let detail increase as the eye moves the direction
your audience naturally reads. A viewer should be able to grasp the
headline in the first second, before they've consciously "started
reading."

## Making the important number impossible to miss

If every number and chart on a page is the same visual weight, nothing
stands out. **Card visuals** are one of the simplest ways to break that
uniformity — a single number, rendered large:

![Screenshot of a small card visual showing "GDP" as the label and "71.9T" as a large, prominent number.](/courses/power-bi/ch08/64-layout-hierarchy/pbi_card.png)
*Size alone signals importance — no color or animation required.*

Size is doing the communicating here, not decoration. A number in 72pt
type reads as more important than the same number in 14pt type, before
a viewer has processed what either number actually means.

## One screen, no scrollbars

Dashboards are meant to be absorbed at a glance — which means
everything needs to fit without scrolling. If your dashboard needs a
scrollbar, that's a sign either the audience needs a full report
instead, or some tiles belong one click deeper rather than on the
dashboard itself (the same test from Lesson 63).

## A real dashboard, read the way it was designed

Here's Microsoft's own Sales and Marketing sample dashboard:

![Screenshot of the Sales and Marketing Sample dashboard in the Power BI service, showing Total Volume, Market Share, and several charts across three columns.](/courses/power-bi/ch08/64-layout-hierarchy/power-bi-marketing-sample-dashboard.png)
*Top-left: Total Volume, the headline number. Reading rightward and downward: market share trend, segment breakdown, then progressively more specific detail.*

Notice the pattern: the top-left tile is a single big number (**Total
Volume**, 50K) — the highest-level fact on the page. Moving right and
down, tiles get progressively more specific: a trend line, a segment
breakdown, a manufacturer-by-region treemap. Nothing here is
accidental — it's the reading-order principle applied directly.

## Consistency matters as much as placement

Beyond position, keep chart scales, axis ordering, and color usage
consistent across the whole dashboard. A viewer who's learned that
"teal means this year" on one tile shouldn't have to relearn that
convention on the next one. Inconsistency forces a viewer to
re-interpret every tile from scratch instead of building on what they
already understood.

## Key terms

| Term | Meaning |
|---|---|
| Reading order | The top-to-bottom, left-to-right path most audiences naturally scan |
| Visual hierarchy | Using size, position, and prominence to signal what matters most |

## Lab

1. Sketch (on paper or in a notes app) a dashboard layout for the KPIs
   you chose in Lesson 63's lab, placing the single most important one
   in the top-left corner.
2. Build it for real in Power BI, using a large card for the headline
   number and smaller visuals for supporting detail.
3. Confirm the whole thing fits on one screen with no scrollbars, at
   the size you expect your actual audience to view it.

## Check yourself

You're ready for Lesson 65 when you can look at any dashboard and
identify what its designer intended you to notice first — and whether
they succeeded.
