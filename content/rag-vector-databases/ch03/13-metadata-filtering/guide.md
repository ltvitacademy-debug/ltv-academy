# Lesson 13 — Metadata Filtering

**Chapter 3 · Vector Databases · Lesson 13 of 31**

## What you'll learn

- What metadata (payload) is, stored alongside a vector
- How a filtered query combines similarity search with exact/range conditions
- The difference between pre-filtering and post-filtering, and why it matters
- Why metadata filtering is often what makes a RAG pipeline safe to put in front of real users

## What metadata actually is

Back in Lesson 10, every vector database operation was built around upserting a vector "with its
original text and metadata alongside it." That metadata — called **payload** in Qdrant, simply
**metadata** in Pinecone and Chroma, **properties** in Weaviate — is ordinary structured data:
which document a chunk came from, its document type, the date it was last updated, which
customer or tenant it belongs to, an access-level tag. It rides along with the vector but isn't
part of the similarity math at all.

## A filtered query

**Metadata filtering** combines the nearest-neighbor search from Lesson 12 with exact-match or
range conditions on that metadata, in the same query:

```
query_vector: [...]
filter:
  must:
    - doc_type == "policy"
    - updated_at >= "2024-01-01"
    - tenant_id == "acme-corp"
limit: 5
```

Read that as: "find the 5 closest vectors to this query — but only among vectors where all three
of these conditions are also true." Filter conditions aren't limited to exact matches; most
vector databases also support ranges (dates, numbers), geographic radius filters, and full-text
match on a metadata field, combined with `must` (AND), `should` (OR), and `must_not` (NOT) logic.

## Pre-filtering vs. post-filtering

Databases combine the vector search and the filter in one of two ways, and the difference matters
for correctness, not just speed:

- **Post-filtering**: run the ANN search first to get, say, the top 100 nearest vectors, then
  throw away any that fail the filter. The risk: if the filter is restrictive and most of those
  100 don't match it, you can end up with far fewer than the 5 results you asked for — or none at
  all — even though better matches exist deeper in the collection. The usual workaround is
  over-fetching (asking for a much larger candidate set than you actually need).
- **Pre-filtering**: narrow to only the vectors that pass the filter first, then search for the
  closest ones within that narrowed set. This avoids the "too few results" problem, but a naive
  implementation can be slow if applying the filter isn't tightly integrated with the index
  itself. Qdrant specifically builds filtering into its HNSW graph traversal (a "filterable HNSW")
  so a filtered search can still navigate the graph efficiently instead of falling back to a
  slow scan — one of the reasons it was highlighted as filtering-focused back in Lesson 11.

## Why this matters for a real RAG pipeline

Metadata filtering is frequently what turns a demo into something safe to ship. A multi-tenant
app filters every query by `tenant_id` so one customer's documents never leak into another's
answers. A support bot filters out `status == "deprecated"` so it never cites a retired policy.
A personalization layer filters by `access_level` so a retrieval step can't surface anything the
asking user isn't allowed to see. None of this is vector math — it's exact filtering working
alongside it.

## Key terms

| Term | Meaning |
|---|---|
| Metadata / payload | Structured data stored alongside a vector, outside the similarity calculation |
| Filtered query | A query combining nearest-neighbor search with exact/range conditions on metadata |
| Pre-filtering | Narrow to matching vectors first, then search for the closest among them |
| Post-filtering | Search for the closest vectors first, then discard any that fail the filter |

## Lab

1. Write a filter (in the style shown above) that would scope a search to only PDF documents
   uploaded in the last 30 days for a specific user ID.
2. Explain, in your own words, why post-filtering can return fewer results than you asked for,
   even when matching vectors exist in the collection.
3. Name one real access-control scenario, outside the examples given, where metadata filtering
   would be the difference between a safe RAG pipeline and an unsafe one.

## Check yourself

You're ready for Lesson 14 when you can explain the practical difference between pre-filtering
and post-filtering, and describe one real scenario where filtering is a safety requirement, not
just a convenience.
