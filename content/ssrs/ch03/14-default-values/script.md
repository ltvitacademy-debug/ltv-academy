# Script — Default Values

## Segment 1 (title)

This lesson covers default values — the difference between a report that always makes the reader fill in every prompt, and one that just runs the moment it opens.

## Segment 2 (steps: three options)

If every parameter on a report has a valid default, the report runs automatically the first time it's viewed. Getting there means opening the parameter's Report Parameter Properties dialog and going to Default Values, where you get exactly three choices. No default value is the starting state — the reader has to type something. Specify values lets you type a literal, or a simple expression like equals-Today, directly. And Get values from a query points at an existing dataset and a field in it to pull the default from.

## Segment 3 (steps: the catch)

Here's the one rule that trips people up: you cannot use a report field name directly as a default value expression. Defaults get evaluated before the main report dataset has actually run, so there's no field data yet to reference. Globals and common functions like equals-Today work fine, and so does a value from a separate lookup dataset built for exactly that purpose — but never a field from the report's own data region.

## Segment 4 (outro)

Next lesson, multi-value parameters — letting a reader pick more than one value at once, and what that changes about your query and your filters.
