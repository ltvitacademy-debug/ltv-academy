# Lesson 19 — Finding Duplicates · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Paying the same invoice twice is one of the most expensive, most common
mistakes in Accounts Payable. Consultants get asked to build this exact
check constantly — so let's build it two different ways.

## S2 · CODE CARD (GROUP BY + HAVING)

Vendor ID, invoice number, count star, from invoices, group by vendor ID
and invoice number, having count greater than one. Group by both
columns together — the same invoice number from a different supplier
isn't a duplicate, it's just a coincidence. This tells you which invoice
numbers repeat, and how many times.

## S3 · CODE CARD (ROW_NUMBER to list the actual rows)

But it doesn't give you the rows themselves. ROW_NUMBER, partition by
vendor ID and invoice number, order by invoice ID — the first occurrence
gets row number one, every duplicate after it gets two, three, and up.
Filter to row number greater than one, and now you have the actual
duplicate rows, every column intact.

## S4 · STEPS CARD (choosing between the two)

GROUP BY and HAVING answers "how many duplicates, for which invoice
numbers" — a quick summary to size the problem. ROW_NUMBER answers "show
me the actual rows" — what you need to go investigate or clean up.
Consultants often run both: summary first, then the detail.

## S5 · OUTRO CARD

Two different questions, two different tools — summary versus detail.
Last lesson of the chapter: comparing two entire sets of data against each
other with UNION, INTERSECT, and Oracle's own MINUS.
