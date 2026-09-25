# Script — Child-to-Parent Queries

## Segment 1 (title)

Parent-to-child queries needed a nested subquery, a relationship name, and their own WHERE. The other direction — starting at a child record and reaching up to its parent's fields — is genuinely simpler. No subquery, no parentheses. Just a dot.

## Segment 2 (code: the whole pattern)

SELECT Name, Account dot Name, FROM Contact. Account dot Name reaches up from the Contact record to its parent Account and pulls that Account's Name field, flattened right into the same row. No nested SELECT, no relationship-name plural, no separate FROM.

## Segment 3 (code: why it's simpler)

Parent-to-child needed a subquery because one Account can have many Contacts — the result has to represent a list within each row. Child-to-parent doesn't have that problem: every Contact has exactly one Account, so there's nothing to nest.

## Segment 4 (code: WHERE and custom relationships)

Account dot Industry also works directly in the WHERE clause — you can filter Contact records by a field that lives on the parent Account, with no subquery. Custom relationships work the same way, but use a __r suffix instead of the field's own __c suffix.

## Segment 5 (outro)

Dot notation is simple for one level. Next up: how far you can actually chain it — Opportunity dot Account dot Owner dot Name — and the real limit on how deep that chain can go.
