# Salesforce + Snowflake

You already know Snowflake from its own course, and Lesson 35 mapped the general patterns for connecting Salesforce and a warehouse. This lesson zooms in on Snowflake specifically: how Salesforce data reaches it, how Snowflake data reaches Salesforce, and what each path costs you. Connector names, feature names, and even the product formerly called Data Cloud (now Data 360) keep changing, so verify current documentation before you design anything real.

## What you'll learn

- The three main ways Salesforce and Snowflake exchange data
- How query federation and file federation differ when the source is Snowflake
- What zero-copy data sharing does in the other direction
- A short checklist to work through before you connect

## Path 1: bring Snowflake data into Salesforce, without copying

Salesforce's zero-copy approach lets Data 360 query external data where it lives. Salesforce describes it as bidirectional: "data in" is federation, where external sources are queried live by Data 360. For Snowflake, Salesforce's integration documentation describes two connection types:

- **Query federation.** You set up a Snowflake data federation connection. Data 360 sends queries to Snowflake, and Snowflake's own compute answers them. Your Snowflake bill reflects that compute, so warehouse sizing matters.
- **File federation.** Data 360 reads the data files directly, bypassing Snowflake compute. The documentation describes this for Snowflake on AWS or Azure with tables managed as Apache Iceberg tables. It is the one Salesforce recommends where supported, but the prerequisites are stricter.

Once connected, external tables appear in Data 360, where you can map them to data model objects, and use them in segments, calculated insights, and Tableau Next semantic models. That is how a Snowflake billing table can sit beside a Salesforce Account in one analysis without an ETL job.

## Path 2: share Salesforce data out to Snowflake

The reverse direction is **data sharing**. Salesforce describes it as making insights and unified data in Data 360 accessible to platforms such as Snowflake without an outbound ETL process. Snowflake users can then join that data with their own tables. Salesforce help also lists an older approach as "Share Data with Snowflake (Legacy)", a sign that the mechanism has been evolving, so check which method your org should use today.

## Path 3: classic load into Snowflake

The traditional route still matters. A pipeline tool or custom job extracts Salesforce objects through its APIs and lands them in Snowflake, where dbt models them (Lesson 37). Choose it when you need full history, snapshots, heavy transformation, or control independent of Data 360. You must plan for API limits, incremental loading with SystemModstamp, and deleted records, as Lesson 35 described.

## And back to Salesforce users

Whichever path you pick, results have to reach people. Options include federating a Snowflake table into Data 360 so Tableau Next or Salesforce features can use it, or writing values back into Salesforce records through APIs. Agree on which system owns each field first.

## Before you connect

- **Who pays for compute?** Query federation runs on Snowflake.
- **How fresh must data be?** Live queries versus scheduled loads.
- **Cloud and region.** Where Snowflake and Salesforce run can affect performance and which federation type is available.
- **Security.** Use a least-privilege Snowflake role and a service identity for the connection.
- **Do you need history?** Federation shows current state. Snapshots need a load.

## Recap

Snowflake and Salesforce connect three ways: federate in, share out, or load and model. Zero-copy avoids duplicating data but shifts cost and dependency, so match the pattern to freshness, history, and cost needs.
