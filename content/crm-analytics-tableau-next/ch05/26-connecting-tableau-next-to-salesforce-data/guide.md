# Connecting Tableau Next to Salesforce Data

In Tableau Desktop, connecting to data meant picking a connector and authenticating. In Tableau Next there is no separate connection dialog for Salesforce in that sense, because the data already lives in, or is federated into, Data 360. Connecting really means three things: making sure the right objects are in Data 360, adding them to a workspace, and shaping them into a semantic model. This lesson walks through that flow. Screenshots in Salesforce's documentation come from earlier, beta-labeled versions of the interface, so labels and layout may differ from what you see today.

## What you'll learn

- What Tableau Next can connect to, and why Data 360 sits in the middle
- The Add menu and the kinds of assets you can create or reuse
- How to start a semantic model from data objects and relate them
- What to check before you build charts

## What Tableau Next connects to

Tableau's help states that Tableau Next can use three kinds of Data 360 objects: **data model objects** (DMOs), **data lake objects** (DLOs), and **calculated insight objects** (CIOs). All three should sound familiar from Chapter 4. A workspace holds the connection information to that data rather than a copy of it. CSV files can also be uploaded, and they are stored in Data 360 as data lake objects.

So your Salesforce CRM data reaches Tableau Next by way of Data 360: ingested and mapped there, as you saw in Chapter 4, or, for external systems such as a warehouse, federated in through a Data 360 connector, a topic for Chapter 7. Salesforce's product pages list warehouse connectors and file upload as options, but connector availability changes, so check the current list for your org.

## The Add menu

Inside a workspace, the **Add** menu offers New Dashboard, New Visualization, New Semantic Model, New Data, and Existing Asset. New Data is the path for bringing in data, such as a CSV upload. **Existing Asset** opens a dialog titled Select an Asset to Add. Its type filter lists Dashboard, Visualization, Semantic Model, Data Lake Object, Data Model Object, and Calculated Insight Object, with a workspace filter and search. This is how you reference something that already exists, such as a semantic model built by a colleague, instead of building your own copy.

## Building a semantic model

Choosing **New Semantic Model** opens the Semantic Model Builder. In Tableau's documented flow you select the data model object to start from, then use the plus icon under Data Objects to add more. The canvas shows each object as a node, and lines between nodes are the **relationships**, which work like joins. In the documentation example, Account and Account Contact are joined while Opportunity and Leads stand alone until related. The builder also has a Suggested Relationships toggle, a Test Model button, and a YAML view of the model definition. Logical views appear beside the data objects.

Because you know SQL joins, think carefully here: which object is the "one" side, which is the "many" side, and what does a relationship do to your totals? A wrong relationship silently changes numbers, and Chapter 6 returns to this.

## Before you build charts

- **Confirm the data is there.** Open the object list and check the fields you need.
- **Test the model.** Use the builder's test option to look at real rows before anyone builds on it.
- **Check permissions.** Access to workspace assets and access to the underlying data are governed separately, as Lesson 28 explains.
- **Prefer reuse.** Look for an existing semantic model before creating another.

## Key terms

| Term | Meaning |
|---|---|
| DMO | Data model object, the standardized Data 360 model |
| DLO | Data lake object, raw ingested data |
| CIO | Calculated insight object, a precomputed metric |
| Relationship | A defined link between objects in a semantic model |

## Recap

Tableau Next connects through Data 360. You add or reference data assets from a workspace, build a semantic model by selecting objects and defining relationships, test it, and then build visualizations on top of it.
