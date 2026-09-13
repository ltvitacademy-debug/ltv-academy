# Script — Dynamic Task Mapping

## Segment 1 (title)

Every DAG so far has had a fixed, hardcoded number of tasks. Real pipelines often don't know the count until run time — however many files landed today, however many regions exist right now. Dynamic task mapping solves this: one task definition, called with expand and a list, creates one instance per item at run time.

## Segment 2 (code: .expand())

add_one.expand with x equals a list of 1, 2, 3 doesn't run add_one once with a list argument — it creates three separate task instances, each running with one element. If the list had 20 items instead, there would be 20 task instances, with no code change.

## Segment 3 (screenshot: mapped grid view)

Each mapped task instance gets its own row in the Grid view, with its own Map Index identifying which element it processed. The number next to the task name shows how many instances it expanded into this run — determined by the list's length at run time, not hardcoded.

## Segment 4 (screenshot: map-then-reduce graph)

Calling sum_it on the entire mapped output is the reduce half of map-reduce — it doesn't run three times, it runs once, automatically receiving all three results as a list. Expand to process items individually, then reduce back to one task that aggregates the results.

## Segment 5 (outro)

This chapter is complete. Next chapter: practical data pipelines with Airflow — building a real ELT DAG, and triggering dbt and Snowflake from it.
