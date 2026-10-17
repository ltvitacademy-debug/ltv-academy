# Testing and Documenting the dbt Project

A dbt model that runs without erroring isn't the same as a dbt model that's correct. This lesson
adds real tests to Driftwood's project — the kind that would have actually caught a specific,
realistic mistake — and documents the project so someone other than its author can understand it.

## What you'll learn

- The generic tests this project actually needs, and why each one maps to a real risk
- A singular test that encodes a Driftwood-specific business rule, not just a generic check
- How `schema.yml` and `dbt docs generate` turn this project into something a stranger could
  onboard from

## Generic tests, applied to real risk — not just checked off a list

```yaml
# models/staging/_staging__models.yml
version: 2

models:
  - name: stg_billing_events
    columns:
      - name: subscriber_id
        tests: [not_null]
      - name: event_type
        tests:
          - accepted_values:
              values: ['signup', 'upgrade', 'cancel']

  - name: dim_subscribers
    columns:
      - name: subscriber_id
        tests: [unique, not_null]
```

Each test here maps to a real, specific way Lesson 4's models could be wrong: `not_null` on
`subscriber_id` catches a malformed billing row that would otherwise silently break the join in
`int_subscriber_activity`; `accepted_values` on `event_type` catches a typo'd or new event type
the pipeline wasn't built to expect (a 5th value showing up because the billing team shipped a
new event type without telling anyone); `unique` on `dim_subscribers.subscriber_id` catches the
single most damaging failure mode for a dimension table — duplicate subscriber rows silently
inflating Power BI's subscriber count.

## A singular test for a Driftwood-specific business rule

Generic tests check universal shapes (null, unique, accepted values). A **singular test** encodes
a rule specific to this business:

```sql
-- tests/assert_no_cancellation_before_signup.sql
-- Fails if any subscriber's cancellation timestamp is earlier than their
-- first-seen timestamp -- a real data-quality bug this exact shape would catch.
select subscriber_id, first_seen_at, cancelled_at
from {{ ref('dim_subscribers') }}
where cancelled_at is not null
  and cancelled_at < first_seen_at
```

A singular test is itself just a SQL query — dbt considers it **failed** if the query returns any
rows at all. This one encodes a fact about Driftwood's business that no generic test could: a
cancellation can never happen before a signup, and if the pipeline ever produces a row where it
does, that's a real upstream data problem worth stopping on, not something to quietly report as
fact.

## Documenting the project

```yaml
# models/marts/_marts__models.yml
version: 2

models:
  - name: fct_subscriptions
    description: >
      One row per subscription event (signup, upgrade, cancel). The grain
      is the event, not the subscriber -- join to dim_subscribers for
      subscriber-level attributes.
    columns:
      - name: subscriber_id
        description: "Reconciled subscriber identifier, matching billing's subscriber_id and usage's user_id."

  - name: dim_subscribers
    description: >
      One row per subscriber, with their first-seen and (if applicable)
      cancellation timestamps. The source for Lesson 8's churn calculation.
```

Running `dbt docs generate` turns this project — every model, every column description, every
test, and the full dependency graph from Lesson 4's `ref()` calls — into a browsable site. For
Driftwood specifically, the grain note on `fct_subscriptions` ("one row per event, not per
subscriber") is exactly the kind of thing a new analyst would otherwise have to ask someone,
guess wrong, and silently miscount subscribers in a report built against the wrong grain.

## Key terms

| Term | Meaning |
|---|---|
| Generic test | A reusable test (not_null, unique, accepted_values, relationships) applied to a column |
| Singular test | A standalone SQL query that fails if it returns any rows — for a business rule generic tests can't express |
| Grain | What one row of a table actually represents — essential to document, easy to get wrong silently |

## Check yourself

Why is `unique` on `dim_subscribers.subscriber_id` described as the single most damaging failure
mode to catch, specifically for a dimension table feeding a BI dashboard?
