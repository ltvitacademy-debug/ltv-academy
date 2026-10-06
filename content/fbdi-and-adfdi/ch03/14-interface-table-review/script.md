# Script — Interface Table Review

## Segment 1 (title)

You already learned SQL for Oracle Financials to investigate data inside Oracle Fusion. That skill has a second use here: interface tables are ordinary database tables too, and querying them directly is often the fastest way to see what's actually staged.

## Segment 2 (steps)

Reports and logs summarize what a process did. A direct query shows the raw, current state — no summarizing, no interpretation. That matters most in two moments: right after loading a file, before running the real import, and right after an import, to see exactly which rows are still sitting there unprocessed or flagged.

## Segment 3 (code)

Say you just loaded 25 supplier rows. Before running the real import, a quick query against the interface table confirms: are there really 25 rows, not 23 or 27? Do the supplier numbers look right, not truncated or reformatted? A cheap, fast check that catches a loading problem before validation ever runs.

## Segment 4 (steps)

After the real import runs, successful rows leave the interface table or get marked processed; rejected rows typically remain, often alongside a rejections table holding the specific error message for each one. Querying both together, joined on a shared row identifier, gives you the full picture without waiting on a formatted report.

## Segment 5 (outro)

A template's columns are literal interface-table column names — SUPPLIER_TYPE, SUPPLIER_NUM — so the column you recognize from filling in a template is exactly the column you'll query here. Reading a template and querying the table it feeds are the same skill, used at two different moments. Up next, Chapter four: loading real Financials data — journals, payables invoices, receivables, fixed assets, and bank statements.
