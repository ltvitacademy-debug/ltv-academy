# How the Pieces Fit Together

By now you have met three things: CRM Analytics, Data 360 (formerly Data Cloud), and Tableau Next. It is easy to mistake them for three competing products. They are better understood as parts of one ecosystem with overlapping responsibilities, built at different times. This lesson draws the map so that every later lesson has somewhere to sit.

## What you'll learn

- The role each layer plays: sources, data platform, and analytics tools
- Where native reports, CRM Analytics, and Tableau Next each get their data
- How the semantic layer connects Data 360 to Tableau Next
- Why the picture is still evolving, and how to keep up

## Three layers

Think of the ecosystem in layers, from the bottom up:

1. **Sources.** Salesforce CRM objects, plus everything outside it: warehouses, files, other applications, commerce and marketing systems.
2. **Data platform.** Data 360 ingests sources through data streams, stores them in data lake objects, and harmonizes them into data model objects, with identity resolution and calculated insights on top. It can also work with external platforms rather than only copying from them, though features vary, so check current documentation.
3. **Analytics tools.** The layer people actually look at: native reports and dashboards, CRM Analytics, and Tableau Next.

## Where each tool gets its data

| Tool | Where its data comes from |
|---|---|
| **Native reports and dashboards** | Live Salesforce records, queried directly |
| **CRM Analytics** | Its own datasets, extracted and prepared inside the platform; it can also work with Data Cloud data |
| **Tableau Next** | Data 360 objects, modeled through a semantic layer |

This table is the single most useful thing to remember. When a number looks wrong, the first question is always "which layer did this come from, and when was it last refreshed?"

## The semantic layer in the middle

Between Data 360 objects and Tableau Next visualizations sits the **semantic model**. In the Semantic Model Builder you add data objects, define relationships between them (for example Account to Opportunity), and define measures and dimensions once. In the screenshot on the slide, a model contains several data objects joined by relationship lines. Every visualization and dashboard built on that model inherits the same definitions. This is the mechanism that Chapter 6 develops into a full metric-governance strategy.

You can also see that Tableau Next lets authors add different asset types to a model or workspace, including data lake objects, data model objects, and calculated insight objects, which shows how directly it sits on top of the Data 360 layer.

## Overlap and direction

CRM Analytics and Tableau Next overlap: you can build interactive dashboards on Salesforce data in either. Salesforce describes Tableau Next as the pathway to its newest generative AI and agentic capabilities, while CRM Analytics continues to be supported for customers who are not ready to move. That is the vendor's stated position at the time of writing. It is not a promise about future roadmaps, so treat any specific retirement or migration claim you read online with caution and verify it against current release notes.

## Recap

- Sources feed Data 360, which feeds analytics tools
- Native reports read live records, CRM Analytics reads its own datasets, and Tableau Next reads Data 360 through a semantic model
- The semantic model is where shared business definitions live
- The ecosystem is changing: verify roadmap claims

## Check yourself

A dashboard number in CRM Analytics disagrees with the same number in a native report. Using the layers above, name two reasons that could explain the difference.
