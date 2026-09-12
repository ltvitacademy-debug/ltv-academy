# Script — Relationships vs. Joins vs. Blending

## Segment 1 (title)

You've now built a relationship, a join, and a blend. This lesson puts all three side by side, with one decision process for picking the right one.

## Segment 2 (screenshot: the layers recap)

Quick recap: relationships and joins both live inside one data source, on the logical and physical layers you learned in Lesson 47. Blending is different — it lives outside this diagram entirely, combining two separate data sources only inside the worksheet.

## Segment 3 (steps: the decision process)

Try them in this order. Start with a relationship — it's the default, with no fan-out risk. Drop to a join only when you need something a relationship can't express, like a non-equality condition. Reach for a blend only when relating or joining isn't possible at all — a published data source, or incompatible connectors.

## Segment 4 (outro)

That closes out Chapter 8. Chapter 9 moves into maps and geographic analysis, starting with geographic roles and building your first map.
