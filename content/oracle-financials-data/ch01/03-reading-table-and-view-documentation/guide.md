# Reading Table and View Documentation

Everything in this course rests on one skill: being able to go look something up instead of guessing or relying on memory. Oracle publishes real, official reference material describing every table and view in Oracle Fusion Financials — column by column, with data types, descriptions, and keys. This lesson is about knowing that material exists, what it's called, and how to actually read a table's documentation page so it answers your question instead of just producing more confusion.

## What you'll learn

- Where Oracle publishes its official table and view reference documentation
- Why documentation is versioned by quarterly release, and what that means for you
- How to read a single table's reference page: keys, columns, descriptions
- The difference between a base table and a view, and why both matter

## Oracle's own reference: the Enterprise Data Model

Oracle publishes an **Enterprise Data Model for Financials** reference as part of its official Fusion Applications documentation at docs.oracle.com. Each table and view used by the Financials product line gets its own page: the table's name, a short description of its purpose, its primary key, and a full column list with each column's data type and a plain-English description. This is the single most reliable source for "what does this table actually store" — far more reliable than a blog post or a forum answer written against a different release.

## Releases are quarterly, and that matters

Oracle Fusion Cloud updates on a **quarterly release cycle**, and each update gets a short code: a two-digit year followed by a letter for the quarter (for example, the fourth quarterly update of a given year). Documentation on docs.oracle.com is published per release, so a table reference page you find is tied to a specific quarter's version of the product. Most of the time, the core tables you'll use in this course (invoices, journals, parties) are extremely stable release over release — but when something looks different between what you read and what you see in a practice environment, checking whether you're comparing the same release is a reasonable first troubleshooting step, not something to dismiss.

## How to actually read a table's page

A typical table reference page gives you, in order:

1. **Table name and module** — confirms which product area owns it (the prefix should match)
2. **Description** — a sentence or two on what a row in this table represents
3. **Primary key** — the column (or columns) that uniquely identify a row
4. **Column list** — every column, its data type, and a description; this is where you confirm whether a column is a status flag, a foreign key, a date, or free text

When you're trying to answer a real question — "which column tells me if this invoice has been paid?" — resist the urge to guess from the column name alone. Read the description. Oracle Fusion has plenty of similarly-named columns across different tables that mean subtly different things (a "status" on an invoice header is not the same as a "status" on a payment schedule), and the documentation is where that distinction gets spelled out.

## Tables versus views

Not everything you'll query is a base table. Many reporting-friendly **views** sit on top of one or more base tables, pre-joining or pre-filtering data for a specific purpose. OTBI's subject areas, which you covered in the Oracle Financial Reporting course, are themselves built on views and complex joins over these same base tables. When you're reading documentation, pay attention to whether you're looking at a base table (where data is physically stored and modified) or a view (a saved query, often read-only, built for convenience). Both get documented, but only base tables are where INSERT/UPDATE activity against the underlying transaction actually happens.

## Recap

Oracle maintains an official Enterprise Data Model reference for Financials at docs.oracle.com, versioned by quarterly release, with a dedicated page for every table and view: name, description, primary key, and full column list. Read the column descriptions rather than guessing from names alone, and keep straight whether you're looking at a base table or a view built on top of one. Next up, lesson 4: naming conventions and key columns — the patterns that let you read an unfamiliar table quickly once you've found its documentation page.
