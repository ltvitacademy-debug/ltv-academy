# Lesson 1 — What Microsoft Purview Is

**Chapter 1 · Purview Foundations · Lesson 1 of 35**

## What you'll learn

- What Microsoft Purview actually is: a unified set of Microsoft products, not a single tool
- Its three solution pillars — data security, data governance, and data compliance — and which one this course lives in
- The two services inside the data governance pillar: the Data Map and the Unified Catalog
- Why this course exists separately from the conceptual governance courses already in this catalog
- The seven-chapter roadmap this course follows, broad to narrow

## Microsoft Purview, in one sentence

Microsoft Purview is Microsoft's unified set of solutions for securing, governing, and maintaining compliance over an organization's data, wherever that data lives — Microsoft 365, Azure, Amazon Web Services, Snowflake, on-premises databases, and more. It is not one screen or one feature. It's a product family, all reachable from one portal, that replaced what used to be several separate tools (the old Azure Purview governance service and the Microsoft 365 compliance center) with a single, unified experience.

That one sentence is worth sitting with, because it sets expectations for the rest of this course: when this course says "Purview," it means the product family, and when a lesson zooms into one specific screen, it will always say which part of the family that screen belongs to.

## The three pillars

Microsoft's own documentation organizes every Purview capability into three solution areas:

- **Data security** — Data Loss Prevention, Insider Risk Management, Information Protection, and related tools that dynamically secure data throughout its lifecycle
- **Data governance** — the Data Map and the Unified Catalog, which responsibly unlock value creation from data by making it discoverable, classified, and trustworthy
- **Data compliance** — Audit, eDiscovery, Records Management, Compliance Manager, and related tools that manage critical risk and regulatory requirements

![Microsoft's own diagram of the three Purview solution pillars: data security, data governance, and data compliance, each with its own one-line mission statement.](/courses/microsoft-purview/ch01/01-what-microsoft-purview-is/purview-areas.png)
*Data security, data governance, and data compliance — the three pillars Microsoft's own documentation uses to organize every Purview capability.*

This course lives almost entirely in the middle pillar: **data governance**. You'll occasionally touch data security (sensitivity labels, in Chapter 3) because Microsoft built that capability to be shared across pillars — but the Data Map and the Unified Catalog are this course's real subject.

## Data Map and Unified Catalog

Inside the data governance pillar, Microsoft Purview ships two services that work together:

- **The Data Map** — the technical backbone. It connects to your actual data sources (an Azure SQL Database, an S3 bucket, a Snowflake warehouse), scans them, and builds a live, metadata-level map of what exists, where, and how it's structured. Chapter 2 of this course is dedicated to it.
- **The Unified Catalog** — the business-facing layer on top of the Data Map. It organizes that technical metadata into governance domains, glossary terms, and data products that a business user — not just a data engineer — can search and understand. Chapter 4 covers it.

Classification and sensitivity labels (Chapter 3) sit between the two: they're applied to assets the Data Map discovers, and they're what the Unified Catalog and Microsoft's data security tools both rely on downstream.

## Why this course exists on its own

This catalog already has six Data Governance path courses that teach governance as a discipline — foundations, data quality, metadata management, lineage, master data management, and data security — without tying any of it to one vendor's product. Those courses teach you *why* governance matters and *what* good governance looks like, independent of tooling.

This course assumes you already know that theory. It exists to answer a different question: **how does all of that show up inside one specific, extremely widely-deployed product?** Every lesson from here forward is concrete — real portal screens, real menu paths, real button names — because the goal isn't to re-teach governance concepts, it's to show you where those concepts live inside Microsoft Purview specifically.

## This course's roadmap

Seven chapters, broad to narrow, following the product's own shape:

1. **Purview Foundations** (this chapter) — the portal, licensing, roles, and getting an account running
2. **The Data Map** — collections, domains, registering sources, scanning, and troubleshooting scans
3. **Classification and Labels** — system and custom classifications, sensitivity labels, and applying them
4. **Catalog and Glossary** — the Unified Catalog, search, glossary terms, data products, and business domains
5. **Lineage and Insights** — lineage from Azure Data Factory, Synapse, Fabric, and Power BI, plus reporting
6. **Governance Workflows** — policies, access policies, data quality, and approval workflows
7. **Purview in Practice** — a case study, a hands-on practice lab, and best practices

## Key terms

| Term | Meaning |
|---|---|
| Microsoft Purview | Microsoft's unified product family for data security, data governance, and data compliance |
| Data Map | The Purview service that connects to, scans, and technically catalogs your actual data sources |
| Unified Catalog | The business-facing Purview service that organizes Data Map metadata into domains, glossary terms, and data products |

## Lab

Without opening Purview yet, sketch a one-paragraph answer to this question: "If my organization's data lives in Azure SQL Database, an S3 bucket, and a Snowflake warehouse, which Purview pillar and which Purview service would first need to know those sources exist?" Keep your answer — you'll check it against Chapter 2's lesson on registering data sources.

## Check yourself

In your own words, what's the difference between the Data Map and the Unified Catalog, and which of Purview's three solution pillars does this course focus on?
