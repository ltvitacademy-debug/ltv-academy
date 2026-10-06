# Script — Importing Journals with FBDI Preview

## Segment 1 (title)

Typing journals in one at a time doesn't scale to a payroll allocation across fifty cost centers, or a batch of adjustments during a system migration. This lesson previews File-Based Data Import — FBDI — General Ledger's bulk-loading path.

## Segment 2 (steps)

The flow has five steps. Download Oracle's versioned spreadsheet template. Populate one row per journal line — ledger, date, currency, each chart of accounts segment, debit or credit. Generate a CSV and zip using the template's built-in macro. Upload that zip to WebCenter Content under the general ledger import account. Then run the Import Journals process, which loads it into a staging table and creates journal batches.

## Segment 3 (code)

Picture the whole chain at once: template becomes populated rows, becomes a CSV and zip, gets uploaded to UCM, triggers the Import Journals process, and comes out the other side as journal batches — sourced as Spreadsheet, not Manual — still waiting on the same validation, approval, and posting steps as anything else.

## Segment 4 (steps)

Each row needs the same information a manual journal line needs: ledger ID, accounting date, currency code, every chart-of-accounts segment, and an entered debit or credit. The source on journals created this way is typically Spreadsheet, so Manage Journals can tell them apart from hand-typed entries even though a person prepared the file.

## Segment 5 (outro)

Rows that don't match a valid ledger, account, or currency don't just vanish — they get rejected with a specific reason. That's exactly what next lesson covers: reading and fixing journal import errors.
