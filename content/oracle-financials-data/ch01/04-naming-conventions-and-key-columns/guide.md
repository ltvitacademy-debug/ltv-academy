# Naming Conventions and Key Columns

By the end of Chapter 1, you should be able to open a table you've never seen before and have a reasonable guess about what it stores, before you've read a single word of its documentation. That's not magic — it's pattern recognition, and Oracle Fusion's table and column names follow the same patterns consistently across the entire Financials product line. This lesson collects those patterns into one place.

## What you'll learn

- What a table's prefix tells you, and the prefixes you'll see most often in this course
- What the `_ALL` suffix means, and why it matters for every query you'll ever write against these tables
- The standard shape of primary keys and foreign keys
- The audit columns that appear on almost every table, and what they're for

## Prefixes identify the owning module

Every table name starts with a short code identifying which product owns it:

- `AP_` — Payables
- `AR_` — Receivables
- `GL_` — General Ledger
- `XLA_` — Subledger Accounting
- `HZ_` — Trading Community Architecture (shared party/customer/supplier identity)
- `POZ_` — Procurement's supplier-specific tables
- `FA_` — Fixed Assets
- `CE_` — Cash Management

You'll meet most of these prefixes by name across the rest of this course. Once the prefix is second nature, a table name like `AP_INVOICE_PAYMENTS_ALL` reads almost like a sentence: Payables, invoice payments, multi-org.

## The `_ALL` suffix: read this carefully

Many table names end in `_ALL` — `AP_INVOICES_ALL`, `RA_CUSTOMER_TRX_ALL`, `POZ_SUPPLIER_SITES_ALL_M`. This suffix is a holdover from Oracle's multi-org architecture, and it means the table stores rows across **every** business unit or operating context at once, not just one. Practically, this means: if you write a query against an `_ALL` table and forget to filter or join by business unit, you can easily combine rows from completely unrelated parts of the business into one result — a classic, embarrassing mistake. Every `_ALL` table deserves a second look at how it should be scoped before you trust a total you've calculated from it.

## Primary and foreign keys follow a shape

Primary keys almost always end in `_ID`: `INVOICE_ID`, `CUSTOMER_TRX_ID`, `JE_HEADER_ID`, `PARTY_ID`. When one table references another, the foreign key column usually repeats the parent table's primary key name exactly. `AP_INVOICE_LINES_ALL` has an `INVOICE_ID` column because it's a child of `AP_INVOICES_ALL`, whose primary key is also `INVOICE_ID`. This consistency is what lets you trace relationships across tables you've never worked with before: find a column name you recognize as someone else's primary key, and you've found the join.

## Audit columns are everywhere

Nearly every table carries the same small set of audit columns, regardless of module: `CREATED_BY`, `CREATION_DATE`, `LAST_UPDATED_BY`, `LAST_UPDATE_DATE`, and `LAST_UPDATE_LOGIN`. These exist for traceability — who touched this row, and when. A related column, `OBJECT_VERSION_NUMBER`, is used internally for optimistic locking (making sure two people don't silently overwrite each other's changes), not for business reporting, so you can generally ignore it unless you're troubleshooting a save conflict.

## Flexfield segment columns

Finally, you'll encounter columns like `ATTRIBUTE1` through `ATTRIBUTE15`, or `SEGMENT1` through `SEGMENTn` on tables like `GL_CODE_COMBINATIONS`. These are **flexfield** columns — generic, configurable slots that each customer's implementation maps to a specific meaning (company, cost center, natural account, and so on, for a chart-of-accounts segment). The column name alone never tells you what it means; that mapping is configured per implementation, which is one more reason the documentation habit from lesson 3 matters more than memorizing a fixed list.

## Recap

A table's prefix identifies its owning module; `_ALL` means the table spans every business unit and needs careful scoping; primary keys end in `_ID` and foreign keys repeat them; and audit columns (`CREATED_BY`, `LAST_UPDATE_DATE`, and friends) appear almost everywhere. Flexfield segment columns are generic by design and only mean something once you know the implementation's configuration. With these patterns and Chapter 1's map of the data model in hand, you're ready for Chapter 2: suppliers and customers, where you'll put the `HZ_` layer to work.
