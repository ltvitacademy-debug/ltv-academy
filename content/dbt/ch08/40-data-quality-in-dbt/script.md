# Script — Data Quality Patterns in dbt

## Segment 1 (title)

Lesson 18 showed a Warn status in the Test Status lens without explaining it. Here's the answer: severity. Not every failed test should block a build.

## Segment 2 (code: severity)

Every test defaults to error severity — a failure stops the build. Downgrade it to warn, and the failure gets reported without stopping anything. Error for data that's actually wrong, warn for something worth a human's attention.

## Segment 3 (code: dbt_utils test macros)

Beyond the modeling macros from Lesson 31, dbt_utils ships test macros too. equal_rowcount asserts two models have the same row count after a reshape. not_null_proportion checks at least a given percentage populated, instead of an all-or-nothing not_null.

## Segment 4 (code: freshness)

not_null and unique check the data that's there. They say nothing about data that stopped arriving. Source freshness checks that instead — how old the newest row is, against warn and error thresholds — catching an upstream pipeline failure tests would stay silent about.

## Segment 5 (outro)

That's the whole chapter, tied together. Next up: the Capstone — raw data to a real reporting layer, start to finish.
