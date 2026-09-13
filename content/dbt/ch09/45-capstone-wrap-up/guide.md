# Lesson 45 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 9 · Capstone · Lesson 45 of 45 — Final Lesson**

## What you'll learn

- The last milestone: presenting a real, working dbt project
  credibly, not describing one
- What to actually point at — the lineage graph, the docs site, a
  passing CI run, test coverage — and in what order
- The specific questions this project should make you ready to answer
- Where this course's skills fit into the rest of the Analytics
  Engineer path, and into daily work, going forward

## What to actually show

A real, running dbt project is more convincing than a slide deck. In
an interview or a portfolio review, walk through it in this order:

1. **The lineage graph** (`dbt docs generate` → the Lineage tab) —
   thirty seconds tracing `raw` → staging → `int_orders_enriched` →
   `fct_orders`/`dim_customers`, out loud, proving you understand *why*
   each layer exists, not just that the arrows connect.
2. **The dbt Docs site itself** — click into `fct_orders`, show the
   real column descriptions you wrote in Lesson 43, and point out the
   exposure node showing the Power BI report as a real downstream
   consumer, exactly as Lesson 44 set up.
3. **Test coverage** — run `dbt test` live, and be ready to explain
   what your one singular test actually protects against, not just
   that generic tests exist on your key columns.
4. **A passing CI run** — if you carried this project into the
   Git/GitHub/CI-CD course's own capstone, this is the moment that
   pays off: a real green check on a pull request, running `dbt build`
   against your project, not a screenshot of one.
5. **The snapshot's history** — one query against `customers_snapshot`
   showing `dbt_valid_from`/`dbt_valid_to` actually capturing a change,
   proof the SCD Type 2 mechanism is real, not just configured.
6. **The Power BI report**, connected to the reporting layer, with
   your Import/DirectQuery choice explained in one sentence.

## Questions this project should prepare you for

- "Walk me through what happens when a new order lands, end to end."
  Raw table → staging → intermediate → `fct_orders`, with the
  incremental logic explained — you should answer this without
  looking anything up.
- "Why does `fct_orders` join on a surrogate key instead of the
  customer's natural ID?" — SCD Type 2 history, from Lesson 43. A
  natural-key join can't survive a customer's segment changing without
  losing the old value.
- "What's the difference between a generic and a singular test, and
  which did you use here, and why?" — a direct callback to Chapter 4,
  now answerable about a rule your own project actually enforces.
- "Why didn't you connect Power BI directly to `fct_orders`?" — the
  reporting-layer and least-privilege reasoning from Lesson 44.
- "What would you need to add to run this safely in CI?" — even if you
  didn't build the pipeline yourself here, you should be able to name
  what Chapter 7 covers: a workflow that runs `dbt build` on every pull
  request, and a separate, gated deploy job.

## Where this fits going forward

Nothing in this course was really about dbt syntax in isolation — it
was about giving the transformation layer between "data lands in the
warehouse" and "someone trusts a number in a report" the same rigor
software engineers expect from application code: version control,
testing, documentation, and a lineage graph that's generated, not
hand-drawn. That discipline transfers to any transformation tool at
any company — the specific YAML changes, the instinct to ask "is this
tested, documented, and traceable back to its source" doesn't.

This is the fourth course in the Analytics Engineer path's core
sequence — **T-SQL Development → Power BI → Snowflake → dbt /
Analytics Engineering** — and it's now complete: 45 lessons, 9
chapters, from "what is analytics engineering" to a real, tested,
documented project connected to a real report. From here, two
directions are both worth taking, in either order:

- **Git, GitHub & CI/CD for Data** — takes the exact project you just
  built and wires it into a real pull-request-gated pipeline, the
  piece Chapter 7 introduced but didn't build hands-on.
- The **Advanced stage** — **Azure Data Factory** and **Apache
  Airflow** — for orchestrating the pipelines that land data in the
  warehouse *before* dbt ever sees it, closing the loop on the whole
  raw-to-reporting picture this capstone worked through.

## Key terms

| Term | Meaning |
|---|---|
| Presentation order | Lineage graph → docs site → test coverage → CI run → snapshot history → Power BI |
| Portfolio review | Presenting a real, running project as evidence of a skill, not describing one from memory |
| What transfers | The discipline (version control, testing, docs, traceable lineage) — not any one tool's specific syntax |

## Lab

1. Practice the six-step walkthrough above, out loud, against your own
   project, in under five minutes.
2. Write out your own one-sentence answer to each of the five
   interview questions above, specific to your actual project.
3. If you're building a portfolio, link the repository (and the docs
   site, if you can host it) directly — a real, running project is
   more convincing than a screenshot of one.

## Check yourself

This course is complete when you can walk a stranger through your
capstone project end to end — lineage, tests, documentation, history,
and the Power BI connection — and answer all five interview questions
above without hesitation. That's the whole Analytics Engineer core
sequence done: T-SQL Development, Power BI, Snowflake, and now dbt.
