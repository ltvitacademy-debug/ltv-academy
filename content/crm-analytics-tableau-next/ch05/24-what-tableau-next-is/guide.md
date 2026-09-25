# What Tableau Next Is

You finished the Tableau course knowing Tableau Desktop and Tableau Cloud. Salesforce now also has a product called **Tableau Next**, and the naming invites confusion. This lesson defines it, places it in the ecosystem, and sets up the next few lessons. Product names, licensing, and feature status have changed quickly since launch, so treat this as the concept model and check current release notes for specifics.

## What you'll learn

- What Tableau Next is, and what it is not
- The layers it is built from, and which of them you have already met
- The kinds of assets you create and organize in it
- How it relates to the Tableau you already know

## Not "Tableau, version 2"

Tableau Next is not a new release of Tableau Desktop or Tableau Cloud. Tableau's own help describes it as an agentic analytics platform built in Salesforce, combining ideas from CRM Analytics, Tableau, and AI. The products you know continue to exist and be developed. Tableau Next is a separate offering, built on the Salesforce platform, with its own interface, its own asset types, and (as of this writing) its own licensing roles. Because assets from the two are different but designed to be compatible in places, confirm any specific interoperability claim in the current documentation before promising it to a stakeholder.

## The layers

Salesforce's Trailhead material describes Tableau Next as a stack. From bottom to top:

- **Data layer.** Data 360 (formerly Data Cloud, from Chapter 4) is the data foundation. Tableau Next reads data model objects, data lake objects, and calculated insight objects from it. CSV files can also be uploaded, and they are stored in Data 360 as data lake objects.
- **Semantic layer.** **Tableau Semantics** adds business meaning: relationships, calculated fields, and metric definitions, in a **semantic model**. This is the central idea of Tableau Next, and Chapter 6 of this course is devoted to it.
- **Visualization layer.** A drag-and-drop builder for charts, which will feel familiar from Tableau.
- **Actionability.** Analytics can be surfaced where people work in Salesforce and act on, rather than living in a separate BI portal.

Salesforce's diagram also shows a marketplace for sharing assets, and Agentforce analytics skills, pre-built AI capabilities that we cover in Lesson 27. The whole thing is described as API-first, meaning assets can be created and used programmatically as well as through the interface.

## The assets you will work with

Everything lives in a **workspace**, a structured place to create and reference analytics assets. A workspace can contain:

- **Data**, the objects you connected
- **Semantic models**, the business-defined layer over that data
- **Visualizations**, sometimes called vizzes, the individual charts
- **Dashboards**, which combine vizzes, metrics, and filters
- **Metrics**, tracked measures that change over time

Notice what this changes compared with Tableau Desktop. There, a workbook bundles the data connection, calculations, and views together. In Tableau Next those concerns are separate assets: the semantic model is built and governed once, and many visualizations reference it.

## What this means for you

If you can build a good chart in Tableau, that skill transfers. What is new is the discipline around data and semantics: your definitions live in a shared model rather than inside one workbook. The next lessons compare Tableau Next with Desktop directly, then walk through connecting data, using AI assistance, and publishing.

## Key terms

| Term | Meaning |
|---|---|
| Tableau Next | Salesforce's newer, platform-native analytics product |
| Tableau Semantics | The semantic layer that Tableau Next and Data 360 share |
| Semantic model | Data plus business definitions, reused by many visualizations |
| Workspace | The container for a team's analytics assets |

## Recap

Tableau Next is a separate product, built on Data 360, organized around semantic models and workspaces, and extended by Agentforce. Your Tableau chart-building skills transfer; what changes is where definitions live.
