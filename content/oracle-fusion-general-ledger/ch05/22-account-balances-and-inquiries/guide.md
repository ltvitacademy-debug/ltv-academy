# Account Balances and Inquiries

**Chapter 5 · Balances, Inquiries and Monitoring · Lesson 22 of 37**

## What you'll learn

- Where General Ledger stores balances, as opposed to individual journal lines
- How to use the Inquire on Detail Balances page to check an account without running a report
- The difference between period-to-date, quarter-to-date, and year-to-date balances
- How an inquiry becomes the starting point for a drill-down investigation

## Balances live separately from journal lines

Every posted journal line in Oracle Fusion General Ledger updates a **summarized balance** for its account, in addition to being stored as detail. That balance is what you see first when you check "how much is in this account" — you are not scanning every journal line, you are reading a number that posting already rolled up for you, for every combination of chart of accounts segment values, every period, and every balance type (actual, budget, encumbrance).

This matters because the General Ledger you built in earlier chapters — ledgers, chart of accounts, journals — exists for exactly this purpose: producing a trustworthy number you can look up in seconds, not a pile of transactions you have to re-total by hand.

## Inquire on Detail Balances

The **Inquire on Detail Balances** page is where that lookup happens. Enter a ledger, a period, and an account combination (you can use a partial combination with a parent value, for example "all cost centers under Division 100"), and the page returns the balance for that combination — plus the ability to drill further.

A typical inquiry for **LTV Manufacturing Corporation** might be: "What is the balance of account 01-000-7410-000-000 (Utilities Expense, Corporate) for period Mar-2026?" The page returns the actual balance, and lets you pivot the view across:

- **Period-to-date (PTD)** — activity recorded in that one period only
- **Quarter-to-date (QTD)** — the running total since the quarter began
- **Year-to-date (YTD)** — the running total since the fiscal year began
- **Project-to-date / same period last year** — for comparison, where configured

## Why the time-frame matters

Confusing PTD with YTD is one of the most common new-user mistakes. A balance sheet account like Cash is always read as a YTD (really, life-to-date) balance — the running total since the account existed, because cash doesn't reset each period. An income statement account like Utilities Expense is normally read PTD when you want "what did March cost us," and YTD when you want "what has this cost us so far this fiscal year." The same account, the same period, can show two very different numbers depending on which time frame you select — and reading the wrong one is how a reviewer ends up chasing a discrepancy that was never really there.

## From balance to investigation

An inquiry rarely ends with just a number. If a balance looks wrong — a cost center shows an expense nobody expected, or a balance sheet account moved more than it should have — the next step is to drill from that summarized balance down into the journal lines that make it up, and from there, in some cases, into the subledger transaction that originated it. Lesson 27 covers that full drill path in detail; this lesson is about getting comfortable with the balance lookup that starts it.

## Key terms

| Term | Meaning |
|---|---|
| Summarized balance | A running total maintained automatically for an account combination as journals post |
| PTD | Period-to-date: activity within the single selected period only |
| QTD | Quarter-to-date: running total since the quarter began |
| YTD | Year-to-date: running total since the fiscal year began |
| Inquire on Detail Balances | The GL page used to look up a balance without running a formal report |

## Recap

General Ledger maintains a summarized balance for every account combination as journals post, so you can look up "how much is in this account" without re-totaling transactions by hand. The Inquire on Detail Balances page is where you perform that lookup, and choosing the right time frame — PTD, QTD, or YTD — is essential to reading the number correctly. Next up, lesson 23: Account Monitor, which takes this same balance data and turns it into a live, self-updating watchlist.
