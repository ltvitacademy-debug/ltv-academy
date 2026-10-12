-- ============================================================================
-- Incremental Load Watermark Pattern — reusable SQL template
-- Based on Lesson 36 (Incremental Loads With SSIS) and Lesson 48
-- (Capstone: Incremental Load & Error Handling).
--
-- Swap <<TargetDatabase>>, <<ControlTable>>, <<SourceTable>>, and
-- <<ChangeTrackingColumn>> for your own values. Everything else in this
-- pattern stays the same regardless of what you're loading.
-- ============================================================================

-- 1. One-time setup: create the control table that holds the watermark.
--    Run this once, against <<TargetDatabase>>.
CREATE TABLE dbo.<<ControlTable>> (
    LastLoadDate DATETIME NOT NULL
);

-- Seed it with a date earlier than any real data, so the first run loads
-- everything that currently exists.
INSERT INTO dbo.<<ControlTable>> (LastLoadDate)
VALUES ('1900-01-01');


-- 2. In SSIS: an Execute SQL Task, *before* the Data Flow Task, with
--    ResultSet = Single row, mapped into a package variable
--    (e.g. User::LastLoadDate, type DateTime).
SELECT LastLoadDate
FROM dbo.<<ControlTable>>;


-- 3. In SSIS: the OLE DB Source inside the Data Flow Task uses this query,
--    with the package variable mapped to the "?" parameter (OLE DB) or
--    "@LastLoadDate" (ADO.NET) — see Lesson 8 for parameter marker syntax
--    per connection type.
SELECT *
FROM <<SourceTable>>
WHERE <<ChangeTrackingColumn>> > ?;


-- 4. In SSIS: a second Execute SQL Task, *after* the Data Flow Task
--    succeeds (green precedence constraint), updates the watermark to the
--    current run's maximum value. Only advance the watermark after a
--    successful load — advancing it earlier risks skipping rows if the
--    run fails partway through.
UPDATE dbo.<<ControlTable>>
SET LastLoadDate = (
    SELECT MAX(<<ChangeTrackingColumn>>)
    FROM <<SourceTable>>
);


-- 5. Optional: a run log table, written to from an OnError event handler
--    (Lesson 31) so a failure leaves a record even if nobody was watching.
CREATE TABLE dbo.<<RunLogTable>> (
    RunTime      DATETIME     NOT NULL DEFAULT GETDATE(),
    PackageName  NVARCHAR(100) NOT NULL,
    ErrorMessage NVARCHAR(4000) NULL
);
