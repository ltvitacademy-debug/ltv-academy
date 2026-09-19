# Lesson 67 — ARM Templates & Bicep for Azure SQL

**Chapter 11 · Azure Automation & Infrastructure as Code · Lesson 67 of 95**

## What you'll learn

- What ARM templates and Bicep actually are, at a conceptual level
- Why a DBA should care about infrastructure as code (IaC) even without writing it daily
- Where to go in this catalog for hands-on Bicep authoring — this lesson doesn't re-teach it

## Scope check

This is a light conceptual overview, on purpose. Bicep syntax, parameters,
modules, and a full deploy-a-resource walkthrough already exist as their
own dedicated lessons in **Terraform & Bicep for Data Engineers**, later
in this catalog. Re-teaching that material here would just be a worse,
shorter copy of a course that already does it properly. What this lesson
covers instead is the DBA-relevant question: why would a DBA who's never
going to be a full-time infrastructure engineer still care about any of
this?

## What ARM templates and Bicep are

An **ARM template** is a JSON file describing Azure resources — a server,
a database, its firewall rules — declaratively: you state the end result
you want, and Azure's Resource Manager figures out how to get there.
**Bicep** is a newer, cleaner syntax that compiles down to the same ARM
templates underneath; almost nobody hand-writes raw ARM JSON anymore,
because Bicep says the same thing in far less code. Either way, the
target resource type for a database is the same:
`Microsoft.Sql/servers/databases`.

## Why a DBA cares, without writing IaC daily

- **Repeatable** — the same server and database get created identically
  every time, with no manual portal clicks to forget or fat-finger.
- **Reviewable** — a database configuration change goes through a pull
  request before it hits production, the same discipline Chapter 10's
  jobs and this chapter's CLI scripts benefit from, just at the
  infrastructure layer.
- **Auditable** — git history of a Bicep file *is* the change history for
  that server: who changed the service tier, and when, without digging
  through Activity Log entries after the fact.

A DBA doesn't need to author these files to benefit from them — but
reading one enough to understand what it will actually create, before
approving that pull request, is a real and recurring DBA responsibility.

## A minimal shape, to recognize it on sight

```
resource sqlDb 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  parent: sqlServer
  name: 'mydb'
  sku: { name: 'S3' }
}
```

That's a Bicep resource block declaring a database on an existing server,
at the S3 service tier — the same tier concept from Lesson 66's CLI
example. Recognizing this shape is the goal here, not writing it from
scratch.

## Where to go for the real thing

If you want to actually author and deploy Bicep — parameters, modules,
the plan/apply-style workflow, a real Azure Portal deployment-history
screenshot confirming a deploy worked — go to **Terraform & Bicep for
Data Engineers**, specifically:

- **Lesson 15, "Deploying Azure SQL With Bicep"** — a full, hands-on
  walkthrough of exactly the resource type shown above, deployed for
  real, with the deployment confirmed in the Azure Portal.
- **Lesson 16, "ARM Templates vs. Bicep"** — the deeper comparison of the
  two, immediately after Lesson 15 in that course.

This course won't repeat that ground. What it needed you to walk away
with is narrower: what IaC is, why it matters to a DBA's job even when
someone else is writing it, and exactly where to go for the rest.

## Key terms

| Term | Meaning |
|---|---|
| ARM template | The underlying JSON format Azure Resource Manager deploys from |
| Bicep | A cleaner syntax that compiles to ARM templates |
| IaC (Infrastructure as Code) | Defining infrastructure declaratively in files instead of manual portal steps |

## Check yourself

Name the exact course and lesson number this lesson points to for
hands-on Bicep authoring, and explain in one sentence why a DBA who never
writes IaC still needs to be able to read it.
