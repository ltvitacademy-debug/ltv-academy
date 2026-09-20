# Script — File Growth & Autogrowth

## Segment 1 (title)

Corruption is a rare emergency. Bad autogrowth settings are a slow-motion emergency almost every production instance has somewhere — quietly fragmenting the disk and stalling transactions until a DBA finds it.

## Segment 2 (code: every file's growth settings)

Sys.database_files exposes every file's growth configuration. The growth column's meaning depends on is_percent_growth: if 1, it's a percentage; if 0, it's a fixed number of 8 kilobyte pages.

## Segment 3 (steps: why percentage growth gets worse over time)

Percentage growth seems harmless on a small file, but it compounds. A 10 gigabyte file growing 10 percent adds 1 gigabyte. The same 10 percent on a 500 gigabyte file adds 50 gigabytes in one event — and on a busy log file, growth events serialize, stalling every other transaction.

## Segment 4 (code: fixed-size growth instead)

The fix is a fixed growth increment, sized deliberately, so growth events stay predictable no matter how large the file has already gotten. Pre-sizing files up front to their expected working size avoids most growth events entirely.

## Segment 5 (outro)

Autogrowth should be the safety net for unexpected growth, not the primary sizing strategy. Next up: capacity monitoring — trending disk space with T-SQL before it actually runs out.
