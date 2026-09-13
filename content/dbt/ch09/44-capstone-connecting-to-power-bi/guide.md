# Lesson 44 — Capstone: Connecting to Power BI

**Chapter 9 · Capstone · Lesson 44 of 45**

## What you'll build

Milestone 3: your tested, documented marts layer from Lesson 43,
connected to Power BI the way the Snowflake course taught — through
views tuned for BI consumption, not the raw marts tables handed over
as-is. dbt's job doesn't end at "the model builds"; it ends at
"the number someone sees in a report is one they can trust."

## Don't hand Power BI your marts tables directly

The Snowflake course's own capstone made this exact point on the
warehouse side: a BI tool should never query raw or staging directly.
The same principle applies one layer up, inside dbt. `fct_orders` and
`dim_customers` are the right *foundation*, but they're still built
for other dbt models to `ref()` — full grain, every column, surrogate
keys a report author has no use for. A reporting layer sits on top,
built specifically for what Power BI actually needs:

```sql
-- models/reporting/rpt_orders_by_customer.sql
{{ config(materialized='view', schema='reporting') }}

select
  c.customer_name,
  c.segment,
  f.order_date,
  f.category,
  f.quantity,
  f.extended_amount
from {{ ref('fct_orders') }} f
join {{ ref('dim_customers') }} c
  on f.customer_key = c.customer_key
```

Notice what's missing on purpose: `customer_key`, `order_id`, and any
other surrogate/natural key a report author would never filter or
group by. A reporting view exists to answer the questions Power BI
will actually ask, not to re-expose the full fact table with a
different name.

## Give the reporting layer its own schema — and its own role

The `schema='reporting'` config above isn't cosmetic. Building
reporting models into a dedicated schema means the RBAC principle from
the Snowflake course's own capstone (least privilege, not everyone on
one broad role) applies to the BI connection specifically:

```sql
-- Run once, outside dbt, against your warehouse
CREATE ROLE IF NOT EXISTS bi_reader_role;
GRANT USAGE ON SCHEMA analytics.reporting TO ROLE bi_reader_role;
GRANT SELECT ON ALL VIEWS IN SCHEMA analytics.reporting TO ROLE bi_reader_role;
-- No grant on marts, intermediate, staging, or raw — on purpose.
```

Power BI's connection uses `bi_reader_role`, not the role your dbt job
runs as. If that role can `SELECT` from `stg_orders` or `raw.customers`,
the boundary isn't real — the same test the Snowflake capstone used
(`SHOW GRANTS TO ROLE ...`) applies here too.

## Document the connection with an exposure

Chapter 4 introduced exposures for exactly this moment — a place in
the dbt project that says, explicitly, "this report depends on these
models," so the lineage graph doesn't stop at the last `.sql` file:

```yaml
# models/reporting/exposures.yml
version: 2

exposures:
  - name: retail_orders_powerbi_report
    type: dashboard
    maturity: medium
    url: https://app.powerbi.com/your-workspace-report-url
    description: "Power BI report on top of the reporting schema."
    depends_on:
      - ref('rpt_orders_by_customer')
    owner:
      name: Your Name
      email: you@example.com
```

Once this exists, `dbt docs generate` shows the Power BI report itself
as a node in the graph — anyone looking at the docs site can see that
a real downstream consumer depends on `rpt_orders_by_customer`, not
just that the model exists in isolation.

## Connect Power BI, deliberately

The Import-vs-DirectQuery decision itself is Snowflake-course material
(Ch. 12 there), and the choice doesn't change here — but it should be
made *against the reporting views*, not the marts layer, so a switch
from Import to DirectQuery later doesn't mean re-pointing every report
visual at a different table shape. Connect Power BI to
`analytics.reporting.rpt_orders_by_customer` using `bi_reader_role`'s
credentials, and be ready to say, in one sentence, why you chose
Import or DirectQuery for this specific data.

## Key terms

| Term | Meaning |
|---|---|
| Reporting layer | Views built on top of marts, shaped for what a BI tool actually needs — not the full fact table re-exposed |
| `bi_reader_role` | A least-privilege role scoped to the reporting schema only, used for the BI connection |
| Exposure | A dbt YAML entry documenting that a downstream report/dashboard depends on specific models |

## Lab

1. Build at least one reporting-layer view on top of your marts
   models, dropping any surrogate/natural keys a report author
   wouldn't filter or group by.
2. Create a least-privilege role scoped only to the reporting schema,
   and confirm with `SHOW GRANTS` that it can't see marts, staging, or
   raw.
3. Add an `exposures.yml` entry for your report, run
   `dbt docs generate`, and confirm the exposure shows up as a node in
   the lineage graph.
4. Connect Power BI to the reporting view using the least-privilege
   role, and write one sentence justifying Import or DirectQuery for
   this specific data.

## Check yourself

You're ready for Lesson 45 when Power BI is connected to a reporting
view (not a marts table), a least-privilege role backs that
connection, and your generated docs site shows the report itself as a
node depending on that view.
