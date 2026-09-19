# Script — Server Roles, Database Roles & Object Permissions

## Segment 1 (title)

A built-in role and object-level permissions can grant the same underlying access, but they are not the same grant. One reads every table in the database, forever. The other reads exactly the named tables, and nothing else.

## Segment 2 (code: role vs. granular grants)

ALTER ROLE db_datareader ADD MEMBER is broad, fast, and database-wide -- including tables created next year. GRANT SELECT on named tables is narrow and deliberate, and stays that way unless someone explicitly grants more.

## Segment 3 (steps: when a built-in role is right)

When the account genuinely needs broad access, when the database is small and stable, or when speed matters more than precision for a low-risk, short-lived need.

## Segment 4 (code: when granular is right)

A reporting app that only ever needs three tables should never automatically gain access to a fourth, sensitive one added later. This is the mindset least privilege is built on -- starting from nothing and adding exactly what's needed.

## Segment 5 (outro)

Two ways to grant the same access, with very different blast radius. Next up: GRANT, DENY, and REVOKE -- the actual syntax and the precedence rules behind every one of these statements.
