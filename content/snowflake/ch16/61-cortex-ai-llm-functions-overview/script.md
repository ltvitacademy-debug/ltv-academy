# Script — Snowflake Cortex AI: LLM Functions Overview

## Segment 1 (title)

Snowflake Cortex isn't a separate AI product you deploy — it's a set of hosted large language models you call the same way you'd call any SQL function. No model to stand up, no GPU to provision, no endpoint to manage yourself.

## Segment 2 (steps: the AISQL family)

The current function family is AI_COMPLETE for general-purpose prompts, AI_SUMMARIZE to condense text, AI_SENTIMENT to score tone from negative one to positive one, and AI_TRANSLATE or AI_EXTRACT to translate languages or pull a specific answer out of unstructured text. There's also AI_CLASSIFY for sorting text into categories you define, and AI_EMBED, which produces the embedding vectors that power the semantic search in Lesson 63.

## Segment 3 (steps: renamed, not removed)

If you've seen older tutorials, you've seen SNOWFLAKE.CORTEX.COMPLETE or SNOWFLAKE.CORTEX.SENTIMENT — those still run today, kept for backward compatibility, but Snowflake has said they'll be deprecated by the end of 2026 in favor of the AI_* names. If you inherit a script using the old names, it isn't broken, it's just due for a rename. Either way, billing works the same: credits metered by tokens processed, on top of whatever warehouse is running the query.

## Segment 4 (code: a completion and a sentiment score)

Here's AI_COMPLETE summarizing a support ticket in one sentence, and AI_SENTIMENT scoring a column of product reviews — both called directly in a SELECT statement, governed by the same roles and masking policies as any other query. The model name is just the first argument, and larger, more capable models cost more credits per call.

## Segment 5 (outro)

Next lesson builds on this directly: Cortex Analyst, which turns a plain-English question into the SQL to answer it — grounded in a semantic model, and still running under your own permissions.
