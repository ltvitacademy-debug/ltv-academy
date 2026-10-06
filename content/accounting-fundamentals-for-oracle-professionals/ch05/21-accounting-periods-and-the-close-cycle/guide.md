# Accounting Periods and the Close Cycle

Everything you've learned about adjusting entries, matching, and accrual accounting only works if there's a defined boundary for "this period" versus "the next period." This lesson covers how those boundaries are set, and previews the close process this course will finish with in lesson 29.

## What you'll learn

- What a fiscal year and a fiscal calendar are
- Why not every business's fiscal year matches the calendar year
- What "closing a period" actually means, operationally
- The three period states you'll encounter directly inside Oracle Fusion

## Fiscal years and fiscal calendars

A **fiscal year** is a business's defined 12-month accounting period, broken into smaller reporting periods (usually months, sometimes 4-week "periods" or quarters). Many businesses use a **calendar fiscal year** (January through December), but plenty don't — a retailer might run its fiscal year February through January so its fiscal year-end falls *after* the holiday shopping season, giving a cleaner view of the full season's results instead of splitting it across two fiscal years.

A **fiscal calendar** defines exactly which dates belong to which period — period 1, period 2, and so on — and this calendar is set up once and used by the accounting system for every date-based calculation going forward (which period does this transaction belong to, which period is currently "open," and so on).

## What "closing a period" means

**Closing a period** means locking it so no further transactions can be posted into it, after the period's accounting work is complete: all transactions recorded, all adjusting entries made, financial statements prepared and reviewed. Closing exists to protect the integrity of a period once it's been reported on — without it, someone could post a transaction into "last March" six months from now, silently changing a financial statement that's already been shared with lenders, investors, or regulators.

## Three period states

Most accounting systems, including Oracle Fusion General Ledger, track each period with a status:

- **Open**: transactions can be freely posted.
- **Closed**: no new transactions can post, but the period can potentially be reopened if a correction is genuinely needed.
- **Permanently closed**: locked for good — typically applied once a period is old enough that it will never need adjustment again (for example, after an audit is finalized).

A typical month proceeds through these states in order: open during the month and for a short period afterward to finish adjusting entries, then closed once financial statements are finalized, and eventually permanently closed once there's no realistic chance of needing to touch it again.

## Why this matters for an Oracle Fusion consultant

Oracle Fusion General Ledger lets you open and close periods per ledger, and a huge category of real-world support tickets boils down to "why can't I post this transaction" — which often traces straight back to the period it belongs to being closed. Understanding fiscal calendars and period statuses as *concepts* first means you'll immediately recognize what's happening when you see these exact settings inside the actual software later in this path.

## Recap

A fiscal year is divided into periods by a fiscal calendar, which doesn't have to match the calendar year. Closing a period locks it against further postings once its accounting work is done, and periods move through open, closed, and permanently closed states. Next up, lesson 22: accruals, deferrals, and prepaid expenses, a closer look at the adjusting entries that typically happen right before a period closes.
