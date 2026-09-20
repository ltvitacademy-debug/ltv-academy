# Script — PostgreSQL Roles & Authentication

## Segment 1 (title)

Chapter 13 moves into PostgreSQL security, and the first habit to unlearn is thinking in separate users and roles. PostgreSQL has exactly one concept, the role — whether it acts like a login or a permission group depends on its attributes.

## Segment 2 (code: one concept)

A role with the LOGIN attribute is functionally a user. A role without LOGIN is a pure permission-grouping object. CREATE USER is literally shorthand for CREATE ROLE with LOGIN — there's no separate user catalog, just pg_roles.

## Segment 3 (code: role attributes)

Real role attributes include LOGIN, SUPERUSER, CREATEDB, CREATEROLE, and REPLICATION — all flags on the same underlying object. Roles can also be members of other roles, inheriting their grants.

## Segment 4 (steps: authentication methods)

Authentication method is a separate question, decided by pg_hba.conf. Trust skips authentication entirely, peer matches the OS username for local sockets, and scram-sha-256 is the modern real password method.

## Segment 5 (outro)

That split — role attributes defining what a role can do, pg_hba.conf defining how it proves who it is — is cleaner than SQL Server's single server-wide authentication toggle. Next up: privileges and GRANT/REVOKE in PostgreSQL.
