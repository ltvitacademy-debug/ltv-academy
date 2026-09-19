# Script — Row-Level Security

## Segment 1 (title)

Dynamic Data Masking changes what a column looks like. Row-Level Security is a different axis entirely — it restricts which rows a query is even allowed to see, based on a predicate matching the querying user's identity against a value in the row itself.

## Segment 2 (code: same query, different rows)

Two sales reps run the exact same SELECT * FROM Orders, with identical table-level permissions. Each sees only their own rows. The security policy filters below the object-permission layer entirely.

## Segment 3 (code: predicate function and security policy)

A predicate function checks the current session against a column value. A security policy binds that function to a table as a filter or block predicate — this is what actually does the restricting.

## Segment 4 (steps: filter vs block)

A FILTER predicate silently narrows what SELECT, UPDATE, and DELETE return — no error, the row just isn't there. A BLOCK predicate actively rejects a write that would violate the rule, throwing an error instead.

## Segment 5 (outro)

RLS needs zero application code changes — which is powerful, and risky if you forget it's there. A report missing rows might be RLS working correctly, not a bug. Next up: Data Discovery and Classification, finding which columns need protecting like this in the first place.
