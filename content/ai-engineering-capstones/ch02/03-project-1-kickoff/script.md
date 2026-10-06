# Lesson 3 — Project 1 Kickoff · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

This chapter, you're building a production-pattern retrieval-augmented
generation knowledge assistant over a real document set you choose
yourself — your own notes, a project's docs, anything you can legally
read into a pipeline.

## S2 · STEPS CARD (scope)

In scope: ingestion, chunking, embeddings, retrieval, grounded
generation, a measured evaluation, and a deployed API. Out of scope,
on purpose: a custom login system, multi-tenant isolation, fine-tuning
any model, a polished frontend, and autoscaling infrastructure.

## S3 · STEPS CARD (the stack)

Chunking uses langchain_text_splitters' RecursiveCharacterTextSplitter.
Vectors are stored in Qdrant. Generation calls Claude through the
Anthropic Messages API. Evaluation measures recall at k plus an
LLM-as-judge pass, and deployment wraps it all in FastAPI and Docker.

## S4 · STEPS CARD (deliverables)

Four deliverables carry this chapter: Lesson 4 builds ingestion and
chunking, Lesson 5 builds retrieval and generation, Lesson 6 measures
and tunes quality, and Lesson 7 deploys the whole thing behind a
containerized API.

## S5 · CODE CARD (repo layout)

Before any pipeline code, lay out the repo: an ingest folder, an index
folder for embeddings and the Qdrant client, a rag folder for
retrieval and generation, an eval folder, and an api folder — five
separate concerns, not tangled together.

## S6 · OUTRO CARD

Next: building the ingestion and chunking pipeline itself — loading
your documents and splitting them into overlapping chunks.
