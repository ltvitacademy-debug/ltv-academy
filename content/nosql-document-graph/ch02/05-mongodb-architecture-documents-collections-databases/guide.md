# MongoDB Architecture: Documents, Collections & Databases

Chapter 2 puts the theory from Chapter 1 into practice, starting with MongoDB's actual
storage hierarchy. If you've spent years thinking in databases, schemas, tables, and
rows, MongoDB's hierarchy will look familiar at first glance — and that's exactly where
the real differences matter most. This lesson lays out how MongoDB actually organizes
data, and where that organization genuinely departs from the relational model you know.

## What you'll learn

- MongoDB's real three-level hierarchy: database, collection, document
- Why a collection is not a table, structurally
- What "schema-less by default" actually means, and doesn't mean
- The real implications of a flexible schema for application design

## The hierarchy: database, collection, document

MongoDB organizes data in three levels:

- A **database** is the top-level container — a single MongoDB server (`mongod` process)
  can host multiple databases, the same way a SQL Server instance hosts multiple
  databases.
- A **collection** lives inside a database and groups related documents — roughly
  analogous to a table, and it's fine to reach for that comparison as a starting point.
- A **document** is a single record inside a collection, stored as BSON (covered in
  Lesson 7) — roughly analogous to a row, again as a starting comparison.

This mapping — database≈database, collection≈table, document≈row — is genuinely useful
for a relational DBA's first orientation. But calling a collection "a table" glosses over
the one structural difference that matters most for everything else in this course.

## Why a collection is not a table

A relational table has a schema enforced by the engine: every row has the same columns,
the same data types, and the same constraints, because the table definition says so. A
MongoDB collection, by default, enforces none of that. Two documents in the same
collection can have completely different fields:

```
// Both valid in the same "users" collection:
{ "_id": 1, "name": "Priya Patel", "email": "priya@example.com" }
{ "_id": 2, "name": "Sam Okafor", "loyaltyTier": "gold", "referredBy": 1 }
```

The first document has no `loyaltyTier`; the second has no `email`. MongoDB doesn't
reject either one. This isn't a missing feature — it's a genuine architectural choice.
Applications evolve, and a document model lets the shape of stored data evolve alongside
the application code without a blocking schema migration on every change.

## "Schema-less" doesn't mean "no schema exists"

"Schema-less by default" is the accurate phrase, and the "by default" part matters. In
practice, real applications still have an implicit schema — the application code expects
certain fields to usually be present, in usually-consistent types. MongoDB just doesn't
enforce that schema at the database engine level unless you explicitly opt in. MongoDB
does support **schema validation** — rules you can attach to a collection to reject
documents that don't match a defined structure — for teams that want enforcement closer
to what a relational table provides. The honest framing: flexibility is the default,
enforcement is available when you choose it, and most production MongoDB applications use
some validation once their document shape stabilizes.

## What this means for application design

The practical consequence for a DBA moving from SQL Server to MongoDB: you can no longer
rely on the engine to catch a malformed record the way a `NOT NULL` constraint or a
foreign key would. Data integrity becomes more of an application-layer and validation-rule
responsibility, and less of a pure database-engine guarantee by default. This tradeoff
connects directly back to Lesson 1's framing — it's not laziness, it's a deliberate bet
that matching the application's real, evolving data shape is worth more than rigid,
enforced structure. Later lessons in this chapter (embedding vs. referencing, in Lesson 8)
build directly on this flexibility.

## Key terms

| Term | Meaning |
|---|---|
| Database (MongoDB) | Top-level container for collections on a `mongod` server; a server can host several |
| Collection | A named group of documents inside a database; documents in it need not share a schema |
| Document | A single BSON record inside a collection; MongoDB's rough analog to a relational row |
| Schema validation | Optional rules attached to a collection that reject documents not matching a defined structure |

## Check yourself

A relational DBA new to MongoDB says "a collection is just a table with a different
name." What's the one structural detail missing from that statement, and why does it
matter for application design?
