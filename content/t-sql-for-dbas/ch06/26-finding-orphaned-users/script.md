# Script — Finding Orphaned Users

## Segment 1 (title)

Restore a database backup to a different server and something quietly breaks almost every time: the database's users still exist, but the server logins they used to map to don't exist on the new server. Those users are orphaned — one of the most common post-restore support tickets a DBA gets.

## Segment 2 (code: the real detection query)

This joins database principals against server principals and finds every user whose sid has no match. That's the real orphaned-user check — SQL Server ships a built-in procedure for the same thing, but knowing the underlying query matters because you can adapt it, filter it, or run it across every database on the instance in one pass.

## Segment 3 (code: the modern fix)

Alter user with login remaps an existing database user to a login that already exists on the server. If the login doesn't exist yet, create it first, matching the original password or Windows account, then run the same statement. Sp_change_users_login did this job on older versions and still works, but it's documented as legacy now.

## Segment 4 (steps: why this happens on every migration)

Users travel with the database backup because they live inside it. Logins don't — they live in master, on the old server. When the sids don't line up on the new server, you get an orphaned user, and it happens on nearly every restore-to-a-different-server scenario.

## Segment 5 (outro)

Once you know to check for this after every restore, it stops being a mystery ticket and becomes a five-minute fix. Next up: auditing and security queries — who did what, and how to actually prove it.
