# Script — Salesforce + dbt

## Segment 1 (title)

You already know dbt. This lesson isn't about ref or tests. It's about what's different when the raw data comes from Salesforce, and how to model it so dashboards can trust it.

## Segment 2 (code: a staging model)

Raw Salesforce tables land in your warehouse roughly as they exist in the CRM. Custom fields keep the double-underscore c suffix, and every row carries an Id and an IsDeleted flag. A staging model renames columns, casts types, and filters out deleted rows. Notice the where clause on IsDeleted. Without it, deleted opportunities keep inflating your pipeline numbers.

## Segment 3 (steps: layers)

Structure it in the usual dbt layers. Raw tables come from your ingestion tool. Staging models clean one object each. Marts join them into business-ready facts and dimensions, like opportunities joined to accounts and owners. Define your pipeline metrics here, once, so every dashboard agrees.

## Segment 4 (code: guarding assumptions)

Salesforce admins can change picklist values at any time, so protect your models with tests. An accepted values test on stage name tells you when a new stage appears, before a dashboard quietly breaks. Also deduplicate on Id, keeping the latest SystemModstamp, in case your loader lands a record twice. And don't assume formula fields replicate correctly. Verify them, or recompute them in dbt.

## Segment 5 (outro)

Modeled data can flow back to Tableau directly, or into CRM Analytics through an external connection. Product names here keep changing, so confirm the current connector names in Salesforce docs. Next up: API-Based Integration Basics.
