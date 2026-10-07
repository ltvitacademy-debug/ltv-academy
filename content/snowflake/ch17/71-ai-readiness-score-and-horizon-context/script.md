# Script — AI Readiness Score and Horizon Context

## Segment 1 (title)

A table can be perfectly fine for a human analyst — who knows which columns to trust and what a cryptic name actually means — and still be a bad idea to hand to an agent, which has none of that tribal knowledge unless it's written down somewhere the agent can read. The AI Readiness Score answers a concrete question up front: is this data actually ready for AI workloads?

## Segment 2 (screenshot: a real score breakdown)

Here's a real score breakdown from Snowflake's own walkthrough — demand coverage at 17 out of 100, semantic view readiness at 20, split further into coverage at 18 and quality at 23. A score this low isn't a failing grade so much as a normal starting point — most accounts score low here until a team deliberately builds semantic views for its most-queried tables.

## Segment 3 (steps: two subdimensions)

Demand coverage is what percentage of real query traffic lands on tables marked consumption-ready, versus raw or half-modeled ones. Semantic view readiness splits into coverage — do those consumption-ready tables have a semantic view at all — and quality — how complete that view is, with primary keys, relationships, metrics, descriptions, and verified example queries.

## Segment 4 (steps: Horizon Context)

Horizon Context is the piece of Horizon Catalog that turns that metadata into governed business meaning, built on the same Semantic Views Cortex Analyst queries. The point isn't convenience — it's that every AI agent, BI tool, and application reads from the same trusted definition of something like "revenue," instead of each one inventing its own.

## Segment 5 (outro)

Next lesson: AI Guardrails — how Cortex protects an agent from prompt injection and jailbreak attempts hidden in the very data and documents it's reading.
