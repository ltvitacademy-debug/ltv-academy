# Script — Modeling Relational Data as a Graph

## Segment 1 (title)

This lesson closes Chapter Ten with a full worked example, converting a small, ordinary relational schema into an actual graph model. The schema is deliberately familiar — Customers, Orders, OrderItems, Products — the same shape as the migration warning from Lesson 52, worked through properly this time.

## Segment 2 (code: the relational starting point)

Orders has a foreign key to Customers, and OrderItems is a classic junction table resolving the many-to-many relationship between Orders and Products, holding Quantity as the one piece of data specific to that pairing.

## Segment 3 (steps: applying the test)

Customers, Products, and Orders each have independent identity and are referenced from multiple places, so they become nodes. OrderItems is the key insight — a junction table whose only job is connecting two other tables maps directly onto a relationship, not a node. Quantity doesn't need its own node; it becomes a property on that relationship.

## Segment 4 (code: the resulting graph)

Foreign keys become relationships, not properties — Orders.CustomerId becomes a PLACED relationship, and the OrderItems junction becomes a CONTAINS relationship carrying quantity. No OrderItems node exists, and no foreign key columns anywhere — the junction table's purpose survives entirely inside that one relationship.

## Segment 5 (outro)

A question like 'what did this customer buy and how much of each' is now a direct three-hop traversal, with no JOIN involved at all. That closes Chapter Ten. Next up, Chapter Eleven: Cypher query language basics, starting with MATCH and RETURN.
