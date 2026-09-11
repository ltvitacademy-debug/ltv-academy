# Lesson 38 — Capstone: Building the Physical Schema

**Chapter 8 · Capstone · Lesson 38 of 39**

## What you'll learn

- How to turn Lesson 37's logical design into real `CREATE TABLE`
  statements, dimension by dimension
- How surrogate keys, natural keys, and SCD Type 2 tracking columns
  actually look in T-SQL (Chapter 3)
- The indexing decisions this fact table needs, and why (Lesson 32)
- Why the fact table gets partitioned, and on which column (Lesson 33)

## Building the dimensions

Every dimension below follows the same shape: an identity **surrogate
key** as the primary key (Chapter 3), the OLTP **natural key** kept as
an alternate key for lookups during ETL, and — for `DimVendor` only —
the Type 2 tracking columns Chapter 4 covers (`EffectiveDate`,
`ExpirationDate`, `IsCurrent`).

```sql
-- Conformed calendar dimension, same pattern as AdventureWorksDW2014's real DimDate
CREATE TABLE dw.DimDate (
    DateKey            INT          NOT NULL PRIMARY KEY,   -- e.g. 20130615
    FullDate           DATE         NOT NULL,
    DayNumberOfMonth    TINYINT      NOT NULL,
    EnglishDayNameOfWeek NVARCHAR(10) NOT NULL,
    MonthNumberOfYear  TINYINT      NOT NULL,
    EnglishMonthName   NVARCHAR(10) NOT NULL,
    CalendarQuarter    TINYINT      NOT NULL,
    CalendarYear       SMALLINT     NOT NULL
);

-- SCD Type 2: EffectiveDate / ExpirationDate / IsCurrent track vendor history
CREATE TABLE dw.DimVendor (
    VendorKey             INT IDENTITY(1,1) PRIMARY KEY,
    VendorAlternateKey    INT          NOT NULL,   -- Purchasing.Vendor.BusinessEntityID
    VendorName             NVARCHAR(50) NOT NULL,
    AccountNumber          NVARCHAR(15) NOT NULL,
    CreditRating           TINYINT      NOT NULL,
    PreferredVendorStatus  BIT          NOT NULL,
    EffectiveDate          DATE         NOT NULL,
    ExpirationDate         DATE         NULL,
    IsCurrent              BIT          NOT NULL DEFAULT 1
);

-- Conformed with the sales side of the business; SCD Type 1 (overwrite)
CREATE TABLE dw.DimProduct (
    ProductKey          INT IDENTITY(1,1) PRIMARY KEY,
    ProductAlternateKey INT          NOT NULL,   -- Production.Product.ProductID
    EnglishProductName  NVARCHAR(50) NOT NULL,
    Color               NVARCHAR(15) NULL,
    StandardCost        MONEY        NOT NULL,
    ListPrice           MONEY        NOT NULL
);

-- SCD Type 1 (overwrite) — the purchasing agent who placed the order
CREATE TABLE dw.DimEmployee (
    EmployeeKey          INT IDENTITY(1,1) PRIMARY KEY,
    EmployeeAlternateKey INT          NOT NULL,   -- HumanResources.Employee.BusinessEntityID
    FullName              NVARCHAR(100) NOT NULL,
    JobTitle              NVARCHAR(50)  NOT NULL,
    HireDate              DATE          NOT NULL
);

-- SCD Type 0 — small, essentially static reference dimension
CREATE TABLE dw.DimShipMethod (
    ShipMethodKey          INT IDENTITY(1,1) PRIMARY KEY,
    ShipMethodAlternateKey INT          NOT NULL,   -- Purchasing.ShipMethod.ShipMethodID
    ShipMethodName          NVARCHAR(50) NOT NULL
);
```

## Building the fact table

The fact table follows Lesson 37's decisions exactly: an accumulating
snapshot grain of one row per purchase order line, three milestone
date keys, the measures that update as a line progresses, and the
degenerate dimensions riding directly on the row instead of getting
their own table.

