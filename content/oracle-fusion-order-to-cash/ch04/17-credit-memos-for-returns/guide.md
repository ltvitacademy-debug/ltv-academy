# Credit Memos for Returns

With SO-48217's invoice finally created in lesson 16, there's one loose end left from Chapter 3: the 20 damaged Model CP-220 units that Harborview returned. Those units were billed on the original invoice, but Harborview shouldn't have to pay for goods that arrived damaged and were scrapped. This lesson covers the credit memo that corrects that.

## What you'll learn

- What a credit memo is and how it relates to the original invoice
- How an RMA's billing resolution becomes a credit memo
- How SO-48217's $2,755.00 credit is calculated
- The difference between an applied credit memo and an on-account credit

## From RMA to credit memo

You saw in lesson 13 that once the 20 returned units were received and inspected, the RMA line moved to "awaiting billing." That status is what makes the financial side of the return possible. Because the return references the original sales order — and, now that it exists, the original invoice — Receivables can generate a credit memo that is tied directly back to that invoice, rather than a disconnected, manually calculated adjustment.

## Calculating SO-48217's credit

The invoice billed 400 units at the discounted net price:

$55,100.00 ÷ 400 units = $137.75 per unit (net of the 5% discount)

20 returned units at that same net unit price:

20 × $137.75 = **$2,755.00**

This is the amount of the credit memo: it uses the same discounted price the units were originally billed at, not the list price, so Harborview is credited exactly what they were charged for those 20 units — no more, no less.

## Applied vs. on-account credit

A credit memo generated this way, with a direct reference back to the original invoice, is an **applied credit memo**: Receivables already knows which invoice it offsets, so it reduces that invoice's open balance immediately. This is different from an **on-account credit**, which isn't tied to a specific invoice and instead sits as an available credit balance on the customer's account until someone applies it to something. Because this credit memo traces back to SO-48217's invoice through the RMA, it's created as an applied credit memo against that specific invoice.

## The effect on Harborview's balance

Before the credit memo: Harborview owes the full $55,100.00 invoiced amount. After it: Harborview owes $55,100.00 − $2,755.00 = $52,345.00, which is now the correct amount reflecting that only 380 usable units were ultimately kept.

## Recap

A credit memo generated from an RMA references the original invoice directly, letting Receivables calculate and apply the correction automatically rather than manually. SO-48217's return generates a $2,755.00 applied credit memo (20 units at the same discounted $137.75 unit price), reducing Harborview's open balance to $52,345.00. This closes Chapter 4 — the order has been billed, corrected via AutoInvoice, and credited for the return. Next up, Chapter 5 begins with lesson 18: the receivable that's now sitting open, and the cash receipt that will eventually close it.
