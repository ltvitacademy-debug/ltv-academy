# Script — Supplier Payments

## Segment 1 (title)

Two Meridian invoices get paid in January: the bearings invoice and a smaller, routine replenishment invoice. Both payments go out clean from LTV's side — but one of them is about to have a problem on the bank's side nobody will see until the statement loads.

## Segment 2 (steps)

Chen Liu builds a single Payment Process Request covering both invoices, paid by EFT from Regions Bank. PMT-21094, $18,400, pays the bearings invoice. PMT-21087, $9,200, pays the smaller replenishment invoice. Both post exactly once each in Oracle Fusion — completely correct.

## Segment 3 (code)

Debit Accounts Payable, credit Cash Operating, for each payment, under Fabrication's cost center. Oracle Fusion's own records show one payment event per invoice. No duplicates, no errors, on this side of the transaction.

## Segment 4 (steps)

The payment file transmits to Regions Bank once — but what the bank's ACH processor does with it isn't something Oracle Fusion controls. A network timeout retry on the bank's end causes PMT-21087's file to retransmit a second time, and Meridian's bank receives two $9,200 EFT credits instead of one. LTV's books are right. The bank's processing isn't.

## Segment 5 (outro)

Up next, lesson twelve: customer invoicing, where Harborview Industrial Supply's order becomes a Receivables invoice.
