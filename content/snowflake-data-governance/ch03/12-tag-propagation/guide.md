# Lesson 12 — Tag Propagation

**Chapter 3 · Tags and Classification · Lesson 12 of 25**

## What you'll learn

- How to classify and tag an entire schema in one call with `SYSTEM$CLASSIFY_SCHEMA`
- How tagging "propagates" to tables you never named directly
- How a tag-driven masking policy on a base table propagates forward through the dependency graph into views
- The one case where tags do **not** propagate automatically: cloning

## Propagation at the schema level

Lesson 11 tagged one column at a time. That doesn't scale to a schema with dozens of tables. `SYSTEM$CLASSIFY_SCHEMA` runs Snowflake's classification engine (the same engine behind `SYSTEM$CLASSIFY`, covered fully in Lesson 13) against every table in a schema in one call.

```sql
CALL SYSTEM$CLASSIFY_SCHEMA('raw_pos', {'auto_tag': true});
```

![Snowsight result of CALL SYSTEM$CLASSIFY_SCHEMA('raw_pos', {'auto_tag': true}) — a JSON object with a "failed" empty array and a "succeeded" array listing table_name entries: COUNTRY, FRANCHISE, LOCATION, MENU, ORDER_DETAIL, and more.](/courses/snowflake-data-governance/ch03/12-tag-propagation/classify-entire-schema.png)
*One call classifies and auto-tags every table in the `raw_pos` schema — the `succeeded` array lists each table it processed.*

One statement, naming only the schema, reached every table inside it. That's the first form of propagation this lesson covers: propagation across a schema's objects.

## Tags showing up where you never asked

```sql
SELECT * FROM TABLE(
  information_schema.tag_references_all_columns('raw_pos.franchise','table')
);
```

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS on raw_pos.franchise, showing PRIVACY_CATEGORY and SEMANTIC_CATEGORY system tags on columns like first_name, last_name, e_mail, phone_number, city, and country.](/courses/snowflake-data-governance/ch03/12-tag-propagation/tags-landed-on-unrelated-table.png)
*`FRANCHISE` was never targeted directly in the `SYSTEM$CLASSIFY_SCHEMA` call — it got tagged because it lives inside the `raw_pos` schema that call targeted. That's propagation at the schema level, made concrete.*

The `SYSTEM$CLASSIFY_SCHEMA` call named only `raw_pos`. Nobody wrote `FRANCHISE` anywhere in that statement. It got classified and tagged anyway, purely because it's a table inside the targeted schema — the same mechanism that tagged `COUNTRY`, `LOCATION`, `MENU`, and every other table in that `succeeded` list.

## Propagation through the dependency graph

Propagation isn't only about schemas. A masking policy attached via tag on a base table (Lesson 10) also propagates forward through the **dependency graph** — into every view built on that table — with no separate configuration required per view.

![Snowsight query result from a downstream analytics view, showing first_name, last_name, phone_number, and e_mail masked as **~MASKED~**, alongside an unmasked lifetime_sales_usd aggregate.](/courses/snowflake-data-governance/ch03/12-tag-propagation/tag-driven-policy-reaches-views.png)
*The same masked result from Lesson 10's downstream analytics view. The masking policy was never applied to this view directly — it propagated here because the view selects from a base table whose columns carry the tagged, policy-bound protection.*

## Where propagation stops: cloning

Propagation isn't unconditional. Tags follow a column through most ordinary DDL — `ALTER TABLE ... RENAME COLUMN` keeps the tag attached to the renamed column. But `CREATE TABLE ... LIKE` and `CREATE TABLE ... CLONE` do **not** automatically copy tags from the source object.

```sql
-- Tags follow a column through most DDL (ALTER TABLE ... RENAME COLUMN
-- keeps the tag). CREATE TABLE ... LIKE and CREATE TABLE ... CLONE do
-- NOT automatically copy tags from the source object -- tags on a
-- clone's columns must be reapplied explicitly if you need them there.
CREATE TABLE raw_pos.location_clone CLONE raw_pos.location;
-- location_clone's columns start untagged even though raw_pos.location's
-- columns carry PLACEKEY/PII tags.
```

This is a genuinely easy mistake to make: a clone looks and queries exactly like its source, including its data, but it does not inherit the source's tags — and therefore doesn't inherit any masking policy attached to those tags either. A cloned table full of sensitive data can sit completely unprotected unless its tags are reapplied by hand.

## Key terms

| Term | Meaning |
|---|---|
| `SYSTEM$CLASSIFY_SCHEMA` | Classifies and (optionally) auto-tags every table in a named schema in one call |
| Tag propagation | Tagging or policy protection reaching objects that were never named directly |
| Dependency graph | The chain of views built on top of a base table, through which tag-driven policies propagate |
| Clone (tag behavior caveat) | `CREATE TABLE ... CLONE` and `... LIKE` do not copy the source object's tags |

## Lab

1. Run `SYSTEM$CLASSIFY_SCHEMA` against a test schema containing at least two tables and confirm, via `TAG_REFERENCES_ALL_COLUMNS`, that both tables were tagged even though you only named the schema.
2. Clone one of the tables you just tagged, then query `TAG_REFERENCES_ALL_COLUMNS` against the clone. Confirm the clone's columns come back untagged.
3. Reapply the missing tags to the clone and confirm they now show up.

## Check yourself

- In the `SYSTEM$CLASSIFY_SCHEMA` example, why did `FRANCHISE` end up tagged even though it was never named directly?
- Name the two forms of propagation covered in this lesson — one at the schema level, one at the view level.
- Why is `CREATE TABLE ... CLONE` a risk for tag-driven governance if a team isn't aware of this behavior?
