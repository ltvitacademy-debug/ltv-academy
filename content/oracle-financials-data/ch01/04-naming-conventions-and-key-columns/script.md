# Script — Naming Conventions and Key Columns

## Segment 1 (title)

By the end of this chapter, you should be able to open a table you've never seen before and have a reasonable guess what it stores, before reading a word of documentation. That's pattern recognition, and Oracle Fusion's naming is consistent across the whole Financials product line. This lesson collects those patterns.

## Segment 2 (steps)

Every table name starts with a code identifying its module. A-P for Payables, A-R for Receivables, G-L for General Ledger, X-L-A for Subledger Accounting, H-Z for the shared party identity layer. Once the prefix is second nature, a name like AP_INVOICE_PAYMENTS_ALL reads almost like a sentence: Payables, invoice payments, multi-org.

## Segment 3 (code)

Many names end in underscore-ALL. That suffix means the table stores rows across every business unit at once, not just one. If you write a query against an ALL table and forget to filter by business unit, you can combine rows from completely unrelated parts of the business into one result. Every ALL table deserves a second look at how it should be scoped.

## Segment 4 (steps)

Primary keys almost always end in underscore-I-D. And when one table references another, the foreign key usually repeats the parent's primary key name exactly. Find a column name you recognize as someone else's primary key, and you've found the join — that's how you trace relationships across tables you've never worked with before.

## Segment 5 (outro)

Nearly every table also carries the same audit columns — created by, creation date, last updated by — for traceability. And you'll see generic flexfield columns like ATTRIBUTE1 or SEGMENT1, whose meaning is configured per implementation, not fixed by the column name. With these patterns, plus the map from this whole chapter, you're ready for chapter two: suppliers and customers.
