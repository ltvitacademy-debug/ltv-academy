# Lesson 12 — Report Parameters

**Chapter 3 · Parameters · Lesson 12 of 40**

## What you'll learn

- What a report parameter actually is, and how it's different from a
  query parameter
- How adding a query parameter to a dataset automatically creates a
  matching report parameter
- Where parameters live in the Report Data pane, and how to edit their
  properties
- The core properties every parameter has: name, prompt, data type, and
  visibility

## A report parameter is the report's front door

A **report parameter** is a named input a report reader supplies before
(or while) a report runs — a store, a date range, a region. It shows up
as a prompt on the report viewer toolbar. Under the hood, that value
almost always feeds a **query parameter**: a placeholder like
`@StoreID` inside a dataset's query text that limits which rows come
back from the data source.

You'll usually create the query parameter first. Add a `WHERE` clause
like `WHERE StoreID = (@StoreID)` to a dataset's query, and Report
Builder does the rest automatically: it creates a matching dataset
parameter, and a report parameter to go with it, both named `StoreID`.
You didn't have to build the report parameter by hand — the query
variable created it for you.

## Where parameters live: the Report Data pane

Every report parameter you create — whether Report Builder made it
automatically or you added one yourself — shows up under the
**Parameters** node in the **Report Data** pane, alongside **Built-in
Fields**, **Data Sources**, and **Datasets**. Select a parameter there
and its layout appears in the **Parameters** pane on the design
surface, where you can arrange how prompts appear to the reader.

![The Report Data pane with the Parameters node expanded and StoreID selected, with the Parameters pane showing its "Store ID" text box on the design surface.](/courses/ssrs/ch03/12-report-parameters/reportdata-parameters-node.png)
*The Parameters node holds every report parameter; the Parameters pane above shows how each one prompts the reader.*

To add a parameter that isn't tied to an existing query variable,
right-click **Parameters** and choose **Add Parameter** — this opens
the **Report Parameter Properties** dialog directly.

## The properties that matter

Whether Report Builder created the parameter automatically or you added
it by hand, the **Report Parameter Properties** dialog (right-click the
parameter → **Parameter Properties**) is where you shape it:

- **Name** — the internal identifier, referenced in expressions as
  `Parameters!StoreID.Value`
- **Prompt** — the human-readable text shown next to the input on the
  report viewer toolbar (e.g., "Store identifier?")
- **Data type** — Text, Integer, Float, Date/Time, or Boolean; this
  determines what kind of input control the viewer shows and what
  values are valid
- **Allow blank value / Allow null value** — whether an empty or null
  input is acceptable
- **Visible / Hidden** — whether the parameter appears on the toolbar
  at all (hidden parameters are common when a value is supplied by
  another report via drillthrough, not typed by a person)

A parameter created automatically from a query variable defaults to
data type **Text** — even when the underlying value, like a store ID,
is really a number. Changing the data type to **Integer** is one of the
most common first edits you'll make.

## Key terms

| Term | Meaning |
|---|---|
| Report parameter | A named input a reader supplies to control what a report shows; appears on the report viewer toolbar |
| Query parameter | A placeholder (e.g., `@StoreID`) inside a dataset's query text that a report parameter's value feeds into |
| Report Data pane | The design-time panel listing Built-in Fields, Parameters, Data Sources, and Datasets |
| Report Parameter Properties | The dialog where you set a parameter's name, prompt, data type, and visibility |
| Prompt | The label text shown to the reader next to a parameter's input control |

## Lab

1. In Report Builder (or SSDT), open any report with a dataset. Edit
   the dataset's query and add a `WHERE` clause referencing a new query
   variable, e.g. `WHERE Country = (@Country)`.
2. Run the query — Report Builder should prompt you for a value, and a
   matching `Country` report parameter should now appear under
   **Parameters** in the Report Data pane.
3. Open that parameter's **Report Parameter Properties** dialog. Change
   the **Prompt** to something reader-friendly, and confirm the
   **Data type** matches the actual column type.

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: what
happens automatically when you add a query variable like `@StoreID` to
a dataset's query, and where do you go to change that resulting
parameter's prompt text or data type?
