# Script — Accounting Periods and Period Status

## Segment 1 (title)

Every journal you'll create in this course posts into a specific accounting period, and that period has a status that controls exactly what's allowed. Let's walk through the five statuses General Ledger uses.

## Segment 2 (steps)

A period starts as Never Opened — nothing can post. It can become Future Enterable, where subledger transactions can be entered and distributed, but not yet posted to GL. Then Open, where journals post normally. Then Closed, which blocks new postings but can still be reopened. And finally Permanently Closed, locked for good, usually once an audit is complete.

## Segment 3 (steps)

Future Enterable solves a real problem: Payables or Receivables often needs to record a transaction dated next period before General Ledger has opened it. Future Enterable lets that transaction exist and even calculate its accounting — it just can't post to a GL balance until the period's status actually becomes Open.

## Segment 4 (steps)

Here's something that surprises people new to Fusion: more than one period can be Open at the same time. Right around month-end, it's completely normal for the closing period and the new period to both be Open while the controller finishes adjustments and the business starts entering next month's transactions. Journals just post to whichever open period matches their accounting date.

## Segment 5 (outro)

One more structure worth knowing: some calendars add an adjustment period, dated at the fiscal year-end, used to record audit and true-up entries separately from ordinary December activity. Next up, lesson five: reviewing the chart of accounts and ledger setup this course works against.
