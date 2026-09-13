# Script — Dynamic Data Masking in Snowflake

## Segment 1 (title)

Row access policies filter which rows a role sees. Dynamic data masking works at the column level instead — the stored value never changes, but Snowflake substitutes a masked value at query time for any role that shouldn't see the real one.

## Segment 2 (code: CREATE MASKING POLICY)

A masking policy is CASE logic keyed on CURRENT_ROLE. HR_ADMIN gets the real value back; every other role gets everything but the last four characters replaced with asterisks — the same SELECT, two different results.

## Segment 3 (code: ALTER TABLE SET MASKING POLICY)

A masking policy defined on its own does nothing until it's attached to a column with ALTER TABLE MODIFY COLUMN SET MASKING POLICY. From that point, every query against that column — any tool, any report — is masked or not, based purely on the querying role.

## Segment 4 (steps: reuse across tables)

One policy definition can be reused across every table that shares the same sensitive column type — every SSN column in the account can point at the same shared masking policy instead of duplicating the logic per table.

## Segment 5 (outro)

Next lesson: Query Profile and Query History — Snowsight's tools for seeing exactly what a query did and how long each step took.
