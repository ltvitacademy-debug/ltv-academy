# Script — Cortex Analyst: Natural Language to SQL

## Segment 1 (title)

Cortex Analyst takes a plain-English business question, generates the SQL to answer it against your real Snowflake tables, runs it, and hands back both the data and the SQL it generated — nothing hidden, nothing a user has to trust blindly.

## Segment 2 (steps: grounded by a semantic model)

It doesn't let the LLM guess at your schema from raw table and column names — that's exactly the kind of ungrounded guessing that produces wrong joins and invented columns. Instead you author a semantic model: a YAML file naming tables, dimensions, and measures, with synonyms like "revenue" mapping to a real SUM expression, plus verified queries — known-good question-and-SQL pairs that anchor accuracy for common asks.

## Segment 3 (code: a semantic model fragment)

Here's a fragment: an orders table, a total_revenue measure defined as SUM of order_amount with synonyms "sales" and "revenue," and a verified query pairing a real question with its correct SQL. The LLM's job is narrowed to mapping new questions onto this contract, not inventing SQL from scratch — and testing has found roughly a 20% accuracy gain from having a proper semantic model in place.

## Segment 4 (steps: why this is safe to roll out)

The generated SQL runs under the asking user's own role, so every row-access and masking policy from earlier in this course still applies — Cortex Analyst can't show someone data their role couldn't already see. And as of 2026, Snowflake has been shifting this capability into Cortex Agents directly: an agent configured with a Cortex Analyst semantic view as a tool now generates SQL inside its own reasoning loop, which Snowflake says improves both accuracy and latency over calling Analyst as a separate step.

## Segment 5 (outro)

Next lesson tackles the same grounding problem for unstructured text: Cortex Search, which combines vector, keyword, and reranking into one hybrid retrieval service.
