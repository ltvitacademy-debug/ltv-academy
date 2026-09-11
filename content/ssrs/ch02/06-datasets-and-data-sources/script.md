# Script — Datasets & Data Sources

## Segment 1 (title)

Welcome to Chapter 2 — Building Reports. Before we touch the design surface, there are two objects every report needs first: a data source and a dataset. New report authors mix these up constantly, so let's get the distinction locked in.

## Segment 2 (screenshot: ssrs-tutorial-data-source-general)

A data source is just the connection — server, database, connection type, credentials. On its own it doesn't give you any data; it's a connection to nowhere in particular. This is the Data Source Properties dialog with "Use a connection embedded in my report" selected — that connection lives only inside this one report. Name it, pick Microsoft SQL Server as the connection type, type your connection string, and test the connection before you click OK.

## Segment 3 (screenshot: use-shared-connection-or-report-model)

The alternative is a shared data source — instead of embedding the connection, you point at one already published on the report server. Change the server name once, in one place, and every report referencing that shared data source picks it up automatically. That's the real payoff once you've got more than a couple of reports hitting the same database.

## Segment 4 (steps: dataset)

Once you have a data source, you need a dataset — a query run against it that actually produces rows and columns. In the Report Data pane, right-click your data source, select Add Dataset, pick a query type — Text is what you'll use most, for a real SQL SELECT statement — and refresh fields to populate the field collection you'll drag onto the design surface next lesson.

## Segment 5 (outro)

Next lesson, we look at that design surface itself — the ribbon, the panes, and where everything actually lives in the Report Builder window.
