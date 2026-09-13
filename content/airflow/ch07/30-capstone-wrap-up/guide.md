# Lesson 30 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 7 · Capstone · Lesson 30 of 30**

## What you'll learn

- Presenting an orchestration project in an interview, credibly
- What to actually point at in your DAG, and in what order
- The specific questions this project should make you ready to answer
- Where this course — and this entire path — leaves you going forward

## What to actually show

A real, running DAG is more convincing than a slide deck describing
one. In an interview or a portfolio review, walk through it in this
order:

1. **The Graph view** — thirty seconds showing the real shape of the
   DAG: extract, load, the branch or sensor, the dbt trigger — proving
   the dependency structure is real, not just described.
2. **A passing run in the Grid view** — a genuinely green run history,
   proof this pipeline actually executes successfully, not just that
   the code compiles.
3. **The retry and alerting config** — read the `retries`,
   `retry_delay`, and the `on_failure_callback` out loud, and describe
   the deliberate failure you triggered to prove it works, exactly
   like Lesson 28's diagnostic habit.
4. **The dbt + Snowflake integration** — the task that triggers dbt
   against real data your pipeline loaded, tying together
   orchestration with the transformation and warehouse layers this
   whole path has built up to.
5. **One deliberately broken run, if you have it** — showing the Grid
   catching a real failure is more convincing than only showing
   success.

## Questions this project should prepare you for

- "Walk me through what happens when this DAG runs, end to end." You
  should answer this without opening the code.
- "Why a sensor (or branch) here specifically, instead of just running
  tasks in a fixed order?" — the real decision behind Chapter 4's
  content, now applied to a project you built.
- "What happens when the Snowflake load fails at 3 AM?" — retries,
  then the alert, then someone with a diagnostic checklist (Lesson 28)
  investigating in the morning, not scrambling in real time.
- "Why trigger dbt from Airflow instead of scheduling it separately?"
  — a direct callback to Chapter 5's Airflow + dbt lesson, now
  answerable about a real pipeline you built.

## Where this leaves you

This course wasn't really about DAG syntax in isolation — it was about
a specific anxiety in data work: pipelines that run unattended, where
something *will* eventually fail, and the only question is whether
anyone notices before it matters. Every practice in this course —
dependencies, sensors, retries, alerting, a real diagnostic habit —
exists to make that failure visible and recoverable instead of silent.

That instinct transfers to any orchestration tool at any job. The
specific DAG in this capstone will look different from whatever you
build next. The habit of asking "what happens when this fails, and
will anyone know" doesn't change.

## The Analytics Engineer path is complete

This is the seventh and final course in the Analytics Engineer path:
**T-SQL Development → Power BI → Snowflake → dbt → Git, GitHub &
CI/CD for Data → Azure Data Factory → Airflow**. Across those seven
courses, the whole chain is now covered end to end — writing the SQL,
modeling and visualizing it, warehousing it in Snowflake, transforming
it with dbt, versioning and testing every change, moving it with Data
Factory, and now orchestrating and monitoring the entire pipeline with
Airflow. There's no course after this one in the path — what's left
is building real pipelines with what you now know.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio review | Presenting a real, running DAG as evidence of a skill, not just describing it |
| Walkthrough order | Graph view → passing run → retry/alerting config → dbt+Snowflake integration → a failure, if you have one |

## Lab

1. Practice walking through your own capstone DAG out loud, in the
   order above, in under five minutes.
2. Write out your own answer to each of the four interview questions
   above, specific to your actual pipeline.
3. If you're building a portfolio, link the repository (or a short
   screen recording of the Graph and Grid views) directly — a real,
   running pipeline is more convincing than a screenshot of one.

## Check yourself

This course — and the entire Analytics Engineer path — is complete
when you can walk a stranger through your capstone DAG, end to end,
and answer all four questions above without hesitation.
