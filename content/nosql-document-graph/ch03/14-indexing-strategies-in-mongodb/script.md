# Script — Indexing Strategies in MongoDB

## Segment 1 (title)

If you've tuned indexes in SQL Server, you already understand the core tradeoff — faster reads at the cost of write overhead and storage. The mechanics differ, but the strategic thinking, especially around compound index field order, transfers almost unchanged.

## Segment 2 (code: single-field indexes)

Every collection gets an automatic index on _id. Beyond that, you create indexes explicitly with createIndex(). The 1 or -1 is sort direction, and for a single-field index it rarely matters which you pick — it starts to matter once you're combining fields.

## Segment 3 (code: compound indexes)

A compound index covers multiple fields, and exactly like a composite index in SQL Server, field order determines which queries can actually use it. This index supports status alone or status plus total — but not total alone, because total is the second key. Same leftmost-prefix rule you already know.

## Segment 4 (code: multikey indexes)

When you index a field whose value is an array, MongoDB automatically builds a multikey index — one entry per array element. A query for one value inside that array jumps straight to the matching documents, no join table required. MongoDB detects the array and does this for you.

## Segment 5 (outro)

Compound and multikey indexes cover most day-to-day query patterns. Two specialized index types handle jobs neither one can — full-text search and location queries. Those are next.
