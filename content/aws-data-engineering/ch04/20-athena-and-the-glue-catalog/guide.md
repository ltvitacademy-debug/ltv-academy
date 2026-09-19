# Athena + Glue Catalog Integration

Lessons 18 and 19 treated the Catalog as a given — a table already existed to query. This
lesson makes the connection explicit: Athena doesn't have its own separate metadata store
at all. It reads table definitions **straight from the Glue Data Catalog**, which is why a
crawler finishing a run and a table becoming queryable in Athena are, practically speaking,
the same event.

## What you'll learn

- Why Athena has no metadata store of its own, separate from Glue
- What actually happens, end to end, between a crawler run and a query working
- Why a table registered by one team is instantly visible to another, with no sync step
- Where this integration can surprise you if you don't expect it

## Athena reads the Catalog directly

There's no import, sync, or replication step between Glue and Athena — Athena's `SELECT ...
FROM database.table` resolves `database.table` by looking it up in the Glue Data Catalog
directly, the same Catalog that Lesson 13 covered as the shared metadata layer. This is why
Chapter 3 and Chapter 4 aren't really two separate services bolted together — Glue and
Athena share the exact same source of truth for "what tables exist and what do they look
like."

## From crawler run to queryable table

Walk through what actually happens end to end: a crawler finishes scanning a new S3
prefix and writes a table entry into the Catalog. The moment that write completes, the
table exists in the Catalog — and since Athena reads the Catalog directly with no caching
or sync delay of its own, that table is immediately queryable from Athena. There's no
"wait for Athena to pick up the new table" step, because Athena was never storing a
separate copy to begin with. Practically, this means a workflow like Lesson 17's chained
crawler-job-crawler pattern can end with genuinely fresh data queryable within moments of
the pipeline finishing, without an explicit "register with Athena" step anywhere in it.

## Shared visibility, no sync step

Because the Catalog is one shared store, a table one team's crawler registers is visible to
another team's Athena queries immediately, as long as their IAM permissions allow reading
that Catalog database/table (Chapter 2's IAM material applies directly to Catalog resources,
not just S3 objects). There's nothing to publish, replicate, or manually share — visibility
is a permissions question, not a data-movement question.

## Where this can surprise you

The same directness that makes this convenient can also surprise you operationally. Drop a
table from the Catalog (intentionally or by mistake), and every Athena query against it
fails immediately — there's no cached fallback anywhere. Similarly, if a crawler updates a
table's schema in a way that doesn't match what's actually in the underlying files (a
column renamed upstream without a re-crawl, for instance), Athena queries will reflect
whatever the Catalog currently says, correct or not, since Athena has no independent way to
verify it against the real files beyond what it reads at query time.

## Key terms

| Term | Meaning |
|---|---|
| Direct Catalog read | Athena resolving `database.table` by looking it up in the Glue Catalog with no separate store |
| No sync delay | A Catalog table is queryable from Athena immediately after it's written, with no propagation wait |
| Shared visibility | Catalog tables are visible across teams/tools based on IAM permissions, not manual sharing |

## Check yourself

A teammate asks, "how long after my crawler finishes do I need to wait before Athena can
see the new table?" What's the accurate answer, and why does it follow directly from how
Athena resolves table names?
