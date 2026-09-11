# Lesson 9 — Accumulating Snapshot Facts

**Chapter 2 · Fact Tables · Lesson 9 of 39**

## What you'll learn

- What an accumulating snapshot fact table is, and why order
  fulfillment, ticket handling, and similar pipelines are its textbook
  use case
- Why this type needs *multiple* date dimension keys, one per
  milestone, and how "not reached yet" gets represented
- Why the ETL pattern is fundamentally different — update in place,
  not insert-only
- Why its measures are usually durations between milestones, not raw
  amounts

## A process with a defined start and end

Some business processes aren't single events, and they aren't
regular-interval snapshots either — they're a pipeline with a
beginning, a predictable sequence of stages, and an end. An order gets
placed, picked, shipped, and delivered. A support ticket gets opened,
assigned, worked, and closed. Microsoft's guidance describes exactly
this shape: a process that "might take days, weeks, or even months to
complete," where you want to track its progress through milestones.
The **accumulating snapshot fact table** is built for this: one row per
process instance — one row per order, one row per ticket — that gets
*updated* every time the process reaches its next milestone, until it
finally completes.

## The stages, as milestones

Picture one order moving through fulfillment:

Order Placed → Picked → Shipped → Delivered

A single fact row is inserted as soon as the order is placed. As that
same order gets picked, then shipped, then delivered, the *same row*
gets updated each time — its `PickDate_FK` gets filled in when picking
happens, `ShipDate_FK` when it ships, and so on. Until a milestone
happens, its date key holds a special "N/A" member (Chapter 3 covers
these special dimension members properly) rather than a real date —
you can't reference a shipment date that hasn't occurred yet.

## Designing one in T-SQL

```sql
CREATE TABLE f_OrderFulfillment
(
    -- Dimension keys (one per milestone)
    OrderDate_Date_FK    INT NOT NULL,
    PickDate_Date_FK      INT NOT NULL,
    ShipDate_Date_FK       INT NOT NULL,
    DeliverDate_Date_FK     INT NOT NULL,
    Customer_FK              INT NOT NULL,

    -- Attributes
    SalesOrderNo              INT NOT NULL,

    -- Measures (durations between milestones)
    DaysToPickAfterOrder       INT NULL,
    DaysToShipAfterPick        INT NULL,
    DaysToDeliverAfterShip     INT NULL
);
```

Every milestone gets its own date dimension key — this is a
**role-playing dimension** (Chapter 3), the same physical Date
dimension referenced four separate times, once per role. And notice
the measures aren't raw dollar amounts; they're **durations between
milestones**. That's what an accumulating snapshot is actually good at
measuring: how long an order sat at each stage of its pipeline, which
is the real operational question a business asks about a fulfillment
process.

## Why the ETL pattern is different

This is the one fact table type that isn't insert-only. The load
process has to:

1. Insert a new row the moment the process starts (order placed).
2. Find that exact row again every time a milestone happens, and
   `UPDATE` it — filling in the next date key and recalculating the
   relevant duration measure.
3. Stop updating once the process reaches its final milestone
   (delivered).

That's a genuinely different ETL design than a transaction table's
"just insert the new rows" or a periodic snapshot's "insert a whole new
batch on schedule" — and it's the reason accumulating snapshots are
usually reserved for processes worth this extra ETL complexity.

## Key terms

| Term | Meaning |
|---|---|
| Accumulating snapshot fact table | One row per process instance, updated as it reaches each milestone |
| Milestone | A defined stage in a business process, each with its own date dimension key |
| Role-playing dimension | The same physical dimension referenced multiple times, once per role (e.g. four date roles here) |

## Lab

Design the milestone sequence and grain statement for a support-ticket
fact table (opened → assigned → in progress → closed). List which
columns should be date dimension keys and which should be duration
measures.

## Check yourself

You're ready for Lesson 10 when you can explain why an accumulating
snapshot table requires an `UPDATE`-based load instead of insert-only,
and why its date dimension keys are an example of a role-playing
dimension.
