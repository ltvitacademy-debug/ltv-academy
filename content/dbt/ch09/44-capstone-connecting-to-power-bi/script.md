# Script — Capstone: Connecting to Power BI

## Segment 1 (title)

Milestone 3: your tested, documented marts layer, connected to Power BI the way the Snowflake course taught — through views tuned for BI consumption, not the raw marts tables handed over as-is.

## Segment 2 (steps: don't hand Power BI your marts tables)

fct_orders and dim_customers are the right foundation, but they're built for other dbt models to ref, full grain, every column. A reporting layer sits on top, dropping the surrogate and natural keys a report author would never filter or group by.

## Segment 3 (steps: its own schema, its own role)

Building reporting models into a dedicated schema means least privilege applies to the BI connection specifically. Power BI's connection uses a bi_reader_role scoped only to that schema — no grant on marts, intermediate, staging, or raw, on purpose.

## Segment 4 (steps: document it with an exposure)

An exposure says, explicitly, this report depends on these models — so the lineage graph doesn't stop at the last SQL file. Once it exists, dbt docs generate shows the Power BI report itself as a node in the graph.

## Segment 5 (steps: connect it, deliberately)

The Import versus DirectQuery decision is Snowflake-course material, and it doesn't change here — but it should be made against the reporting views, so a switch later doesn't mean re-pointing every report visual at a different table shape.

## Segment 6 (outro)

Next lesson: the final lesson of the entire course — wrapping up and presenting this project.
