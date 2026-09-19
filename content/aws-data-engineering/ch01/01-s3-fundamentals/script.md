# Script — S3 Fundamentals

## Segment 1 (title)

S3 is the single most load-bearing service in AWS data engineering. Nearly every pipeline you build in this course lands data in S3, reads it back out, or both.

## Segment 2 (code: object storage, not a filesystem)

S3 stores objects, identified by a key, inside a bucket. There's no real folder structure underneath — a key like "raw/orders/2024/01/15/part-0001.parquet" looks like a nested path, but it's one flat string. The console just renders common prefixes as if they were folders.

## Segment 3 (steps: why S3 is the default landing zone)

Three things make S3 the default first stop for data: capacity that scales from zero to petabytes with no resizing step, storage decoupled from compute so Glue, Athena, and Redshift can all read the same objects, and low enough cost that "store it first, decide later" is the standard pattern.

## Segment 4 (outro)

Object storage fundamentals down. Next up: buckets and objects in more depth — naming rules, metadata, and how objects actually get organized.
