# Course Introduction: From Relational to NoSQL Thinking

Every course in this path so far, including Cross-Platform Relational DBA, has been about
relational databases — different engines, but the same underlying model: rows, tables,
foreign keys, joins. This course, the final course in the SQL Server Database
Administrator path, asks you to set that model down. MongoDB, Azure Cosmos DB, and Neo4j
each organize data in a genuinely different shape, and each shape exists because it solves
a real problem the relational model handles poorly.

## What you'll learn

- Why this course exists at the end of a relational-focused path
- The three non-relational platforms this course covers, and why these three
- The mental shift from "how do I normalize this" to "how will this actually be read"

## Not a lesser version of relational — a different tool

It's tempting for a deeply-trained relational DBA to treat NoSQL as relational-minus-
constraints, a shortcut for developers who didn't want to design a proper schema. That
framing is wrong and will actively mislead you in this course. A document database like
MongoDB isn't relational data with the joins removed — it's built around a real
architectural bet: that denormalizing data to match how an application actually reads it,
rather than how it's theoretically structured, is often the right tradeoff at scale. A
graph database like Neo4j isn't a table with extra steps — relationships are first-class,
stored objects, not something reconstructed at query time via a JOIN.

## Three platforms, three real reasons

- **MongoDB** — the most widely adopted document database, genuinely dominant in
  application development where the data an app works with maps naturally onto nested
  JSON-like documents rather than normalized tables.
- **Azure Cosmos DB** — Microsoft's globally-distributed, multi-model database service.
  It's the natural next step after SQL Server Database Administration and Azure Database
  Administrator in this catalog, and it's genuinely distinctive: one engine speaking
  multiple APIs (including a MongoDB-compatible one), designed from the ground up for
  multi-region distribution in a way on-prem SQL Server never was.
  Covered here because a real Azure DBA increasingly needs it.
- **Neo4j** — the leading graph database, chosen because certain real business
  problems (fraud rings, recommendation engines, org-chart-style hierarchies) are
  genuinely awkward to model and query relationally, and become natural once you think in
  nodes and relationships instead of rows and foreign keys.

## The mental shift this course requires

Relational design starts with normalization: model the true structure of the data first,
then let the query engine join it back together at read time. NoSQL data modeling
generally starts from the opposite direction: understand the actual access pattern —
what will be read together, how often, at what scale — and shape the data to match that
pattern up front. This isn't a lesser discipline; it's a different one, with its own real
tradeoffs (data duplication, eventual consistency, harder ad hoc querying) that this
course covers honestly rather than glossing over.

## Key terms

| Term | Meaning |
|---|---|
| Document database | Stores data as flexible, often nested, JSON-like documents rather than normalized rows |
| Multi-model database | A single engine supporting more than one data model (e.g. Cosmos DB's document, graph, key-value APIs) |
| Graph database | Stores nodes and relationships as first-class objects, optimized for traversal queries |
| Denormalization | Deliberately duplicating or nesting data to match a read pattern, trading storage/consistency for query simplicity |

## Check yourself

A relational DBA says "NoSQL is just SQL Server without the constraints, for developers
who don't want to design a real schema." What's wrong with that framing, according to this
lesson?
