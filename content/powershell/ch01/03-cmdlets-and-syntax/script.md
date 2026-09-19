# Script — Cmdlets & Syntax

## Segment 1 (title)

Every PowerShell command is a cmdlet, and every cmdlet follows one strict pattern: Verb-Noun. That's not a style preference — it's what makes PowerShell learnable by pattern instead of memorization.

## Segment 2 (code: Verb-Noun and parameters)

Get-ChildItem, Stop-Service, New-Item — verb first, noun second, always. Parameters start with a dash and tell a cmdlet what to act on: Get-ChildItem -Path "C:\Logs" -Recurse points it at a specific folder and tells it to include subfolders.

## Segment 3 (steps: reading a line you've never seen)

Take Restart-Service -Name "Spooler" -Force. The verb and noun tell you what's happening before you know anything about print spoolers. -Name tells you which service. -Force, a switch parameter, tells you it won't ask for confirmation. That's the real payoff of this pattern — reading a script you've never seen and understanding it on sight.

## Segment 4 (outro)

Named parameters over positional ones, almost everywhere, starting in Chapter 3. Next up: getting help — how to find the right cmdlet without memorizing hundreds of them.
