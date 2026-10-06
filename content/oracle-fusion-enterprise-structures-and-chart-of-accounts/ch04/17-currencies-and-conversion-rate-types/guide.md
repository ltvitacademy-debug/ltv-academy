# Currencies and Conversion Rate Types

Currency is the third of a ledger's "4 Cs." This lesson covers enabling currencies for use, and the four predefined conversion rate types Oracle Fusion gives you for translating one currency into another — a concept that matters the moment a business touches more than one currency anywhere in its operations.

## What you'll learn

- How currencies get enabled for use in Oracle Fusion
- The four predefined conversion rate types, and what distinguishes each
- Which rate type requires a rate to be entered manually, and why
- How a ledger's functional currency relates to transaction currencies

## Enabling currencies

Oracle Fusion ships with a large list of ISO-standard currencies already defined, but a currency must be explicitly **enabled** before it can be used on a ledger, a transaction, or anywhere else in the system. This is managed through the **Manage Currencies** task. A company operating only in US dollars might enable just USD; a multinational would enable every currency its subsidiaries, customers, or suppliers transact in.

## The four conversion rate types

When an amount needs to move from one currency to another, Oracle Fusion needs to know *which* exchange rate to apply — and that choice is the **conversion rate type**. Four are predefined out of the box:

```
Conversion Rate Types:
  Spot       — rate for a specific date, for fluctuating/volatile currencies
  Corporate  — a standard rate set by senior finance management, used over a period
  User       — no automatic rate; the preparer must enter one manually
  Fixed      — a rate that stays fixed, typically for currencies pegged to another
```

- **Spot** rates reflect real market conditions for a specific day, useful when a currency moves enough that yesterday's rate is unreliable today.
- **Corporate** rates are deliberately smoothed — set by management, often monthly, so that reported results don't bounce around with every daily market fluctuation.
- **User** rate type is the one exception to automation: during journal entry, if the rate type selected is User, Oracle Fusion will not supply a rate automatically, and the preparer must type one in. This is used sparingly, for cases that genuinely need a one-off, manually-justified rate.
- **Fixed** rates suit currencies that are pegged to another currency by policy (a central bank peg, for example) and therefore do not need daily recalculation.

Companies can also define **additional, custom conversion rate types** beyond these four if their reporting requires it.

## Functional currency vs. transaction currency

A ledger's **functional currency** is the one currency its balances are ultimately stated in — one of the ledger's 4 Cs, fixed when the ledger is created. A **transaction currency** is whatever currency a specific invoice, order, or journal was originally entered in, which may be completely different. Every transaction entered in a currency other than the ledger's functional currency has to be converted using one of the rate types above before it can be summarized into the ledger's balances.

## Recap

Currencies must be explicitly enabled before use, and the four predefined conversion rate types — Spot, Corporate, User, and Fixed — each serve a different translation need, with User being the one requiring manual entry. Next up, lesson 18: daily rates and currency conversion, where we cover how those rates actually get loaded and maintained day to day.
