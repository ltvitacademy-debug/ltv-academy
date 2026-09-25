# Script — Bucketing

## Segment 1 (title)

Filters decide which records appear. Bucketing decides how the values in those records get grouped. It lets you create categories right inside a report, without asking an admin to build a new field.

## Segment 2 (code: the problem)

Here's the problem. Opportunity Amount has thousands of distinct values. Group by it, and you get one group per exact number, which is useless. What you want is bands, like small, medium, and large. Text and picklist fields have the same issue when many values mean the same thing.

## Segment 3 (code: CASE expression)

A bucket column is a CASE expression. If Amount is under twenty-five thousand, call it Small. Under one hundred thousand, Medium. Otherwise, Large. The logic is identical to T-SQL. The difference is that you build it with clicks, and it lives only inside this report.

## Segment 4 (steps: creating)

To create one, open a column's dropdown menu and choose Bucket this Column. Name the new field and name each bucket. Then assign values, using ranges for numbers, or picking values for picklists and text. Finally, use the bucket field as a grouping. Exact menu wording can vary slightly by release.

## Segment 5 (steps: trade-offs)

Know the trade-offs. A bucket field belongs to that one report, so you can't reuse it elsewhere. In most orgs there's a cap of about five bucket fields per report, with around twenty buckets each. If the same categories are needed everywhere, ask an admin for a formula field instead.

## Segment 6 (outro)

Bucketing gets your data into tidy categories. Next, we'll combine our filters using AND, OR, and parentheses, with filter logic.
