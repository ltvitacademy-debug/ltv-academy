# Lesson 17 — The Purview Data Catalog and Unified Catalog Overview

**Chapter 4 · Catalog and Glossary · Lesson 17 of 35**

## What you'll learn

- The difference between Data Catalog, Unified Catalog, and Data Map — three names students mix up constantly
- Where Data Catalog sits in the Microsoft Purview portal, alongside Purview's other solutions
- What the Unified Catalog experience adds on top of the raw technical metadata Data Map collects
- Why this chapter (Catalog and Glossary) is where the business-facing side of Purview governance lives

## Three names, one connected experience

Microsoft Purview is one portal with many solutions — Data Map, Data Catalog, Information Protection, Data Loss Prevention, Insider Risk Management, and more, all reachable from the same left-hand navigation. This lesson (and this chapter) lives inside **Data Catalog**.

Three terms come up constantly and it's worth being precise about each one:

- **Data Map** — the solution that connects to your actual data sources (Azure SQL, Data Lake, Snowflake, Fabric, Power BI, and dozens of other connectors), scans them, and builds the technical inventory: what tables exist, what columns they have, what classifications apply.
- **Data Catalog** — the solution area where people consume that inventory: searching it, browsing it, attaching business meaning to it, and governing it.
- **Unified Catalog** — the modern experience *inside* Data Catalog that organizes everything around business concepts — governance domains, data products, glossary terms, OKRs — rather than raw technical collections. Microsoft has been rolling Unified Catalog out across tenants; if your environment still shows the older "classic" catalog, you're likely on an earlier rollout wave for your region.

![The Microsoft Purview portal home page, showing the top search bar, left navigation, and solution cards including Data Map, Data Catalog, Information Protection, Data Loss Prevention, and Insider Risk Management.](/courses/microsoft-purview/ch04/17-the-purview-data-catalog-and-unified-catalog-overview/purview-portal.png)
*The Purview portal's home page — Data Catalog is one of several solution cards you can jump into from here.*

## Data Map and Data Catalog, side by side

It helps to think of Data Map as the plumbing and Data Catalog as the room people actually walk into. Data Map does the unglamorous work of connecting to sources, running scans, and keeping metadata current. Data Catalog is where a business analyst, a data steward, or a new hire actually goes to answer "does this data exist, and can I use it?"

![Data Map and Data Catalog solution cards shown side by side in the Purview portal's solutions row.](/courses/microsoft-purview/ch04/17-the-purview-data-catalog-and-unified-catalog-overview/purview-portal-solution-cards.png)
*Data Map and Data Catalog sit next to each other deliberately — one feeds the other.*

The full solutions listing groups Data Catalog under the **Data Governance** category, with a one-line description that captures the whole chapter well: "Find and curate data across your org with this searchable inventory of data assets and metadata."

![The Microsoft Purview solutions page, with Data Catalog and Data Lifecycle Management grouped under a "Data Governance" heading.](/courses/microsoft-purview/ch04/17-the-purview-data-catalog-and-unified-catalog-overview/purview-portal-solutions-page.png)
*Data Catalog's own description on the solutions page: find and curate data, across the org, as a searchable inventory.*

## What Unified Catalog adds

Data Map alone gives you a technical inventory — tables, columns, types, classifications. That's necessary but not sufficient: a business user doesn't think in terms of "table `dbo.CustAddr_v3`," they think in terms of "customer data I can trust for a board report."

Unified Catalog's job is to wrap that technical inventory in business context so it's actually usable day to day:

- **Governance domains** group data by business area — Finance, Sales, HR — so people aren't searching a single undifferentiated pile.
- **Data products and glossary terms** (this chapter's next five lessons) give curated, named, discoverable meaning to assets.
- **Lineage and insights** (Chapter 5) show where data came from and how healthy the whole estate is.
- **Access policies** govern who can actually use what, self-service, without a ticket queue.

This chapter — Catalog and Glossary — covers the discovery and business-meaning side: search, glossary terms, data products, curation, and domains. Chapter 5 picks up lineage and the health/insights reporting that sits on top of all of it.

## Key terms

| Term | Meaning |
|---|---|
| Data Map | The Purview solution that connects to sources, scans them, and builds the technical metadata inventory |
| Data Catalog | The Purview solution area where people search, browse, and govern what Data Map found |
| Unified Catalog | The modern, business-concept-driven experience inside Data Catalog (domains, data products, terms, OKRs) |
| Governance domain | A business-area grouping (Finance, Sales, HR) that organizes the catalog's contents |

## Lab

Open the Purview portal (or review the screenshots above if you don't have tenant access yet). From the home page, find the Data Catalog solution card, then find Data Map next to it. Write two sentences: one describing, in your own words, what Data Map is responsible for, and one describing what Data Catalog adds on top of it.

## Check yourself

Can you explain the difference between Data Map, Data Catalog, and Unified Catalog without looking back? Can you name at least three business concepts Unified Catalog adds on top of Data Map's raw technical inventory?
