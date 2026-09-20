# Script — Why Graph Databases? Nodes, Relationships & Properties

## Segment 1 (title)

Document and multi-model databases still organize data as records, even flexible nested ones. Graph databases are a genuinely different shape. This lesson introduces Neo4j starting with the three building blocks everything else is built on: nodes, relationships, and properties.

## Segment 2 (code: the three building blocks)

Nodes represent entities and carry one or more labels, roughly like a table name. Relationships connect two nodes and are always directed and typed in Neo4j — exactly one relationship type, like PURCHASED. And properties are key-value data that can live on both nodes and relationships, which genuinely surprises relational-trained DBAs — a PURCHASED relationship can carry its own date and quantity.

## Segment 3 (code: stored, not computed)

In a relational database a relationship is implicit — a foreign key resolved via a JOIN at query time, and that cost grows with table size. In Neo4j a relationship is a real stored object, a direct pointer on disk. Traversing to a neighbor is a fast, constant-time lookup regardless of total database size — this is called index-free adjacency.

## Segment 4 (steps: where graphs win)

Graphs are the right tool when questions are fundamentally about relationships and multi-hop connections: recommendations based on what similar customers bought, fraud detection through arbitrary-depth chains of accounts, and org-chart-style hierarchy traversal. These require many self-joins or recursive CTEs in SQL Server and become a natural traversal in a graph. Simple key lookups and heavy flat aggregate reporting are honestly still better served relationally.

## Segment 5 (outro)

Graphs aren't a replacement for relational databases — they're the right tool for a specific, relationship-heavy class of problems. Next up: Neo4j's architecture, and how to actually get it installed and running.
