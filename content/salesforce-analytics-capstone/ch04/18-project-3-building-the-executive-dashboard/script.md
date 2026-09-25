# Script — Building the Executive Dashboard

## Segment 1 (title)

The VP of Sales at Alder and Vale wants one executive dashboard covering leads, pipeline and service health. This lesson gives you the design decisions, not click-by-click steps. You've built dashboards before, so this time the judgment is yours. Every figure is illustrative.

## Segment 2 (screenshot: dashboard builder)

Here is the real Lightning Dashboard Builder. Notice the shape: filters across the top, single-number tiles, one trend chart, and a table beneath. That pattern is what an executive layout looks like, whatever the data.

## Segment 3 (steps: four bands)

Build in four bands. Filters first, and a Lightning dashboard allows up to three. Then a KPI row of six tiles. Then two or three charts for trends and breakdowns. Finally one detail table the VP can act on. Native dashboards cap at 20 components, and an executive view should use far fewer.

## Segment 4 (code: KPIs)

Six KPIs earn the top row. Closed won, five point four million against the nine million quota. Pipeline coverage, two times. Win rate by count, 27 percent. New leads, 1,480. Open case backlog, 187. And 71 percent of cases resolved within target. One number per tile, each with a clear title.

## Segment 5 (steps: checks)

Before you share it, run four checks. Choose the running user deliberately, because viewers will see that person's data. Schedule a refresh and keep the as-of time visible. Confirm every component honors each filter, since a filter only reaches reports containing that field. And preview on a phone, where components generally stack in reading order.

## Segment 6 (code: native vs Tableau)

Native or Tableau is a trade-off, not a rule. Native wins when the VP lives in Salesforce and each component needs one report. Tableau wins for row-level blending across objects or tighter design control. A sensible plan is to ship native first, then record what it couldn't answer. Your licences may decide it for you.

## Segment 7 (outro)

You have a dashboard. Next comes the harder part: presenting it to a VP of Sales who will interrupt you.
