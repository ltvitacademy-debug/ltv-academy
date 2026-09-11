# Lesson 31 — Physical Warehouse Design

**Chapter 7 · Building the Warehouse · Lesson 31 of 39**

## What you'll learn

- How to translate a logical star schema (the whiteboard version — facts,
  dimensions, grain) into real SQL Server `CREATE TABLE` statements
- Which data types actually belong in a warehouse table, and why they
  differ from what you'd pick in a normalized OLTP design
- Where surrogate keys, foreign keys, and `NOT NULL` constraints go in
  the physical design — and where warehouse practice deliberately
  relaxes OLTP-style constraint discipline
- Why fact tables and dimension tables get physically different
  treatment even though both are "just tables"

## From whiteboard to `CREATE TABLE`

By this point in the course you've done the hard thinking already:
you've chosen a grain (Lesson 4), classified your fact table type
(Chapter 2), and designed your dimensions with surrogate keys (Chapter
3). Physical design is where that thinking becomes an actual database
you can query. It's mechanical work, but the choices you make here —
data types, key placement, constraint strategy — determine how the
warehouse performs and how forgiving it is to load.

## Dimension tables: build for read speed and readability

A dimension table's physical shape should make analysts' lives easy:

- **Surrogate key first.** An `INT IDENTITY(1,1)` (or `BIGINT` for a
  dimension expected to exceed ~2 billion rows) as the primary key,
  always listed first in the column order.
- **Natural/business key kept, not dropped.** Store the source
  system's key (e.g., `ProductAlternateKey`) as an ordinary column —
  you need it to look up the right surrogate key during ETL loads
  (Chapter 5), even though it's never the join key for reporting.
- **Descriptive, denormalized attributes.** Dimension tables are
  intentionally flat — a `Category` and `Subcategory` text column
  living right on `Dim_Product`, not normalized out into their own
  tables the way an OLTP schema would.

```sql
CREATE TABLE dbo.Dim_Product (
    ProductKey          INT IDENTITY(1,1) NOT NULL,
    ProductAlternateKey VARCHAR(25)       NOT NULL,  -- source system's natural key
    ProductName         NVARCHAR(100)     NOT NULL,
    Category            NVARCHAR(50)      NOT NULL,
    Subcategory         NVARCHAR(50)      NOT NULL,
    Color               NVARCHAR(20)      NULL,
    StandardCost        DECIMAL(19,4)     NULL,
    ListPrice           DECIMAL(19,4)     NULL,
    RowStartDate        DATETIME2(0)      NOT NULL DEFAULT SYSUTCDATETIME(),  -- SCD Type 2, Ch. 4
    RowEndDate          DATETIME2(0)      NULL,
    IsCurrent           BIT               NOT NULL DEFAULT 1,
    CONSTRAINT PK_Dim_Product PRIMARY KEY CLUSTERED (ProductKey)
);
```

## Fact tables: build for narrow rows and fast aggregation

A fact table's physical shape optimizes for the opposite problem —
millions or billions of narrow rows, scanned and aggregated, not
looked up one at a time:

- **Foreign keys to every dimension at the chosen grain**, using the
  *surrogate* keys, never the natural keys.
- **Narrow, numeric measure columns.** `DECIMAL` or `MONEY` for
  currency, never `NVARCHAR` — every extra byte per row costs real
  space and I/O at fact-table scale.
- **A date key as an `INT` (`YYYYMMDD`), not a `DATETIME`.** This is
  the one place warehouse practice actively departs from OLTP habit:
  an integer surrogate `DateKey` joins to `Dim_Date` faster and stores
  in 4 bytes instead of 8.

```sql
CREATE TABLE dbo.Fact_Sales (
    SalesOrderKey  BIGINT IDENTITY(1,1) NOT NULL,   -- degenerate dim, Ch. 3
    DateKey        INT           NOT NULL,           -- FK -> Dim_Date, YYYYMMDD
    ProductKey     INT           NOT NULL,           -- FK -> Dim_Product
    CustomerKey    INT           NOT NULL,           -- FK -> Dim_Customer
    SalesAmount    DECIMAL(19,4) NOT NULL,
    Quantity       INT           NOT NULL,
    DiscountAmount DECIMAL(19,4) NOT NULL DEFAULT 0,
    CONSTRAINT FK_Fact_Sales_Date    FOREIGN KEY (DateKey)    REFERENCES dbo.Dim_Date (DateKey),
    CONSTRAINT FK_Fact_Sales_Product FOREIGN KEY (ProductKey) REFERENCES dbo.Dim_Product (ProductKey),
    CONSTRAINT FK_Fact_Sales_Customer FOREIGN KEY (CustomerKey) REFERENCES dbo.Dim_Customer (CustomerKey)
);
```

Notice there's no clustered index declared on the fact table yet — that
choice (a clustered columnstore index, almost always) is deliberately
deferred to Lesson 32, because indexing a fact table is a big enough
decision to earn its own lesson.

## A note on constraint discipline

Some production warehouses skip foreign key constraints on fact tables
entirely and enforce referential integrity in the ETL layer instead,
trading a safety net for load speed on very large, frequently-reloaded
fact tables. Both are legitimate; this course models fact tables with
explicit FKs so the relationships are visible in the schema, and you
can make the trade-off yourself once you're operating a real warehouse.

## Key terms

| Term | Meaning |
|---|---|
| Physical design | Translating a logical dimensional model into real `CREATE TABLE` DDL, data types, and keys |
| Surrogate key | A warehouse-generated integer key (`IDENTITY`) used for all fact-to-dimension joins |
| Natural/business key | The source system's original key, retained on a dimension for ETL lookups, never used for joins |
| Date key | An `INT` (`YYYYMMDD`) surrogate key joining a fact table to `Dim_Date`, instead of a `DATETIME` column |

## Lab

1. In a scratch database, run the `Dim_Product` and `Fact_Sales`
   `CREATE TABLE` statements above (create a minimal `Dim_Date` and
   `Dim_Customer` first so the foreign keys resolve).
2. Add a `Dim_Date` table with `DateKey INT` as its primary key,
   populated `20200101`-style, and confirm `Fact_Sales.DateKey` joins
   to it cleanly.
3. Compare column widths: what would `SalesAmount` cost in bytes as
   `DECIMAL(19,4)` versus if someone mistakenly modeled it as
   `NVARCHAR(50)`? Multiply the difference by a hypothetical 50 million
   rows to see why the data type choice matters at warehouse scale.

## Check yourself

You're ready for Lesson 32 when you can write a fact table's
`CREATE TABLE` statement from a grain statement alone — correctly
choosing an `INT` date key, `DECIMAL` measures, and surrogate-key
foreign keys to every dimension at that grain — without looking back
at this guide.
