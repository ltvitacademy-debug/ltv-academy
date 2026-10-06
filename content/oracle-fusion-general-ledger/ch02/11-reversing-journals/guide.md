# Lesson 11 — Reversing Journals

**Chapter 2 · Manual Journals · Lesson 11 of 37**

## What you'll learn

- How a reversal journal is built from the original, line by line
- The difference between switching debits/credits and changing the sign
- The three choices for which period a reversal lands in
- Why accrual journals are typically flagged to reverse automatically

## A reversal is a new journal, not an edit

As Lesson 10 established, a posted journal's lines can never be edited directly. To undo one, General Ledger creates a **reversal journal**: a brand-new journal entry that references the original and carries the opposite effect, so posting it cancels the original journal out.

```
Original (posted):  Dr Office Supplies Exp 1,250 / Cr Accrued Liabilities 1,250
Reversal (new journal):  Dr Accrued Liabilities 1,250 / Cr Office Supplies Exp 1,250
```

## Two ways to flip the amounts

- **Switch debit/credit** — the most common method. Every debit line becomes a credit of the same amount, and every credit line becomes a debit, on the same accounts.
- **Change sign** — instead of switching columns, the reversal keeps each line's debit/credit designation but enters the amount as negative, producing the same net effect on the account's balance through a different mechanical path.

Both methods cancel out the original journal's impact on balances; which one a company uses is typically a standing configuration choice, not a per-journal decision.

## Choosing which period the reversal lands in

When you reverse a journal, you choose:

- **Same period** — the reversal posts back into the same period as the original, useful when you catch a mistake before the period closes.
- **Next period** — the reversal posts into the following period, the standard pattern for an accrual: book the accrual in March, reverse it in April once the real invoice has arrived and been recorded through Payables.
- **Specific period** — you can also pick a particular period rather than only "same" or "next," if the correction genuinely belongs somewhere else.

## Auto-reverse: set it once, forget it

When you originally create an accrual journal, you can flag it to **reverse automatically** once its target period (usually "next period") opens — Oracle generates and posts the reversal for you without a second manual step. This is exactly the pattern for Solara Fixtures' March office supplies accrual from Lesson 6: flag it to auto-reverse in April, and the moment the real invoice posts through Payables in April, the accrual's effect has already been cleanly backed out, with no double-counting and no one needing to remember to reverse it by hand.

```
March: accrual journal posted, flagged "auto-reverse next period"
April: reversal posts automatically when April opens
April: real Payables invoice posts normally — no double counting
```

## Key terms

| Term | Meaning |
|---|---|
| Reversal journal | A new journal entry with the opposite effect of an existing posted journal |
| Switch debit/credit | Reversal method that swaps each line's debit/credit designation |
| Change sign | Reversal method that keeps the designation but negates the amount |
| Auto-reverse | A flag set at creation time that posts the reversal automatically when its target period opens |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: why is flagging an accrual journal to auto-reverse next period safer than relying on someone to remember to reverse it manually?
