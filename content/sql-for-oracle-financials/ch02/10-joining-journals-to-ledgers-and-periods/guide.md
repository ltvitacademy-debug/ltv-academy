# Lesson 10 — Joining Journals to Ledgers and Periods

**Chapter 2 · Joining Financial Tables · Lesson 5 of 5**

## What you'll learn

- `GL_JE_HEADERS`, `GL_JE_LINES` and `GL_CODE_COMBINATIONS` — how a journal is actually stored
- Why a journal header and its lines are two different tables
- Joining in `GL_PERIODS` to filter by accounting period, not just a date range
- Closing out Chapter 2 by connecting all three subledgers conceptually

## A journal is a header plus many lines

A journal entry — the fundamental unit of the General Ledger — is split
across two tables, the same header/detail pattern you'll recognize from
`AP_INVOICES_ALL`/`AP_INVOICE_DISTRIBUTIONS_ALL`:

| Table | Role | Key columns |
|---|---|---|
| `GL_JE_HEADERS` | One row per journal entry | `JE_HEADER_ID`, `LEDGER_ID`, `PERIOD_NAME`, `NAME`, `STATUS` |
| `GL_JE_LINES` | One row per debit or credit line | `JE_HEADER_ID`, `JE_LINE_NUM`, `CODE_COMBINATION_ID`, `ENTERED_DR`, `ENTERED_CR` |
| `GL_CODE_COMBINATIONS` | The actual chart-of-accounts combination each line hits | `CODE_COMBINATION_ID`, `SEGMENT1`, `SEGMENT2`, `SEGMENT3` |

A header never carries a dollar amount by itself — it's the **lines**,
each pointing at one account combination, with either a debit
(`ENTERED_DR`) or a credit (`ENTERED_CR`), that carry the actual money.

## Joining header to lines to the account

```sql
SELECT h.name, l.je_line_num, l.entered_dr, l.entered_cr,
       cc.segment1, cc.segment2, cc.segment3
FROM gl_je_headers h
INNER JOIN gl_je_lines l
    ON l.je_header_id = h.je_header_id
INNER JOIN gl_code_combinations cc
    ON cc.code_combination_id = l.code_combination_id;
```

Same chaining pattern as every join so far this chapter: header to lines
on `JE_HEADER_ID`, lines to the account combination on
`CODE_COMBINATION_ID`. `SEGMENT1`/`SEGMENT2`/`SEGMENT3` are a simplified
stand-in for a real chart of accounts, which can have anywhere from a
handful to a dozen+ segments (company, department, account, and so on)
depending on how the client configured it.

## Filtering by accounting period with GL_PERIODS

Financials rarely filters a journal by a plain calendar date range — it
filters by **accounting period**, which doesn't always line up perfectly
with calendar months (a 13-period fiscal calendar, for instance). That's
what `GL_PERIODS` is for:

```sql
SELECT h.name, p.period_name, p.start_date, p.end_date
FROM gl_je_headers h
INNER JOIN gl_periods p
    ON p.period_name = h.period_name
WHERE p.period_name = 'JUN-26';
```

Joining to `GL_PERIODS` (rather than just filtering a date column directly)
is also how you'd pull in `CLOSING_STATUS`, to check whether a period is
still open at all — a question that matters constantly in month-end close
work.

## Chapter 2, tied together

You now have the full map behind the unpaid-invoices challenge and every
other investigation in this course: Payables (supplier, invoice,
distributions, payments, schedule), Receivables (customer, transaction,
applications, receipt), and now General Ledger (journal header, lines,
code combinations, periods). Chapter 3 starts putting numbers **together**
across these tables with aggregation.

## Key terms

| Term | Meaning |
|---|---|
| `GL_JE_HEADERS` | One row per journal entry |
| `GL_JE_LINES` | One row per debit/credit line within a journal |
| `GL_CODE_COMBINATIONS` | The chart-of-accounts combination a line hits |
| `GL_PERIODS` | Accounting periods, with start/end dates and closing status |

## Lab

Write a query joining `gl_je_headers` to `gl_periods` that returns `name`
and `period_name` for every journal in a period where
`closing_status = 'O'` (open).

## Check yourself

You're ready for Chapter 3 when you can answer, without looking: why
doesn't a journal header carry a dollar amount by itself, and why does
Financials usually filter by accounting period through `GL_PERIODS` rather
than a plain calendar date range?
