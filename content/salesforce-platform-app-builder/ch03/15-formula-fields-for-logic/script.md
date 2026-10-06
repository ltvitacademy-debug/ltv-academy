# Script — Formula Fields for Logic

## Segment 1 (title)

A formula field is a read-only field that calculates its own value from other fields every time it's viewed. Same formula editor as a validation rule, same functions — but instead of returning true or false to block a save, it returns a value to display.

## Segment 2 (steps: not stored)

The key idea: nothing is written to the database. It's computed the moment you view, report on, or query the record. Always current, but not directly editable, no field history to track since nothing ever technically "changes," and it can't be the target of a data import.

## Segment 3 (code: building and common patterns)

You build it from Fields and Relationships, choose Formula, and pick a return type — checkbox, currency, date, number, percent, or text. That return type controls which functions are legal. IF handles two outcomes. CASE handles several without nested IFs. BLANKVALUE substitutes a default when a field is empty, which matters because math on a null can error instead of just returning zero.

## Segment 4 (steps: cross-object reach)

A formula field can reach across relationships with dot notation — Account dot Industry, or even Account dot Owner dot Name — through lookups and master-details, up to ten relationships deep. It's read-only in both directions: you're pulling data from the related record, never writing back to it. That's the main way you surface parent data on a child without duplicating it.

## Segment 5 (code: strong fits and bad fits)

Where it's strong: calculated values, conditional display text, flags for filters and reports. Where it isn't: anything that needs to freeze a value at a point in time, since a formula recalculates every time — that's a job for a field update or Flow assignment, not a formula. And very long cross-object chains in a frequently-run filter can be genuinely slower than a stored field.

## Segment 6 (outro)

A formula calculates and displays; it never stores. Next: the tool that does store an aggregated value from child records — the roll-up summary field.
