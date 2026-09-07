# Lesson 88 — Create DAX Measures

**Chapter 12 · Capstone Project · Lesson 5 of 10**

## What you'll learn

- Writing one measure per requirement from Lesson 84, on purpose
- Using `USERELATIONSHIP()` for the ship-date fulfillment measure
- A variables-based year-over-year measure, the Chapter 5 way
- Why every measure here traces back to a specific business question

## Requirement 1: Regional performance

```
Total Sales =
SUM ( FactInternetSales[SalesAmount] ) +
SUM ( FactResellerSales[SalesAmount] )

Sales vs. Target % =
DIVIDE ( [Total Sales], [Sales Target], 0 )
```

Placed on a matrix with `DimSalesTerritory[SalesTerritoryRegion]`,
this answers "which regions are ahead of or behind target" directly —
exactly Lesson 84's first requirement, nothing extra.

## Requirement 2: Product-line profitability

```
Total Cost =
SUM ( FactInternetSales[TotalProductCost] ) +
SUM ( FactResellerSales[TotalProductCost] )

Gross Margin =
[Total Sales] - [Total Cost]

Gross Margin % =
DIVIDE ( [Gross Margin], [Total Sales], 0 )
```

Margin **percent**, not just margin dollars, is what actually answers
"which product categories drive margin" — a category can have high
revenue and terrible margin, and the VP specifically asked about
margin, not revenue.

## Requirement 3: Reseller fulfillment

```
VAR ShippedOnTime =
    CALCULATE (
        COUNTROWS ( FactResellerSales ),
        USERELATIONSHIP ( FactResellerSales[ShipDateKey], DimDate[DateKey] ),
        FactResellerSales[ShipDateKey] <= FactResellerSales[DueDateKey]
    )
RETURN
    DIVIDE ( ShippedOnTime, COUNTROWS ( FactResellerSales ), 0 )
```

This is exactly the `USERELATIONSHIP()` pattern Lesson 87 set up —
`ShipDateKey`'s relationship is inactive by default, so this measure
activates it only for this one calculation, without disturbing every
other measure's use of `OrderDateKey`.

## Requirement 4: Trend over time

```
VAR CurrentSales = [Total Sales]
VAR PriorYearSales =
    CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( DimDate[Date] ) )
RETURN
    DIVIDE ( CurrentSales - PriorYearSales, PriorYearSales, 0 )
```

Variables first, then one `RETURN` — the exact readability pattern
Chapter 5's variables lesson taught, not a wall of nested
parentheses.

## Every measure maps to a requirement — check yours does too

Before moving on, look at your own measure list. If a measure exists
that doesn't trace back to one of Lesson 84's four requirements, ask
whether it's actually needed for this project, or whether it snuck in
because it seemed interesting to build.

## Key terms

| Term | Meaning |
|---|---|
| Gross Margin % | Profitability as a percentage of sales, not a raw dollar figure |
| `SAMEPERIODLASTYEAR` | The time-intelligence function comparing a period to the same period one year prior |

## Lab

1. Build all five measures above in your capstone model.
2. Place `Sales vs. Target %` in a table by
   `DimSalesTerritory[SalesTerritoryRegion]` and confirm the numbers
   look reasonable (no blank or wildly inflated regions).
3. Confirm the fulfillment measure changes when you swap the DAX to
   use `OrderDateKey` instead of `USERELATIONSHIP()`'s `ShipDateKey`
   — proving to yourself the relationship activation is actually
   doing something.

## Check yourself

You're ready for Lesson 89 when every measure you've built traces
back to one of Lesson 84's four numbered requirements, and you can
explain in one sentence why the fulfillment measure needed
`USERELATIONSHIP()` specifically.
