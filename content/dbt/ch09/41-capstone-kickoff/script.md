# Script — Capstone Kickoff: Raw Data to Reporting

## Segment 1 (title)

Everything from this course, applied to a project of your own. This capstone has one goal: prove you can take raw, already-landed data and turn it into a version-controlled, tested, documented dbt project a BI tool can trust — without a lesson walking you through each step.

## Segment 2 (steps: where the raw data comes from)

If you took the Snowflake course right before this one, you already have the raw material: the three sources from that course's own capstone, sitting in a raw schema. This project picks up right there — the staging-to-warehouse transformation you hand-wrote in SQL gets rebuilt as a real dbt project instead.

## Segment 3 (steps: the brief, part 1)

Define your sources with a real sources.yml and a freshness check. Build one staging model per raw source. Build at least one intermediate model combining two or more staging models. Build the marts layer — at least one fact and one dimension — the only layer anything downstream is allowed to query.

## Segment 4 (steps: the brief, part 2)

Test it with generic tests plus one singular test. Document every mart-layer model in schema.yml and generate real dbt Docs. Add a snapshot for history and at least one incremental model. Use at least one macro. Put it in Git — this exact project is what the Git/GitHub/CI-CD course's capstone picks up next.

## Segment 5 (steps: a realistic order of operations)

Sources and staging first — you can't build intermediate models on staging that doesn't exist. Get the transformation logic correct before adding tests. Add tests and docs once models are stable. Add the snapshot and incremental model once the plain version already works. Connect Power BI last.

## Segment 6 (outro)

Next lesson: the first milestone — staging and intermediate models, actually built against your own three sources.