```sql
CREATE TABLE dw.FactPurchaseOrderLine (
    PurchaseOrderLineKey INT IDENTITY(1,1) PRIMARY KEY,

    -- Dimension foreign keys (surrogate keys, not natural keys)
    VendorKey       INT NOT NULL REFERENCES dw.DimVendor(VendorKey),
    ProductKey      INT NOT NULL REFERENCES dw.DimProduct(ProductKey),
    EmployeeKey     INT NOT NULL REFERENCES dw.DimEmployee(EmployeeKey),
    ShipMethodKey   INT NOT NULL REFERENCES dw.DimShipMethod(ShipMethodKey),

    -- Milestone dates (accumulating snapshot) — nullable until that
    -- milestone happens, pointing at an "unknown" row in DimDate until then
    OrderDateKey    INT NOT NULL REFERENCES dw.DimDate(DateKey),
    DueDateKey      INT NULL     REFERENCES dw.DimDate(DateKey),
    ShipDateKey     INT NULL     REFERENCES dw.DimDate(DateKey),

    -- Degenerate dimensions — identify the order itself, no own table
    PurchaseOrderID       INT      NOT NULL,
    PurchaseOrderDetailID INT      NOT NULL,
    RevisionNumber        TINYINT  NOT NULL,
    Status                 TINYINT  NOT NULL,

    -- Measures — ReceivedQty/RejectedQty/StockedQty update in place
    OrderQty     SMALLINT      NOT NULL,
    UnitPrice    MONEY         NOT NULL,
    LineTotal    MONEY         NOT NULL,
    ReceivedQty  DECIMAL(8,2)  NOT NULL DEFAULT 0,
    RejectedQty  DECIMAL(8,2)  NOT NULL DEFAULT 0,
    StockedQty   DECIMAL(9,2)  NOT NULL DEFAULT 0
);
```

## Indexing decisions (Lesson 32)

This fact table is scanned and aggregated far more than it's looked up
row by row, so it gets indexed the way Lesson 32 recommends for a fact
table, not the way an OLTP table would be:

```sql
-- Rowstore index for the join-heavy path: filter by vendor/date, join to dims
CREATE NONCLUSTERED INDEX IX_FactPurchaseOrderLine_VendorDate
    ON dw.FactPurchaseOrderLine (VendorKey, OrderDateKey)
    INCLUDE (ProductKey, LineTotal, ReceivedQty);

-- Clustered columnstore for full-table analytical aggregation —
-- the standard choice for a large, read-heavy fact table
CREATE CLUSTERED COLUMNSTORE INDEX CCI_FactPurchaseOrderLine
    ON dw.FactPurchaseOrderLine;
```

A clustered columnstore index and a supporting rowstore nonclustered
index aren't mutually exclusive in modern SQL Server — the columnstore
handles broad aggregate scans ("total received quantity by vendor by
quarter"), while a targeted nonclustered index still helps a query that
filters tightly by vendor and date range.

## Partitioning decision (Lesson 33)

`OrderDateKey` is the natural partitioning column here — it's the
column most "by year" or "by quarter" reporting queries filter on, and
it's the column that grows every time new purchase orders are loaded.
Following Lesson 33's pattern:

```sql
CREATE PARTITION FUNCTION PF_PurchaseOrderYear (INT)
    AS RANGE RIGHT FOR VALUES (20110101, 20120101, 20130101, 20140101);

CREATE PARTITION SCHEME PS_PurchaseOrderYear
    AS PARTITION PF_PurchaseOrderYear ALL TO ([PRIMARY]);

-- FactPurchaseOrderLine would then be created ON PS_PurchaseOrderYear (OrderDateKey)
-- instead of ON [PRIMARY], so each year's rows live in their own partition
```

Partitioning by `OrderDateKey` means loading a new year of purchase
orders touches one partition, not the whole table, and a query scoped
to a single year can use partition elimination instead of scanning
everything.

## Key terms

| Term | Meaning |
|---|---|
| Surrogate key | A warehouse-generated integer key (here, an `IDENTITY` column), independent of any OLTP source key |
| Natural / alternate key | The original OLTP key (`BusinessEntityID`, `ProductID`) kept on the dimension for lookup during ETL |
| Clustered columnstore index | A storage format that compresses and organizes fact table data by column instead of by row, built for aggregate scans |
| Partition elimination | The query optimizer skipping partitions that can't contain matching rows, based on a filter on the partitioning column |

## Lab

1. Run every `CREATE TABLE` statement above, in order (dimensions
   before the fact table, so the foreign keys resolve), against a
   scratch database.
2. Add the two indexes and the partition function/scheme, and confirm
   with `sys.indexes` and `sys.partitions` that they were created as
   expected.
3. Write one paragraph explaining why `DimVendor` has `EffectiveDate` /
   `ExpirationDate` / `IsCurrent` columns and `DimProduct` doesn't —
   tying the answer back to Lesson 37's SCD type decisions.

## Check yourself

You're ready for Lesson 39 when you can read the `FactPurchaseOrderLine`
`CREATE TABLE` statement above and explain, column by column, which
group each one belongs to — surrogate FK, milestone date, degenerate
dimension, or measure — without looking at the comments.
