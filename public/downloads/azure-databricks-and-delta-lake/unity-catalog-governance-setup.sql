-- =============================================================================
-- Unity Catalog Governance Setup Script
-- Azure Databricks & Delta Lake course — Chapter 4 (Unity Catalog)
--
-- A real, runnable template for standing up Unity Catalog governance around
-- this course's own nyc_taxi medallion pipeline (Chapters 1-3). Run section
-- by section in a notebook or SQL editor attached to a cluster with Unity
-- Catalog enabled. Replace the storage account path, group names, and
-- region column with your own workspace's values before running for real.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Catalog and schemas
-- -----------------------------------------------------------------------------

CREATE CATALOG IF NOT EXISTS nyc_taxi
MANAGED LOCATION 'abfss://unity-catalog@storageaccount.dfs.core.windows.net/nyc_taxi/';

USE CATALOG nyc_taxi;

CREATE SCHEMA IF NOT EXISTS bronze COMMENT 'Raw, untouched ingestion -- Chapter 3, Lesson 26';
CREATE SCHEMA IF NOT EXISTS silver COMMENT 'Cleaned, deduplicated, conformed data -- Lesson 27';
CREATE SCHEMA IF NOT EXISTS gold   COMMENT 'Business-level aggregates -- Lesson 28';

SHOW SCHEMAS IN nyc_taxi;

-- -----------------------------------------------------------------------------
-- 2. Managed tables (Unity Catalog owns storage + lifecycle -- Lesson 41)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS nyc_taxi.bronze.trips (
    VendorID              STRING,
    tpep_pickup_datetime  TIMESTAMP,
    PULocationID          INT,
    Borough               STRING,
    fare_amount           DOUBLE,
    trip_distance         DOUBLE,
    _ingested_at          TIMESTAMP,
    _source_file          STRING
) USING DELTA
COMMENT 'Raw NYC Taxi trip records, as ingested';

CREATE TABLE IF NOT EXISTS nyc_taxi.silver.trips (
    VendorID              STRING,
    tpep_pickup_datetime  TIMESTAMP,
    PULocationID          INT,
    Borough               STRING,
    fare_amount           DOUBLE,
    trip_distance         DOUBLE
) USING DELTA
COMMENT 'Cast, deduplicated, quality-checked trip records';

CREATE TABLE IF NOT EXISTS nyc_taxi.gold.daily_revenue (
    VendorID      STRING,
    trip_date     DATE,
    trip_count    BIGINT,
    total_revenue DOUBLE,
    avg_fare      DOUBLE
) USING DELTA
COMMENT 'Daily revenue per vendor -- one specific business question, per Lesson 28';

-- -----------------------------------------------------------------------------
-- 3. Groups this script assumes exist (create in the account console first):
--      data-engineers   -- builds and maintains the pipeline, full read/write
--      analytics-team   -- consumes gold only
--      contractors       -- time-boxed, region-restricted read access to silver
-- -----------------------------------------------------------------------------

-- Required session privileges -- without these, table-level GRANTs below do nothing (Lesson 42)
GRANT USE CATALOG ON CATALOG nyc_taxi TO `data-engineers`;
GRANT USE CATALOG ON CATALOG nyc_taxi TO `analytics-team`;
GRANT USE CATALOG ON CATALOG nyc_taxi TO `contractors`;

GRANT USE SCHEMA ON SCHEMA nyc_taxi.bronze TO `data-engineers`;
GRANT USE SCHEMA ON SCHEMA nyc_taxi.silver TO `data-engineers`;
GRANT USE SCHEMA ON SCHEMA nyc_taxi.silver TO `contractors`;
GRANT USE SCHEMA ON SCHEMA nyc_taxi.gold   TO `analytics-team`;

-- data-engineers: full read/write on bronze + silver, where the pipeline actually runs
GRANT SELECT, MODIFY ON SCHEMA nyc_taxi.bronze TO `data-engineers`;
GRANT SELECT, MODIFY ON SCHEMA nyc_taxi.silver TO `data-engineers`;

-- analytics-team: read-only on gold -- the one layer they should ever touch directly
GRANT SELECT ON SCHEMA nyc_taxi.gold TO `analytics-team`;

-- contractors: read-only, table-level (not schema-level) -- deliberately narrower than
-- the two grants above, per Lesson 42's warning about schema-level grants being broader
-- than intended
GRANT SELECT ON TABLE nyc_taxi.silver.trips TO `contractors`;

-- -----------------------------------------------------------------------------
-- 4. Row filter and column mask on silver.trips (Lesson 43)
--    -- contractors are region-restricted and never see the raw VendorID
-- -----------------------------------------------------------------------------

CREATE FUNCTION IF NOT EXISTS nyc_taxi.silver.mask_vendor_id(vendor_id STRING)
RETURNS STRING
RETURN CASE
    WHEN is_member('data-engineers') THEN vendor_id
    ELSE 'REDACTED'
END;

ALTER TABLE nyc_taxi.silver.trips
ALTER COLUMN VendorID SET MASK nyc_taxi.silver.mask_vendor_id;

CREATE FUNCTION IF NOT EXISTS nyc_taxi.silver.filter_by_region(pickup_borough STRING)
RETURNS BOOLEAN
RETURN is_member('data-engineers') OR is_member('analytics-team')
       OR pickup_borough = current_user_region();

ALTER TABLE nyc_taxi.silver.trips
SET ROW FILTER nyc_taxi.silver.filter_by_region ON (Borough);

-- -----------------------------------------------------------------------------
-- 5. Verification queries -- run these after any change to confirm it took effect
-- -----------------------------------------------------------------------------

SHOW GRANTS ON SCHEMA nyc_taxi.silver;
SHOW GRANTS ON TABLE nyc_taxi.gold.daily_revenue;

-- To remove a grant cleanly (mirrors the GRANT above, exactly):
-- REVOKE SELECT ON TABLE nyc_taxi.silver.trips FROM `contractors`;
