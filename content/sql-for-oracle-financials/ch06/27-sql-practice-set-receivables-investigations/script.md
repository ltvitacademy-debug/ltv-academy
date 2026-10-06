# Lesson 27 — SQL Practice Set: Receivables Investigations · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Three more real investigations, mirrored onto Receivables. Same method as
last lesson — work each one out yourself before the solution.

## S2 · CODE CARD (top 5 customers past due)

"Which customers owe us the most, past due?" Join customer accounts to
payment schedules, where amount due remaining is positive AND due date is
already in the past — that due-date condition is what makes this past
due, not just outstanding. An invoice due next week is outstanding, but
it isn't past due yet.

## S3 · CODE CARD (unapplied cash by customer)

"Which customers have unapplied cash sitting on their account?" Receipt
amount minus what's actually been applied, left outer join, NVL-guarded,
having the difference not equal to zero. Lesson twenty-one's
reconciliation pattern, with a customer account joined in for context.

## S4 · CODE CARD (never made a payment)

"Which customers have a transaction but have never paid at all?" EXISTS
for "has a transaction," NOT EXISTS for "has never made a cash receipt" —
both in the same query. Once you're comfortable with Chapter 4, you'll
reach for this combination constantly.

## S5 · OUTRO CARD

Past-due exposure, unapplied cash, customers who never pay — three more
real questions, the same toolkit again. Next lesson: the Ledger and close
side of the practice sets.
