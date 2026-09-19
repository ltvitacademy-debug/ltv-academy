# Script — Resource Governor

## Segment 1 (title)

Without limits, SQL Server hands out CPU and memory in the order it's asked for, so one noisy workload can starve everything else with no warning. Resource Governor puts a ceiling on how much CPU and memory a given workload can consume.

## Segment 2 (code: the three pieces)

A resource pool is the actual CPU/memory ceiling. A workload group sits inside a pool and inherits its limits. A classifier function runs at login and decides which group a session belongs to, based on login name or application name. Miss ALTER RESOURCE GOVERNOR RECONFIGURE and none of it takes effect.

## Segment 3 (steps: a realistic example)

Cap a reporting service account's workload group at 30% CPU and 25% memory, and even its worst query physically cannot exceed that ceiling — the OLTP workload's share is protected because the classifier function routes that login somewhere that can't touch it.

## Segment 4 (outro)

Resource Governor is available on SQL Server on an Azure VM and Managed Instance, but not on Azure SQL Database, which solves the same problem differently through its own service-tier resource limits. Next up: recognizing a genuine resource bottleneck versus a query-design problem scaling won't fix.
