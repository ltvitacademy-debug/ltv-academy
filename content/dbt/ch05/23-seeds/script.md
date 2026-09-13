# Script — Seeds: Loading Static Reference Data

## Segment 1 (title)

A seed is a CSV file, committed to your dbt project, that dbt seed loads into your warehouse as a real table. No extraction, no pipeline — just a file in version control turned into a table by a CLI command.

## Segment 2 (steps: what a seed is for)

Seeds exist for exactly one situation: small, static reference data that doesn't come from — and doesn't belong in — a real source system. A country-code lookup, a legacy status-code mapping, a short list of holiday dates. Data nobody else owns, that changes rarely, and stays small enough to review as a diff.

## Segment 3 (code: the CSV)

Save a CSV like this under seeds, then run dbt seed. dbt creates a table with one row per CSV row, inferring column types from the data — which is exactly where things can go wrong for anything that isn't obviously a string or number.

## Segment 4 (code: column_types config)

Pin ambiguous columns explicitly in dbt_project.yml with column_types, instead of trusting inference — leading zeros and currency-looking strings are the usual failure case.

## Segment 5 (code: ref and CLI)

Once loaded, a seed is ref-able exactly like any model — nothing downstream needs to know it started life as a CSV. Reload just one seed with dbt seed --select, or drop and rebuild from scratch with --full-refresh.

## Segment 6 (outro)

Next lesson: Snapshots for Slowly Changing Dimensions — dbt's own mechanism for the SCD Type 2 pattern you already know from Snowflake.
