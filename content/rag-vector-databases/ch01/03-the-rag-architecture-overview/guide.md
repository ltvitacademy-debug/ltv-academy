# Lesson 3 — The RAG Architecture, Overview

**Chapter 1 · Why RAG Exists · Lesson 3 of 31**

## What you'll learn

- The two distinct phases every RAG system has: ingestion and query time
- The exact sequence of steps a query goes through, end to end
- Where each term you've heard (embedding, chunk, vector store, retrieval, context window) actually fits in the pipeline
- Why this course is ordered the way it is — starting with embeddings and vector databases before the full pipeline

## Two phases, not one pipeline

Every RAG system has two separate phases that run at completely different times, on different schedules.

**Ingestion** happens ahead of time, whenever your source documents change: you take your documents, split them into smaller pieces (**chunks**), convert each chunk into a vector (**embed** it), and store those vectors in a **vector database**, each one tagged with the original text and any useful metadata (date, author, source). This can run once, or on a schedule, or continuously as new documents arrive — but it's not something that happens while a user is waiting for an answer.

**Query time** happens the instant a user asks a question, and needs to be fast: embed the user's question with the same embedding model used during ingestion, search the vector database for the chunks whose vectors are closest to the question's vector, assemble a prompt containing those retrieved chunks plus the original question, and send that prompt to the LLM to generate the final answer.

## The query-time loop, step by step

1. **User asks a question.** Plain text, exactly as typed.
2. **Embed the query.** The question is converted into a vector using the same embedding model that embedded the documents at ingestion time — this match matters, covered in detail in Chapter 2.
3. **Retrieve.** The vector database runs a similarity search, returning the top-k chunks whose vectors are closest to the query vector — the chunks most likely to be relevant.
4. **Assemble the prompt.** The retrieved chunks get inserted into a prompt template alongside the original question, typically with instructions telling the model to answer using only the provided context.
5. **Generate.** The LLM reads the assembled prompt — question plus real retrieved text — and produces an answer that's now grounded in actual source material instead of memory alone.

## Why this is the fix for Lesson 1's problem

Compare this to the ungrounded example from Lesson 1. Instead of the model guessing what a typical vendor contract says, the retrieval step would pull the actual clause from the actual contract (assuming it was ingested), hand that real text to the model, and the model would generate an answer that quotes or paraphrases something that's actually in front of it — not a plausible-sounding guess.

## Why this course starts with embeddings and vector databases

This diagram has a lot of moving parts, and two of them — the embedding model and the vector database — are the foundation everything else depends on. If retrieval pulls back the wrong chunks, no amount of clever prompting fixes a bad answer; "garbage in, garbage out" applies directly. That's why Chapters 2 and 3 go deep on embeddings and vector databases specifically, before Chapter 4 builds the full pipeline (chunking, retrieval, prompt assembly) around them.

## Key terms

| Term | Meaning |
|---|---|
| Ingestion | The ahead-of-time phase: chunk documents, embed them, store the vectors |
| Chunk | A smaller piece of a document, sized to be embedded and retrieved meaningfully |
| Vector database | Where embedded chunks are stored and searched by similarity |
| Retrieval | The query-time step of finding the most relevant stored chunks for a given question |
| Top-k | The number of top-ranked chunks returned by a similarity search |

## Lab

1. Sketch (on paper or in a notes app) the five query-time steps in order, in your own words, without looking back at this guide.
2. For each step, write one thing that could go wrong at that step specifically (e.g., "retrieval pulls back irrelevant chunks").
3. Circle which of those failure points depend most directly on the embedding model and the vector database — these are exactly what the next two chapters cover.

## Check yourself

You're ready for Lesson 4 when you can list, from memory, the five steps of the RAG query-time loop in the correct order.
