# Lesson 3 — Sorting and Limiting Results · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Finance rarely wants every row — usually it's "show me the biggest" or
"show me the oldest ten." This lesson is about sorting results, and then
capping them to just the handful that matter.

## S2 · CODE CARD (ORDER BY)

Select invoice number, invoice amount, from A-P invoices all, order by
invoice amount descending. ORDER BY sorts the final result — DESC means
biggest first, and if you leave it off, ascending, smallest first, is the
default.

## S3 · CODE CARD (FETCH FIRST)

Now add FETCH FIRST ten rows only. This is Oracle's modern, ANSI-standard
way to cap a result set, added in Oracle 12c. It runs after the sort, so
order everything by amount, biggest first, then just take the top ten. Clean
and correct every time.

## S4 · CODE CARD (ROWNUM legacy pattern)

Before 12c, there was no FETCH FIRST — consultants used ROWNUM instead, and
you'll still see it in older customizations. But ROWNUM gets assigned
before ORDER BY runs in the same query block, so you have to wrap the
sorted query in an outer query and filter ROWNUM there, or you'll sort the
wrong ten rows.

## S5 · STEPS CARD (why FETCH FIRST wins)

ROWNUM needs that wrapping trick to be safe. FETCH FIRST doesn't — it's
guaranteed to apply after the sort, in one query, no subquery required.
That's why this course uses FETCH FIRST going forward, and just teaches you
to recognize ROWNUM when you run into it in someone else's code.

## S6 · OUTRO CARD

Sort first, then cap — that's the whole pattern. Next lesson: dates, one of
the trickiest and most common things you'll filter and calculate on in
Oracle Financials.
