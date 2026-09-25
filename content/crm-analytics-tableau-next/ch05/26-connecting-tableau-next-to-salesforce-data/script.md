# Script — Connecting Tableau Next to Salesforce Data

## Segment 1 (title)

In Tableau Desktop, connecting meant picking a connector and signing in. In Tableau Next, your data reaches you by way of Data 360. Interface details in Salesforce's screenshots come from earlier versions, so expect some differences. The concepts, though, are stable: objects, relationships, and a model you can test.

## Segment 2 (screenshot: Add menu)

Inside a workspace, the Add menu offers a new dashboard, visualization, semantic model, new data, or an existing asset. New data is the path for bringing data in, and uploaded CSV files are stored in Data 360. Your Salesforce CRM data arrives the same way, ingested and mapped in Data 360 as you saw in Chapter 4, while external systems are federated in, which Chapter 7 covers.

## Segment 3 (screenshot: select an asset)

Existing asset opens this dialog. You can filter by type: semantic model, data lake object, data model object, or calculated insight object. This is how you reuse something a colleague already built, instead of building a copy. Reuse keeps definitions consistent across the team.

## Segment 4 (screenshot: semantic model canvas)

New semantic model opens the builder. Each object is a node, and lines are relationships, which behave like joins. Here Account and Account Contact are related, while Opportunity and Leads are not yet. You also get a test option and a YAML view. Because you know SQL joins, ask which side is one and which is many, since a wrong relationship silently changes your totals.

## Segment 5 (steps: flow)

So the flow is: get the data into Data 360, add objects from your workspace, define relationships carefully, then test the model with real rows before anyone builds charts on it. Also remember that access to the analytics and access to the underlying data are governed separately.

## Segment 6 (outro)

Next up: AI-assisted analysis in Tableau Next.
