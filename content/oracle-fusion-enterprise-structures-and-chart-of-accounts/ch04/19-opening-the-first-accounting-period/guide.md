# Opening the First Accounting Period

A beautifully configured calendar, with every period dated and named correctly, is still useless until a period is actually **open**. This lesson closes Chapter 4 by covering period statuses — the switch that controls whether a period can accept a transaction at all — and the specific steps around opening a ledger's very first period.

## What you'll learn

- The five period statuses every accounting period in Oracle Fusion can have
- Why a period must be "Never Opened" before it can become open at all
- What opening the first period actually requires to be in place already
- Why period status is a day-to-day control, not a one-time setup step

## The five period statuses

Every accounting period carries one of five statuses at any given time:

```
Period Statuses:
  Never Opened       — journal entry/posting not allowed; the period has not yet been used
  Future Enterable   — open specifically for transactions dated in a future period
  Open                — transactions can be entered and posted normally
  Closed              — no new transactions allowed, but can be reopened if genuinely needed
  Permanently Closed  — final; cannot be reopened, preserving audit integrity
```

Periods generally move through these statuses left to right over their lifetime: a period starts out Never Opened (or Future Enterable, if someone needs to post ahead of schedule), becomes Open when its time arrives, moves to Closed at month-end, and is eventually set to Permanently Closed once the company is confident no further changes will ever be needed — often well after the fiscal year itself has ended, once audits are complete.

## Opening the very first period

Before you can open any period, the enterprise structure work from this entire chapter — and really this entire course so far — needs to already be in place: the calendar must be defined and assigned to the ledger, the ledger itself must be created with its chart of accounts and currency, and (from Chapter 2) at least one legal entity must be assigned. Opening the first period is performed through the **Open Period** task (or the opening step inside the Accounting Configuration Manager flow from Lesson 9), specifying the ledger and the period to open.

```
Before opening the first period, confirm:
  [ ] Calendar is defined and assigned to the ledger
  [ ] Ledger is created (chart of accounts, currency, accounting method)
  [ ] At least one legal entity is assigned to the ledger
  [ ] Balancing segment values are assigned per legal entity
```

## A day-to-day control, not a setup step

Unlike most of what this chapter covered, period status is not something you configure once and forget — it is actively managed every single accounting cycle. A controller opens the next period before month-end activity needs to post into it, and closes the prior period once that period's transactions and reconciliations are finalized. Getting period status wrong — leaving a period open too long, or closing one too early — creates exactly the kind of mess the **Testing and Reviewing Your Enterprise Structure** lesson in Chapter 6 will teach you to catch before it causes real damage.

## Recap

Periods move through five statuses — Never Opened, Future Enterable, Open, Closed, and Permanently Closed — and opening a ledger's first period requires the calendar, ledger, and legal entity assignments from earlier in this chapter and course to already be correctly in place. That completes Chapter 4. Chapter 5 turns to the chart of accounts itself: structure, segments, and the value sets that give those segments meaning.
