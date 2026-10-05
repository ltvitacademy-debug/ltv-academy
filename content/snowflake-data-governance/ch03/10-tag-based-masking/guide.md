# Lesson 10 — Tag-Based Masking

**Chapter 2 · Data Protection · Lesson 10 of 25**

## What you'll learn

- How to attach a masking policy to a *tag* instead of to individual columns
- The exact sequence: create a tag, apply it to columns, then bind the policy to the tag
- Why tag-based masking scales where per-column assignment (Lesson 7) doesn't
- The one-policy-per-data-type constraint on a tag

## From column-by-column to tag-based

In Lesson 7 you attached a masking policy directly to a column with `ALTER TABLE ... ALTER COLUMN ... SET MASKING POLICY`. That works, but it doesn't scale: every column that needs the same protection needs its own `ALTER TABLE` statement, and a brand-new column added next quarter starts out completely unprotected until someone remembers to wire it up by hand.

Tag-based masking flips the relationship. You create a tag, apply that tag to every column that needs protecting, and then attach the masking policy to the **tag** itself — once. Every column that currently carries the tag is protected immediately, and any column tagged the same way in the future is protected automatically, with no new `ALTER TABLE ... SET MASKING POLICY` statement required.

## Step 1 — create the tag

```sql
CREATE OR REPLACE TAG tags.tasty_pii
  ALLOWED_VALUES 'NAME', 'PHONE_NUMBER', 'EMAIL', 'BIRTHDAY'
  COMMENT = 'Tag for PII, allowed values are: NAME, PHONE_NUMBER, EMAIL, BIRTHDAY';
```

`tasty_pii` is a tag with a constrained set of allowed values — an attempt to tag a column `'SSN'` against this definition would be rejected, since `SSN` isn't in the `ALLOWED_VALUES` list. That constraint keeps tagging consistent across a large account instead of drifting into free-text labels that mean slightly different things to different teams.

## Step 2 — apply the tag to the PII columns

```sql
ALTER TABLE raw_customer.customer_loyalty
MODIFY COLUMN
  first_name SET TAG tags.tasty_pii = 'NAME',
  last_name SET TAG tags.tasty_pii = 'NAME',
  phone_number SET TAG tags.tasty_pii = 'PHONE_NUMBER',
  e_mail SET TAG tags.tasty_pii = 'EMAIL',
  birthday_date SET TAG tags.tasty_pii = 'BIRTHDAY';
```

![Snowsight query result from TAG_REFERENCES_ALL_COLUMNS showing the TASTY_PII tag applied to five columns of customer_loyalty: BIRTHDAY_DATE=BIRTHDAY, E_MAIL=EMAIL, FIRST_NAME=NAME, LAST_NAME=NAME, PHONE_NUMBER=PHONE_NUMBER.](/courses/snowflake-data-governance/ch03/10-tag-based-masking/tag-applied-to-pii-columns.png)
*One tag, applied with five different allowed values, now covers five columns on `customer_loyalty` — queried back with `TAG_REFERENCES_ALL_COLUMNS`.*

Each column gets the same tag key (`tags.tasty_pii`) but a different tag **value** — `'NAME'`, `'PHONE_NUMBER'`, `'EMAIL'`, or `'BIRTHDAY'` — recording what kind of PII each column actually holds. The tag is now attached, but on its own a tag does nothing to the data. Nothing is masked yet.

## Step 3 — attach the masking policy to the tag

```sql
-- governance.tasty_pii_string_mask and governance.tasty_pii_date_mask
-- are the masking policies created in Lesson 7 -- here we attach them
-- to the TAG itself, not to any individual column:
ALTER TAG tags.tasty_pii SET
  MASKING POLICY governance.tasty_pii_string_mask,
  MASKING POLICY governance.tasty_pii_date_mask;
```

This single statement is the payoff. The moment it runs, every column that currently carries `tags.tasty_pii` — all five of them — is protected, without touching `customer_loyalty` directly a second time. Compare that to Lesson 7's approach, which required one `ALTER TABLE ... SET MASKING POLICY` per column.

Notice there are **two** policies attached, not one: a string policy for the text columns (`NAME`, `PHONE_NUMBER`, `EMAIL`) and a date policy for `BIRTHDAY`. A tag can carry at most one masking policy *per data type* — one policy for `VARCHAR`-typed columns, one for `DATE`-typed columns, and so on. Snowflake picks the matching policy automatically based on each tagged column's own data type.

## Confirming it worked

```sql
-- with Tag Based Masking in-place, test using a role that
-- does NOT have the unmask privilege:
USE ROLE tb_test_role;

SELECT customer_id, first_name, last_name, phone_number,
       e_mail, birthday_date, city, country
FROM raw_customer.customer_loyalty
WHERE country IN ('United States', 'Canada', 'Brazil');
```

![Snowsight query result against raw_customer.customer_loyalty as tb_test_role, showing first_name, last_name, and e_mail masked as **~MASKED~**, phone_number partially masked, and birthday_date reset to 1955-01-01/1945-01-01/etc.](/courses/snowflake-data-governance/ch03/10-tag-based-masking/masking-triggered-by-tag.png)
*Every protected column comes back masked — not because a policy was ever set directly on `customer_loyalty`'s columns, but because those columns carry the `TASTY_PII` tag, and that tag now has a masking policy attached.*

![Snowsight query result from a downstream analytics view (analytics.customer_loyalty_metrics_v), still showing first_name, last_name, phone_number, and e_mail masked, alongside an unmasked lifetime_sales_usd aggregate.](/courses/snowflake-data-governance/ch03/10-tag-based-masking/tag-masking-propagates.png)
*The protection reaches downstream views too. Because the tag — and the policy attached to it — lives on the base table's columns, every view built on `customer_loyalty` inherits the same masking automatically, with zero extra configuration on the view itself.*

## Key terms

| Term | Meaning |
|---|---|
| Tag-based masking | Attaching a masking policy to a tag rather than to an individual column |
| `ALTER TAG ... SET MASKING POLICY` | The statement that binds a masking policy to a tag |
| `ALLOWED_VALUES` | A constrained list of values a tag may be set to, enforced at tag-apply time |
| Tag-to-policy binding | A tag may hold at most one masking policy per data type (e.g. one STRING, one DATE) |

## Lab

1. Using the tag and policies from this lesson, add a new column to a test table and tag it `tags.tasty_pii = 'EMAIL'`. Query it as a non-privileged role and confirm it comes back masked without ever running `ALTER TABLE ... SET MASKING POLICY` on that new column directly.
2. Run `SHOW MASKING POLICIES IN TAG tags.tasty_pii;` (or query `TAG_REFERENCES_ALL_COLUMNS`) and list which policy applies to which data type.
3. Explain, in your own words, why a single `ALTER TAG` statement can protect a column that didn't exist yet when the statement ran.

## Check yourself

- What two separate steps have to happen before a tag-based masking policy actually masks anything?
- Why does `tags.tasty_pii` need two masking policies instead of one?
- How does tag-based masking change the work required to protect a brand-new PII column added six months from now?
