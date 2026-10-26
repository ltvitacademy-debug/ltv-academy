# Lesson 1 — The Business Ask: A Governed Platform, Not Ad Hoc SQL

**Chapter 1 · Scoping the Production Analytics Platform · Lesson 1 of 26**

## What you'll learn

- The real pain Jaffle Shop's leadership is feeling, in their own words,
  not a sanitized textbook version of it
- What "governed, production-grade analytics platform" concretely means
  once you unpack it into five separate problems
- How this capstone's seven chapters map, one-to-one, onto those five
  problems
- Why this capstone starts from the assumption that Jaffle Shop's
  customer and orders marts already exist — and what that assumption
  changes about the job ahead

## The scenario

Jaffle Shop is a real-shaped small business — the same one the Beginner
and Intermediate tiers of this capstone already built against, using
dbt Labs' own public `jaffle_shop` sample data: `raw_customers`,
`raw_orders`, and `raw_payments`. Those earlier tiers got the basics
working: staging models, a couple of marts, a dashboard or two. That's
real progress, and it's also exactly the point where a lot of real
analytics teams get stuck.

Leadership's complaint, paraphrased from a real pattern this capstone
is modeling honestly: *"Every number in this company comes from
somebody's personal SQL file. Nobody knows if it's still right. When
something breaks, we find out from a confused VP, not from an alert.
Nobody outside the data team can tell what any of this actually does."*

That's not a request for more dashboards. It's a request to stop
running analytics like a one-person side project and start running it
like production software — which is a different job with a different
set of concerns.

## Unpacking "governed, production-grade" into five real problems

The ask sounds abstract until it's broken into the concrete gaps it's
actually naming:

| Gap in the ad hoc world | What "governed" replaces it with |
|---|---|
| Anyone with a password can query (or break) anything | Role-based access control — named roles with scoped privileges |
| Models are SQL files nobody tests | `dbt build` running real, named tests on every build |
| No one outside the data team can see what a model depends on | Generated docs and a lineage graph anyone can open |
| A new raw source gets loaded by hand, when someone remembers | A scheduled Python ingestion script, logged and repeatable |
| A bad change ships straight to the dashboard | A CI/CD gate that has to go green before anything merges |

Five gaps, five real tools, no hand-waving. That mapping is the actual
content of "governed, production-grade" — not a vibe, a checklist.

## How the next six chapters answer this

| Chapter | Which gap it closes |
|---|---|
| 2 — Snowflake Foundations | Roles, warehouses, dev/prod schema separation |
| 3 — Building the dbt Model Layer | Staging/intermediate/mart models, a snapshot, a shared macro library |
| 4 — Testing, Documentation & Governance | A custom generic test, docs, the lineage graph, `dbt build` as a gate |
| 5 — Python Ingestion Layer | A real ingestion script for a source with no native connector |
| 6 — CI/CD for the dbt Project | A GitHub Actions workflow that blocks a bad merge |
| 7 — Power BI Layer, Incident & Wrap-Up | BI on the governed marts only, a real incident caught by the gate |

Every chapter from here on is answering one named line item from this
lesson's table — nothing is introduced "because it's a good idea," it's
introduced because leadership's ask named the gap it closes.

## Why this capstone assumes the marts already exist

This is the Advanced tier of a three-tier capstone. The Beginner and
Intermediate tiers already built `stg_jaffle_shop__customers` (and
friends) and a couple of marts on top of them — real, working, but
ungoverned. This tier doesn't re-teach `ref()` or how to write a
`SELECT`; it assumes you can already do that, and spends its time on
the layer most courses skip: the governance, the team workflow, and the
production safety net around models you already know how to write.

## Key terms

| Term | Meaning |
|---|---|
| Ad hoc SQL | A query written and run by hand, with no test, no version history, no one else able to verify it |
| Governed platform | A system where access, correctness, documentation, and deployment are all enforced by tooling, not by memory |
| Production-grade | Built to keep running correctly without its original author in the room |
| Blast radius | How far a single change's effects can reach before something catches it |
| CI/CD gate | An automated check that a change must pass before it's allowed to merge or deploy |

## Lab

1. Write Jaffle Shop's business ask in your own words, in no more than
   three sentences.
2. List the five gaps from this lesson's table. For each one, name the
   chapter (2 through 7) that closes it.
3. In one sentence, explain why this capstone doesn't start by
   rebuilding `stg_jaffle_shop__customers` from scratch.

## Check yourself

You're ready for Lesson 2 when you can name all five governance gaps
from memory and explain, for each, which concrete tool (not a vague
concept) closes it.
