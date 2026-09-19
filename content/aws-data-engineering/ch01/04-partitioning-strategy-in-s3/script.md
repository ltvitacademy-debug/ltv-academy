# Script — Partitioning Strategy in S3

## Segment 1 (title)

S3 has no real directories, but Athena, Glue, and Redshift Spectrum still need a way to skip data that can't match a query. That mechanism is partitioning.

## Segment 2 (code: Hive-style partitioning)

Hive-style partitioning encodes column and value right into the key prefix — year equals 2024, month equals 01, day equals 15. Glue crawlers and Athena both recognize this automatically and register those as real partition columns, even though the values only ever appear in the key, not inside the files.

## Segment 3 (steps: choosing granularity)

Partition too coarse and queries still scan more than they need. Partition too fine — down to the hour on a table that gets a couple hundred rows a day — and you get catalog bloat and tiny objects that cost more in planning overhead than they save. The right level matches what your queries actually filter on.

## Segment 4 (outro)

Partitioning strategy down. Next up: S3 event notifications — triggering a pipeline the moment new data lands.
