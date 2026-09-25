# Data Streams & Ingestion

The last lesson explained the problem Data Cloud solves: customer data scattered across systems that never agree with each other. This lesson is the first half of the solution, getting the data in. Salesforce rebranded Data Cloud as **Data 360** in October 2025, and you will see both names in the product, in Trailhead, and in this course's screenshots. The functionality described here is the same under either name; as always, check the current release notes for changes.

## What you'll learn

- What a data stream is and how it differs from the data itself
- Where ingested data lands: data lake objects versus data model objects
- Why mapping decides what your analytics can actually see
- What to check when a data stream looks wrong

## A data stream is a connection, not a copy

A **data stream** is the configured connection between a data source and Data 360: which source, which object, how often, and in what mode. Streams ingest either in **batch** (a scheduled refresh) or **streaming** (near real-time, typically for web and mobile engagement events). Sources include Salesforce CRM, Marketing Cloud, B2C Commerce, cloud storage, and a long list of third-party connectors. Some sources can also be reached through zero-copy federation, where Data 360 stores only metadata that points at data still living in the external system.

If you come from T-SQL, think of a data stream as a scheduled load job into a staging area. You already know the questions that matter: what is the primary key, what happens to a changed row, and what happens to a deleted one.

## Data lake objects: the raw landing zone

Ingested data is stored first in a **data lake object (DLO)**, in roughly the shape it arrived. The New Data Stream wizard is where you make choices that are hard to reverse. You pick a **category** (Profile, Engagement, or Other), confirm a **primary key**, and review each field. The wizard itself warns that the category and the field data types cannot be changed after the stream is created, so review them carefully. You can also add formula fields at this stage.

## Data model objects: the shared shape

A DLO on its own is just raw storage. To be useful downstream, its fields must be **mapped** to **data model objects (DMOs)**, the standardized Customer 360 data model with objects such as Individual, Account, Lead, and Contact Point Email. Some connectors arrive pre-mapped; others need manual mapping in the field-mapping canvas, where you draw lines from source fields to DMO attributes.

This step matters more than any other for you as an analyst. Data 360's own data stream page states that only mapped fields, or objects with relationships, can be used for segmentation and insights. An unmapped field is invisible to everything built on top of it.

## Checking a stream's health

Every data stream has a status header (active, last run status, last refreshed, records processed) and a **Refresh History** tab listing each run with its mode, duration, status, and record counts. Refresh modes you may see include full replacement and upsert. When a dashboard looks stale, this tab is where you start, before blaming the dashboard.

## Key terms

| Term | Meaning |
|---|---|
| Data stream | The configured connection that ingests one source object |
| Data lake object (DLO) | Raw storage for ingested data |
| Data model object (DMO) | A standardized object in the Customer 360 data model |
| Mapping | Linking DLO fields to DMO attributes |
| Refresh history | The run-by-run log for a data stream |

## Recap

Ingest first, then map. A stream lands data in a DLO; mapping connects it to the shared model; only mapped data flows into identity resolution, calculated insights, and segments, which are the next three lessons.
