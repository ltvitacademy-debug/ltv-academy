# Script — Project 2: Building the Target Warehouse

## Segment 1 (title)

The same star schema idea, at a harder version: one fact table, one fixed grain — one row per order line — surrounded by dimensions built from the crosswalk, not copied from either source directly.

## Segment 2 (code: the conformed dimensions)

DimCustomer comes from the CRM through the crosswalk. DimProduct comes from the inventory system's SKUs. Every foreign key in FactOrders points at a conformed key, never at a raw source identifier.

## Segment 3 (code: loading in dependency order)

Customers load first, inventory in parallel, orders last — not for timing, but because writing an order-line row requires a valid customer_key and product_key that only exist once the crosswalk has resolved them.

## Segment 4 (code: verifying against reconciliation)

The nightly reconciliation query now has something real to check: FactOrders' totals against the legacy system's totals, every night during the coexistence period — the first real signal this warehouse is trustworthy.

## Segment 5 (outro)

A target warehouse built on conformed keys, loaded in the order the dependencies demand. Next up: planning the actual cutover strategy.
