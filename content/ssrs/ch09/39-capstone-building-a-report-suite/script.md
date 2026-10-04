# Script — Capstone: Building a Real Paginated Report Suite

## Segment 1 (title)

Last lesson set the scope. This lesson, we actually build it — two real reports, against your own AdventureWorksDW2014 and AdventureWorks2012, linked by a drillthrough. By the end, clicking a number in a summary matrix is going to open the real order rows behind it.

## Segment 2 (code: summary-dataset)

The summary report's dataset joins FactInternetSales to DimSalesTerritory and DimDate, filtered by two parameters right inside the query text — that's what makes it parameter-driven, not just visually filtered after the fact. One parameter, TerritoryGroup, is a single-value pick-list fed by its own query. The other, CalendarYear, is multi-value, so you can select one year or several at once.

## Segment 3 (screenshot: parameter-prompt-dropdown)

Here's what a pick-list parameter actually looks like once it's live — a dropdown populated from a real dataset query instead of a hand-typed list. That's exactly the mechanism behind TerritoryGroup: the available values come from a SELECT statement, not a static list you maintain by hand.

## Segment 4 (screenshot: report-data-parameters-node)

Once you create a parameter, it shows up in two places — under Parameters in the Report Data pane on the left, and in the Parameters pane right on the design surface. Both TerritoryGroup and CalendarYear land in exactly these two spots once you build them.

## Segment 5 (screenshot: matrix-row-column-groups)

And here's the layout those parameters feed into — a finished matrix with nested row and column groups, currency-formatted, with subtotals. Territory regions go down the rows here, years go across the columns, but the grouped shape is identical to this example's subcategories and weekdays.

## Segment 6 (steps: two-reports)

The detail report is a separate .rdl entirely, pointed at AdventureWorks2012 instead — joining SalesOrderHeader, SalesOrderDetail, and Product into a grouped table, one group per order, with a subtotal in the footer. Its two parameters, TerritoryID and Year, are set to Internal — no prompt, no default — because this report is never meant to be opened cold. It only ever receives its values from one place.

## Segment 7 (screenshot: matrix-select-data-cell)

That one place starts with a selection like this — the matrix's own data cell, handles and all, not a row header or a column header. Only the cell itself carries the Action property the drillthrough gets wired to.

## Segment 8 (steps: drillthrough)

That cell's Action property is set to "Go to report," pointed at the detail report, mapping TerritoryID to the row's own field value and Year to the column's calendar year. Click a cell, and the detail report opens already filtered — no extra prompt, because the parameters on the receiving end are Internal.

## Segment 9 (outro)

Preview both reports, click through the drillthrough, and deploy both to the same Report Server folder so the link resolves once published. Next lesson, we check this whole suite against Lesson 38's original scope and get it ready to show off.
