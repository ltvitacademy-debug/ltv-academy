# Customer Invoicing

**Chapter 2 · Running the Business · Lesson 12 of 25**

LTV's largest customer places its biggest January order. This lesson turns Harborview Industrial Supply's sales order into a Receivables invoice — and introduces the second open invoice sitting on Harborview's account that becomes important in lesson 13.

## What you'll learn

- The sales order this capstone follows: Harborview's order for 400 control panels
- How a shipped order becomes a Receivables invoice through AutoInvoice
- Why a new natural account, Freight Out, gets used on this invoice
- The older, smaller open invoice already sitting on Harborview's account

## The order

Harborview Industrial Supply, LTV's largest distributor customer (lesson 7), calls in a large order:

- **Sales order:** SO-48217
- **Item:** Model CP-220 Control Panel
- **Quantity:** 400 units
- **List price:** $145.00 per unit ($58,000.00 gross)
- **Volume discount:** 5%, bringing the order to **$55,100.00**
- **Terms:** Net 30
- **Ship-from:** Savannah, GA distribution center
- **Ship-to:** Harborview's Charlotte, NC warehouse

The Savannah warehouse picks, packs, and ships the full 400 units on **January 20**. Shipping this order also triggers a **freight charge**, billed to Harborview per LTV's standard freight-out policy — a small but real amount, charged to the new account 7850 (Freight Out — Customer Shipments) set up in lesson 5.

## The invoice

AutoInvoice picks up the shipped order and the freight charge and generates:

- **Invoice:** INV-HV-30144, Harborview Industrial Supply, **$55,100.00** for the control panels, plus a separate freight line
- **Revenue distribution:** credit Product Revenue (4100), debit Accounts Receivable — Trade (1210), cost center 410 (Assembly, LTV's product-shipping cost center), Company 1000
- **Freight distribution:** credit account 7850 (Freight Out — Customer Shipments), same cost center and entity

The invoice completes and transfers to Receivables cleanly. Nothing about INV-HV-30144 is wrong — this is the invoice lesson 13's cash receipt is supposed to pay off in full.

## The invoice already on Harborview's account

Harborview, as an established customer (lesson 7), already has an older, unrelated open invoice sitting on its account from a smaller, earlier order:

- **Invoice:** INV-HV-29890, Harborview Industrial Supply, **$6,100.00**, from a prior shipment, still open and unpaid as of late January

INV-HV-29890 has nothing to do with SO-48217 or INV-HV-30144 — it's simply a second, smaller open item on the same customer's account. Keep both invoice numbers in mind; lesson 13's cash receipt is about to interact with both of them, and not the way it should.

## Key terms

| Term | Meaning |
|---|---|
| AutoInvoice | The Receivables process that converts shipped sales orders (and other transaction sources) into formal invoices |
| Freight out | Shipping cost billed to the customer, tracked separately from product revenue |

## Recap

SO-48217 — 400 Model CP-220 Control Panels, $55,100.00 net after discount — became INV-HV-30144 through AutoInvoice, including a freight charge on the new 7850 account. Harborview's account also carries an older, unrelated open invoice, INV-HV-29890, for $6,100.00. Next up, lesson 13: cash receipts, where Harborview's payment arrives — and gets applied to the wrong invoice.
