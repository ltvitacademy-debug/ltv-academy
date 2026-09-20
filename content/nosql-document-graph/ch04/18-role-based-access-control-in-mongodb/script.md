# Script — Role-Based Access Control in MongoDB

## Segment 1 (title)

Authentication proves who someone is. Role-based access control decides what they're allowed to do once they're in, and MongoDB's RBAC will feel immediately familiar — the same least-privilege logic you already apply with SQL Server logins and database roles.

## Segment 2 (steps: built-in roles)

Read gives read-only access to one database. ReadWrite adds write access without admin privileges. DbOwner combines readWrite, dbAdmin, and userAdmin into full control of a single database — MongoDB also has broader AnyDatabase variants and a root superuser role, to be used as sparingly as sa on SQL Server.

## Segment 3 (code: granting multiple roles)

A single user can hold several roles scoped to different databases at once — grantRolesToUser takes an array, so an analyst might get read access to sales and support without touching anything else.

## Segment 4 (code: a custom role)

When built-in roles are too broad, createRole lets you grant exactly one action on exactly one resource — here, only find queries against one collection. That's the MongoDB equivalent of granting permissions on a specific object instead of the whole schema.

## Segment 5 (outro)

RBAC answers what an authenticated user can touch. Next up: encryption — protecting that same data at rest on disk and in transit across the network.
