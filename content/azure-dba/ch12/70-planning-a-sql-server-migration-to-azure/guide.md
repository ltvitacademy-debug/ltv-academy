# Lesson 70 — Planning a SQL Server Migration to Azure

**Chapter 12 · Database Migration to Azure · Lesson 70 of 95**

## What you'll learn

- A real migration-planning framework: inventory, success criteria, target — in that order
- Why skipping straight to "how do we move the data" is the most common planning mistake
- A T-SQL query that starts the inventory, reusing a skill you already have

## Chapter 12's shift

Chapter 11 automated things that already existed in Azure. Chapter 12
gets something into Azure in the first place: a real, running,
production SQL Server database moving from on-prem (or another cloud)
to Azure. That's a fundamentally different kind of risk — mess up an
Elastic Job and you re-run it; mess up a migration cutover and a business
application is down. Planning before touching anything isn't optional
caution here; it's the actual job.

## The planning order, and why it's this order

**1. Inventory what exists — before anything else.**
Every instance, every database, its size, and what depends on it
(linked servers, cross-database queries, SSIS packages, application
connection strings). You cannot plan a migration around a database you
haven't actually measured. This step alone catches the databases nobody
remembered were still in production.

**2. Define success criteria — before picking a target.**
What does "the migration worked" actually mean for this business? A
maximum acceptable downtime window. A performance floor (queries can't
get slower than X). A cost ceiling. Write these down as concrete numbers
before evaluating any target, because otherwise "success" quietly
becomes whatever the migration happened to produce.

**3. Pick a target — only after 1 and 2.**
Azure SQL Database, Managed Instance, or SQL Server on an Azure VM
(Lesson 3's original comparison) — the right choice depends entirely on
what the inventory found (feature dependencies) and what success
requires (downtime tolerance, cost ceiling). Picking the target first is
the most common planning mistake: teams choose Azure SQL Database because
it's cheapest, discover a linked server dependency during migration, and
end up re-planning mid-project.

## Starting the inventory with T-SQL you already know

The inventory step doesn't need new tools — it needs the system-catalog
queries from T-SQL Development, redirected toward a new purpose:

```sql
SELECT
    name,
    database_id,
    compatibility_level,
    state_desc,
    recovery_model_desc
FROM sys.databases
WHERE database_id > 4      -- skip the system databases
ORDER BY name;
```

This is the same kind of catalog query you've written before. What's
different is the purpose: not building an application feature, but
building a migration inventory — one row per database that has to have
a plan before cutover.

## Key terms

| Term | Meaning |
|---|---|
| Migration inventory | The full list of instances, databases, sizes, and dependencies before any migration decision is made |
| Success criteria | Concrete, written-down numbers (downtime, performance, cost) that define "the migration worked" |
| Target | The Azure destination chosen only after inventory and success criteria are known |

## Check yourself

Explain why this lesson insists success criteria get defined before a
target is picked, using the "cheapest target, discovered a dependency
mid-migration" scenario as your example.
