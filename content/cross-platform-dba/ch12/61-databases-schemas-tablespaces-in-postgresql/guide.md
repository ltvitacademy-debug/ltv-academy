# Databases, Schemas & Tablespaces in PostgreSQL

PostgreSQL's object hierarchy looks superficially like SQL Server's — cluster, database,
schema, table — but one link in that chain means something meaningfully different. In SQL
Server, "schema" is most often used as a permission and ownership boundary layered on top of
a database you're already connected to. In PostgreSQL, a **schema is a real namespace** —
functionally closer to what a "database" feels like day to day — and understanding that
difference changes how you actually organize objects on this platform.

## What you'll learn

- The real PostgreSQL hierarchy: cluster → database → schema → table
- Why PostgreSQL's schema is a genuine namespace, not just a permission layer
- What a tablespace is and when you'd actually use one

## The hierarchy: cluster → database → schema → table

A PostgreSQL **cluster** (from the installation lesson) is a single running server instance
managing one or more **databases**. Each database is a genuinely separate, isolated
namespace at the top level — you cannot query across two databases in the same connection
the way SQL Server lets you write `SELECT * FROM OtherDB.dbo.Table` with three-part naming.
PostgreSQL connections are scoped to exactly one database; cross-database queries require an
extension like `postgres_fdw` or `dblink`, not ordinary syntax.

Inside a database, **schemas** hold everything else — tables, views, functions, sequences.
Every database starts with a default `public` schema, and objects are addressed as
`schema.table`, just like SQL Server's `dbo.TableName`. A `search_path` setting controls
which schemas are checked, and in what order, when a query references an unqualified table
name.

## Why PostgreSQL's schema is a real namespace, not just a permission boundary

This is the honest comparison worth sitting with. In SQL Server, most shops treat schemas
primarily as an ownership/permission grouping inside one database — `Sales.Orders` and
`HR.Employees` living side by side, with schemas mostly used to organize grants. Objects
across schemas in the same database are trivially joined with no special syntax, and many
SQL Server databases never use more than `dbo`.

In PostgreSQL, schemas are used far more like separate logical compartments within a
database — a genuinely common pattern is one schema per application or tenant inside a
single shared database (`tenant_acme.orders`, `tenant_globex.orders`), letting many
logically-separate workloads share one database's connection pooling and transaction
context while staying namespaced apart. You can still join across schemas in the same
database with ordinary SQL — that part matches SQL Server — but the *cultural* use of schemas
as a first-class organizational and multi-tenancy tool is more prominent in PostgreSQL
practice than it typically is in SQL Server practice, precisely because PostgreSQL databases
themselves are more isolated (no easy cross-database queries) and schemas are the flexible
layer instead.

```sql
CREATE SCHEMA sales;
CREATE TABLE sales.orders (id serial PRIMARY KEY, customer text);

CREATE SCHEMA hr;
CREATE TABLE hr.employees (id serial PRIMARY KEY, name text);

-- ordinary cross-schema join, same database:
SELECT o.id, e.name
FROM sales.orders o
JOIN hr.employees e ON e.id = o.id;
```

## Tablespaces

A **tablespace** tells PostgreSQL where on disk a database or object's files should physically
live, independent of the logical database/schema/table hierarchy. By default, everything lives
in the cluster's main data directory (the `pg_default` tablespace), but you can create a named
tablespace pointing at a different filesystem location — commonly used to put a specific
high-traffic table or index on faster storage:

```sql
CREATE TABLESPACE fast_ssd LOCATION '/mnt/ssd/pgdata';

CREATE TABLE sales.orders (id serial PRIMARY KEY)
  TABLESPACE fast_ssd;
```

This is conceptually similar to SQL Server filegroups mapped to specific disks, though the
syntax and granularity are PostgreSQL's own — a tablespace is a server-wide object (not
scoped to one database), and any database can have objects in any tablespace the cluster
knows about.

## Key terms

| Term | Meaning |
|---|---|
| Cluster | One PostgreSQL server instance managing one or more databases |
| Database | A top-level, isolated namespace; connections are scoped to exactly one |
| Schema | A real namespace inside a database, holding tables, views, and functions |
| search_path | Setting controlling which schemas are checked, in order, for unqualified names |
| Tablespace | A named physical storage location a database or object's files can live in |

## Check yourself

Why can't you simply write a three-part-name query joining tables in two different
PostgreSQL databases the way you can in SQL Server, and what would you use instead?
