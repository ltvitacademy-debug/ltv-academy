/* ============================================================
   WorkOrder Pipeline Validation Checks
   Microsoft Data & BI Capstone + Job Preparation
   ------------------------------------------------------------
   Companion script to Lesson 10 ("Validating the Full Pipeline,
   End to End") and Lesson 11 ("Handling a Late Schema Change").

   Run these four checks against your own build of the capstone
   warehouse every time the pipeline changes -- not just once at
   the end. Lesson 10's lab asks you to save these exact queries
   in a script file so you can re-run them verbatim; this is
   that file.

   Adjust server/database names in SSMS's connection if your
   scratch database isn't the default. All object names below
   match this capstone's own architecture from Lesson 2:
     stg.WorkOrder, dw.FactWorkOrder, dw.DimProduct,
     dw.DimScrapReason, dw.DimDate.
   ============================================================ */

/* ------------------------------------------------------------
   CHECK 1 -- Row counts match, source to warehouse
   Expected: all three numbers equal. This fact table's grain is
   one row per work order with no aggregation, so nothing should
   be gained or lost between stages.
   If FactRows < SourceRows: the SSIS package is dropping rows --
     check Data Flow Task 2's error output and the Product Lookup
     (it's configured to fail, not redirect, on a no-match).
   If FactRows > SourceRows: something is duplicating rows, almost
     always a join fan-out during a Lookup.
   ------------------------------------------------------------ */
SELECT COUNT(*) AS SourceRows FROM Production.WorkOrder;
SELECT COUNT(*) AS StagingRows FROM stg.WorkOrder;
SELECT COUNT(*) AS FactRows FROM dw.FactWorkOrder;


/* ------------------------------------------------------------
   CHECK 2 -- No orphaned foreign keys
   Expected: zero rows from every query below. An orphaned key
   means a fact row points at a dimension row that doesn't exist
   -- the report will render that row's product or date as blank
   or wrong instead of failing loudly, so this has to be checked
   explicitly; it won't surface on its own.
   ------------------------------------------------------------ */
SELECT COUNT(*) AS OrphanedProductKeys
FROM dw.FactWorkOrder f
LEFT JOIN dw.DimProduct p ON f.ProductKey = p.ProductKey
WHERE p.ProductKey IS NULL;

SELECT COUNT(*) AS OrphanedStartDateKeys
FROM dw.FactWorkOrder f
LEFT JOIN dw.DimDate d ON f.StartDateKey = d.DateKey
WHERE d.DateKey IS NULL;

SELECT COUNT(*) AS OrphanedEndDateKeys
FROM dw.FactWorkOrder f
LEFT JOIN dw.DimDate d ON f.EndDateKey = d.DateKey
WHERE f.EndDateKey IS NOT NULL AND d.DateKey IS NULL;

SELECT COUNT(*) AS OrphanedDueDateKeys
FROM dw.FactWorkOrder f
LEFT JOIN dw.DimDate d ON f.DueDateKey = d.DateKey
WHERE d.DateKey IS NULL;

-- ScrapReasonKey is nullable by design (most work orders scrap
-- nothing) -- only check rows that actually have a value.
SELECT COUNT(*) AS OrphanedScrapReasonKeys
FROM dw.FactWorkOrder f
LEFT JOIN dw.DimScrapReason sr ON f.ScrapReasonKey = sr.ScrapReasonKey
WHERE f.ScrapReasonKey IS NOT NULL AND sr.ScrapReasonKey IS NULL;


/* ------------------------------------------------------------
   CHECK 3 -- The numbers agree across tools
   Lesson 9's "single source of truth" promise, tested directly.
   Replace @ProductName below with a real DimProduct.Name value
   from your own build, then compare this result against
   WorkOrderProductionSummary.rdl's Scrap Rate column and the
   Power BI dashboard's Scrap Rate measure for the same product.
   All three should agree to the decimal.
   ------------------------------------------------------------ */
DECLARE @ProductName NVARCHAR(50) = N'Mountain-100 Black, 42';

SELECT
    p.Name AS ProductName,
    SUM(f.OrderQty)                       AS TotalOrderQty,
    SUM(f.ScrappedQty)                     AS TotalScrappedQty,
    SUM(f.ScrappedQty) * 1.0 / SUM(f.OrderQty) AS ScrapRateFromSQL
FROM dw.FactWorkOrder f
JOIN dw.DimProduct p ON f.ProductKey = p.ProductKey
WHERE p.Name = @ProductName
GROUP BY p.Name;


/* ------------------------------------------------------------
   CHECK 4 -- Dates are in range
   Compare this against the row count and date range noted in
   Lesson 1's lab from raw Production.WorkOrder. The warehouse
   should never show dates outside the range the source data
   actually covers -- a mismatch here usually means a bad
   DimDate join or a date dimension that doesn't span far enough.
   ------------------------------------------------------------ */
SELECT MIN(d.FullDate) AS EarliestEndDate, MAX(d.FullDate) AS LatestEndDate
FROM dw.FactWorkOrder f
JOIN dw.DimDate d ON f.EndDateKey = d.DateKey;

SELECT MIN(StartDate) AS EarliestSourceStart, MAX(EndDate) AS LatestSourceEnd
FROM Production.WorkOrder;


/* ------------------------------------------------------------
   OPTIONAL -- Lesson 11's added check, after a late schema
   change (e.g. the ShiftCode / DimShift addition). Confirm every
   ShiftKey either resolves to a real DimShift row, or is a
   legitimate NULL on a pre-change historical row.
   Uncomment once dw.DimShift and FactWorkOrder.ShiftKey exist.
   ------------------------------------------------------------ */
-- SELECT COUNT(*) AS OrphanedShiftKeys
-- FROM dw.FactWorkOrder f
-- LEFT JOIN dw.DimShift s ON f.ShiftKey = s.ShiftKey
-- WHERE f.ShiftKey IS NOT NULL AND s.ShiftKey IS NULL;
