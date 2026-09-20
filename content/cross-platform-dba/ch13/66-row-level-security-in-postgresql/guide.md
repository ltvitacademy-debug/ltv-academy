# Row-Level Security in PostgreSQL

Everything so far in this chapter controls access at the object level — a role can query a
table or it can't. **Row-Level Security (RLS)** controls access at the *row* level, inside a
table a role otherwise has full SELECT/UPDATE privilege on. It's a genuinely modern,
built-in PostgreSQL feature (added in PostgreSQL 9.5) that lets a multi-tenant table enforce
"each tenant only sees their own rows" directly in the database, rather than trusting every
application query to remember a `WHERE tenant_id = ...` clause.

## What you'll learn

- What Row-Level Security actually does and the problem it solves
- Real `CREATE POLICY` syntax
- How RLS interacts with table owners and the roles it applies to

## The problem RLS solves

Without RLS, "tenant isolation" or "each user only sees their own rows" lives entirely in
application code — every query has to remember to add the filter, and one missed `WHERE`
clause in one code path leaks data across tenants. RLS moves that guarantee into the
database itself: once enabled and a policy is defined, the filter is applied automatically
to every query against that table from a role the policy covers, regardless of what the
query itself asks for.

## Enabling RLS and writing a policy

```sql
-- turn on row-level security for the table
ALTER TABLE sales.orders ENABLE ROW LEVEL SECURITY;

-- a policy: app_user role can only see rows matching
-- the current session's tenant setting
CREATE POLICY tenant_isolation ON sales.orders
  FOR ALL
  TO app_user
  USING (tenant_id = current_setting('app.current_tenant')::int);
```

Here, `current_setting('app.current_tenant')` reads a session-level variable the application
sets right after connecting (`SET app.current_tenant = '42';`), and the policy's `USING`
clause becomes an implicit filter applied to every `SELECT`, `UPDATE`, and `DELETE` the
`app_user` role runs against `sales.orders` — the application never has to remember to add
`WHERE tenant_id = 42` itself, because PostgreSQL adds the equivalent automatically.

Policies can be scoped to specific commands instead of `FOR ALL`:

```sql
CREATE POLICY read_own_rows ON sales.orders
  FOR SELECT TO app_user
  USING (owner_id = current_user_id());

CREATE POLICY insert_own_rows ON sales.orders
  FOR INSERT TO app_user
  WITH CHECK (owner_id = current_user_id());
```

`USING` filters which existing rows are visible/affected; `WITH CHECK` validates rows being
inserted or updated, so a role can't insert or move a row into a state that policy wouldn't
let it see afterward.

## RLS and table owners

Table owners and `SUPERUSER` roles **bypass RLS by default** — policies apply to the roles
named in them (or `PUBLIC` for everyone), not automatically to the owner, on the theory that
the owner already has unrestricted access to their own object. This can be changed with
`ALTER TABLE ... FORCE ROW LEVEL SECURITY` if you genuinely want the policy enforced even for
the owner, which matters if a migration or admin service account also happens to own the
table and shouldn't get a free pass around tenant isolation.

There's no equivalent built directly into MySQL, and while SQL Server has a comparable
feature (Row-Level Security, using security predicates and inline table-valued functions),
PostgreSQL's `CREATE POLICY` syntax and its direct interaction with session variables via
`current_setting()` is the platform's own take on the same idea — genuinely modern and
increasingly common for exactly the multi-tenant SaaS pattern shown here.

## Key terms

| Term | Meaning |
|---|---|
| Row-Level Security (RLS) | Database-enforced filtering of which rows a role can see/affect in a table |
| CREATE POLICY | The command defining an RLS rule, its target roles, and its filter |
| USING | RLS clause filtering which existing rows are visible/affected |
| WITH CHECK | RLS clause validating rows being inserted or updated |
| FORCE ROW LEVEL SECURITY | Makes RLS apply even to the table's owner |

## Check yourself

A table owner queries a table with RLS policies enabled and sees every row, while an
ordinary app_user role only sees their tenant's rows. Why does this happen by default, and
what would you change to make the policy apply to the owner too?
