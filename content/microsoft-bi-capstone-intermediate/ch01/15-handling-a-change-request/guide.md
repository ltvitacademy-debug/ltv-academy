# Lesson 15 — Handling a Follow-Up Change Request

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 15 of 16**

## What you'll learn

- Turning a vague-sounding request into a specific, buildable spec
- Extending the staged fact view instead of building a workaround on top of it
- Writing a new DAX measure for a late-shipment rate
- Adding the new metric to the Drill-Down page in a way that fits the existing design

## The request

The Operations Manager, now trusting the report again, comes back with something new: "Can I see
what percentage of orders are shipping late, broken out by region and subcategory, on the same
page?" That's a real, reasonable ask — and it's specific enough to build directly, because
"late" has an exact definition available in data you already pulled back in Lesson 3: an order
shipped **after** its `DueDate`.

## Step 1: extend the staged view, don't bolt on a workaround

You could compute "late" inside a DAX measure using `IF` and comparing two columns at query time.
But the cleanest fix follows the pattern this chapter already established in Lesson 4: push the
business rule into the staged view, so the fact table carries the flag as data, consistent for
every tool that ever reads from it.

```sql
CREATE OR ALTER VIEW dbo.vw_CarrawayWeeklySalesFact AS
SELECT
    soh.SalesOrderID,
    soh.OrderDate,
    soh.DueDate,
    soh.ShipDate,
    soh.TerritoryID,
    sod.ProductID,
    sod.OrderQty,
    sod.UnitPrice,
    sod.UnitPriceDiscount,
    sod.LineTotal,
    CASE WHEN soh.ShipDate > soh.DueDate THEN 1 ELSE 0 END AS IsLate
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesOrderDetail AS sod
    ON sod.SalesOrderID = soh.SalesOrderID
WHERE soh.Status = 5;
GO
```

Because this is `CREATE OR ALTER VIEW` on the exact object from Lesson 4, nothing about the Power
BI model's relationships breaks — `Fact` just gains one new column the next time it refreshes.

## Step 2: refresh the model and verify the new column

In Power BI Desktop, **Refresh** the model. Confirm `IsLate` shows up as a new column on `Fact`,
with values of `0` or `1`.

## Step 3: the new DAX measure

```dax
% Shipped Late =
DIVIDE (
    CALCULATE ( [Order Count], Fact[IsLate] = 1 ),
    [Order Count]
)
```

`CALCULATE ( [Order Count], Fact[IsLate] = 1 )` evaluates `[Order Count]` inside a filter context
narrowed to only the late-shipped order lines — a simple boolean filter argument, not `ALL` or
`ALLEXCEPT`, so it respects whatever region and subcategory filters are already active on the
page. `DIVIDE` against the unfiltered `[Order Count]` turns that into a rate.

## Step 4: add it to the Drill-Down page

Add `[% Shipped Late]` as a fourth KPI card on the Drill-Down page, formatted as a percentage, and
add it as a second value column in the existing Matrix alongside `[Total Sales]` — so the
Operations Manager can see, for each territory/subcategory combination, both the revenue and the
late-shipment rate at once.

## Why this request didn't touch the Executive Summary page

The Sales Director never asked for a fulfillment metric — her requirements from Lesson 1 were
revenue-focused. Adding `[% Shipped Late]` only to the Drill-Down page keeps each page scoped to
the audience it was actually built for, instead of growing every page every time any one
stakeholder asks for something new.

## Key terms

| Term | Meaning |
|---|---|
| Change request | A new requirement from an existing stakeholder, after the original build |
| Boolean filter argument | A simple `Column = value` condition passed directly into `CALCULATE` |
| Scope creep | Adding unrequested content to a page just because a feature exists |

## Lab

Alter the view, refresh the model, add `[% Shipped Late]`, and place it on the Drill-Down page as
described. Filter to one territory and confirm the percentage changes sensibly compared to the
unfiltered value.

## Check yourself

You're ready for Lesson 16 when you can answer, without looking: why does `% Shipped Late` use a
simple boolean filter argument inside `CALCULATE` instead of `ALL`, and why did this change
request only touch the Drill-Down page?
