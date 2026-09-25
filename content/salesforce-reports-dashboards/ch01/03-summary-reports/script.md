# Script — Summary Reports

## Segment 1 (title)

A summary report is where Salesforce reporting starts to feel like analysis. It takes a list of records and groups them, so you get counts, totals, and averages per group.

## Segment 2 (screenshot: Add group)

In Report Builder you convert a tabular report by adding a group. On the Outline tab, choose Add group under Groups, then pick a field. In this real example, the report is being grouped by Priority. Adding one group is what turns the report into a summary.

## Segment 3 (screenshot: result)

And here's the result. Closed cases, grouped by Priority, with a Record Count for each group and a grand total at the bottom. High, medium, and low, six, thirteen, and four, twenty-three in all. Notice how quickly the shape of the data becomes visible. Try getting that from the raw list and you'd be counting rows by hand.

## Segment 4 (code: GROUP BY)

For a T-SQL developer, this is GROUP BY. The grouping field is what you group on, and the summary is an aggregate like COUNT or SUM. One difference: the report also keeps the underlying rows, and you can expand them under each group.

## Segment 5 (steps: what summary adds)

A summary report supports up to three levels of grouping, such as owner, then stage. Numeric fields can show sum, average, minimum, or maximum per group, and record count is always available. Just as important, groupings give charts an axis, which is why most dashboard components start from summary or matrix reports.

## Segment 6 (outro)

What if you need to group across two directions at once, rows and columns? You'll use grouping constantly, so make sure it feels natural before moving on. Next up: matrix reports.
