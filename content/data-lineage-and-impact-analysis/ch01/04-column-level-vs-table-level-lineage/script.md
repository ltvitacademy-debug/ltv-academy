# Lesson 4 — Column-Level vs. Table-Level Lineage · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lesson 3 split lineage by audience. This lesson splits technical lineage
further, by granularity — table-level versus column-level — and shows
why picking the wrong one can quietly mislead you.

## S2 · STEPS CARD (table-level: coarse)

Table-level lineage records which tables feed which other tables —
"stg.Orders_Clean feeds dw.FactSales" — without specifying which columns
are involved. It's coarse, but fast to produce and easy to read at a
glance, especially for understanding overall system architecture.

## S3 · STEPS CARD (column-level: precise)

Column-level lineage records which specific columns feed which other
specific columns — "stg.Orders_Clean.OrderTotal feeds
dw.FactSales.NetRevenue, after subtracting
stg.Orders_Clean.DiscountAmount." It's far more precise, and it's the
level of detail actually required to answer if I change this one
column, what specifically breaks.

## S4 · STEPS CARD (one arrow, 15 columns)

Imagine stg.Orders_Clean has 15 columns and feeds dw.FactSales, which
also has 15 columns. Table-level lineage shows one arrow — technically
true, but implying every source column might matter to every target
column, almost never the case. Needing to change CustomerNotes gives no
way to know if dw.FactSales is actually affected; you'd have to go read
the transformation code. Column-level lineage shows directly that
CustomerNotes isn't referenced in any mapping into dw.FactSales at all,
so the change is safe.

## S5 · STEPS CARD (the real tradeoff)

If column-level is strictly more useful, why not use it everywhere?
Cost. Capture effort — it usually requires parsing actual transformation
logic rather than just reading job dependency lists. Volume — thousands
of tables and tens of thousands of columns produce an enormous number of
column-to-column edges to store and keep current. Maintenance — every
time transformation logic changes, mappings must be re-derived, or the
lineage silently goes stale.

## S6 · STEPS CARD (when to use which)

Most organizations use table-level lineage broadly, for architecture
overviews and quick dependency checks, and reserve column-level for the
columns that matter most — the critical data elements from the Metadata
Management course, important enough to justify the extra cost.
Table-level for hundreds of low-priority staging tables; column-level
for the handful feeding the board report, or for deciding if it's safe
to rename one column.

## S7 · OUTRO CARD

Next up: the final lesson of this chapter — lineage standards and
approaches, including how lineage actually gets captured: manually,
through code parsing, or at runtime.
