# Power BI Data Model Documentation Template

A template for writing down what a data model actually *is* — its fact
and dimension tables, its relationships, and the deliberate choices
behind each one. Use it while you build a model, not after; the
"Why this choice" columns are the part most students skip and the part
that saves the most time later. Filled in below with a real example you
can compare your own notes against.

## Blank template

### 1. Table inventory

| Table name | Fact or dimension? | Row count (approx.) | Grain (what one row represents) |
|---|---|---|---|
| | | | |

### 2. Relationship log

| Table A | Column A | Table B | Column B | Cardinality | Cross filter direction | Active? | Why this choice |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

### 3. Hierarchies

| Dimension table | Hierarchy name | Levels (top → bottom) |
|---|---|---|

### 4. Known risks / things to revisit

- (e.g., a one-to-one relationship Power BI picked automatically that
  will break once the data refresh introduces duplicates)
- (e.g., a loop that forced a relationship to stay inactive)

---

## Filled example: AdventureWorksDW2014 sales model

### 1. Table inventory

| Table name | Fact or dimension? | Row count (approx.) | Grain |
|---|---|---|---|
| FactInternetSales | Fact | ~60,000 | One row per line item on one online sales order |
| DimProduct | Dimension | ~600 | One row per product |
| DimProductSubcategory | Dimension | ~37 | One row per product subcategory |
| DimProductCategory | Dimension | ~4 | One row per product category |
| DimCustomer | Dimension | ~18,000 | One row per customer |
| DimSalesTerritory | Dimension | ~11 | One row per sales territory |
| DimDate | Dimension | ~2,500 | One row per calendar day |

### 2. Relationship log

| Table A | Column A | Table B | Column B | Cardinality | Cross filter direction | Active? | Why this choice |
|---|---|---|---|---|---|---|---|
| FactInternetSales | ProductKey | DimProduct | ProductKey | Many to one | Single | Active | Default star-schema shape — the fact side always repeats, the dimension side is unique. No report needs a filter to travel back out through Product into anything else, so Single is correct and keeps the model unambiguous. |
| DimProduct | ProductSubcategoryKey | DimProductSubcategory | ProductSubcategoryKey | Many to one | Single | Active | A real snowflake in the source data — Category/Subcategory/Product live in three tables, not one. Documented here so nobody "fixes" it into a single hierarchy table without realizing the source keeps them separate. |
| DimProductSubcategory | ProductCategoryKey | DimProductCategory | ProductCategoryKey | Many to one | Single | Active | Same snowflake chain as above. |
| FactInternetSales | CustomerKey | DimCustomer | CustomerKey | Many to one | Single | Active | Standard fact-to-dimension spoke. |
| FactInternetSales | SalesTerritoryKey | DimSalesTerritory | SalesTerritoryKey | Many to one | Single | Active | Standard spoke. |
| FactInternetSales | OrderDateKey | DimDate | DateKey | Many to one | Single | **Active** | Role-playing date: order date is the relationship almost every report needs by default. |
| FactInternetSales | DueDateKey | DimDate | DateKey | Many to one | Single | Inactive | Second role-playing relationship to the same DimDate — Power BI only allows one active link between the same two tables. Reached via `USERELATIONSHIP` in any measure that specifically needs "due date" instead of "order date." |
| FactInternetSales | ShipDateKey | DimDate | DateKey | Many to one | Single | Inactive | Third role-playing relationship, same reasoning — reached via `USERELATIONSHIP` for ship-date-specific measures. |

### 3. Hierarchies

| Dimension table | Hierarchy name | Levels (top → bottom) |
|---|---|---|
| DimProductCategory / Subcategory / Product (snowflake — see risk note) | Product Hierarchy | Category → Subcategory → Product Name |
| DimDate | Calendar Hierarchy | Calendar Year → Calendar Quarter → Calendar Month → Date |

### 4. Known risks / things to revisit

- The Product hierarchy spans three separate tables (a snowflake), not
  one dimension table — a true single-table hierarchy isn't possible
  here without first flattening Category/Subcategory into DimProduct
  itself. Flagged so nobody assumes it's already a clean one-table
  hierarchy.
- Only the order-date relationship to DimDate is active by default.
  Any new measure that silently assumes "date" means ship date or due
  date will be wrong unless it explicitly calls `USERELATIONSHIP` —
  worth a comment directly in any such measure's definition.
- If a future refresh ever needs sales *and* budget figures sharing the
  same DimSalesTerritory lookup, don't set both relationships to
  **Both** cross-filter direction — that recreates the loop-ambiguity
  problem this model currently avoids by having only one fact table.

*Use this template alongside the course's own Chapter 4 (Data Modeling)
lessons — the row on role-playing dates mirrors the exact
FactInternetSales example built there.*
