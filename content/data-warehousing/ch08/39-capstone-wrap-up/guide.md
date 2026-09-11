# Lesson 39 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 8 · Capstone · Lesson 39 of 39 — Course Finale**

## What you'll learn

- How to check the finished design against Lesson 36's original scope
- How to present this project the way a real employer would want to
  see it — not just "it's a schema," but "here's what it demonstrates"
- How to turn four lessons of work into a specific set of resume and
  portfolio talking points
- Where to go next in this catalog, now that Data Modeling & Data
  Warehousing is complete

## Checking against Lesson 36's scope

Pull Lesson 36's scope table back up and confirm, row by row, that the
finished design actually does what it set out to do:

| Step | What Lesson 36 promised | What the design does now |
|---|---|---|
| Business process | Procurement — ordering products from vendors and receiving them into inventory | Modeled from the real `Purchasing` schema in `AdventureWorks2012`, not reused from Sales (Lesson 37) |
| Grain | Declared precisely | One row per purchase order line — `Purchasing.PurchaseOrderDetail` grain, stated in one sentence (Lesson 37) |
| Dimensions | Vendor, Product, Date, Employee, Ship Method (candidates) | Five real dimension tables, each with an explicit SCD type decision — Vendor (Type 2), Product (Type 1, conformed), Employee (Type 1), Ship Method (Type 0), Date (conformed) (Lesson 37) |
| Facts | Quantity, price, line total, received/rejected quantity (candidates) | An accumulating snapshot fact table — `FactPurchaseOrderLine` — with milestone dates and measures that update as a line is received (Lesson 37) |
| Deliverable | A real, physically buildable star schema | Six `CREATE TABLE` statements, two indexes, and a partition scheme — all runnable T-SQL (Lesson 38) |

If every row in that table has a real answer, the design is done — not
because it has extra features nobody asked for, but because it does
exactly what Lesson 36 scoped, and does it as one coherent star schema
rather than a pile of unrelated tables.

## Presenting it like a real project

A finished schema on a screen isn't the same thing as a design someone
else can evaluate in five minutes. When you show this off — to a
mentor, in an interview, or just to future-you — walk through it in
this order:

1. **State the problem in one sentence**, not the implementation:
   "This is a dimensional model for AdventureWorks' procurement
   process — ordering products from vendors and tracking what's
   actually been received."
2. **Show the grain and the dimension list first**, and explain the
   SCD type behind each dimension in plain language — which
   dimensions need history, and why.
3. **Show the fact table second**, and be ready to explain *why* it's
   an accumulating snapshot instead of a plain transaction fact — that
   one classification is a fair proxy for whether you actually
   understand fact table design, not just `CREATE TABLE` syntax.
4. **Show the indexing and partitioning last**, and frame them as the
   difference between "a schema that's technically correct" and "a
   schema that would actually perform at scale in production." That
   framing is the whole point of Lesson 38.

## Turning this into resume and portfolio language

You can't attach a live SQL Server database to a resume, but you can
describe this design precisely. A version worth using:

> Designed and built a dimensional data warehouse schema for a
> procurement business process against SQL Server AdventureWorks
> data: an accumulating snapshot fact table tracking purchase order
> lines through receipt, with five supporting dimensions using
> Type 0/1/2 slowly changing dimension strategies, a conformed
> product dimension, clustered columnstore indexing, and date-range
> partitioning.

Every clause in that sentence maps back to something you actually
designed and built in Lessons 37-38, not something you're claiming.
If you keep the six `CREATE TABLE` scripts, the index and partition
statements, and a short README describing the scope table above,
that's a real, inspectable portfolio artifact.

## What you've built, across eight chapters

Chapter 1 taught you why a warehouse exists at all and how to run the
four-step business process modeling sequence this capstone just
applied for real. Chapter 2 gave you the fact table type vocabulary —
transaction, periodic snapshot, accumulating snapshot, factless — that
led directly to this capstone's fact table classification. Chapter 3
gave you surrogate keys and dimension design fundamentals; Chapter 4
gave you the SCD types this capstone assigned to every dimension.
Chapter 5 covered the staging layer a real load of this design would
run through before landing in these tables. Chapter 6 covered the
advanced patterns — junk dimensions, role-playing dimensions, bridge
tables, late-arriving dimensions — that a larger version of this
warehouse would eventually need. Chapter 7 gave you the physical
design, indexing, and partitioning decisions this capstone's Lesson 38
put directly into practice.

## Where to go from here

- **Microsoft Data & BI Capstone + Job Preparation**, this catalog's
  next course, is where a project like this one gets folded into a
  full portfolio alongside your T-SQL, SSIS, SSRS, and Power BI work —
  plus resume, portfolio, and interview preparation for a first
  Microsoft BI Developer role.
- If you want more practice with this same pattern, rebuild it against
  a different business process in `AdventureWorks2012` —
  `Production.WorkOrder` (manufacturing) is a strong candidate, with
  its own natural accumulating-snapshot shape (scheduled, started,
  completed) — using the identical
  Process/Grain/Dimensions/Facts/Physical-Schema shape this capstone
  followed.

## Check yourself

The course is complete when you can hand someone the six `CREATE
TABLE` scripts and the scope table above, and they can tell — without
you explaining it out loud — exactly what business process this
warehouse measures, why the fact table is an accumulating snapshot,
and which dimension is the one tracking history.

Congratulations — you've designed and built a real dimensional
warehouse, start to finish.
