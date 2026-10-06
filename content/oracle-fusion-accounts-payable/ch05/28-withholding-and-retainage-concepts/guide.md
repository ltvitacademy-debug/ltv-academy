# Lesson 28 — Withholding and Retainage Concepts

**Chapter 5 · Matching and Special Invoices · Lesson 28 of 42**

## What you'll learn

- What withholding tax is and when Payables calculates it automatically
- What retainage is and why it's tied to progress/complex purchase orders
- How a retainage release invoice works
- Why both mechanisms mean "invoiced amount" and "amount paid" can differ

## Withholding tax: paying less than the invoice, by law

**Withholding tax** is an amount an organization is legally required to deduct from a payment to a supplier and remit to a tax authority on the supplier's behalf, rather than paying the full invoiced amount directly to the supplier. It applies to certain supplier types (contractors subject to 1099 reporting in the US, suppliers subject to VAT withholding in many other countries) and is driven by setup on the supplier record, not something entered manually on every invoice.

When withholding applies, Payables automatically calculates the withheld amount during invoice validation and creates a separate withholding tax invoice or distribution — the supplier's payment is reduced by that amount, and the withheld amount is tracked separately for remittance to the tax authority.

### Illustrative example

**Harbor Point Logistics** (fictional, reused from Lesson 24) invoices $10,000 for a transportation services contract subject to 10% withholding.

| | Amount |
|---|---|
| Invoice amount | $10,000 |
| Withholding tax (10%) | $1,000 |
| **Amount actually paid to supplier** | **$9,000** |

## Retainage: holding back a percentage until the job is done

**Retainage** is a percentage of each progress payment on a contract — typically construction or long-duration service contracts — that's deliberately withheld until the work is fully complete, as leverage to ensure the contractor finishes the job to standard. Retainage is set up on **complex (progress-payment) purchase orders**, where a contract is billed across multiple invoices over time rather than as one lump sum.

Each progress invoice is reduced by the retainage percentage; the withheld amount accumulates until the contract is finished, at which point a **retainage release invoice** is created to pay out what was held back — assuming the work passes final acceptance.

### Illustrative example

**Meridian Office Supply** (fictional, reused from Lesson 25) also does office-renovation contracting, with a $50,000 contract carrying 10% retainage, billed across progress invoices.

| Progress invoice | Billed | Retainage held (10%) | Paid now |
|---|---|---|---|
| Invoice 1 | $20,000 | $2,000 | $18,000 |
| Invoice 2 | $30,000 | $3,000 | $27,000 |
| **Totals** | **$50,000** | **$5,000** | **$45,000** |

Once the renovation is complete and accepted, a retainage release invoice pays out the accumulated $5,000.

## Why both mechanisms matter together

Withholding and retainage are different in purpose — one is a legal tax obligation, the other is a contractual control — but they share a pattern worth remembering: **the invoiced amount and the amount actually disbursed to the supplier can legitimately differ**, by design, and Payables tracks that difference explicitly rather than treating it as an error.

## Key terms

| Term | Meaning |
|---|---|
| Withholding tax | A legally required deduction from a supplier payment, remitted to a tax authority |
| Retainage | A percentage of a progress payment held back until contract completion |
| Complex (progress) PO | A purchase order billed across multiple invoices over the life of a contract |
| Retainage release invoice | The invoice that pays out accumulated retainage once work is accepted |

## Check yourself

You're ready for Lesson 29 when you can answer, without looking: what's the practical difference in purpose between withholding tax and retainage, even though both reduce the amount paid below the invoice total?
