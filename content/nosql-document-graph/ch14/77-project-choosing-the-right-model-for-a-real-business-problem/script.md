# Script — Project: Choosing the Right Model for a Real Business Problem

## Segment 1 (title)

This closing capstone hands you one company with three real data problems and asks you to make the decision a working DBA would actually face — not which database is best, but which real problem each one solves. Meet Meridian Outfitters, a mid-size outdoor gear retailer expanding into the UK, Germany, and Australia.

## Segment 2 (code: a catalog that won't sit still)

Meridian's 40,000 SKUs span categories with completely different attributes — a tent has floor area and pole material, boots have size and lacing system. Modeled relationally, that's mostly-NULL columns or an EAV table degrading performance as it grows. In MongoDB, each product is one document, and a tent's document and a boot's document carry completely different fields side by side.

## Segment 3 (steps: relationships and global reach)

"Customers who bought this also bought" means an expensive multi-hop self-join in SQL Server, getting worse with every extra hop — the same shape fraud review needs to detect a loyalty-abuse ring. Neo4j stores each relationship as a real stored edge, so a two-hop traversal is a cheap pointer-chase. And Meridian's global launch needs cart and session data instantly consistent across continents — Cosmos DB's real differentiator: turnkey multi-region distribution with session consistency.

## Segment 4 (outro)

Nobody asked which database is better — each choice came from the data's actual shape and access pattern, the same discipline this whole course has built since Lesson 1. Next up: connecting all three into one real architecture.
