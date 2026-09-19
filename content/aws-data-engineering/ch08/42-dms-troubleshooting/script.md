# Script — DMS Troubleshooting

## Segment 1 (title)

Once a DMS migration is running against a real, non-trivial database, a specific set of issues shows up: large object columns, validation failures, undersized replication instances, and connectivity that looked fine until CDC needed a persistent connection.

## Segment 2 (steps: LOB handling modes)

Large object columns like VARCHAR(MAX), TEXT, or BLOB need special handling. Limited LOB mode caps size at a configured maximum — faster, but truncates anything larger. Full LOB mode migrates any size, but is noticeably slower since DMS fetches each LOB in a separate pass.

## Segment 3 (steps: validation & sizing)

Validation failures usually trace back to data type mismatches, timezone or collation differences, or rows that changed mid-load before CDC picked them up. An undersized replication instance shows up as slow full loads or CDC latency that keeps growing instead of staying near zero.

## Segment 4 (steps: network & VPC connectivity)

A replication instance that handles a full load fine can still fail CDC if the ongoing connection isn't stable — CDC needs a persistent connection to the source's transaction log. Security group rules that allow short connections but time out long ones, or a VPN link not sized for sustained throughput, are common culprits.

## Segment 5 (outro)

DMS chapter complete. Next up: Amazon EMR — managed Hadoop and Spark clusters for big data processing, starting with the fundamentals.
