# Script — Shared and Non-Shared Reference Data

## Segment 1 (title)

Lesson twelve introduced reference data sets conceptually. This lesson goes deeper: not all reference data behaves the same way, and knowing the difference lets you predict how a setup object will behave before you configure it.

## Segment 2 (steps)

Some reference data is partitioned — split across multiple sets, with a business unit assigned to exactly one set per object type. Payment terms is the classic example. Other reference data isn't partitioned at all; there's only ever the Common Set, and every business unit sees identical values.

## Segment 3 (code)

Business unit is the typical determinant type, but it's not the only one. Depending on the object, the determinant type might be the ledger, the asset book, or the project unit instead. The determinant type is fixed per object; which value a set is assigned to is what you configure.

## Segment 4 (steps)

For shared, non-partitioned data, Oracle uses the word subscription: a business unit subscribes to a shared set rather than owning an exclusive copy. It behaves like the Common Set pattern, but the vocabulary matters when reading Oracle's own documentation.

## Segment 5 (outro)

Partitioned data splits by a determinant type like business unit; non-partitioned data only has the Common Set, subscribed to broadly. Next up, lesson fourteen: locations, geographies, and addresses.
