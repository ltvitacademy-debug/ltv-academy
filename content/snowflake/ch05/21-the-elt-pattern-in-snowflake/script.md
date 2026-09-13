# Script — Raw → Cleaned → Business-Ready: The ELT Pattern in Snowflake

## Segment 1 (title)

Traditional ETL transforms data in a separate engine before it ever reaches the warehouse. Snowflake pipelines flip that: extract, load the raw data as-is, then transform it afterward with SQL running inside the warehouse itself. That's ELT.

## Segment 2 (steps: why Snowflake fits ELT)

This works because storage and compute are billed separately. Loading raw data is cheap storage, not compute. Transformation is ordinary SQL against a warehouse you size for the job and suspend when it's done — no separate transformation engine to install or keep in sync.

## Segment 3 (steps: the three layers)

Every lesson from here through Chapter 6 moves data through three layers: raw, an unmodified landing zone; staging or cleaned, typed and deduplicated and validated; and business-ready, modeled as star schemas for a BI tool to query directly.

## Segment 4 (code: transient staging table)

Raw and staging tables are good candidates for transient tables — no fail-safe period, lower storage cost, because that data is always reproducible by re-running the load or the transform. Business-ready tables, what reports depend on directly, are usually worth making permanent.

## Segment 5 (outro)

Next lesson: CREATE TABLE AS SELECT, the single SQL statement that does most of the transforming work in this chapter.
