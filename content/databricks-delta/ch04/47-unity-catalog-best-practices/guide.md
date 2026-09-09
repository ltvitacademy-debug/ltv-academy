# Lesson 47 — Unity Catalog Best Practices

**Chapter 4 · Unity Catalog · Lesson 47 of 57 — Chapter Finale**

## What you'll learn

- One catalog-per-environment, not per-project — the naming convention that actually scales
- Groups, not individual users — granting access the way that survives someone leaving
- Recap: everything this chapter added to Chapters 1–3's already-working pipeline
- What's still missing, heading into Chapter 5

## Catalogs per environment, not per project

```
dev.bronze.trips       -- development
staging.bronze.trips   -- pre-production testing
prod.bronze.trips      -- production
```

Lesson 39 showed `dev`/`prod` catalogs sharing the same
`schema.table` names on purpose. The real best practice: one catalog
per **environment** (dev/staging/prod), with schemas underneath
following medallion architecture (Lesson 25) consistently across
all three — not one catalog per project or team, which fragments
the namespace and makes environment promotion (moving a table from
dev to prod) much harder to reason about.

## Grant to groups, not individuals

```sql
-- Fragile: tied to one person, breaks when they leave
GRANT SELECT ON TABLE nyc_taxi.gold.daily_revenue TO `jane@company.com`;

-- Durable: survives any single person joining or leaving
GRANT SELECT ON TABLE nyc_taxi.gold.daily_revenue TO `analytics-team`;
```

Lesson 42's `GRANT` syntax works identically either way, but
granting to a **group** (managed centrally, outside Databricks
entirely, usually) means access naturally follows role changes —
someone joining `analytics-team` inherits exactly the right access;
someone leaving loses it, with zero grants needing to be touched.
Individual grants require someone to remember to clean them up.

## What this chapter added, in one line each

1. **Governance layer** — a real reason to care who can see what (Lesson 38).
2. **Three-level namespace** — `catalog.schema.table`, made real (Lesson 39).
3. **Catalogs and schemas, created properly** — the actual setup (Lesson 40).
4. **Managed vs. external** — who owns the data's lifecycle (Lesson 41).
5. **GRANT/REVOKE** — actually closing the access gap (Lesson 42).
6. **Row/column security** — governance finer than a whole table (Lesson 43).
7. **Lineage** — tracing any table back to its real source, automatically (Lesson 44).
8. **Volumes** — DBFS root's real, governed replacement (Lesson 45).
9. **Delta Sharing** — governance that reaches outside your own organization (Lesson 46).

## What's still missing

Every table in this course is still ingested and transformed
through notebooks and manually-scheduled jobs. Chapter 5's
**Lakeflow** is Databricks' current, unified answer to orchestrating
all of this — ingestion, pipelines, and jobs, as one coherent system,
rather than separately-managed pieces.

## Key terms

| Term | Meaning |
|---|---|
| Catalog per environment | dev/staging/prod, not per-project — scales, and eases promotion |
| Grant to groups | Access follows role changes automatically, with no manual cleanup |
| What's next | Lakeflow — unifying ingestion, pipelines, and orchestration |

## Check yourself

Chapter complete when you can explain, without looking: why does
granting access to a group scale better than granting it to
individual users, one at a time?
