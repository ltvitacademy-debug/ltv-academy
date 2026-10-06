# Cancelling and Reversing Invoices

Lesson 21 ended on a cliffhanger: what do you actually do when an ordinary edit isn't allowed, or isn't the right tool? This closing lesson of Chapter 4 covers the two heavier operations Payables provides for that situation — **cancelling** an invoice entirely, and **reversing** specific distributions — and why those are genuinely different tools, not two names for the same thing.

## What you'll learn

- What cancelling an invoice actually does, and which invoices qualify
- Why a cancelled invoice disappears from liability reporting
- What reversing a distribution does differently, at a more granular level
- Which operation to reach for in which situation

## Cancelling an invoice: all or nothing

**Cancelling** an invoice sets its invoice and installment amounts to zero, reverses all of its distributions, and reverses any matches it had against purchase order schedules and distributions — effectively undoing the invoice as if it never happened, from an accounting and matching standpoint. It's an all-or-nothing operation at the invoice level.

Cancelling has real limits: you can only cancel an **unpaid** invoice, and even then, only an invoice that's either not yet approved, or approved but without any effective payments or posting holds already against it. Once cancelled, the invoice stops appearing in liability reports — it no longer represents something Brightfield owes — and it can no longer be paid or adjusted. If Brightfield's invoice from Hearthstone Logistics was entered twice by mistake, cancelling the duplicate removes it cleanly, as long as nothing has been paid against it yet.

## Reversing a distribution: surgical, not total

**Reversing a distribution** is a more granular operation, working at the individual distribution level rather than the whole invoice. Reversing a distribution creates a new, offsetting distribution with a negative amount matching the one being reversed. If the original distribution was matched to a purchase order, the reversal also updates the related PO information, such as quantity billed, to reflect that the match no longer applies. This lets you undo one piece of an invoice's accounting — say, one incorrectly coded distribution out of several — without touching the rest of the invoice or forcing the whole document to be cancelled and re-entered.

## Choosing between them

- **Cancel the whole invoice** when the invoice itself shouldn't exist at all — a duplicate entry, an invoice for goods that were actually returned entirely, or one entered against the wrong supplier from the start.
- **Reverse a specific distribution** when the invoice itself is legitimate, but one piece of its accounting needs to be undone or corrected — the invoice stays, one distribution gets offset, and (if needed) a corrected replacement distribution gets added.

## Why both operations tie back to earlier lessons

Both cancel and reverse respect the restrictions from lesson 21: you generally can't cancel a paid invoice, and reversing distributions on a paid invoice runs into the same restrictions ordinary editing does. This is consistent, not a special exception — once a payment exists, Payables treats the invoice's accounting as settled, and genuinely correcting a paid invoice's history (rather than just preventing a bad one from being paid in the first place) typically requires void/reissue tools on the payment side, which Chapter 6 covers.

## Recap

Cancelling an invoice is an all-or-nothing action, available only on unpaid invoices without effective payments or posting holds, that zeroes it out and removes it from liability reporting entirely. Reversing a distribution is the surgical alternative, undoing one piece of accounting (and its PO match, if any) while leaving the rest of the invoice intact. This closes Chapter 4. Next up, Chapter 5: Matching and Special Invoices, starting with two-way matching.
