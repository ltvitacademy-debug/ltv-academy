# Script — Journal Headers, Batches and Lines

## Segment 1 (title)

Chapter three ended at the edge of the General Ledger — invoices and transactions eventually produce journal entries, but we hadn't looked at how GL itself stores them. This lesson opens chapter four by doing exactly that.

## Segment 2 (steps)

GL_JE_BATCHES represents a named group of one or more journal entries entered or imported together, with its own status independent of the journals inside it. GL_JE_HEADERS stores one row per journal entry: a name, a source, a category, a period, a currency, a status. Every header belongs to exactly one batch.

## Segment 3 (code)

GL_JE_LINES stores the actual debit and credit lines. Each line carries a code combination I-D pointing to a specific chart-of-accounts combination, plus amounts in two forms: entered currency and accounted currency. For a foreign-currency transaction those two can differ; for a transaction already in the ledger's own currency, they match.

## Segment 4 (steps)

Here's the most useful column in this whole chapter: JE_SOURCE on the header. Values like Payables or Receivables mean the journal was generated automatically by a subledger. A value like Manual or Spreadsheet means a person typed it directly into GL. That one column is often the fastest way to tell whether a journal came from a real transaction or was typed in by hand.

## Segment 5 (outro)

So the hierarchy is: one batch, holding one or more headers, each owning its own debit and credit lines. Up next, lesson fourteen: ledgers, periods, and balances — the structures that give these journal entries meaning over time.
