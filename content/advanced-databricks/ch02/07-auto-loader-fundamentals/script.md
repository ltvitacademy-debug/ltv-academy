# Script — Auto Loader Fundamentals

## Segment 1 (title)

Databricks & Delta Lake Lesson 32 already covered Auto Loader's core problem and syntax in full. This lesson is what happens underneath that at scale, and the options a single introductory example skipped.

## Segment 2 (code: RocksDB-backed state)

Lesson 32 said the checkpoint maintains its own record. At millions of files, that record isn't a flat list — Auto Loader backs it with a real embedded key-value store, specifically because a naive list of every filename ever seen would itself become slow to scan.

## Segment 3 (code: throughput control)

Point Auto Loader at a directory with millions of backlog files and, without a limit, the first micro-batch tries to process all of them at once. Max files per trigger and max bytes per trigger cap how much a single micro-batch takes on.

## Segment 4 (code: backfilling)

Auto Loader's default behavior processes files that already exist in a directory the first time a stream starts. Setting include existing files to false is the real switch for pointing a brand-new stream at years of historical files you don't want reprocessed.

## Segment 5 (outro)

The state store, the throughput controls, the backfill switch — all real production knobs. Next up: schema inference and evolution, past the one line Lesson 32 gave it.
