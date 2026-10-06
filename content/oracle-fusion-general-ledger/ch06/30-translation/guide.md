# Translation

**Chapter 6 · Multi-Currency and Multi-Entity · Lesson 30 of 37**

## What you'll learn

- What translation does, and how it differs from revaluation
- Which rates apply to balance sheet accounts versus income statement accounts in translation
- What the Cumulative Translation Adjustment (CTA) is and why it exists
- Why translation produces a reporting-currency ledger, not a change to the original books

## Translation operates on the whole ledger, not individual balances

Lesson 29's revaluation corrected specific foreign-currency-denominated balances within a ledger. **Translation** is a different operation entirely: it restates an **entire ledger's** balances — every account, not just the foreign-currency-exposed ones — from that ledger's own currency into a different reporting currency. It's what you run when a subsidiary keeps its books in its local currency, but the parent company needs that subsidiary's full set of balances expressed in the parent's reporting currency for consolidated reporting.

## Why LTV Manufacturing Corporation would translate at all

Say LTV Manufacturing Corporation has a UK subsidiary, LTV Manufacturing UK Ltd, whose ledger is kept in GBP — correctly, since that's where it operates, invoices, and pays people. The US parent reports consolidated results in USD. Before that UK ledger's numbers can be combined with the US parent's numbers, every GBP balance has to become a USD figure. Translation produces exactly that: a USD-denominated version of the UK ledger's balances, without touching the GBP books themselves.

## Different rates for different account types

Translation doesn't use one single rate for everything, because a balance sheet and an income statement represent different things in time:

- **Balance sheet accounts** — translated at the **period-end spot rate**, since a balance sheet is a snapshot as of that date
- **Income statement accounts** — translated at a **period average rate**, since income statement activity accumulated throughout the period, not just on the last day

```
UK Ltd (GBP) balance sheet, Mar-2026, translated at period-end rate 1.31:
  Cash           GBP  142,000  ->  USD  186,020

UK Ltd (GBP) income statement, Mar-2026, translated at period average rate 1.285:
  Sales Revenue  GBP  310,000  ->  USD  398,350
```

## Why the two rates don't perfectly agree — the CTA

Because balance sheet and income statement lines are translated at different rates, the translated trial balance doesn't naturally balance on its own — retained earnings calculated from translated income doesn't automatically match the balance sheet's translated equity. The difference is captured in a dedicated equity account called the **Cumulative Translation Adjustment (CTA)**. The CTA isn't an error to fix; it's the expected, required plug that makes a translated balance sheet balance, and it accumulates over time as a recognized part of equity — it is not run through the income statement.

## Translation is reporting, not restatement

The critical distinction to hold onto: translation does not change LTV Manufacturing UK Ltd's actual books. The GBP ledger stays exactly as it was. Translation produces a separate, USD-denominated view of those same balances, specifically for consolidation. This matters because it sets up lesson 32's consolidation concepts directly — a translated ledger is one of the standard inputs a consolidation process combines across entities.

## Key terms

| Term | Meaning |
|---|---|
| Translation | Restating an entire ledger's balances into a different reporting currency |
| Period-end spot rate | Rate used to translate balance sheet accounts (a snapshot date) |
| Period average rate | Rate used to translate income statement accounts (accumulated activity) |
| Cumulative Translation Adjustment (CTA) | The equity account absorbing the imbalance created by using two different rates |

## Recap

Translation restates an entire ledger — balance sheet at the period-end rate, income statement at the period average rate — into a different reporting currency, without altering the original books, and the resulting imbalance is captured in the CTA equity account. Next up, lesson 31: Intercompany Transactions, the other half of multi-entity accounting.
