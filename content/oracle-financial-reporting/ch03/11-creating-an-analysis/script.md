# Script — Creating an Analysis

## Segment 1 (title)

With subject areas understood, let's actually build one. This lesson covers the Criteria tab and the Results tab, the two screens every OTBI analysis is built from.

## Segment 2 (steps)

You start by selecting a subject area, say Payables Invoices. You get a tree of available columns, grouped into the facts and dimensions that subject area exposes. Building the analysis just means dragging the columns you care about into the selected list. There's no query to write, selecting columns is the query.

## Segment 3 (steps)

Once columns are selected, the Results tab shows the output. By default that's a simple table, but OTBI supports a pivot table, with facts aggregated across whatever dimensions you place on each axis, and graphs: bar, line, pie. You can add more than one view to the same analysis and switch between them.

## Segment 4 (code)

Here's the Payables example from chapter one, built for real. Subject area: Payables Invoices. Columns: supplier name, invoice number, invoice amount, invoice date, days overdue, payment status. A filter restricts amount over ten thousand, days overdue over thirty, status unpaid. That's the entire build, no SQL, no scheduled job.

## Segment 5 (outro)

A finished analysis saves into the Reports and Analytics catalog, usually your own My Folders first, until someone publishes it to Shared Folders. Up next, lesson twelve: filters, prompts, and the view types that turn a basic analysis into something genuinely useful.
