# Ticket: Bank Statement Will Not Reconcile

**Chapter 3 · Receivables and Cash Tickets · Lesson 5 of 5**

## What you'll learn

- How to bring Cash Management reconciliation concepts into an actual ticket
- Why "won't reconcile" usually means a specific subset of lines, not the whole statement
- The difference between a true timing difference and a true data error, in a reconciliation context
- A resolution note covering a mixed batch of exceptions

## The ticket

> **Ticket #40489 — Thornfield Materials Holdings.** Treasury analyst reports: "Automatic reconciliation on the operating account left 14 lines in the exception queue overnight. I can clear the obvious ones, but a few don't make sense." Severity: Medium.

## Start from what you already know

This course assumes you've completed the Cash Management course, where automatic and manual reconciliation, matching rules, tolerance, and clearing accounts were covered in depth. This ticket is that material applied under production pressure: 14 lines failed to auto-match, and the question is why, for each one, not in general.

## Investigating the 14 lines

Pulling the exception queue and sorting by reason rather than treating all 14 the same:

| Count | Reason | What it actually is |
|---|---|---|
| 9 | No system counterpart | Bank fees and interest charges the bank applied that were never going to have a matching system transaction |
| 3 | Outstanding checks | Checks issued and recorded in the system, but not yet cleared by the bank — a normal timing difference |
| 2 | Amount mismatch beyond tolerance | A receipt recorded in Receivables for a different amount than what actually hit the bank |

## Root cause, by category

The 9 bank-fee lines and 3 outstanding-check lines are not errors at all — they're the expected, normal kind of exception that automatic reconciliation is supposed to route to a human, exactly as covered in the Cash Management course. The 2 amount-mismatch lines are the only genuine problem: pulling the actual receipts, one customer's wire arrived $200 short of what was recorded (an apparent bank fee deducted in transit), and the other was a straightforward data entry error — the receipt amount was keyed as $14,750 when the actual wire was $14,570, a transposed pair of digits.

## Resolving each category correctly

- **Bank fees/interest (9):** Create the missing external transactions (so future similar fees have something to reconcile against) and reconcile.
- **Outstanding checks (3):** Leave as unreconciled — this is correct until the bank actually clears them. "Not yet reconciled" is not the same ticket as "won't reconcile."
- **Amount mismatches (2):** For the wire reduced by a transit fee, record the fee as a separate bank charge and reconcile the net. For the transposed digits, correct the receipt amount in Receivables to $14,570, then reconcile.

## Documenting it

> **Ticket #40489 — Thornfield Materials Holdings.** 14 lines left in the reconciliation exception queue after the automatic run.
> **Root cause:** 9 bank fees/interest with no system counterpart and 3 outstanding checks are normal, expected exceptions. 2 genuine issues: one wire reduced by an in-transit bank fee, and one receipt with a transposed-digit data entry error ($14,750 entered vs. $14,570 actual).
> **Fix:** Created external transactions for the 9 fee lines; left the 3 outstanding checks unreconciled pending bank clearing; recorded the transit fee as a separate charge for the mismatched wire; corrected the transposed receipt amount to $14,570.
> **Verified:** All lines except the 3 legitimately outstanding checks now reconciled; those 3 confirmed as normal timing differences, not errors.
> **Note:** Recommend the clerk double-check wire receipt amounts against the actual bank confirmation, not just the customer's remittance advice, to catch transposition errors earlier.

## Key terms

| Term | Meaning |
|---|---|
| Exception queue | Lines automatic reconciliation couldn't match, routed for manual review |
| External transaction | A system-side entry created for a bank-only event (like a fee) so it has something to reconcile against |
| Outstanding item | A transaction recorded in the system but not yet cleared by the bank — a timing difference, not an error |

## Recap — and the end of Chapter 3

Across these five Receivables and Cash tickets, the same discipline from Chapter 1 kept showing up: isolate the actual cause, don't assume it's the invoice (or the statement, or the whole exception queue) that's wrong, and document plainly what was and wasn't actually broken. Next up, Chapter 4: General Ledger and Subledger tickets, starting with a journal that simply won't post.
