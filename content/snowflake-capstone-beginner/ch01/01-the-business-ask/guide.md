# Lesson 1 — The Business Ask: One Clean Ticket Report

**Chapter 1 · Beginner Capstone: The First Support Ticket Report · Lesson 1 of 10**

## What you'll learn

- Why this beginner project happens *before* the governed, multi-tool platform you'd build in
  the Advanced Snowflake Data Engineering Capstone — and why that's the realistic starting point
  for most Snowflake work
- The same four clarifying questions every vague reporting ask needs answered: time window,
  scope, metric, and grain
- How to turn a one-line Slack message from a stakeholder into a one-sentence requirement you
  could hand to anyone

## Where this picks up at Driftwood Media

The Advanced capstone in this path follows Driftwood Media, a mid-size subscription streaming
service, building out a fully governed Snowflake platform — dbt, Airflow, RBAC, masking, CI/CD,
the works. This beginner project happens **earlier**, before any of that exists. Right now
Driftwood doesn't have a dbt project, an Airflow DAG, or a company-wide warehouse convention. It
has one small, concrete ask from one stakeholder — and that is exactly how most real Snowflake
work actually starts: not as a platform initiative, but as one person who needs one number.

## The ask

Driftwood's **VP of Support** messages you directly:

> "Can you just show me how many tickets we're getting each day this month, broken down by
> priority? I want to glance at it before Monday's leadership sync."

That's the whole ask. No ticket, no spec, no existing dashboard to extend — just a VP, a vague
sentence, and a deadline a few days out.

## Why "just show me" is doing a lot of hiding

If you start querying before asking anything, you'll guess wrong on at least one of these:

- **"How many tickets"** — every ticket, or only tickets that came in through a customer, not an
  internal test or QA account?
- **"Each day this month"** — the current calendar month to date, or the full month including
  days that haven't happened yet?
- **"Broken down by priority"** — Driftwood's support tool tags every ticket Low, Medium, High,
  or Urgent. Does the VP want all four shown every day, even on days with zero Urgent tickets?
- **"Before Monday"** — does this need to be a live, refreshable report, or is a one-time answer
  fine? (It matters, because it decides whether this is worth building a Power BI connection for
  at all.)

A two-minute follow-up message gets you real answers: every ticket that reached a support agent,
counted by the calendar day it was created, for the current month to date, split out by all four
priority levels, and yes — the VP wants to glance at this again next month too, so it should be a
live report, not a one-off export.

## Turning the ask into a requirement

Written down, the real ask becomes:

> *"Build a report showing the count of support tickets created each day this month, broken out
> by priority (Low/Medium/High/Urgent), refreshable on demand, for Driftwood's VP of Support."*

That sentence is now specific enough that a teammate could read it and build the same thing.

## What this project deliberately does NOT include

- **No dbt, no Airflow.** This is one raw table, one SQL view, one Power BI connection — nothing
  that needs a transformation framework or an orchestrator yet. Those show up once Driftwood has
  more than one stakeholder and more than one data source to coordinate (see the Intermediate
  project).
- **No row-level masking or multi-role governance.** One read-only analyst role is enough for one
  stakeholder looking at ticket counts — not customer PII.
- **No real-time requirement.** A daily refresh the VP looks at before a weekly meeting doesn't
  need sub-minute freshness.

## Key terms

| Term | Meaning |
|---|---|
| Requirements clarification | Turning a vague stakeholder request into a specific, answerable one before writing any SQL |
| Scope | What is, and explicitly is not, included in the deliverable |
| Stakeholder | The person who asked for the report and will act on what it shows — here, Driftwood's VP of Support |
| Grain | The level of detail each row represents — here, one row per calendar day + priority combination |

## Lab

Before touching Snowflake, write your own one-paragraph requirement statement for the VP's ask,
covering: what counts as a ticket, the time window, the priority breakdown, and whether this is a
one-time answer or a refreshable report. Compare it to the example above.

## Check yourself

You're ready for Lesson 2 when you can state, from memory, the four questions you needed answered
before writing a single query — and explain why this beginner project intentionally skips dbt and
Airflow even though the Advanced capstone uses both.
