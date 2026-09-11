# Lesson 36 — Capstone Kickoff

**Chapter 8 · Capstone · Lesson 36 of 39**

## What you'll learn

- The four-step Kimball design process from Lesson 5 — this time applied
  for real, start to finish, instead of walked through in the abstract
- Why this capstone models **Procurement**, not Sales — a genuinely new
  business process, not the one SSIS Development's and SSRS
  Development's capstones already built against
- The exact `AdventureWorks2012` tables this capstone pulls from
- What "scoping" a dimensional model means, and why you declare it in
  writing before designing anything

## Why procurement, and not sales again

SSIS Development's capstone built `CapstoneFactOrderSales`, an
incremental ETL package loading sales orders. SSRS Development's
capstone built a two-report drillthrough suite — `RegionalSalesSummary`
and `OrderDetailByTerritory` — reading `AdventureWorksDW2014`'s real
`FactInternetSales`. Both, reasonably, used the **Sales** business
process, because it's the one AdventureWorks ships a finished warehouse
star for.

This capstone deliberately does something those two didn't: it designs
a warehouse for a business process that **doesn't already have one**.
`AdventureWorksDW2014` ships fact tables for internet sales, reseller
sales, finance, and a few others — but no purchasing fact. The
`Purchasing` schema in `AdventureWorks2012` (the OLTP source) is real,
populated, and completely unmodeled anywhere else in this catalog. That
makes it the right choice for a design capstone: you're not reproducing
a schema you could have copied, you're building one from a business
process that has never been dimensionally modeled here before.

## The four-step process, for real this time

Lesson 5 introduced Kimball's four-step business process modeling
sequence in the abstract. This capstone runs it for real, one lesson at
a time:

1. **Choose the business process** — this lesson.
2. **Declare the grain** — Lesson 37.
3. **Identify the dimensions** — Lesson 37.
4. **Identify the facts** — Lesson 37.

Lesson 38 then takes whatever Lesson 37 decides and turns it into real
`CREATE TABLE` statements. Lesson 39 checks the finished design against
what gets scoped right here.

## The business process: procurement

**Procurement** is the process of ordering products from vendors and
receiving them into inventory — the mirror image of the sales process,
on the buying side of the business instead of the selling side. In
`AdventureWorks2012`, it's captured across a small, specific set of
real tables:

| Table | What it holds |
|---|---|
| `Purchasing.PurchaseOrderHeader` | One row per purchase order — vendor, employee who placed it, order/ship dates, totals |
| `Purchasing.PurchaseOrderDetail` | One row per line item on a purchase order — product, quantity ordered, unit price, and how much has actually been received |
| `Purchasing.Vendor` | The companies AdventureWorks buys from — name, account number, credit rating, preferred-vendor status |
| `Purchasing.ShipMethod` | How a purchase order gets shipped (a small, rarely-changing reference table) |
| `Production.Product` | The products being purchased — shared with the sales side of the business |
| `HumanResources.Employee` | The employee who placed the order, acting as a purchasing agent |

That `PurchaseOrderDetail.ReceivedQty` / `RejectedQty` column pair is
worth noticing now: a purchase order line doesn't just get placed once
and sit still — it gets partially received, sometimes rejected, over
time. That detail matters a great deal once Lesson 37 has to pick a
fact table type for it.

## Scoping the capstone up front

Just like SSIS Development's Lesson 46 and SSRS Development's Lesson
38 scoped their projects before building anything, this capstone scopes
itself here — in enough detail that Lesson 39 can check the finished
model against it line by line:

| Step | Scope for this capstone |
|---|---|
| Business process | Procurement — ordering products from vendors and receiving them into inventory |
| Grain | One row per purchase order line (declared precisely in Lesson 37) |
| Candidate dimensions | Vendor, Product, Date, Employee (buyer), Ship Method |
| Candidate facts | Quantity ordered, unit price, line total, quantity received, quantity rejected |
| Deliverable | A real, physically buildable star schema — `CREATE TABLE` statements for every dimension and the fact table (Lesson 38) |

Nothing here is final yet — "candidate" dimensions and facts get
confirmed, or reshaped, once Lesson 37 actually declares the grain. But
writing the scope down now is what makes Lesson 39's wrap-up a genuine
check instead of a retroactive rationalization.

## Key terms

| Term | Meaning |
|---|---|
| Business process | The real-world operational activity a fact table is built to measure — here, procurement |
| Scope | A written statement of what a design project will and won't cover, fixed before design work starts |
| Conformed dimension | A dimension shared, unchanged, across more than one fact table — `Product` here will conform with the sales side of the business |
| Purchasing schema | The `AdventureWorks2012` schema holding purchase order and vendor tables — the OLTP source for this capstone |

## Lab

1. In SSMS, against `AdventureWorks2012`, run:
   ```sql
   SELECT COUNT(*) AS PurchaseOrders FROM Purchasing.PurchaseOrderHeader;
   SELECT COUNT(*) AS PurchaseOrderLines FROM Purchasing.PurchaseOrderDetail;
   SELECT MIN(OrderDate) AS Earliest, MAX(OrderDate) AS Latest
   FROM Purchasing.PurchaseOrderHeader;
   ```
   Note the row counts and date range — you'll use them in Lesson 37 to
   sanity-check the grain decision.
2. Run `SELECT * FROM Purchasing.Vendor;` and `SELECT * FROM
   Purchasing.ShipMethod;` and skim the columns. Neither table is large;
   both are realistic candidate dimensions.
3. Confirm for yourself that `AdventureWorksDW2014` has no purchasing
   fact table: list its tables (`SELECT name FROM sys.tables ORDER BY
   name;`) and note that every `Fact*` table is sales-, finance-, or
   survey-related. That's the gap this capstone fills.

## Check yourself

You're ready for Lesson 37 when you can state, in one sentence, which
business process this capstone models and why it was chosen over
reusing Sales — and you can name all six real tables involved and what
each one contributes.
