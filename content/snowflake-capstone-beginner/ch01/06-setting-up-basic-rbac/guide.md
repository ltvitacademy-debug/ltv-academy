# Lesson 6 — Setting Up Basic RBAC

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 6 of 10**

## What you'll learn

- How to create a role with `CREATE ROLE` and grant it exactly the access this project needs,
  nothing more
- The real grant chain a role needs to actually query a view: warehouse, database, schema, and
  the object itself
- Why one simple, read-only role is the right amount of RBAC for a one-stakeholder project

## The plan from Lesson 2, now for real

Lesson 2's plan named the role: `DRIFTWOOD_SUPPORT_ANALYST`. It's a read-only role — it can run
the summary query (or, after Lesson 7, query the view) and do nothing else. No write access, no
visibility into any other schema in `DRIFTWOOD_ANALYTICS`.

## Creating the role

```sql
CREATE ROLE IF NOT EXISTS DRIFTWOOD_SUPPORT_ANALYST;
```

A role on its own grants nothing — it's an empty container until you grant it privileges.

## The grant chain

A role needs permission at every level between "logged in" and "can see data in a schema."
Missing any one link breaks the whole chain. These three grants have to exist regardless of
which specific object the role eventually reads:

```sql
GRANT USAGE ON WAREHOUSE SUPPORT_WH TO ROLE DRIFTWOOD_SUPPORT_ANALYST;
GRANT USAGE ON DATABASE DRIFTWOOD_ANALYTICS TO ROLE DRIFTWOOD_SUPPORT_ANALYST;
GRANT USAGE ON SCHEMA DRIFTWOOD_ANALYTICS.SUPPORT TO ROLE DRIFTWOOD_SUPPORT_ANALYST;
```

Notice what's **not** granted here: there's no `GRANT SELECT` on anything yet, and specifically
never on `RAW_TICKETS`. The one object-level `SELECT` this role actually needs is on the summary
view — and that view doesn't exist until Lesson 7. The right-sized move is to finish the role's
infrastructure access now, then grant `SELECT` on the view the moment it's created, rather than
granting access to the raw table today just because it happens to exist already. "Need to" is
the whole test for least privilege, and this role never needs to touch raw ticket rows directly.

## Assigning the role to a user

```sql
GRANT ROLE DRIFTWOOD_SUPPORT_ANALYST TO USER SUPPORT_ANALYST_USER;
```

Whoever in Support actually opens the Power BI report (Lesson 8) connects to Snowflake using
a user with this role — not the admin role you've been building everything with so far.

## Why not just use your own admin role for everything?

It would work today, and that's exactly the problem. The analyst who opens this report next
month shouldn't inherit the ability to drop tables or see every other schema in the account just
because granting one narrow role felt like extra steps right now. Least privilege means the
blast radius of a mistake, or a compromised password, stays as small as the job actually
requires.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE ROLE` | Defines a named role with no privileges until explicitly granted |
| `GRANT USAGE` | The privilege needed just to "see" and operate within a warehouse, database, or schema |
| Least privilege | Granting only the access a role actually needs to do its job, and nothing more |

## Lab

Write out the full grant chain for `DRIFTWOOD_SUPPORT_ANALYST` from memory — warehouse, database,
schema, and the view — before checking it against the lesson.

## Check yourself

Why do the warehouse, database, and schema `USAGE` grants happen now, in Lesson 6, while the
`SELECT` grant on the actual view waits until Lesson 7 — and why does this role never get
`SELECT` on `RAW_TICKETS` at all?
