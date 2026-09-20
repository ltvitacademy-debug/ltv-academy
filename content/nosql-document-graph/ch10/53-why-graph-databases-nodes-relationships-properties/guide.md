# Why Graph Databases? Nodes, Relationships & Properties

Chapters Two through Nine covered document and multi-model databases — MongoDB and Cosmos
DB — both of which still organize data as records, even when those records are flexible,
nested JSON rather than normalized rows. Graph databases are a genuinely different shape
again. This lesson introduces Neo4j, the leading graph database, starting with the three
building blocks everything else in this course's final chapters is built on: **nodes**,
**relationships**, and **properties**.

## What you'll learn

- The three core building blocks of the graph model: nodes, relationships, and properties
- Why relationships in Neo4j are directed, typed, first-class data — not something
  reconstructed at query time
- What kinds of real problems graphs solve well, and an honest read on where they don't

## The three building blocks

- **Nodes** represent entities — a `Customer`, a `Product`, an `Employee`. A node can carry
  one or more **labels** (Neo4j's term for a category, roughly analogous to a table name in
  the relational world), so a single node could be labeled both `Person` and `Employee`.
- **Relationships** connect two nodes. In Neo4j, every relationship is **directed** (it has
  a start node and an end node) and **typed** (it has exactly one relationship type, like
  `PURCHASED` or `REPORTS_TO`, written in `ALL_CAPS` by convention). Direction can usually
  be traversed either way at query time regardless of how it was created, but it's always
  stored with one.
- **Properties** are key-value pairs of data, and — this is the part that genuinely
  surprises relational-trained DBAs — properties can live on **both nodes and
  relationships**. A `PURCHASED` relationship between a `Customer` node and a `Product` node
  can itself carry a `date` and `quantity` property, data that in a relational schema would
  force a separate junction table (`OrderItems`) just to hold it.

## Relationships are stored, not computed

This is the single most important architectural fact in this chapter. In a relational
database, a relationship between two rows is **implicit** — a foreign key value that the
query engine has to resolve via a `JOIN` at query time, an operation whose cost grows with
table size and the number of hops involved. In Neo4j, a relationship is a **real, stored
object** with its own identity, sitting on disk as a direct physical pointer between two
nodes. Traversing from one node to its neighbor is a fast, constant-time pointer lookup,
regardless of how many total nodes exist in the database — this property is often called
**index-free adjacency**.

The practical consequence: a query that walks five relationships deep (a five-hop
traversal) doesn't get proportionally slower as the graph grows, the way a five-way SQL
`JOIN` across large tables does. The cost of a graph traversal is proportional to the size
of the *pattern matched*, not the size of the whole database.

## What graphs solve well — and an honest read on what they don't

Graphs are the right tool when the questions being asked are fundamentally about
**relationships and multi-hop connections**:

- "Which products do customers who bought this product also buy?" (recommendation)
- "Is this transaction connected, through any chain of accounts, to a known fraud ring?"
  (fraud detection, arbitrary-depth traversal)
- "Who are all of this employee's direct and indirect reports?" (hierarchy/org-chart
  traversal)

These are the queries that require many self-joins or recursive CTEs in SQL Server, and
become a natural, readable traversal in a graph. Honestly, though, graphs are **not** the
better tool for everything: simple lookups by a single known key, heavy aggregate
reporting across large flat datasets, and strict transactional consistency across many
unrelated entities are all things a relational or document database typically still handles
better or more simply. The right read of this course isn't "graphs replace relational" —
it's "graphs are the right tool for a specific, real class of relationship-heavy problems."

## Key terms

| Term | Meaning |
|---|---|
| Node | A graph entity, roughly analogous to a row, identified by one or more labels |
| Relationship | A directed, typed connection between two nodes, stored as a first-class object |
| Property | A key-value pair of data attached to either a node or a relationship |
| Index-free adjacency | Neo4j's storage model where relationships are direct physical pointers, making traversal cost independent of total database size |

## Check yourself

A relational DBA asks why a graph database traversal doesn't get slower as the overall
database grows, the way a multi-table JOIN does. What's the architectural answer, per this
lesson?
