# Datasets & Dataflows

Every dashboard in CRM Analytics stands on a dataset, and every dataset has to be built by something. This lesson covers both halves: what a dataset is, and how **dataflows**, the original tool for building them, work. The next lesson covers recipes, the visual tool Salesforce now steers new work toward, so it helps to understand the older approach first: you will meet dataflows in real orgs, and the concepts carry straight over.

## What you'll learn

- What a dataset is and what it is made of
- How data gets extracted into CRM Analytics
- What a dataflow is, and how its JSON definition reads
- Where dataflows sit today relative to recipes

## Datasets

A dataset is a container for data from Salesforce objects, external sources, or a mix of both. Salesforce's introductory material names three advantages over normalized Salesforce reports: queries are faster because the data is compressed and indexed, the data is available immediately for exploration, and Salesforce data can be combined with outside data.

Inside a dataset, each field is treated as one of three kinds, which matters when you build charts:

- **Dimensions** are things you group by, such as Stage or Region.
- **Measures** are numbers you aggregate, such as Amount.
- **Dates** are date fields you can bucket by year, quarter, or month.

## Extract, then prepare

Building a dataset happens in two phases. **Extraction** brings raw data in. The common routes are:

- **Data Sync**, the dedicated tool for extracting Salesforce objects such as Opportunities, Accounts, and Users
- **Connectors** to external systems
- **CSV upload** for files
- **APIs** for programmatic loads

The diagram on the slide shows this: sources on the left, a preparation step in the middle, and a dataset on the right. The screenshot shows a list of Salesforce objects available as connected data, with their related objects and location. **Preparation** then joins, filters, and reshapes the extracted data. That is where dataflows and recipes come in.

## What a dataflow is

A dataflow is a saved, scheduled definition of a data-preparation job, written as **JSON**. It is a set of named nodes, and each node has an action and parameters. Two of the most common actions:

- `sfdcDigest` extracts fields from a Salesforce object
- `sfdcRegister` saves the result as a dataset

Other actions join two sources, add calculated fields, and filter rows. The nodes are wired together by naming a previous node as the source, and the whole file runs on a schedule you set in Data Manager. The slide shows a deliberately simplified example: one node extracts fields from Opportunity, the next registers them as a dataset. Real dataflows are longer, but they are built from exactly these parts.

## Dataflows today

Salesforce documentation now steers new work toward recipes and provides a way to convert an existing dataflow to a recipe. Many organizations still run dataflows they built years ago, so you need to be able to read them. For any new build, or if you are unsure of current status, check the current documentation first.

## Recap

- A dataset is prepared data stored in CRM Analytics, made of dimensions, measures, and dates
- Data arrives by Data Sync, connectors, CSV, or APIs, then gets prepared
- A dataflow is a scheduled JSON definition of extract, transform, and register steps
- Recipes are the recommended path for new work

## Check yourself

What is the difference between the `sfdcDigest` and `sfdcRegister` actions in a dataflow, and which comes first?
