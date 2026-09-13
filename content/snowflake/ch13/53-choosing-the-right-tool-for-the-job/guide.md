# Lesson 53 — Choosing the Right Tool for the Job

**Chapter 13 · Snowflake in the Modern Data Stack · Lesson 53 of 60**

## What you'll learn

- Four questions that narrow "which tool" down fast, in order
- How to apply them to four realistic scenarios
- Why the default answer is almost always "plain SQL" until a specific need rules it out
- Why reaching for every tool "just in case" is its own kind of mistake

## Four questions, in order

Given a new requirement, ask these in sequence and stop at the first
"yes":

1. **Can this be one SQL statement (a view, or a Task from Chapter 8)?**
   If yes, and nothing below applies — that's the whole answer. Don't
   reach for a framework to do what a `CREATE VIEW` already does.
2. **Does it need tests, documentation, version control, or reuse
   across many models by a team?** That's what dbt formalizes — it
   doesn't do anything SQL couldn't already do, it disciplines SQL
   that was going to exist anyway.
3. **Does the logic require something SQL fundamentally can't do** —
   calling an external API, complex branching, a machine learning
   model? That's Python's job, usually via Snowpark or the Snowflake
   Connector.
4. **Does success depend on multiple tools or systems finishing in the
   right order?** That's an orchestrator's job (Airflow, or ADF's own
   pipeline orchestration) — coordinating, not doing the work itself.

## Four realistic scenarios

**Scenario A — Recompute month-end sales totals from tables that
already exist in the warehouse.**
This is one SQL statement's worth of logic. Answer: a view (Lesson 51)
or a scheduled Task. Nothing else in this chapter needs to be
involved.

**Scenario B — Forty transformation models, built by a five-person
analytics team, that need documentation, tests, and a change history
everyone can review.**
The SQL itself might be no more complex than Scenario A's — but scale
and team process are the actual problem here. Answer: dbt. It's not
"better SQL," it's SQL with tests, docs, and version control wrapped
around it.

**Scenario C — Pull daily currency exchange rates from a third-party
REST API and load them into a dimension table.**
No amount of SQL can call an external API. Answer: Python (via
Snowpark, or a script that writes into a Snowflake staging table),
triggered on whatever schedule the rates need refreshing.

**Scenario D — A nightly pipeline where an ADF load must finish before
dbt runs, and a Python enrichment step must finish before the Power BI
dataset refreshes.**
Every individual step here might already be "solved" by one of A–C.
The actual problem is sequencing and dependency across systems.
Answer: an orchestrator — Airflow or ADF's own pipeline
orchestration — whose only job is making sure step order is respected
and failures are surfaced.

## The other mistake: reaching for everything "just in case"

The four-question framework cuts both ways. Standing up dbt for
Scenario A, or wiring Airflow around a single SQL view with no other
dependencies, adds operational surface area — another tool to
maintain, monitor, and onboard people to — for a problem plain SQL
already solved. The right tool for the job is often "no additional
tool," and that answer should never feel like it's missing something.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | An ordered set of questions used to pick the simplest sufficient tool |
| Operational surface area | Everything a tool adds to maintain, monitor, and train people on |
| Sequencing/dependency | Ensuring one system's step finishes before another's begins |

## Lab

1. For each of the four scenarios above, write the one sentence you'd
   give a teammate justifying the tool choice — without repeating this
   guide's wording.
2. Think of one real or hypothetical requirement from your own work
   and run it through the four questions above. Write down which
   question it stopped at, and why.

## Check yourself

You're ready to move on when you can run a new, unfamiliar requirement
through these four questions out loud, in order, and land on a tool
choice you could defend to a teammate who'd reach for a different tool
by habit.
