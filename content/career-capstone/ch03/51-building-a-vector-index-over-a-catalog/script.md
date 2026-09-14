# Script — Building a Vector Index Over Your Data Catalog

## Segment 1 (title)

Lesson 50 named the four RAG stages conceptually. This lesson makes the first two concrete, using a data catalog's table and column descriptions as the actual content to embed and index.

## Segment 2 (code: chunking by table)

A chunk is the unit of content you embed and later retrieve. For a catalog, the natural chunk is one table's full profile — name, description, and columns together — not one chunk per column, because a question like "which table has customer churn data" needs that context in one retrieved unit.

## Segment 3 (code: embedding)

Each chunk's text goes through an embedding model and comes out as a fixed-length vector representing its meaning. The specific model matters less than the principle: every chunk and every question must be embedded with the same model, or the resulting vectors aren't comparable.

## Segment 4 (code: what the index stores)

A vector index isn't just a list of vectors — each entry also stores the original chunk text and metadata like the table name and workspace, so a retrieved match can be traced back to exactly where it came from.

## Segment 5 (outro)

Storing that metadata is what lets the next lesson's pipeline return not just an answer, but which table it came from, so it can be verified. Next up: wiring embed, index, retrieve, and generate together into a working RAG pipeline over Fabric's own metadata.
