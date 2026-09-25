# Salesforce Data Cloud Fundamentals

In the last lesson you met CRM Analytics, which works on datasets it prepares for itself. But Salesforce's newer analytics tools are built on a different, broader data layer. That layer was launched as **Data Cloud**, and in October 2025 Salesforce began calling it **Data 360**. It is the same platform under a new name. You will see both names in documentation, Trailhead, and job postings, and this course uses them interchangeably. This lesson gives you the vocabulary that the rest of the course depends on.

## What you'll learn

- What Data Cloud / Data 360 is, and the problem it solves for analysts
- The core objects: data streams, data lake objects, and data model objects
- What identity resolution, calculated insights, and segments do at a high level
- Why analytics tools such as Tableau Next depend on it

## The problem it solves

A typical company's customer data is scattered: the CRM has accounts and contacts, a commerce system has orders, a support tool has cases, a marketing platform has engagement, and a warehouse has history. Each system uses its own identifiers and shapes. Data Cloud is a platform that brings these sources together, gives them a common structure, and links records that belong to the same real-world person or company, so that one profile can be analyzed or activated.

## From source to model

Data moves through a few named stages:

| Stage | Object | What it is |
|---|---|---|
| Ingest | **Data stream** | A connection to a source: which object or file, which fields, the key, and how often it refreshes |
| Store | **Data lake object (DLO)** | Where ingested data lands, kept as it arrived, unaltered |
| Harmonize | **Data model object (DMO)** | A standardized structure that one or more DLOs are mapped into |
| Aggregate | **Calculated insight object (CIO)** | Cube-style metrics with measures and dimensions, computed after processing |

Mapping a DLO to a DMO is the harmonizing step. It is how "email" from the CRM and "email address" from a web form end up as the same field on the same standard object. DMOs can be standard, based on the Customer 360 data model, or custom.

Sources are not limited to Salesforce. Data Cloud offers connectors to many external systems, including cloud data warehouses, and the exact list evolves, so check current documentation for what your org has.

## Identity resolution, insights, segments

Three capabilities build on the model, and each gets its own lesson in Chapter 4:

- **Identity resolution** matches records from different sources that describe the same individual or account and links them into a unified profile.
- **Calculated insights** define reusable metrics, such as lifetime value, across the unified data.
- **Segments** group profiles by criteria, for marketing and service use.

## Why an analyst cares

Data Cloud is no longer just a marketing tool. Tableau Next, the newest Salesforce analytics product, reads its data from Data 360 objects, and CRM Analytics can work with Data Cloud data too. Agentforce also uses it as its data layer. If you understand DLOs, DMOs, and refresh behavior, you can reason about where any number in a modern Salesforce dashboard actually came from.

Features, editions, and licensing here change quickly. Treat this lesson as the concepts, and verify specifics against current release notes.

## Recap

- Data Cloud was renamed Data 360 in late 2025; same platform
- Data streams ingest, DLOs store, DMOs standardize, CIOs aggregate
- Identity resolution, calculated insights, and segments build on the model
- Tableau Next depends on it

## Check yourself

A field called `email` from your CRM and `email_address` from a web form should feed one standard Contact Point Email field. Which object type and step accomplish this?
