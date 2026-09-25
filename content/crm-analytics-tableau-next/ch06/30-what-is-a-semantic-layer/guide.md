# What Is a Semantic Layer?

Ask three teams for last quarter's revenue and you can easily get three different numbers. Nobody is lying. Sales counted Closed Won opportunities, finance netted out refunds, and marketing included deals still in flight. Each team wrote its own logic against the same raw tables. A **semantic layer** exists to stop that from happening. This chapter is conceptual: first the idea, then how Salesforce implements it.

## What you'll learn

- What a semantic layer is and the problem it solves
- The difference between raw data and business meaning
- What a Tableau Next semantic model contains
- Why semantic layers matter even more once AI is asking the questions

## The problem: raw tables do not carry meaning

A table has columns such as `Amount`, `StageName`, and `CloseDate`. It does not say which stages count as revenue, whether refunds are subtracted, or which date defines "this quarter". That knowledge lives in analysts' heads and in scattered calculated fields, so every new dashboard reinvents it.

You have already met a small version of the fix. A T-SQL view packages a join and a filter behind a friendly name so nobody rewrites it. A semantic layer is the same instinct applied across the whole analytics stack: define the business logic once, in one governed place, and let every tool reuse it.

## What a semantic layer does

A semantic layer sits between your data and the tools that consume it:

- **Data layer**: the raw and modeled tables.
- **Semantic layer**: business-friendly names, relationships between tables, calculations, and official metrics.
- **Consumers**: dashboards, visualizations, ad hoc analysis, and AI assistants.

Consumers ask for "Revenue by Region". The layer knows what Revenue means and how to get it. Nobody re-derives it.

## The Salesforce implementation

In the Salesforce ecosystem, the semantic layer is the **semantic model**, powered by Tableau Semantics. You build it with the Semantic Model Builder, which is available in Tableau Next and in Data 360 (the product formerly named Data Cloud), under a Semantic Layer area. According to current documentation, a semantic model consists of:

- **Data objects**: data model objects, data lake objects, or calculated insights you already know from the Data 360 chapter
- **Relationships**: how those objects join, plus logical views and unions
- **Calculated fields**: extra dimensions and measures that do not exist in the raw data
- **Metrics**: official measures tracked over time

The screenshots in this lesson come from Salesforce's own Trailhead training. Some show the older Data Cloud product name in the navigation, which is a good reminder that names change while concepts stay put.

## Why it matters more with AI

Conversational analytics in Tableau Next and Agentforce depend on business context. If the model defines that "Open Pipeline" means specific stages, an AI assistant can answer a natural-language question consistently rather than guessing from column names. Good semantics are what make AI answers trustworthy. As of this writing this is a fast-moving area, so check current release notes for what is supported.

## Key terms

| Term | Meaning |
|---|---|
| Semantic layer | A governed layer of business definitions between data and consumers |
| Semantic model | Salesforce's implementation, built in the Semantic Model Builder |
| Metric | An official, named measure tracked over time |
| Calculated field | A field defined in the model, not stored in the raw data |

## Recap

A semantic layer turns raw tables into shared business meaning. In Salesforce that is the semantic model. Define logic once, reuse it in every tool, and disagreements about "the number" get resolved in one place instead of one dashboard at a time.

## Check yourself

Sales reports revenue of 4.2 million, finance reports 3.9 million, both from the same Opportunity table. What in a semantic layer prevents this, and where should the disagreement be resolved?
