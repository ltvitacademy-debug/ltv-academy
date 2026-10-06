# Lesson 3 — Project 1 Kickoff

**Chapter 2 · Project 1 — Production RAG Knowledge Assistant · Lesson 3 of 23**

## What you'll learn

- The exact scope of the RAG assistant you're building in this
  project — and what's deliberately left out
- The tech stack you'll use across ingestion, retrieval, generation,
  and deployment
- The full deliverables checklist for Lessons 4 through 7
- How to lay out the project repository before writing any pipeline
  code

## What you're building

Across this chapter you'll build **a production-pattern retrieval-
augmented generation (RAG) knowledge assistant** over a real document
set you choose yourself — your own notes, an open-source project's
documentation, a public-domain book, course material, anything you can
legally read into a pipeline:

- An ingestion pipeline that loads your documents and splits them into
  overlapping chunks
- An embeddings + vector-database layer that stores those chunks for
  similarity search
- A retrieval step that pulls the most relevant chunks for a question
- A generation step that answers using only that retrieved context,
  with citations back to the source
- A small, hand-built evaluation set that measures retrieval and
  answer quality with real numbers
- A containerized deployment behind a minimal API

**What's explicitly out of scope** — and you should say so plainly in
your README, because naming your own simplifications is itself a skill
interviewers value: a custom login/auth system, multi-tenant document
isolation, fine-tuning an embedding or language model, a polished
frontend UI (a CLI or a minimal API is enough here), and horizontal
autoscaling infrastructure. This is one assistant over one document
set, built to be understood completely, not a multi-customer SaaS
product.

## The stack

- **Ingestion & chunking**: Python, with `langchain_text_splitters`'
  `RecursiveCharacterTextSplitter` for overlap-aware chunking (Lesson
  4).
- **Embeddings & vector storage**: an embedding model of your choice,
  stored in Qdrant — the same vector database this path's RAG & Vector
  Databases course already covered (Lesson 4-5).
- **Generation**: Anthropic's Claude, called through the Messages API
  in the official `anthropic` Python SDK (Lesson 5).
- **Evaluation**: a hand-built eval set scored with retrieval
  recall@k and an LLM-as-judge pass (Lesson 6).
- **Deployment**: a FastAPI wrapper and a Dockerfile, applying this
  path's Docker & AI Deployment course to your own service (Lesson 7).

## Deliverables checklist (Lessons 4-7)

1. **Lesson 4 — Ingestion & Chunking Pipeline**: a loader and a
   chunker that turn your raw documents into overlapping, metadata-
   tagged chunks.
2. **Lesson 5 — Retrieval & Generation**: a function that embeds a
   question, retrieves the top chunks from Qdrant, and generates a
   cited answer with Claude.
3. **Lesson 6 — Evaluation & Tuning**: a real eval set, measured
   retrieval and generation scores, and at least one tuning change
   made in response to those numbers.
4. **Lesson 7 — Deployment & Wrap-Up**: a containerized API serving
   the assistant, and a finished README.

## Setting up the repository

Before any pipeline code, lay out the project so ingestion, retrieval,
evaluation, and the API don't tangle together:

```
rag-assistant/
  ingest/        loaders + chunking (Lesson 4)
  index/         embeddings + Qdrant client (Lesson 4-5)
  rag/           retrieval + generation (Lesson 5)
  eval/          eval set + scoring (Lesson 6)
  api/           FastAPI app + Dockerfile (Lesson 7)
```

Initialize it as a normal Python project (a virtual environment and a
`requirements.txt` covering `langchain_text_splitters`,
`qdrant-client`, `anthropic`, and `fastapi`). Keep each folder as a
clearly separated concern — that separation itself is something a
reviewer notices.

## Key terms

| Term | Meaning |
|---|---|
| RAG pipeline | The full chain from raw documents to a grounded answer: ingest, chunk, embed, store, retrieve, generate |
| Grounded generation | An LLM answer built only from retrieved context, with citations back to where each claim came from |
| Eval set | A small, hand-built set of test questions with known-correct answers or sources, used to measure quality |

## Lab

Create the repository layout shown above, pick the real document set
you'll build this assistant over, and commit the empty skeleton. Add
the out-of-scope list from this lesson to your README now, before
you've written a line of pipeline code — it's easier to state your
boundaries before you're tempted to scope-creep past them.

## Check yourself

- Name three things this project's RAG assistant deliberately leaves
  out of scope, and why that's worth stating explicitly.
- What four deliverables does Lesson 4 through 7 each produce?
- Why does the evaluation step live in its own folder, separate from
  retrieval and generation, in this project's layout?
