# Financial Statements: Income Statement and Balance Sheet

Chapter 6 shifts from tools to content: the specific reports a working Oracle Fusion Financials consultant is expected to produce, read, and troubleshoot every month, starting with the two most fundamental financial statements. You built the mechanics of a formatted statement back in lessons 8 and 9; this lesson applies those mechanics to the real thing.

## What you'll learn

- The Income Statement: structure and what it tells a reader
- The Balance Sheet: structure and what it tells a reader
- How the two statements connect through Net Income
- Common review points when these statements come out of Financial Reporting Studio

## The Income Statement: performance over a period

The Income Statement (sometimes called the Profit and Loss statement, or P&L) reports performance over a period of time — a month, a quarter, a year — answering "did this business make money during this period?" Its basic shape, as rows in a Financial Reporting Studio report:

- **Revenue** — amounts earned from the business's core activity, typically built from a hierarchy rollup of revenue accounts.
- **Cost of Goods Sold / Cost of Revenue** — the direct cost of producing what was sold.
- **Gross Margin** — a formula row, Revenue minus Cost of Goods Sold.
- **Operating Expenses** — salaries, rent, marketing, and other costs of running the business that aren't tied directly to producing the product.
- **Net Income** — the final formula row, essentially Gross Margin minus Operating Expenses (and any other items like interest or taxes, depending on the statement's level of detail).

Columns typically compare periods (this month vs. last month, this month vs. budget) exactly as you built in lesson 9's worked example, just with far more rows.

## The Balance Sheet: position at a point in time

The Balance Sheet reports financial position as of a single point in time — not "what happened this month" but "where do things stand right now." Its structure follows the accounting equation from your Accounting Fundamentals course: Assets = Liabilities + Equity.

- **Assets** — what the business owns or controls: cash, receivables, inventory, fixed assets.
- **Liabilities** — what the business owes: payables, loans, accrued expenses.
- **Equity** — the owners' residual claim, including retained earnings accumulated from past periods' Net Income.

Because the Balance Sheet is a point-in-time snapshot rather than a period total, its point of view typically specifies a single period's ending balance rather than a range.

## How the two statements connect

Net Income from the Income Statement doesn't just disappear once calculated — it flows into **Retained Earnings** on the Balance Sheet's Equity section, period after period. This is why the two statements, despite looking structurally very different, are never really independent of each other: a Balance Sheet that doesn't tie correctly to the accumulated Net Income reported across prior Income Statements is a sign something in the close process needs investigation, not two unrelated reports that happen to disagree.

## Common review points

When reviewing these statements fresh out of Financial Reporting Studio, experienced consultants routinely check: does the point of view match the intended ledger and period (lesson 6); does the Balance Sheet actually balance (Assets = Liabilities + Equity, exactly, to the cent); and does this period's ending retained earnings reconcile to last period's ending balance plus this period's Net Income. These are fast checks that catch most real-world close problems before a statement goes out the door.

## Recap

The Income Statement reports performance over a period (Revenue through Net Income); the Balance Sheet reports position at a point in time (Assets, Liabilities, Equity); and the two connect through Net Income flowing into Retained Earnings. Next up, lesson 25: Trial Balance and Account Analysis reports, the detail-level reports that support these two statements.
