# Script — Custom Roles & Permissions

## Segment 1 (title)

The fix for an over-privileged application isn't a smaller fixed role — it's a custom one, scoped to exactly what the job requires.

## Segment 2 (code: scoped to exactly what's needed)

CREATE ROLE defines a new role with no permissions until you grant them. GRANT SELECT ON SCHEMA colon colon dbo gives read access to one schema only. ALTER ROLE ADD MEMBER puts a user into it.

## Segment 3 (code: GRANT, DENY, REVOKE)

Three verbs do all the work. GRANT gives a permission. DENY explicitly blocks one, even if it was granted elsewhere. REVOKE removes a previous grant or deny. The rule that matters: DENY always wins, no matter how many grants exist through other roles.

## Segment 4 (steps: least privilege in practice)

A user's effective permission on an object is the union of every role they belong to — except wherever any role has a DENY, which subtracts back out regardless of source. That makes DENY the right tool for a targeted lockdown on a sensitive table.

## Segment 5 (outro)

Next up: encryption overview — Transparent Data Encryption, Always Encrypted, and connection encryption, and what each one actually protects.
