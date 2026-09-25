# Script — Bindings

## Segment 1 (title)

So far every query has been fixed. Bindings make them dynamic. A binding lets one part of a dashboard read a value from another, so a click in one widget can change what a different widget shows.

## Segment 2 (screenshot: greeting and Top N)

Here is an example dashboard from Salesforce's training. A personalized greeting, and a Top N toggle with ten, twenty, and fifty. These are the kinds of behavior bindings enable: the dashboard reads a value from one place, and the widgets react.

## Segment 3 (screenshot: reference line binding)

Bindings are not only for queries. In the widget properties panel, some fields, like a reference line's value or label, have a small icon beside them. That lets the field take its value from another step, instead of a number you typed.

## Segment 4 (steps: two kinds of binding)

There are two kinds. A selection binding reacts to what the user picks, like a filter or a toggle, and is evaluated again each time they change it. A results binding reads the results of another step's query, such as a total. You can use them in filters, text, widget properties, and inside SAQL.

## Segment 5 (code: binding in SAQL)

Here is a selection binding inside a SAQL filter. Double curly braces mark an expression CRM Analytics evaluates. The column function pulls the selected owner values from another step, here named Owner underscore one. Step names and exact syntax vary, so verify against current documentation. And plan for an empty selection; a coalesce function can supply a default.

## Segment 6 (outro)

Next up: dashboard interactions and actions.
