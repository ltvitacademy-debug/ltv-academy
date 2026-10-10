# Lesson 41 — Agent Bricks & Document Intelligence

**Chapter 8 · Agentic Data Engineering & What's New · Lesson 41 of 42**

## What you'll learn

- The real two-function pipeline behind autonomous document
  intelligence: `ai_parse_document` and `ai_extract`
- The medallion-architecture pattern this runs on — Bronze, Silver,
  and Gold, exactly like every other pipeline in this course
- The "Use Agent" shortcut that generates a working Declarative
  Pipeline from a natural-language description
- The real three-task Lakeflow Jobs orchestration pattern used to
  keep it running incrementally in production
- Which downstream use cases this unlocks once the data is structured

## The problem: unstructured documents, structured answers

A huge share of enterprise data — PDFs, scanned forms, contracts,
invoices — sits outside any table, unqueryable by SQL and invisible to
BI tools. "Agent Bricks" is Databricks' umbrella for AI building
blocks like this; the concrete pipeline this lesson covers is their
**Document Intelligence** pattern: turning a folder of raw PDFs into
governed, structured Delta tables, incrementally, using two SQL
functions.

## The two functions

- **`ai_parse_document`** — takes a raw document (a PDF, for example)
  and extracts its raw content: text, tables, layout structure.
- **`ai_extract`** — takes that parsed content and a described schema,
  and pulls out specific structured fields (invoice number, vendor
  name, line-item totals) as typed columns.

Together, they form a two-step pipeline: parse first to get usable
content out of an opaque file format, then extract to turn that
content into the specific columns your downstream use case actually
needs.

## The medallion pattern, applied to documents

This isn't a new architecture — it's the exact Bronze/Silver/Gold
pattern from Chapter 3, applied to unstructured files instead of
structured event data:

| Layer | What it holds | How it's built |
|---|---|---|
| Bronze | Raw document bytes, ingested via Auto Loader (Chapter 2) | Streaming ingestion from a Unity Catalog Volume of raw files |
| Silver | Parsed document content | A streaming table built with `ai_parse_document`, incremental |
| Gold | Structured, typed fields extracted from the content | A streaming table built with `ai_extract` against a declared schema, incremental |

Both the Silver and Gold layers are built as **incremental streaming
tables** — exactly the Lakeflow Declarative Pipeline pattern you
learned in Chapter 3, with Auto Loader feeding Bronze, incremental
`ai_parse_document` calls building Silver, and incremental `ai_extract`
calls building Gold. New documents landing in the source volume flow
through automatically, the same way new rows flow through any other
Declarative Pipeline in this course.

## The "Use Agent" shortcut

Rather than hand-writing every step of this pipeline, Databricks'
Lakeflow authoring surface includes a "Use Agent" option: describe
what you want in natural language, and it generates a working
Declarative Pipeline — the Bronze ingestion, the Silver parse step,
and the Gold extract step with your described schema — as real,
editable `pyspark.pipelines` code. This is the same principle you just
saw in Lesson 40's Lakeflow Designer: AI-assisted authoring that
produces inspectable code, not a black box.

## Orchestrating it: a real three-task Lakeflow Jobs pattern

Once the pipeline exists, Databricks' own reference pattern wires it
into a Lakeflow Job with three tasks, chained exactly the way you
learned in Chapter 4:

1. **Ingest** — Auto Loader brings new raw documents into Bronze.
2. **Parse and Extract** — the Declarative Pipeline runs, producing
   updated Silver and Gold tables.
3. **Refresh Dashboard** — a downstream BI dashboard or report refreshes
   against the newly updated Gold table.

This is literally the same `depends_on` fan-out pattern from Chapter
4, Lesson 24 — each task becomes eligible once its upstream task
succeeds, with no manual intervention needed as new documents arrive.

## What this unlocks downstream

Once documents are structured into governed Gold tables, five real
categories of downstream use case open up, all built on data that used
to be locked inside unqueryable files:

- **Chatbots and agents** — an AI agent can now query structured
  invoice or contract data directly via SQL, instead of needing to
  re-parse a PDF on every question.
- **Search** — structured fields become indexable and filterable in a
  way raw PDF text never was.
- **Unified analytics** — document-derived data joins cleanly with
  the rest of your lakehouse's structured tables, under the same
  Unity Catalog governance.
- **Dashboards** — BI tools can report directly against Gold tables
  built from what used to be unstructured paperwork.

## Why this belongs in an advanced Databricks course

Nothing about `ai_parse_document` or `ai_extract` replaces anything
you've learned — they're ordinary SQL functions, called inside the
exact same Auto Loader → Declarative Pipeline → Lakeflow Jobs pattern
this whole course has built toward. What's genuinely new is the
*source* of the data: unstructured documents, finally brought into the
same governed, incremental, production pipeline discipline as every
other table in this course.

## Key terms

| Term | Meaning |
|---|---|
| Agent Bricks | Databricks' umbrella term for AI building blocks like the Document Intelligence pattern |
| ai_parse_document | SQL function that extracts raw text, tables, and layout from a document |
| ai_extract | SQL function that pulls specific structured fields out of parsed content, against a described schema |
| Use Agent | A Lakeflow authoring shortcut that generates a working Declarative Pipeline from a natural-language description |

## Check yourself

Without looking back: what do `ai_parse_document` and `ai_extract` each
do, in what order do they run, and which medallion layer does each one
build?
