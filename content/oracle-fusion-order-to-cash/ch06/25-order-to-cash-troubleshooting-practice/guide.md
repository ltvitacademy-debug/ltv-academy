# Order-to-Cash Troubleshooting Practice

This course has shown you a working transaction (SO-48217) and several isolated exceptions (lesson 24). The last skill to build is a repeatable method for troubleshooting *any* Order-to-Cash problem, even one you've never specifically seen before. This final lesson gives you that method, then applies it to two new practice cases.

## What you'll learn

- A five-question troubleshooting checklist for any stuck O2C transaction
- How to apply it to a case where an order won't invoice
- How to apply it to a case where a customer's balance won't clear
- Where this course leaves off, and where the path continues

## The troubleshooting checklist

When something in Order-to-Cash isn't behaving, work through these questions in order, because each one narrows where the problem can live:

1. **What stage is this transaction actually in?** Check the order line's status first — don't assume. A line stuck "Awaiting Shipping" has a different problem than one stuck "Awaiting Billing."
2. **Did the last expected event actually complete?** For a line stuck pre-invoice, did ship confirmation actually run? For a line stuck pre-cash, was a receipt actually created?
3. **Is there a hold or a rejection sitting in the way?** Check for credit holds, approval holds, and — specifically for billing — AutoInvoice rejection or error reasons in Manage AutoInvoice Lines.
4. **Do the amounts actually agree at the nearest checkpoint?** Compare the transaction to the one immediately upstream of it — order to shipment, shipment to invoice, invoice to receipt — the same checkpoints from lesson 22.
5. **Is the setup underneath this transaction actually complete?** Missing remit-to addresses, disabled items at a ship-from org, and missing price lists are setup problems wearing a transaction's clothing.

## Practice case 1: "the order won't invoice"

A line shipped three days ago but has generated no Receivables transaction. Walking the checklist: the line's status shows "Awaiting Billing," not "Awaiting Shipping" — so it did ship. Checking Manage AutoInvoice Lines shows a rejected record with no invoice in Receivables. The reason: the customer's item was never assigned to the price list used by this order's price list — a setup gap, not a shipment problem. The fix is adding the missing price list assignment, then resubmitting AutoInvoice.

## Practice case 2: "the customer's balance won't clear"

A customer insists they paid in full, but their account still shows an open balance. Walking the checklist: a receipt was created for the right amount, on the right date — so the cash was recorded. But the receipt's status shows "unapplied, on account" rather than applied to a specific invoice, because the remittance referenced an invoice number that doesn't exist in the system (likely a typo on the customer's end). The fix is a cash applications specialist manually applying that existing, correctly-dated receipt to the actual open invoice it was clearly intended for.

## Recap

The checklist is: identify the stage, confirm the last expected event completed, check for a hold or rejection, verify amounts agree at the nearest checkpoint, and rule out a setup gap. Both practice cases resolve to something other than the obvious first guess — a setup gap disguised as a shipping problem, and a typo disguised as a missing payment. This completes Oracle Fusion Order-to-Cash. Next up in the Oracle Fusion Financials Consultant path: **Subledger Accounting**, where you'll go deeper into exactly the SLA rules that generated the journal entries you saw fire automatically throughout this course.
