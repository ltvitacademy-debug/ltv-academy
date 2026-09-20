# Script — Roles, Privileges & Grants in Oracle

## Segment 1 (title)

SQL Server splits permissions into server-level and database-level scopes. Oracle draws its line differently: system privileges, database-wide actions, versus object privileges, tied to one specific thing.

## Segment 2 (code: system vs. object privileges)

A system privilege like CREATE SESSION or CREATE TABLE is an action, not tied to any object. Privileges with ANY in the name are schema-crossing and should be handed out carefully — they're the closest thing Oracle has to a db_owner-across-every-database problem. Object privileges, by contrast, grant access to one specific table or procedure.

## Segment 3 (steps: roles bundle privileges)

A role is a named collection of privileges, granted to a user the same way a privilege is — define access once, assign it to as many users as need it. Three predefined roles ship with every database: CONNECT, essentially just CREATE SESSION since Oracle 10g; RESOURCE, object-creation privileges in your own schema; and DBA, nearly every system privilege in the database.

## Segment 4 (outro)

Predefined roles are a starting point, not a substitute for custom roles scoped to what a job actually needs. Next up: profiles, password policies, and resource limits.
