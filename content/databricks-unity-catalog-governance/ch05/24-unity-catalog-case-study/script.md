# Lesson 24 — Unity Catalog Case Study · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This lesson is one fictional scenario, built to pull every chapter of
this course together — not a separate topic, but a demonstration of how
the pieces actually connect.

## S2 · STEPS CARD (the scenario)

Driftwood Trail Outfitters — fictional, illustrative — has three regional
Databricks workspaces, each with its own Hive metastore, built up
independently. A demand-forecasting model has no record of what trained
it. And every month, someone emails a CSV of sales data to a logistics
partner, because nothing more structured exists.

## S3 · STEPS CARD (chapters 1-2)

Chapters 1 and 2 start the fix: one Unity Catalog metastore replaces
three Hive metastores, catalogs get organized by environment and region,
and access is granted at the schema level so new tables inherit
permissions instead of needing a separate grant each time.

## S4 · STEPS CARD (chapters 3-4)

Chapters 3 and 4 make the same table serve different audiences safely: a
column mask hides email addresses from everyone except Finance, a row
filter limits each region to its own data, and system tables finally
answer who actually read the sales schema and when.

## S5 · STEPS CARD (chapter 5)

And this chapter closes the loop. A real Delta Share — auditable,
revocable — replaces the emailed CSV. The forecasting model gets
registered with a Champion alias, so serving code never hardcodes a
version. And SYNC plus UCX bring all three regions' Hive tables under
the one metastore this started with.

## S6 · OUTRO CARD

Nothing about Driftwood's business changed — the data just finally has
one home, with one consistent set of rules for who can see what. Next
lesson: a hands-on practice lab where you apply this same pattern
yourself.
