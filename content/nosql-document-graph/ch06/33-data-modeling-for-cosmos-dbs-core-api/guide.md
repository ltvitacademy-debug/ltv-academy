# Data Modeling for Cosmos DB's Core API

Lesson 8 covered embedding versus referencing as a MongoDB modeling decision. Cosmos DB's
Core API faces the exact same fundamental choice — data is stored as JSON documents, and a
DBA still has to decide what lives inside one document versus what gets split across
documents and joined at query time. What's genuinely new here, and worth taking seriously,
is that Cosmos DB adds a second real cost axis to that decision: Request Units, introduced
properly in Lesson 34, turn every read and write into a metered cost that data modeling
choices directly affect.

## What you'll learn

- Embedding versus referencing in Cosmos DB Core API — the familiar tradeoff
- How partition key alignment (Lesson 32) constrains modeling choices
- Why RU cost is a genuinely new factor beyond what MongoDB modeling considers

## Embedding versus referencing: the familiar tradeoff

The core question is unchanged from Lesson 8: does related data live inside one document
(embedded), or in separate documents referenced by an ID (referenced)? An order and its
line items, read together on every single request, are a strong embedding candidate — one
document, one read. A product catalog referenced by thousands of unrelated orders is a
poor embedding candidate, because embedding it everywhere it's used would duplicate it
across every order and make updates expensive and error-prone. This reasoning is identical
to the MongoDB embed/reference decision from Lesson 8 — Cosmos DB Core API documents are
genuinely the same kind of JSON structure.

## Partition key alignment: a real modeling constraint

Because a container has one partition key (Lesson 32), a genuinely useful Cosmos DB
modeling pattern is deliberately embedding data so that everything typically read together
lands in the same logical partition. If `customerId` is the partition key, embedding a
customer's recent orders inside (or alongside, sharing that same partition key value) the
customer document means a single-partition read serves the whole access pattern — a
cross-partition query, which is real and possible but more expensive in RU terms, is
avoided. This is a genuinely Cosmos-DB-specific consideration layered on top of the familiar
embed/reference tradeoff: the modeling choice and the partition key choice aren't
independent decisions.

## RU cost: the genuinely new factor

MongoDB's embed/reference tradeoff is about query complexity and consistency, but it doesn't
put a literal metered price tag on each option. Cosmos DB does: every read and write consumes
Request Units, and larger documents, more properties to index, and cross-partition queries
all cost more RUs than smaller documents, fewer indexed properties, and single-partition
queries. This means a Cosmos DB modeling decision that looks reasonable on pure query-
convenience grounds can be the wrong choice once its actual RU cost under real traffic
volume is accounted for — embedding a rarely-needed, large sub-object into every document
inflates the RU cost of every write and read of that document, even on the (common) requests
that never touch the embedded data.

## A practical modeling approach

Model around the real, dominant access pattern (the same starting point as Lesson 1's
overall NoSQL modeling philosophy): identify what's read together most often, align that
with the partition key, embed what's genuinely always needed together, and reference what's
large, independently updated, or needed by many unrelated documents. Then validate the
choice against RU cost under realistic traffic — Lesson 34 gives the tools to actually
measure that cost.

## Key terms

| Term | Meaning |
|---|---|
| Embedding | Nesting related data inside a single document |
| Referencing | Storing related data in a separate document, linked by an ID |
| Cross-partition query | A query that must read from more than one logical partition, generally costing more RUs |
| Request Unit (RU) | Cosmos DB's normalized cost currency for a read or write operation, covered fully in Lesson 34 |

## Check yourself

Why can an embedding decision that looks reasonable purely for query convenience turn out to
be the wrong choice once RU cost under real traffic is considered?
