# Foreign Currency Journals

**Chapter 6 · Multi-Currency and Multi-Entity · Lesson 28 of 37**

## What you'll learn

- The difference between a ledger's currency, entered currency, and functional balances
- How Oracle Fusion converts an entered foreign currency amount at journal entry
- Where conversion rates come from, and what rate type means
- Why the converted amount, not the entered amount, is what posts to the ledger's functional balance

## Every ledger has one functional currency

Back in Chapter 1, you saw that a ledger is defined with a single **functional (ledger) currency** — for **LTV Manufacturing Corporation**'s primary ledger, that's USD. Every balance that ledger reports is stated in USD. But real transactions don't always happen in USD: a supplier invoice from a UK vendor arrives in GBP, an intercompany charge from a European subsidiary comes in EUR. A **foreign currency journal** is how one of those non-functional-currency amounts gets into a USD ledger at all.

## Entered currency vs. accounted currency

A foreign currency journal has two amounts on every line:

- **Entered currency amount** — the amount as it actually occurred, in the original currency (e.g., £8,500 GBP)
- **Accounted (functional currency) amount** — that same amount converted to the ledger's currency (e.g., $10,795 USD), using a conversion rate

Oracle Fusion stores and displays both. The entered amount preserves what actually happened in the real-world transaction; the accounted amount is what actually updates the ledger's functional-currency balances and is what feeds every report built in Chapters 1–5.

## Where the conversion rate comes from

At journal entry, a user selects (or the system defaults) a **conversion rate type** — commonly "Corporate" (a company-defined standard rate, often set daily or periodically for consistency across transactions) or "Spot" (the actual market rate on the transaction date). Oracle Fusion looks up the rate for that type and the journal's date, multiplies the entered amount by it, and populates the accounted amount automatically. A user doesn't do currency math by hand — they enter the real-world amount and currency, and the system converts.

## A worked example

LTV Manufacturing Corporation receives a GBP-denominated services invoice from a UK consultant on March 12, 2026, for £8,500. Using the Corporate rate type at 1.27 USD/GBP for that date:

```
Entered:    8,500.00 GBP
Rate type:  Corporate, 1.27 USD/GBP (03/12/2026)
Accounted: 10,795.00 USD
```

The journal posts both amounts; the USD ledger's Professional Services Expense balance increases by $10,795 — the number that shows up in every trial balance, inquiry, and report from here on.

## Why this balance won't stay exactly right forever

The $10,795 accounted at entry reflects the exchange rate on March 12. If that invoice isn't paid by period end, and the exchange rate has moved, the *true* USD value of that outstanding GBP liability has technically changed too — even though nothing was re-entered. That gap between "what we booked it at" and "what it's actually worth today" is exactly the problem lesson 29's revaluation process exists to correct.

## Key terms

| Term | Meaning |
|---|---|
| Functional (ledger) currency | The single currency a ledger reports its balances in |
| Entered currency | The real-world currency and amount of the original transaction |
| Accounted amount | The entered amount converted to the ledger's functional currency |
| Conversion rate type | The rate source used for conversion (e.g., Corporate, Spot) |

## Recap

A foreign currency journal carries both an entered amount, in the real-world currency, and an accounted amount, converted automatically to the ledger's functional currency using a selected rate type — and it's the accounted amount that drives every balance and report. Next up, lesson 29: Period-End Revaluation, which corrects for exchange-rate movement on balances still open at period end.
