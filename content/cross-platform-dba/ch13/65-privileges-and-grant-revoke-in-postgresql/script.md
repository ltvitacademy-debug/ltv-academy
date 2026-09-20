# Script — Privileges & GRANT/REVOKE in PostgreSQL

## Segment 1 (title)

GRANT and REVOKE in PostgreSQL look like standard SQL syntax you already know. What's underneath is the real content here: specific object types, ownership that matters directly, and a feature for objects that don't exist yet.

## Segment 2 (code: GRANT on object types)

Privileges are granted on specific object types — tables, schemas, sequences, databases. A detail that trips up SQL Server DBAs: schema USAGE is required just to reference objects inside it, separate from table-level SELECT.

## Segment 3 (code: ownership)

The role that creates an object owns it, and ownership itself grants full privileges regardless of any GRANT statement — closer to Unix file ownership than SQL Server's grant-centric model. Ownership can be transferred with ALTER TABLE OWNER TO.

## Segment 4 (code: ALTER DEFAULT PRIVILEGES)

Ordinary GRANT only affects objects that already exist. ALTER DEFAULT PRIVILEGES solves the real problem of new tables: it automatically applies a grant to every object a given role creates in a schema going forward, though not retroactively.

## Segment 5 (outro)

That's a recurring operational fix SQL Server DBAs solve differently. Next up: Row-Level Security in PostgreSQL, a modern, built-in feature few other platforms match.
