# Lesson 47 — Capstone: Building a Real ETL Package

**Chapter 9 · Capstone · Lesson 47 of 49**

## What you'll learn

- The exact control flow for the capstone package: two tasks, one
  precedence constraint
- The exact data flow inside it: a source query, a lookup, a derived
  column, and a destination — one component from most of Chapters 3–5
- Why the load has to run in this specific order, not some other order
- How to build and run this for real in SSDT, against your own
  AdventureWorks2012 and AdventureWorksDW2014

## The control flow: two tasks, one constraint

Open the `SSIS_Capstone` project from Lesson 46 and build this on the
Control Flow tab:

```
[ Execute SQL Task: Truncate Capstone Fact ]
              |
        (On Success)
              |
              v
     [ Data Flow Task: Load Capstone Fact ]
```

1. **Execute SQL Task** (Chapter 2, Lesson 8) — connects to
   `AdventureWorksDW2014` and runs `TRUNCATE TABLE
   dbo.CapstoneFactOrderSales;`. This lesson does a full reload every
   run; Lesson 48 replaces this with an incremental pattern that doesn't
   need to truncate anything.
2. **A green success precedence constraint** (Chapter 2, Lesson 12)
   connects it to the Data Flow Task. If the truncate fails, the data
   flow never runs — you're not left with half a load.
3. **A Data Flow Task** (Chapter 3) does the actual work, detailed below.

## The data flow: source, lookup, derived column, destination

Double-click the Data Flow Task and switch to the Data Flow tab:

```
[ OLE DB Source ]  -->  [ Lookup: Product ]  -->  [ Derived Column ]  -->  [ OLE DB Destination ]
   (AW2012)              (CapstoneDimProduct)     (DateKey, Amount)         (CapstoneFactOrderSales)
```

1. **OLE DB Source** (Chapter 3, Lesson 16), against the
   `AdventureWorks2012` connection manager. Set **Data access mode** to
   **SQL command** and paste in this query:

   ```sql
   SELECT
       soh.SalesOrderID,
       soh.OrderDate,
       sod.ProductID,
       sod.OrderQty,
       sod.UnitPrice,
       sod.LineTotal
   FROM Sales.SalesOrderHeader AS soh
   JOIN Sales.SalesOrderDetail AS sod
       ON sod.SalesOrderID = soh.SalesOrderID;
   ```

   ![The OLE DB Source Editor with Data access mode set to SQL command and an empty SQL command text box, plus Parameters, Build Query, Browse, and Parse Query buttons.](/courses/ssis/ch09/47-capstone-building-a-real-etl-package/ole-db-source-sql-command.jpg)
   *The SQL command text box — this is exactly where the join query above goes.*

   Switch to the editor's **Columns** page and confirm all six columns
   — `SalesOrderID`, `OrderDate`, `ProductID`, `OrderQty`, `UnitPrice`,
   `LineTotal` — are checked as output columns:

   ![The OLE DB Source Editor's Columns page, with a checklist of Available External Columns and a mapping grid of External Column to Output Column underneath.](/courses/ssis/ch09/47-capstone-building-a-real-etl-package/ole-db-source-columns.jpg)
   *Every checked column here becomes an output column the rest of the data flow can reference.*

2. **Lookup Transformation** (Chapter 4, Lesson 19), against the
   `AdventureWorksDW2014` connection manager, matching incoming
   `ProductID` to `CapstoneDimProduct.ProductID` and adding
   `ProductKey` to the pipeline. Rows with no match go to the Lookup's
   error output for now — Lesson 48 is where that stops being ignored.
   (Lesson 19 already has four real screenshots of this exact editor —
   General, Connection, Columns pages, and the Match/No Match output
   picker — so they aren't repeated here.)
3. **Derived Column** (Chapter 4, Lesson 21) adding two new columns:
   - `DateKey` = `(DT_I4)(YEAR(OrderDate) * 10000 + MONTH(OrderDate) *
     100 + DAY(OrderDate))` — matching `DimDate`'s `yyyymmdd` integer
     format exactly.
   - `ExtendedAmount` = `OrderQty * UnitPrice`

   ![The Derived Column Transformation Editor, with the Date/Time Functions folder expanded to YEAR(<date>) and a grid of Derived Column Name, Derived Column, Expression, and Data Type.](/courses/ssis/ch09/47-capstone-building-a-real-etl-package/derived-column-editor.png)
   *Same editor, same YEAR() function your DateKey expression uses — add one row per new column, each with its own expression.*

4. **OLE DB Destination** (Chapter 3, Lesson 16), against
   `AdventureWorksDW2014`, mapped to `dbo.CapstoneFactOrderSales`:
   `SalesOrderID`, `DateKey`, `ProductKey`, `OrderQty`, and
   `ExtendedAmount`.

   ![The OLE DB Destination Editor's Mappings page, with a drag-to-map diagram between Available Input Columns and Available Destination Columns, plus an Input Column to Destination Column grid below.](/courses/ssis/ch09/47-capstone-building-a-real-etl-package/ole-db-destination-mappings.png)
   *The Mappings page — every column the fact table needs gets paired up here before the destination will let you close the editor.*

## Why this order, specifically

The Lookup has to happen *before* the destination because
`CapstoneFactOrderSales` stores `ProductKey`, not `ProductID` — there's
no surrogate key to write until the lookup resolves one. The Derived
Column can happen before or after the Lookup (it doesn't depend on it),
but doing it after keeps every column the destination needs sitting
together in the pipeline right before the final mapping — easier to
audit visually in the designer. This is the same reasoning Chapter 4
covered lookup-then-shape ordering with; the capstone just makes it a
real trade-off instead of an abstract one.

## Key terms

| Term | Meaning |
|---|---|
| Precedence constraint | The line between two control flow tasks that says whether/when the second one runs |
| Lookup transformation | Matches a business key against a reference table and adds columns from the match |
| Derived column | Adds a new computed column to the pipeline using an SSIS expression |
| Full load | Reloading a destination completely on every run — what this lesson's truncate step does |

## Lab

Build the package above for real:

1. Add both tasks to the Control Flow tab and wire the success
   precedence constraint between them.
2. Build the data flow exactly as described, using the query above for
   the source.
3. Run the package in SSDT (F5). A successful run puts a green
   checkmark on every component and a row count on every path between
   them:

   ![A Data Flow tab after a successful run, with green checkmarks on the OLE DB Source and OLE DB Destination and a row-count label on the path between them.](/courses/ssis/ch09/47-capstone-building-a-real-etl-package/data-flow-success-checkmarks.png)
   *Green checkmarks and a row count on every path mean the run completed — your own path has two more components in between (Lookup, Derived Column), but the same checkmarks appear on each.*

   Confirm rows land in `dbo.CapstoneFactOrderSales` by querying it
   directly:

   ```sql
   SELECT COUNT(*) FROM dbo.CapstoneFactOrderSales;
   ```
4. Run it a second time. Confirm the row count doesn't double — the
   truncate step should mean it stays exactly the same, since this is a
   full reload, not an incremental one yet.

## Check yourself

You're ready for Lesson 48 when your package runs cleanly end to end,
and you can explain why the Lookup transformation has to run before the
data reaches the OLE DB Destination — not after.
