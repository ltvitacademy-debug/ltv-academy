# Script — Extended Database Properties

## Segment 1 (title)

This closes out the chapter with the metadata layer: inspecting the configuration you've set across the last five lessons, and attaching your own custom metadata on top of it.

## Segment 2 (code: sys.databases and DATABASEPROPERTYEX)

sys.databases has one row per database and columns covering nearly everything you've configured — recovery model, compatibility level, state, collation. DATABASEPROPERTYEX gives you one specific property for one specific database, handy inside a script or a conditional check.

## Segment 3 (steps: custom metadata)

SQL Server has no built-in column for who owns a database or its data classification. sp_addextendedproperty attaches arbitrary name and value pairs as metadata. Query it back with sys.extended_properties or fn_listextendedproperty.

## Segment 4 (outro)

That's the full chapter on database creation and configuration. Next up: data file and log file management — the storage chapter begins.
