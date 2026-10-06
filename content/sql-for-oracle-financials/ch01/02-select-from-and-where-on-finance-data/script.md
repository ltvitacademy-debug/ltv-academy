# Lesson 2 — SELECT, FROM and WHERE on Finance Data · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Time for your first real Oracle Financials table. Behind the Manage
Invoices page sits a table called A-P underscore Invoices underscore All —
the actual table name used by every Payables consultant who's ever written
a custom report.

## S2 · CODE CARD (SELECT and FROM)

Select invoice number, invoice date, invoice amount, from A-P invoices all.
SELECT lists the columns you want back. FROM names the table. Without a
WHERE clause, every single row comes back — and on a real Payables table
that could be hundreds of thousands of rows, so this is rarely what you
actually want.

## S3 · CODE CARD (WHERE filters per row)

Add a WHERE clause: where invoice amount is greater than ten thousand.
Oracle checks that condition for every single row in the table, one at a
time, and only keeps the ones where it comes back true. Comparison
operators work exactly like you'd expect — equals, not equals, greater
than, less than.

## S4 · STEPS CARD (payment status flag values)

Here's a column you'll use constantly: payment status flag. It's Y for
fully paid, N for unpaid, and P for partially paid. "Where payment status
flag is not equal to Y" is how you'd pull every invoice that isn't fully
settled yet — both unpaid and partially paid.

## S5 · CODE CARD (no AS on table aliases)

And here's the one Oracle rule that trips up everyone coming from another
database: a table alias never takes the word AS. "From ap invoices all,
aliased i" — just the bare letter, no AS in front of it. Column aliases can
still use AS if you want one. Table aliases, never.

## S6 · OUTRO CARD

SELECT, FROM, WHERE — three clauses, and you can already filter a real
Financials table down to exactly the rows you need. Next lesson: sorting and
limiting those results.
