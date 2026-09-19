# Lesson 75 — Migration Troubleshooting & Post-Migration Validation

**Chapter 12 · Database Migration to Azure · Lesson 75 of 95**

## What you'll learn

- What "done" actually means for a migration — three concrete checks, not a feeling
- A real T-SQL validation query, reusing a skill from Chapter 12's very first lesson
- The common failure patterns to check first when something's wrong post-cutover

## Validation before calling it done

A migration isn't finished when the data finishes copying — it's
finished when three things are actually confirmed, not assumed:

- **Row counts match.** Every table, source versus target, the same
  count. A mismatch means data was silently dropped or duplicated during
  the move, and it needs to be found before anyone queries the new
  system and trusts the answer.
- **Query performance is comparable.** The same key queries that ran
  acceptably on-prem need to run acceptably on the new target too — not
  automatically true just because the migration "succeeded." Compare
  duration and, where it matters, the execution plan (Lesson 45).
- **Application connectivity actually works.** Not just "SSMS can
  connect" — the actual application, with its actual connection string,
  actual authentication, and actual firewall path (Lessons 26-30),
  successfully reading and writing against the new target.

## Row-count validation with T-SQL you already know

```sql
SELECT
    t.name AS table_name,
    SUM(p.rows) AS row_count
FROM sys.tables t
JOIN sys.partitions p
    ON t.object_id = p.object_id AND p.index_id IN (0, 1)
GROUP BY t.name
ORDER BY t.name;
```

Run this against both source and target, diff the results table by
table. This is the same catalog-query skill from Lesson 70's
inventory step — first used to plan the migration, now used to prove it
actually worked.

## When migration fails: where to look first

- **Connection string or firewall rule mismatch.** The single most
  common post-cutover failure — the application's connection string
  still points at the old server, or the new target's firewall rules
  (Lesson 26) never got updated to allow the application's IP range.
- **A login that exists on the source but wasn't recreated as a
  contained user on the target.** SQL logins don't migrate
  automatically; if a login-to-user mapping was missed, that application
  or service account authenticates fine against the old server and fails
  against the new one.
- **Collation mismatch.** If the target database was created with a
  different collation than the source, comparisons and joins that worked
  identically before can start failing or behaving subtly differently
  after cutover — one of the quieter, harder-to-spot migration bugs.

## Chapter 12, closed

Chapter 12 is done: planning (Lesson 70), assessment (Lesson 71), the
online/offline decision (Lesson 72), and the two real migration paths —
Azure SQL Database (Lesson 73) and Managed Instance (Lesson 74) — closed
out here with the validation and troubleshooting that proves a migration
actually worked. Chapter 13, **Backup & Restore**, is next: now that a
real database is running in Azure, making sure you can always get it
back.

## Key terms

| Term | Meaning |
|---|---|
| Post-migration validation | The concrete checks (row counts, performance, connectivity) that confirm a migration is actually complete |
| Contained user | A database user not mapped to a server-level login — a common migration gap when logins aren't recreated |
| Collation mismatch | A source/target collation difference that can break comparisons and joins post-cutover |

## Check yourself

Name the three post-migration validation checks from this lesson, and
the three common failure patterns to check first when something breaks
after cutover.
