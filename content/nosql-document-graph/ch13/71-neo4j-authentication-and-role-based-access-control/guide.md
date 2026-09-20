# Neo4j Authentication & Role-Based Access Control

Every relational engine in this catalog — SQL Server most of all — draws a hard line between
authentication (who are you) and authorization (what can you do), backed by logins, database
users, and role membership. Neo4j draws the same line, and once you've configured SQL Server
logins and server/database roles, the shape of Neo4j's security model will feel familiar even
though the commands are Cypher, not T-SQL. This lesson covers native authentication, the forced
first-login password change, Neo4j's built-in roles, and how to build custom roles with
fine-grained privilege grants.

## What you'll learn

- How native authentication works in Neo4j, and why the default account forces a password
  change on first login
- The built-in roles Neo4j ships with, and what each one can actually do
- How to create a custom role and grant it fine-grained privileges with Cypher
- The real Community vs. Enterprise split for role-based access control

## Native authentication and the forced first login

Neo4j enables native authentication by default (`dbms.security.auth_enabled=true`). Out of the
box there's a single default user, `neo4j`, and Neo4j refuses to let that account do anything
useful until its password has been changed — the account is created in a `password_change_required`
state. Connect with `cypher-shell` or Neo4j Browser using the default credentials and the server
rejects every query except one: changing the password.

```
ALTER CURRENT USER SET PASSWORD FROM 'neo4j' TO 'a-real-strong-password';
```

In modern Neo4j you can also set the initial password before the server ever starts, from the
command line, which is the standard approach for automated deployments:

```
neo4j-admin dbms set-initial-password a-real-strong-password
```

This is the same instinct as disabling SQL Server's `sa` account or forcing a password reset on
a freshly restored login — a database engine should never ship with a live, unattended default
credential.

## Built-in roles

Neo4j ships with a small set of built-in roles, layered from least to most privileged:

- **`PUBLIC`** — implicitly granted to every user; by default grants almost nothing beyond
  connecting.
- **`reader`** — read access to all data in the default database (traverse and read nodes,
  relationships, and properties).
- **`editor`** — everything `reader` can do, plus creating, updating, and deleting nodes,
  relationships, and properties. Cannot create new labels, relationship types, or property keys
  that don't already exist.
- **`publisher`** — everything `editor` can do, plus the ability to create new labels,
  relationship types, and property keys on the fly.
- **`architect`** — everything `publisher` can do, plus creating and dropping indexes and
  constraints.
- **`admin`** — full control: everything above, plus user and role management, server
  administration, and database management (creating/dropping databases, in multi-database
  deployments).

This maps closely to how you'd reason about SQL Server's fixed database roles
(`db_datareader`, `db_datawriter`, `db_ddladmin`, `db_owner`) — each tier adds a coherent slice
of capability on top of the last, rather than being an arbitrary grab-bag of permissions.

## Custom roles and fine-grained privilege grants

Built-in roles are coarse — they apply to the whole graph. Real deployments usually need
narrower grants: a support application that can only read `Customer` nodes, or a reporting
service that can read everything but write nothing. Neo4j's privilege system lets you grant
access at the level of graph, node label, relationship type, or even individual property, the
same way SQL Server lets you `GRANT SELECT` on a specific column instead of a whole table.

```
CREATE ROLE supportReader;

GRANT TRAVERSE ON GRAPH neo4j NODES Customer, Order TO supportReader;
GRANT READ {name, email, status} ON GRAPH neo4j NODES Customer TO supportReader;
GRANT READ {orderDate, total} ON GRAPH neo4j NODES Order TO supportReader;
DENY READ {creditCardToken} ON GRAPH neo4j NODES Customer TO supportReader;

CREATE USER support_svc SET PASSWORD 'a-real-strong-password' CHANGE NOT REQUIRED;
GRANT ROLE supportReader TO support_svc;
```

`TRAVERSE` controls whether a user can even see that a node exists; `READ` controls which
properties they can see on nodes they can traverse to; `DENY` overrides any `GRANT` for that
same privilege, which is the equivalent instinct to an explicit `DENY` in SQL Server overriding
a `GRANT` from group membership. `SHOW ROLES`, `SHOW USERS`, and `SHOW PRIVILEGES` let you audit
what's actually configured, the same way you'd interrogate `sys.database_permissions` in SQL
Server.

## Community vs. Enterprise: a real limitation

This is the fact that trips up DBAs coming from a fully-licensed SQL Server Enterprise
environment: **custom roles and fine-grained privilege grants are an Enterprise Edition
feature.** Neo4j Community Edition supports native authentication (usernames and passwords) but
has no role-based access control beyond that — there's effectively one class of authenticated
user with full access to the data. If a production deployment needs the `supportReader`-style
narrow grants above, it needs Enterprise Edition (or Aura, which is built on Enterprise). This
is a genuinely different licensing line than SQL Server draws, where basic role-based security
is available in every edition — worth knowing before you promise a client fine-grained access
control on a Community deployment.

## Key terms

| Term | Meaning |
|---|---|
| Native authentication | Neo4j's built-in username/password auth system, enabled by default |
| `password_change_required` | The forced state of the default `neo4j` account until its password is changed |
| Built-in role | One of `PUBLIC`, `reader`, `editor`, `publisher`, `architect`, `admin` — ships pre-defined |
| Privilege | A fine-grained grant (`TRAVERSE`, `READ`, `MATCH`, `WRITE`, etc.) scoped to a graph, label, or property |

## Check yourself

A client wants a support application that can read `Customer` and `Order` nodes but never see
the `creditCardToken` property, running against Neo4j Community Edition. What's wrong with that
plan, and what would you tell them?
