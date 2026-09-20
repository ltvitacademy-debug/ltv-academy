# Script — The Tuning Workflow

## Segment 1 (title)

Lesson 1 gave you measure, identify, change, verify. That's the shape of every tuning effort, but identify and change hide a lot of real decisions. Here's the expanded, repeatable checklist.

## Segment 2 (steps: steps 1-4 of 8)

Intake the complaint in specific terms. Reproduce the actual query with real parameters and representative data volume — a tiny test table can hide the real problem entirely. Measure duration, CPU, reads, and the plan. Then isolate the one operator actually driving cost.

## Segment 3 (steps: steps 5-8 of 8)

Form a specific, falsifiable hypothesis, not a vague guess. Make exactly one change to test it. Verify by re-measuring the same metrics against your baseline. Then document the problem, the change, and the before and after.

## Segment 4 (code: why one change at a time)

Bundling an index change, a query rewrite, and a MAXDOP hint into one deployment might make things faster — but you won't know which one did it, or whether one of them quietly caused a regression.

## Segment 5 (outro)

One change at a time costs a little more calendar time and pays it back permanently in diagnostic clarity. Next up: a real tour of the tools that support every step of this workflow.
