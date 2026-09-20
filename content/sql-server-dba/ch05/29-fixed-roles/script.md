# Script — Fixed Roles

## Segment 1 (title)

A role is a principal that other principals become members of, inheriting its permissions. SQL Server ships with fixed roles at both the server and database scope, covering the permission bundles almost every environment needs.

## Segment 2 (code: fixed server roles)

Fixed server roles apply instance-wide. sysadmin is unrestricted access to everything. securityadmin manages logins. dbcreator creates, alters, drops, and restores databases. Every login is automatically a member of public — you never add members to it explicitly.

## Segment 3 (code: fixed database roles)

Fixed database roles apply inside one database. db_owner is full control over that database. db_datareader grants SELECT on every table and view; db_datawriter grants insert, update, delete. db_ddladmin allows schema changes without data access.

## Segment 4 (steps: when they're the right call)

Fixed roles are right for genuinely broad needs — an app that truly reads and writes everything is a legitimate db_datareader plus db_datawriter pairing. Defaulting to db_owner or sysadmin because it's the fast path is the single most common finding in a real security review.

## Segment 5 (outro)

Next up: custom roles and permissions — building a role scoped to exactly what a job actually requires, instead of reaching for a fixed role that's too broad.
