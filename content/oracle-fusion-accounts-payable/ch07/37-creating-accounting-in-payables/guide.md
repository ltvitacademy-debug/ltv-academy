# Lesson 37 — Creating Accounting in Payables

**Chapter 7 · Accounting, Reconciliation and Close · Lesson 37 of 42**

## What you'll learn

- What the Create Accounting process actually does
- The difference between Draft and Final accounting modes
- How the accounting date is determined
- What happens when Create Accounting encounters an error

## Create Accounting: turning rules into journals

Lesson 36 covered the accounting *rules*. **Create Accounting** is the actual process that runs those rules against outstanding, unaccounted transactions — invoices, payments, prepayment applications — and generates the journal entries SLA is responsible for. It can be run on demand, or scheduled to run regularly (daily, for instance), and it's typically run at the business-unit or ledger level, covering every unaccounted transaction since the last run.

## Draft vs. Final

Create Accounting runs in one of two modes:

| Mode | Behavior |
|---|---|
| **Draft** | Generates accounting entries for review, but doesn't post anything permanently — useful for previewing what a transaction will look like once accounted, or for catching setup errors before they become real journals |
| **Final** | Generates permanent accounting entries. Once final, those entries exist and (depending on the **Transfer to General Ledger** option selected at the same time) can move on to becoming GL journals |

Running in Draft mode repeatedly, correcting whatever surfaces, and only running Final once things look right is a common and sensible pattern — especially the first time a new supplier, expense category, or business unit combination is accounted.

## How the accounting date is decided

The accounting date assigned to each entry isn't arbitrary — it's controlled by the **Payables accounting options**, typically set to use one of:

- The **invoice date**
- The **system date** (the date Create Accounting actually runs)
- The **goods received date**, in some configurations

This matters directly for period close (Lesson 41): an invoice dated in a period that's already closed can't accidentally land there if the accounting date rule points elsewhere, and conversely, getting this setting wrong is a common source of entries landing in the wrong period.

## Illustrative example

**Harbor Point Logistics** (fictional, reused from Lesson 24) has 30 validated, unaccounted invoices and 12 payments from the past week. Running **Create Accounting in Draft mode** for the business unit shows all 42 transactions would account cleanly — except one invoice, which errors out because its expense account combination doesn't exist in the chart of accounts. That invoice is corrected, and **Create Accounting in Final mode** is then run for all 42, successfully generating 42 complete journal entries.

## What happens when something errors

A transaction that fails to account doesn't block the others — it's simply skipped, reported in the process's error output, and remains unaccounted until whatever caused the error (an invalid account combination, a missing exchange rate, etc.) is fixed and the process is run again.

## Key terms

| Term | Meaning |
|---|---|
| Create Accounting | The process that applies accounting rules to transactions and generates journal entries |
| Draft mode | Previews accounting without posting it permanently |
| Final mode | Generates permanent accounting entries |

## Check yourself

You're ready for Lesson 38 when you can answer, without looking: what's the practical reason to run Create Accounting in Draft mode before running it in Final?
