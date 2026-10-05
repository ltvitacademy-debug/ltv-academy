# Lesson 7 — Privileges and GRANT

**Chapter 2 · Permissions · Lesson 7 of 25**

## What you'll learn

- The real `GRANT` syntax: `GRANT privilege_types ON securable_object TO principal`
- The core privilege types — `SELECT`, `MODIFY`, `USE CATALOG`, `USE SCHEMA`, `CREATE TABLE`, and more
- Why reading a table needs three privileges at once, not just `SELECT`
- `ALL PRIVILEGES`, and the specific privileges it deliberately excludes
- `REVOKE`, the mirror image of `GRANT`

## The syntax

Every grant in Unity Catalog follows one shape:

```sql
GRANT privilege_types ON securable_object TO principal
```

`privilege_types` is one or more privilege names (or `ALL PRIVILEGES`); `securable_object` is the thing being governed — a `CATALOG`, `SCHEMA`, `TABLE`, `VIEW`, `VOLUME`, `FUNCTION`, or several other object types; `principal` is the user, group, or service principal from Lesson 6.

## Catalog Explorer shows you the same privilege names

The exact privilege names used in `GRANT` statements are the same ones you'd pick from checkboxes in Catalog Explorer's UI:

![Catalog Explorer's "Request permissions" dialog, listing real Unity Catalog privilege checkboxes grouped as Prerequisite (USE CATALOG, USE SCHEMA), Read (EXECUTE, READ VOLUME, SELECT), Create (CREATE FUNCTION, CREATE MATERIALIZED VIEW, CREATE MODEL, CREATE MODEL VERSION, CREATE SCHEMA, CREATE TABLE, CREATE VOLUME), Metadata (APPLY TAG, BROWSE), and Edit (MODIFY, REFRESH, WRITE VOLUME), plus ALL PRIVILEGES, EXTERNAL USE SCHEMA, and MANAGE below.](/courses/databricks-unity-catalog-governance/ch02/07-privileges-and-grant/request-permissions.png)
*Every checkbox here is a real privilege name — the exact same word you'd type after GRANT in SQL.*

## Core privilege types

| Privilege | What it allows |
|---|---|
| `SELECT` | Read data from a table or view |
| `MODIFY` | Write (insert/update/delete) data to a table |
| `USE CATALOG` | Access a catalog — a prerequisite for working with anything inside it |
| `USE SCHEMA` | Access a schema — a prerequisite for working with anything inside it |
| `CREATE TABLE` | Create tables within a schema (or catalog, if granted there) |
| `EXECUTE` | Run a function or query a registered model |
| `READ VOLUME` / `WRITE VOLUME` | Read from / write to a volume's files |

## Reading a table actually needs three privileges

This trips people up the first time: `SELECT` on a table is not, by itself, enough to read it. Unity Catalog requires the **full chain**:

```sql
-- To read finance.accounts_payable.invoices, a principal needs ALL THREE:
GRANT USE CATALOG ON CATALOG finance TO `data-analysts`;
GRANT USE SCHEMA ON SCHEMA finance.accounts_payable TO `data-analysts`;
GRANT SELECT ON TABLE finance.accounts_payable.invoices TO `data-analysts`;
```

`USE CATALOG` and `USE SCHEMA` are **usage privileges** — prerequisites for reaching anything inside that container at all. Having `SELECT` on the table without `USE CATALOG` on `finance` and `USE SCHEMA` on `accounts_payable` still leaves that principal unable to query it. Lesson 9 covers why this chain exists in more depth.

## `ALL PRIVILEGES` — and what it deliberately leaves out

```sql
GRANT ALL PRIVILEGES ON TABLE finance.accounts_payable.invoices TO `data-engineers`;
```

`ALL PRIVILEGES` expands to every privilege applicable to that object type **at the time it's checked**, not a fixed list granted once. On a table, that's `SELECT`, `MODIFY`, and `APPLY TAG`. Deliberately, to avoid accidental privilege escalation, it does **not** include `EXTERNAL USE SCHEMA`, `EXTERNAL USE LOCATION`, `MANAGE`, or `READ METADATA` — those have to be granted explicitly, by name.

## REVOKE: the mirror image

```sql
REVOKE SELECT ON TABLE finance.accounts_payable.invoices FROM `data-analysts`;
```

`REVOKE` takes the exact same shape as `GRANT`, with `FROM` instead of `TO`.

## Key terms

| Term | Meaning |
|---|---|
| Privilege | A specific right (SELECT, MODIFY, USE CATALOG, etc.) grantable on a securable object |
| Usage privilege | USE CATALOG / USE SCHEMA — a prerequisite for reaching anything inside that container |
| `ALL PRIVILEGES` | Grants every applicable privilege for an object type, except MANAGE, READ METADATA, and the two EXTERNAL USE privileges |
| `REVOKE` | Removes a previously granted privilege; same syntax as GRANT, with FROM |

## Lab

Write the three `GRANT` statements needed for the group `bi-readers` to query `marketing.campaigns.leads` — including both usage privileges. Then write the single `REVOKE` statement that would undo just the `SELECT` grant.

## Check yourself

- Write out the general `GRANT` syntax shape from memory.
- Why isn't `SELECT` alone enough to read a table? What two other privileges are also required, and on what objects?
- Name two privileges `ALL PRIVILEGES` deliberately does not include.
