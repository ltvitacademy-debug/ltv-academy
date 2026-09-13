# Script — Capstone Kickoff: SQL Server/CSV/JSON to Snowflake to Power BI

## Segment 1 (title)

Everything from this course, applied to a project of your own. This capstone has one goal: prove you can take three genuinely different raw sources, land them in Snowflake, shape them into a real warehouse, and connect it to Power BI — without a lesson walking you through each step.

## Segment 2 (steps: three sources)

Pick three sources that are deliberately different shapes: a SQL Server export, a plain CSV that doesn't relate one-to-one to it, and a JSON feed nested enough to actually need VARIANT and FLATTEN. The specific data matters less than practicing the loading and transformation decisions that change per source type.

## Segment 3 (steps: deliverables part 1)

The first half of the brief: load all three sources using the right technique for each, build a real staging-to-warehouse-to-reporting layering with a proper dimensional model, and wire up at least one Stream feeding a Task for incremental refresh.

## Segment 4 (steps: deliverables part 2)

The second half: configure at least two roles with real least-privilege grants, apply one deliberate performance decision backed by Query Profile, connect Power BI with a conscious Import versus DirectQuery choice, and be ready to present the whole thing.

## Segment 5 (steps: a realistic order)

Load everything before modeling anything — you can't model what you haven't landed. Get the dimensional model correct before automating it with Streams and Tasks. Add RBAC once the structure is stable. Tune and connect Power BI last, against a model that already works.

## Segment 6 (outro)

Next lesson: the first milestone — actually getting all three sources loaded and transformed through staging, using Chapter 3 and 4's loading techniques and Chapter 5's ELT patterns.
