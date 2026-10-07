# Automating with Dataverse Triggers and Actions

In the last lesson you met Dataverse's tables, rows, and columns. Now you'll put that structure to work. This lesson covers the triggers that start a flow when Dataverse data changes, and the actions you'll reach for most often to read, write, and delete that data — the same pattern Castlebridge Logistics uses to keep its dispatch and warehouse teams in sync without anyone touching a spreadsheet.

## What you'll learn

- The three Dataverse trigger types, and which one does most of the real work
- The core Dataverse actions: list, create, update, and delete rows
- How a trigger and a handful of actions chain together into a complete flow
- How to filter which rows an action actually processes, using an OData filter expression

## Three ways to start a Dataverse flow

Dataverse gives you three trigger types to choose from:

- **When a row is added, modified, or deleted** — fires automatically whenever a chosen table changes. This is the one you'll use for the large majority of Castlebridge's flows.
- **When a row is selected** — fires when someone clicks the Flow button on a row inside a model-driven app. Useful for on-demand actions a dispatcher triggers by hand.
- **When an action is performed** — fires after a specific Dataverse action runs. More advanced, and comes up less often.

## A complete flow, trigger to action

![A Power Automate flow: "When a row is added, modified or deleted" trigger connected to "List rows" then "Update a row"](/courses/power-automate/ch02/17-automating-with-dataverse/dataverse-flow-overview.png)
*A trigger that fires on row changes, a List rows action, and an Update a row action chained together in the flow designer — the shape you'll reuse constantly.*

This is the pattern behind most of Castlebridge's Dataverse automation: a row changes in the Shipments table, the flow lists related rows, and then updates one of them — all without a single line of code.

## The actions you'll reach for most

- **List rows** — retrieves rows from a table, with optional filtering so you're not pulling every row on every run.
- **Create a row / Update a row** — writes a new row, or changes an existing one.
- **Delete a row** — removes a row permanently. Deletion in Dataverse can't be undone from inside the flow, so this action usually sits behind an approval step.

## Filtering what an action actually touches

List rows accepts a **Filter rows** expression written in OData syntax, so a flow only processes the records that actually matter instead of scanning an entire table every run:

```
statecode eq 0
and
_castlebridge_route_value eq 'Route-14'
```

This filter keeps only active shipments assigned to one specific route — exactly the kind of targeted query Castlebridge's dispatch flow uses so it isn't re-processing every shipment the company has ever recorded.

## Key terms

- **Trigger** — the Dataverse event that starts a flow, such as a row being added, modified, or deleted
- **Action** — a step inside the flow that reads, writes, or deletes Dataverse data
- **List rows** — the action that retrieves rows from a table, with optional filtering
- **OData filter** — the query syntax used to narrow down which rows an action processes
