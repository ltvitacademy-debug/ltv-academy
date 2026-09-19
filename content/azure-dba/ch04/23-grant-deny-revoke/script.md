# Script — GRANT, DENY & REVOKE

## Segment 1 (title)

T-SQL Development never covered GRANT, DENY, or REVOKE -- that course stayed on the query-writing side. This is genuinely new, and getting the precedence rule wrong grants or blocks access silently.

## Segment 2 (code: GRANT and DENY)

GRANT gives a security principal permission to do something. DENY is an explicit block that overrides every other path to that permission, including role membership -- if a role grants SELECT but an explicit DENY exists too, the deny wins, full stop.

## Segment 3 (code: DENY beating a role grant)

This is exactly why DENY is the tool for "everyone in this broad role except this one sensitive table." A single DENY statement overrides the role's broad grant without touching the role membership at all.

## Segment 4 (code: REVOKE removes, doesn't flip)

REVOKE removes an explicit GRANT or DENY -- it doesn't grant the opposite of whatever was there, and it doesn't touch permissions the principal has through some other path like a role.

## Segment 5 (outro)

DENY beats GRANT from any source, always. REVOKE just erases one explicit statement. Next up: the principle of least privilege -- starting with nothing and adding only what's needed.
