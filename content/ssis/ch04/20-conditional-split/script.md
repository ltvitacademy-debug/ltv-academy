# Script — Conditional Split

## Segment 1 (title)

The Conditional Split transformation is how you route rows to different
places based on what's actually in the data — think of it as a CASE
statement built right into your data flow.

## Segment 2 (screenshot: cond-split-config2.png)

This is the Conditional Split Transformation Editor itself. On the left,
the input columns — here, Employee Name, Rate, and PayType. On the right,
the function palette you drag expressions from. And down in the grid, three
named cases — Permanent, Temporary, Casual — each with its own boolean
condition tested against PayType. They're checked top to bottom, in the
order you see them listed. Whatever doesn't match any of the three falls
through to the default output, typed right in that box at the bottom —
here it's literally named "Other."

## Segment 3 (code: expression example)

Here's exactly how Microsoft's own documentation illustrates the same
idea. You write a boolean expression for each output — here, rows where
FirstName starts with A go to Output 1, rows starting with B go to Output
2 — and the transformation checks these top to bottom. The moment one
evaluates true, the row is sent there, and every case after it is skipped
for that row. Any row that doesn't match a single condition falls through
to the default output, which every Conditional Split is required to have.

## Segment 4 (steps: evaluation order)

That evaluation order is the detail that trips people up the most. Case 1
gets checked first — if it's true, the row goes there and nothing else
matters. If it's false, Case 2 gets checked, and so on down the list. If
literally nothing matches, the row lands in the default output — there's
no such thing as a row falling through the bottom with nowhere to go. And
if you actually need to test multiple conditions independently rather
than just the first match, a single Conditional Split can't do that —
you'd chain a second one right after the first.

## Segment 5 (screenshot: cond-split-outputs.png)

And here's the moment that matters once you're wiring this transformation
into the rest of your data flow. Drag a connector off the Conditional
Split onto a downstream component, and SSIS asks you directly which
output you mean — listed by the names you gave them, Casual, Other,
Permanent, Temporary — not by number. That's exactly the same pattern
Lesson 19's Lookup used for Match versus No Match.

## Segment 6 (screenshot: cond-split-output-config.png)

Zoom out, and this is what a finished Conditional Split looks like in the
data flow: one source, one split, and four completely separate downstream
paths — Casual, Permanent, Temporary, and Other — each one landing in its
own destination. Every row takes exactly one of these four paths, never
zero, never more than one.

## Segment 7 (outro)

Conditional Split gives you branching logic inside the pipeline. Next
lesson, we look at Derived Column — the transformation you'll use to
actually create the new values those branches often need.
