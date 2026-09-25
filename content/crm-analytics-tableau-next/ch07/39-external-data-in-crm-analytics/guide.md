# External Data in CRM Analytics

CRM Analytics started life as an analytics layer over Salesforce data, but real business questions rarely stay inside Salesforce. Finance numbers live in a warehouse, product usage lives in another system, and a partner sends a spreadsheet every month. This lesson covers how external data gets into CRM Analytics, and what changes about that data once it arrives.

## What you'll learn

- The main ways to bring non-Salesforce data into CRM Analytics
- How synced connections and recipes work together
- Why external datasets need their own security thinking
- How this relates to Data 360 (formerly Data Cloud)

## Ways in

There are several routes, and the right one depends on where the data lives and how often it changes.

- **External connections.** In CRM Analytics' Data Manager, you can create connections to outside sources such as cloud warehouses and storage. Snowflake and Amazon S3 are commonly used examples, and the list of connectors changes over time, so check the current catalog in your org. A connection defines how to reach the source; you then choose which objects or tables to sync.
- **File upload.** For a one-off or a small reference table, you can upload a CSV directly. It's convenient for prototypes but not a pipeline.
- **The External Data API.** For programmatic loading of files into datasets, Salesforce provides an API. Engineers use it when a script, not a person, is the data source.
- **Data 360.** Salesforce's data platform, which was renamed from Data Cloud in late 2025, can ingest external data through its own connectors and data streams. CRM Analytics can then work with that data, and the newer Tableau Next experience is built around it. Availability and licensing for each path vary, so confirm in current documentation.

## Sync, then prepare

A synced connection copies the chosen source data into CRM Analytics as a dataset. Refreshes run on a schedule you control, and the first sync is a full copy. Later syncs may be tuned to move less data, for example by using filters or by pointing the connection at a view you maintain in the warehouse that returns only recent rows. That's a warehouse-side technique you already know from the SQL and dbt courses.

Once data is synced, **recipes** in Data Prep let you join external tables to Salesforce data, clean columns, and write the results to an output dataset that dashboards use. A common pattern is to join warehouse revenue actuals to Salesforce opportunities by account, so a dashboard can compare forecast with billed revenue.

Scheduling matters. If a recipe runs before its connection finishes syncing, it processes stale data. A sturdy design schedules the connection sync first, then the recipe after it.

## The security catch

Here is the part that surprises people. Salesforce record sharing, meaning your org's roles, sharing rules, and ownership, applies to Salesforce objects. Data that came from a warehouse or a CSV has no Salesforce owner and no sharing rules attached. If you join it into a dataset and give many people access to the app, everyone sees every row unless you add protection.

That protection is a **security predicate** on the dataset, which the next chapter covers in depth. For now, remember the rule: whenever external data enters CRM Analytics, decide who should see which rows, and plan the predicate before you publish.

## Keep the source of truth clear

Every synced dataset is a copy. Note where each dataset came from, who owns the source, and how fresh it is. When two numbers disagree, you'll want to know which system to trust.

## Recap

External data reaches CRM Analytics through connections, file uploads, the External Data API, or Data 360. Sync it, prepare it with recipes, schedule them in order, and never assume Salesforce sharing rules protect data that didn't come from Salesforce.

## Check yourself

You join warehouse revenue data into a CRM Analytics dataset. Which of your org's existing access controls will not automatically restrict those rows, and what will?
