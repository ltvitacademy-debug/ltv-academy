# Script — File & Filegroup Design

## Segment 1 (title)

Every data file lands in a filegroup. For most databases the default is fine — but once a database gets large, filegroup design becomes one of the highest-leverage decisions a DBA makes.

## Segment 2 (code: real syntax)

Every database has exactly one primary filegroup, holding the primary data file and the system catalog. User-defined filegroups are containers of secondary .ndf files you create and name yourself. Add them with ALTER DATABASE ADD FILEGROUP, then ADD FILE TO FILEGROUP.

## Segment 3 (steps: why split across filegroups)

Three real reasons to split data across filegroups. Parallel I/O, when files sit on separate physical disks. Piecemeal restore, bringing the primary filegroup online first while less-critical filegroups restore afterward. And isolating rarely-changing historical data as read-only, which lets backups skip it most of the time.

## Segment 4 (outro)

Filegroup design pays off most on large databases with a clear hot-versus-cold data split. Next up: database options — the ALTER DATABASE SET settings every DBA needs to get right.
