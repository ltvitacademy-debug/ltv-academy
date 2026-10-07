# Lesson 63 — Cortex Search: Hybrid Semantic Search for RAG

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 63 of 76**

## What you'll learn

- What Cortex Search is: a fully managed retrieval service for unstructured text, not a vector database you run yourself
- Why "hybrid" means vector search + keyword search + semantic reranking, run together on every query
- How to stand up a search service with one SQL statement
- How Cortex Search fits into a RAG (retrieval-augmented generation) pipeline alongside the LLM functions from Lesson 61

## The retrieval problem

Lesson 61's LLM functions are great at reasoning over text you hand them —
but they only know what's in the prompt. If you want an LLM to answer
questions grounded in a pile of support tickets, product manuals, or
contracts, you first need to find the *right* few paragraphs out of
thousands, and put only those into the prompt. That's **retrieval**, and
it's the core problem RAG (retrieval-augmented generation) architectures
solve. **Cortex Search** is Snowflake's fully managed service for exactly
this: index a text column, query it with natural language, get back the
most relevant chunks.

## Why "hybrid" matters

Pure vector (embedding) search is good at matching *meaning* but can miss
an exact product code or acronym that a keyword search would catch
instantly. Pure keyword search is good at exact matches but misses
paraphrases. Cortex Search runs **both on every query, plus a semantic
reranking pass**, and blends the results — without you having to tune
weights between the two yourself:

1. **Vector search** — embeds the query and compares it against embedded
   document chunks, powered by Snowflake's own Arctic Embed model (or, as
   of March 2026, a customer-supplied embedding model if you want to bring
   your own).
2. **Keyword/lexical search** — classic full-text matching, catching exact
   terms vector search can blur past.
3. **Semantic reranking** — a final pass that reorders the combined
   candidates by relevance to the specific query.

## Standing up a search service

```sql
CREATE OR REPLACE CORTEX SEARCH SERVICE support_ticket_search
  ON ticket_text
  ATTRIBUTES ticket_id, product_line, created_at
  WAREHOUSE = cortex_wh
  TARGET_LAG = '1 hour'
  AS (
    SELECT ticket_id, product_line, created_at, ticket_text
    FROM   support_tickets
  );
```

`TARGET_LAG` controls how fresh the index stays relative to the underlying
table — Snowflake manages the refresh automatically, the same way Dynamic
Tables (Chapter 8) manage their own refresh schedule. Once created, you
query it with `SNOWFLAKE.CORTEX.SEARCH_PREVIEW` from SQL, or the REST
API/Python client from an application:

```sql
SELECT SNOWFLAKE.CORTEX.SEARCH_PREVIEW(
  'support_ticket_search',
  '{"query": "customer cannot reset their password", "limit": 5}'
);
```

## Cortex Search as the "R" in RAG

A typical RAG pipeline on Snowflake looks like this: a user's question goes
to Cortex Search, which returns the top handful of relevant chunks from
your indexed documents; those chunks get stitched into a prompt alongside
the original question; that combined prompt goes to `AI_COMPLETE`
(Lesson 61); and the model's answer is grounded in your actual documents
instead of whatever it happened to memorize during training. Cortex
Agents (Lesson 64) wrap this entire pattern into a single orchestrated
tool call, so you rarely write this pipeline by hand once agents are in
play — but understanding the two-step retrieve-then-generate shape is what
makes the agent's behavior legible rather than magic.

## Key terms

| Term | Meaning |
|---|---|
| RAG (retrieval-augmented generation) | Retrieving relevant source text and feeding it into an LLM prompt, so answers are grounded in real documents |
| Cortex Search | Snowflake's fully managed hybrid search service for unstructured text |
| Hybrid search | Running vector search, keyword search, and semantic reranking together on every query |
| Arctic Embed | Snowflake's own embedding model that powers the vector-search half of Cortex Search by default |
| TARGET_LAG | How fresh a Cortex Search index stays relative to its source table — managed automatically, like a Dynamic Table |

## Lab

1. Pick a text-heavy table from an earlier chapter's lab data (or imagine
   one — e.g. product descriptions or support tickets) and write the
   `CREATE CORTEX SEARCH SERVICE` statement you'd use to index it,
   including which columns are searchable text versus filterable
   attributes.
2. Write one natural-language query you'd expect that service to answer
   well, and one it would likely struggle with (e.g. an exact internal
   code number) — and explain why the hybrid approach helps with the
   second case specifically.

## Check yourself

You're ready for Lesson 64 when you can explain why Cortex Search runs
vector, keyword, and reranking together rather than picking just one, and
can sketch the retrieve-then-generate shape of a RAG pipeline using Cortex
Search plus an `AI_COMPLETE` call.
