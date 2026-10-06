# Period-End Revaluation

**Chapter 6 · Multi-Currency and Multi-Entity · Lesson 29 of 37**

## What you'll learn

- What revaluation does, and which accounts it applies to
- How the revaluation rate differs from the rate used at journal entry
- How to read an unrealized gain or loss produced by revaluation
- Why revaluation runs before translation, every period

## The problem lesson 28 left open

Lesson 28 ended with a gap: a GBP invoice accounted at $10,795 using the March 12 rate stays on the books at that figure, even if the exchange rate moves before period end and the invoice is still unpaid. **Revaluation** is the process that closes that gap — it reviews foreign-currency-denominated balances and restates them to what they're worth in functional currency *as of the revaluation date*, typically the last day of the period.

## What revaluation actually touches

Revaluation is performed on **account balances**, not on individual transactions. It targets balance sheet accounts that carry a foreign-currency-denominated balance — payables, receivables, bank accounts holding foreign currency — because those are the balances still "live" and exposed to rate movement at period end. It does not touch income statement accounts; an expense recognized in March is done, historically, at the rate that applied in March, and restating it would misstate the period's actual results.

## Running revaluation for LTV Manufacturing Corporation

At the end of March 2026, the outstanding GBP invoice from lesson 28 is still unpaid. The period-end GBP/USD rate has moved from 1.27 to 1.31. Revaluation recalculates what that £8,500 liability is worth today:

```
Original accounted (03/12 rate 1.27):  $10,795.00
Revalued  (period-end rate 1.31):      $11,135.00
Unrealized loss:                          $340.00
```

Revaluation generates a journal for the difference — here, an unrealized loss, because the liability is now worth more in USD than it was originally booked at. Crucially, this revaluation journal is typically set to **automatically reverse** in the next period, because it's an adjustment to a point-in-time balance, not a permanent restatement — the moment that invoice is actually paid (at whatever the real rate is then), the real realized gain or loss is booked, and the temporary revaluation entry has already reversed out of the way.

## Unrealized vs. realized

This is the key distinction revaluation introduces:

- **Unrealized gain/loss** — a paper adjustment, reflecting what a still-open balance is worth today; it reverses next period
- **Realized gain/loss** — the actual gain or loss booked when the transaction finally settles (the invoice is paid, the receivable is collected)

## Why revaluation runs before translation

Revaluation adjusts balances that are still in the subsidiary's own books, correcting for rate movement within that ledger. Translation, covered next in lesson 30, takes an *entire ledger's* balances and restates them into a different reporting currency for consolidation purposes. Revaluation has to happen first — a ledger must correctly reflect its own foreign-currency exposure before that ledger's balances get translated into another currency for group reporting.

## Key terms

| Term | Meaning |
|---|---|
| Revaluation | Restating foreign-currency balance sheet account balances to current period-end rates |
| Unrealized gain/loss | A temporary, reversing adjustment reflecting current value of a still-open balance |
| Realized gain/loss | The actual gain/loss booked when a transaction finally settles |

## Recap

Revaluation restates foreign-currency balance sheet balances to period-end rates, generates a reversing unrealized gain or loss journal, and must run before translation. Next up, lesson 30: Translation, which restates an entire ledger into another currency for consolidated reporting.
