# Script — Memory Architecture

## Segment 1 (title)

The buffer pool is the largest consumer of SQL Server's memory, but not the only one. This lesson looks at how SQL Server manages memory overall — the other major consumers, the settings a DBA actually controls, and why more RAM alone isn't the whole story.

## Segment 2 (code: Beyond the buffer pool)

Besides the buffer pool, the plan cache holds compiled execution plans for reuse, and memory grants reserve workspace for sorts and hash operations during query execution. Older documentation mentions AWE for extending 32-bit memory access — that's legacy and doesn't apply to modern 64-bit SQL Server.

## Segment 3 (steps: Two settings every DBA controls)

Max server memory caps the total memory the Database Engine will use — every production instance should have it set explicitly, leaving headroom for the OS and other services. Min server memory sets a floor SQL Server won't shrink below once it reaches it. Left at its default, SQL Server will keep consuming available RAM.

## Segment 4 (steps: When a grant is too small)

Before running an operation like a sort or hash join, the optimizer estimates how much memory it'll need and requests a memory grant. If that estimate is too low — often from stale statistics or parameter sniffing — the operation spills to tempdb on disk, turning a fast in-memory step into a slow one.

## Segment 5 (outro)

Buffer pool, plan cache, memory grants, and the settings that bound them all — that's SQL Server's memory picture. Next up: SQLOS, the layer underneath memory management and scheduling.
