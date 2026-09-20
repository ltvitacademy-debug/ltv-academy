# Script — TempDB Configuration

## Segment 1 (title)

Every workload on an instance shares one tempdb — temp tables, row versioning, sort and hash spills, online index rebuild all land here. A default single-file tempdb becomes a real bottleneck under concurrency.

## Segment 2 (code: adding files)

Under high concurrency, sessions contend for the same allocation pages within a single data file. Microsoft's current guidance, and what Setup does automatically since 2016, is multiple equally-sized tempdb data files, one per logical CPU up to eight — added with ALTER DATABASE tempdb ADD FILE, matching size and growth on every file.

## Segment 3 (steps: why it matters and IFI)

Equal sizing matters because SQL Server's proportional-fill algorithm favors whichever file has more free space. Beyond eight cores, add files in multiples of four only after monitoring shows continued contention. And because tempdb rebuilds on every restart, Instant File Initialization matters especially here.

## Segment 4 (outro)

TempDB configuration is one of the highest-value, lowest-risk tuning changes on a busy instance. Next up: file growth strategy — fixed size versus percentage growth.
