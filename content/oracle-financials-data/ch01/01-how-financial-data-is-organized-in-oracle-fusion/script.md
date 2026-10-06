# Script — How Financial Data Is Organized in Oracle Fusion

## Segment 1 (title)

Welcome to Oracle Financials Data, the course right after Oracle Financial Reporting in the Reporting and Data stage. That course was about the reporting tools. This course is about the tables underneath them. We start with the big picture: how is financial data actually organized inside Oracle Fusion?

## Segment 2 (steps)

Everything you do ends up as rows in a database, organized by subledger. Payables owns supplier invoices and payments. Receivables owns customer transactions and receipts. Fixed Assets owns depreciation. Cash Management owns bank reconciliation. Each one has its own tables, and almost every table name is prefixed with that module's code, so once you learn the prefixes, you can often guess which module owns a table just by reading its name.

## Segment 3 (steps)

None of those subledgers report results on their own. Every one of them has to turn its transactions into a balanced journal entry and hand it to the General Ledger. The bridge that does that conversion is a shared engine called Subledger Accounting, and its tables all carry the prefix X-L-A. Every subledger routes through that same engine, which is why we'll come back to it in detail later in the course.

## Segment 4 (code)

One more piece doesn't belong to any single subledger: identity. A supplier and a customer are both, underneath, just a party. Oracle Fusion stores that shared identity in an architecture called Trading Community Architecture, with tables prefixed H-Z. A company that's both your customer and your supplier gets stored once as a party, then layered with each role on top.

## Segment 5 (outro)

Keep one shape in your head for this whole course: a subledger transaction becomes a subledger accounting event, which becomes a general ledger journal entry. Chapters two and three live in the subledgers, chapter four lives in subledger accounting and the ledger, and chapter five is about using the whole map in practice. Up next, lesson two: business units, ledgers, and data access.
