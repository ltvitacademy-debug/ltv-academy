# Lesson 11 — Popular Vector Databases, Overview

**Chapter 3 · Vector Databases · Lesson 11 of 31**

## What you'll learn

- The two broad categories every popular vector database falls into
- A one-line honest read on Pinecone, Qdrant, Weaviate, Chroma, and Milvus
- A real look at a managed vector database's console, so "managed cloud" isn't abstract
- How to pick a starting point for your own RAG pipeline without over-researching it

## Two categories, not five unrelated products

Every name you'll hear in a RAG tutorial — Pinecone, Qdrant, Weaviate, Chroma, Milvus, plus
pgvector as a Postgres extension — sorts into one of two categories. **Fully managed cloud**:
you never run a server; you call an API and the vendor handles indexing, scaling, and backups
(Pinecone is managed-only — there's no self-hosted Pinecone). **Open-source, self-hosted or
embedded**: you run the database yourself (Qdrant, Weaviate, Milvus as a Docker container or
Kubernetes deployment), or it runs embedded inside your own process with no server at all
(Chroma's default mode). Several of these — Qdrant, Weaviate, Milvus (as Zilliz Cloud), and now
Chroma — also offer a managed cloud version of the same open-source engine, so the line isn't
always sharp. The category tells you what you're signing up to operate, not which one has
"better" search quality — the core operations from Lesson 10 (create, upsert, query, delete) are
the same everywhere.

## A quick, honest read on each

- **Pinecone**: fully managed, serverless, nothing to run yourself. The fastest path from zero
  to a working index. No open-source or self-hosted option.
- **Qdrant**: open-source (written in Rust), runs anywhere via Docker, with a managed Qdrant
  Cloud option. Known for fast, flexible metadata filtering (Lesson 13) alongside vector search.
- **Weaviate**: open-source, with a managed Weaviate Cloud option. Ships built-in hybrid search
  (Lesson 14) and optional modules that can generate embeddings for you at insert time.
- **Chroma**: open-source and embedded by default — it runs inside your Python process with no
  separate server, which makes it the fastest thing to prototype with locally. A Chroma Cloud
  managed option now also exists for production use.
- **Milvus**: open-source, built from the ground up for very large scale (billions of vectors
  across a distributed cluster); Zilliz Cloud is its managed offering.

None of this is a permanent ranking — every one of these actively ships new features, and the
right pick for a given RAG pipeline depends on your scale, your ops budget, and whether you
already need hybrid search or heavy metadata filtering on day one.

## A real managed console

"Fully managed cloud" is an abstract phrase until you've seen one. Here's Qdrant Cloud's own
cluster overview page — the same kind of screen a managed Pinecone or Weaviate Cloud console
gives you for a cluster you didn't have to provision yourself:

![Qdrant Cloud's cluster overview page for a cluster named "tutorial-cluster," showing HEALTHY and FREE TIER badges, tabs for Overview, API Keys, Metrics, Logs, Backups, and Configuration, cluster details (1 node, 4GiB disk, 1GiB RAM, 0.5 vCPU, AWS us-east-1), and a right-hand panel with Access Cluster, Try Sample Datasets, and Explore Tutorials links.](/courses/rag-vector-databases/ch03/11-popular-vector-databases-overview/qdrant-cloud-cluster-overview.png)
*A managed cluster's whole lifecycle in one screen — resources, access, and tabs for metrics, logs, and backups you'd otherwise have to run yourself.*
Source: [Qdrant Documentation — Creating a Qdrant Cloud Cluster](https://qdrant.tech/documentation/cloud/create-cluster/)

Every vendor's console has its own layout, but "managed" always means this: someone else is
running the box behind this screen.

## Choosing one to start with

For learning RAG specifically, start wherever friction is lowest for you: Chroma if you want to
run everything locally in Python with zero signup, or Qdrant/Pinecone free tier if you'd rather
work against a real hosted API from day one. The retrieval concepts in the rest of this course —
metadata filtering, hybrid search, scaling — exist in some form in all of them.

## Key terms

| Term | Meaning |
|---|---|
| Fully managed | The vendor runs the server; you only call the API (Pinecone) |
| Self-hosted | You run the database yourself, typically via Docker or Kubernetes |
| Embedded | The database runs inside your own application process, no separate server (Chroma's default) |
| Managed cloud of an OSS engine | A vendor-hosted version of an open-source database (Qdrant Cloud, Weaviate Cloud, Zilliz Cloud, Chroma Cloud) |

## Lab

1. For each of Pinecone, Qdrant, Weaviate, Chroma, and Milvus, write one sentence naming its
   category (managed-only, open-source with a managed option, or embedded).
2. Pick the vector database you'd use for a solo weekend RAG project, and the one you'd use for
   a production pipeline serving a company's customers. Justify each in one sentence.
3. If you have network access, open one managed console's free tier (Qdrant Cloud or Pinecone)
   and find where a collection/index gets created — compare it to the screenshot above.

## Check yourself

You're ready for Lesson 12 when you can explain the difference between "self-hosted" and
"embedded," and name which category Pinecone falls into.
