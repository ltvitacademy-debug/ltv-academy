# Script — GROUP BY in SOQL

## Segment 1 (title)

Last lesson summarized a whole set of records into one row. GROUP BY gets you one summary row per category instead: opportunities by stage, accounts by industry, cases by priority.

## Segment 2 (code: one row per group)

SELECT StageName, COUNT of Id, SUM of Amount, FROM Opportunity, GROUP BY StageName. One row for each distinct stage, with a count and a total. The rule is the same as T-SQL: every field in the SELECT list is either inside an aggregate or listed in GROUP BY. Records where the grouped field is null form their own group.

## Segment 3 (code: WHERE then GROUP BY)

The clause order is fixed: SELECT, FROM, WHERE, GROUP BY, ORDER BY, LIMIT. WHERE filters individual rows before they are grouped, so here it removes accounts with no revenue before averaging. To sort the groups by an aggregate, repeat the aggregate in ORDER BY, like ORDER BY COUNT of Id descending.

## Segment 4 (code: several fields and parent fields)

Group by more than one field and you get one row per unique combination. You can also group by a field reached through a relationship, like Account dot Industry. Every non-aggregated field in the SELECT list must appear in the GROUP BY list.

## Segment 5 (steps: ROLLUP)

GROUP BY ROLLUP adds subtotal and grand-total rows. In those extra rows the rolled-up field comes back null, and the GROUPING function tells you whether a null is a subtotal marker or a real null. Useful, but the plain form is what you will use most.

## Segment 6 (outro)

We can now build one row per category. But what if we only want the categories that pass a threshold, like industries with more than ten accounts? Next up: HAVING in SOQL.
