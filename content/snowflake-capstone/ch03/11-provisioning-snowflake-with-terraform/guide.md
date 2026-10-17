# Provisioning Snowflake With Terraform

The Terraform & Bicep course taught provider blocks, resource blocks, state, and the plan → apply
workflow against Azure resources — a storage account, a Fabric capacity, an Event Hub. This lesson
applies those exact same Terraform mechanics to a provider you haven't used yet: Snowflake itself.
The concepts don't change; only the provider and its resource types do.

## What you'll learn

- The real Snowflake Terraform provider, and how its resource names map onto what you've already
  built by hand in Lessons 2 and 9
- Why `DRIFTWOOD_ETL_WH` and the account's roles belong in Terraform, while the data itself never
  does
- How this ties into Lesson 10's CI/CD pipeline — plan on every PR, apply on merge

## The provider block

```hcl
terraform {
  required_providers {
    snowflake = {
      source  = "Snowflake-Labs/snowflake"
      version = "~> 1.0"
    }
  }
}

provider "snowflake" {
  # Authentication (account identifier, user, key-pair or OAuth) comes from
  # environment variables in CI -- never hardcoded in the .tf files
  # themselves, the same secrets-handling discipline from Lesson 10.
}
```

## Provisioning what Lessons 2 and 9 built by hand

Everything you ran as a one-off SQL statement in Lesson 2 (the database, the warehouses) and
Lesson 9 (the roles) has a direct Terraform resource equivalent:

```hcl
resource "snowflake_database" "driftwood_analytics" {
  name    = "DRIFTWOOD_ANALYTICS"
  comment = "Driftwood Media's subscriber/revenue analytics platform"
  # Time Travel retention, provisioned here rather than set later by hand --
  # ties directly to Lesson 13's disaster-recovery discussion.
  data_retention_time_in_days = 1
}

resource "snowflake_warehouse" "driftwood_etl_wh" {
  name                = "DRIFTWOOD_ETL_WH"
  warehouse_size      = "SMALL"
  auto_suspend        = 60
  auto_resume         = true
  initially_suspended = true
}

resource "snowflake_warehouse" "driftwood_bi_wh" {
  name                = "DRIFTWOOD_BI_WH"
  warehouse_size      = "X-SMALL"
  auto_suspend        = 300
  auto_resume         = true
  initially_suspended = true
}

resource "snowflake_role" "driftwood_analyst" {
  name    = "DRIFTWOOD_ANALYST"
  comment = "Read-only, marts-only role for Power BI and human analysts"
}

resource "snowflake_grant_privileges_to_role" "analyst_select_marts" {
  role_name  = snowflake_role.driftwood_analyst.name
  privileges = ["SELECT"]
  on_schema_object {
    all {
      object_type_plural = "TABLES"
      in_schema           = "${snowflake_database.driftwood_analytics.name}.MARTS"
    }
  }
}
```

Two decisions are worth naming explicitly: `DRIFTWOOD_ETL_WH` and `DRIFTWOOD_BI_WH` get different
`auto_suspend` values (60 seconds vs. 300) because they're genuinely different workloads — the
ETL warehouse runs in a tight daily burst and should suspend fast, while the BI warehouse serves
sporadic analyst queries throughout the day and benefits from staying warm longer. And
`data_retention_time_in_days` is set here, in code, rather than configured by hand later — it's
provisioned as part of the database's definition from day one, not a setting someone remembers
(or forgets) to go change afterward.

## What never belongs in Terraform

Terraform provisions the *infrastructure* — databases, warehouses, roles, and grants. It never
provisions Driftwood's actual subscriber data, and it never runs dbt models. The line is the same
one the Terraform & Bicep course draws for its own Azure resources: Terraform manages what the
platform is built from, not the data that flows through it afterward.

## Tying into CI/CD: plan on PR, apply on merge

Following Lesson 10's CI/CD pattern directly: a pull request changing any `.tf` file runs
`terraform plan` in CI, posting the proposed change for review — a new warehouse, a changed
`auto_suspend` value, a new grant — as a reviewable diff, not a surprise. Only a merge to `main`
runs `terraform apply`, the same plan-then-apply discipline from the Terraform & Bicep course,
now protecting Snowflake's own account-level objects instead of an Azure resource group.

## Key terms

| Term | Meaning |
|---|---|
| `Snowflake-Labs/snowflake` | The real Terraform provider source for managing Snowflake account objects |
| `snowflake_grant_privileges_to_role` | The current, consolidated Terraform resource for granting privileges |
| Infrastructure vs. data | Terraform provisions warehouses/roles/grants; it never manages the data itself |

## Check yourself

Why do `DRIFTWOOD_ETL_WH` and `DRIFTWOOD_BI_WH` have different `auto_suspend` values in this
Terraform configuration, rather than sharing one setting?
