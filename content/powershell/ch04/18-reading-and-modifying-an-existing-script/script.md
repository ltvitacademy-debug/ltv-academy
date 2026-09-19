# Script — Reading & Modifying an Existing Script

## Segment 1 (title)

The real, everyday DBA task isn't writing from a blank file — it's opening a script someone else already wrote and needing to trust it, then change one thing safely. Here's Lesson 17's Test-BackupAge again, for exactly that.

## Segment 2 (code: reading it in order)

A Verb-Noun function, an optional threshold with a default, one T-SQL query run via dbatools, a loop over the results, branching into three states. Four chapters' worth of pieces, none individually mysterious once you look for them by name.

## Segment 3 (code: the gap, and the fix)

Reading closely surfaces a real problem — one unreachable server would crash the whole script. A try/catch around the risky line, with return, lets one dead server report clearly while the outer loop keeps checking the rest.

## Segment 4 (code: the safe modification)

Lesson 17 flagged this script as console-only. Adding a log file is one new, defaulted parameter and one Out-File -Append line — additive, backward-compatible, touching only the one thing it set out to change.

## Segment 5 (steps: what this completes)

18 lessons, 4 chapters completes PowerShell Fundamentals — and with it, the Azure Database Administrator path's Advanced stage. Job Ready and Advanced are both now fully built, closing all seven courses in the path.

## Segment 6 (outro)

No Lesson 19. Ready when you can open any of this course's scripts and confidently explain, and safely change, what they do. Congratulations on finishing PowerShell Fundamentals — and the entire Azure Database Administrator path.
