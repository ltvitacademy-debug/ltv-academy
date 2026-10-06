# Billing the Customer: The Invoice

SO-48217 has shipped and been confirmed. From LTV Manufacturing's perspective, goods and money have not yet changed places — the company has given up inventory but hasn't been paid for it. The document that fixes that imbalance, and gives Harborview a formal demand for payment, is a Receivables **invoice**. This lesson looks at what an invoice actually is inside Oracle Fusion, building directly on what you already learned about Receivables transactions in that earlier course.

## What you'll learn

- What a Receivables transaction/invoice represents, as a quick refresher
- How an O2C invoice differs from one entered by hand
- Which fields on SO-48217's shipment become which fields on the invoice
- Why the invoice date and the GL date are not always the same thing

## A quick refresher: what an invoice is

You already know, from Accounts Receivable, that a Receivables **transaction** (commonly an invoice) is a formal record that a customer owes money: it has a transaction type, a bill-to customer and site, one or more lines with amounts, payment terms, and a due date calculated from those terms. This course doesn't re-teach that structure. What's new here is *where the invoice's data comes from* in an Order-to-Cash scenario: instead of a billing clerk typing in lines by hand, the invoice is generated from data that originated in Order Management and Shipping.

## From shipment to invoice fields

When a shipped, confirmed order line becomes eligible for billing, the information that will populate the Receivables invoice is largely already determined by the order and the shipment, not re-decided by Receivables:

| Invoice field | Comes from |
|---|---|
| Bill-to customer and site | The order header's bill-to |
| Quantity invoiced | The confirmed shipped quantity |
| Unit price | The order line's negotiated price (after the 5% discount) |
| Payment terms | The order header's terms (Net 30) |
| Transaction type | Determined by the transaction source tied to this order type |

For SO-48217, that means an invoice for 400 units at the discounted unit price, with Net 30 terms and Harborview's Charlotte bill-to site — none of it re-typed, all of it carried forward from decisions already made earlier in the cycle.

## Invoice date vs. GL date

An invoice's **transaction date** typically reflects when the invoicing event happened (often tied to the ship date), while its **GL date** determines which accounting period the resulting journal entry lands in. These usually match, but don't have to — a shipment that occurs on the last day of a month, invoiced a day later, is a common scenario where a consultant has to pay attention to which period an entry should actually post to, so revenue lands in the period the sale economically belongs to.

## Recap

An Order-to-Cash invoice uses the same Receivables transaction structure you already know, but its data is populated from the order and the confirmed shipment rather than typed by hand — bill-to, quantity, price, and terms all carry forward automatically. Invoice date and GL date serve different purposes and can diverge. Next up, lesson 15: the actual mechanics of how shipment data gets from Order Management into Receivables in the first place.
