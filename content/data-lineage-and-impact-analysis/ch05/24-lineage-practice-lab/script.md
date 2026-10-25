# Lesson 24 — Lineage Practice Lab · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A hands-on practice lab — no software required. Northfield Pantry, a
fictional small grocery chain with six stores across two regions, gives
us a small, illustrative system to trace by hand, start to finish — a
repeatable worked example you can reuse as a template once you're
tracing lineage on a real system.

## S2 · STEPS CARD (the system and table-level trace)

Four simple tables. POS.Sales holds one row per item sold.
Stores.RegionMap maps each store to its region. Reporting.DailyStoreSummary
is built nightly from POS.Sales, totaling revenue and units by store and
day. Reporting.WeeklyRegionalReport is built weekly, joining
DailyStoreSummary to RegionMap on StoreID, then summing revenue by
region. Draw the table-level lineage first — four boxes, three arrows —
with RegionMap joining in at the second hop, not a sequential step of
its own.

## S3 · STEPS CARD (column-level trace)

Now go one level deeper, column by column, for the final figure,
WeeklyRegionalReport.TotalRevenue. SalePrice and QtyUnits multiply
together, then sum into DailyStoreSummary's total — that's the actual
math. SaleDate only decides which day's row a sale belongs to, and
Region only decides which output row a store's revenue lands in — both
matter to the pipeline, but neither is part of the revenue calculation
itself. These are grouping keys: columns that route a value to the
right row without being part of any calculation.

## S4 · STEPS CARD (impact analysis exercise)

Northfield Pantry is opening a seventh store, in Canada, and wants to
rename SalePrice to UnitPriceLocal, adding a CurrencyCode column so
Canadian-dollar sales can be converted to USD. Using the column-level
trace, checking every place SalePrice is used shows it's referenced
directly inside DailyStoreSummary's revenue calculation — so the rename
and the currency-conversion logic both need to land in that one
transformation step. Forget the conversion, and WeeklyRegionalReport
will silently sum raw Canadian-dollar amounts together with US-dollar
amounts, producing a wrong total that looks perfectly normal on the
dashboard.

## S5 · STEPS CARD (root cause exercise)

WeeklyRegionalReport shows zero for the Midwest region for one week,
even though Midwest rows in DailyStoreSummary show normal revenue for
those same days. Walking the path backward: the report's grouping
comes from the join to RegionMap on StoreID, so the break must be in
that join or the final summarization, since the daily numbers are
already right — maybe a store's StoreID was reissued and RegionMap
still has the old one, dropping its rows silently. Lineage tells you
where to look first, instead of re-checking every table from scratch.

## S6 · OUTRO CARD

Next up: the final lesson of this course — a review checklist that
pulls everything from all five chapters into one usable reference you
can return to on real work.
