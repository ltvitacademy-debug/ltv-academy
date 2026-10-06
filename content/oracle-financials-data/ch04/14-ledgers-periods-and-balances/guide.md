# Ledgers, Periods and Balances

Lesson 2 introduced the ledger conceptually — the "four Cs" and how it relates to a business unit. Now that you've seen journal entries up close in lesson 13, it's time to look at the three tables that give those journal entries meaning over time: the ledger definition itself, the periods it's divided into, and the pre-summarized balances that most reporting actually relies on.

## What you'll learn

- What `GL_LEDGERS` stores, and how secondary ledgers point back to a primary
- What `GL_PERIODS` controls, and why period status matters operationally
- Why `GL_BALANCES` exists, and why reports don't usually re-sum every journal line
- The shared key, `PERIOD_NAME`, that ties journals to periods to balances

## GL_LEDGERS: the ledger definition

`GL_LEDGERS` is where a ledger's defining attributes actually live — its chart of accounts, calendar, currency, and accounting convention, the four Cs from lesson 2. A secondary ledger's row carries a `PRIMARY_LEDGER_ID` column pointing back to the primary ledger it's associated with, which is how Oracle Fusion keeps a company's alternate-method or alternate-currency books tied to its main set of books without merging them into one row.

## GL_PERIODS: the calendar, with status

`GL_PERIODS` defines the actual period names and date ranges for a given calendar — "Jan-25," for example, with its start and end dates. Each period also carries a status: **Open** (new journals can post), **Closed** (normal activity has stopped, but the period could still be reopened if genuinely necessary), **Permanently Closed** (no further activity, full stop — this one cannot be undone), or **Future Enterable** (not yet open for normal posting, but journals can be entered in advance). Period status isn't just a reporting detail; it's an operational gate. If you're asked to correct an entry and the period is permanently closed, the answer is "post the correction to a different, open period" — not "edit the closed one."

## GL_BALANCES: why reports don't re-sum everything

Technically, a report could calculate an account's balance by summing every `GL_JE_LINES` row that ever hit that account combination. In practice, that would be slow at real scale, so Oracle Fusion maintains `GL_BALANCES`, a table of pre-summarized actual, budget, and encumbrance balances by code combination, period, and currency. Most financial reports — balance sheets, trial balances, the OTBI subject areas you used in the Oracle Financial Reporting course — query `GL_BALANCES` directly rather than re-aggregating every journal line on demand.

## PERIOD_NAME: the thread that ties it together

`PERIOD_NAME` is the shared key that connects this whole lesson: it appears on `GL_JE_HEADERS` and `GL_JE_LINES` (which period a journal posts into), on `GL_PERIODS` (defining what that period actually means in calendar terms and what its status is), and on `GL_BALANCES` (which period a stored balance represents). Trace that one column across all three tables, and you have the full relationship between a transaction, its calendar context, and the summarized number a report eventually shows.

## Recap

`GL_LEDGERS` stores ledger definitions, with secondary ledgers linking back to a primary. `GL_PERIODS` defines period date ranges and, critically, period status, which gates whether new activity can post. `GL_BALANCES` holds pre-summarized balances so reports don't have to re-aggregate every journal line. `PERIOD_NAME` is the shared key tying journals, periods, and balances together. Next up, lesson 15: following one real accounting transaction all the way across every table you've learned so far.
