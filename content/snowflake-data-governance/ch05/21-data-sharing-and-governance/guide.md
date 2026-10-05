# Lesson 21 — Data Sharing and Governance

**Chapter 5 · Enterprise Governance · Lesson 21 of 25**

## What you'll learn

- What a Snowflake share actually is, and why nothing is exposed until you explicitly grant it
- Real, correct SQL to create a share, populate it, and add a consumer account
- How to audit what your account has already shared
- The three governance questions to ask before sharing anything

## Governance doesn't stop at your account boundary

Every lesson in this course up to now has governed access *within* one Snowflake account — roles, masking, auditing. A **share** extends that same discipline across an account boundary: a named, governed window that lets another Snowflake account query data that lives in yours, without copying it anywhere. The consumer account queries your storage directly and live — there's no export, no file transfer, no second copy to lose track of.

The governance-critical property of a share is that it starts **empty**. Creating a share does nothing on its own:

```sql
CREATE SHARE sales_share
  COMMENT = 'Curated sales data for a governed external partner';
```

Nothing is visible to anyone until you explicitly `GRANT` access into it — the same explicit-grant discipline from Chapter 1's RBAC lessons, just aimed at a share object instead of a role:

```sql
GRANT USAGE ON DATABASE analytics_db TO SHARE sales_share;
GRANT USAGE ON SCHEMA analytics_db.public TO SHARE sales_share;
GRANT SELECT ON TABLE analytics_db.public.customer_orders
  TO SHARE sales_share;
```

Notice the specificity: `USAGE` on the database and schema (so the share can "see" the container), then `SELECT` on exactly one table. There's no default inheritance — a share only exposes what's been named, object by object.

## Adding a consumer, and auditing what's shared

A share with grants still isn't visible to anyone outside your account until you name who can consume it:

```sql
ALTER SHARE sales_share
  ADD ACCOUNTS = 'CONSUMER_ACCOUNT_1', 'CONSUMER_ACCOUNT_2';
```

And because this is governance, not just plumbing, you need to be able to audit it later — both what shares exist, and what's been granted to any of them:

```sql
SHOW SHARES;

SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_SHARES
WHERE deleted_on IS NULL;
```

`GRANTS_TO_SHARES` is a real `ACCOUNT_USAGE` view, structured the same way as `GRANTS_TO_USERS` and `GRANTS_TO_ROLES` from Chapter 4 — current, non-revoked grants when filtered to `deleted_on IS NULL`. It's the audit trail that answers "what have we actually exposed to outside accounts?"

## Three questions before you share anything

1. **What exactly?** Grant at the table or secure-view level, not the database level out of convenience — the specificity is the control.
2. **Who consumes it?** A named consumer account is as sensitive a grant as a privileged role — treat adding one to `ALTER SHARE ... ADD ACCOUNTS` with the same review rigor as granting `ACCOUNTADMIN`.
3. **Does masking still apply?** If you share a **secure view** wrapping a masking policy (Chapter 2) rather than the raw table, that view's masking logic still evaluates for the consumer — this is exactly why Snowflake recommends sharing through secure views for anything containing sensitive columns, rather than sharing a raw table directly.

## Key terms

| Term | Meaning |
|---|---|
| Share | A named Snowflake object that exposes specific database objects to one or more other accounts, with no data copied |
| CREATE SHARE | Statement that creates an empty share — nothing is exposed until objects are explicitly GRANTed to it |
| ALTER SHARE ... ADD ACCOUNTS | Statement that names which consumer account(s) can access an already-populated share |
| GRANTS_TO_SHARES | ACCOUNT_USAGE view auditing every grant made to any share in the account |

## Lab

1. Write the full sequence of SQL to create a share called `reporting_share`, grant it `SELECT` on one real or hypothetical table, and add one consumer account — without running it against a production account unless you have a safe sandbox.
2. Run `SHOW SHARES;` against your own trial account and note whether any shares already exist (Snowflake sample-data setups sometimes include one).
3. Explain, in your own words, why sharing a secure view instead of a raw table matters specifically for a table with a masking policy applied.

## Check yourself

A colleague argues that `GRANT SELECT ON ALL TABLES IN SCHEMA analytics_db.public TO SHARE sales_share` is simpler than granting table-by-table. Why does this lesson say that broader grant is the wrong tradeoff for a governed share?
