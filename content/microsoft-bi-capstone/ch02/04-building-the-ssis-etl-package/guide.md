# Lesson 4 — Building the SSIS ETL Package

**Chapter 2 · Building the Full Stack · Lesson 4 of 25**

## What you'll learn

- The shape of `WorkOrderETL.dtsx`, the one SSIS package this
  capstone's pipeline runs on
- Why it needs **two** Data Flow Tasks, not one, and what each is
  responsible for
- How the Lookup transformation pattern SSIS Development already
  taught resolves surrogate keys during the second Data Flow Task
- What Lesson 5's warehouse tables need to already exist before this
  package's second Data Flow Task can run successfully

## One package, two Data Flow Tasks

`WorkOrderETL.dtsx` is a single SSIS package, but it does two genuinely
different jobs, and — following the same separation of concerns Lesson
3 argued for staging — those jobs live in two separate Data Flow Tasks
on the Control Flow surface, connected by a precedence constraint so
the second only runs after the first succeeds.

Every data flow, no matter which task it lives in, is built from the
same three kinds of components:

![Diagram of SSIS data flow components — a Source with external columns and an output, a Transformation with an input and an output plus an error output, and a Destination with an input and an error output, all connected by paths carrying output and input columns.](/courses/microsoft-bi-capstone/ch02/04-building-the-ssis-etl-package/data-flow-components.gif)
*Sources, a transformation, and destinations — the same shape both of this package's Data Flow Tasks use.*

## Data Flow Task 1: landing the raw rows

This is Lesson 3's payoff. The first Data Flow Task does exactly one
job — get `Production.WorkOrder` into `stg.WorkOrder`, unchanged:

- **OLE DB Source** — connection manager pointed at `AdventureWorks2012`,
  data access mode **Table or view**, source object
  `Production.WorkOrder`.
- **OLE DB Destination** — connection manager pointed at the warehouse
  SQL Server instance, data access mode **Table or view - fast load**,
  destination table `stg.WorkOrder`, with every source column mapped
  straight across on the Mappings page.

No transformation sits between them. This task's only responsibility
is extraction and landing — exactly the "extract as-is, stage before
transforming" pattern Lesson 3 set up.

## Data Flow Task 2: resolving surrogate keys

The second Data Flow Task is where the real transformation work
happens, reading from `stg.WorkOrder` instead of the OLTP source:

- **OLE DB Source** — `stg.WorkOrder`, now that Task 1 has populated
  it.
- **Lookup: Product** — matches the staged `ProductID` against
  `dw.DimProduct.ProductAlternateKey` (full cache, since `DimProduct`
  is small), adding the resolved `ProductKey` to the pipeline.
- **Lookup: ScrapReason** — matches the staged `ScrapReasonID` against
  `dw.DimScrapReason.ScrapReasonAlternateKey`. Unlike the Product
  lookup, this one is configured to **redirect rows to no match output**
  instead of failing — a work order with nothing scrapped has no
  `ScrapReasonID` at all, and that has to flow through as a genuine
  `NULL` on `dw.FactWorkOrder.ScrapReasonKey`, not an error.
- **OLE DB Destination** — `dw.FactWorkOrder`, receiving the resolved
  `ProductKey` and `ScrapReasonKey` alongside `WorkOrderID`, the three
  date keys, and the three quantity measures.

This is the same Lookup pattern SSIS Development's Chapter 4 taught for
resolving a fact table's foreign keys from a staged source — applied
here to a new business process's dimensions instead of a repeat of that
course's own example.

## What has to exist before this runs

This package's second Data Flow Task will fail immediately if
`dw.DimProduct`, `dw.DimScrapReason`, and `dw.FactWorkOrder` don't
already exist with the right shape — a Lookup transformation can't
resolve a key against a table that isn't there. Lesson 5 builds the
staging table's remaining columns and both dimension tables; Lesson 6
builds the fact table these Lookups ultimately write into. Build this
package's *design* now, in this lesson, but don't expect Data Flow Task
2 to actually execute successfully until Lesson 6 is done.

## Key terms

| Term | Meaning |
|---|---|
| Data Flow Task | A control flow task that hosts a data flow — the sources, transformations, and destinations that actually move rows |
| Precedence constraint | The connector between two control flow tasks controlling whether/when the second runs relative to the first |
| Lookup transformation | A data flow component that joins pipeline rows against a reference dataset to resolve a related value, row by row |
| Redirect rows to no match output | A Lookup setting that routes unmatched rows to a separate output instead of failing the component |

## Lab

1. In SSDT, create a new Integration Services project and add a package
   named `WorkOrderETL.dtsx`.
2. Add two **Data Flow Task** components to the Control Flow surface,
   named `DFT Load Staging` and `DFT Load Warehouse`, connected by a
   precedence constraint (success) from the first to the second.
3. Inside `DFT Load Staging`, add an OLE DB Source pointed at
   `Production.WorkOrder` and an OLE DB Destination pointed at
   `stg.WorkOrder` (from Lesson 3). Map every column.
4. Inside `DFT Load Warehouse`, add an OLE DB Source pointed at
   `stg.WorkOrder`. Don't configure the Lookups yet — Lesson 5 and 6
   build the tables they need to reference first.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
does this package need two separate Data Flow Tasks instead of one,
and what specifically would break if the ScrapReason Lookup failed
unmatched rows instead of redirecting them?
