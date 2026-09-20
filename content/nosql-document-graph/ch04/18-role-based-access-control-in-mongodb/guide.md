# Role-Based Access Control in MongoDB

Authentication proves who someone is. Role-based access control decides what they're
allowed to do once they're in — and MongoDB's RBAC system is real, granular, and will feel
immediately familiar: it's the same "grant the minimum privilege actually needed" logic
you already apply with SQL Server logins and database roles, expressed through MongoDB's
own built-in and custom roles.

## What you'll learn

- MongoDB's built-in roles and what each actually grants
- How to assign multiple roles to a single user
- How to write a custom role scoped to an exact set of actions

## Built-in roles

Every `db.createUser()` call assigns one or more roles. MongoDB ships a set of built-in
roles covering the common cases, scoped per-database unless the "AnyDatabase" variant is
used:

- **`read`** — read-only access to a database's data.
- **`readWrite`** — read and write access to a database's data (no admin privileges).
- **`dbAdmin`** — administrative tasks on a database (schema-related operations, indexing,
  stats) but not user management.
- **`userAdmin`** — create and manage users and roles on a database, but not touch the
  data itself.
- **`dbOwner`** — combines `readWrite`, `dbAdmin`, and `userAdmin` on a single database —
  effectively full control of that one database.
- **`readAnyDatabase`** / **`readWriteAnyDatabase`** — the same read/readWrite access, but
  across every database on the deployment.
- **`root`** — superuser access to everything; use as sparingly as `sa` on SQL Server.

A user can hold multiple roles at once, each scoped to a different database:

```
db.grantRolesToUser("analyst", [
  { role: "read", db: "salesDB" },
  { role: "read", db: "supportDB" }
])
```

## Writing a custom role

Built-in roles cover broad strokes; a custom role lets you grant exactly one set of
actions on exactly one resource — the MongoDB equivalent of a SQL Server user-defined
database role with `GRANT`ed permissions on specific objects rather than the whole schema:

```
db.createRole({
  role: "reportViewer",
  privileges: [
    {
      resource: { db: "salesDB", collection: "orders" },
      actions: ["find"]
    }
  ],
  roles: []
})
```

This role can only run `find` queries against `salesDB.orders` — nothing else, no other
collection, no writes. Assign it the same way as a built-in role:

```
db.grantRolesToUser("reportBot", [{ role: "reportViewer", db: "salesDB" }])
```

Custom roles can also inherit from other roles (via the `roles` array) and combine
multiple privilege entries, letting you build up precisely-scoped access instead of
reaching for a broad built-in role out of convenience.

## Least privilege, same as always

The real administrative discipline doesn't change from the relational world: an
application's connection user should get exactly the roles its workload needs —
typically `readWrite` on its own database, nothing broader — and `root`/`dbOwner`-level
roles should be reserved for actual administrators, used rarely, and never embedded in
application connection strings.

## Key terms

| Term | Meaning |
|---|---|
| `read` / `readWrite` | Built-in roles for read-only or read/write access to a database's data |
| `dbAdmin` | Built-in role for administrative tasks (indexing, stats), not user management |
| `dbOwner` | Combines readWrite, dbAdmin, and userAdmin on a single database |
| `db.createRole()` | Creates a custom role scoped to exact resources and actions |
| `db.grantRolesToUser()` | Assigns one or more roles (built-in or custom) to an existing user |

## Check yourself

A reporting service only ever needs to run `find` queries against one collection. Per this
lesson, why is granting it the built-in `readWrite` role on the whole database the wrong
choice, and what should you do instead?
