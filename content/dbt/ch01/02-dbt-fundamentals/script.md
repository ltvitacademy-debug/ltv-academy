# Script — dbt Fundamentals: What Problem Does It Solve?

## Segment 1 (title)

Before dbt existed, a transformation like turning raw orders into a customer summary table was just a SQL script someone ran by hand, or a scheduled stored procedure. Nothing tested it, nothing documented it, nothing guaranteed it ran in the right order.

## Segment 2 (steps: before dbt)

As a raw script, that transformation has four real problems: no tests, so a broken assumption fails silently. No documentation, so nobody else knows what a column means. No dependency awareness, so it might run before its source table is even ready. And no version history of who changed what.

## Segment 3 (steps: after dbt)

As a dbt model, the exact same SQL logic gets four things for free: a ref call instead of a hardcoded table name, so dbt runs things in the right order. Tests that fail loudly. Documentation that lives next to the code. And full version control, because it's just a file.

## Segment 4 (steps: what actually changed)

The SQL itself barely changes — one hardcoded table name becomes one ref call. Everything else — testing, documentation, ordering, history — comes from that one change plus the tooling built around it.

## Segment 5 (outro)

Next lesson: dbt Cloud vs. dbt Core — the two ways you actually run all of this.
