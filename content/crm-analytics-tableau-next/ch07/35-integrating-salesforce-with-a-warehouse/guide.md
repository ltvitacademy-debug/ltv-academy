# Integrating Salesforce With a Warehouse

Salesforce holds your customers, deals, and cases. Your warehouse holds billing, product usage, finance, support telemetry, and years of history. The interesting questions sit across both: which accounts are growing usage but stalling in the pipeline, or which closed deals actually turned into paid revenue. This lesson maps the ways Salesforce data flows in and out of a warehouse. You already know the warehouse side from Snowflake and dbt, so the focus is on the Salesforce side and on choosing a pattern.

## What you'll learn

- Why teams connect Salesforce to a warehouse
- Four integration patterns and what each one is good at
- The trade-offs to weigh: latency, cost, history, and governance
- How zero-copy differs from extract and load

## Why integrate

Native Salesforce reporting is excellent for CRM questions but limited when you need to join CRM data with other systems, keep long-term history, or feed machine learning. A warehouse is where enterprise-wide joins live. At the same time, Salesforce users want warehouse-derived facts, such as usage or payment status, available where they work. Data flows in both directions.

## Pattern 1: extract and load

The classic approach copies Salesforce objects into the warehouse on a schedule. A pipeline tool or custom job reads through Salesforce APIs, often the Bulk API for large volumes, and lands raw tables that you then model with dbt. Incremental loads typically rely on the SystemModstamp field, which you met in SOQL, and you must plan for deleted records. Tool details vary, so check the documentation of whichever connector you use.

Strengths: full history, complete control, and the warehouse is the single place for every join. Costs: pipelines to maintain, API usage limits to respect, and data that is only as fresh as the last load.

## Pattern 2: zero-copy federation into Data 360

With **zero-copy data federation**, Data 360 (formerly Data Cloud) connects to the external warehouse and queries data where it lives, instead of copying it. Salesforce's documentation describes two styles:

- **Query federation**: Data 360 sends queries to the external system's own compute, which reads storage and returns results. It works with all compatible systems. It can involve compute fees on the external side, and to use trigger-based Data 360 features such as data actions, caching must be enabled.
- **File federation**: Data 360 reads the storage layer directly with its own compute, for systems that support it, such as Apache Iceberg tables. Salesforce recommends it whenever it is supported, and it avoids external compute fees.

Data can be live-queried, and for query federation you can optionally cache to reduce latency, at a cost.

## Pattern 3: zero-copy data sharing out

The reverse direction lets warehouse users query unified Data 360 data from the warehouse without an ETL job, so CRM data can be joined with enterprise data for analytics and machine learning.

## Pattern 4: write results back

Sometimes the warehouse computes something that should live in Salesforce, such as a churn score, a customer tier, or a payment status. Options include federating the table into Data 360, or pushing values into Salesforce records through its APIs. Because writes change CRM data, agree on ownership of each field first, so warehouse and CRM do not overwrite each other.

## Choosing a pattern

Weigh **latency** (how fresh must it be?), **cost** (who pays for compute and API calls?), **history** (do you need snapshots?), **volume**, and **governance** (where do permissions and lineage live?). Many real architectures combine patterns, for example loading history through ELT while federating a small, fast-changing table.

## Key terms

| Term | Meaning |
|---|---|
| Zero-copy | Accessing data in another system without copying it |
| Query federation | Queries run on the external system's compute |
| File federation | Data 360 reads external storage directly |
| Live query | Data fetched at request time, not stored |

## Check yourself

You need daily snapshots of Opportunity history for trend analysis, plus a live view of warehouse payment status inside Salesforce. Which pattern would you choose for each need, and why?
