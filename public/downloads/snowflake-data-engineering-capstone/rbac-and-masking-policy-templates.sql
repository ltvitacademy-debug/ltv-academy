-- RBAC and Masking Policy Templates
-- Pulled from Lesson 9 (Securing Subscriber PII With RBAC and Masking).
-- Replace DRIFTWOOD_* names and the email-masking regex with your own
-- project's roles and sensitive columns. Study templates, not a substitute
-- for testing in a real account.

-- =============================================================================
-- 1. The three-role pattern: service role, read-only analyst role,
--    small-group compliance/elevated-access role
-- =============================================================================

CREATE ROLE IF NOT EXISTS driftwood_transformer
  COMMENT = 'dbt/Airflow service account. Read raw, write staging/intermediate/marts.';

CREATE ROLE IF NOT EXISTS driftwood_analyst
  COMMENT = 'Human analysts and the BI tool''s service account. Read-only, marts-only.';

CREATE ROLE IF NOT EXISTS driftwood_compliance
  COMMENT = 'Small group with a real, specific need to see unmasked PII (e.g. data-deletion requests).';

-- Least-privilege grants: each role gets exactly what its function requires.
GRANT USAGE ON DATABASE driftwood_analytics TO ROLE driftwood_transformer;
GRANT USAGE ON DATABASE driftwood_analytics TO ROLE driftwood_analyst;
GRANT USAGE ON DATABASE driftwood_analytics TO ROLE driftwood_compliance;

GRANT SELECT ON ALL TABLES IN SCHEMA driftwood_analytics.raw TO ROLE driftwood_transformer;
GRANT ALL ON SCHEMA driftwood_analytics.staging TO ROLE driftwood_transformer;
GRANT ALL ON SCHEMA driftwood_analytics.marts TO ROLE driftwood_transformer;

GRANT USAGE ON SCHEMA driftwood_analytics.marts TO ROLE driftwood_analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA driftwood_analytics.marts TO ROLE driftwood_analyst;

GRANT USAGE ON SCHEMA driftwood_analytics.marts TO ROLE driftwood_compliance;
GRANT SELECT ON ALL TABLES IN SCHEMA driftwood_analytics.marts TO ROLE driftwood_compliance;

-- =============================================================================
-- 2. A reusable masking policy template -- adapt the CASE logic and
--    the regex/substitution to your own sensitive column type
-- =============================================================================

CREATE MASKING POLICY driftwood_analytics.marts.email_mask
  AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('DRIFTWOOD_COMPLIANCE', 'DRIFTWOOD_TRANSFORMER') THEN val
    ELSE REGEXP_REPLACE(val, '^(.)[^@]*(@.*)$', '\\1***\\2')  -- jane.doe@x.com -> j***@x.com
  END;

ALTER TABLE driftwood_analytics.marts.dim_subscribers
  MODIFY COLUMN email
  SET MASKING POLICY driftwood_analytics.marts.email_mask;

-- A phone-number variant of the same pattern, for reference:
-- CREATE MASKING POLICY ... AS (val STRING) RETURNS STRING ->
--   CASE
--     WHEN CURRENT_ROLE() IN ('DRIFTWOOD_COMPLIANCE') THEN val
--     ELSE '***-***-' || RIGHT(val, 4)
--   END;

-- =============================================================================
-- 3. A row access policy template, for restricting rows rather than columns
--    (not used in this capstone, but a common follow-up requirement)
-- =============================================================================

-- CREATE ROW ACCESS POLICY driftwood_analytics.marts.region_filter
--   AS (region_col VARCHAR) RETURNS BOOLEAN ->
--   CURRENT_ROLE() IN ('DRIFTWOOD_COMPLIANCE')
--   OR region_col = CURRENT_ROLE();
--
-- ALTER TABLE driftwood_analytics.marts.some_table
--   ADD ROW ACCESS POLICY driftwood_analytics.marts.region_filter
--   ON (region);
