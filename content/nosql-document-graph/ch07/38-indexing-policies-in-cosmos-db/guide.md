# Indexing Policies in Cosmos DB

In SQL Server, an index is something you deliberately create — you pick the columns, weigh the
write cost against the query benefit, and add it when a query plan tells you it's needed. Cosmos
DB inverts that default. Every property on every item is indexed automatically, the moment you
write it, unless you tell the engine not to. That single difference changes how you think about
schema evolution, ad hoc querying, and write cost in ways a relational background doesn't prepare
you for.

## What you'll learn

- Why automatic indexing is the default, and what it actually indexes
- How to read and customize an indexing policy's include/exclude paths
- Why excluding paths is a real cost lever, not just a performance tweak

## Automatic indexing: everything, by default

When you create a container with the default settings, Cosmos DB applies a default indexing
policy that indexes every property of every item — nested objects, arrays, all of it — using range
indexes that support equality, range, and `ORDER BY` queries out of the box. There's no equivalent
of "this column has no index, so that query does a table scan." Any property can be filtered or
sorted on efficiently without you creating anything.

```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    { "path": "/*" }
  ],
  "excludedPaths": [
    { "path": "/\"_etag\"/?" }
  ]
}
```

That `/*` wildcard is the whole default policy in a nutshell: include every path. The only thing
excluded by default is the internal `_etag` system property, which nothing queries against.

## Customizing paths to control RU cost

Automatic indexing isn't free — every indexed property adds to the request unit (RU) cost of a
write, because the engine updates the index for that path on every insert or update. Large
documents with big arrays, deeply nested objects, or high-cardinality properties you'll never
filter on (a full-text `description` field, a large embedded blob) can meaningfully inflate write
RU cost for no query benefit. The fix is to narrow the indexing policy explicitly:

```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    { "path": "/category/?" },
    { "path": "/status/?" }
  ],
  "excludedPaths": [
    { "path": "/*" },
    { "path": "/description/?" }
  ]
}
```

This flips the default: exclude everything, then include only the specific paths you actually
query against. It's a deliberate tradeoff — cheaper writes and less index storage, at the cost of
any query on an excluded path falling back to a full container scan.

## Composite indexes for multi-property queries

A single-property range index can't efficiently serve an `ORDER BY` on two properties, or a query
that filters on one property and sorts by another. For those, you add a **composite index** —
explicitly, the same way you'd add a multi-column index in SQL Server when a query needs it.

## Key terms

| Term | Meaning |
|---|---|
| Automatic indexing | Cosmos DB's default behavior of indexing every property of every item without configuration |
| Indexing policy | The JSON document controlling which paths are indexed, using includedPaths/excludedPaths |
| Included/excluded paths | Explicit rules narrowing automatic indexing to control RU cost and storage |
| Composite index | An index over multiple properties together, needed for multi-property ORDER BY or filter+sort queries |

## Check yourself

A relational DBA is surprised that a brand-new Cosmos DB container can efficiently filter on a
property they never created an index for. Why does that work, and what's the real cost of leaving
every property indexed on a write-heavy container?
