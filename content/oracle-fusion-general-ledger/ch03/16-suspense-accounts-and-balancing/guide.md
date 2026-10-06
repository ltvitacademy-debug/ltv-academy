# Lesson 16 — Suspense Accounts and Balancing

**Chapter 3 · Journal Approvals and Import · Lesson 16 of 37**

## What you'll learn

- What a suspense account is for, and when it actually gets used
- How enabling suspense posting changes what happens to an unbalanced journal
- The difference between the default suspense account and a source/category-specific one
- Why suspense balances need regular review, not permanent residence

## Lesson 6 said a journal must balance. Suspense is the exception valve.

Lesson 6 established that General Ledger won't complete an unbalanced journal. **Suspense accounts** exist for a narrow, deliberate exception to that rule: certain interfaced sources (often from legacy systems or third-party feeds) may bring in journals that are *slightly* out of balance due to rounding, timing, or an upstream system issue the business has decided not to block posting over. If **suspense posting** is enabled for a ledger, Oracle automatically adds a balancing line against a designated suspense account rather than rejecting the entry outright.

```
Interfaced journal (slightly out of balance due to rounding):
  Dr Various Expense Accounts        48,203.17
  Cr Various Liability Accounts      48,203.00
  (short by 0.17)

With suspense posting enabled:
  Cr Suspense Account                     0.17   ← added automatically
  Journal now balances and can post
```

## Default versus source/category-specific suspense accounts

You can define a **default suspense account** for the ledger as a whole, and optionally additional suspense accounts tied to a **specific source and category combination** — exactly the kind of targeting Lesson 7 set up. If an unbalanced journal's source/category matches one of those specific pairs, General Ledger uses that dedicated suspense account; otherwise, it falls back to the ledger's default.

## Why suspense is not a place to leave money

A balance sitting in a suspense account represents a **real discrepancy that hasn't been explained yet** — not a resolved transaction. Good practice treats a non-zero suspense balance as something to investigate and clear during the close process (Chapter 7), not something to let accumulate quietly. A suspense account with a growing, unexplained balance is a classic audit red flag: it means unbalanced entries are being waved through routinely rather than being understood and fixed at the source.

## Key terms

| Term | Meaning |
|---|---|
| Suspense posting | A ledger-level setting that lets an unbalanced journal post anyway, with an automatic balancing line |
| Suspense account | The designated account that absorbs the balancing amount |
| Default suspense account | Used when no source/category-specific suspense account matches |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: why is a non-zero suspense account balance something to investigate during close, rather than something to simply leave alone?
