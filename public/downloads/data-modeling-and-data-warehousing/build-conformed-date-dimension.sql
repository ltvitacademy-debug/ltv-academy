/* ============================================================================
   Build & Populate a Conformed DimDate
   Data Modeling & Data Warehousing course — Resource Vault

   Uses the exact dw.DimDate shape this course's own capstone defines
   (Chapter 8, Lesson 38), so a script you run here drops straight into the
   capstone's FactPurchaseOrderLine, the Worked Example Library's
   FactWorkOrder example, or any other star schema you build in this course.

   Why this shape:
     - DateKey is an INT surrogate key in YYYYMMDD format (Lesson 12's one
       accepted exception to "surrogate keys are meaningless," Lesson 13).
     - FullDate keeps the real DATE value as the natural key, for
       traceability and ETL lookups (Lesson 13).
     - This is a conformed dimension (Lesson 15): build it ONCE, and every
       fact table in the warehouse — sales, procurement, manufacturing —
       joins to this same physical table, never a private copy.
     - One reserved row (DateKey = -1) is inserted for "unknown" so an
       accumulating snapshot's not-yet-reached milestone (Lesson 9) always
       has a valid foreign key to point at instead of a NULL.
   ============================================================================ */

CREATE TABLE dw.DimDate (
    DateKey              INT          NOT NULL PRIMARY KEY,   -- e.g. 20130615; -1 reserved for Unknown
    FullDate              DATE         NULL,                   -- NULL only for the reserved Unknown row
    DayNumberOfMonth      TINYINT      NULL,
    EnglishDayNameOfWeek  NVARCHAR(10) NULL,
    MonthNumberOfYear     TINYINT      NULL,
    EnglishMonthName      NVARCHAR(10) NULL,
    CalendarQuarter       TINYINT      NULL,
    CalendarYear          SMALLINT     NULL,
    IsWeekend             BIT          NULL
);
GO

-- Reserved "unknown" member (Lesson 12's reserved key value pattern, applied
-- to a date dimension): every milestone date foreign key on an accumulating
-- snapshot fact can point here until that milestone actually happens.
INSERT INTO dw.DimDate (DateKey, FullDate, DayNumberOfMonth, EnglishDayNameOfWeek,
                         MonthNumberOfYear, EnglishMonthName, CalendarQuarter,
                         CalendarYear, IsWeekend)
VALUES (-1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
GO

/* ----------------------------------------------------------------------------
   Populate real calendar rows for a 25-year span (2005-01-01 through
   2029-12-31) — wide enough to cover AdventureWorks2012/AdventureWorksDW2014's
   real order history plus years ahead for new fact loads, without having to
   re-run this script every year.
   ---------------------------------------------------------------------------- */
DECLARE @StartDate DATE = '2005-01-01';
DECLARE @EndDate   DATE = '2029-12-31';
DECLARE @CurrentDate DATE = @StartDate;

WHILE @CurrentDate <= @EndDate
BEGIN
    INSERT INTO dw.DimDate (
        DateKey, FullDate, DayNumberOfMonth, EnglishDayNameOfWeek,
        MonthNumberOfYear, EnglishMonthName, CalendarQuarter, CalendarYear,
        IsWeekend
    )
    VALUES (
        CAST(CONVERT(VARCHAR(8), @CurrentDate, 112) AS INT),   -- YYYYMMDD surrogate key
        @CurrentDate,
        DATEPART(DAY, @CurrentDate),
        DATENAME(WEEKDAY, @CurrentDate),
        DATEPART(MONTH, @CurrentDate),
        DATENAME(MONTH, @CurrentDate),
        DATEPART(QUARTER, @CurrentDate),
        DATEPART(YEAR, @CurrentDate),
        CASE WHEN DATENAME(WEEKDAY, @CurrentDate) IN ('Saturday', 'Sunday') THEN 1 ELSE 0 END
    );

    SET @CurrentDate = DATEADD(DAY, 1, @CurrentDate);
END;
GO

/* ----------------------------------------------------------------------------
   Validation — run these after populating
   ---------------------------------------------------------------------------- */

-- Row count should be the reserved row (1) plus one row per calendar day
-- in the range above (2005-01-01 through 2029-12-31 = 9,131 days).
SELECT COUNT(*) AS TotalRows FROM dw.DimDate;

-- Confirm the reserved Unknown member exists exactly once.
SELECT * FROM dw.DimDate WHERE DateKey = -1;

-- Confirm DateKey sorts identically to FullDate (the whole point of the
-- YYYYMMDD format — no separate ORDER BY logic needed for a surrogate key).
SELECT TOP 10 DateKey, FullDate, EnglishDayNameOfWeek
FROM dw.DimDate
WHERE DateKey > 0
ORDER BY DateKey;

-- Prove it's conformed: once more than one fact table references DimDate's
-- DateKey column, this query (the same technique Lesson 15's lab uses
-- against AdventureWorksDW2014) should return more than one fact table name.
-- SELECT DISTINCT t.name AS FactTableName
-- FROM sys.foreign_key_columns fkc
-- JOIN sys.tables t ON t.object_id = fkc.parent_object_id
-- JOIN sys.columns c ON c.object_id = fkc.parent_object_id AND c.column_id = fkc.parent_column_id
-- WHERE c.name LIKE '%DateKey';
