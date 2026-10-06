# Receiving and AP Invoicing

**Chapter 2 · Running the Business · Lesson 10 of 25**

The bearings arrive at the Savannah dock before Meridian's invoice does. This lesson walks through the receipt, the December period-end accrual it creates, and the January invoice that eventually matches it — and plants the first of Chapter 3's six problems along the way.

## What you'll learn

- How Priya Nandan records the receipt against PO-55210
- Why a December 31 close with goods received but not invoiced creates a GRNI accrual
- How Chen Liu enters and validates Meridian's invoice in January
- The exact mistake that gets made here, and why it's easy to miss

## The receipt

Priya Nandan, receiving clerk at the Savannah plant, records the full receipt against PO-55210 on **December 28**: 50 units of Industrial Pump Bearing PB-4400, received in full, no damage, no quantity discrepancy. Receiving this quantity debits Inventory — Raw Materials (1410) and credits a **receipt accrual** (uninvoiced receipt) account, pending Meridian's invoice.

## The December 31 accrual

At period close for December, LTV's period-end accrual process identifies PO-55210 as received but not yet invoiced — $18,400.00 sitting in receipt accrual with no matching AP invoice. Victor Okafor's close checklist calls for a **GRNI (Goods Received, Not Invoiced) journal** to reclassify this into a formal accrued liability for the financial statements:

- **Journal JE-GRNI-1231:** debit Inventory clearing / credit Accrued Liabilities (2150), $18,400.00, cost center 420, Company 1000
- **Reversal setting:** this journal is supposed to be flagged to **auto-reverse on the first day of the next period** (January 1) — because once Meridian's real invoice posts in January, the accrual's job is done and it needs to disappear so the real invoice isn't double-counted.

**This is where the mistake happens.** When Victor's team enters JE-GRNI-1231, the auto-reverse flag is left unchecked — an easy thing to miss on a manual journal entered under end-of-year time pressure. The journal posts correctly for December, but it will still be sitting on the books, unreversed, when January's real invoice arrives.

## Meridian's invoice, in January

Chen Liu, LTV's AP manager, receives Meridian's invoice on **January 10** and enters it on **January 14**:

- **Invoice:** INV-MER-88341, Meridian Bearing Supply Co., $18,400.00
- **Matched to:** PO-55210 and Priya Nandan's December 28 receipt, three-way match, no price or quantity variance
- **Validation:** the invoice validates cleanly — matching looks perfect, because it is; the match itself was never the problem
- **Distribution:** Accounts Payable — Trade (2110), cost center 420, Company 1000, $18,400.00

The invoice is completely correct on its own. The problem isn't the invoice, the PO, or the receipt — it's the accrual journal sitting back in December that was never told to reverse.

## Why this is easy to miss in the moment

Nothing about entering INV-MER-88341 looks wrong. The PO is right, the receipt is right, the match is clean, validation passes. The $18,400.00 problem only exists one level up, in the relationship between a January invoice and a December journal nobody is looking at anymore — exactly the kind of issue Chapter 3 asks you to go find.

## Key terms

| Term | Meaning |
|---|---|
| GRNI | Goods Received, Not Invoiced — an accrued liability for receipts without a matching invoice at period end |
| Auto-reverse | A journal setting that automatically creates an offsetting entry in the next period, so an accrual doesn't linger once it's no longer needed |

## Recap

PO-55210's bearings were received December 28, accrued at December 31 as JE-GRNI-1231 ($18,400.00) without its auto-reverse flag set, and Meridian's invoice INV-MER-88341 ($18,400.00) matched and validated cleanly in January. Both are individually correct — the risk is in what happens when they coexist. Next up, lesson 11: supplier payments, where Meridian gets paid for this invoice and for a second, smaller one.
