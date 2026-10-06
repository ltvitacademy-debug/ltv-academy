# Lesson 42 — Payables Troubleshooting Practice · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

The final lesson of this course. Let's work through four realistic troubleshooting scenarios, using everything we've covered.

## S2 · STEPS

Harbor Point Logistics has an invoice stuck unvalidated for three days. It turns out to be a Quantity Received hold — only a partial receipt exists so far. That's a matching issue, not a data error, and it resolves once the rest is received or the invoice is corrected.

## S3 · STEPS

Cascade Industrial Parts calls saying they were never paid, even though Payables shows the invoice as paid. The fix is checking whether the payment file actually reached the bank — and if it never did, that's a void-and-reissue situation, not a new invoice.

## S4 · CODE

Solace Robotics' reconciliation report shows a twenty-four-hundred-dollar gap between the subledger and the GL. Working backward through accounted, transferred, posted finds exactly where the two sides diverged — most often, something transferred but never got posted.

## S5 · STEPS

And Meridian Office Supply's accrual balance keeps growing every month. Running the accrual reconciliation report separates normal timing gaps from stale, cancelled-PO balances that need a manual correcting entry, because they'll never clear on their own.

## S6 · OUTRO

Four symptoms, four chapters, the same pattern: match what you're seeing back to the concept that explains it. That completes Oracle Fusion Accounts Payable. The natural next step in the Financials Configuration stage is Accounts Receivable — the same relationship, from the customer's side.
