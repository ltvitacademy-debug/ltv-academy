# Lesson 9 — Inheritance of Permissions

**Chapter 2 · Permissions · Lesson 9 of 25**

## What you'll learn

- Which Unity Catalog objects are "container objects," and why that status matters
- How a privilege granted on a container automatically reaches current *and future* children
- Why reading a table always requires `USE CATALOG` + `USE SCHEMA` + the object-level privilege
- How the `MANAGE` privilege changes (reduces) those usage-privilege requirements

## Container objects: catalogs and schemas

Unity Catalog designates exactly two object types as **container objects**: **catalogs** (which contain schemas) and **schemas** (which contain tables, views, volumes, and functions). Container objects are special because a privilege granted on them doesn't stay put — it **inherits** down to everything inside.

## What inheritance actually does

> "When you grant a privilege on a container object, that privilege automatically applies to all current **and future** child objects."

That "future" is the important part. Grant `SELECT` on a schema today, and a table created in that schema next month is readable by that same principal immediately — no new grant required.

```sql
-- SELECT granted once, on the schema
GRANT SELECT ON SCHEMA finance.accounts_payable TO `data-analysts`;

-- Every table in that schema is now readable by data-analysts —
-- including one that doesn't exist yet:
CREATE TABLE finance.accounts_payable.new_vendor_report (...);
-- data-analysts can SELECT from it immediately, with no new GRANT
```

## Why reading a table needs three privileges, explained

Lesson 7 showed the rule: reading a table needs `USE CATALOG` on the catalog, `USE SCHEMA` on the schema, and `SELECT` on the table. Here's the mechanism behind it: **`USE CATALOG` and `USE SCHEMA` are usage privileges** — a prerequisite for reaching anything inside that container at all, regardless of what object-level privilege you hold. The table below shows the full pattern across common operations:

| Operation | Required privileges |
|---|---|
| Read data from a table | `USE CATALOG` + `USE SCHEMA` + `SELECT` |
| Write data to a table | `USE CATALOG` + `USE SCHEMA` + `MODIFY` |
| Create a table in a schema | `USE CATALOG` + `USE SCHEMA` + `CREATE TABLE` |
| Execute a function | `USE CATALOG` + `USE SCHEMA` + `EXECUTE` |
| Read files from a volume | `USE CATALOG` + `USE SCHEMA` + `READ VOLUME` |

This design is deliberate, not incidental: because only a catalog/schema's owner (or a `MANAGE` holder) can grant `USE CATALOG` / `USE SCHEMA`, a table owner can never grant someone access that reaches outside the boundaries a higher-level admin already approved. A table owner handing out `SELECT` doesn't actually open any doors unless the catalog and schema owners already left the usage doors unlocked.

## `MANAGE` changes the requirement

The `MANAGE` privilege is the one exception to "you always need usage privileges at every level." Holding `MANAGE` **at** a given level removes the usage-privilege requirement **at that same level** — though you still need usage privileges on the levels *above* it:

```sql
-- MANAGE on a catalog needs no usage privilege at all —
-- it governs the catalog and everything inside it directly:
GRANT MANAGE ON CATALOG finance TO `platform-admins`;

-- MANAGE on a schema still needs USE CATALOG on its parent catalog:
GRANT USE CATALOG ON CATALOG finance TO `schema-admins`;
GRANT MANAGE ON SCHEMA finance.accounts_payable TO `schema-admins`;
```

## Key terms

| Term | Meaning |
|---|---|
| Container object | A catalog or schema — the only two object types a privilege can inherit down from |
| Privilege inheritance | A privilege granted on a container automatically applies to all current and future children |
| Usage privilege | `USE CATALOG` / `USE SCHEMA` — required to reach anything inside that container, regardless of other privileges held |
| `MANAGE` | Reduces the usage-privilege requirement at the level it's granted, not at levels above it |

## Lab

A principal has `SELECT` on `finance.accounts_payable.invoices` but nothing else. Write the two additional `GRANT` statements required before they can actually query it, and explain in one sentence why `SELECT` alone wasn't enough.

## Check yourself

- Which two object types are "container objects" in Unity Catalog, and what makes that status special?
- If you grant `SELECT` on a schema today, does a table created in it next month inherit that grant automatically?
- How does holding `MANAGE` on a schema change what usage privileges you need, compared to not holding it?
