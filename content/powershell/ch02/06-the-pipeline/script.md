# Script — The Pipeline

## Segment 1 (title)

Chapter 2 starts here, with the mechanism Lesson 1 promised: the pipe operator hands the previous command's full object output to the next command, not just the text you see on screen.

## Segment 2 (code: what actually flows through)

Get-Process | Sort-Object CPU works because CPU is a real property on the object being piped, not a column of text Sort-Object has to parse. Chain more stages and each one still receives full objects — filtering narrows which objects continue, it doesn't strip properties.

## Segment 3 (steps: reading a pipeline left to right)

Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object Name. Stage one: every service. Stage two: keep only the ones running, using $_ for the current object. Stage three: keep only the Name property. Read left to right and even a long pipeline is just a sequence of ordinary filters.

## Segment 4 (outro)

$_ is the single most common variable name in PowerShell precisely because the pipeline is used constantly. Next up: objects vs. text — the deepest idea in this pair of chapters.
