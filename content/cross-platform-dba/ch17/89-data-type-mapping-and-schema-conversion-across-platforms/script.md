# Script — Data Type Mapping & Schema Conversion Across Platforms

## Segment 1 (title)

The last three lessons covered Oracle, PostgreSQL, and MySQL individually. This lesson pulls the datatype side of all three together into one reference alongside SQL Server, because schema conversion decisions get made once and live with the schema forever.

## Segment 2 (code: integer, decimal, string)

Decimal and numeric types map cleanly across all four platforms — fixed precision and scale, no surprises. Integer is different: Oracle has one general-purpose NUMBER type instead of sized integers, so an Oracle target usually just uses NUMBER with the right precision. String types mostly map directly, with Unicode handling as the real judgment call.

## Segment 3 (code: date and datetime)

This category has the most real variation. Oracle's plain DATE type actually includes time down to the second, unlike SQL Server's date-only DATE — so it's often the right target for a DATETIME2 column, with Oracle's TIMESTAMP needed only for fractional-second precision. MySQL further splits DATETIME, a fixed value, from TIMESTAMP, which auto-converts to and from UTC.

## Segment 4 (steps: boolean isn't universal)

This is the category most likely to surprise someone assuming every database has a boolean. PostgreSQL is the only one of the four with a genuine native BOOLEAN type. SQL Server uses BIT, MySQL's BOOLEAN is literally an alias for TINYINT(1), and pre-23c Oracle has no native boolean at all — just the NUMBER(1) or CHAR(1) convention.

## Segment 5 (outro)

Getting these mappings right the first time matters more than almost any other conversion step. Next up, the chapter finale: the real tools used to actually move the data across platforms.
