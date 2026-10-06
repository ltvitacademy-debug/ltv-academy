# Script — Transform Element and Data Manipulation

## Segment 1 (title)

The Transform element copies one or more components or variables into a new variable, changing values along the way as it does. There's no per-item path to build, like a Loop has — you configure the mapping once, and it applies to the whole collection at once.

## Segment 2 (screenshot: mapping line)

Here's the core move: Source Data on one side, Target Data on the other. Click a source field's connector, then the matching target field, and a line appears joining them — Salesforce calls it a mapping. Here, the source's Id field maps straight across to the target's Id field. Only fields with compatible data types will even highlight as options.

## Segment 3 (screenshot: fx icon)

Not every target field has something to map directly, though. For those, there's an fx icon right next to the field.

## Segment 4 (screenshot: formula vs value)

Click it, and you get a choice: Formula, which references another resource elsewhere in the flow, or Value, which sets one static value for every single record in the output. Here, Value is selected, and every record gets its Status set to Closed — no formula needed at all.

## Segment 5 (steps: transform vs loop)

And here's why this element matters as much as it does: Salesforce's own current guidance says Transform elements run roughly ten times faster than a Loop doing the same bulk edit, and they scale better as a flow grows more complex. The rule of thumb is simple — if a Loop and a Transform could both do the job, use Transform. Save the Loop for when each item genuinely needs to call an Action, like sending an email, something a Transform can't do.

## Segment 6 (outro)

That closes out Chapter 3 — Decisions, Loops, Collections, Get Records, Create/Update/Delete Records, Assignments, and now Transform: the full toolkit of Flow Logic. Next up, Chapter 4: Reliable and Scalable Flows, starting with fault handling.
