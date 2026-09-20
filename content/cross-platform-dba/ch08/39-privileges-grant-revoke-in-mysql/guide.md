# Privileges: GRANT and REVOKE in MySQL

Creating a `user@host` account, as the last lesson covered, gives someone the ability to
authenticate — it grants nothing else. A freshly created MySQL account can log in and do
essentially nothing until privileges are explicitly granted. This lesson covers `GRANT` and
`REVOKE`, and the four levels of scope MySQL privileges can apply at, from the whole server down
to a single column.

## What you'll learn

- Why authentication and authorization are fully separate steps in MySQL
- `GRANT` and `REVOKE` syntax, and the account they apply to
- The four privilege scopes: global, database, table, and column level
- Viewing what an account currently has with `SHOW GRANTS`

## Authentication vs. authorization, and the four scopes

MySQL privileges apply at exactly one of four levels, from broadest to narrowest:

```sql
-- Global: applies to every database on the server
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'10.0.0.%';

-- Database: applies to every table in one database
GRANT SELECT, INSERT, UPDATE ON shop.* TO 'app_svc'@'10.0.4.%';

-- Table: applies to one specific table
GRANT SELECT ON shop.orders TO 'reporting'@'%';

-- Column: applies to specific columns of one table
GRANT SELECT (customer_id, email) ON shop.customers TO 'support_agent'@'10.0.5.%';
```

The `*.*` syntax means "every database, every table" — a global grant. `shop.*` means "every
table within the `shop` database" — a database-level grant. `shop.orders` names one exact table.
The column-level form in parentheses restricts a `SELECT` (or `UPDATE`) grant to specific columns
only, which is genuinely useful for something like a support account that should see a customer's
email but never their stored payment details in the same table.

## Common privilege types

Privileges aren't just `ALL` or nothing. The common individual ones a DBA grants deliberately:
`SELECT` (read rows), `INSERT` (add rows), `UPDATE` (modify existing rows), `DELETE` (remove
rows), `CREATE` (create tables/databases), `DROP` (remove tables/databases), `ALTER` (change table
structure), `INDEX` (create/drop indexes), `EXECUTE` (run stored procedures/functions), and
`GRANT OPTION` — a special privilege that lets the grantee grant their own privileges to others,
which should be handed out sparingly since it lets a user extend the very access you gave them.

## REVOKE: removing privileges

```sql
REVOKE INSERT, UPDATE ON shop.* FROM 'app_svc'@'10.0.4.%';
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'former_admin'@'10.0.0.%';
```

`REVOKE` mirrors `GRANT`'s syntax exactly — the same privilege names, the same `ON` scope, the
same account. The second form above is the standard way to fully strip an account down before
either locking it or deleting it with `DROP USER`.

## Checking what an account actually has

```sql
SHOW GRANTS FOR 'app_svc'@'10.0.4.%';
```

This returns the account's privileges as a list of the exact `GRANT` statements that, if re-run,
would reproduce its current access — the fastest way to audit an account without reading raw
system tables. As a rule, grant the narrowest privilege at the narrowest scope that the account's
actual job requires; a reporting account almost never needs `INSERT`, `UPDATE`, or `DELETE`
anywhere, and a global `GRANT ALL ON *.*` should be reserved for genuine administrative accounts.

## Key terms

| Term | Meaning |
|---|---|
| Global privilege | Applies across every database on the server (`ON *.*`) |
| Database privilege | Applies to every table within one named database (`ON dbname.*`) |
| Table privilege | Applies to one specific table (`ON dbname.tablename`) |
| Column privilege | Restricts `SELECT`/`UPDATE` to named columns of a table |
| `GRANT OPTION` | Lets the grantee pass their own privileges on to other accounts |
| `SHOW GRANTS` | Lists an account's current privileges as reproducible `GRANT` statements |

## Check yourself

A support agent account needs to read customer email addresses for ticket lookups but should
never see stored payment card details, which live in a different column of the same `customers`
table. Which privilege scope from this lesson solves that exactly, and why would a table-level
grant be the wrong tool here?
