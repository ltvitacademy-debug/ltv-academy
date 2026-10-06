# Lesson 2 — How Balances Are Stored and Summarized

**Chapter 1 · General Ledger Fundamentals · Lesson 2 of 37**

## What you'll learn

- Why a balance is always tied to an account, a period, a currency, and a balance type
- The difference between actual, budget, and encumbrance balances
- Period-to-date versus year-to-date balances
- What the "balances cube" is, and why it makes General Ledger reporting fast

## A balance is more than a number

A trial balance line such as "Cash: $42,000" is really shorthand for a much more specific fact. Every balance General Ledger stores is the sum of journal line amounts for one exact combination of:

- **Ledger** — which set of books
- **Account combination** — the full chart-of-accounts code combination (for example company 01, cost center 200, account 1110)
- **Accounting period** — which month (or adjustment period)
- **Currency** — the entered currency and the ledger currency
- **Balance type** — actual, budget, or encumbrance

Change any one of those and you get a different balance. That is why General Ledger can answer "what was Solara Fixtures' marketing cost center spending in March, in the budget, before any actuals posted" just as easily as it answers a plain trial balance.

## Actual, budget, and encumbrance balances

- **Actual** balances come from posted journals — real, recorded transactions.
- **Budget** balances come from budget journals or an integrated budget/EPM system, and represent planned amounts for comparison against actuals.
- **Encumbrance** balances represent committed but not-yet-spent amounts, most often purchase order commitments, and are central to **budgetary control** (covered later in this course).

All three balance types can exist for the same account combination and period at once, which is exactly what lets a budget-to-actual report compare them side by side.

## Period-to-date and year-to-date

General Ledger keeps a running **period-to-date (PTD)** balance — the net activity for just that one period — and derives **year-to-date (YTD)** balances by accumulating PTD balances from the start of the fiscal year. For balance sheet accounts (assets, liabilities, equity), the YTD balance *is* the account's real balance, carried forward period after period. For income statement accounts (revenue, expense), the YTD balance resets to zero at the start of each new fiscal year, because income and expense are measured per year, not carried forever.

```
Account 1110 (Cash), Jan: PTD +5,000   → YTD +5,000
Account 1110 (Cash), Feb: PTD +3,000   → YTD +8,000
Account 5100 (Expense), Jan: PTD +2,000 → YTD +2,000
Account 5100 (Expense), Feb: PTD +2,500 → YTD +4,500
Account 5100 (Expense), new fiscal year Jan: PTD +1,800 → YTD +1,800 (reset)
```

## The balances cube

Oracle Fusion General Ledger summarizes posted journal lines into a multidimensional structure often called the **balances cube**. Instead of re-adding thousands of journal lines every time someone opens a report, posting updates pre-summarized balances along every dimension — account, period, currency, balance type — so account inquiries, the trial balance, and dashboards return instantly instead of scanning raw journal detail. A new balances cube is created whenever a ledger is configured with a chart of accounts and calendar combination that hasn't been used together before.

## Why this matters hands-on

When you open **Account Inspector** or **Account Monitor** later in this course, you are querying this summarized balance structure, not re-scanning every journal. Understanding that balances are pre-aggregated by account, period, currency, and balance type explains why those tools can slice and drill so quickly, and why a posted journal shows up in a balance the moment posting finishes.

## Key terms

| Term | Meaning |
|---|---|
| Balance type | Actual, budget, or encumbrance — three parallel sets of balances per account/period |
| PTD | Period-to-date: net activity within a single accounting period |
| YTD | Year-to-date: PTD balances accumulated since the start of the fiscal year |
| Balances cube | The pre-summarized, multidimensional structure General Ledger reports and inquiries read from |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why does a year-to-date balance for an expense account reset at the start of a new fiscal year, while a year-to-date balance for a cash account does not?
