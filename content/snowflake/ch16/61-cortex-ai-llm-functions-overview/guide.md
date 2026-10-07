# Lesson 61 — Snowflake Cortex AI: LLM Functions Overview

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 61 of 76**

## What you'll learn

- What Snowflake Cortex actually is: hosted LLMs you call from SQL, not a separate product you deploy
- The current AI_* (AISQL) function family, and why it replaced the older `SNOWFLAKE.CORTEX.*` names
- How to call a completion, a summary, a sentiment score, and a translation in plain SQL
- Why these calls never leave Snowflake's governance boundary — RBAC, masking, and billing all still apply

## Cortex is a function call, not a new system to run

Every AI feature in the rest of this chapter — Cortex Analyst, Cortex Search,
Cortex Agents — is built on the same foundation: **Cortex LLM functions**,
fully hosted large language models that Snowflake runs for you and that you
call the same way you'd call `UPPER()` or `SUM()`. There's no model to
deploy, no GPU to provision, no endpoint to manage. You write SQL (or
Python), Snowflake routes the call to a managed model, and the result comes
back as a column value in your result set — governed by the same roles,
masking policies, and warehouse billing as any other query.

## The current function family: AISQL

As of 2026, Snowflake's canonical function surface is the **AI_\*** family,
sometimes called AISQL:

| Function | Does |
|---|---|
| `AI_COMPLETE` | General-purpose prompt completion — ask it anything, get a generated response |
| `AI_SUMMARIZE` | Condenses a block of text into a shorter summary |
| `AI_SENTIMENT` | Scores text from -1 (negative) to 1 (positive) |
| `AI_TRANSLATE` | Translates text between languages |
| `AI_EXTRACT` | Pulls specific fields or answers out of unstructured text |
| `AI_CLASSIFY` | Sorts text or images into categories you define |
| `AI_FILTER` | Returns true/false for a natural-language condition — usable in a `WHERE` clause |
| `AI_AGG` / `AI_SUMMARIZE_AGG` | Summarizes or reasons across many rows at once, not just one |
| `AI_EMBED` | Produces embedding vectors for semantic search (the foundation under Lesson 63) |

You'll recognize older names in plenty of existing code and tutorials:
`SNOWFLAKE.CORTEX.COMPLETE`, `SNOWFLAKE.CORTEX.SUMMARIZE`,
`SNOWFLAKE.CORTEX.SENTIMENT`, `SNOWFLAKE.CORTEX.TRANSLATE`, and
`SNOWFLAKE.CORTEX.EXTRACT_ANSWER`. Those still run — Snowflake's own docs
describe them as "provided for backward compatibility" — but Snowflake has
said the legacy names will be **deprecated by the end of 2026**, with
`AI_COMPLETE` and the rest of the AI_* family as the surface to build on
going forward. If you inherit a script using the old names, it isn't
broken; it's just due for a rename.

## Calling it from SQL

```sql
-- General-purpose completion
SELECT AI_COMPLETE(
         'llama3.1-70b',
         'Summarize this support ticket in one sentence: ' || ticket_text
       ) AS one_line_summary
FROM   support_tickets
LIMIT  10;

-- Sentiment across a column of reviews
SELECT review_id,
       review_text,
       AI_SENTIMENT(review_text) AS sentiment_score
FROM   product_reviews;
```

The first argument to `AI_COMPLETE` is the model name — Snowflake hosts
several (Llama, Mistral, Snowflake's own Arctic family, and others), and
which ones are available depends on your region. Larger models cost more
credits per call; this is metered consumption, billed by tokens processed,
on top of whatever warehouse is running the query.

## Why this matters before Lessons 62-68

Cortex Analyst, Cortex Search, and Cortex Agents are not separate AI
products bolted onto Snowflake — they're built using these same LLM
functions, plus a semantic model, a search index, or an orchestration loop
layered on top. Understanding that `AI_COMPLETE` is "just a SQL function
that calls a hosted LLM" is the single idea that makes the rest of this
chapter click: everything downstream is this function, called under the
hood, with more structure around it.

## Key terms

| Term | Meaning |
|---|---|
| Cortex | Snowflake's umbrella name for its hosted AI/LLM features, called from SQL or Python |
| AISQL | The current `AI_*` function family (`AI_COMPLETE`, `AI_SUMMARIZE`, etc.) — the canonical surface going forward |
| Legacy Cortex functions | The older `SNOWFLAKE.CORTEX.*` names (`COMPLETE`, `SUMMARIZE`, `SENTIMENT`, `TRANSLATE`, `EXTRACT_ANSWER`) — still work, slated for deprecation by end of 2026 |
| Token-based billing | Cortex functions consume credits based on the volume of text processed by the model, not just warehouse runtime |

## Lab

1. In a Snowflake trial account (or any account with Cortex enabled), run
   `AI_SENTIMENT()` against a text column you already have — or a handful
   of literal strings — and compare the scores to your own read of the
   tone.
2. Rewrite one query that uses `SNOWFLAKE.CORTEX.SUMMARIZE` (search your
   own notes, a tutorial, or write one from scratch) using `AI_SUMMARIZE`
   instead, to practice the rename.

## Check yourself

You're ready for Lesson 62 when you can explain why `AI_COMPLETE` is
described as "just a SQL function" rather than a separate AI service, and
can name which legacy Cortex function name corresponds to `AI_SENTIMENT`.
