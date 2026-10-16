-- Tag-Based ABAC Masking Policy Starter Kit
-- Course: Advanced Databricks Specialization — Chapter 6, Lesson 27
--
-- Reusable templates for governing PII by TAG rather than by a specific
-- column name in a specific table. Copy the sections you need and adapt
-- the tag values, group names, and column/table identifiers to your own
-- catalog. Every statement below is real, valid Unity Catalog SQL syntax.

-- =====================================================================
-- 1. TAG your columns by what they ARE, not by what they're called.
--    This is the step that makes the rest of this kit work: a policy
--    below protects every column carrying a tag, present or future,
--    without a separate ALTER TABLE per table.
-- =====================================================================

ALTER TABLE sales.customers ALTER COLUMN ssn
  SET TAGS ('pii_category' = 'ssn');

ALTER TABLE hr.employees ALTER COLUMN ssn
  SET TAGS ('pii_category' = 'ssn');

ALTER TABLE sales.customers ALTER COLUMN email
  SET TAGS ('pii_category' = 'email');

ALTER TABLE sales.customers ALTER COLUMN phone_number
  SET TAGS ('pii_category' = 'phone');

-- =====================================================================
-- 2. Prefer is_account_group_member() over the legacy is_member().
--    is_member() checks a WORKSPACE-LOCAL group -- it can resolve
--    differently across workspaces attached to the same metastore.
--    is_account_group_member() checks an ACCOUNT-LEVEL group instead,
--    consistently, no matter which attached workspace the query runs
--    from. Use this one by default on any new policy.
-- =====================================================================

-- =====================================================================
-- 3. One masking policy per PII category, applied by TAG, not by table.
--    This single statement protects every column tagged 'ssn', in every
--    table, including one added next quarter that nobody remembers to
--    run a separate ALTER TABLE against.
-- =====================================================================

CREATE MASKING POLICY mask_by_ssn_tag
  FOR COLUMNS TAGGED ('pii_category' = 'ssn')
  RETURN CASE
    WHEN is_account_group_member('pii-readers') THEN value
    ELSE 'REDACTED'
  END;

CREATE MASKING POLICY mask_by_email_tag
  FOR COLUMNS TAGGED ('pii_category' = 'email')
  RETURN CASE
    WHEN is_account_group_member('pii-readers') THEN value
    -- Partial mask instead of full redaction, for a lower-sensitivity
    -- category where showing the domain is still useful for triage:
    ELSE CONCAT('***@', SPLIT(value, '@')[1])
  END;

CREATE MASKING POLICY mask_by_phone_tag
  FOR COLUMNS TAGGED ('pii_category' = 'phone')
  RETURN CASE
    WHEN is_account_group_member('pii-readers') THEN value
    ELSE 'REDACTED'
  END;

-- =====================================================================
-- 4. Row filter template -- hides whole ROWS from a group, rather than
--    masking one column's value. Use this for the "finance analysts
--    should see aggregate revenue but never individual transaction
--    rows with customer names" shape of requirement.
-- =====================================================================

CREATE FUNCTION filter_by_region(region STRING)
RETURNS BOOLEAN
RETURN
  is_account_group_member('global-analysts')
  OR region = current_region();  -- replace current_region() with your
                                  -- own lookup of the caller's assigned
                                  -- region, however your org tracks it

ALTER TABLE sales.regional_orders
SET ROW FILTER filter_by_region ON (region);

-- =====================================================================
-- 5. Single-table, single-column mask -- the Lesson 43-style pattern,
--    for the rare case where tagging genuinely isn't worth it (a
--    one-off column with no broader PII category).
-- =====================================================================

CREATE FUNCTION mask_vendor_id(vendor_id STRING)
RETURNS STRING
RETURN CASE
  WHEN is_account_group_member('data-engineers') THEN vendor_id
  ELSE 'REDACTED'
END;

ALTER TABLE nyc_taxi.silver.trips
ALTER COLUMN VendorID SET MASK mask_vendor_id;

-- =====================================================================
-- 6. Audit query -- find every column currently carrying a given tag,
--    so you can confirm a policy's real reach before relying on it.
-- =====================================================================

-- SELECT catalog_name, schema_name, table_name, column_name, tag_value
-- FROM system.information_schema.column_tags
-- WHERE tag_name = 'pii_category';
