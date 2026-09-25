# Script — Datasets & Dataflows

## Segment 1 (title)

Every CRM Analytics dashboard stands on a dataset, and every dataset has to be built by something. This lesson covers what a dataset is, and how dataflows, the original tool for building them, work.

## Segment 2 (screenshot: extract and prepare diagram)

Building a dataset happens in two phases. First, extract: sources on the left, from Salesforce, files, or external systems. Then prepare: a dataflow or a recipe joins and cleans the data. On the right, the hexagon is the finished dataset.

## Segment 3 (screenshot: connected objects)

For Salesforce objects, the extraction tool is Data Sync. This screen lists Salesforce objects available as connected data, such as Account and User, along with their related objects and location. Other routes in are connectors, CSV upload, and APIs.

## Segment 4 (steps: dataset field types)

Inside a dataset, every field is one of three kinds. Dimensions are what you group by, like stage or region. Measures are numbers you add up, like amount. And dates can be bucketed by month, quarter, or year. Knowing which is which shapes every chart you build.

## Segment 5 (code: dataflow JSON)

A dataflow is a saved, scheduled job defined in JSON. Each node has an action and parameters. Here, sfdcDigest extracts fields from Opportunity, and sfdcRegister saves the result as a dataset. This is simplified, but real dataflows are built from exactly these parts. Salesforce now steers new work toward recipes, so check the current documentation before starting a new one.

## Segment 6 (outro)

Next up: recipes, the visual way to prepare data.
