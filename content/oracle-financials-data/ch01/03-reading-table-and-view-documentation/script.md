# Script — Reading Table and View Documentation

## Segment 1 (title)

Everything in this course rests on one skill: being able to go look something up instead of guessing. Oracle publishes real, official documentation for every table and view in Fusion Financials. This lesson is about knowing it exists and learning how to actually read it.

## Segment 2 (steps)

Oracle publishes an Enterprise Data Model for Financials as part of its official documentation site. Every table and view gets its own page: name, description, primary key, and a full column list with data types and plain-English descriptions. This is the most reliable source for what a table actually stores, far more reliable than a blog post written against a different release.

## Segment 3 (steps)

Oracle Fusion updates on a quarterly release cycle, and documentation is published per release. Core tables like invoices, journals, and parties are very stable release to release, but if something you're reading doesn't match what you see in a practice environment, checking whether you're comparing the same release is a fair first troubleshooting step.

## Segment 4 (steps)

A table's reference page gives you the table name and module, a short description, the primary key, and the full column list. When you're trying to answer a real question, resist guessing from a column name alone. Oracle Fusion has plenty of similarly-named columns across different tables that mean subtly different things, and the description is where that distinction gets spelled out.

## Segment 5 (outro)

One more distinction: not everything you'll query is a base table. Many views sit on top of base tables, pre-joining data for reporting, and OTBI's subject areas are themselves built on views like this. Keep straight whether you're looking at a base table or a view. Up next, lesson four: naming conventions and key columns.
