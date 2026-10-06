# Lesson 8 — Inner vs. Outer Joins for Finance · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

"Which suppliers have we set up but never actually paid?" INNER JOIN can
never answer that question — by definition, it drops exactly the rows
you'd need to see.

## S2 · CODE CARD (LEFT OUTER JOIN)

LEFT OUTER JOIN fixes that. Select supplier name, invoice number, invoice
amount, from suppliers, left outer join invoices, on vendor id. Every
single supplier row survives this join, matched or not — where there's no
invoice, the invoice columns just come back NULL instead of the row
disappearing.

## S3 · CODE CARD (finding zero-invoice suppliers)

Now the pattern that matters: left outer join, then filter where the
right-hand table's key IS NULL. Where invoice ID is NULL. Only suppliers
with genuinely zero matching invoices survive that filter — for every
other supplier, invoice ID would have a real value. Outer join, then IS
NULL on the right side's key: you'll use this exact pattern constantly.

## S4 · CODE CARD (invoices with no payment)

Flip the same pattern onto payments. Left outer join invoices to invoice
payments, where invoice payments' invoice ID is NULL — every invoice that
has never had a single payment applied, at all.

## S5 · CODE CARD (legacy plus-sign syntax)

One more thing worth recognizing, not writing: older Oracle code uses a
plus sign in parentheses instead of LEFT JOIN. The plus sign goes on the
side that might be missing a match. It still works, but it's easy to get
wrong, so this course sticks with LEFT OUTER JOIN — just know the plus
sign when you see it in someone else's query.

## S6 · OUTRO CARD

INNER JOIN for matches only, LEFT OUTER JOIN plus IS NULL for "what's
missing." Next lesson: the same ideas, applied to customers, transactions,
and receipts on the receivables side.
