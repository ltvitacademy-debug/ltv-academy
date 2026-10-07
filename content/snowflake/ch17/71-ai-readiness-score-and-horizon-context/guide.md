# Lesson 71 — AI Readiness Score and Horizon Context

**Chapter 17 · AI Governance, Evaluation & Security · Lesson 71 of 76**

## What you'll learn

- What the AI Readiness Score measures and why it exists
- The two subdimensions behind the composite score: demand coverage and
  semantic view readiness
- What Horizon Context is, and how it relates to the Semantic Views you'd
  build for Cortex Analyst
- How to read a real score breakdown and turn it into a prioritized
  to-do list

## Not every table is ready to hand to an agent

A table can be perfectly fine for a human analyst — who knows which
columns to trust, which joins are safe, what a cryptic column name
actually means — and still be a bad idea to hand to a Cortex Agent, which
has none of that tribal knowledge unless it's written down somewhere the
agent can read. The **AI Readiness Score** exists to answer a concrete
question before you find out the hard way: *is this data actually ready
for AI workloads?* It scores assets on freshness, completeness,
governance maturity, and model compatibility, and tells data teams which
assets are safe to point an agent at and which need work first.

## Two subdimensions, one composite score

The score combines two things into a single 0–100 number:

- **Demand coverage** — what percentage of the analytical queries
  actually hitting your account land on tables you've marked
  "consumption-ready" (CR), versus raw or half-modeled ones.
- **Semantic view readiness** — what fraction of those consumption-ready
  tables have a proper Semantic View built for them (Coverage), and how
  complete those semantic views are — primary keys, relationships,
  metrics, descriptions, verified example queries (Quality).

Here's a real score breakdown, straight from Snowflake's own
"Is Your Data AI-Ready?" walkthrough:

![Snowsight's AI Readiness Score breakdown panel: Demand coverage scored 17 out of 100, Semantic view readiness scored 20 out of 100, broken down further into Coverage (18) and Quality (23) sub-bars.](/courses/snowflake/ch17/71-ai-readiness-score-and-horizon-context/score-breakdown.png)
*A real account's score breakdown — low on both dimensions, which is normal for an account that hasn't deliberately built semantic views yet.*
Source: [Snowflake Engineering Blog — AI Readiness Score: Evaluate Your Data for AI](https://www.snowflake.com/en/blog/engineering/ai-readiness-score-data-framework0/)

A score this low isn't a failing grade so much as a starting point — most
accounts score low here until a team deliberately goes and builds
Semantic Views for its most-queried tables, which is exactly what the
score is designed to prompt.

## Horizon Context: the governed semantic layer underneath it

**Horizon Context** is the piece of Horizon Catalog that turns raw
metadata into governed business meaning — metric definitions, dimensions,
relationships, and the access rules around them — so that every AI
agent, BI tool, and application reads from the *same* trusted
definitions instead of each one inventing its own idea of what
"revenue" means. It's built on **Semantic Views** (the same object Cortex
Analyst queries in Chapter 16 Lesson 62), which is why Semantic View
readiness is half of the AI Readiness Score: a semantic view isn't just a
convenience for Cortex Analyst, it's the artifact that makes a table
legible to *any* AI consumer.

## Turning a low score into a plan

The score isn't just a number — it ships with an opportunities list,
ranked by actual query volume, telling you exactly which schemas to
tackle first:

| Target | Detail | Action |
|---|---|---|
| `ANALYTICS.CUSTOMER_METRICS` | 276,043 reads across 33 tables, 0 with a CR semantic view | Build semantic views here first — highest read volume with zero coverage |
| `ANALYTICS.SALES_INTELLIGENCE` | 225,692 reads across 28 tables, 2 with coverage | Second priority — already has a start |
| `WAREHOUSE.RAW_EVENTS` | 138,629 reads across 2 tables, 0 with coverage | High read density per table — quick win |

That's the practical use of this score: not a vanity metric, but a
ranked backlog for where your next Semantic View actually pays off.

## Key terms

| Term | Meaning |
|---|---|
| AI Readiness Score | A 0–100 composite score of how ready an account's data is for AI workloads |
| Demand coverage | What share of real query traffic lands on consumption-ready (CR) tables |
| Semantic view readiness | Coverage (do CR tables have semantic views) + Quality (how complete those views are) |
| Horizon Context | The governed semantic layer inside Horizon Catalog, built on Semantic Views |
| Semantic View | The object holding metrics, dimensions, relationships — queried by Cortex Analyst and scored by this score |

## Lab

1. For a table you've worked with in this course, list what a Semantic
   View over it would need to define: at least two dimensions, one
   metric, and one relationship to another table.
2. Looking at the opportunities table above, explain in one sentence why
   `ANALYTICS.CUSTOMER_METRICS` ranks above `WAREHOUSE.RAW_EVENTS` despite
   `RAW_EVENTS` having higher reads-per-table.
3. Write one sentence explaining why a human-readable column name isn't
   enough on its own to make a table "AI-ready."

## Check yourself

You're ready for Lesson 72 when you can explain the two subdimensions
behind the AI Readiness Score, and describe in your own words why
Horizon Context and Semantic Views matter to more than just Cortex
Analyst.
