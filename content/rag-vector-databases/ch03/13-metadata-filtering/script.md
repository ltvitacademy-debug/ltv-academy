# Script — Metadata Filtering

## Segment 1 (title)

Every vector you store can carry metadata alongside it — which document it came from, its type, who it belongs to. Metadata filtering combines nearest-neighbor search with exact conditions on that data, in the same query.

## Segment 2 (steps: what metadata is)

Metadata, called payload in Qdrant, rides along with every vector but isn't part of the similarity math at all. It's ordinary structured data — a document type, an update date, a tenant ID, an access level — stored right next to the vector it describes.

## Segment 3 (code: a filtered query)

Here's what a filtered query actually looks like. Find the 5 closest vectors to this query, but only among ones where the document type is policy, it was updated this year, and it belongs to this specific tenant. All three conditions have to hold alongside the similarity search.

## Segment 4 (steps: pre-filter vs post-filter)

Databases combine the filter and the search in one of two orders. Post-filtering searches first, then throws away anything that fails the filter — which can leave you with too few results, or none at all, if the filter is restrictive enough. Pre-filtering narrows to matching vectors first, then searches within that smaller set, which avoids that problem, but needs the filter built tightly into the index itself to stay fast rather than falling back to a slow scan.

## Segment 5 (outro)

Metadata filtering is often what makes a RAG pipeline safe to actually ship, not just a convenience. Scoping every query by tenant so one customer's data never leaks into another's answers. Filtering out documents a user isn't cleared to see, or that have been marked deprecated. None of that is vector math — it's exact filtering working right alongside it. Next lesson: hybrid search, combining vector similarity with traditional keyword search in the same query.
