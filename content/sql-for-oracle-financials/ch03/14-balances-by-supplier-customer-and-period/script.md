# Lesson 14 — Balances by Supplier, Customer and Period · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Every GROUP BY so far has grouped by one column. Finance usually wants two
dimensions at once — a balance per supplier, per period. That's this
lesson.

## S2 · CODE CARD (multi-column GROUP BY)

Vendor ID, invoice month formatted year-dash-month, sum of invoice amount.
Group by both columns together. Supplier 101 in January is now a
different group from supplier 101 in February — even though it's the same
supplier, it's a different combination.

## S3 · CODE CARD (joining in the supplier name)

Join first, group second, exactly like Chapter 2 plus this chapter
combined. Vendor name, invoice month, sum, count. From suppliers, inner
join invoices, group by vendor name and invoice month. Vendor name is safe
here even though it's not aggregated — once you've joined on vendor ID,
every row in a group shares the exact same vendor name.

## S4 · CODE CARD (the mirror on Receivables)

Same structure, flipped onto Receivables. Account number, transaction
month, sum of amount due remaining. Join customer accounts through
transactions to payment schedules, group by account and month.

## S5 · OUTRO CARD

One GROUP BY, two columns, one row per combination. Next lesson: running
totals and window functions — aggregating without collapsing rows at all.
