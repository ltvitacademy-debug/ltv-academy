# Defining Metrics & KPIs Centrally

The last lesson said a semantic layer defines business logic once. The most important thing it defines is the **metric**: the named number the business actually steers by, such as Closed Won Revenue, Win Rate, or Average Sales Cycle. This lesson covers what a metric is in Tableau Next, how you create one in the semantic model, and how to write a definition that survives contact with real stakeholders.

## What you'll learn

- What a metric is, and how it differs from a plain measure
- The three parts of Tableau Next's metric setup: Details, Value, and Insights
- How to write a definition before touching the builder
- Why the description field is a governance tool, not a formality

## A metric is a measure tracked over time

In Tableau Next, a **metric** is built on a semantic model. Each metric combines a measure, such as a sum of amounts, with a **time dimension**, so it can be tracked as it changes day by day, month by month, or year by year. Metrics are what people often call KPIs. Because they are defined in the model, every dashboard and view shows the same number, formatted the same way. Metrics created in Tableau Next or in the Semantic Layer area of Data 360 show up consistently across the workspace.

## Define it in words first

Most metric disputes are really unwritten-definition disputes. Before you open the builder, write down:

- **The business question** it answers and who owns the answer
- **The measure**: which field is aggregated and how (sum, average, count)
- **The filters**: which records count (for example, only Closed Won opportunities)
- **The time dimension**: which date defines the period (close date, created date)
- **The breakdowns**: the dimensions people should be able to slice by

If you cannot write these five lines, you are not ready to publish the metric.

## The three parts of the builder

Following current Trailhead documentation, you open the semantic model in the Semantic Model Builder, choose **New**, then **Metric**. The wizard has three parts:

1. **Details**: a name, an API name, and a description. The builder's own hint says the description is there to make the metric discoverable.
2. **Value**: the required measure, an optional filter, the required time dimension, and additional dimensions people can break the metric down by.
3. **Insights**: optional automated analysis. Depending on your version, this includes trend and change alerts, top and bottom contributors, and top drivers and detractors. Check current documentation for the exact list.

Save the metric and it becomes available to your team.

## A worked example

This is an illustrative definition, not a built-in Salesforce object:

- Name: Closed Won Revenue
- Measure: sum of Opportunity Amount
- Filter: stage is Closed Won
- Time dimension: Close Date
- Additional dimensions: Region, Product Family, Owner
- Description: "Sum of Amount on Closed Won opportunities by close date. Excludes refunds. Owner: Revenue Operations."

Notice the description. It says what is included, what is excluded, and who to ask. That single sentence prevents most future arguments.

## Habits that keep a metric trustworthy

- Use a consistent naming convention so metrics are easy to find.
- Put the owner and any exclusions in the description.
- Keep the measure logic in one place, and reference it instead of copying it.
- If someone needs a variation, create a separate, clearly named metric rather than quietly changing the original.

## Key terms

| Term | Meaning |
|---|---|
| Metric | A measure plus a time dimension, defined once in the semantic model |
| Time dimension | The date field that defines the metric's period |
| Additional dimensions | Fields people can slice the metric by |
| Insights | Optional automated trend and contributor analysis on a metric |

## Check yourself

Write the five-line definition (measure, filters, time dimension, breakdowns, owner) for Win Rate in your own org, and note which part would cause the most disagreement.
