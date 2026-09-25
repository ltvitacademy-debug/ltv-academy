# Tableau Next vs. Tableau Desktop

In the Tableau course you built views in Tableau Desktop and shared them through Tableau Cloud. Tableau Next looks familiar at first glance, because it has a drag-and-drop visualization builder, but it is organized around different ideas. This lesson compares the two so you know what your Tableau skills give you for free and where you need to learn something new. Product details, roles, and feature coverage have been changing quickly, so treat this as a concept map and check current release notes and Tableau help for specifics.

## What you'll learn

- Which Tableau habits carry over to Tableau Next
- Four structural differences: where it runs, where data comes from, where definitions live, and how AI fits in
- How a Desktop workbook maps onto Tableau Next assets
- Why "different" does not mean "better" or "worse"

## What carries over

The visualization builder will feel familiar. In Salesforce's documentation screenshots you can see a field list on the left, filters and a marks area with Color, Label, Tooltip, and Detail in the middle, and Columns and Rows across the top. You drag fields into place, choose how they are aggregated, and the chart draws itself. Analytics such as a forecast are available from the builder as well. Everything you learned about choosing chart types, encoding with color, and filtering thoughtfully still applies. Good visualization judgment is the skill that transfers most directly.

## Difference 1: it runs inside Salesforce

Tableau Desktop is an application you install and author in, then publish from. Tableau Next is authored in the browser, on the Salesforce platform, in the same environment as your CRM. Tableau's own help describes it as an agentic analytics platform built in Salesforce, bringing together ideas from CRM Analytics, Tableau, and AI. Because it lives on the platform, dashboards can be placed in Salesforce pages, which Lesson 28 covers.

## Difference 2: data comes through Data 360

Desktop can connect straight to a wide range of files and databases. Tableau Next is built on Data 360 (formerly Data Cloud, from Chapter 4). It works with data model objects, data lake objects, and calculated insight objects from Data 360, and CSV uploads are stored there as data lake objects. External warehouses reach it through Data 360 connectors and federation, a topic for Chapter 7.

## Difference 3: definitions live in a semantic model

This is the one to internalize. In Desktop, a workbook or published data source typically bundles the connection, joins, and calculated fields. In Tableau Next these are separate assets. A **semantic model** holds the objects, relationships, and business definitions. Many visualizations then build on it. In the builder, the field list shows the model's calculated fields and objects, so every chart starts from the same definitions. Chapter 6 goes deep on this.

## Difference 4: AI is part of the platform

Tableau Next integrates with Agentforce, with analytics skills that help with modeling, answering questions, and monitoring metrics. Tableau Desktop and Cloud have their own AI features, so the comparison is about integration, not about one having AI and the other not. Lesson 27 covers this.

## A rough translation table

| In Tableau Desktop | In Tableau Next |
|---|---|
| Data source with calculations | Semantic model |
| Workbook | Separate assets in a workspace |
| Sheet | Visualization |
| Publish to Server or Cloud | Share, embed, or template |

Licensing also differs. As of this writing, Tableau's help describes Creator and Consumer roles for Tableau Next, versus Creator, Explorer, and Viewer for the traditional products. Confirm what applies to your organization.

## Recap

Your chart-building instincts carry over. What changes is the surrounding architecture: browser-based authoring inside Salesforce, data through Data 360, definitions in a shared semantic model, and Agentforce built in. Neither tool replaces the other, and Lesson 29 helps you choose.
