# Script — Athena + Glue Catalog Integration

## Segment 1 (title)

Athena doesn't have its own separate metadata store at all — it reads table definitions straight from the Glue Data Catalog. That's why a crawler finishing a run and a table becoming queryable in Athena are, practically speaking, the same event.

## Segment 2 (code: no separate metadata store)

When Athena resolves "raw.orders" in a query, it looks that up directly in the Glue Data Catalog — the exact same Catalog Chapter 3 covered. There's no import step, no sync step. Glue and Athena share one source of truth for what tables exist.

## Segment 3 (steps: crawler finish to queryable table)

Walk through what actually happens. A crawler finishes scanning new data and writes a table entry to the Catalog. The moment that write completes, the table exists. And because Athena reads the Catalog directly with no caching of its own, that table is instantly queryable — no waiting for Athena to "pick it up."

## Segment 4 (code: where directness can surprise you)

That same directness cuts both ways operationally. Drop a table from the Catalog, and every Athena query against it fails immediately — there's no cached fallback. And if a crawler's schema drifts from what's actually in the files, Athena trusts whatever the Catalog currently says, not the real files.

## Segment 5 (outro)

Athena and Glue share one Catalog — that's the whole integration. Next up: partitioning for Athena performance — how partition pruning cuts the bytes scanned, and therefore the bill.
