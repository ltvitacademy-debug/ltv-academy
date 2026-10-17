-- Resource Monitor + Statement Timeout Template
-- From Lesson 48. Requires ACCOUNTADMIN (or the CREATE RESOURCE
-- MONITOR privilege granted explicitly).

-- 1. Create the monitor with a layered trigger pattern:
--    warn early, soft-stop at quota, hard-stop past it.
CREATE OR REPLACE RESOURCE MONITOR <monitor_name>
WITH
    CREDIT_QUOTA = <credits_per_period>      -- set from real historical usage, not a guess
    FREQUENCY = monthly                       -- or daily / weekly / yearly / never
    START_TIMESTAMP = immediately
    TRIGGERS
        ON 75 PERCENT DO NOTIFY               -- email account admins, nothing stops
        ON 100 PERCENT DO SUSPEND             -- block new queries, let running ones finish
        ON 110 PERCENT DO SUSPEND_IMMEDIATE;  -- cancel everything right now

-- 2. Attach it -- creating a monitor does nothing until attached.

-- One warehouse:
ALTER WAREHOUSE <warehouse_name> SET RESOURCE_MONITOR = <monitor_name>;

-- Or the entire account (every warehouse without its own monitor):
-- ALTER ACCOUNT SET RESOURCE_MONITOR = <monitor_name>;

-- 3. Add a statement timeout -- the per-query leash underneath the
--    per-period monitor. Catches one runaway query (a missing WHERE
--    clause, an accidental cross join) before it burns hours of
--    credits, independent of the monthly budget.
ALTER WAREHOUSE <warehouse_name>
SET STATEMENT_TIMEOUT_IN_SECONDS = <seconds>;  -- e.g. 1800 for 30 min

-- 4. Verify both are in place
SHOW RESOURCE MONITORS;
SHOW PARAMETERS LIKE 'STATEMENT%' IN WAREHOUSE <warehouse_name>;

-- Reference: what a credit quota should be based on, not guessed --
-- actual historical consumption for this warehouse/period:
SELECT warehouse_name,
       DATE_TRUNC('month', start_time) AS period,
       SUM(credits_used) AS credits_used
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE warehouse_name = '<warehouse_name>'
GROUP BY warehouse_name, period
ORDER BY period DESC;
