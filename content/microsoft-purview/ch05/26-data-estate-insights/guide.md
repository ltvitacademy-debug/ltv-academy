# Lesson 26 — Data Estate Insights

**Chapter 5 · Lineage and Insights · Lesson 26 of 35**

## What you'll learn

- What Data Estate Insights actually is: automatically generated dashboards, not reports you build
- The three sections every insight report falls under, and what each one answers
- What the Data Stewardship dashboard actually measures, and for whom
- How raw metrics turn into assigned, trackable work through Health Management Actions
- A naming note: where this feature lives in the current Purview portal

## Dashboards you don't have to build

Everything in this lesson is generated automatically from what you've already scanned, classified, and curated in earlier chapters — nobody builds these reports by hand. As Purview scans and populates the Data Map, the Data Estate Insights application extracts governance gaps directly from that metadata and surfaces them as top-line metrics, with a drill-down path for whoever needs to actually fix the gap.

A naming note: the classic portal called this application **Data Estate Insights**, which is this lesson's title. In the current Purview portal, the same reports live inside the **Data Catalog**, under **Data Estate Health → Reports** — moved and renamed, but functionally the same dashboards.

Every report falls under one of three sections:

![Screenshot of the Microsoft Purview Data Estate Insights navigation menu, showing three sections: Health (with Data stewardship), Inventory and ownership (with Assets), and Curation and governance (with Glossary, Classifications, Sensitivity labels).](/courses/microsoft-purview/ch05/26-data-estate-insights/table-of-contents.png)
*Health, Inventory and ownership, Curation and governance — three sections, six named reports underneath them.*

## Health — where a CDO starts

The **Data Stewardship** report is built for governance stakeholders like a Chief Data Officer: asset curation rates, data ownership rates, and classification rates, all trended over time, plus how actively the catalog itself is being used.

![Screenshot of the Stewardship insights dashboard in Microsoft Purview, showing gauge charts for Asset curation (4.1K total assets, mostly "Not curated"), Asset data ownership (100% no owner), and Catalog usage and adoption (19 monthly active users), plus a Data estate health table broken down by collection.](/courses/microsoft-purview/ch05/26-data-estate-insights/data-stewardship-large.png)
*Three gauges tell the whole health story at a glance — and in this snapshot, it's not a good one: 100% of assets have no assigned owner.*

The **Data estate health** table beneath those gauges breaks the same metrics down per collection — "With sensitive classifications," "Fully curated," "Owner assigned," "No classifications," "Net new," "Deleted" — so a steward doesn't have to guess which specific collection is dragging the org-wide number down.

## Inventory and ownership — where the gaps live

The **Assets** report answers a narrower question: what's actually in the catalog, and what state is it in?

![Screenshot of the Data asset insights dashboard in Microsoft Purview, showing Data assets (4.1K), Unclassified assets (100%), Unassigned data owner (100%), Net new assets in last 30 days (100%), and Deleted assets in last 30 days (2.1K), plus a treemap of data assets by collection.](/courses/microsoft-purview/ch05/26-data-estate-insights/asset-insights-large.png)
*Total assets, classification coverage, ownership coverage, and churn (new and deleted) — with a "View Detail" path into the actual unclassified or unowned assets themselves, not just the percentage.*

That treemap at the bottom sizes each collection by asset count — the biggest rectangles are where the biggest curation and ownership backlog usually lives too.

## Curation and governance — glossary, classifications, labels

This section answers "how governed is what we have?" across three specific lenses, with **Classifications** as a representative example:

![Screenshot of the Classification insights dashboard in Microsoft Purview, showing Total assets classified (2,568), Files classified (752), Tables classified (1,816), Unique classifications found (426), and Sources classified (43), plus charts for top sources with classified data over time and top classification categories (Financial, Personal, Government, Miscellaneous, Custom).](/courses/microsoft-purview/ch05/26-data-estate-insights/curation-and-governance-large.png)
*Classification insights identifies exactly where sensitive data categories like Financial and Personal information actually live — the starting point for deciding what needs tighter access controls.*

The Glossary report (business term completeness and attachment rates) and Sensitivity Labels report (labeled files, drill-down by label) work the same way — automatically generated, drill-down ready, built for a specific stakeholder's question.

## From metrics to assigned work

Dashboards show you the gap. The newer **Health Management Actions** page (Unified Catalog → Health Management → Actions) turns each gap into an actual, ownable task. Each action has a finding type (Discoverability, Trusted data, Estate curation, and others), a severity (High, Medium, Low), a target entity, and an assigned owner. An owner investigates, makes the fix, and marks the action **Resolved** — but that resolution isn't just trusted on faith: the next scheduled health-management refresh re-checks the catalog, and if the underlying issue is still actually there, the action reopens automatically.

## Key terms

| Term | Meaning |
|---|---|
| Data Estate Insights | The automatically generated dashboard application covered in this lesson (now "Data Estate Health → Reports" in the current portal) |
| Data Stewardship report | The Health-section dashboard tracking curation, ownership, and catalog adoption rates |
| Treemap | A chart that sizes rectangles by asset count, used in the Assets report to spot the biggest collections fastest |
| Health Management Action | An assignable, trackable task generated from a dashboard metric gap, auto-reopened if unresolved at the next refresh |

## Lab

Using the Data Stewardship gauges from this lesson (4.1K assets, 100% with no owner, 19 monthly active users), write one sentence a Chief Data Officer could put in a status report summarizing the data estate's health. Then pick one Health Management Action finding type from this lesson (for example, "Missing owners on data assets") and describe, in your own words, the three steps an assigned owner would take to resolve it.

## Check yourself

Can you name the three sections every Data Estate Insights report falls under? Can you explain what the Data Stewardship report measures that the Assets report doesn't? Can you explain why a Health Management Action can reopen itself after being marked Resolved?
