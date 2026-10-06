# Building a Data Map of Your Practice Instance

You now know a genuinely large slice of the Oracle Fusion Financials data model — identity, suppliers, customers, invoices, payments, journals, ledgers, and the Subledger Accounting engine connecting them. This lesson is about turning that knowledge into something durable: a personal, working map of your own practice instance that you build and refine as you go, instead of relying on memory alone.

## What you'll learn

- Why starting from a business question beats starting from a table list
- A repeatable process for mapping one module at a time
- What to actually record for each table you investigate
- How OTBI subject areas can double-check a map you've built by hand

## Start from a question, not a table list

It's tempting to try to memorize "all the AP tables" or "all the AR tables" as an abstract exercise. It rarely sticks. A more durable approach starts from a real business question — "which suppliers have invoices open longer than 30 days" is a good example, because it forces you to identify a driving table (`AP_INVOICES_ALL` or `AP_PAYMENT_SCHEDULES_ALL`, depending on exactly how "open" is defined), then trace outward only as far as the question actually requires. You end up learning tables in the order you'll actually need them, attached to a reason you'll remember.

## A repeatable process, one module at a time

1. **Pick one module** — don't try to map Payables and Receivables and GL simultaneously. Start with whichever one you'll use first.
2. **Identify the 4-6 core tables** for that module's main transaction, using the documentation skill from lesson 3 — header, lines, and whatever money-matching or distribution table applies.
3. **Trace the primary and foreign keys** between them, confirming each relationship by reading the documented column descriptions, not by guessing from column names.
4. **Note the key columns that matter for your question** — status/flag columns, amount columns, date columns — and what they actually represent, not just what they're named.
5. **Write it down somewhere you'll actually look again** — a simple diagram or even a short table-by-table glossary works; the format matters far less than the habit of recording it instead of trusting memory.

## What to actually record

For each table you investigate, a durable note is short: the table name, its primary key, one line on what a row represents, and the one or two foreign keys that matter for the question you started with. Resist the urge to copy every column from the documentation — that's what the documentation itself is for. Your personal map should be the "why" and "how these connect" layer on top of Oracle's own reference, not a duplicate of it.

## Cross-check with OTBI subject areas

If you've worked through the Oracle Financial Reporting course, you already have access to OTBI subject areas, which are themselves built on views over these same base tables. A subject area's available fields and folders are a useful sanity check on a map you've built by hand: if OTBI groups certain fields together under one folder, that's often a hint about how the underlying tables relate, even without reading a single line of the view's definition.

## Recap

Start from a real business question, not an abstract table list. Map one module at a time: core tables, keys, and the specific columns your question needs, recorded briefly and revisited rather than memorized. Use OTBI subject areas as a sanity check on relationships you've traced by hand. Next up, the final lesson of this course: data quality and the common problems you'll actually run into when analyzing Oracle Fusion financial data in the real world.
