# Script — Reconciling Payables Payments and Receivables Receipts

## Segment 1 (title)

The last three lessons covered reconciliation mechanics in the abstract. This lesson gets concrete about the two sources you'll reconcile constantly: Payables payments going out, and Receivables receipts coming in.

## Segment 2 (steps)

When Payables disburses a payment, it shows up on the statement as a debit with a transaction code mapping to something like check paid or EFT payment. Matching usually relies on the amount and a reference like a check number or EFT trace number. A voided payment, canceled before it clears, should simply never get a matching statement line — nothing happened at the bank. A check voided after it appears to have cleared needs manual investigation instead.

## Segment 3 (steps)

A Receivables receipt is also waiting for its statement counterpart, showing up as a credit. Matching usually relies on the deposited amount and a remittance reference. Lockbox deposits complicate this — a bank might batch several customers' payments into one deposit line, which is exactly the one to many scenario from lesson nine. Reversed receipts, like an NSF returned check, show up as a debit reversing a credit that was already reconciled, and need to trace back to the original receipt for Receivables to reverse it properly.

## Segment 4 (code)

A worked example: Harborview Metals Inc pays a supplier, Kestrel Supply Co, by EFT for eighteen thousand four hundred twenty dollars. The statement shows a matching debit with the EFT trace number, picked up automatically. Separately, a customer, Thornbury Retail Group, pays an invoice that bounces three days later for insufficient funds — the bank reports the reversal, and Treasury traces it back to the original receipt for Receivables to reverse.

## Segment 5 (outro)

Outflows match on amount and reference, inflows add lockbox batching and reversal handling. Up next, lesson thirteen: what to do with items that stay unreconciled.
