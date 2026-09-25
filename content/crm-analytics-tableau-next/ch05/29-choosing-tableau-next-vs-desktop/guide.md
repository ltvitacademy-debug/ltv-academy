# Choosing Tableau Next vs. Tableau Desktop

You now know both tools: Tableau Desktop from the Tableau course, and Tableau Next from this chapter. The practical question for a working analyst is not "which is better", it is "which one for this job". This lesson gives you a decision framework, and points out the most important fact of all: you often do not have to choose, because both can sit on the same semantic model.

## What you'll learn

- The questions that decide between Tableau Next and Tableau Desktop
- How Tableau Desktop connects to a Tableau Next semantic model
- The limits to expect when Desktop is working against a semantic model
- Why "use both" is a legitimate answer

## Start with where the work lives

Tableau Next is built into the Salesforce platform. It is workspace-based, sits on top of Data 360 (formerly Data Cloud) and a **semantic model**, and integrates with Agentforce for AI-assisted analysis. Dashboards can be embedded in Salesforce pages and shared across teams from the same place your data is governed.

Tableau Desktop is the familiar authoring tool many analysts already know. It connects to a wide range of data sources and gives you a mature, flexible authoring environment.

Salesforce's own guidance frames the choice around your working environment. Tableau Next fits people who want to work entirely inside their Salesforce organization in one integrated platform. Tableau Desktop and Tableau Cloud fit people who already use them and want to keep their workflow, or who work across multiple environments.

## Questions that decide it

- **Where is the data and who governs it?** If the data is in Data 360 and modeled in a semantic model, Tableau Next is the natural home.
- **Who consumes the result?** If users live in Salesforce pages, Slack, or Agentforce experiences, favor Tableau Next.
- **What authoring depth do you need?** If you need the full range of Desktop authoring, or data from many non-Salesforce sources combined in one workbook, Desktop is often the better fit.
- **What does your team already know?** Retraining costs are real. An experienced Tableau team can stay productive in Desktop.
- **How mature is the feature you need?** Tableau Next has been evolving quickly, so check current release notes for the specific feature before committing.

## Using both on one semantic model

Tableau Desktop and Tableau Cloud have a **Tableau Semantics connector**. You choose Tableau Semantics as a data source, enter your Salesforce org URL, authenticate, and select a semantic model. You then build in Desktop with the fields, calculations, and business definitions the model already contains. Both tools share one definition of "revenue", which is exactly what the next chapter is about.

Expect some differences when you connect this way. Based on current Tableau documentation for Desktop, extracts are not available because the connection relies on the source model, and several authoring features are limited, including sets, data blending, and context filters. Changes to core semantic model fields happen at the source, not in your workbook. Check the current Tableau help page for the exact list, since versions change.

## A simple decision rule

Default to Tableau Next when the data is in Data 360 and the audience is inside Salesforce. Default to Desktop when you need authoring depth or multi-source flexibility. When both apply, model once in the semantic layer and build wherever each audience works best.

## Key terms

| Term | Meaning |
|---|---|
| Tableau Semantics connector | Lets Tableau Desktop and Tableau Cloud use a Tableau Next semantic model |
| Semantic model | Shared layer of business definitions, relationships, and metrics |
| Extract | A stored snapshot of data, not available through the Semantics connector |

## Check yourself

Your team must deliver an account health dashboard inside Salesforce record pages, using data already modeled in Data 360. Which tool is the default choice, and what would change your answer?
