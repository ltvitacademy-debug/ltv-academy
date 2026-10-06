# Interface Table Review

You already learned SQL for Oracle Financials to investigate data sitting in Oracle Fusion's application tables. That same skill has a second use in this course: interface tables are ordinary database tables too, and querying them directly — before or after an import process runs — is often the fastest way to understand what's actually staged, independent of whatever a report or log file tells you.

## What you'll learn

- Why interface tables are worth querying directly, not just through reports
- What to look for when you query an interface table before running an import
- What to look for when you query it after an import, especially for rejected rows
- How this connects rejection-tracking tables back to the templates from Chapter 2

## Why query the interface table directly

Reports and logs summarize what a process did. A direct query of the interface table shows you the raw, current state of what's actually staged — no summarizing, no interpretation, just rows and columns. This matters most in two moments: right after loading a file, before running the real import (to sanity-check that the row count and a sample of values look right), and right after an import, to see exactly which rows are still sitting there unprocessed or flagged.

## Before the import: a sanity check

Suppose you just ran Load Interface File for Import for a batch of 25 suppliers. Before running the actual supplier import process, a quick query against the supplier interface table confirms: are there 25 rows, not 23 or 27? Do the supplier numbers look like the ones you typed, not truncated or reformatted? This is a cheap, fast check that catches a loading problem before it ever reaches validation.

```sql
SELECT supplier_num, supplier_name, status
FROM   fusion_sample.supplier_import_interface
WHERE  batch_id = 'SUPPLIERS_BATCH1';
```

*(Illustrative query against a representative interface table shape — actual table and column names vary by module and release.)*

## After the import: finding what's left behind

Once the real import process runs, some rows succeed and leave the interface table (or are marked processed); rejected rows typically remain, often alongside a related rejections table holding the specific error message for each one. Querying the interface table and its rejection table together — joining on whatever row or line identifier they share — gives you the full picture: the original data exactly as entered, plus the specific reason it didn't make it through, without waiting on, or depending entirely on, the formatted report from lesson 13.

## Why this connects back to Chapter 2

Remember that a template's columns are literal interface-table column names. That means a column you recognize from filling in a template — `SUPPLIER_TYPE`, `SUPPLIER_NUM` — is exactly the column you'll query here. The skill of reading a template and the skill of querying the table it feeds are the same skill, applied at two different moments in the same pipeline.

## Recap

Interface tables are ordinary tables you can query directly, which is often faster and more precise than waiting on a report. Query before the import as a sanity check on what loaded; query after, alongside any rejections table, to see exactly what's left and why. The columns you'll recognize are the same ones you filled in on the template. Next up, Chapter 4: loading real Financials data — journals, payables invoices, receivables transactions, fixed assets, and bank statements.
