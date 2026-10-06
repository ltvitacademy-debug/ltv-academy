# Ad Hoc Analysis with Smart View

With Smart View connected, this lesson covers what you actually do with it: pulling GL balances into a worksheet, pivoting dimensions, drilling into detail, and refreshing to see current numbers — the core ad hoc workflow a controller or analyst uses constantly during close.

## What you'll learn

- Connecting to the GL balances cube from inside Excel
- Pivoting dimensions directly in the worksheet grid
- Drilling from a summary balance down toward underlying detail
- Refreshing a worksheet to pull current data

## Connecting to data from inside Excel

Once signed in (lesson 20), a user connects a worksheet to a specific data source — commonly the same GL balances cube that Financial Reporting Studio reports against. Rather than running a predefined report, the user builds their own ad hoc grid: selecting which dimensions (ledger, period, account, cost center) should appear on rows, which on columns, and which should be fixed as a point of view for the whole worksheet, similar in spirit to the point-of-view concept from Chapter 2 but now controlled directly inside Excel rather than through a separate report-running screen.

## Pivoting: rearranging dimensions on the fly

Because Smart View connects to a genuinely multidimensional data source, a user can **pivot** — drag a dimension from rows to columns, or swap which dimension is fixed in the point of view, and the worksheet's layout and numbers update accordingly. A worksheet showing accounts down the rows and periods across the columns can be pivoted, with a couple of drags, into cost centers down the rows and accounts across the columns — the same underlying data, viewed a different way, without rebuilding anything from scratch.

## Drilling into detail

Smart View also supports **drilling** — starting from a summary balance and navigating down into the detail that makes it up, potentially all the way to the underlying transactions or journal lines, depending on what's enabled for that data source and the user's access. This mirrors the drill capability mentioned for Financial Reporting Studio reports in lesson 6, but performed interactively inside the spreadsheet the user is already working in, rather than switching to a different screen.

## Refreshing: keeping the worksheet current

A Smart View worksheet isn't a one-time snapshot. The **refresh** action re-queries the connected data source and updates the worksheet with current numbers, while generally preserving the user's layout, formatting, and any additional Excel formulas built around the connected cells. This is the single most-used action in a typical close workflow: build the layout once early in the month, then refresh the same worksheet repeatedly as the close progresses and balances firm up, instead of rebuilding it from scratch each time.

## Why this matters for a controller's workflow

This ad hoc, pivot-and-drill workflow is exactly the "I want to pull GL balances into Excel myself and build my own variance analysis" scenario from the Chapter 1 decision framework. It's the natural complement to Financial Reporting Studio's formal statements: Smart View is where a controller explores and investigates before (or instead of) producing something formally published.

## Recap

Ad hoc Smart View analysis means connecting a worksheet to a data source like the GL balances cube, pivoting dimensions between rows, columns, and point of view, drilling from summary balances into detail, and refreshing to keep the worksheet current without rebuilding it. Next up, lesson 22: Report Packages and templates — Smart View's collaborative, narrative side.
