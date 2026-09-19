# Script — Migration Troubleshooting & Post-Migration Validation

## Segment 1 (title)

A migration isn't finished when the data finishes copying. It's finished when three things are actually confirmed: row counts match between source and target, query performance is comparable, and application connectivity actually works — not just that SSMS can connect.

## Segment 2 (steps: the three checks)

Row counts matching catches data silently dropped or duplicated during the move. Query performance comparable means the same key queries run acceptably on the new target, not assumed just because the migration succeeded. Application connectivity means the actual app, with its actual connection string and firewall path, reading and writing successfully.

## Segment 3 (code: row-count validation)

Run this same catalog query against both source and target and diff the results table by table. It's the same skill from the inventory step at the start of this chapter — first used to plan the migration, now used to prove it worked.

## Segment 4 (steps: common failure patterns)

Three places to look first when something breaks: a connection string or firewall rule still pointing at the old server, a login that existed on the source but was never recreated as a contained user on the target, and a collation mismatch quietly breaking comparisons and joins that worked fine before.

## Segment 5 (outro)

Chapter 12 is done: planning, assessment, the online/offline decision, and the two real migration paths, closed out with validation and troubleshooting. Chapter 13, Backup & Restore, is next — now that a real database is running in Azure, making sure you can always get it back.
