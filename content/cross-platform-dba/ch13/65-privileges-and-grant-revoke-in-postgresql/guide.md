# Privileges & GRANT/REVOKE in PostgreSQL

`GRANT` and `REVOKE` exist in PostgreSQL, and at a glance they look like the SQL-standard
syntax you already know from SQL Server. The real content of this lesson is what's
underneath: PostgreSQL privileges apply to specific object types with specific privilege
names, ownership matters more directly than in SQL Server, and `ALTER DEFAULT PRIVILEGES`
solves a real, recurring problem — granting access to objects that don't exist yet — that
SQL Server DBAs solve differently.

## What you'll learn

- Real `GRANT`/`REVOKE` syntax across PostgreSQL's object types
- How ownership and privileges interact
- `ALTER DEFAULT PRIVILEGES`, and the real problem it solves

## GRANT and REVOKE on real object types

PostgreSQL privileges are granted on specific object types, each with its own valid
privilege list:

```sql
-- table privileges
GRANT SELECT, INSERT, UPDATE ON sales.orders TO app_user;
GRANT ALL PRIVILEGES ON sales.orders TO ops_admin;

-- schema privileges (needed just to "see into" a schema)
GRANT USAGE ON SCHEMA sales TO app_user;

-- sequence privileges (needed for serial/identity columns to work via INSERT)
GRANT USAGE, SELECT ON SEQUENCE sales.orders_id_seq TO app_user;

-- database-level connect privilege
GRANT CONNECT ON DATABASE myapp_db TO app_user;

-- revoke works the same way, mirrored
REVOKE INSERT ON sales.orders FROM app_user;
```

A detail that trips up SQL Server DBAs: `USAGE` on a schema is required just to reference
objects inside it at all — without it, `SELECT` privilege on a table inside that schema isn't
enough, because the role can't even "see into" the schema. This two-layer requirement
(schema `USAGE` plus the specific object privilege) doesn't have a direct SQL Server
equivalent, since SQL Server schema permissions work somewhat differently.

## Ownership matters directly

The role that creates an object **owns** it, and the owner always has full privileges on
that object regardless of any GRANT — ownership itself is a privilege source, not just
metadata. Ownership can be transferred with `ALTER TABLE ... OWNER TO new_role;`. This is
closer to how file ownership works on a Unix filesystem than to SQL Server's more
permission-grant-centric model, and it matters operationally: a role that creates lots of
objects (like a migration tool's service account) ends up owning everything it creates,
which is exactly the scenario the next feature addresses.

## ALTER DEFAULT PRIVILEGES: granting access to objects that don't exist yet

Ordinary `GRANT` only affects objects that already exist. If a migration process creates a
new table tomorrow, today's `GRANT SELECT ON sales.orders TO reporting_team;` does nothing
for it — reporting_team would need a fresh grant on every new table, forever. PostgreSQL's
real answer is `ALTER DEFAULT PRIVILEGES`:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE migration_service IN SCHEMA sales
  GRANT SELECT ON TABLES TO reporting_team;
```

This says: "from now on, whenever `migration_service` creates a new table in the `sales`
schema, automatically grant `SELECT` on it to `reporting_team`." It only affects objects
created *after* the statement runs — it's not retroactive — but it solves a real, everyday
operational problem (keeping a reporting role's access current as new tables appear) that
otherwise requires either re-running grants constantly or building your own automation
around it.

## Key terms

| Term | Meaning |
|---|---|
| GRANT / REVOKE | Standard SQL commands adding or removing a role's privileges on an object |
| USAGE (schema) | Privilege required just to reference objects inside a schema at all |
| Ownership | The creating role's automatic full privileges on an object, independent of GRANT |
| ALTER DEFAULT PRIVILEGES | Sets privileges automatically applied to objects created in the future |

## Check yourself

A reporting role can SELECT from `sales.orders` today, but a new table `sales.returns`
created next week isn't visible to it even though the same GRANT syntax was used originally.
What PostgreSQL feature would you have needed to set up in advance to avoid this, and why?
