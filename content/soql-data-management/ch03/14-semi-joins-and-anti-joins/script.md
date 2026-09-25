# Script — Semi-Joins & Anti-Joins

## Segment 1 (title)

Sometimes you don't want a related record's fields at all. You just want to filter one object by what exists in another. SOQL does that with a subquery in the WHERE clause.

## Segment 2 (code: the semi-join)

Select Id, Name from Account where Id is in a subquery: select AccountId from Opportunity where StageName equals Closed Won. The inner query finds the accounts behind every won deal, and the outer query returns only those accounts, once each. It's called a semi-join because the second object filters the first but adds no columns.

## Segment 3 (code: the anti-join)

Swap IN for NOT IN and you get the anti-join: every Account with no Opportunity at all. That's a classic data-hygiene question, and the platform does the filtering for you. Note there's no EXISTS in SOQL. The IN form is the one you use.

## Segment 4 (steps: the rules)

There are rules. The subquery must select a single field, and it has to be an Id or a lookup field. It's independent of the outer query, so no correlated subqueries. And it can't use ORDER BY or LIMIT. When you get an error, check the selected field first.

## Segment 5 (outro)

Next, Lesson 15 pulls it all together: the parent-to-child subquery and the semi-join subquery, side by side, as we wrap up Chapter 3.
