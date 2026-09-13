# Script — Snowflake Architecture: Storage, Compute & Cloud Services

## Segment 1 (title)

Snowflake looks like one product from the worksheet, but underneath it's built from three layers that scale independently: database storage, compute, and cloud services.

## Segment 2 (screenshot: architecture diagram)

Storage is the bottom layer — Snowflake compresses your data into a columnar format and manages it entirely in cloud storage, split into micro-partitions you never touch directly. Compute is the middle layer, made of virtual warehouses that actually run queries against that storage. Cloud services sits on top, coordinating authentication, metadata, query optimization, and access control.

## Segment 3 (steps: why separation matters)

On SQL Server, storage and compute live on the same box, so heavy workloads compete for the same resources. Snowflake decouples them on purpose: multiple warehouses can query the same copy of the data at the same time without blocking each other, because they're separate compute clusters reading from shared storage.

## Segment 4 (steps: what that unlocks)

That separation is also why warehouses scale and suspend independently — resizing a warehouse doesn't touch the data underneath, and a suspended warehouse costs nothing, because storage and compute are billed separately.

## Segment 5 (outro)

Next lesson: databases, schemas, and tables — how Snowflake organizes the storage layer you just learned about, and how it compares to SQL Server's structure.
