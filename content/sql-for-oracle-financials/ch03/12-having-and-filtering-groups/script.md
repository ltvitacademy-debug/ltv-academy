# Lesson 12 — HAVING and Filtering Groups · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

"Which suppliers have we invoiced more than fifty thousand dollars,
total?" WHERE can't answer that — and this lesson is about why, and what
does instead.

## S2 · CODE CARD (the WHERE-on-aggregate error)

Try this and it fails: where SUM of invoice amount is greater than fifty
thousand, group by vendor ID. WHERE runs row by row, before anything's
been grouped or summed — at that point, there's no such thing yet as "this
supplier's total."

## S3 · CODE CARD (HAVING)

HAVING is the clause built for exactly this. Same query, but HAVING SUM of
invoice amount greater than fifty thousand, after GROUP BY. HAVING runs
after grouping has already produced its one-row-per-group result, so it
can filter on the aggregate itself.

## S4 · STEPS CARD (the logical order)

Oracle always evaluates clauses in the same order, no matter how you type
them: FROM, then WHERE, then GROUP BY, then HAVING, then ORDER BY. WHERE
narrows rows before grouping even happens — always cheaper than grouping
everything and filtering groups out later.

## S5 · CODE CARD (WHERE and HAVING together)

They're not alternatives — they team up constantly. Where payment status
isn't Y, group by vendor ID, having count of at least three. WHERE decides
which rows count as unpaid; HAVING decides which suppliers have enough of
them to matter.

## S6 · OUTRO CARD

WHERE for rows, HAVING for the aggregate. Next lesson: CASE, and building
the aging buckets every AP and AR report actually runs on.
