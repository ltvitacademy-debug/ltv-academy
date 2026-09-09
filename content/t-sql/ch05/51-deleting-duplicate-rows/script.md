# Lesson 51 — Deleting Duplicate Rows · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

We're closing out Chapter 5 with a genuinely practical problem: duplicate
rows. A form submitted twice, an import run more than once, a sync
process gone slightly wrong — duplicates show up constantly in real data,
and cleaning them out safely is a real, common task.

## S2 · CODE CARD (ROW_NUMBER / PARTITION BY example)

We'll cover ROW_NUMBER properly in Chapter 9, but here's just enough to
solve this problem now. Partition by groups rows sharing the same first
name, last name, and email promotion setting — think of it like GROUP BY,
but without collapsing anything. Within each group, RowNum starts at 1
and counts up. Any row where RowNum is greater than 1 is, by definition,
a duplicate of an earlier row in that same group.

## S3 · CODE CARD (DELETE from CTE example)

Wrap that numbered query in a CTE — we'll cover CTEs fully next chapter —
and delete anything past the first copy. This keeps exactly one row per
duplicate group, specifically the one with the lowest business entity ID,
and removes the rest.

## S4 · STEPS CARD (SELECT → CONFIRM → DELETE)

And here's the discipline that matters more than the syntax: DELETE is a
genuinely destructive, hard-to-undo operation. Always run the SELECT
version first. Review exactly which rows have RowNum greater than 1.
Confirm those really are the rows you want gone. Only then convert it to
a DELETE.

## S5 · OUTRO CARD

That wraps up Chapter 5. You now know how T-SQL stores and manipulates
text and dates — fixed versus variable length, Unicode, extracting and
transforming strings, date arithmetic, type conversion, and this
deduplication technique. Chapter 6 moves into subqueries, CTEs, and
views — building queries out of other queries. See you there.
