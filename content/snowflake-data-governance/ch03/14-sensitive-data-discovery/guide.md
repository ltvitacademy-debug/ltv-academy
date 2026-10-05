# Lesson 14 — Sensitive Data Discovery

**Chapter 3 · Tags and Classification · Lesson 14 of 25**

## What you'll learn

- Why Snowflake's built-in classification can't recognize every sensitive format
- How to build a custom classifier that teaches Snowflake a new pattern
- `CUSTOM_CLASSIFIER` and `ADD_REGEX`, step by step
- How a custom classifier's tags fit into the same querying pattern as every other tag in this chapter

## A format nothing built-in recognizes

```sql
-- let's take a look at our Location table where we know Placekey is present
SELECT TOP 10 *
FROM raw_pos.location
WHERE city = 'London';
```

![Snowsight query result from raw_pos.location filtered to London, showing a PLACEKEY column with values like 222-222@4hh-ztb-rrk alongside location name, city, region, and country.](/courses/snowflake-data-governance/ch03/14-sensitive-data-discovery/unrecognized-identifier-in-data.png)
*A `PLACEKEY` column — a real third-party location-identifier format. It looks structured and sensitive, but Snowflake's built-in classification (Lesson 13) has no idea what to make of it; nothing in its semantic-category vocabulary covers this pattern.*

"Sensitive data discovery" in this lesson means literally that: finding and flagging organization-specific sensitive formats — employee IDs, internal account numbers, partner identifiers like Placekey — that no generic classifier would ever recognize.

## Confirming the pattern before wiring it up

```sql
-- next let's test the Regular Expression (Regex) that our Data Engineer
-- has created to locate the Placekey value
SELECT
    placekey
FROM raw_pos.location
WHERE placekey REGEXP('^[a-zA-Z0-9d]{3}-[a-zA-Z0-9d]{3,4}@[a-zA-Z0-9d]{3}-[a-zA-Z0-9d]{3}-.*$');
```

![Snowsight query result testing a regex pattern against the placekey column, returning matching values and a query detail panel showing 13.1K rows matched.](/courses/snowflake-data-governance/ch03/14-sensitive-data-discovery/testing-the-discovery-regex.png)
*Before teaching this pattern to a classifier, confirm it actually matches — here, 13.1K rows across the table. Getting the regex right first, as an ordinary `SELECT ... WHERE ... REGEXP(...)`, is much easier to debug than troubleshooting it inside a classifier later.*

## Building a custom classifier

A custom classifier is a `SNOWFLAKE.DATA_PRIVACY.CUSTOM_CLASSIFIER` instance, created in your own schema, then taught a pattern with `ADD_REGEX`.

```sql
CREATE OR REPLACE SCHEMA classifiers
  COMMENT = 'Schema containing Custom Classifiers';

CREATE OR REPLACE snowflake.data_privacy.custom_classifier classifiers.placekey();

CALL placekey!ADD_REGEX(
  'PLACEKEY',   -- semantic category
  'IDENTIFIER', -- privacy category
  '^[a-zA-Z0-9d]{3}-[a-zA-Z0-9d]{3,4}@[a-zA-Z0-9d]{3}-[a-zA-Z0-9d]{3}-.*$', -- regex
  'PLACEKEY*',  -- column-name regex
  'Add a regex to identify Placekey'
);
```

`ADD_REGEX` takes five pieces: the semantic category name you're inventing (`'PLACEKEY'`), the privacy category it falls under (`'IDENTIFIER'` — a Placekey identifies a specific place directly), the regex pattern itself (the same one tested above), an optional column-name-pattern hint to help the classifier prioritize likely columns, and a human-readable description.

## Running the custom classifier

Once registered, a custom classifier participates in ordinary `SYSTEM$CLASSIFY` calls right alongside Snowflake's built-in ones — just list it by name.

```sql
CALL SYSTEM$CLASSIFY('raw_pos.location', {'custom_classifiers': ['placekey'], 'auto_tag':true});
```

![Snowsight result of CALL SYSTEM$CLASSIFY('raw_pos.location', {'custom_classifiers': ['placekey'], 'auto_tag':true}) — expanded JSON showing the CITY column's classification_result with HIGH confidence and coverage breakdowns for US_CITY and CA_CITY semantic categories.](/courses/snowflake-data-governance/ch03/14-sensitive-data-discovery/custom-classifier-discovery-run.png)
*The same `SYSTEM$CLASSIFY` call now runs the custom `placekey` classifier alongside Snowflake's built-in classifiers in one pass — here showing the built-in result for the `CITY` column, with the custom classifier's own `PLACEKEY` contribution further down the same JSON result.*

## Confirming discovery worked

```sql
-- to finish, let's confirm our Placekey column was successfully tagged
SELECT
    tag_name,
    level,
    tag_value,
    column_name
FROM TABLE(information_schema.tag_references_all_columns('raw_pos.location','table'))
WHERE tag_value = 'PLACEKEY';
```

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS filtered to tag_value = 'PLACEKEY', showing tag_name SEMANTIC_CATEGORY, level COLUMN, tag_value PLACEKEY, column_name PLACEKEY.](/courses/snowflake-data-governance/ch03/14-sensitive-data-discovery/discovery-confirmed-by-tag.png)
*Discovery complete: the `PLACEKEY` column is now formally flagged with a `SEMANTIC_CATEGORY = PLACEKEY` tag. From here it's queryable through the exact same `TAG_REFERENCES_ALL_COLUMNS` pattern used for every other tag in this chapter — and it's ready for whatever governance policy should apply to it next, whether that's a masking policy (Lesson 10) or simply discovery and reporting (Lesson 15).*

## Key terms

| Term | Meaning |
|---|---|
| Custom classifier | A `SNOWFLAKE.DATA_PRIVACY.CUSTOM_CLASSIFIER` instance taught to recognize an organization-specific sensitive format |
| `CUSTOM_CLASSIFIER` | The Snowflake object type a custom classifier is created as, in your own schema |
| `ADD_REGEX` | The method that teaches a custom classifier a pattern: semantic category, privacy category, regex, column-name hint, description |
| Semantic category (custom) | A category name you invent for a custom classifier, like `PLACEKEY`, alongside Snowflake's built-in ones like `EMAIL` |

## Lab

1. Pick an identifier format specific to your own organization or a project you know (an internal ticket ID, an employee badge number, anything with a consistent shape) and write a regex that matches it.
2. Test that regex with a plain `SELECT ... WHERE ... REGEXP(...)` against sample data first.
3. Create a `CUSTOM_CLASSIFIER` in a `classifiers` schema, register the regex with `ADD_REGEX`, and run `SYSTEM$CLASSIFY` with `custom_classifiers` naming it. Confirm the resulting tag with `TAG_REFERENCES_ALL_COLUMNS`.

## Check yourself

- Why doesn't Snowflake's built-in classification recognize a format like Placekey on its own?
- What five pieces of information does `ADD_REGEX` require?
- Once a custom classifier's tag is applied, how is it queried differently from a tag applied manually or by built-in classification?
