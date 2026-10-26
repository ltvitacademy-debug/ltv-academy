# Lesson 10 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 10 of 10**

## What you'll learn

- A recap of the full Jaffle Shop project, start to finish
- Which real, transferable skills this project actually demonstrated
- Where the Intermediate project picks up, and how it raises the stakes

## What actually happened, start to finish

Ten lessons ago, this project started with a single frustrated sentence from Jaffle
Shop's Ops Manager: *"Our customer data is a mess... I just want ONE list I can trust."*
Here's everything that sentence turned into:

1. **Lesson 1** — turned the vague complaint into a specific, written requirement: source,
   scope, grain, and a concrete definition of "trust."
2. **Lesson 2** — planned the dbt project in plain terms before building anything: one
   source, one staging model, one mart model, named explicitly.
3. **Lesson 3** — loaded the real public Jaffle Shop seed data into Snowflake with a real
   `CREATE STAGE` and `COPY INTO`.
4. **Lesson 4** — scaffolded the dbt project with `dbt init` and connected it to that same
   Snowflake database with a real `profiles.yml`.
5. **Lesson 5** — declared `raw_customers` as a dbt source in a real `sources.yml`.
6. **Lesson 6** — built the staging model, `stg_jaffle_shop__customers`, with one clean
   rename and no business logic.
7. **Lesson 7** — wrote `not_null` and `unique` tests on `customer_id`, turning "trust"
   into something dbt actually checks.
8. **Lesson 8** — built the mart model, `customers`, using `ref()` for the first time in
   this project — the actual deliverable.
9. **Lesson 9** — ran `dbt build` end to end and read a real, complete
   `Done. PASS=4 ERROR=0` result.

## The real skills, underneath the tools

None of these lessons were really "about" dbt or Snowflake alone — each one used those
tools to practice a transferable skill:

| Lesson(s) | Tool skill | Underlying real skill |
|---|---|---|
| 1 | — | Requirements clarification |
| 2 | dbt project planning | Designing a system in layers before building it |
| 3 | Snowflake stage/`COPY INTO` | Getting raw data into a usable state, correctly |
| 4 | `dbt init`, `profiles.yml` | Separating configuration from credentials |
| 5–6 | `sources.yml`, staging models | Disciplined, minimal transformation — doing exactly one job per layer |
| 7 | `schema.yml`, `data_tests:` | Turning a vague promise into an automated, checkable guarantee |
| 8–9 | `ref()`, `dbt build` | Delivering a result someone else can trust and rerun themselves |

A hiring manager — or a real stakeholder — cares about this right-hand column far more
than which dbt command you typed. The dbt and Snowflake syntax is the vehicle;
requirements clarification, disciplined layering, and testable trust are what actually
made this project succeed.

## What this project deliberately left out

This Beginner project was scoped smaller than the full capstone sequence on purpose: no
order history, no payment totals, no intermediate models, no CI/CD, no production
scheduling. That wasn't a limitation to apologize for — it was the correct scope for the
actual request from Lesson 1, and knowing how to scope down is as real a skill as knowing
how to scope up.

## Where the Intermediate project picks up

The next project in this capstone sequence raises the stakes in the direction this
Beginner project deliberately avoided: `raw_orders` and `raw_payments` join in alongside
`raw_customers`, an intermediate layer appears for the first time, and the mart model
stops looking like a pass-through of staging and starts doing real business logic — exactly
the shift Lesson 8 flagged as still ahead. The skills from this project don't get
replaced — requirements clarification, the sources/staging/marts discipline, and real
dbt tests are still the foundation — but now they get applied to a harder, more
ambiguous ask with more real tables involved.

## Key terms

| Term | Meaning |
|---|---|
| Transferable skill | A capability (like requirements clarification or disciplined layering) that matters independent of which specific tool is used |
| Scope discipline | Deliberately choosing what *not* to build, to match effort to the actual request |

## Lab

Write a short project summary, as if for a resume or portfolio, describing this Beginner
capstone in two or three sentences — focused on the skills demonstrated, not the tool
names.

## Check yourself

You're ready to move on when you can list, from memory, all nine earlier lessons' real
skill (not just the tool used), and explain in one sentence what the Intermediate project
adds that this one deliberately left out.
