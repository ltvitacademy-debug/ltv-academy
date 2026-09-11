# Lesson 7 — Transaction Facts

**Chapter 2 · Fact Tables · Lesson 7 of 39**

## What you'll learn

- Why the transaction fact table is the type you'll design most often
- How to state a transaction fact table's grain precisely, in one
  sentence, before writing a single column
- What Microsoft's own reference structure for a fact table looks like
  in real T-SQL — dimension keys, attributes, measures, audit columns
- Why transaction measures are (almost always) fully additive, and
  what that buys you at query time

## The default fact table type

If you only remember one fact table type, it's this one. A **transaction
fact table** stores one row per business event: one sales order line,
one call, one click, one payment. Every fact this course has used as an
example so far — line revenue, order quantity — has implicitly been a
transaction fact. All the data in the row is known the moment it's
inserted, and the row is never touched again except to correct a
genuine error. That immutability is the whole point: transaction facts
are an append-only ledger of things that happened.

## A real transaction fact table, in T-SQL

Microsoft's own dimensional modeling guidance for Fabric Warehouse
gives this reference shape for a fact table, prefixed `f_` by
convention. Adapted here to a sales-order-line grain — a textbook
transaction fact:

```sql
CREATE TABLE f_SalesOrderLine
(
    -- Dimension keys
    OrderDate_Date_FK   INT NOT NULL,
    ShipDate_Date_FK    INT NOT NULL,
    Product_FK          INT NOT NULL,
    Customer_FK         INT NOT NULL,
    Salesperson_FK      INT NOT NULL,

    -- Attributes (degenerate dimension)
    SalesOrderNo         INT NOT NULL,
    SalesOrderLineNo      SMALLINT NOT NULL,

    -- Measures
    Quantity              INT NOT NULL,
    UnitPrice             DECIMAL(10,2) NOT NULL,
    LineRevenue           DECIMAL(12,2) NOT NULL,

    -- Audit attributes
    AuditCreatedDate      DATE NOT NULL,
    AuditCreatedBy        VARCHAR(15) NOT NULL
);
```

Notice what's *not* here: no primary key. A fact table's row is usually
identified well enough by its dimension keys plus attributes, and a
formal primary key just adds storage overhead a table with billions of
rows can't afford. `SalesOrderNo` and `SalesOrderLineNo` are
**attributes**, not dimension keys or measures — they set the grain
(one row per order line) but don't join to a dimension table, which
makes them a degenerate dimension (Chapter 3 covers this properly).

## Stating the grain

Before you write that `CREATE TABLE`, you should be able to say the
grain in one sentence: *"one row per sales order line."* Every
dimension key, attribute, and measure in the table has to be true at
that grain — if you added a `PromotionCode` column that actually
applies once per whole order rather than per line, you'd be violating
the grain you declared, and Lesson 4's rule (decide the grain first)
would already have caught it.

## Why additivity matters here

Because a transaction fact table's rows are genuinely independent
events, its measures — `Quantity`, `LineRevenue` — are (almost always)
**fully additive**: you can sum `LineRevenue` across products,
customers, dates, salespeople, any combination, and get a meaningful
number. That's the reward for getting the grain right at this level:
"total revenue by region by quarter" becomes a single `GROUP BY`
against one table, exactly what Lesson 1 pointed out an OLTP schema
can't do cheaply.

## Key terms

| Term | Meaning |
|---|---|
| Transaction fact table | One row per business event, inserted once and left alone |
| Grain | The precise business meaning of a single row in a fact table |
| Attribute | A fact table column that sets grain but isn't a dimension key or measure (e.g. an order number) |
| Additive measure | A measure that can be validly summed across every dimension |

## Lab

Using `AdventureWorks2012`, write the one-sentence grain statement for
`Sales.SalesOrderDetail`. Then write a query that sums `LineTotal` by
product category and by year, and confirm the number only makes sense
because `LineTotal` is additive at that grain.

## Check yourself

You're ready for Lesson 8 when you can write a one-sentence grain
statement for any transaction fact table, and explain why its measures
are safe to sum across every dimension — a guarantee the next lesson's
fact table type does *not* give you.
