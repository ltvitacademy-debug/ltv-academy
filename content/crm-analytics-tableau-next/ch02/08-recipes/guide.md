# Recipes

In the last lesson you saw dataflows: JSON files that describe how to extract and prepare data. **Recipes** do the same job through a visual editor called **Data Prep**. You point and click your way through a graph of inputs, joins, and transformations, see a live preview of the data at each step, and write the result to a dataset. Salesforce documentation steers new preparation work toward recipes, and this is the tool you will use most for building datasets.

## What you'll learn

- What a recipe is, and how it differs from a dataflow in practice
- The graph model: inputs, joins, transformations, and output
- Where to build a recipe and how the preview works
- How to schedule a recipe so a dataset stays fresh

## What a recipe is

A recipe specifies the transformations, or steps, to perform on one or more sources, and when you run it, it applies them and writes the results to a target, typically a new dataset. Sources can be existing datasets or connected objects. Connected objects appear when Data Sync is enabled in your org, and they include Salesforce objects and external connected objects.

To start one, open Data Manager, choose the Dataflows & Recipes area, open the Recipes subtab, and create a new recipe. The exact menu wording can shift between releases, so follow the current documentation if your screen looks different.

## The graph

Look at the first screenshot on the slide. Three inputs (Opportunity, Account, and User) feed two join nodes. The recipe is drawn as a graph so you can see at a glance where the data comes from and how it flows to the target. Each node type does one thing:

| Node | What it does |
|---|---|
| **Input** | Brings in a dataset or connected object |
| **Join** | Combines two sources on matching keys |
| **Transform** | Applies transformations, such as formulas, buckets, and filters |
| **Output** | Writes the final result to the target dataset |

Salesforce's own tutorial notes that joins support up to five key pairs. Limits like that can change, so check the documentation for current numbers.

## Preview as you build

The second screenshot shows the recipe editor with an input node selected. Below the graph is a data preview table showing sample columns and values, such as Stage, Full Name, and Close Date. By default the preview shows a limited sample of rows (the tutorial cites up to 2,000), which is enough to check that a join matched and a formula behaves. This is the biggest practical advantage over hand-editing JSON: you see the effect of each step right away.

Transformations live inside a Transform node, and you can chain several. Typical uses include creating a calculated column from a formula, bucketing values into categories, and filtering rows. The catalog also includes more advanced options, such as clustering and time series forecasting. Check the current transformation list for the full set.

## Scheduling

A recipe that is not scheduled is a dataset that goes stale. The third screenshot shows the schedule dialog: time-based or event-based, by minute, hour, week, or month, with a start time and run frequency. The tutorial's example runs every 24 hours on weekdays at 2:00 AM. Pick a schedule that matches how fresh the business needs the data, and remember from the architecture lesson that dashboards can only be as current as the last successful run.

## Recap

- A recipe is a visual, previewable, schedulable data-preparation job
- Inputs, joins, transforms, and an output make up the graph
- The live preview lets you validate each step
- Schedule every recipe that feeds a live dashboard

## Check yourself

You join Opportunities to Accounts in a recipe and the row count in the preview is much larger than expected. What is the most likely cause, and how would you investigate it in the graph?
