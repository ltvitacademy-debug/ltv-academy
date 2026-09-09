# Lesson 29 — CROSS APPLY · Voiceover script

Segments map 1:1 to slides. Target: ~2 minutes total.

---

## S1 · TITLE CARD

Every join so far has connected two tables. But T-SQL also has
table-valued functions — functions that return a whole result set, often
computed differently for each row you're looking at. Joining to one of
those needs a different tool: CROSS APPLY.

## S2 · CODE CARD (CROSS APPLY ufnGetContactInformation)

AdventureWorks2012 ships a function called ufnGetContactInformation that
takes a business entity ID and returns that person's contact details.
CROSS APPLY calls this function once for EVERY row in Person dot Person,
passing in THAT row's own business entity ID each time, and joins the
result straight back in.

## S3 · STEPS CARD (JOIN...ON can't / CROSS APPLY can)

Here's why a regular JOIN with ON can't do this job: ON is evaluated as a
set-based condition, all at once, not row by row — it has no way to say
"call this function using the current row's specific value." CROSS APPLY
exists specifically to solve that gap. And one more thing worth knowing:
if the function returns nothing for a given row, that row gets dropped
entirely — CROSS APPLY behaves just like INNER JOIN in that respect.

## S4 · OUTRO CARD

CROSS APPLY re-runs a function fresh for every row, feeding it that row's
own values, and drops rows the function returns nothing for. Next lesson:
OUTER APPLY, the LEFT JOIN equivalent — for keeping those rows instead.
See you there.
