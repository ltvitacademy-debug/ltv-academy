# Script — Capstone: Building a Real Paginated Report Suite

## Segment 1 (title)

Last lesson set the scope. This lesson, we actually build it — two real reports, against your own AdventureWorksDW2014 and AdventureWorks2012, linked by a drillthrough. By the end, clicking a number in a summary matrix is going to open the real order rows behind it.

## Segment 2 (code: summary-dataset)

The summary report's dataset joins FactInternetSales to DimSalesTerritory and DimDate, filtered by two parameters right inside the query text — that's what makes it parameter-driven, not just visually filtered after the fact. One parameter, TerritoryGroup, is a single-value pick-list fed by its own query. The other, CalendarYear, is multi-value, so you can select one year or several at once. The result lands in a matrix: territory regions down the rows, years across the columns, total sales amount in the cells.

## Segment 3 (steps: two-reports)

The detail report is a separate .rdl entirely, pointed at AdventureWorks2012 instead — joining SalesOrderHeader, SalesOrderDetail, and Product into a grouped table, one group per order, with a subtotal in the footer. Its two parameters, TerritoryID and Year, are set to Internal — no prompt, no default — because this report is never meant to be opened cold. It only ever receives its values from one place.

## Segment 4 (steps: drillthrough)

That one place is the summary matrix's data cell. Its Action property is set to "Go to report," pointed at the detail report, mapping TerritoryID to the row's own field value and Year to the column's calendar year. Click a cell, and the detail report opens already filtered — no extra prompt, because the parameters on the receiving end are Internal.

## Segment 5 (outro)

Preview both reports, click through the drillthrough, and deploy both to the same Report Server folder so the link resolves once published. Next lesson, we check this whole suite against Lesson 38's original scope and get it ready to show off.
