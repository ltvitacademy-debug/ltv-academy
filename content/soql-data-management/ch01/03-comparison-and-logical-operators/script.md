# Script — Comparison & Logical Operators

## Segment 1 (title)

Now that you can sort and cap results, it's time to filter them properly. The good news: SOQL's comparison and logical operators are almost a straight copy of T-SQL's.

## Segment 2 (code: no surprises here)

Equals, not-equals, greater than, less than, AND, OR, NOT — all mean exactly what they mean in T-SQL, and parentheses group them the same way. Wrap your OR conditions in parentheses when mixing with AND, exactly like you already do.

## Segment 3 (code: LIKE and IN, same syntax)

LIKE uses the identical two wildcards: percent matches any number of characters, underscore matches exactly one. And IN matches a field against a parenthesized list of values — cleaner than a chain of OR conditions, especially useful for picklist fields like StageName.

## Segment 4 (outro)

If you can write a T-SQL WHERE clause, you can write a SOQL one almost unchanged. Next up: SOQL vs. SQL — a consolidated, honest look at what's actually different.
