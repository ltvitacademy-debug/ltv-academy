# Script — Introduction to Dataverse

## Segment 1 (title)

Welcome back to Power Automate. So far in this chapter you've connected flows to everyday tools like email and spreadsheets. This lesson introduces Microsoft Dataverse, the structured database that sits behind Power Apps, Dynamics 365, and increasingly, enterprise Power Automate flows.

## Segment 2 (steps)

Castlebridge Logistics used to track fleet maintenance and driver certifications in a shared spreadsheet, and it showed: duplicate rows, broken formulas, no real security. Dataverse replaces that spreadsheet with structured tables that enforce real data types, built-in row-level and column-level security, and relationships between tables, so a Shipments table can point directly at the Drivers table instead of a driver's name being retyped by hand every time.

## Segment 3 (screenshot)

Inside Power Automate, Dataverse shows up as a connector like any other, with its own triggers and actions you'll use throughout this chapter. You'll recognize it by its green icon, and every action you add runs against whichever Dataverse environment your flow is connected to.

## Segment 4 (steps)

Three words will come up constantly from here on. A table is a structured entity, like Castlebridge's Shipments table. A row is one record inside it, like a single shipment. And a column is one field on that record, like its delivery date, with a real enforced data type behind it. Tables can relate to each other too, so a Shipments row can point directly at a row in the Drivers table instead of someone retyping a driver's name by hand. That's the same table, row, and column vocabulary you'll see in every Dataverse trigger and action from here forward.

## Segment 5 (outro)

That's the foundation: structured tables, enforced data types, and real security, instead of a spreadsheet everyone's afraid to touch. Next lesson, you'll build a real flow that triggers when a Dataverse row changes and automatically takes action on it.
