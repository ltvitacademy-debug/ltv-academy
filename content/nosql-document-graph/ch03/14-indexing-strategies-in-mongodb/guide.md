# Indexing Strategies in MongoDB

If you've tuned indexes in SQL Server, you already understand the core tradeoff MongoDB
indexes make: faster reads at the cost of write overhead and storage. The mechanics differ —
B-tree structure aside, MongoDB indexes live per-collection instead of per-table constraint —
but the strategic thinking, especially around compound index field order, transfers almost
unchanged.

## What you'll learn

- Single-field indexes and why `_id` already has one automatically
- Compound indexes and why field order is not arbitrary
- Multikey indexes — MongoDB's answer to indexing array fields

## Single-field indexes

Every MongoDB collection automatically gets an index on `_id`. Beyond that, you create indexes
explicitly with `createIndex()`:

```
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ total: -1 })
```

The `1`/`-1` is sort direction (ascending/descending) — for a single-field index it rarely
matters which you pick, since MongoDB can scan an index in either direction. It starts to
matter once you're combining fields.

## Compound indexes: field order is not arbitrary

A compound index covers multiple fields, and — exactly like a composite index in SQL Server —
the **order of fields determines which queries can actually use it**:

```
db.orders.createIndex({ status: 1, total: -1 })
```

This index efficiently supports queries that filter on `status` alone, or on `status` *and*
`total` together. It does **not** efficiently support a query that filters on `total` alone,
because `total` is the second key — the same "leftmost prefix" rule you already know from SQL
Server composite indexes applies here. If your real query pattern usually filters by `total`
without `status`, you need `total` first, or a separate index entirely.

The general strategy — **E**quality fields first, then **S**ort fields, then **R**ange fields
(often shortened to the ESR rule) — mirrors exactly how you'd think about ordering columns in
a SQL Server composite index: put the columns used for exact-match filtering first, so the
index can narrow down fast before it has to deal with ranges or ordering.

## Multikey indexes: indexing array fields

When you index a field whose value is an array, MongoDB automatically creates a **multikey
index** — one index entry per array element, rather than one entry per document:

```
// tags: ["electronics", "sale", "clearance"]
db.products.createIndex({ tags: 1 })
```

A query like `db.products.find({ tags: "sale" })` uses that index to jump straight to
documents containing `"sale"` anywhere in their `tags` array, without a relational-style join
table. This is real, genuine behavior MongoDB handles automatically — you don't have to
declare anything special; MongoDB detects the array and builds a multikey index for you. The
one real restriction: **a compound index can have at most one multikey (array) field** — you
can't build a compound index across two different array fields, because the entry count would
explode combinatorially with no reliable way to reason about it.

## Key terms

| Term | Meaning |
|---|---|
| Single-field index | An index on one field, created with `createIndex({ field: 1 })` |
| Compound index | An index across multiple fields, where field order determines which queries can use it (leftmost-prefix rule) |
| ESR rule | Equality, Sort, Range — the recommended field ordering for compound indexes |
| Multikey index | An index automatically built on an array field, with one entry per array element |

## Check yourself

You have a compound index `{ status: 1, total: -1 }`. Will a query that filters only on
`total` (with no `status` condition) use this index efficiently? Why or why not?
