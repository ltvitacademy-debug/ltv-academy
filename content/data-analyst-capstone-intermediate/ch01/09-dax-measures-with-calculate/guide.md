# Lesson 9 — DAX Measures With CALCULATE

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 9 of 16**

## What you'll learn

- Writing the base measures both stakeholder pages depend on
- Using `CALCULATE` with `ALL` to build a company-wide benchmark for each dimension
- Why two measures both named "Total Sales" create a real naming risk
- Why this risk matters specifically because this project has two pages, not one

## The base measures

```dax
Total Sales = SUM ( Fact[LineTotal] )

Order Count = DISTINCTCOUNT ( Fact[SalesOrderID] )

Average Order Value = DIVIDE ( [Total Sales], [Order Count] )
```

`DIVIDE` instead of a plain `/` matters once a slicer can filter a segment or territory down to
zero orders — `DIVIDE` returns a blank instead of a divide-by-zero error.

## `CALCULATE` + `ALL`: the segment benchmark

The Marketing Manager's page needs each segment's share of total company sales:

```dax
Total Sales (All Segments) =
CALCULATE (
    [Total Sales],
    ALL ( DimCustomer )
)

Pct of Company Total (Segment) =
DIVIDE ( [Total Sales], [Total Sales (All Segments)] )
```

`ALL ( DimCustomer )` strips away any filter currently applied through the `DimCustomer`
relationship — including the segment slicer — and recalculates `[Total Sales]` as if every
customer were included, regardless of segment. That's the denominator a "share of company total"
figure needs.

## `CALCULATE` + `ALL`: the territory benchmark

The Sales Director's page needs the same idea, applied to territory instead of segment:

```dax
Total Sales (All Territories) =
CALCULATE (
    [Total Sales],
    ALL ( DimTerritory )
)

Pct of Company Total (Territory) =
DIVIDE ( [Total Sales], [Total Sales (All Territories)] )
```

Same mechanism, different table: `ALL ( DimTerritory )` removes the territory filter specifically,
leaving the segment filter (if any) untouched.

## A detail worth sitting with

You now have three measures that all start with "Total Sales": the plain one, `Total Sales (All
Segments)`, and `Total Sales (All Territories)`. With no segment or territory filter applied, all
three return the **exact same number** — each `ALL` has nothing to strip away when nothing is
filtered in the first place. They only diverge once a slicer actually narrows something down.
That's easy to overlook while building two pages quickly — and it matters again later in this
chapter.

## Key terms

| Term | Meaning |
|---|---|
| `CALCULATE` | Evaluates an expression inside a modified filter context |
| `ALL` | Removes filters on the given table, for a benchmark/total figure |
| `DIVIDE` | Division that returns blank instead of erroring on a zero denominator |

## Lab

Add all five measures above to the model. Build a quick table visual with `DimTerritory[TerritoryName]`
on rows and both `[Total Sales]` and `[Total Sales (All Territories)]` as values. Confirm every
territory shows a different `[Total Sales]` but the exact same `[Total Sales (All Territories)]`
in every row.

## Check yourself

You're ready for Lesson 10 when you can answer, without looking: what does `ALL ( DimTerritory )`
actually remove, and why do `[Total Sales]` and `[Total Sales (All Territories)]` return identical
numbers until a territory filter is applied?
