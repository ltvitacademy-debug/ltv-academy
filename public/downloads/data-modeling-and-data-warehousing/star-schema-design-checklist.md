# Star Schema Design Checklist

A fillable checklist for Kimball's four-step dimensional design process
(Chapter 1, Lesson 5): **choose the business process → declare the grain
→ identify the dimensions → identify the facts.** Use it before you write a
single `CREATE TABLE` statement for any new fact table — whether that's a
course exercise, the capstone, or a real warehouse at work.

Fill in the blank template below for your own design. A worked example,
filled in using this course's own capstone (Chapters 8, Lessons 36-38), is
underneath it so you have something concrete to check your answer against.

---

## The blank checklist

### Step 1 — Business process
- **What organizational activity are you measuring?** (Not a department,
  not a report — an operational event. "Procurement," "order fulfillment,"
  "ticket handling.")
- **What real source tables capture this process today?** List them by
  schema and table name.
- **Does a fact table for this process already exist elsewhere in the
  warehouse?** If yes, stop — you may be about to build a duplicate instead
  of something new.

### Step 2 — Declare the grain
- **Write the grain in exactly one sentence**, in the form "one row
  per ___." Do not list columns yet.
- **Sanity-check it**: pick two candidate measures and ask whether each one
  makes sense, once per row, at that grain. If a measure would have to
  repeat identically across several rows, the grain is too fine, or that
  measure belongs on a different table.
- **Watch for "and"/"or" in your own grain sentence.** That's the mixed-grain
  warning sign (Lesson 4) — split into two fact tables instead.

### Step 3 — Identify the dimensions
For every candidate dimension, fill in one row:

| Dimension | Source table(s) | SCD type (0/1/2/3/hybrid) | Why this type | Conformed with another fact table? |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

- **Degenerate dimensions**: any identifying attribute (an order number, a
  line status) that belongs directly on the fact table instead of its own
  table — list them here instead of giving them a row above.
- **Role-playing dimensions**: if the same physical dimension (almost
  always `DimDate`) gets referenced more than once by this fact table, name
  each role here (e.g. Order Date, Due Date, Ship Date) — it's still one
  physical table.

### Step 4 — Identify the facts, and the fact table type
- **List every candidate measure** and mark each one additive, semi-additive,
  or non-additive.
- **Classify the fact table type**: transaction, periodic snapshot,
  accumulating snapshot, or factless. State which one and why in a sentence —
  if the process has a defined start-to-finish lifecycle with milestones that
  get filled in over time, that's your accumulating-snapshot signal
  (Lesson 9).
- **If accumulating snapshot**: list every milestone date and confirm each
  one has its own date dimension key.

### Step 5 — Physical design sanity check (Chapter 7)
- Surrogate key on every dimension? Natural/alternate key retained for ETL
  lookups?
- Indexing plan: clustered columnstore on the fact table, plus any supporting
  nonclustered rowstore index for a known filter pattern?
- Partitioning column identified (almost always the date key) if the fact
  table will grow continuously?

---

## Worked example (filled in, using this course's own capstone scenario)

### Step 1 — Business process
- **Business process:** Procurement — ordering products from vendors and
  receiving them into inventory.
- **Source tables:** `Purchasing.PurchaseOrderHeader`,
  `Purchasing.PurchaseOrderDetail`, `Purchasing.Vendor`,
  `Purchasing.ShipMethod`, `Production.Product`, `HumanResources.Employee`
  (all in `AdventureWorks2012`).
- **Already exists elsewhere?** No — `AdventureWorksDW2014` ships fact
  tables for internet sales, reseller sales, and finance, but nothing for
  purchasing. That gap is why this process was chosen for the capstone.

### Step 2 — Declare the grain
- **Grain:** One row per purchase order line — one row per product ordered
  on one purchase order.
- **Sanity check:** `OrderQty` and `UnitPrice` both make sense once per line.
  A header-level fact like `VendorID` would repeat across every line of the
  same order — expected and fine, since it's a dimension key, not a measure.
- **Mixed-grain check:** No "and"/"or" in the grain sentence. Clean.

### Step 3 — Identify the dimensions

| Dimension | Source table(s) | SCD type | Why this type | Conformed? |
|---|---|---|---|---|
| DimVendor | Purchasing.Vendor | Type 2 | CreditRating and PreferredVendorStatus genuinely change over time, and old fact rows must reflect what was true on the order date | No — purchasing-only |
| DimProduct | Production.Product | Type 1 | No history needed; current description is enough | Yes — shared with the sales side of the business |
| DimEmployee | HumanResources.Employee | Type 1 | Buyer's name/title overwrite on change; no history needed | No |
| DimShipMethod | Purchasing.ShipMethod | Type 0 | Tiny, essentially static reference table | No |
| DimDate | Conformed calendar | N/A — static | Built once, reused everywhere | Yes — used by every fact table in the warehouse |

- **Degenerate dimensions:** `PurchaseOrderID`, `PurchaseOrderDetailID`,
  `RevisionNumber`, `Status` — identify the order itself, not a business
  entity, so they ride directly on the fact row.
- **Role-playing dimensions:** `DimDate` is referenced three times —
  `OrderDateKey`, `DueDateKey`, `ShipDateKey` — one physical table, three
  roles.

### Step 4 — Identify the facts, and the fact table type
- **Measures:** `OrderQty` (additive), `UnitPrice` (non-additive — don't sum
  a price), `LineTotal` (additive), `ReceivedQty` (additive), `RejectedQty`
  (additive), `StockedQty` (additive).
- **Fact table type:** Accumulating snapshot. A purchase order line is
  placed, then partially (or fully) received over one or more deliveries,
  sometimes with a rejected quantity — a defined lifecycle with milestones,
  not a single immutable event.
- **Milestones:** `OrderDateKey` (always known at insert), `DueDateKey` and
  `ShipDateKey` (unresolved — point at DimDate's "unknown" row — until that
  milestone actually happens).

### Step 5 — Physical design sanity check
- Every dimension above gets an `IDENTITY` surrogate key plus its OLTP
  natural key retained as an alternate key.
- `FactPurchaseOrderLine` gets a clustered columnstore index for aggregate
  scans, plus a nonclustered rowstore index on `(VendorKey, OrderDateKey)`
  for the vendor/date filter path.
- Partitioned on `OrderDateKey`, since purchase orders accumulate every year
  and most reporting filters by date range.

See this course's Worked Example Library for the full `CREATE TABLE`
statements this checklist led to, and a second, independently-designed
example (the manufacturing work order process) that applies the exact same
checklist to a different business process.
