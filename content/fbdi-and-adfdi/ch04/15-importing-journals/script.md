# Script — Importing Journals

## Segment 1 (title)

Chapter four applies everything from the first three chapters to five specific Financials modules, starting with General Ledger. Journal Import is one of the most frequently run FBDI loads in a live environment — any company bringing in entries from payroll, a point-of-sale system, or an outside sub-ledger needs this.

## Segment 2 (steps)

Journal Import uses a template mapping to GL_INTERFACE, the General Ledger's staging table. Each row is one journal line: an account combination, a debit or credit amount, a currency, an effective date, plus the journal category and source that classify the entry.

## Segment 3 (steps)

You already learned that every transaction must balance — debits equal credits. General Ledger enforces this without exception, across the whole batch, not just one row. A batch where every account combination is valid and every field is perfect can still be rejected as a group if debits and credits don't net to zero.

## Segment 4 (steps)

Once rows are staged in GL_INTERFACE, Import Journals is submitted — it spawns a child program, Import Journals Child, to do the real work. It validates each account combination against the chart of accounts, confirms the batch balances, and creates real, postable journal entries for everything that passes.

## Segment 5 (outro)

Two common rejection causes: an account combination that was never set up or was disabled, and a batch that doesn't balance because of a simple typo — a debit of 100 where 1,000 was intended. Up next, lesson sixteen: importing Payables invoices, where the tables and rules differ but the pipeline is identical.
