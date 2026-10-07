# Lesson 62 — Cortex Analyst: Natural Language to SQL

**Chapter 16 · Cortex AI & Agents on Snowflake · Lesson 62 of 76**

## What you'll learn

- What Cortex Analyst does: turns a plain-English business question into SQL, and runs it
- Why a semantic model — not the raw schema — is what the LLM actually reasons against
- Why Cortex Analyst's SQL runs under the asking user's own role, not a shared service account
- How this evolved in 2026 as Cortex Agents absorbed Cortex Analyst's query-generation into the agent loop

## The problem Cortex Analyst solves

A business user doesn't think in joins and `GROUP BY` clauses. They think
"what were our top five products by revenue last quarter?" Historically,
that question went to an analyst, who translated it into SQL by hand.
**Cortex Analyst** is Snowflake's managed feature for closing that gap: it
accepts a natural-language question, generates the SQL to answer it against
your actual Snowflake tables, runs that SQL, and returns both the data and
the SQL it generated — so nothing is a black box.

## The semantic model is the real foundation

Cortex Analyst doesn't let the LLM guess at your schema from table and
column names alone — that's exactly the kind of ungrounded guessing that
produces wrong joins and made-up columns. Instead, you author a
**semantic model**: a YAML file that explicitly maps business vocabulary to
your actual tables.

```yaml
tables:
  - name: orders
    base_table:
      database: SALES_DB
      schema: PUBLIC
      table: FACT_ORDERS
    dimensions:
      - name: order_date
        expr: order_date
        synonyms: ["date", "order day"]
    measures:
      - name: total_revenue
        expr: SUM(order_amount)
        synonyms: ["sales", "revenue"]
verified_queries:
  - name: "top products last quarter"
    question: "What were our top 5 products by revenue last quarter?"
    sql: "SELECT product_name, SUM(order_amount) AS revenue FROM fact_orders ..."
```

The semantic model names the tables, dimensions, measures, and synonyms,
and can include **verified queries** — known-good question/SQL pairs that
anchor the model's behavior for common asks. The LLM's job narrows to
mapping a new question onto this contract, not inventing SQL from a raw
schema. Independent testing has found roughly a 20% accuracy improvement
with a proper semantic model versus asking an LLM to generate SQL straight
from table definitions.

## It runs as you, not as a service account

This is the detail that makes Cortex Analyst usable in a governed
enterprise warehouse: the SQL it generates executes under **the asking
user's own role**. Every row-access policy, masking policy, and grant from
earlier chapters in this course still applies — Cortex Analyst can't show a
user data their role couldn't already query directly. The generated SQL is
also returned alongside the answer, so a user (or an auditor) can always
see exactly what ran.

## 2026 update: Cortex Agents absorbing Analyst's query generation

Cortex Analyst started as its own standalone API
(`cortex-analyst/message`). Through 2026, Snowflake shifted this
capability into **Cortex Agents** (Lesson 64): agents configured with a
Cortex Analyst semantic view as one of their tools now generate SQL
directly inside the agent's reasoning loop, which Snowflake reports
improves both accuracy and latency versus calling the standalone Cortex
Analyst API as a separate step. Snowflake's own release notes (August 2026)
recommend transitioning from the standalone Cortex Analyst API toward
building agents with a semantic view as a tool. The semantic model itself
doesn't go away — it's still the grounding artifact — but the natural
place to call it is increasingly the agent interface, not a direct Analyst
call.

## Key terms

| Term | Meaning |
|---|---|
| Cortex Analyst | Snowflake's managed natural-language-to-SQL feature, grounded in a semantic model |
| Semantic model | A YAML file naming tables, dimensions, measures, synonyms, and verified queries — the contract between business language and schema |
| Verified query | A known-good question/SQL pair included in the semantic model to anchor accuracy for common questions |
| Runs as the user | Generated SQL executes under the asking user's own role, so existing RBAC/masking/row-access policies still apply |

## Lab

1. Pick one table from an earlier chapter's lab (e.g. a fact table from
   Chapter 6) and sketch a short semantic-model YAML snippet for it: one
   dimension, one measure, and one verified query.
2. Write the plain-English question that verified query answers, then
   write the SQL by hand — compare how much of the mapping is "obvious"
   versus genuinely ambiguous without the semantic model's synonyms.

## Check yourself

You're ready for Lesson 63 when you can explain why a semantic model
improves accuracy over letting an LLM read raw table/column names directly,
and why Cortex Analyst's SQL runs under the asking user's role rather than
a shared service account.
