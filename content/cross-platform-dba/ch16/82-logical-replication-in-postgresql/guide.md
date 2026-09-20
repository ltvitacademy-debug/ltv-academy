# Logical Replication in PostgreSQL

Lessons 80 and 81 covered physical streaming replication — a byte-for-byte copy of an entire
cluster. This lesson covers PostgreSQL's other replication mechanism: logical replication,
which works at the row and table level using a publish/subscribe model, and can do several
things physical replication structurally cannot.

## What you'll learn

- The publication/subscription model that logical replication is built on
- The `CREATE PUBLICATION` / `CREATE SUBSCRIPTION` syntax
- Real use cases where logical replication is the right tool, not physical replication

## Publications and subscriptions

Logical replication decodes WAL back into a stream of row-level changes — inserts, updates,
deletes — rather than shipping raw WAL records for physical replay. On the source database,
you define a publication: a named set of tables whose row-level changes should be made
available for replication.

```sql
CREATE PUBLICATION sales_pub FOR TABLE orders, order_items;
```

On the destination database — which can be a separate PostgreSQL instance, potentially even a
different major version — you define a subscription that connects to the publication and
applies the incoming row changes to matching local tables:

```sql
CREATE SUBSCRIPTION sales_sub
  CONNECTION 'host=source_db dbname=sales user=repl_user'
  PUBLICATION sales_pub;
```

The subscriber's tables must already exist with a matching structure before the subscription
starts applying changes; logical replication replicates data into existing tables, it doesn't
create the schema for you. A subscription does an initial data copy of the publication's
current tables, then switches to applying an ongoing stream of row-level changes.

## Why this can do things physical replication can't

Because a publication names specific tables rather than "the entire cluster," logical
replication supports selective table replication — replicate `orders` to a downstream
reporting database without replicating every other table in the system. Because it replicates
decoded row changes rather than raw physical WAL, the subscriber doesn't need to be running
the identical PostgreSQL major version as the publisher; this makes logical replication the
supported mechanism for online major-version upgrades and cross-version data movement, which
is exactly why Lesson 84 returns to it as a migration strategy. It also allows a subscriber to
receive from multiple publishers into one database, something a single physical standby
structurally cannot do, since a physical standby is a full replay of one specific primary.

## What it doesn't give you

Logical replication doesn't replicate DDL — if you add a column on the publisher, you
generally need to apply that same DDL change on the subscriber yourself; only data changes to
already-matching tables flow automatically. It also doesn't replicate large objects, and
sequences aren't automatically kept in sync by default. And unlike a physical standby, a
logical subscriber is a writable, independent database — great for its use cases, but it means
you don't get a simple "promote this box and traffic resumes" failover story the way physical
streaming replication gives you. Choose logical replication for selective or cross-version
data movement; choose physical replication when the goal is a complete, promotable failover
target.

## Key terms

| Term | Meaning |
|---|---|
| Logical replication | Row/table-level replication of decoded changes via publish/subscribe |
| Publication | A named set of tables on the source database made available for logical replication |
| Subscription | A destination-side object that connects to a publication and applies its changes |
| `CREATE PUBLICATION` | SQL statement defining which tables a publication exposes |
| `CREATE SUBSCRIPTION` | SQL statement connecting a destination to a publication and starting replication |

## Check yourself

Your team wants to replicate only the `orders` table into an analytics database running a
newer major version of PostgreSQL than production, without touching any other tables. Would
you reach for physical or logical replication, and why does the other option not fit?
