# Script — GRANT, DENY & REVOKE, in Practice

## Segment 1 (title)

Three statements control every permission in SQL Server. Grant gives a permission, deny explicitly blocks it, and revoke removes a previous grant or deny. The syntax is the easy part — what actually matters is the rule for how they interact when they conflict.

## Segment 2 (code: the three statements)

Grant select gives access. Deny delete explicitly blocks it. Revoke select removes whatever statement was there before — it's not the opposite of grant, it doesn't deny access, it just erases the prior statement and falls back to whatever roles or broader grants provide.

## Segment 3 (code: DENY always wins)

Here's the rule that matters most: if a principal has both a grant and a deny on the same permission, from any source, deny wins every time. A user who's a member of a role with select granted still can't select if they have an explicit deny on that same object — not even db_owner membership gets around it.

## Segment 4 (steps: where a permission can be scoped)

Permissions flow through four levels: server, database, schema, and object. Granting at the schema level is more maintainable — new tables added later automatically inherit it — but it's also broader than most least-privilege policies want, so it's a deliberate trade-off, not a default.

## Segment 5 (outro)

Deny is the tool for locking one specific person out of one specific object, no matter what role they pick up later. Next up: finding orphaned users — what happens when a restored database's users outlive the logins they used to map to.
