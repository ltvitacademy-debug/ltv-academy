# Script — Parent-to-Child Queries

## Segment 1 (title)

So far every query in this course has pulled from one object at a time. Real work rarely stops there — you want an Account and the Contacts that belong to it, in one result. SOQL does this with relationship queries, and the parent-to-child direction looks like nothing in T-SQL.

## Segment 2 (code: a subquery inside the SELECT list)

SELECT Name, then a subquery — SELECT LastName FROM Contacts — inside the parent's own SELECT list, FROM Account. Each Account comes back with its own Name, plus a nested list of that Account's Contact records. There's no T-SQL equivalent to write this in a single query.

## Segment 3 (code: relationship name, not object name)

Notice the inner FROM says Contacts, plural — that's the child relationship name, not the object name Contact. Standard relationships are usually just the plural of the object. Custom relationships always end in __r, never __c — __c is reserved for custom fields and objects.

## Segment 4 (code: independent filtering)

The nested subquery carries its own WHERE and ORDER BY, independent of the outer query. Here the outer WHERE filters which Accounts come back; the inner WHERE filters which Contacts come back within each Account — two independent filters at two levels of one query.

## Segment 5 (outro)

Parent-to-child subqueries are the more complex relationship direction. Next up: child-to-parent queries, which turn out to be genuinely simpler.
