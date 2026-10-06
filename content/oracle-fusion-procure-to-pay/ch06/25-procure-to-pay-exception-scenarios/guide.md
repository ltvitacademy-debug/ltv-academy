# Procure-to-Pay Exception Scenarios

The last lesson replayed LTV Manufacturing Corporation's bearing transaction exactly as it should go. This lesson deliberately breaks it, three different ways, using the exact same company, item, and supplier, so you can practice recognizing and resolving each exception using everything this course has taught.

## What you'll learn

- A price variance exception, and how tolerance and matching holds handle it
- A quantity variance exception caused by a partial shipment
- A post-invoice return, and why it is harder to unwind than a pre-invoice one
- How each exception maps back to a specific mechanism from earlier chapters

## Exception 1: Price variance

Suppose Meridian Bearing Supply Co. ships the 50 bearings as ordered, but due to a billing error, invoices them at a unit price 8% above the purchase order price — well outside LTV's configured price tolerance. Chen enters the invoice, and it fails 3-way matching on price, creating a **matching hold** (lesson 19). The invoice cannot be validated or paid while the hold is open. Resolution: Chen contacts Meridian, who confirms the higher price was billed in error and issues a corrected invoice at the original PO price, which Chen replaces the held invoice with. Matched within tolerance, it validates and proceeds normally. The lesson here: a price variance exception is not an accounting problem to force through — it is a flag that something about the commercial agreement needs to be confirmed before cash moves.

## Exception 2: Quantity variance from a partial shipment

Suppose Meridian ships only 45 of the 50 bearings ordered, due to a stock shortage on their end, with the remaining 5 to follow later. Priya receives exactly 45 units against the purchase order (lesson 15) — the receipt correctly reflects only what physically arrived. If Meridian then invoices for the full 50 units, the invoice fails 3-way matching on quantity, since quantity billed (50) exceeds quantity received (45), creating a matching hold. Resolution: either Meridian corrects the invoice to bill only for the 45 units actually shipped, with a second invoice to follow once the remaining 5 ship and are received, or the hold is held open deliberately until the rest of the shipment arrives. The purchase order itself remains Open, not Closed for Receiving, until the remaining 5 units are received.

## Exception 3: A return discovered after the invoice was already paid

Suppose all 50 bearings are received, invoiced, matched, and paid cleanly — exactly like the main transaction — but two weeks later, LTV's maintenance team discovers 3 of the bearings are defective and were installed without the defect being caught during inspection. Returning these 3 units now, after payment, is a materially different situation than the return-to-supplier process covered in lesson 17, which assumed the return happens before invoicing. A post-payment return typically requires a **debit memo** or credit from Meridian (crediting LTV for the 3 defective units), separately processed in Payables, rather than simply reversing the original receipt and invoice, since the cash has already moved and the accounting has already posted and likely closed for the period. This is exactly the kind of situation lesson 22's reconciliation habits exist to catch early, before it becomes a messier correction weeks later.

## Why these exceptions matter more than the clean path

A consultant who has only ever seen a transaction go perfectly will freeze the first time a real one does not. Each of these three exceptions maps back to a specific control this course built earlier — matching tolerances, the receipt as an independent record of physical reality, and the extra difficulty of unwinding something after cash has already moved — and recognizing which control is actually being tested is most of the battle in resolving a live exception.

## Recap

This course followed one transaction — LTV Manufacturing Corporation's purchase of pump bearings from Meridian Bearing Supply Co. — through requisition, purchase order, receiving, invoicing, and the General Ledger, then deliberately broke it three ways to practice price variance, quantity variance, and post-payment return exceptions. That closes Oracle Fusion Procure-to-Pay. The next course in the Oracle Fusion Financials Consultant path is **Oracle Fusion Order-to-Cash**, which follows the mirror-image process: a sale, from the customer's order through fulfillment, invoicing, and cash collection, back into the same General Ledger.
