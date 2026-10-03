# Script — Error Outputs on Data Flow Components

## Segment 1 (title)

Right now, in every data flow you've built, one bad row can take down the
entire thing. This lesson fixes that: error outputs, the mechanism that
lets a component set aside the rows it can't process instead of failing
outright.

## Segment 2 (screenshot: data-flow-with-error-output)

By default, most data flow components treat any row-level problem as
fatal. One row out of ten million can't convert to the right data type,
and the whole Data Flow task fails — none of the good rows load either.

Error outputs are the fix. Any component that supports them exposes a
second, red output path alongside its normal green one — this diagram
shows exactly that: two sources feed a transformation, and a second red
"Error Flow" arrow branches off it into a separate destination, while the
main green path keeps going to its own destination untouched. Rows that
fail get redirected down that red path instead of failing the component.

## Segment 3 (screenshot: configure-error-output-dialog.png)

Here's where you actually set that up — the Configure Error Output dialog,
opened from the component's editor. One row per column, and opened fresh,
every single one defaults to the same thing: Fail Component, on both the
Error column and the Truncation column. Nothing's redirected until you
change it.

## Segment 4 (screenshot: redirect-row-selected.png)

Select the rows you want, pick a disposition from the dropdown at the
bottom, and hit Apply. Here the Error column's been changed to Redirect
Row across every output column — now a conversion failure on any of them
sends that row down the error output instead of stopping the whole task.
Truncation stays configurable separately, column by column, which is
exactly the point: you can be strict about real errors and lenient about a
string that just got clipped.

## Segment 5 (steps: error vs truncation vs disposition)

SSIS actually tracks two separate problems here. An error is unequivocal —
a conversion that just can't happen, producing a NULL. A truncation is
milder — data got cut short, like an oversized string, but something usable
still exists. And for either one, you pick from three dispositions: Fail
Component, which is the default and stops everything; Ignore Failure, which
lets the row through anyway; and Redirect Row, which is the one that
actually gives you that second path. When you redirect a row, SSIS adds two
columns automatically — ErrorCode and ErrorColumn — and a common pattern is
piping those into a Script Component that calls GetErrorDescription to turn
the code into an actual sentence before it lands in a file.

## Segment 6 (outro)

Get comfortable redirecting rows instead of letting one bad value fail an
entire load — it's one of the most practical error-handling habits in this
whole course. Next lesson, we step back from individual components to the
package level: logging providers, and how to actually capture what
happened when something goes wrong.
