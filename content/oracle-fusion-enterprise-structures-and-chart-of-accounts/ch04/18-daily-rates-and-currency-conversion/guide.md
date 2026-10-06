# Daily Rates and Currency Conversion

Conversion rate types, from the last lesson, define the *category* of rate. This lesson covers the day-to-day mechanics: how actual numeric rates get loaded into Oracle Fusion, kept current, and automatically applied when a Spot or Corporate rate is needed on a given date.

## What you'll learn

- What "daily rates" actually are, and how they're entered
- The Daily Rates Import and Calculation process
- What cross rate rules solve, and why they matter for less common currency pairs
- Why keeping daily rates current is an ongoing operational task, not a one-time setup step

## What a daily rate is

A **daily rate** is a specific numeric exchange rate between two currencies, for one conversion rate type, effective on one specific date. "1 EUR = 1.08 USD, Corporate rate, effective October 6" is a daily rate. These are managed through the **Manage Daily Rates** task, where rates can be entered manually or loaded through an import process.

```
Daily Rate record:
  From Currency: EUR
  To Currency:   USD
  Rate Type:     Corporate
  Date:          2026-10-06
  Rate:          1.08
```

## The Daily Rates Import and Calculation process

Most companies do not type in daily rates by hand every day. Instead, Oracle Fusion supports a **Daily Rates Import and Calculation** scheduled process that can pull rates from an external feed (a market data provider, for example) and load them automatically, keeping Spot and Corporate rates current without manual data entry. Automating this is standard practice for any company with meaningful multi-currency volume — manual daily entry does not scale and is a common source of stale-rate errors.

## Cross rate rules

Sometimes a direct rate between two specific currencies is not readily available, but rates to a common third currency (often USD) are. A **cross rate rule** tells Oracle Fusion how to derive a rate between Currency A and Currency B by routing *through* a third currency — for example, computing a THB-to-EUR rate by combining a known THB-to-USD rate and a known USD-to-EUR rate. This matters most for less commonly traded currency pairs, where a direct quoted rate may simply not exist in the data source being used.

```
Cross Rate Rule example:
  THB → USD (known rate)
  USD → EUR (known rate)
  THB → EUR (derived automatically via USD)
```

## An ongoing operational task

Unlike a chart of accounts structure or a calendar, daily rates are not a "set it up once" piece of enterprise structure — they need fresh data every single day the business operates, for every currency pair in active use. A consultant's job during implementation is to get the import process configured and scheduled correctly; keeping it running smoothly afterward becomes part of ongoing period-close operations, which the Troubleshooting Oracle Financials course later in this path covers from the support side.

## Recap

A daily rate is a specific numeric rate for a currency pair, rate type, and date, usually kept current through an automated import process, with cross rate rules filling in gaps for currency pairs lacking a direct quote. Next up, lesson 19: opening the first accounting period, where the calendar and currency setup from this chapter finally becomes usable for real transactions.
