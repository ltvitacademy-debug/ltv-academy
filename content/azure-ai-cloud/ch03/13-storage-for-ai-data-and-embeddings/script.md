# Script — Storage for AI Data & Embeddings

## Segment 1 (title)

Before a model can answer a question about your documents, that data has to live somewhere — and for AI workloads on Azure, it usually lives in two different places doing two different jobs.

## Segment 2 (screenshot: create container)

Raw documents land in Blob Storage first — PDFs, transcripts, images, whatever the source material actually is. A container is just a named bucket inside a storage account, created in a couple of clicks; cheap, durable, and completely unaware that any of this will eventually feed a model. This is also where a lot of AI projects should start and usually don't — with a boring, well-organized place to put the raw files before anyone talks about embeddings at all.

## Segment 3 (screenshot: upload blob)

Getting a file in is as simple as uploading it through the portal, the CLI, or an SDK, with options like access tier and blob type set per upload. These are the same raw documents a retrieval-augmented generation pipeline, the one covered back in Lesson 8, will later chunk into passages and turn into vectors — Blob Storage doesn't know or care what happens to the file after this point.

## Segment 4 (screenshot: index fields schema)

The embeddings themselves don't live in Blob Storage at all — they're written into a search index, like Azure AI Search, with its own schema: a field for the original text, metadata fields you can filter or sort on, and a vector field for the embedding that represents it, ready to be queried by similarity rather than by keyword match.

## Segment 5 (code: two layers)

Two storage layers, two jobs — Blob Storage holds the raw material, a search index holds it chunked, embedded, and ready to query.

## Segment 6 (outro)

Next up: making sure only the right things can actually reach either one.
