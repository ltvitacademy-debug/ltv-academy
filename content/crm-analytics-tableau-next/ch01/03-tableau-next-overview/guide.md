# Tableau Next, Overview

You have already worked in Tableau, so you know what a workbook, a data source, and a published dashboard feel like. **Tableau Next** is not simply the next version of that product. Salesforce describes it as a flexible, API-first analytics platform built on a unified data layer and trusted semantics, with Agentforce integrated. It is built on the Salesforce Platform and runs on top of Data 360. This lesson introduces its parts. Chapter 5 covers it in depth.

## What you'll learn

- What Tableau Next is made of, and how it differs from Tableau Desktop
- The roles of the semantic model, visualizations, dashboards, and workspaces
- How Agentforce fits into the analysis experience
- Where to double-check availability and licensing

## A different architecture

Tableau Desktop and Cloud let you connect to almost any source, shape it in a data source, and build in a workbook. Tableau Next is organized differently:

- **Data lives in Data 360.** Tableau Next connects to Data 360 objects, including data model objects, data lake objects, and calculated insight objects. Data from other systems reaches it by way of Data 360, not by direct connection inside the tool.
- **A semantic model defines meaning.** Instead of each workbook redefining "Revenue" or "Active Customer," a semantic model built once in the Semantic Model Builder holds field definitions, relationships, aggregations, and calculations. Salesforce calls this layer Tableau Semantics, and it is shared, not per-workbook.
- **Assets live in workspaces.** A workspace is a container for a project's analytical assets and their access.

## The building blocks

| Piece | Purpose |
|---|---|
| **Semantic model** | Business definitions and relationships over Data 360 data |
| **Visualization (viz)** | An individual chart, built in the Visualization Builder |
| **Dashboard** | Several vizzes, metrics, and widgets combined for business users |
| **Metric** | A measure tracked over time in a standardized form |
| **Workspace** | The project container for all of the above |

The Visualization Builder will feel familiar if you know Tableau: a list of fields on the left, shelves for columns, rows, and filters, marks controls, and a live chart view. What is different is where the fields come from. They come from the semantic model, so every author starts from the same governed definitions.

## Agentforce inside the analysis

Salesforce positions Agentforce as an integral part of Tableau Next, with built-in analytics skills that help users explore and prepare data using natural language, and surface insights proactively. Salesforce's documentation names these skills Data Pro, Concierge, and Inspector, and the naming and capabilities in this area are changing quickly, so confirm them in current documentation.

## Availability and licensing

Tableau Next is described by Salesforce as available standalone, bundled with Tableau Cloud in a bundle, and included with certain Salesforce editions and Agentforce offerings. Exact entitlements vary and change, so check with your Salesforce account team and current release notes rather than assuming your org has it.

## Recap

- Tableau Next is a Salesforce-Platform analytics product built on Data 360
- A shared semantic model, not each workbook, holds definitions
- Vizzes, dashboards, and metrics live in workspaces
- Agentforce is built in; check current docs for details

## Check yourself

In Tableau Desktop, two analysts may each define "Revenue" differently in their own workbooks. Which Tableau Next building block is meant to prevent that?
