# Lesson 11 — Object Tagging

**Chapter 3 · Tags and Classification · Lesson 11 of 25**

## What you'll learn

- What an object tag is, independent of what (if anything) reacts to it
- How to create a tag and apply it to columns, tables, schemas, databases, and warehouses
- How to query what's tagged with `TAG_REFERENCES_ALL_COLUMNS`
- The difference between a manually authored tag, a system tag, and a custom-classifier tag

## What a tag actually is

A tag is a key, optionally with a constrained set of allowed values, that you can attach to almost any Snowflake object: a column, a table, a schema, a database, even a warehouse. On its own, a tag is pure governance **metadata** — it doesn't do anything by itself. What a tag enables depends entirely on what you wire up to react to it, same as Lesson 10's tag-based masking policy. Tags are also used for things that have nothing to do with PII at all — cost-center tagging on a warehouse, or an `environment = 'PROD'` tag on a database, for example.

```sql
CREATE OR REPLACE TAG tags.tasty_pii
  ALLOWED_VALUES 'NAME', 'PHONE_NUMBER', 'EMAIL', 'BIRTHDAY'
  COMMENT = 'Tag for PII, allowed values are: NAME, PHONE_NUMBER, EMAIL, BIRTHDAY';
```

`ALLOWED_VALUES` is optional but valuable: it constrains what the tag can be set to. Attempting to apply a value outside the list is rejected at apply time, which keeps tagging consistent across an account with many teams instead of accumulating free-text drift (`'email'`, `'Email'`, `'EMAIL_ADDR'`, all meaning the same thing).

## Applying a tag manually

```sql
ALTER TABLE raw_customer.customer_loyalty
MODIFY COLUMN
  first_name SET TAG tags.tasty_pii = 'NAME',
  phone_number SET TAG tags.tasty_pii = 'PHONE_NUMBER';
```

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS showing the TASTY_PII tag manually applied to five columns of customer_loyalty, with tag values NAME, EMAIL, PHONE_NUMBER, and BIRTHDAY.](/courses/snowflake-data-governance/ch03/11-object-tagging/manually-tagged-columns.png)
*A manually authored, custom tag applied by hand with `ALTER TABLE ... SET TAG` — the most common starting point for tagging.*

## Querying what's tagged

```sql
SELECT
  tag_database,
  tag_schema,
  tag_name,
  column_name,
  tag_value
FROM TABLE(information_schema.tag_references_all_columns
  ('tb_101.raw_customer.customer_loyalty','table'));
```

`TAG_REFERENCES_ALL_COLUMNS` is the one query pattern that works no matter who — or what — applied the tag. `SHOW TAGS IN SCHEMA tags;` is the companion statement for listing the tags themselves (their names, allowed values, and comments) rather than what they're applied to.

## Not every tag is custom and manual

Tagging isn't limited to tags you write yourself. Snowflake ships its own **system tags** that other features apply automatically.

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS showing Snowflake's own system tag PRIVACY_CATEGORY applied automatically to columns like first_name, e_mail, city, and postal_code, with values IDENTIFIER and QUASI_IDENTIFIER.](/courses/snowflake-data-governance/ch03/11-object-tagging/system-applied-tags.png)
*A system-defined tag, `PRIVACY_CATEGORY`, applied automatically by Snowflake's own data classification feature (Lesson 13) — nobody wrote a `CREATE TAG` statement for this one.*

A tag can also come from a **custom classifier's** own logic (Lesson 14) — your own code recognizing a pattern in the data and tagging it.

![Snowsight query result confirming a PLACEKEY semantic-category tag applied to a location column, via TAG_REFERENCES_ALL_COLUMNS.](/courses/snowflake-data-governance/ch03/11-object-tagging/custom-classifier-tag-result.png)
*Same querying pattern — `TAG_REFERENCES_ALL_COLUMNS` — confirms a tag applied by a custom classifier's own regex logic, not a human typing `ALTER TABLE`.*

Three different origins — a human, Snowflake's built-in classification, or a custom classifier — and all three show up in exactly the same query. That consistency is the point: once something is tagged, it doesn't matter how it got tagged for the purposes of querying, reporting, or wiring up a policy.

## Tags aren't just for columns

Columns are the most common target in this course, but tagging works on more than columns. `ALTER DATABASE ... SET TAG`, `ALTER SCHEMA ... SET TAG`, and `ALTER WAREHOUSE ... SET TAG` are all valid — useful for things entirely unrelated to PII, like tagging a warehouse with a cost-center value for chargeback reporting, or tagging a database `environment = 'PROD'` so monitoring tooling can filter by it.

## Key terms

| Term | Meaning |
|---|---|
| Object tag | A key, with optional constrained values, attachable to columns, tables, schemas, databases, and warehouses |
| `ALLOWED_VALUES` | A constrained list of values a tag may be set to; an unlisted value is rejected |
| `TAG_REFERENCES_ALL_COLUMNS` | The information-schema table function that reports what's tagged, regardless of who or what applied the tag |
| System tag vs. custom tag | A system tag (e.g. `PRIVACY_CATEGORY`) is applied automatically by a Snowflake feature; a custom tag (e.g. `TASTY_PII`) is authored and applied by hand |

## Lab

1. Create a tag of your own with at least three `ALLOWED_VALUES`, and apply it to two columns in a test table with two different values.
2. Run `TAG_REFERENCES_ALL_COLUMNS` against that table and confirm both tag assignments show up.
3. Tag a warehouse with a `cost_center` tag (no `ALLOWED_VALUES` restriction needed) and confirm it with `SHOW TAGS`.

## Check yourself

- What does a tag do by itself, before anything is wired up to react to it?
- Name the three different origins a tag can come from, as shown in this lesson.
- Besides columns, name two other object types a tag can be applied to.
