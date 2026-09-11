# Script — Capstone Kickoff

## Segment 1 (title)

Welcome to the capstone. Over these last three lessons, you're going to build one real, connected report suite — not a grab-bag of disconnected examples. This lesson sets the scope, so you know exactly what "done" looks like before we start building next lesson.

## Segment 2 (steps: architecture)

Here's the shape of it. A summary report — a matrix of sales by territory and year — built against AdventureWorksDW2014, the warehouse database this catalog's SSIS Development capstone already loaded a fact table into. That summary report is driven by parameters — a territory group and a set of years. And clicking into one of its cells drills through to a detail report, built against AdventureWorks2012, showing the actual order line items behind that number. Dataset, layout, parameters, drillthrough — Lesson 39 builds every one of those, for both reports, in a single sitting.

## Segment 3 (steps: sources)

The summary report leans on three real warehouse tables — FactInternetSales, DimSalesTerritory, and DimDate. The detail report leans on three real transactional tables — SalesOrderHeader, SalesOrderDetail, and Product. And there's one column that makes the whole suite hang together: DimSalesTerritory's SalesTerritoryAlternateKey, which is just the original TerritoryID from AdventureWorks2012, carried into the warehouse unchanged. That's the bridge a drillthrough action passes across.

## Segment 4 (outro)

Before next lesson, confirm both data sources connect, and that you can see matching territory IDs on both sides. Next lesson, we build both reports for real — the datasets, the matrix layout, the parameters, and the drillthrough link that ties them together.
