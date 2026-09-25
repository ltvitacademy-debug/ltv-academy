# Salesforce + dbt

The previous lesson put Salesforce data into a warehouse like Snowflake. This lesson is about what happens next: turning raw Salesforce tables into trustworthy, analytics-ready models with **dbt**. You already know dbt's mechanics from the dbt course, so this lesson doesn't re-teach `ref()`, tests, or materializations. It teaches the parts that are specific to Salesforce data.

## What you'll learn

- What raw Salesforce data looks like when it lands in a warehouse
- How to structure staging and mart models for CRM objects
- The Salesforce-specific traps a staging layer must handle
- How modeled results flow back to CRM Analytics and Tableau Next

## What lands in the warehouse

An ingestion tool (a managed connector, an open-source replicator, or your warehouse vendor's own Salesforce connector) copies Salesforce objects into raw tables, typically one table per object: `account`, `opportunity`, `user`, `contact`, and so on. Column names mirror Salesforce API names, so custom fields arrive with the `__c` suffix, and every table carries system columns such as `Id`, `IsDeleted`, and `SystemModstamp`.

Exact table and column naming depends on the ingestion tool, so check what your tool actually produces before writing models. Some teams also start from a maintained Salesforce dbt package rather than writing everything from scratch. If you use one, read its models before trusting them.

## The staging layer: where Salesforce quirks get handled

Following dbt's usual layering, each raw table gets one staging model that renames, casts, and cleans. For Salesforce, the staging layer has a few extra jobs:

- **Soft deletes.** Salesforce marks deleted records with `IsDeleted` rather than removing them. If your ingestion tool syncs that flag, staging should filter those rows out, or your pipeline will keep counting deleted opportunities.
- **Duplicates from incremental loads.** Some loaders can land the same `Id` more than once. Deduplicate on `Id`, keeping the latest `SystemModstamp`.
- **Custom field names.** Rename `Region__c` to something like `region` so downstream models read cleanly.
- **Picklists are just strings.** `StageName` values are whatever your org defines, so add an `accepted_values` test that lists your real stages. When an admin adds a stage, the test tells you before a dashboard breaks.

## The mart layer: business-ready facts and dimensions

On top of staging, build marts that answer real questions: a fact table for opportunities with amount, close date, stage, and owner; a dimension for accounts; a dimension for users. Join owners through `OwnerId` to the user table so reports can group by rep or team. This is also where the pipeline metrics from Chapter 6, such as win rate and average deal size, should be defined once in SQL or in a semantic layer instead of being recomputed in every dashboard.

## Formula fields and calculated values

Salesforce formula fields are computed inside Salesforce. Whether they replicate, and whether they stay current, depends on your ingestion tool. Don't assume. If a metric matters, either recompute it in dbt from underlying fields or verify the replicated formula values against Salesforce.

## Closing the loop

Modeled data is only useful if people see it. There are a few common paths: Tableau connects to the warehouse marts directly, CRM Analytics can bring warehouse tables in through an external connection (the next lessons cover this), and Salesforce's own data platform can reach warehouse data through its connectors. Product names in this area have changed recently, since Data Cloud is now called Data 360, so confirm current names and connector availability in Salesforce's documentation.

## Recap

Raw Salesforce data needs a staging layer that handles soft deletes, duplicates, and custom field names, followed by marts that define business logic once. dbt tests guard the assumptions that Salesforce admins can change at any time.

## Check yourself

Your warehouse shows more closed-won deals than Salesforce does. Which two staging-layer issues would you check first?
