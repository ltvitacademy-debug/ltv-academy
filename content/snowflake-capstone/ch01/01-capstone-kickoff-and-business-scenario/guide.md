# Capstone Kickoff & Business Scenario

Every course in this path taught you one piece: Snowflake itself, dbt for modeling, Airflow for
orchestration, Power BI for reporting. This capstone is where those pieces become one platform,
built for one company, end to end — the project you'll actually talk through in an interview.

## What you'll learn

- The business scenario this entire capstone is built around, and why it was chosen
- What "done" looks like for this capstone, concretely
- How the next 14 lessons map onto the courses you've already taken

## The company: Driftwood Media

Driftwood Media is a mid-size subscription video streaming service — a few million subscribers,
a product team shipping features weekly, and a leadership team that currently cannot answer "how
many subscribers did we actually gain last month, and what's our monthly recurring revenue right
now" without someone manually pulling numbers from three different systems: the billing platform
(subscription events — signups, upgrades, cancellations), the product app's event logs (what
people actually watch and how often), and a spreadsheet someone updates by hand before every
leadership meeting.

Leadership has asked for one thing, stated plainly: **a single source of truth for subscriber
growth, churn, and revenue, refreshed daily, that doesn't depend on anyone manually touching a
spreadsheet.** Nothing fancier than that — no real-time requirement, no machine learning, just a
trustworthy, automated daily number.

## Why this scenario, and why Snowflake-first

Unlike a startup choosing a stack from scratch, Driftwood already has data landing in two
different source systems with two different shapes (billing events, product usage events) — the
realistic starting condition for almost every analytics engineering job. The stack you'll build
mirrors what a current Snowflake Developer / Analytics Engineer job posting actually asks for:
Snowflake as the warehouse, dbt as the transformation layer, Airflow as the orchestrator, and
Power BI as the reporting layer the business actually opens every morning.

## What "done" looks like

By the end of this capstone, Driftwood Media will have:

1. Raw billing and product-usage data landing in Snowflake on a predictable schedule
2. A dbt project transforming that raw data into tested, documented staging and mart models
3. An Airflow DAG orchestrating the whole daily run — not a person clicking "run" by hand
4. A Power BI dashboard leadership actually opens, built on top of the dbt marts
5. Subscriber PII protected with real RBAC and masking, not just "we'll be careful"
6. A CI/CD pipeline that tests every dbt change before it reaches production
7. The Snowflake infrastructure itself provisioned with Terraform, not clicked together by hand
8. A named, honest disaster-recovery posture using Snowflake's own Time Travel and Fail-safe
9. A five-beat story you can tell an interviewer about all of it

## How the next 14 lessons map to what you already know

```
Chapter 2 (Building the Pipeline)       Chapter 3 (Production Practices)
  Ingestion -> Snowflake course            RBAC/masking -> Snowflake course
  dbt modeling -> dbt course                CI/CD -> dbt + Git/CI-CD courses
  dbt testing/docs -> dbt course            IaC -> Terraform & Bicep course
  Airflow orchestration -> Airflow course   Monitoring/cost -> Snowflake + Airflow courses
  Power BI connection -> Power BI course    Disaster recovery -> Snowflake course
  Dashboard build -> Power BI course
```

Nothing in this capstone introduces a brand-new tool you haven't already used — every lesson
applies something you've already learned to one continuous, realistic project.

## Key terms

| Term | Meaning |
|---|---|
| MRR | Monthly Recurring Revenue — the core subscription-business metric this platform exists to report |
| Churn | The rate at which subscribers cancel, the other core metric leadership asked for |
| Single source of truth | One trusted, automated dataset the business relies on, replacing manual spreadsheet reconciliation |

## Check yourself

Why does this capstone deliberately avoid a real-time or machine-learning requirement, when both
would be technically impressive to build?
