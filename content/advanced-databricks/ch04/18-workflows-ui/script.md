# Script — The Workflows UI

## Segment 1 (title)

Lesson 17 introduced a Job as tasks plus a trigger plus compute. Here's where that structure actually gets built by hand — the Workflows UI's visual canvas.

## Segment 2 (code: task box contents)

Each task appears as a box on a canvas. Clicking it opens task type, cluster, and parameters — every setting a bundle's YAML would declare in text has a matching field right here.

## Segment 3 (code: watching a run happen)

Once a run starts, the same canvas becomes a live status view — each task box changes color as it queues, runs, and finishes. The visual version of Lesson 11's run history, watched task by task.

## Segment 4 (code: two paths, same job)

Building a job in the Workflows UI and declaring the same job in a Databricks Asset Bundle produce the identical underlying object. Neither is "the real one" — teams often start in the UI, then hand-write the equivalent YAML once the shape is settled.

## Segment 5 (outro)

The canvas is how a person builds a job; the job itself is the same object either way. Next up: what those dragged dependency lines actually mean.
