# The MongoDB Query Language: Filters & Projections

You already know how to filter rows in T-SQL: a `WHERE` clause with comparison operators,
`AND`/`OR`, and an `IN` list. MongoDB's `find()` does the same job with the same underlying
logic — it's just expressed as a JSON-like query document instead of a clause of keywords.
Once you see the pattern, the translation from relational filtering to MongoDB filtering is
mostly a change of syntax, not a change of thinking.

## What you'll learn

- The basic `find()` filter shape and MongoDB's comparison query operators
- Combining conditions with `$and` and `$or`
- Projections — controlling which fields a query returns, the equivalent of `SELECT` column lists

## Filter documents and comparison operators

A `find()` call takes a **filter document** — a JSON object where each key is a field to test
and each value is either a literal (implicit equality) or an operator expression:

```
db.orders.find({ status: "shipped" })
db.orders.find({ total: { $gt: 100 } })
db.orders.find({ total: { $gte: 100, $lte: 500 } })
db.orders.find({ status: { $ne: "cancelled" } })
db.orders.find({ status: { $in: ["shipped", "delivered"] } })
db.orders.find({ status: { $nin: ["cancelled", "returned"] } })
```

`$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte` map directly to `=`, `<>`, `>`, `>=`, `<`, `<=`.
`$in` and `$nin` map directly to SQL's `IN` and `NOT IN`. Plain `{ status: "shipped" }` is
shorthand for `{ status: { $eq: "shipped" } }` — MongoDB treats a bare value as an implicit
equality test, the same way `WHERE status = 'shipped'` is the natural way to write equality
in SQL rather than something more verbose.

## Combining conditions: implicit AND, $and, and $or

When a filter document lists more than one field, MongoDB ANDs them together implicitly —
no operator needed, just like listing multiple conditions separated by commas in a `WHERE`
clause joined with `AND`:

```
db.orders.find({ status: "shipped", total: { $gt: 100 } })
```

That's equivalent to `WHERE status = 'shipped' AND total > 100`. You only need the explicit
`$and` operator when you need multiple conditions on the *same* field, or when you're nesting
`$and` inside an `$or` (or vice versa) and need to be unambiguous about grouping:

```
db.orders.find({
  $and: [
    { status: "shipped" },
    { $or: [ { total: { $gt: 500 } }, { priority: true } ] }
  ]
})
```

`$or` works the way SQL's `OR` does — it takes an array of condition documents and matches a
document if *any* of them are true:

```
db.orders.find({ $or: [ { status: "cancelled" }, { total: { $lt: 10 } } ] })
```

## Projections: choosing what comes back

The second argument to `find()` is the **projection** — the equivalent of a `SELECT` column
list instead of `SELECT *`. You can include specific fields:

```
db.orders.find({ status: "shipped" }, { customerName: 1, total: 1 })
```

By default, MongoDB always returns `_id` even when it isn't listed, so if you don't want it
you have to exclude it explicitly:

```
db.orders.find({ status: "shipped" }, { customerName: 1, total: 1, _id: 0 })
```

You can also go the opposite direction and exclude specific fields while keeping everything
else — useful for hiding a large or sensitive field without having to list every other field
you want:

```
db.orders.find({ status: "shipped" }, { internalNotes: 0 })
```

One real rule to know: outside of `_id`, you can't mix inclusion (`1`) and exclusion (`0`) in
the same projection document. It's either "here are the fields I want" or "here are the
fields I don't want" — not both at once.

## Key terms

| Term | Meaning |
|---|---|
| Filter document | The first argument to `find()` — a JSON object describing which documents match |
| Query operator | A `$`-prefixed key (`$gt`, `$in`, `$and`, etc.) used inside a filter document to express something beyond plain equality |
| Implicit AND | Listing multiple fields in a filter document ANDs them together without needing `$and` |
| Projection | The second argument to `find()` — controls which fields are returned, MongoDB's equivalent of a `SELECT` column list |

## Check yourself

Write a `find()` call against an `employees` collection that returns only documents where
`department` is `"Sales"` or `"Marketing"`, and projects only `name` and `department` (no
`_id`).
