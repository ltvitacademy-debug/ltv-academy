# Script — Unity Catalog Volumes

## Segment 1 (title)

Databricks & Delta Lake Lesson 45 already covered what a volume is and how to create one, fully. This lesson is what a single landing-zone example never showed.

## Segment 2 (code: checkpoints in a volume)

Lesson 32 pointed a checkpoint location at an ungoverned path. Putting that checkpoint inside a volume instead means it inherits Unity Catalog governance too — read volume on that path controls who can even inspect a running stream's offset state, not just who can query the resulting table.

## Segment 3 (code: non-tabular files)

Not every file belongs in a table. A trained model file, a PDF report, a folder of product images — a volume governs these with the exact same grant and revoke mechanism that locks down any table, where before it meant DBFS root with no governance at all.

## Segment 4 (steps: what a volume really is)

Both patterns are the same fact stated two ways: a volume isn't a landing zone for CSVs that happen to become tables later. It's the general answer to governing any file, tabular or not — including files a pipeline creates and reads internally that no user ever queries directly.

## Segment 5 (outro)

Checkpoints and non-tabular files, both governed the same way tables are. Next up: data lineage in Unity Catalog — past the graph, into column-level lineage as a real compliance tool.
