# Lesson 31 — Asset Reconciliation

**Chapter 6 · Accounting, Reporting and Close · Lesson 31 of 33**

## What you'll learn

- What reconciliation is actually confirming
- The standard approach: Assets subledger balances versus GL account balances
- The most common real causes of an out-of-balance condition
- Why reconciliation is a recurring discipline, not a one-time fix

## What reconciliation confirms

**Reconciliation** answers one specific question: does the Fixed Assets subledger's detail agree with what the General Ledger shows for the same accounts? Lesson 1 established that Assets is a subledger holding far more detail than GL needs; reconciliation is the recurring check that the *summarized* version in GL actually matches the *detailed* version in Assets, for every account fixed assets touches — cost, accumulated depreciation, CIP, and gain/loss on retirement.

## The standard approach

The typical reconciliation compares two things for the same account and period:

- **Assets subledger balance** — pulled from Assets reports (Lesson 30's cost detail, reserve ledger, and similar reports), reflecting every addition, adjustment, transfer, and retirement Assets knows about.
- **GL account balance** — the posted balance in the General Ledger for the corresponding account.

If these two don't match, something in the chain from Chapter 3 through Lesson 29 needs investigation — and Lesson 29 already gave you the first and most common place to look.

## The most common causes of an out-of-balance condition

- **Timing** — Lesson 29's transfer-versus-post distinction: a batch accounted in Assets but not yet transferred, or transferred but not yet posted in GL, will make the two appear out of sync even though nothing is actually wrong — it just hasn't caught up yet.
- **Manual GL entries bypassing Assets** — someone makes a journal entry directly in GL against a fixed-asset account (correcting what looked like an error, or recording something that should have gone through Assets instead) without a matching transaction in Assets. This breaks reconciliation at the source, because Assets has no record of a change GL now reflects.
- **Unposted or failed Create Accounting runs** — if Create Accounting (Lesson 28) didn't successfully process every transaction, Assets may show activity that was never turned into a journal entry at all, so it never had a chance to reach GL.
- **Incorrect account mapping** — a category book default (Chapter 2) pointing at the wrong GL account means Assets dutifully creates correct-looking entries that land in the wrong place, which can look like an imbalance on the *intended* account while actually just being miscoded.

## Why this is a recurring discipline, not a one-time fix

Reconciliation isn't something you do once at implementation and then forget. It's performed every period, typically as part of closing (Lesson 32), precisely because new transactions happen every period and any of the causes above can recur. A company that reconciles consistently catches small discrepancies while they're still small and easy to trace back to a specific transaction; a company that reconciles rarely accumulates discrepancies that become genuinely difficult to unwind months or years later.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Confirming the Assets subledger's balances agree with the corresponding General Ledger account balances |
| Manual GL entry bypass | A journal entry made directly in GL against a fixed-asset account without a corresponding Assets transaction |
| Account mapping | The category book configuration linking asset transactions to specific GL accounts |

## Lab

Meridian's accumulated depreciation account doesn't reconcile between Assets and GL for the current period. Walk through the four causes above in the order you'd investigate them, and explain why checking timing first (Lesson 29) is usually the fastest path to an answer.

## Check yourself

Without looking back, can you name the two balances reconciliation compares, and list at least three real causes of an out-of-balance condition?
