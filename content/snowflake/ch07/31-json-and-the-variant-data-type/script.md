# Script — JSON & the VARIANT Data Type

## Segment 1 (title)

Every table you've built so far has a fixed shape decided before a single row lands. JSON doesn't play by that rule — an API response or event log can vary field to field. Snowflake handles this with a native data type: VARIANT.

## Segment 2 (screenshot: raw JSON sample)

This is what raw JSON looks like before Snowflake touches it — one object per line, fields like CIK, COMPANY NAME, and FORM TYPE, no fixed column layout at all. In T-SQL you'd flatten this in application code first or fight with OPENJSON. Snowflake just stores it.

## Segment 3 (steps: creating and loading VARIANT)

Three steps: create a table with a single VARIANT column, no schema needed up front. Load raw JSON into it with COPY INTO, using file format type JSON and strip outer array to load each object as its own row. Query it — Snowflake stores it internally as optimized binary, not raw text, which is what makes reading into it fast.

## Segment 4 (steps: why VARIANT matters)

This is schema-on-read instead of schema-on-load. Most warehouses force you to flatten JSON into rigid columns at load time, so a new field next month breaks the pipeline. VARIANT accepts whatever shape the JSON is in, and you decide how to query into that structure later.

## Segment 5 (outro)

Next lesson: querying nested JSON — colon and dot notation, and PARSE_JSON, for reaching into the fields you just loaded.
