# Lesson 36 — Deployment Environments: Dev, Staging & Prod

**Chapter 7 · dbt + Git + CI/CD · Lesson 36 of 45**

## What you'll learn

- What a dbt Cloud "environment" actually configures: a connection, a
  schema pattern, and which jobs are allowed to run in it
- The difference between your one personal Development environment
  and the Staging/Production deployment environments a project shares
- Why this is the same underlying idea as switching a connection
  profile's target by environment — just made explicit and
  first-class in dbt Cloud
- How Chapter 5's CI job (temp schemas) and Chapter 7's jobs
  (production schedules) both plug into this same structure

## An environment is a bundle of settings, not a warehouse

Every dbt Cloud project has at least one Development environment
(yours alone — this is what gave you the per-branch schema back in
Lesson 32) and one or more deployment environments for anything that
isn't a single developer's in-progress work. Creating one of those
deployment environments is a real, named choice:

![dbt Cloud's "General settings" form for a new deployment environment: an Environment name field, and a "Set deployment type" toggle with three real options — General, STG (Staging), and PROD (Production).](/courses/dbt/ch07/36-deployment-environments/create-deploy-env.png)
*Staging and Production aren't just naming conventions a team agrees on — they're real, selectable environment types in dbt Cloud, each with its own connection and schema.*
Source: [dbt Docs — Deploy Environments](https://docs.getdbt.com/docs/deploy/deploy-environments)

An environment bundles: which warehouse connection to use, which
schema (or schema pattern) models land in, which dbt version runs, and
optionally which Git branch it's locked to. Nothing here is a new
concept if you've ever pointed the same connection profile at a
different target by environment — dbt Cloud just makes it an explicit
setting instead of something buried in a config file you edit by hand.

## Why three (or more) environments, not one

- **Development** — your personal sandbox. Every developer gets one,
  scoped to their own branch and schema, as covered in Lesson 32.
- **Staging** — a shared environment that mirrors production closely
  enough to catch problems before they ship, without any risk to real
  dashboards. This is also where Lesson 33's CI job schemas
  effectively live conceptually, even though each PR's temp schema is
  scoped even narrower than a shared staging schema.
- **Production** — the environment your actual BI tools and
  dashboards query. Only scheduled jobs (Lesson 34) and merged, tested
  code should ever write here.

## How the pieces from this chapter connect

A single pull request touches every environment type in this chapter,
in order: it's developed in your **Development** environment (Lesson
32), CI builds and tests it using Slim CI's deferred, `state:modified+`
approach against **Production**'s last known-good state (Lesson 35)
in a temp schema conceptually similar to **Staging**, and once merged,
a scheduled job (Lesson 34) runs it for real in **Production**.

## Key terms

| Term | Meaning |
|---|---|
| Development environment | Your personal, per-branch environment — one per developer |
| Deployment environment | A shared environment (Staging, Production, or a custom "General" type) not tied to one developer |
| Environment connection | The warehouse connection + schema pattern an environment uses, configured once per environment |
| Deployment type | dbt Cloud's built-in labels (General / Staging / Production) for a deployment environment's role |

## Lab

1. In dbt Cloud, list every environment on a project you have access
   to and note each one's deployment type (or "Development" if it's
   the personal one).
2. Find which environment a specific job (from Lesson 34) is
   configured to run in, and confirm it's Production, not
   Development.
3. Write one sentence describing what would go wrong if a scheduled
   production job were accidentally pointed at the Development
   environment instead.

## Check yourself

You're ready for Lesson 37 when you can explain, without looking it
up, what specifically differs between a Development and a Production
environment in dbt Cloud — connection, schema, and who/what is allowed
to run in each.
