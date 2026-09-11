# Script — Capstone: Building a Real ETL Package

## Segment 1 (title)

Last lesson set the scope. This lesson, we actually build it — a real
control flow, a real data flow, running against your own
AdventureWorks2012 and AdventureWorksDW2014. By the end, you'll have a
package that genuinely loads data, end to end.

## Segment 2 (steps: control-flow)

The control flow is deliberately simple: two tasks. An Execute SQL Task
truncates the CapstoneFactOrderSales table in the warehouse, and a
green success precedence constraint connects it to a Data Flow Task
that does the actual load. That constraint matters more than it looks —
if the truncate fails for any reason, the data flow simply never runs,
so you never end up with a half-truncated, half-loaded table sitting in
an inconsistent state.

## Segment 3 (steps: data-flow)

Inside that Data Flow Task, four components do the real work. An OLE
DB Source runs a query joining SalesOrderHeader and SalesOrderDetail in
AdventureWorks2012 — real order rows, no dimensional shape yet. A
Lookup transformation matches each row's ProductID against
CapstoneDimProduct and adds a resolved ProductKey — and it has to
happen before the destination, because there's no surrogate key to
write until that lookup runs. A Derived Column builds two new columns:
a DateKey in the same yyyymmdd integer format DimDate already uses, and
an ExtendedAmount computed from quantity times unit price. And an OLE
DB Destination writes the finished row into CapstoneFactOrderSales.

## Segment 4 (outro)

Run it, and query the fact table directly to confirm rows actually
landed. Run it a second time, and the row count should stay exactly the
same — that's the truncate step doing its job on every full reload.
Next lesson, we stop truncating altogether and make this incremental
instead, and we stop silently ignoring the rows that don't match.
