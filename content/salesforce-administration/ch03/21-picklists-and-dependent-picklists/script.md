# Script — Picklists and Dependent Picklists

## Segment 1 (title)

A picklist is one of the simplest field types — a defined list of values instead of free text. Most of the time that's the whole story. But when two picklists are related, like an Issue Type and an Issue Detail, Salesforce offers a specific mechanism to keep the second one honest: dependent picklists.

## Segment 2 (screenshot: picklist values list)

Managing an ordinary picklist's values is straightforward: a Values list with Edit, Del, Deactivate per value, and New, Reorder, Replace above it. Replace is worth knowing — it bulk-swaps every record holding one value over to another, no hand-editing required.

## Segment 3 (screenshot: New Field Dependency)

A field dependency links a controlling field — what the user picks first — to a dependent field, whose values get filtered by that pick. From Field Dependencies in Object Manager, New Field Dependency starts by picking those two fields.

## Segment 4 (screenshot: dependent values grid)

The real configuration is the next screen: a grid, controlling values as columns, dependent values as rows, checkboxes at the intersections. Include Values with a column and the right rows selected, and that dependent value only shows up under that one controlling value.

## Segment 5 (steps: why it matters)

Without this, a user could pick Issue Type Billing and still select Issue Detail Hardware Malfunction — simply wrong. A dependent picklist makes that combination unselectable in the UI itself, a guardrail built into the field before the record is ever saved.

## Segment 6 (outro)

Next up: Global Value Sets, for when the same list of values needs to live on more than one object at once.
