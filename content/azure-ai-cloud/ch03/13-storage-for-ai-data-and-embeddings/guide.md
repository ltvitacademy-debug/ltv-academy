# Lesson 13 — Storage for AI Data & Embeddings

**Chapter 3 · Cloud Infrastructure Basics for AI · Lesson 13 of 24**

## What you'll learn

- Why raw AI data and embeddings live in two different storage layers, not one
- Blob Storage's role as the landing zone for raw documents
- What actually goes into a search index's schema once embeddings exist
- Why Blob Storage itself has no idea an embedding will ever be generated

## Two storage layers, two jobs

Before a model can answer a question about your own documents, that data
has to live somewhere — and on Azure, it usually lives in two different
places doing two different jobs:

```
Blob Storage   # raw documents, PDFs, images — cheap, durable
Search index   # chunked text + vector embeddings — queryable
```

Data doesn't skip a step. It lands in Blob Storage first, then gets
chunked and embedded into an index later, usually by a separate pipeline.

## Raw data lands in Blob Storage first

A container is just a named bucket inside a storage account:

![Creating a container in an Azure Storage account — the landing zone before anything is indexed or embedded.](/courses/azure-ai-cloud/ch03/13-storage-for-ai-data-and-embeddings/create-container.png)

Cheap, durable, and completely unaware that any of this will eventually
feed a model. This is where a lot of AI projects should start and usually
don't — a boring, well-organized place for the raw files before anyone
talks about embeddings at all.

## Loading documents into that container

Uploading a file is as simple as the portal, the CLI, or an SDK, with
options like access tier and blob type set per upload:

![Uploading a file straight from the portal — the same raw documents a RAG pipeline will later chunk and embed.](/courses/azure-ai-cloud/ch03/13-storage-for-ai-data-and-embeddings/upload-blob.png)

These are the same raw documents the retrieval-augmented generation
pipeline from Lesson 8 will later chunk into passages and turn into
vectors. Blob Storage doesn't know or care what happens to the file after
this point — that's the next layer's job.

## Where the embeddings actually live

The embeddings themselves never live in Blob Storage. They're written
into a search index — Azure AI Search, in this course — with its own
schema:

![An Azure AI Search index's Fields tab, with the vector index quota panel above it — this is the schema embeddings get written into, not Blob Storage.](/courses/azure-ai-cloud/ch03/13-storage-for-ai-data-and-embeddings/index-fields-schema.png)

A field for the original text, metadata fields to filter or sort on, and
a vector field for the embedding — queried by similarity rather than by
keyword match. The "Vector index quota usage" panel on that same screen
is a reminder that vector storage is billed and limited separately from
the plain-text fields next to it.

## Key terms

| Term | Meaning |
|---|---|
| Container | A named bucket inside an Azure Storage account holding raw blobs |
| Blob | A single raw file in Blob Storage — a document, image, transcript |
| Search index | The queryable schema (Azure AI Search) that holds chunked text and vector embeddings |
| Vector field | An index field type storing an embedding, queried by similarity rather than exact match |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: why
can't you just query Blob Storage directly for "documents similar to
this one" — what has to happen to a document between landing in a
container and being findable by similarity?
