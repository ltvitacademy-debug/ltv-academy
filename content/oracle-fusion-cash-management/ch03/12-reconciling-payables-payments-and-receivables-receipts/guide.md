# Reconciling Payables Payments and Receivables Receipts

Lessons 9–11 covered reconciliation mechanics in the abstract. This lesson gets concrete about the two transaction sources you'll reconcile constantly in practice: Payables payments (outflows) and Receivables receipts (inflows), including a couple of wrinkles each one brings.

## What you'll learn

- How a Payables payment flows from disbursement to reconciled bank statement line
- How a Receivables receipt flows from remittance to reconciled bank statement line
- How voided payments and reversed receipts affect reconciliation
- What usually drives matching for each source

## Payables payments: the outflow side

When Payables disburses a payment — a check, an EFT, a wire — that payment is a system transaction waiting for its bank statement counterpart. On the statement, that shows up as a debit (money out) with a transaction code (Lesson 7) that maps to something like "check paid" or "EFT payment." Matching typically relies on the payment amount and, where available, a reference such as the check number or EFT trace number, since those numbers often appear directly on the statement line or in its narrative detail.

**Voided payments** add a wrinkle: if a check is voided *before* it clears the bank, there's no real-world bank event to reconcile against, and the system transaction should simply never get a matching statement line — nothing to reconcile, because nothing happened at the bank. If a check is voided *after* it already appears to have cleared (a rare but real timing issue), that's a case needing manual investigation rather than automatic matching, since the statement and the system may briefly disagree about what actually happened.

## Receivables receipts: the inflow side

When a customer payment is recorded in Receivables as a receipt, it's also a transaction waiting for its statement counterpart — a credit (money in) on the bank side. Matching usually relies on the deposited amount and, where the bank statement carries it, a remittance reference. Lockbox deposits are a common complication here: a bank might batch several customers' payments into a single deposit line, which is exactly the one-to-many match type scenario from Lesson 9.

**Reversed receipts** — most often an NSF ("non-sufficient funds") returned check or a failed electronic payment — show up on the statement as a debit reversing a credit that was already reconciled. These need to be traced back to the original receipt and typically require the receipt itself to be reversed in Receivables, not just reconciled as an isolated statement line.

## A worked example

Harborview Metals Inc. pays a supplier, Kestrel Supply Co. (fictional), by EFT for $18,420.00. The statement shows a debit of $18,420.00 with the EFT trace number in the narrative, which the one-to-one matching rule picks up automatically by amount and reference. Separately, a customer, Thornbury Retail Group (fictional), pays a $32,900.00 invoice, but their bank payment bounces three days later for insufficient funds; First Continental Bank reports the $32,900.00 debit reversal on the next statement, and Harborview's Treasury team traces it back to the original receipt, which Receivables then reverses.

## Key terms

| Term | Meaning |
|---|---|
| Voided payment | A payment canceled before it reaches the bank; nothing to reconcile |
| Reversed receipt | A receipt later undone (e.g., NSF), appearing as an offsetting statement debit |
| Lockbox deposit | A bank-batched deposit covering multiple customer payments |

## Recap

Payables payments reconcile as outflows, usually matched by amount and reference, with voided payments needing care around timing. Receivables receipts reconcile as inflows, often complicated by lockbox batching and reversed (NSF) receipts that must trace back to the original transaction. Next up, lesson 13: what to do with items that stay unreconciled.
