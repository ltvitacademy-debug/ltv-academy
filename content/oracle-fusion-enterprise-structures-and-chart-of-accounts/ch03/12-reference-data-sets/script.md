# Script — Reference Data Sets

## Segment 1 (title)

Different business units often need different versions of the same kind of policy — one country's payment terms aren't another's. Oracle Fusion solves this with reference data sets.

## Segment 2 (steps)

Oracle Fusion is one piece of software shared by every business unit, but they frequently need different values for the same kind of setup data. Without a way to separate this, every business unit would be forced onto identical policies, or the company would need separate instances.

## Segment 3 (code)

A reference data set is a named grouping of reference data values. Payment terms, for example, can be partitioned by set — a US Policies set and an EU Policies set, each with its own list. A business unit is assigned to a specific set for each reference data type it uses.

## Segment 4 (steps)

Not every piece of data needs a business-unit-specific version. The Common Set, sometimes called the Enterprise Set, holds reference data every business unit should see the same way. Over-segmenting into many sets when Common would do just adds maintenance.

## Segment 5 (outro)

How does the system know which set applies? It looks at a determinant, usually the business unit, from the transaction's context. A reference data set is a named grouping a business unit is assigned to. Next up, lesson thirteen: shared and non-shared reference data.
