# Script — Capstone: Build a Sales Dashboard

## Segment 1 (title)

Time to build. Open your org and follow along. We'll turn the five sales questions from the kickoff into five reports, then assemble them into one Monday-ready dashboard.

## Segment 2 (steps: five reports)

Five reports, one per question. Won this quarter, for the quota gauge. Won by region. Open pipeline by stage. Win rate and deal size. And stalled deals. All five use the standard Opportunities report type, which matters later for dashboard filters.

## Segment 3 (code: won reports)

For the first two reports, filter Close Date to this fiscal quarter and stage to Closed Won, and summarize the sum of Amount. For the regional report, group by owner role, or a region field if your org has one, and add a bar chart. The first report feeds the quota gauge, with the maximum set to six million.

## Segment 4 (code: formulas)

Pipeline coverage needs a summary formula. Filter to open opportunities closing this quarter and divide the sum of Amount by the remaining gap, two point one million. That hard-coded gap is a real limitation, since quota lives outside the report, so update it weekly. Win rate uses a row-level formula that scores each closed deal one if won and zero if lost, then a summary formula dividing its sum by the record count. Use the editor's field picker for exact names.

## Segment 5 (screenshot: dashboard builder)

In the dashboard builder, add a widget for each report and drag it into place. Big numbers, the gauge and the pipeline total, go at the top, charts in the middle, and the stalled deals table at the bottom.

## Segment 6 (screenshot: add widget)

Each widget pairs a report with a display type. Pick the report, choose the chart, set the value and grouping, and title the component with the point it makes, not the report name.

## Segment 7 (code: filters and running user)

Add two dashboard filters, region and opportunity type, both on fields all five reports share. Choose the running user carefully. A specified user with broad visibility suits Monday's meeting, but everyone sees what that user sees, so confirm that's acceptable. Dynamic dashboards show each viewer their own data, if your org has them.

## Segment 8 (code: reconcile)

Now reconcile. The three regions, 1.6, 1.3 and 1.0, add up to the gauge's 3.9 million. 81 deals at about 48 thousand each is roughly 3.9. Coverage is 4.2 divided by 2.1, or 2.0. If any number disagrees with its source report, fix it before anyone sees it.

## Segment 9 (outro)

Next up: the service dashboard.
