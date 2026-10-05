# Lesson 24 — MDM Tools Overview

**Chapter 5 · Enterprise Consistency · Lesson 24 of 25**

## What you'll learn

- The real commercial and platform products organizations use to implement MDM
- How Microsoft's own legacy on-premises MDM tool organized a master data model
- Evaluation criteria for comparing MDM tools against each other
- Why "which tool" is a late question, not a first question, in an MDM program

## The product landscape

Every concept in this course — matching, golden records, survivorship, architecture styles, reference data governance — gets implemented in an actual product somewhere. A few of the names you'll encounter in the market:

- **Informatica MDM (Multidomain MDM)** — one of the longest-standing enterprise MDM platforms, built around a central "Hub" that handles multiple domains (customer, product, vendor, and more) from one configurable matching and survivorship engine. Widely deployed at large enterprises with complex, multi-domain requirements.
- **Reltio** — a cloud-native, SaaS MDM platform built on a graph data model rather than traditional relational tables, marketed around real-time data and built-in relationship/hierarchy modeling (Lesson 16) as a first-class feature rather than an add-on.
- **SAP Master Data Governance (MDG)** — SAP's own MDM offering, built to integrate tightly with SAP ERP and S/4HANA. A natural fit for organizations whose master data already lives primarily inside SAP, since it governs data in the same system of record it feeds.
- **Microsoft SQL Server Master Data Services (MDS)** — Microsoft's long-standing, on-premises MDM feature bundled with SQL Server, organizing master data into **models**, which contain **entities**, which carry **attributes** and participate in **hierarchies**. It's a useful example precisely because its structure maps cleanly onto the vocabulary this course has used throughout — model, entity, attribute, hierarchy. Note: Microsoft has removed MDS starting with SQL Server 2025, continuing to support it only in SQL Server 2022 and earlier, which is itself a reminder that tool landscapes shift — the next lesson's case study and this course's concepts outlive any one product's release cycle.
- **Profisee** — a platform built specifically around Microsoft's data stack (SQL Server, Azure, Power Platform, Microsoft Fabric), often positioned as a more modern alternative for organizations already standardized on Microsoft infrastructure.

## A real example: how MDS structures a master data model

The diagram below is Microsoft's own illustration, from the SQL Server Master Data Services documentation, of how a **Product** model is actually organized inside the tool. It isn't a live screen capture of the Master Data Manager application — it's Microsoft's own structural diagram, and it's worth studying because the vocabulary maps directly onto terms from earlier in this course: a **model** (Product) contains an **entity** (Product), which carries both free-form attributes (Name, Code, StandardCost, ListPrice) and a **domain-based attribute** (Subcategory, which is itself drawn from another entity — exactly the kind of hierarchy relationship covered in Lesson 16).

Seeing a real tool's own structural vocabulary line up this closely with the course's own terms is the point: "model," "entity," "attribute," and "domain-based attribute" aren't this course's invented words — they're the terms a real, shipped MDM product actually uses internally.

## Evaluating tools against each other

Tool selection in a real program comes down to a handful of concrete criteria, not brand recognition:

- **Domain coverage** — does it handle the specific domains you need (customer, product, vendor, employee+location from Chapter 3), or is it specialized to one?
- **Architecture style fit** — does it support the style you actually chose in Lesson 3 (registry, consolidation, coexistence, centralized), or does it force one style regardless of your needs?
- **Matching engine quality** — how configurable are its deterministic and probabilistic matching rules (Lesson 7), and how well does it surface likely matches for human review (Lesson 11)?
- **Integration support** — does it offer the mechanisms from Lesson 23 your consumers actually need: batch, API, and event-driven, or just one of the three?
- **Ecosystem fit** — does it integrate cleanly with the rest of your existing stack (an SAP shop leans toward SAP MDG; a Microsoft shop leans toward Profisee or, historically, MDS)?
- **Deployment and cost model** — on-premises license, cloud SaaS subscription, and the total cost of ownership that comes with each.

## Why "which tool" is a late question

A tool implements a strategy; it doesn't create one. An organization that hasn't done the work from Chapters 1 through 4 — defining what counts as master data (Lesson 1), picking an architecture style (Lesson 3), designing matching and survivorship rules (Chapter 2), scoping which domains matter (Chapter 3), and governing reference data (Chapter 4) — will struggle with any tool, because the tool has nothing correct to configure. Pick the strategy first; the tool is where you implement it, not where you discover it.

## Key terms

| Term | Meaning |
|---|---|
| Informatica MDM | A long-standing enterprise multidomain MDM platform built around a central Hub |
| Reltio | A cloud-native, graph-based SaaS MDM platform |
| SAP Master Data Governance (MDG) | SAP's own MDM offering, tightly integrated with SAP ERP/S4HANA |
| SQL Server Master Data Services (MDS) | Microsoft's on-premises MDM feature; removed starting SQL Server 2025 |

## Lab

Pick any two tools named in this lesson. Using the evaluation criteria list above, write one sentence per criterion on which tool you'd expect to fit better for a mid-sized company that is already heavily invested in one of the ecosystems mentioned (SAP, Microsoft, or neither) — and one sentence on what you'd still need to know about your own organization's domains and architecture style before the comparison means anything.

## Check yourself

Name three real MDM tools from this lesson and one evaluation criterion each might win or lose on, and explain in your own words why choosing a tool before choosing a strategy tends to go badly.
