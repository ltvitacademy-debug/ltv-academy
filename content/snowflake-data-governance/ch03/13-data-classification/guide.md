# Lesson 13 — Data Classification

**Chapter 3 · Tags and Classification · Lesson 13 of 25**

## What you'll learn

- What `SYSTEM$CLASSIFY` actually does — and doesn't do
- The difference between privacy category and semantic category
- `IDENTIFIER` versus `QUASI_IDENTIFIER`
- What `auto_tag: true` changes versus the default behavior

## The starting point: data nobody has formally classified yet

```sql
-- to begin we will look at the Customer Loyalty table in the Raw layer
-- which contains raw data ingested from the Customer Loyalty program
SELECT
    cl.customer_id,
    cl.first_name,
    cl.last_name,
    cl.e_mail,
    cl.phone_number,
    cl.city,
    cl.country,
    cl.sign_up_date,
    cl.birthday_date
FROM raw_customer.customer_loyalty cl
SAMPLE (1000 ROWS);
```

![Snowsight query result from raw_customer.customer_loyalty, unmasked, showing real names, emails, phone numbers, cities, and birthdates for a sample of customers.](/courses/snowflake-data-governance/ch03/13-data-classification/unclassified-table-before.png)
*A human looking at this table can obviously see PII — names, emails, birthdates. But nothing has **formally** classified it yet. No tag says so, and nothing downstream knows to treat it differently.*

That gap — obvious to a person, invisible to automated tooling — is exactly what Snowflake's built-in classification is for.

## Running classification

```sql
USE ROLE accountadmin;

CALL SYSTEM$CLASSIFY('raw_customer.customer_loyalty', {'auto_tag': true});
```

`SYSTEM$CLASSIFY` is a **recommendation-and-tagging engine**, not a masking engine by itself. It analyzes column names, data patterns, and metadata to guess what's sensitive, and assigns Snowflake's own **system tags** — not custom ones like `tasty_pii` from Lessons 10 and 11.

![Snowsight result of CALL SYSTEM$CLASSIFY('raw_customer.customer_loyalty', {'auto_tag': true}) — expanded JSON showing BIRTHDAY_DATE with recommendation confidence HIGH, privacy_category QUASI_IDENTIFIER, semantic_category DATE_OF_BIRTH.](/courses/snowflake-data-governance/ch03/13-data-classification/system-classify-call-result.png)
*For `BIRTHDAY_DATE`, Snowflake's recommendation: privacy category `QUASI_IDENTIFIER`, semantic category `DATE_OF_BIRTH`, confidence `HIGH`. Every column gets its own recommendation object like this one.*

## Two categories that matter

Each recommendation carries two separate classifications:

- **Privacy category** — how identifying the column is on its own. `IDENTIFIER` means the column directly identifies a person by itself (an email address, for instance). `QUASI_IDENTIFIER` means the column is only identifying in combination with other fields — a birthdate alone rarely identifies someone, but birthdate plus city plus gender usually does.
- **Semantic category** — what kind of data it actually is: `DATE_OF_BIRTH`, `EMAIL`, `PHONE_NUMBER`, and so on. This is the more specific, descriptive label.

## What `auto_tag` actually changes

The `{'auto_tag': true}` option is the difference between a recommendation and an action. With `auto_tag: false` — the default if the option is omitted entirely — `SYSTEM$CLASSIFY` only recommends; nothing gets tagged. With `auto_tag: true`, as used here, the recommended tags are written immediately.

```sql
SELECT * FROM TABLE(
  information_schema.tag_references_all_columns('raw_customer.customer_loyalty','table')
);
```

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS on raw_customer.customer_loyalty, showing the system PRIVACY_CATEGORY tag applied across first_name, last_name, e_mail, phone_number, city, country, postal_code, gender, marital_status, and birthday_date.](/courses/snowflake-data-governance/ch03/13-data-classification/classification-tags-applied.png)
*`auto_tag: true` didn't just recommend — it wrote the `PRIVACY_CATEGORY` tag immediately across every column classification identified, from `first_name` down to `birthday_date`.*

## Classification isn't masking — it's the step before masking

It's worth being precise about what just happened: `customer_loyalty`'s data is now **tagged**, not masked. Classification assigns system tags describing what each column is; those tags can then be wired to masking policies exactly as shown in Lesson 10 (`ALTER TAG ... SET MASKING POLICY`), or simply used for reporting and discovery (Lesson 15) without ever masking anything. Classification and masking are two separate, composable features — classification finds and labels, masking protects, and a tag is the connective tissue between the two.

## Key terms

| Term | Meaning |
|---|---|
| `SYSTEM$CLASSIFY` | Snowflake's built-in function that analyzes a table and recommends (and optionally applies) sensitivity tags |
| `auto_tag` | Option controlling whether `SYSTEM$CLASSIFY` writes its recommended tags (`true`) or only recommends them (`false`, the default) |
| Privacy category | How identifying a column is: `IDENTIFIER` (identifies alone) or `QUASI_IDENTIFIER` (identifies in combination) |
| Semantic category | The specific kind of data a column holds, e.g. `DATE_OF_BIRTH`, `EMAIL` |

## Lab

1. Run `SYSTEM$CLASSIFY` against a test table with `auto_tag: false` (or omit the option) and review the JSON recommendation without any tags being written.
2. Run it again with `auto_tag: true` and confirm, via `TAG_REFERENCES_ALL_COLUMNS`, that the tags now exist.
3. Pick two columns from the result and explain, in your own words, why one is an `IDENTIFIER` and the other is a `QUASI_IDENTIFIER`.

## Check yourself

- What is the practical difference between `IDENTIFIER` and `QUASI_IDENTIFIER`?
- If `SYSTEM$CLASSIFY` is run without `auto_tag: true`, what actually happens to the table?
- Why does the lesson describe classification as "the step before masking" rather than masking itself?
