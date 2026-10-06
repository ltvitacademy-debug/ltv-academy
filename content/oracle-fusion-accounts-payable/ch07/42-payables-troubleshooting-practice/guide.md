# Lesson 42 — Payables Troubleshooting Practice

**Chapter 7 · Accounting, Reconciliation and Close · Lesson 42 of 42**

## What you'll learn

- A practical checklist for diagnosing common Payables problems
- How to work through four realistic scenarios using what this course covered
- How to decide which chapter's concepts apply to a given symptom
- Where to go next after finishing this course

## Troubleshooting is pattern-matching to the right chapter

Nearly every Payables problem you'll encounter maps back to a concept already covered somewhere in this course. The skill worth building isn't memorizing every possible error — it's recognizing which chapter's logic explains the symptom in front of you. Let's work through four scenarios using the fictional companies from earlier lessons.

## Scenario 1 — An invoice won't validate

**Harbor Point Logistics** submits an invoice for 200 pallets, but it's been sitting unvalidated for three days. Checking the invoice shows a **Quantity Received hold** (Lesson 24): only 180 pallets have been received against the PO so far.

*Diagnosis:* this is a matching issue, not a data-entry error. *Fix:* either wait for the remaining receipt, or correct the invoiced quantity to 180 and let the remainder be billed separately once received.

## Scenario 2 — A supplier says they were never paid

**Cascade Industrial Parts** calls asking about a payment from two weeks ago. The invoice shows as paid in Payables, but the supplier's bank never received funds.

*Diagnosis:* check whether the payment was ever actually transmitted — was the electronic file generated and sent, or did it fail silently at the bank integration step (Lesson 33)? If the payment shows issued in Oracle but the bank has no record, this is a candidate for **void and reissue** (Lesson 34), not a new invoice or a new PO.

## Scenario 3 — The AP-to-GL reconciliation doesn't tie

At month end, **Solace Robotics**' Payables-to-Ledger Reconciliation report (Lesson 41) shows a $2,400 difference between the subledger and the GL.

*Diagnosis:* work backward through the three-state pipeline from Lesson 38 — was everything accounted in Final mode? Was everything transferred? Was everything posted? A transaction stuck at "transferred but not posted" is the most common cause of exactly this kind of gap.

## Scenario 4 — An accrual balance keeps growing

**Meridian Office Supply**'s accrual account has grown every month for a quarter, with no corresponding drop in open receipts.

*Diagnosis:* run the Payables Accrual Reconciliation Report (Lesson 39) and separate the balance into what's a normal timing gap versus what's tied to cancelled POs or uncorrected receipts. The fix is a manual correcting entry for the stale pieces — the balance won't clear on its own.

## A general diagnostic checklist

1. **Is it a hold?** Check the hold type by name — it usually tells you exactly which document (PO, receipt, tax) doesn't agree with the invoice.
2. **Is it a payment that never reached the bank?** Check whether the file was actually transmitted before assuming the supplier is wrong.
3. **Is it a reconciliation gap?** Trace it through accounted → transferred → posted.
4. **Is it a stale balance?** Separate what's timing from what's a genuine uncorrected error.

## Course complete — what's next

This completes **Oracle Fusion Accounts Payable**. The natural next step in the Oracle Fusion Financials Consultant path's Financials Configuration stage is **Accounts Receivable** — the mirror image of everything covered here, from the customer's side of the relationship: invoicing customers, receipts, collections, and AR's own close process.

## Key terms

| Term | Meaning |
|---|---|
| Diagnostic checklist | A structured way to map a symptom back to the relevant course concept |

## Check yourself

You're ready to move on when you can answer, without looking: what are the four questions worth asking first when a Payables problem doesn't have an obvious cause?
