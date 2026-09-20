# Script — Database Documentation

## Segment 1 (title)

Source control tells you what the objects are. It rarely tells you why they look the way they do — and that context disappears once the person who knew it moves on.

## Segment 2 (code: Extended properties)

SQL Server has a built-in mechanism for this: extended properties, added with sp_addextendedproperty. They attach a name/value pair directly to a table, column, or index — using MS_Description means SSMS's Object Explorer shows it natively as the object's description.

## Segment 3 (steps: What's worth documenting)

Not everything needs a property — obvious names and types don't. What's worth it is the non-obvious: why a column that looks unused is still required, why an index that looks redundant is load-bearing, which job depends on a table that looks orphaned.

## Segment 4 (outro)

Documentation only stays useful if the schema it describes actually matches what's really running in production. Next up: managing schema drift.
