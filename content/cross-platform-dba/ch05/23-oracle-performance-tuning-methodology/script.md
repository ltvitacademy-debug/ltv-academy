# Script — Oracle Performance Tuning Methodology

## Segment 1 (title)

Measure before you change something — that discipline doesn't change when the engine is Oracle. What changes is the toolset, and Oracle centers its whole tuning story on a single idea: DB Time.

## Segment 2 (code: DB Time and wait events)

Oracle moved away from chasing hit ratios years ago. Instead, every session's time is either CPU time or a specific named wait event, visible in views like V$SESSION and V$ACTIVE_SESSION_HISTORY. Instead of asking whether a ratio looks healthy, you ask where DB Time is actually going.

## Segment 3 (steps: the loop with Oracle's tools)

The same four-step loop applies: measure with an AWR report or session views, identify the top wait events and the SQL driving them, change exactly one thing, then verify DB Time actually dropped. ADDM runs this analysis automatically after every AWR snapshot and gives you a ranked starting point.

## Segment 4 (outro)

That's the loop — now it's time to read what Oracle actually shows you when a query runs. Next up: Lesson 24, reading Oracle execution plans.
