# Script — Data Pump: Export & Import

## Segment 1 (title)

Chapter Four closes where it opened: logical backup, in depth. Data Pump's expdp and impdp are the modern replacement for the old exp and imp utilities, and they do real work RMAN structurally can't.

## Segment 2 (code: directory object and schema export)

Every Data Pump job needs a directory object first, a named pointer to a server-side OS path. A schema export captures every object a schema owns — tables, indexes, constraints, procedures — as one portable dump file.

## Segment 3 (code: import remapping and selective export)

Import can reshape what it loads: REMAP_SCHEMA loads objects into a different schema, useful for refreshing test from production. TABLES and QUERY filter what actually moves, down to specific tables or even specific rows — nothing RMAN can do.

## Segment 4 (steps: not competing tools)

RMAN backs up and recovers the physical database, block by block, for disaster recovery and point-in-time restore of everything. Data Pump exports and imports logical objects, selectively and portably, for migration and refresh.

## Segment 5 (outro)

Chapter Five begins next: Oracle Performance Tuning Methodology — a disciplined approach to finding what's actually slow, before touching a single setting.
