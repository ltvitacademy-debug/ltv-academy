# Lesson 37 — Capstone: Modeling a Real Business Process

**Chapter 8 · Capstone · Lesson 37 of 39**

## What you'll learn

- How to declare a precise grain statement for the procurement process,
  the way Lesson 4 taught
- The full dimension list for this capstone, with an SCD type decision
  for each one, using Chapter 4's concepts
- Why this fact table is an **accumulating snapshot**, not a plain
  transaction fact — using Chapter 2's classification
- Which dimension is **conformed** with the sales side of the business
  (Lesson 15), and which attributes stay directly on the fact table as
  **degenerate dimensions** (Lesson 14)

## Step 2: declare the grain

Lesson 4 was clear about this: declare the grain in one sentence,
before naming a single dimension or fact, or the rest of the design
drifts. For this capstone:

> **The grain is one row per purchase order line — one row per product
> ordered on one purchase order.**

That maps directly onto `Purchasing.PurchaseOrderDetail`: one real row
per `(PurchaseOrderID, PurchaseOrderDetailID)` pair, not one row per
purchase order and not one row per vendor per day. Getting this
declared and written down first is what keeps every dimension and fact
decision below consistent with each other.

## Step 3: identify the dimensions

| Dimension | Source | SCD type | Why |
|---|---|---|---|
| `DimDate` | Conformed calendar (same pattern as `AdventureWorksDW2014`'s real `DimDate`) | N/A — static | A calendar doesn't change; it's built once and reused everywhere |
| `DimVendor` | `Purchasing.Vendor` | **Type 2** | `CreditRating` and `PreferredVendorStatus` genuinely change over a vendor relationship's life, and this warehouse needs to know what a vendor's status *was* on the order date, not just what it is today (Chapter 4) |
| `DimProduct` | `Production.Product` | **Type 1** | Attributes like `Color` or `ListPrice` overwrite in place — this capstone doesn't need to track product history, just the current description, and this dimension is the same one the sales side of the business would use |
| `DimEmployee` | `HumanResources.Employee` + `Person.Person` | **Type 1** | The buyer's name and job title overwrite on change; no history tracking needed for a purchasing agent |
| `DimShipMethod` | `Purchasing.ShipMethod` | **Type 0** | A tiny, essentially static reference table — "Ground," "Overnight" — that almost never changes (Chapter 4's Type 0 lesson) |

Two design decisions are worth calling out explicitly:

**`DimProduct` is a conformed dimension (Lesson 15).** The same
products AdventureWorks sells, it also buys components and finished
goods for. Building `DimProduct` from `Production.Product` with the
same attribute names a sales-side warehouse would use (`ProductKey`,
`EnglishProductName`, `Color`, `ListPrice`, `StandardCost`) means this
fact table and a future sales fact table could both join to the exact
same dimension — one governed definition of "product," not two.

**Purchase order number and line status are degenerate dimensions
(Lesson 14).** `PurchaseOrderID`, `RevisionNumber`, and `Status` don't
describe a vendor, a product, or a date — they identify the order
itself. They don't get their own dimension table; they ride directly on
the fact table as degenerate dimensions, exactly like an invoice number
in a classic Kimball example.

## Step 4: identify the facts, and choose the fact table type

`Purchasing.PurchaseOrderDetail` carries `OrderQty`, `UnitPrice`,
`LineTotal`, `ReceivedQty`, `RejectedQty`, and `StockedQty`. Those are
the candidate measures. The interesting design decision is the fact
table **type** (Chapter 2), and it comes straight from something
Lesson 36 flagged: a purchase order line doesn't get written once and
sit still. It's placed, then partially received over one or more
deliveries, sometimes with a rejected quantity recorded against it.

That lifecycle — one row, several milestone events, values that update
as the row progresses — is the exact definition of an **accumulating
snapshot fact table** (Lesson 9), not a plain transaction fact (Lesson
7, one immutable row per event) and not a periodic snapshot (Lesson 8,
a fresh row every period regardless of activity). The design:

| Element | Decision |
|---|---|
| Fact table type | Accumulating snapshot |
| Milestone dates | `OrderDateKey`, `DueDateKey`, `ShipDateKey` — the last two update (or stay unresolved, pointing at an "unknown/not yet" date row) as the line progresses |
| Measures | `OrderQty`, `UnitPrice`, `LineTotal`, `ReceivedQty`, `RejectedQty`, `StockedQty` |
| Degenerate dimensions | `PurchaseOrderID`, `PurchaseOrderDetailID`, `RevisionNumber`, `Status` |

`ReceivedQty` and `RejectedQty` in particular are the columns that get
**updated in place** as a line moves toward being fully received —
textbook accumulating-snapshot behavior, and a clean, real example to
have worked through by the time you're asked "what's the difference
between the three fact table types" in an interview.

## Key terms

| Term | Meaning |
|---|---|
| Grain | The precise definition of what one fact table row represents |
| Accumulating snapshot | A fact table type tracking a process with a defined lifecycle, where milestone dates and measures update in place as the row progresses |
| Conformed dimension | A dimension built once with a shared definition, reused unchanged across more than one fact table |
| Degenerate dimension | An identifying attribute (like an order number) kept directly on the fact table instead of in its own dimension table |

## Lab

1. Against `AdventureWorks2012`, confirm the accumulating-snapshot
   behavior directly:
   ```sql
   SELECT TOP 20 PurchaseOrderID, PurchaseOrderDetailID, OrderQty,
          ReceivedQty, RejectedQty, StockedQty
   FROM Purchasing.PurchaseOrderDetail
   WHERE ReceivedQty > 0 AND ReceivedQty < OrderQty
   ORDER BY PurchaseOrderID;
   ```
   These are lines that have been partially, but not fully, received —
   proof the row's measures genuinely change after the order is placed.
2. Write out, in your own words, the grain statement for this capstone
   and the SCD type decision for each of the five dimensions above,
   before moving on to Lesson 38.

## Check yourself

You're ready for Lesson 38 when you can state the grain in one
sentence, list all five dimensions with their SCD type and a one-line
reason for each, and explain — without looking — why this fact table is
an accumulating snapshot rather than a transaction fact.
