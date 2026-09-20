# Script — Error Handling in Automation

## Segment 1 (title)

Lesson 5 covered try, catch, finally for a single script run interactively, where a DBA sees the error the moment it happens. A scheduled script running at 2am has no one watching. This lesson expands that pattern into something that survives running unattended.

## Segment 2 (code: why silent failures are dangerous here)

An interactive failure gets noticed immediately. A scheduled failure with nothing recording it anywhere durable means the only signal left is much worse, later — a stale-backup alert, or an actual restore attempt discovering there's nothing usable. Logging isn't polish, it's the only warning.

## Segment 3 (code: a real custom log-to-file pattern)

Add-Content appends a timestamped line to a plain text log file. This custom Write-Log pattern needs no external module and works on any machine with PowerShell installed — the common real-world default for logging inside a scheduled script.

## Segment 4 (code: try/catch/finally, automation-ready)

Get-DbatoolsLog retrieves dbatools' own internal log of what its commands did — different from your own script's log. Your log records what your script decided to do; dbatools' log records what a dbatools command itself actually did internally.

## Segment 5 (outro)

Try, catch, finally, plus a durable log file and an active email alert — that's automation-ready error handling every script in this chapter should follow once scheduled. Next up, Chapter Three: why version control matters for database objects.
