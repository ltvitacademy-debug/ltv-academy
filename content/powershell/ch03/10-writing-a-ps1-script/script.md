# Script — Writing a .ps1 Script

## Segment 1 (title)

A .ps1 file is nothing magical — it's a plain text file of PowerShell commands, saved and run in order, exactly like the commands you've already been typing at the console.

## Segment 2 (code: the file itself)

Save a few lines — checking free disk space, say — in any text editor with a .ps1 extension, and it's a script. Everything from Chapters 1 and 2 works identically whether typed live or saved in a file.

## Segment 3 (code: execution policy)

The first run usually hits execution policy — Windows blocks scripts by default so a malicious file can't silently run. Get-ExecutionPolicy shows the current setting; Set-ExecutionPolicy RemoteSigned -Scope CurrentUser is the real, common fix — local scripts run freely, downloaded ones need a trusted signature.

## Segment 4 (steps: running it)

Run a script with .\script.ps1 — that leading dot-backslash is required, because unlike a traditional shell, PowerShell doesn't search the current folder by default. Leave it off and you'll get "not recognized" even though the file is right there.

## Segment 5 (outro)

That's writing and running a script. Next up: if/else and switch — giving a script the ability to make decisions.
