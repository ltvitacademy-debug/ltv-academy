# Lesson 51 — Building a Vector Index Over Your Data Catalog

**Chapter 3 · AI for Data Engineers (Bonus) · Lesson 51 of 81**

## What you'll learn

- How to turn a data catalog's metadata into chunks worth embedding
- Why chunk granularity is a real design decision, not a detail
- What actually goes into an embedding call, concretely
- What an index needs to store beyond just the vector itself
- How this sets up Lesson 52's applied RAG pipeline

## From "RAG, conceptually" to an actual index

Lesson 50 named the four stages — embed, index, retrieve, generate — at a
conceptual level. This lesson makes the first two concrete, using a data
catalog as the content: the table and column descriptions your workspace
already has, the kind Lesson 48 covered drafting with an LLM in the first
place.

## Chunking: deciding what one embedded unit represents

A **chunk** is the unit of content you embed and later retrieve. For a
catalog, the natural chunk is one table's full profile — its name,
description, and column list together — rather than one chunk per column:

```
Chunk (one table, not one column per chunk):

Table: DimCustomer
Workspace: Sales Analytics
Description: Customer dimension table, includes churn risk.
Columns:
  customer_id (int) - unique customer identifier
  churn_risk_score (float) - model-predicted churn probability
  signup_date (date) - account creation date
  region (string) - sales region
```

**Why the whole table, not per-column:** the question "which table has
customer churn data?" needs the table-level description and enough column
context to confirm the match in one retrieved unit. Splitting into
per-column chunks would force the retrieval step to reassemble several
fragments just to answer one question — more moving parts, more chances
to retrieve an incomplete picture.

## Embedding the chunks

Each chunk's text goes through an embedding model, producing a fixed-length
vector:

```
embedding = embed_model.encode(chunk_text)
# embedding: a vector of, say, 1536 numbers representing
# this chunk's meaning
```

The exact embedding model matters less at this conceptual level than the
principle: every chunk, and later every question, gets embedded with the
*same* model — mixing embedding models makes the resulting vectors
incomparable.

## What the index actually stores

A vector index isn't just a list of vectors — retrieval needs to map a
matched vector back to something useful:

```
Index entry:
  vector:    [0.021, -0.114, 0.087, ...]
  chunk_text: the full table profile shown above
  metadata:   { "table": "DimCustomer",
                "workspace": "Sales Analytics" }
```

Storing the metadata alongside the vector is what lets Lesson 52's
pipeline return not just an answer, but *which table* it came from — so
the person asking can go verify it themselves, the same "check it before
you trust it" habit from Lessons 45, 46, and 48.

## Key terms

| Term | Meaning |
|---|---|
| Chunk | The unit of content embedded and retrieved together — one table's full profile here |
| Chunk granularity | The design decision of what one chunk represents; too fine fragments context |
| Embedding model consistency | Every chunk and question must be embedded with the same model to be comparable |
| Index metadata | Source information (table, workspace) stored alongside each vector for traceability |

## Check yourself

You're ready for Lesson 52 when you can explain, without looking: why is
chunking by whole table, rather than by individual column, the better
choice for answering "which table has customer churn data?"
