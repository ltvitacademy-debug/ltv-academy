# Script — Querying Job History

## Segment 1 (title)

Every SQL Server Agent job leaves a trail in msdb. This lesson is about reading that trail with T-SQL instead of clicking through the Agent's View History dialog one job at a time.

## Segment 2 (code: sysjobs and sysjobhistory)

Two tables do almost all the work. Sysjobs holds one row per job. Sysjobhistory holds one row per job step execution, plus a summary row for the whole run where step_id equals zero — that summary row is what most monitoring queries actually want.

## Segment 3 (code: decoding run_status)

Run_status is an integer, not a word. Zero means failed, one means succeeded, two is retry, three is canceled, four is in progress. A case expression turns that into something readable in your result set.

## Segment 4 (steps: run_date and run_time)

Agent stores run_date and run_time as packed integers, not a real datetime — twenty-two thousand for a date, and an unpadded time like nine-fifteen-thirty. Don't hand-parse that string. Msdb ships a function, agent_datetime, that converts both into one proper datetime value.

## Segment 5 (outro)

Once you can read run_status and convert the timestamps, the next step is narrowing this down to just the runs that went wrong. Next up: identifying failed jobs.
