# Script — Capstone: Build a Service Dashboard

## Segment 1 (title)

Same method, new object. Now we build the service dashboard from the five service questions, on the standard Cases report type, with the same discipline: one report per question, and reconcile every number.

## Segment 2 (steps: six reports)

Six reports. Opened this month, closed this month, open backlog by priority, high-priority aging, cases by origin, and workload by owner. Every one is built on Cases, so dashboard filters will work across all of them.

## Segment 3 (code: volume and backlog)

Start with volume. Filter Date Opened to this month and count records: 1,840. Filter closed cases with Date Closed this month: 1,725. Opened minus closed is 115, so the backlog grew. A report of all open cases grouped by priority totals 412. Show it as a stacked bar, and use color ranges on the backlog metric so a growing number stands out.

## Segment 4 (code: aging and quality)

The urgent report lists high-priority open cases older than five days: 38, with 9 escalated. Bucket the Age field into zero to two, three to five, and six-plus days, and sort oldest first, because the reader will act from this table. For quality, a row-level formula compares closed case age to a two-day target, and a summary turns that into a percentage: 68 percent in our example, with an average age of 2.8 days.

## Segment 5 (code: origin and workload)

Origin is a donut of this month's cases: 46 percent email, 31 phone, 18 web, 5 chat. Your org's values may differ. Workload is open cases by owner. One catch: cases sitting in a queue show the queue as owner, so expect Tier 1 and Tier 2 bars in the chart. With 412 open cases and 12 agents, the average load is about 34.

## Segment 6 (steps: layout)

Lay it out top to bottom. Three metrics across the top: opened, closed, backlog. Backlog by priority and origin in the middle. Workload and the aging table at the bottom. Title each with its point.

## Segment 7 (code: filters and checks)

Add two dashboard filters, priority and case origin. Check the numbers: 1,840 minus 1,725 is 115, and the priority groups sum to 412. One honest note: this month's backlog change is easy, but a daily backlog trend needs historical trend reporting or snapshots, planned ahead.

## Segment 8 (outro)

Next up: the wrap-up and portfolio presentation.
