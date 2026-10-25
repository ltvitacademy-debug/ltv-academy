/* =====================================================================
   AZURE DBA COURSE — SLIDING-WINDOW PARTITIONING & COMPRESSION TEMPLATE
   =====================================================================
   A reusable template from Chapter 3 (Designing & Scaling Database
   Resources) and Chapter 9 (Database Performance & Maintenance), built
   around the Chapter 15 capstone's Telemetry table — an append-heavy,
   GPS/sensor feed growing roughly 50 GB a month, where "do nothing" is
   a slow-motion storage and performance problem.

   Pattern: partition by month so old data can be compressed or
   archived separately from the hot, recent range queries actually
   touch, then apply PAGE compression once a partition stops being
   actively written to.
   ===================================================================== */


/* ---------------------------------------------------------------------
   STEP 1 — Partition function: one boundary per month. Range RIGHT
   means each boundary value starts a new partition (the month begins
   ON that date, not ends on it).
   --------------------------------------------------------------------- */

CREATE PARTITION FUNCTION PF_TelemetryByMonth (DATETIME2)
AS RANGE RIGHT FOR VALUES (
    '2026-01-01', '2026-02-01', '2026-03-01', '2026-04-01',
    '2026-05-01', '2026-06-01', '2026-07-01', '2026-08-01',
    '2026-09-01', '2026-10-01', '2026-11-01', '2026-12-01'
);


/* ---------------------------------------------------------------------
   STEP 2 — Partition scheme: map every partition to the same
   filegroup for simplicity (a real on-prem design might spread
   partitions across filegroups on different storage tiers; Azure SQL
   abstracts physical storage, so a single filegroup is the common
   case here).
   --------------------------------------------------------------------- */

CREATE PARTITION SCHEME PS_TelemetryByMonth
AS PARTITION PF_TelemetryByMonth
ALL TO ([PRIMARY]);


/* ---------------------------------------------------------------------
   STEP 3 — Create (or re-create) the table on the partition scheme,
   partitioning on the column the feed is actually queried and loaded
   by — the reading timestamp.
   --------------------------------------------------------------------- */

CREATE TABLE dbo.Telemetry (
    TelemetryID     BIGINT IDENTITY(1,1) NOT NULL,
    TruckID         INT             NOT NULL,
    ReadingTime     DATETIME2       NOT NULL,
    Latitude        DECIMAL(9,6)    NOT NULL,
    Longitude       DECIMAL(9,6)    NOT NULL,
    SpeedMph        DECIMAL(5,2)    NULL,
    EngineStatus    VARCHAR(20)     NULL,
    CONSTRAINT PK_Telemetry PRIMARY KEY (TelemetryID, ReadingTime)
) ON PS_TelemetryByMonth(ReadingTime);

-- Note: the clustered/primary key must include the partitioning
-- column (ReadingTime) — this is a hard SQL Server rule, not a style
-- choice.


/* ---------------------------------------------------------------------
   STEP 4 — Sliding window maintenance: each new month, SPLIT a future
   boundary in before it's needed, and MERGE the oldest boundary out
   once that month is safely archived or compressed. Run this as a
   scheduled job (Chapter 10), not by hand.
   --------------------------------------------------------------------- */

-- Add next month's boundary ahead of time, so inserts never hit an
-- undefined partition
ALTER PARTITION SCHEME PS_TelemetryByMonth NEXT USED [PRIMARY];
ALTER PARTITION FUNCTION PF_TelemetryByMonth() SPLIT RANGE ('2027-01-01');

-- Once a month's data is fully outside the "hot, recent" window and
-- has been archived/compressed, merge its boundary out:
-- ALTER PARTITION FUNCTION PF_TelemetryByMonth() MERGE RANGE ('2026-01-01');


/* ---------------------------------------------------------------------
   STEP 5 — Compress partitions that are no longer being actively
   written to. PAGE compression trades a small CPU cost for a large
   storage/IO reduction on data that's mostly just sitting there
   (Lesson 16) — apply it per-partition, not to the whole table at
   once, so you're not paying the rebuild cost against the hot range.
   --------------------------------------------------------------------- */

-- Find which partition number corresponds to a given month first:
SELECT
    p.partition_number,
    prv.value AS boundary_value
FROM sys.partitions p
JOIN sys.indexes i ON p.object_id = i.object_id AND p.index_id = i.index_id
JOIN sys.partition_schemes ps ON i.data_space_id = ps.data_space_id
JOIN sys.partition_functions pf ON ps.function_id = pf.function_id
LEFT JOIN sys.partition_range_values prv
    ON pf.function_id = prv.function_id AND p.partition_number = prv.boundary_id + 1
WHERE OBJECT_NAME(p.object_id) = 'Telemetry'
ORDER BY p.partition_number;

-- Compress one specific (already-cold) partition, not the live one
ALTER TABLE dbo.Telemetry
REBUILD PARTITION = 3
WITH (DATA_COMPRESSION = PAGE);

-- Verify the compression actually took, and check the partition's
-- current row/page counts:
SELECT
    p.partition_number,
    p.data_compression_desc,
    ps.row_count,
    ps.used_page_count
FROM sys.partitions p
JOIN sys.dm_db_partition_stats ps
    ON p.object_id = ps.object_id AND p.partition_number = ps.partition_number
WHERE OBJECT_NAME(p.object_id) = 'Telemetry';
