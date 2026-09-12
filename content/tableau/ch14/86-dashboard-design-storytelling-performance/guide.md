# Lesson 86 — Dashboard Design, Storytelling & Performance

**Chapter 14 · Dashboards · Lesson 86 of 95**

## What you'll learn

- How to close out this chapter by pulling every piece (layout, KPIs,
  actions, navigation, device design) into a coherent design philosophy
- What **dashboard storytelling** means in practice, not as a buzzword
- Concrete, real decluttering principles Tableau itself recommends
- The most common **performance** mistakes that make an otherwise good
  dashboard feel slow, and how sizing choices tie directly back to it

## Storytelling isn't a feature — it's an order of operations

"Storytelling" gets treated as something mysterious, but on a dashboard it
comes down to a concrete, learnable thing: **controlling the order in
which a viewer's eye lands on information.** You've already built every
tool this requires across this chapter — a KPI header (Lesson 81) that
lands first, filter and highlight actions (Lesson 82) that let a viewer
follow their own question deeper, a dynamic title (Lesson 84) that
confirms what they're looking at, and a layout (Lessons 79-80) that puts
the headline above the supporting detail rather than beside it as an
equal.

A dashboard that "tells a story" isn't one with more annotations or a more
dramatic color scheme — it's one where the *structure itself* guides
attention: the answer to "how are we doing?" is visible in the first three
seconds, and everything below it exists to answer the natural follow-up
question a viewer would ask next.

## Declutter, deliberately

![A clean, minimal filter panel (Segment, Sub-Category, Category checkboxes) next to a compact heat-map-style table — deliberately showing only what's necessary, nothing decorative.](/courses/tableau/ch14/86-dashboard-design-storytelling-performance/best-practice-viz-design7.png)
*Nothing here is decoration — every element either filters, informs, or labels. That restraint is the actual skill.*
Source: [Tableau Help — Best Practices for Effective Dashboards](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)

A few concrete, non-negotiable rules worth internalizing from here forward:

- **Every color needs a reason.** If a chart's color legend doesn't map to
  something the viewer needs to distinguish, it's noise, not signal.
- **Every filter should be visible near what it affects.** A global filter
  that's technically on the dashboard but visually disconnected from what
  it filters is a source of real confusion, not a shortcut.
- **White space is not wasted space.** A dashboard packed edge-to-edge with
  charts reads as noise before a viewer processes a single number. Gaps
  between containers are doing real work.
- **If you can't explain why an element is there, remove it.** This
  applies to logos, decorative images, and extra chart types just as much
  as it applies to extra KPIs.

## Performance: why a dashboard feels slow, and what to do about it

A beautifully designed dashboard that takes eight seconds to load loses the
argument before the viewer sees any of it. The most common real causes,
roughly in order of how often they're the actual culprit:

| Cause | Fix |
|---|---|
| Too many marks rendering at once (a scatter plot with 100,000+ points, an unaggregated detail table) | Aggregate where possible; push detail to a second sheet reached by navigation or a filter action |
| Live connection to a slow source query, re-run on every filter change | Switch to an extract (Chapter 2) where live data isn't actually required |
| Too many simultaneous filter/highlight actions firing on Hover | Switch non-essential actions to Select, which fires far less often |
| An oversized or unbounded dashboard canvas | Set a sensible Range size (Lesson 79) rather than Automatic, so Tableau isn't recalculating layout constantly |
| Excessive quick filters, each querying the full data source independently | Use context filters (Chapter 5) so downstream filters query an already-narrowed set |

![Tableau's Range sizing controls: minimum size 800×600 and maximum size 900×700, both checked and set.](/courses/tableau/ch14/86-dashboard-design-storytelling-performance/sizing3.png)
*A bounded Range keeps the canvas predictable — both for design and for how much Tableau has to recompute as it renders.*
Source: [Tableau Help — Best Practices for Effective Dashboards](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)

Notice how directly this ties back to earlier chapters: extracts vs. live
connections (Chapter 2), context filters and order of operations
(Chapter 5), and dashboard sizing (Lesson 79) all resurface here as
performance levers, not just modeling or layout choices. A slow dashboard
is very often a symptom of a decision made several chapters earlier, not a
Tableau limitation — which is exactly the point Chapter 16 (Performance
Optimization) picks up and goes deeper on.

## Bringing the chapter together

Across eight lessons, this chapter built: dashboards themselves (79),
layout mechanics (80), KPI headers (81), filter and highlight actions
(82), URL/parameter/set actions (83), navigation and dynamic titles (84),
device-specific design (85), and now the design judgment to tie it all
together. That's the actual skill set behind the words "I can build
dashboards in Tableau" on a resume — not just knowing where the buttons
are, but knowing which combination of them produces something a real
stakeholder would trust.

## Key terms

| Term | Meaning |
|---|---|
| Dashboard storytelling | Structuring a dashboard's layout and interactivity so a viewer's attention follows a deliberate order, not a random one |
| Decluttering | Removing any element (color, filter, image) that doesn't serve a specific, explainable purpose |
| Context filter | A filter that narrows the data set before other filters run against it, reducing repeated query work (Chapter 5) |
| Dashboard performance | How quickly a dashboard loads and responds to interaction — driven by data volume, connection type, actions, and sizing |

## Lab

1. Take any dashboard you've built in this chapter and run a decluttering
   pass: remove or justify every color, every filter, and every decorative
   element using the four rules above.
2. Identify one realistic performance risk in that same dashboard (a live
   connection, a Hover-triggered action, an unaggregated table) and apply
   the corresponding fix from the table above.

## Check yourself

You're ready for Lesson 87 when you can explain dashboard storytelling as
an order-of-operations concept rather than a decoration concept, and name
at least two performance fixes that trace back to a decision from an
earlier chapter (extracts, context filters, or sizing) rather than
anything new in this one.
