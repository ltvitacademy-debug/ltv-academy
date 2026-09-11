# Script — Multi-Value Parameters

## Segment 1 (title)

This lesson is about multi-value parameters — letting a reader select more than one value at once, and everything that has to change to support it.

## Segment 2 (steps: three follow-ups)

Checking "Allow multiple values" on a parameter's General tab is one checkbox, but it's not the whole job. Three other things have to change to match it. The dataset query's WHERE clause has to switch from equals to IN — IN tests for inclusion in a set, equals can't compare a column against an array. Any Tablix filter referencing that parameter needs the same switch, from equals to In. And any expression displaying the parameter's value directly — like one in a page footer — usually needs a Join function, because the value is now an array of selections, not one string.

## Segment 3 (screenshot: multivalue-select-all-dropdown)

Here's what the reader actually sees once it's wired up correctly. Every item in the dropdown gets its own checkbox, and the list starts with an automatic Select All option — check or clear everything with one click. The reader can pick any combination of stores, not just one, and the report responds to the whole set.

## Segment 4 (outro)

Next lesson, we look at parameter-driven datasets — how that at-ParameterName syntax actually filters a query, tying everything in this chapter together.
