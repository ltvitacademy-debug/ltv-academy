# Lesson 15 — Running Totals and Window Functions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

GROUP BY always collapses rows. But sometimes Finance wants a running
total alongside every individual row, not instead of them — that's a
window function, and it closes out Chapter 3.

## S2 · CODE CARD (SUM OVER)

Vendor ID, check date, amount, and SUM of amount OVER, partition by vendor
ID, order by check date, as running total. OVER turns SUM into a window
function — it computes a sum per row, over a defined window, without
collapsing anything. Partition by restarts the total for each supplier;
order by inside OVER decides what counts toward it so far.

## S3 · CODE CARD (ROW_NUMBER and RANK)

ROW_NUMBER, RANK, and DENSE_RANK all number rows within each partition,
ordered the way you specify. ROW_NUMBER partition by vendor ID, order by
invoice amount descending — the largest invoice per supplier gets row
number one.

## S4 · STEPS CARD (how they differ on ties)

The difference between the three only shows up on ties. ROW_NUMBER is
always unique — one, two, three — even for identical values. RANK gives
tied rows the same number, then skips ahead. DENSE_RANK gives tied rows
the same number too, but doesn't skip — the next distinct value just gets
the next number up.

## S5 · STEPS CARD (Chapter 3, tied together)

Look at what Chapter 3 built: SUM and COUNT for totals, GROUP BY for
per-group totals, HAVING for filtering those totals, CASE for aging
buckets, and now window functions for running totals and ranking, all
without losing your individual rows when you don't want to.

## S6 · OUTRO CARD

Chapter 3 complete. Next: Chapter 4, subqueries and CTEs — the tools for
asking a question that itself depends on another question's answer.
