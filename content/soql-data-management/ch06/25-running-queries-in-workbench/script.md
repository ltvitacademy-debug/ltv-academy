# Script — Running Queries in Workbench

## Segment 1 (title)

Queries are what most people open Workbench for. Here's how to run one.

## Segment 2 (steps: the soql query page)

Open the Queries menu and choose SOQL Query. You can build a query by picking the object and the fields, then adding a filter and a sort. Or you can write raw SOQL in the query box. Either way, run it and the results appear as a table.

## Segment 3 (code: type it yourself)

Everything from the earlier chapters works as written. Filters, ORDER BY, LIMIT, date literals like THIS_YEAR, and parent fields with dot notation. Nothing about the query changes between Workbench and any other tool.

## Segment 4 (code: look up field names first)

One habit worth stealing: before you write the query, open the Info menu and choose Standard and Custom Objects. Pick an object and you'll see every field, its API name and its data type. That saves guessing at API names like Amount or a custom field ending in double underscore c.

## Segment 5 (outro)

You can also send results out as CSV. Next up: the Import Wizard, built into Setup.
