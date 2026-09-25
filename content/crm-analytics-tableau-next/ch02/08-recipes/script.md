# Script — Recipes

## Segment 1 (title)

Last lesson, dataflows: JSON files describing how to prepare data. Recipes do the same job through a visual editor called Data Prep. You point and click, see a live preview, and write the result to a dataset. This is the tool you'll use most.

## Segment 2 (screenshot: recipe graph)

Here's a real recipe graph. Three inputs, Opportunity, Account, and User, feed two join nodes. The graph shows at a glance where data comes from and how it flows to the target. Inputs can be existing datasets, or connected objects when Data Sync is enabled.

## Segment 3 (screenshot: recipe editor)

And here's the editor with an input node selected. Underneath the graph is a live preview table, showing columns like stage, full name, and close date. You can check that a join matched, or that a formula behaves, right after each step. That's the big advantage over hand-editing JSON.

## Segment 4 (steps: node types)

Four kinds of node do the work. Inputs bring data in. Joins combine two sources on matching keys. Transform nodes apply formulas, buckets, and filters, and you can chain several. And the output writes the final result to the target dataset.

## Segment 5 (screenshot: schedule)

A recipe that isn't scheduled is a dataset that goes stale. This dialog offers time-based or event-based runs, by minute, hour, week, or month. This example runs every 24 hours on weekdays at two in the morning. Match the schedule to how fresh the business really needs the data.

## Segment 6 (outro)

Now that datasets exist, next we build on them: CRM Analytics dashboards.
