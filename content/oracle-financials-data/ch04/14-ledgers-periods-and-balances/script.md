# Script — Ledgers, Periods and Balances

## Segment 1 (title)

Lesson two introduced the ledger conceptually — the four C's and how it relates to a business unit. Now that you've seen journal entries up close, it's time to look at the three tables that give those entries meaning over time: the ledger definition, its periods, and the balances most reporting actually relies on.

## Segment 2 (steps)

GL_LEDGERS is where a ledger's defining attributes live: chart of accounts, calendar, currency, convention. A secondary ledger's row points back to its primary ledger through a primary-ledger-I-D column, keeping alternate books tied to the main books without merging them into one row.

## Segment 3 (steps)

GL_PERIODS defines the actual period names and date ranges for a calendar. Each period carries a status: open, closed, permanently closed, or future enterable. Period status isn't just a reporting detail — it's an operational gate. If a period is permanently closed, the answer is post the correction to a different, open period, not edit the closed one.

## Segment 4 (code)

Technically, a report could sum every journal line that ever hit an account. In practice that's slow at scale, so Oracle Fusion maintains GL_BALANCES — pre-summarized actual, budget, and encumbrance balances by account, period, and currency. Most financial reports query this table directly instead of re-aggregating every line on demand.

## Segment 5 (outro)

PERIOD_NAME is the thread tying this whole lesson together: it's on the journal headers and lines, on periods itself, and on balances. Trace that one column across all three tables and you have the full relationship between a transaction, its calendar context, and the number a report eventually shows. Up next, lesson fifteen: following one real transaction across every table so far.
