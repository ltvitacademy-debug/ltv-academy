# Lesson 23 — Cross-Account Governance

**Chapter 5 · Enterprise Governance · Lesson 23 of 25**

## What you'll learn

- Why a real company's Snowflake footprint is rarely just one account
- Real SQL for listing every account in an organization
- Real SQL for replicating a governed database across accounts
- Why RBAC, tags, and audit monitoring need to travel with the organization, not stop at one account's border

## One company, many accounts

Everything in this course so far has governed a single account. In practice, most organizations running Snowflake at any real scale have more than one: a dev account, a test account, a production account, sometimes a separate account per region for data-residency reasons. **Cross-account governance** is the discipline of making sure the controls from every earlier chapter of this course — RBAC, masking, tagging, auditing — apply consistently across all of them, not just the one an administrator happens to be looking at.

The risk this guards against is specific and common: a masking policy gets carefully built and tested in one account, and nobody remembers to replicate the same discipline when a new account gets spun up six months later for a new region.

## Seeing the whole organization

An organization administrator can list every account that exists:

```sql
SHOW ACCOUNTS;

-- Filtered to a naming pattern
SHOW ACCOUNTS LIKE 'PROD%';
```

This is the starting point for any cross-account governance review — you can't apply a consistent policy across accounts you don't have a complete list of.

## Replicating governed data across accounts

**Database replication** is Snowflake's real mechanism for keeping a secondary account's copy of a database current with a primary account:

```sql
CREATE DATABASE analytics_db
  AS REPLICA OF myorg.prod_account.analytics_db;

ALTER DATABASE analytics_db
  ENABLE REPLICATION TO ACCOUNTS myorg.dr_account;

ALTER DATABASE analytics_db REFRESH;
```

The governance-relevant detail: when you replicate a database, its masking policies, row access policies, and tags (Chapters 2 and 3 of this course) replicate with it — the secondary account's copy enforces the same controls as the primary, rather than arriving as an unprotected copy that someone has to remember to re-secure. `ALTER DATABASE ... REFRESH` synchronizes the secondary from a snapshot of the primary; it doesn't run continuously, so a refresh cadence is itself something worth monitoring (Lesson 19).

## What actually needs to travel with the organization

Three things from earlier in this course that a single-account mindset tends to forget to extend:

1. **One RBAC model.** The same role-naming convention and least-privilege grant discipline from Chapter 1 — not a different ad-hoc role structure invented fresh in each new account.
2. **One tag taxonomy.** A column tagged `PII` in the production account needs to mean exactly the same thing if that same data, or a replica of it, exists in a DR or regional account (Chapter 3).
3. **One audit cadence.** The monitoring tasks and dashboard queries from this chapter need to run against every account in the organization, not just the one most people happen to log into.

## Key terms

| Term | Meaning |
|---|---|
| Organization | A Snowflake-level grouping of multiple accounts under one administrative umbrella |
| SHOW ACCOUNTS | Command listing every account in the organization (run by an organization administrator) |
| Database replication | Mechanism for keeping a secondary account's database copy synced with a primary, including its policies and tags |
| ALTER DATABASE ... REFRESH | Statement that synchronizes a secondary (replica) database from a snapshot of its primary |

## Lab

1. If you have organization administrator access, run `SHOW ACCOUNTS;` and list how many accounts exist in your organization.
2. For one account pair (even hypothetically), sketch the `CREATE DATABASE ... AS REPLICA OF` and `ALTER DATABASE ... ENABLE REPLICATION TO ACCOUNTS` statements you'd need to replicate one governed database between them.
3. Pick one control from an earlier chapter (a specific role, a specific tag, or a specific audit query) and write one sentence on how you'd confirm it's actually been applied consistently across every account in your organization, not just one.

## Check yourself

Why does this lesson say that replicating a database's masking policies and tags along with its data is a governance advantage, not just a technical convenience?
