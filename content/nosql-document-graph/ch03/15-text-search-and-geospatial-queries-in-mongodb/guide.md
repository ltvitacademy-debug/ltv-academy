# Text Search & Geospatial Queries in MongoDB

Compound and multikey indexes cover most day-to-day filtering, but two query shapes need
their own dedicated index type entirely: searching free text for relevant words, and
finding documents by location. MongoDB has real, built-in support for both — text
indexes and `$text` search, and 2dsphere indexes with `$near`/`$geoWithin`. Neither is a
bolt-on; both are core server features, and both have a direct SQL Server analog you
already understand.

## What you'll learn

- How to create a text index and run relevance-ranked `$text` searches
- How to store locations as GeoJSON and index them with a 2dsphere index
- The difference between `$near`, `$geoWithin`, and `$geoIntersects`

## Text search: `$text` and text indexes

A regular index (even a multikey one) can't efficiently answer "which documents contain
the word *aggregation* anywhere in this field." That requires a **text index** — an index
built for word-level matching rather than exact-value matching:

```
db.articles.createIndex({ content: "text" })
```

Once that index exists, queries use the `$text` operator instead of a regular field match:

```
db.articles.find({ $text: { $search: "mongodb aggregation" } })
```

A few real behaviors worth knowing:

- `$text` matches documents containing *any* of the search words by default; wrap a phrase
  in quotes inside the search string (`"mongodb aggregation"`) to require the exact phrase,
  and prefix a word with `-` to exclude it.
- A collection can have only **one** text index, though that index can cover multiple
  fields (with optional per-field weights, so a match in `title` scores higher than one in
  `body`).
- Results can be sorted by relevance using the `$meta: "textScore"` projection, similar to
  how a SQL Server full-text query returns a `RANK` you can sort by.
- This is genuinely comparable to SQL Server's `FULLTEXT` index and `CONTAINS()`/`FREETEXT()`
  predicates — same underlying idea (a word-level inverted index), different syntax. For
  serious full-text search (fuzzy matching, synonyms, faceting), MongoDB Atlas offers Atlas
  Search, a separate Lucene-based engine — the built-in `$text` index is intentionally basic.

## Geospatial queries: GeoJSON and 2dsphere

MongoDB stores locations as **GeoJSON** objects — a standard JSON shape for points, lines,
and polygons:

```
{ name: "Warehouse A", location: { type: "Point", coordinates: [-73.99, 40.73] } }
```

The real gotcha every relational DBA trips on at least once: GeoJSON coordinates are
**longitude first, then latitude** — the opposite of the "lat/long" order most people say
out loud. Get this backwards and your queries silently return wrong (or zero) results.

Indexing that field for location queries requires a **2dsphere index**, which understands
spherical (earth-like) geometry:

```
db.warehouses.createIndex({ location: "2dsphere" })
```

With that index in place, three real query operators become available:

- **`$near`** — find documents sorted by distance from a point, nearest first:
  ```
  db.warehouses.find({
    location: { $near: { $geometry: { type: "Point", coordinates: [-73.99, 40.73] },
                          $maxDistance: 5000 } }
  })
  ```
  (`$maxDistance` is in meters.)
- **`$geoWithin`** — find documents fully inside a given shape (a polygon, circle, or box),
  with no distance sorting — cheaper than `$near` when you just need "inside this region."
- **`$geoIntersects`** — find documents whose geometry overlaps a given shape at all, used
  when the stored data is itself a line or polygon, not just a point.

This maps directly onto SQL Server's `geography`/`geometry` spatial types and methods like
`STDistance()` and `STContains()` — same category of problem, same reason it needs a
dedicated index type: a regular B-tree index has no concept of "near."

## Key terms

| Term | Meaning |
|---|---|
| Text index | An index built for word-level matching on string content; enables `$text` search |
| `$text` | Query operator that searches a text-indexed field for the given words or phrase |
| GeoJSON | Standard JSON format for geometry (`Point`, `Polygon`, etc.); coordinates are `[longitude, latitude]` |
| 2dsphere index | Index type for spherical geospatial queries against GeoJSON data |
| `$near` | Geospatial query returning documents sorted by distance from a point |
| `$geoWithin` | Geospatial query returning documents fully inside a given shape, unsorted |

## Check yourself

You store a location as `{ type: "Point", coordinates: [40.73, -73.99] }` and your `$near`
query returns nothing useful. Based on this lesson, what's the most likely mistake?
