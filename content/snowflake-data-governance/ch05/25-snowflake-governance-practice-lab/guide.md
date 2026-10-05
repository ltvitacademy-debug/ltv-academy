# Lesson 25 — Snowflake Governance Practice Lab

**Chapter 5 · Enterprise Governance · Lesson 25 of 25 · Course Finale**

## What you'll learn

- How to run every major control from this course end-to-end, against a real Snowflake trial account
- How to prove, with a real query, that a masking policy you wrote actually fired
- How this course's governance program fits together as one connected sequence, not five separate topics
- What comes next on the Data Governance career path

## This is the lab, not another explainer

Twenty-four lessons have each taught one piece. This one is the synthesis: a single, realistic checklist you can actually run against a free Snowflake trial account (or any sandbox account where you're comfortable creating and dropping objects). Each step below names the real chapter it draws from.

## The six-step checklist

**1. Create a least-privilege role (Chapter 1).**

```sql
CREATE ROLE analyst_reporting;
GRANT USAGE ON DATABASE analytics_db TO ROLE analyst_reporting;
GRANT USAGE ON SCHEMA analytics_db.public TO ROLE analyst_reporting;
GRANT SELECT ON TABLE analytics_db.public.customer_orders TO ROLE analyst_reporting;
```

**2. Apply a masking policy to one sensitive column (Chapter 2).**

```sql
CREATE MASKING POLICY email_mask AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('PII_VIEWER') THEN val
    ELSE '***MASKED***'
  END;

ALTER TABLE analytics_db.public.customer_orders
  MODIFY COLUMN customer_email
  SET MASKING POLICY email_mask;
```

**3. Tag the column you just masked (Chapter 3).**

```sql
CREATE TAG IF NOT EXISTS pii_classification;
ALTER TABLE analytics_db.public.customer_orders
  MODIFY COLUMN customer_email
  SET TAG pii_classification = 'PII';
```

**4. Prove the masking policy actually fired (Chapter 4).**

Run a query as `analyst_reporting` (or any role outside `PII_VIEWER`) that touches `customer_email`, then confirm it in `ACCESS_HISTORY`:

```sql
SELECT query_id, query_start_time, user_name, policies_referenced
FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY
WHERE query_start_time >= DATEADD(hour, -1, CURRENT_TIMESTAMP())
  AND policies_referenced IS NOT NULL;
```

A non-null result for your query is real proof — not an assumption — that the masking policy evaluated.

**5. Share the table, through a secure view, to a second account (Chapter 5).**

```sql
CREATE SECURE VIEW analytics_db.public.customer_orders_secure AS
  SELECT order_id, order_date, customer_email FROM customer_orders;

CREATE SHARE reporting_share
  COMMENT = 'Masked customer order data for a governed partner';
GRANT USAGE ON DATABASE analytics_db TO SHARE reporting_share;
GRANT USAGE ON SCHEMA analytics_db.public TO SHARE reporting_share;
GRANT SELECT ON VIEW analytics_db.public.customer_orders_secure TO SHARE reporting_share;
```

**6. Prove Time Travel works before you need it in an emergency (Chapter 5).**

```sql
DROP TABLE analytics_db.public.customer_orders;
UNDROP TABLE analytics_db.public.customer_orders;
```

Drop something on purpose, in a sandbox, so the first time you ever run `UNDROP` isn't during a real incident.

## Why this order matters

Notice the sequence isn't arbitrary: access control first (who can even see the table), then protection (what they see if they can), then classification (so the protection is findable later), then proof (did it actually work), then safe extension (sharing and recoverability). That's the same order this entire course has followed, chapter by chapter — because each layer depends on the one before it actually being in place.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end governance checklist | Running RBAC, masking, tagging, auditing, and sharing together against one real object, not as five separate exercises |
| ACCESS_HISTORY proof | Confirming a policy fired by querying policies_referenced, rather than assuming it did because the policy exists |

## Lab

Run all six steps above against a free Snowflake trial account (or your own sandbox). For each step, write one sentence confirming what you observed — the masked value, the non-null `policies_referenced` row, the share appearing in `SHOW SHARES`, the table reappearing after `UNDROP`. If any step doesn't behave as expected, that's useful: debugging a real masking policy or a real share is exactly the skill this course has been building toward.

## Check yourself

Without looking back at the lesson, can you list the six steps in order, and name which chapter of this course each one came from?

## Course complete — congratulations

You've now built a complete governance program in Snowflake: role-based access control, masking and row access policies, a tagging and classification system, a real auditing and monitoring practice, and governed data sharing across accounts — plus how to reason about retention and recovery. That's the full scope of what a Snowflake data governance role actually does day to day.

The Data Governance career path continues next with **Power BI Governance** — the same discipline (access control, sensitive-data protection, auditing, and a defensible program) applied to the BI layer most business users actually touch.
