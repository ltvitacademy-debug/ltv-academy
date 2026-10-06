# Year-End Close and Opening Balances

**Chapter 7 · Period Close · Lesson 36 of 37**

## What you'll learn

- What makes closing the last period of a fiscal year different from a normal month
- How retained earnings gets calculated and why it only happens at this moment
- What carries forward to the new year, and what resets
- Why opening balances aren't something a user manually keys in

## The twelfth close is not just another close

Everything in lessons 33–35 applies every month: review, reconcile, post, close. **Year-end close** is the same mechanical process applied to the fiscal year's final period, but it triggers one additional calculation that doesn't happen any other month: closing income statement accounts into retained earnings.

## Why income statement accounts reset and balance sheet accounts don't

Recall from Chapter 1 and this chapter's earlier lessons: balance sheet accounts (Cash, Accounts Payable, Equity) carry a running balance forever — their year-end balance *is* their beginning balance for the new year. Income statement accounts (Revenue, Expense) are different by design: they measure performance *for a period*, and a fiscal year is itself the largest period they measure. At year-end, every income statement account's balance for the year needs to be swept into a single balance sheet equity account — **Retained Earnings** — so the new year's income statement accounts can start again from zero, measuring the new year's performance cleanly, without last year's activity mixed in.

## When this actually happens

Retained earnings is calculated automatically when the **first period of the new fiscal year is opened** — not as a separate manual step someone runs on December 31. For **LTV Manufacturing Corporation**, whose fiscal year matches the calendar year, opening January 2027 is the trigger: Oracle Fusion sweeps the net result of every income statement account's 2026 activity into the designated Retained Earnings account, and January 2027 opens with every income statement account starting at zero.

```
Dec-2026 (last period of FY2026):
  Net income for the year:                 $412,000

Opening Jan-2027:
  Retained Earnings increases by:          $412,000
  Every revenue/expense account resets to:       $0
```

## Opening balances aren't manually keyed in

This is the point worth holding onto: nobody types "beginning balance $412,000" into Retained Earnings, and nobody manually zeroes out every expense account. The calculation and the sweep both happen as a consequence of the ledger's own structure (which accounts are balance sheet vs. income statement, which account is designated as Retained Earnings) and the simple act of opening the next year's first period. This is exactly why getting the chart of accounts setup from the Enterprise Structures course right matters — the retained earnings account designation is configured once, and this process depends on it being correct every year after.

## What this means for review timing

Because retained earnings calculates the moment the new year opens, any adjustment discovered in the old year *after* the new year has already opened a period requires reopening that old year's period, correcting it, and the retained earnings figure recalculates again to reflect the correction — one more reason the discipline from lessons 33–35 matters most in exactly this period.

## Key terms

| Term | Meaning |
|---|---|
| Year-end close | The normal close process applied to a fiscal year's final period |
| Retained Earnings | The equity account that absorbs each year's net income statement result |
| Opening balance | A new year's balance sheet starting point, carried automatically from the prior year |

## Recap

Year-end close is the same process as every other month's close, plus one automatic calculation triggered by opening the new year's first period: sweeping net income into Retained Earnings and resetting every income statement account to zero. Next up, lesson 37, the final lesson of this course: General Ledger Troubleshooting Practice.
