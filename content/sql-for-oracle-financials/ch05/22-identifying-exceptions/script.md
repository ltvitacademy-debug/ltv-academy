# Lesson 22 — Identifying Exceptions · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Lesson 21 found numbers that disagree with each other. This lesson is
about numbers that look suspicious entirely on their own — no second
table required to know something's wrong.

## S2 · CODE CARD (negative or zero amounts)

Where invoice amount is less than or equal to zero. A normal invoice
amount should be positive — zero or negative where none was expected is a
classic sign of a data entry error or a broken import.

## S3 · CODE CARD (overpayment)

Join invoices to payments, group, having sum of amount paid greater than
invoice amount. Notice this isn't HAVING not-equal-zero like lesson
twenty-one — it's specifically greater than, because only one direction
matters here. Paying more than invoiced usually means money needs to be
recovered — more urgent than simply not being paid in full yet.

## S4 · CODE CARD (combining checks with UNION ALL)

Label each check with its own exception type, then UNION ALL them
together. Negative or zero amount, overpaid — one result, multiple
independent rules, each contributing its own labeled rows. This is a very
common real-world exception report shape.

## S5 · OUTRO CARD

Data-quality exceptions on their own, reconciliation exceptions between
two numbers — now you can catch both. Next lesson: the full unpaid-invoices
challenge, built end to end.
