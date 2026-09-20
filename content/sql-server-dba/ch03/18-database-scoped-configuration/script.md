# Script — Database-Scoped Configuration

## Segment 1 (title)

Before SQL Server 2016, tuning options like max degree of parallelism lived only at the server level. Database-scoped configuration lets a DBA tune query-processing behavior per database instead.

## Segment 2 (code: real syntax)

You set these with ALTER DATABASE SCOPED CONFIGURATION SET, and view current values in sys.database_scoped_configurations. Any of these can also be set FOR SECONDARY, giving a readable Availability Group secondary different settings than the primary.

## Segment 3 (steps: three real options)

MAXDOP overrides server-level parallelism for just this database. LEGACY_CARDINALITY_ESTIMATION toggles between the modern and pre-2014 cardinality estimator. PARAMETER_SNIFFING turns off plan caching based on the first parameter value seen.

## Segment 4 (outro)

One instance, genuinely different workloads, genuinely different settings — no restart required. Next up: AUTO settings — how SQL Server manages statistics automatically.
