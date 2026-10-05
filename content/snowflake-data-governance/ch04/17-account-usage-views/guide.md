# Lesson 17 — Account Usage Views

**Chapter 4 · Auditing and Monitoring · Lesson 17 of 25**

## What you'll learn

- The real breadth of the SNOWFLAKE.ACCOUNT_USAGE schema, beyond QUERY_HISTORY and ACCESS_HISTORY
- Real SQL for auditing current grants with GRANTS_TO_USERS
- Why ACCOUNT_USAGE sees dropped objects that INFORMATION_SCHEMA never shows
- When to reach for ACCOUNT_USAGE versus INFORMATION_SCHEMA

## One schema, far more than history views

Lesson 16 covered two views. `SNOWFLAKE.ACCOUNT_USAGE` actually holds dozens, grouped loosely by what they audit:

- **Activity:** `QUERY_HISTORY`, `ACCESS_HISTORY`, `SESSIONS`, `LOGIN_HISTORY`
- **Security/RBAC:** `GRANTS_TO_USERS`, `GRANTS_TO_ROLES`, `GRANTS_TO_SHARES`
- **Usage and cost:** `WAREHOUSE_METERING_HISTORY`, `STORAGE_USAGE`
- **Object inventory:** `TABLES`, `VIEWS`, `COLUMNS`, and more — each tracking every object that ever existed in the account, not just what exists right now

This lesson focuses on the security/RBAC views and the object-inventory views, since they're the backbone of a governance audit.

## Auditing who holds what: GRANTS_TO_USERS

```sql
SELECT grantee_name, role, granted_by, created_on
FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS
WHERE deleted_on IS NULL
ORDER BY created_on DESC;
```

`GRANTS_TO_USERS` is a **point-in-time view of current role assignments** — `grantee_name` is the user, `role` is what they hold, `granted_by` is the role that issued the grant, and `created_on`/`deleted_on` bracket the grant's lifetime. Filtering `deleted_on IS NULL` gives you only active (not-yet-revoked) grants. This is different from querying `QUERY_HISTORY` for `GRANT` statements (Lesson 20's dashboard example) — that approach gives you the *history of grant events*; `GRANTS_TO_USERS` gives you the *current state*. Both are useful; they answer different questions.

## ACCOUNT_USAGE vs. INFORMATION_SCHEMA

Snowflake has two metadata schemas that can look similar at first glance:

| | INFORMATION_SCHEMA | ACCOUNT_USAGE |
|---|---|---|
| Scope | One database at a time | Entire account |
| Latency | Near real-time | Minutes to hours, depending on the view |
| Retention | Current state only | Up to 1 year of history on most views |
| Dropped objects | Never shown | Shown, with a `DELETED` timestamp |

That last row matters for auditing: if someone drops a table to cover their tracks, `INFORMATION_SCHEMA.TABLES` will never show it existed. `ACCOUNT_USAGE.TABLES` will — with a `DELETED` column recording exactly when:

```sql
SELECT table_name, table_schema, deleted
FROM SNOWFLAKE.ACCOUNT_USAGE.TABLES
WHERE deleted IS NOT NULL
ORDER BY deleted DESC;
```

Filtering `deleted IS NULL` instead gives you the active object inventory for the whole account — useful for confirming every table that's supposed to exist actually does.

## Key terms

| Term | Meaning |
|---|---|
| SNOWFLAKE.ACCOUNT_USAGE | Schema of account-wide, retained metadata and history views |
| GRANTS_TO_USERS | ACCOUNT_USAGE view of current (and historical) user-to-role grants |
| INFORMATION_SCHEMA | Per-database, near-real-time metadata schema with no history of dropped objects |
| DELETED | ACCOUNT_USAGE.TABLES column: timestamp a table was dropped, NULL if still active |

## Lab

1. Run the `GRANTS_TO_USERS` query against your own account and confirm the roles you expect to hold appear with `deleted_on IS NULL`.
2. Drop a scratch table you don't need, then query `ACCOUNT_USAGE.TABLES` filtered to `deleted IS NOT NULL` and confirm it shows up (note: this view can take time to update — if it doesn't appear immediately, that's the expected latency, not a bug).
3. Compare the same table's visibility in `INFORMATION_SCHEMA.TABLES` after dropping it, and confirm it's gone from that schema entirely.

## Check yourself

If you needed to prove to an auditor that a specific table existed in your account eight months ago and was later dropped, which schema would you query — INFORMATION_SCHEMA or ACCOUNT_USAGE — and why would the other one fail you?
