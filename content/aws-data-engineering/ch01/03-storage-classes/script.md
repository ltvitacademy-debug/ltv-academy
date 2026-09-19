# Script — Storage Classes

## Segment 1 (title)

Not all data gets read at the same rate, so S3 offers multiple storage classes — same durability guarantee, very different cost and retrieval time depending on how cold the data really is.

## Segment 2 (code: the storage class ladder)

The ladder runs from S3 Standard at millisecond access down through Standard-IA and One Zone-IA, Intelligent-Tiering, and three Glacier tiers — Instant Retrieval, Flexible Retrieval measured in minutes to hours, and Deep Archive at up to twelve hours. Every one of them carries the same eleven-nines durability; you're trading speed and cost, not safety.

## Segment 3 (steps: a lifecycle policy)

A lifecycle policy automates that cold-down: land new data in S3 Standard on day zero, transition to Standard-IA around day thirty once access drops off, then move to Glacier around day ninety for data you're keeping mostly for compliance. Write the rule once and it applies to every object going forward.

## Segment 4 (outro)

Storage classes down. Next up: partitioning strategy in S3 — Hive-style prefixes and why partition pruning matters for Athena and Glue.
