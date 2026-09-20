# Script — Buffer Pool Tuning

## Segment 1 (title)

The buffer pool is SQL Server's in-memory cache of data pages, and it's arguably the single most impactful piece of memory configuration on the whole instance.

## Segment 2 (code: max server memory)

Max server memory is the primary lever for buffer pool sizing. Too low and the buffer pool can't hold the working set no matter how much RAM the box has; too high and you starve the OS and other SQL Server components.

## Segment 3 (code: PLE per NUMA node)

On multi-NUMA-node servers, Page Life Expectancy is exposed per node, not just instance-wide. An instance-wide PLE that looks healthy can hide one specific node under real pressure while the others are comfortable.

## Segment 4 (outro)

PLE thresholds vary by buffer pool size — don't compare raw numbers across servers with different memory configs. If PLE stays flat after adding memory, memory wasn't the bottleneck; the search moves elsewhere. Next up: Resource Governor, capping one workload so it can't starve another.
