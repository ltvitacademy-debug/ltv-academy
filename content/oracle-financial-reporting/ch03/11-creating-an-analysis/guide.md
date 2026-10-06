# Creating an Analysis

With subject areas understood, it's time to actually build one. This lesson walks through the mechanics of creating an OTBI analysis: picking a subject area, selecting columns, and choosing how to view the result — the Criteria tab and the Results tab that every analysis is built from.

## What you'll learn

- The Criteria tab: selecting a subject area and choosing columns
- The Results tab: where your analysis actually renders as a table, pivot table, or graph
- A worked example answering a real Payables question
- Saving an analysis back to the catalog you toured in lesson 2

## Starting an analysis: the Criteria tab

Creating a new analysis starts by selecting a subject area — say, Payables Invoices. You're then presented with a tree of available **columns**, grouped by the folders (facts and dimensions) that subject area exposes. Building the analysis means dragging the columns you care about into the selected-columns list on the Criteria tab. There's no query to write; the act of selecting columns *is* the query definition.

A typical Payables analysis might select:
- **Supplier Name** (dimension)
- **Invoice Number** (dimension)
- **Invoice Amount** (fact)
- **Invoice Date** and **Due Date** (dimensions)
- **Days Overdue** (a derived/calculated column, if the subject area exposes one)

Order matters for readability but not for correctness — OTBI will happily return any combination of facts and dimensions you select, though some combinations make more business sense than others (totaling an amount while slicing by too many dimensions at once can produce a very long, hard-to-read result).

## Viewing the result: the Results tab

Once columns are selected, the Results tab shows the actual output. By default this is usually a simple table, but OTBI supports several view types, which you'll use more deliberately in lesson 12:

- **Table** — a plain row-by-row list, closest to a spreadsheet export.
- **Pivot Table** — rows and columns can be rearranged, with facts aggregated (summed, averaged, counted) across whatever dimensions you've placed on each axis.
- **Graph** — bar, line, or pie representations of the same selected data.

You can add more than one view to a single analysis — a table and a graph of the same data, for instance — and switch between them without changing the underlying column selection.

## Worked example: unpaid invoices over $10,000

Picture the Payables request from Chapter 1: "show me all unpaid invoices over $10,000 that are more than 30 days old." Built as an OTBI analysis, it looks like:

1. Subject area: Payables Invoices.
2. Columns: Supplier Name, Invoice Number, Invoice Amount, Invoice Date, Days Overdue, Payment Status.
3. A filter (covered fully in lesson 12) restricting Invoice Amount to greater than 10,000, Days Overdue to greater than 30, and Payment Status to "Unpaid."
4. Results tab: a simple table, sorted by Invoice Amount descending.

That's the entire build — no SQL, no data model, no scheduled job. This is exactly the kind of same-day request OTBI was designed to answer quickly.

## Saving your work

A finished analysis is saved into the Reports and Analytics catalog from lesson 2, typically into your own My Folders unless and until you (or someone with the right access) decides to publish it into Shared Folders for others to reuse. Saving doesn't change who can see it beyond what the catalog's folder permissions already allow.

## Recap

An OTBI analysis is built on the Criteria tab by selecting a subject area and dragging in the facts and dimensions you care about, then viewed on the Results tab as a table, pivot table, or graph. Next up, lesson 12: filters, prompts, and the different view types that turn a basic analysis into something genuinely useful.
