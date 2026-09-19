# Script — Running T-SQL From PowerShell: An Intro to dbatools

## Segment 1 (title)

SSMS is a GUI, built for one server at a time. dbatools is a free, open-source PowerShell module, purpose-built for the repetitive, multi-server SQL Server admin work a GUI was never designed to automate.

## Segment 2 (code: Invoke-DbaQuery)

Invoke-DbaQuery runs actual T-SQL against a server and hands the results back as real PowerShell objects, not text to parse. That means everything from Chapters 1-3 — Where-Object, foreach, functions — applies to the results immediately.

## Segment 3 (code: many servers, one script)

The real value shows up across a fleet — a foreach loop running the same Invoke-DbaQuery against three, ten, or fifty servers in a few lines, instead of opening SSMS separately for each one.

## Segment 4 (steps: the Azure DBA connection)

This is the PowerShell-side counterpart to Azure Database Administrator Lesson 63's SQL Agent-side automation — same goal, maintenance work, scripted and repeatable from outside the server instead of jobs running inside it.

## Segment 5 (outro)

dbatools turns T-SQL into something scriptable across any number of servers. Next up: putting this together in a real, complete automation example.
