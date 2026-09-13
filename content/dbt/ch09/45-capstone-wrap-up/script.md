# Script — Capstone: Wrap-Up & Portfolio Presentation

## Segment 1 (title)

The last milestone: presenting a real, working dbt project credibly, not describing one. What to actually point at, in what order, and the questions this project should make you ready to answer.

## Segment 2 (steps: what to show, part 1)

The lineage graph, traced out loud from raw through staging and intermediate to the marts layer. The docs site itself, with real column descriptions and the exposure node showing Power BI as a real downstream consumer. Test coverage, run live, with your singular test explained.

## Segment 3 (steps: what to show, part 2)

A passing CI run, if you carried this into the Git/GitHub/CI-CD capstone — a real green check, not a screenshot. The snapshot's history, one query proving dbt_valid_from and dbt_valid_to actually captured a change. The Power BI report, with your Import or DirectQuery choice explained.

## Segment 4 (steps: interview questions to be ready for)

Why does fct_orders join on a surrogate key instead of a natural ID. What's the difference between a generic and a singular test, and which did you use. Why didn't you connect Power BI directly to fct_orders. Every one of these should be answerable about your own project, not from memory.

## Segment 5 (steps: where this fits going forward)

This was never really about dbt syntax in isolation — it was about giving the transformation layer the same rigor software engineers expect: version control, testing, documentation, a lineage graph that's generated, not hand-drawn. That discipline transfers to any tool, at any company.

## Segment 6 (outro — course complete)

That's the dbt / Analytics Engineering course — 45 lessons, 9 chapters, and the fourth course in the Analytics Engineer path's core sequence: T-SQL Development, Power BI, Snowflake, and now dbt. From here: Git, GitHub & CI/CD for Data, or the Advanced stage with Data Factory and Airflow.
