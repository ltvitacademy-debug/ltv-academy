# Lesson 4 — Accounting Periods and Period Status

**Chapter 1 · General Ledger Fundamentals · Lesson 4 of 37**

## What you'll learn

- The five period statuses General Ledger uses, and what each one allows
- Why more than one period can be open at the same time
- What an adjustment period is and when companies use one
- How period status interacts with subledger transactions that aren't posted yet

## Five period statuses

Every accounting period in a General Ledger calendar carries one of five statuses at any given time:

| Status | What it means |
|---|---|
| **Never Opened** | The period has not been opened yet; nothing can post to it |
| **Future Enterable** | Not open yet, but subledger transactions can be entered and distributed against it — they just can't post to General Ledger until the period actually opens |
| **Open** | Journals can be entered and posted normally |
| **Closed** | No new journals can post, but the period can still be reopened if something needs correcting |
| **Permanently Closed** | Locked for good — cannot be reopened, used once a period's audit is complete |

A period almost always moves through this sequence in order: Never Opened → Future Enterable → Open → Closed → Permanently Closed. You cannot jump straight to Open from Never Opened by editing a flag — Oracle requires you to actually run the open-period action, because opening a period for the first time also establishes it in the balances structure for that ledger.

## Why Future Enterable matters

**Future Enterable** solves a real timing problem. Subledgers like Payables and Receivables often need to start recording transactions dated in a future period — an invoice dated the 1st of next month, entered a few days early — before General Ledger has formally opened that period. Future Enterable lets those subledger transactions exist and even calculate their accounting distributions, but **posting to General Ledger itself is held back** until the period's status actually becomes Open. Nothing hits a GL balance in a Future Enterable period.

## More than one period open at once

Oracle Fusion General Ledger does not force you to close one period before opening the next. It's common, especially right around month-end, for both the current period and the next period to be **Open** simultaneously — the controller is still finishing adjustments in the period that's closing while the business has already started entering next month's transactions. Journals simply post to whichever open period matches their accounting date.

## Adjustment periods

Some calendars include an extra **adjustment period** — sometimes called a "period 13" — layered on top of the normal twelve monthly periods, dated the same as the fiscal year-end. Companies use an adjustment period to record year-end audit entries separately from regular December activity, so ordinary operating results for the last month of the year aren't mixed together with annual true-up entries.

```
Calendar: Standard Monthly + one adjustment period
Jan  Feb  Mar  ...  Nov  Dec  Adj-13
                                 ↑
                    audit/true-up entries, same fiscal year-end date as Dec
```

## Key terms

| Term | Meaning |
|---|---|
| Future Enterable | Subledger transactions can be entered and distributed, but not posted to GL yet |
| Open | Journals can be entered and posted |
| Closed | No new postings, but can be reopened |
| Permanently Closed | Locked for good, cannot be reopened |
| Adjustment period | An extra period dated at fiscal year-end, for audit/true-up entries |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why can a Payables invoice be entered and distributed in a period that General Ledger still shows as Future Enterable, yet not actually post?
