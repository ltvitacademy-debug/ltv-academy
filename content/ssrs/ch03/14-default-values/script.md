# Script — Default Values

## Segment 1 (title)

This lesson covers default values — the difference between a report
that always makes the reader fill in every prompt, and one that just
runs the moment it opens.

## Segment 2 (screenshot: default-value-auto-run)

Here's what a default value buys you. Country already reads a real
value, and results are already on screen the moment the report opens —
nobody had to click anything first.

## Segment 3 (screenshot: default-value-still-changeable)

But a default isn't a lock. The reader can still open that same
dropdown and pick something else entirely — the default just saves
them the extra step on the common case.

## Segment 4 (screenshot: default-values-get-from-query)

Where does that default value actually come from? Open a parameter's
Report Parameter Properties dialog, go to Default Values, and you get
three choices: No default value, Specify values — type a literal or a
simple expression directly — or Get values from a query, which points
at an existing dataset and pulls the default from a field in it
instead. Here it's pulling from a Country dataset's region-name field.

## Segment 5 (steps: the one rule)

Here's the one rule that trips people up: you cannot use a report
field name directly as a default value expression. Defaults get
evaluated before the main report dataset has actually run, so there's
no field data yet to reference. Globals and common functions like
=Today() work fine, and so does a value from a separate lookup dataset
built for exactly that purpose — but never a field from the report's
own data region.

## Segment 6 (outro)

Next lesson, multi-value parameters — letting a reader pick more than
one value at once, and what that changes about your query and your
filters.
