# Introduction to Dataverse

So far in this chapter you've built flows against everyday tools — email, spreadsheets, shared folders. This lesson introduces Microsoft Dataverse, the structured business database that sits underneath Power Apps and Dynamics 365, and that shows up more and more often once your Power Automate flows grow past a single spreadsheet. You'll use the vocabulary from this lesson — tables, rows, columns — in every Dataverse trigger and action for the rest of the chapter.

## What you'll learn

- Why Dataverse exists, and what problem it solves that a spreadsheet or SharePoint list can't
- The three building blocks of the model: tables, rows, and columns
- How relationships between tables let data reference other data instead of being retyped
- How the Dataverse connector appears inside Power Automate

## Why Castlebridge Logistics moved off spreadsheets

Castlebridge Logistics, our example company for this course, used to track fleet maintenance schedules and driver certifications in a shared Excel workbook. It worked, until it didn't: duplicate rows nobody noticed, a formula someone overwrote, and no real way to say "dispatchers can edit this, but only HR can see driver license numbers."

Dataverse solves exactly that class of problem. It stores data in structured **tables** instead of loose cells, enforces real data types on every column, and layers in row-level and column-level security — so access can be restricted by record and by field, not just by who has the file.

## Tables, rows, and columns

Three terms carry the whole model, and you'll see all three in every lesson from here on:

- **Table** — a structured entity, similar to a database table. Castlebridge's Shipments table is one example.
- **Row** — one record inside a table. A single shipment is one row in the Shipments table.
- **Column** — one field on that record, such as a shipment's Delivery Date or Status.

Tables can also **relate** to each other. Castlebridge's Shipments table can point directly at its Drivers table, so a shipment references an actual driver record instead of someone retyping a driver's name by hand on every row.

## The Dataverse connector in Power Automate

Inside Power Automate, Dataverse isn't a separate product you have to leave the app for — it's a connector, just like the Outlook or SharePoint connectors you've already used. It carries its own set of triggers (fire when data changes) and actions (read, write, or delete data), which the next lesson covers in depth.

![The Dataverse connector's "When a row is selected" trigger card in the Power Automate flow designer](/courses/power-automate/ch02/16-introduction-to-dataverse/selected-rows-trigger.png)
*The Dataverse connector appears in the flow designer like any other connector, with its own triggers — this one fires when a user selects a row in a model-driven app.*

## Key terms

- **Dataverse** — Microsoft's structured business database, used by Power Apps, Dynamics 365, and Power Automate
- **Table** — a structured entity made up of rows and columns, replacing a spreadsheet or SharePoint list
- **Row** — one record inside a table
- **Column** — one field on a row, with an enforced data type
- **Relationship** — a link between two tables, so one row can reference a row in another table
