# Lesson 55 — Cards, KPIs & Slicers

**Chapter 7 · Building Reports & Visualizations · Lesson 4 of 10**

## What you'll learn

- How to build a card visual and add reference labels for context
- What a KPI visual adds beyond a plain card
- The slicer types Power BI offers, and when to reach for each
- The subtle way "Select all" actually filters behind the scenes

## Cards: one number, front and center

A **card** visual displays a single measure prominently — total sales,
signups this month, whatever matters most. Drop a **Card** visual on
the canvas and add a measure to **Values**:

![Screenshot of the Data pane with Units and Revenue measures added to the Value field well, producing a card visual.](/courses/power-bi/ch07/55-cards-kpis-slicers/build-card.png)
*Add more than one value, and more cards appear automatically.*

## Reference labels add context

A bare number rarely tells the whole story. **Reference labels** attach
a second, smaller value alongside the main callout — like showing
Returns and a return rate next to a Units count:

![Screenshot of six card sections, each showing Units or Revenue with a reference label like Returns or Revenue variance and its percentage.](/courses/power-bi/ch07/55-cards-kpis-slicers/walkthrough-add-reference-labels.png)
*Every card pairs its headline number with a supporting detail — "Revenue variance $4K, 105.0%" tells you both the raw gap and the percentage, at a glance.*

You can also break a card visual out by **Categories**, producing a
separate section per category value — exactly what's shown above, split
by channel and product line.

## KPI visuals: adding a target

A **KPI visual** goes one step further than a card: instead of just
showing a number, it shows progress toward a specific, measurable goal.
Where a card answers "what is this value," a KPI answers "how close is
this value to where it needs to be" — useful for tracking anything with
a defined target, from a sales quota to a project milestone.

## Slicers: filtering directly on the canvas

A **slicer** puts a filter control right on the report page, so viewers
can narrow the data without opening the Filters pane. Power BI offers
several slicer types:

| Slicer type | Best for |
|---|---|
| Slicer (list, tile, dropdown, date picker) | General-purpose filtering across text, numbers, and dates |
| Button slicer | A visually styled set of filter buttons, often with images or icons |
| List slicer | Large datasets needing search or hierarchical navigation |
| Input slicer | Free-form text or numeric filtering, including exact or partial matches |

Slicers, unlike the Filters pane, are always visible — making the
current filter state obvious at a glance, which is exactly why you'd
place one next to the visuals it controls rather than tucking it away.

## The subtlety behind "Select all"

Turn on **Show "Select all" option**, and selecting it produces the
same result as clearing every selection — no filter is applied at all.
Here's the part that surprises people: when you then clear *one* item
after selecting Select all, Power BI doesn't apply an "is" filter
listing everything still selected. It applies an **"is not"** filter
containing only the cleared item:

![Screenshot of Segment slicers showing that Select all applies no filter, and clearing one value applies an inverted "is not" filter instead.](/courses/power-bi/ch07/55-cards-kpis-slicers/select-all-is-not-filtering.png)
*Select all, then clear "Small Business" — the slicer now filters "Segment is not Small Business," not "Segment is [every other value]."*

This matters in practice: a new value added during a future data
refresh is automatically included, since nothing explicitly excluded
it. If you'd built the equivalent filter manually by selecting every
current value, a brand-new value wouldn't show up until you updated the
selection yourself.

## Key terms

| Term | Meaning |
|---|---|
| Card | A visual displaying one measure prominently |
| Reference label | A secondary value shown alongside a card's main callout |
| KPI visual | A visual showing progress toward a specific, measurable target |
| Slicer | An on-canvas filter control, always visible to report viewers |

## Lab

1. On **AdventureWorksDW2014**, build a card showing
   `SUM(FactInternetSales[SalesAmount])`, then add a reference label
   showing order count alongside it.
2. Add a **Slicer** visual filtering by `DimDate[CalendarYear]`, and a
   **Button slicer** filtering by `DimProductCategory`. Compare how each
   feels to use.
3. Turn on **Select all** on one slicer, select it, then clear one
   value — open **Edit interactions** or check the visual's tooltip to
   confirm it's applying an "is not" filter rather than listing every
   remaining value.

## Check yourself

You're ready for Lesson 56 when you can explain why a slicer's "Select
all, then clear one" behavior handles new data more gracefully than
manually selecting every current value.
