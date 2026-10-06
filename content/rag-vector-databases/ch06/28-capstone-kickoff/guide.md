# Lesson 28 — Capstone Kickoff

**Chapter 6 · Capstone · Lesson 28 of 31**

## What you'll learn

- The capstone project you'll build across Lessons 29–31
- Exactly what "done" looks like, as a concrete checklist
- Why this project is scoped around one knowledge base, not several
- How each earlier chapter maps onto one specific part of the build

## The project: a production RAG knowledge assistant

Across three lessons, you'll build one project: a RAG assistant that answers questions over a real set of policy or support documents — small enough to finish, real enough that every pipeline stage from Chapters 1 through 5 has an actual job to do. It is deliberately scoped to **one knowledge base**, not a sprawling multi-source system. That's enough surface area to apply chunking, embedding, retrieval, re-ranking, grounded prompt assembly, citations, and failure handling for real, without the build ballooning into something you can't finish in three lessons.

## What "done" looks like

```
[ ] Documents ingested and chunked, with doc_id + page metadata
[ ] Chunks embedded and stored in a vector database collection
[ ] Retrieval returning a scored, with_payload result set
[ ] A re-ranking pass narrowing and reordering the candidates
[ ] A grounded prompt: system instruction + numbered context + question
[ ] Citations mapping each claim back to its source chunk
[ ] A score_threshold abstention path for low-confidence retrieval
[ ] A small evaluation set with at least one honest "I don't know" case
```

That's the full checklist across all three build lessons — Lesson 29 covers ingestion through citations, Lesson 30 covers the evaluation set and the tuning pass, and Lesson 31 turns the finished build into a presentable portfolio piece.

## Why one knowledge base, done completely, beats three done halfway

A tempting instinct for a capstone is to point it at several different document sets to make it look more capable. Resist that here. The entire point of this project is to demonstrate that every stage from Chapter 4 is *real* and *wired up*, not described in a paragraph — a re-ranker that actually reorders results, a citation that actually points at a real chunk, an abstention path that actually fires on a weak match. A three-source assistant with none of those stages fully working teaches less than a one-source assistant where they all do.

## Mapping chapters to build steps

```
Ch 1 (why RAG exists)      -> the architecture this assistant follows
Ch 2 (embeddings)          -> the embedding model this build uses
Ch 3 (vector databases)    -> where chunks are stored and searched
Ch 4 (the pipeline)        -> ingestion, retrieval, re-ranking, prompt,
                               citations, failure handling — the build itself
Ch 5 (advanced patterns)   -> the evaluation metrics behind Lesson 30's tuning
```

Nothing in this capstone introduces a new concept — every piece is a direct application of something Lessons 1 through 27 already covered. The work now is building it, not learning it.

## Key terms

| Term | Meaning |
|---|---|
| Capstone scope | The deliberately single-knowledge-base project used to apply every stage from Chapters 1–5 |
| Done checklist | The concrete list of working features that defines capstone completion, not a vague goal |

## Check yourself

Before starting Lesson 29, write out in your own words why a re-ranking pass needs a real re-ranker call to count as "done," rather than just retrieval's own similarity ranking left unchanged.
