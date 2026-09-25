# Script — Salesforce Data Cloud Fundamentals

## Segment 1 (title)

Modern Salesforce analytics doesn't start with a dashboard. It starts with data, and more and more of that data lives in Data Cloud. In late 2025 Salesforce began calling it Data 360. Same platform, and you'll see both names, so this course uses them interchangeably.

## Segment 2 (steps: source to model)

Here's the flow. A data stream connects a source, whether that's Salesforce, a warehouse, or files, and brings data in. It lands in a data lake object, kept exactly as it arrived. Then you map those objects into data model objects, a standardized structure that gives different sources a common shape. Calculated insights sit on top and add reusable metrics.

## Segment 3 (screenshot: data stream refresh history)

Here's a real data stream. The refresh history lists each run, its status, and how many records were processed. Just like CRM Analytics datasets, ingestion runs on a schedule, so data freshness is always a design decision.

## Segment 4 (screenshot: DMO graph)

And here are data model objects drawn as a graph: Individual, Lead, Account Contact, and contact points for email, phone, and address. The lines are relationships. This shared model is what lets data from many systems describe one customer.

## Segment 5 (code: who reads Data 360)

Why should an analyst care? Because the newest Salesforce tools read from here. Tableau Next builds directly on Data 360 objects. CRM Analytics can use Data Cloud data too, which we cover in Chapter 4. Agentforce uses it as context. Features and licensing change often, so check the current release notes.

## Segment 6 (outro)

Next, we meet Tableau Next itself.
