# Script — Getting Help: Get-Help & Get-Command

## Segment 1 (title)

Nobody memorizes hundreds of cmdlets. The real DBA skill is finding the right one in under a minute, and PowerShell ships the tools to do exactly that.

## Segment 2 (code: Get-Help)

Get-Help Get-ChildItem -Examples prints real, runnable examples straight from Microsoft's documentation — usually faster than a web search. When you need every parameter, Get-Help Get-ChildItem -Full gives you the complete picture.

## Segment 3 (code: Get-Command)

Get-Help assumes you already know the cmdlet's name. When you don't, Get-Command -Verb Get -Noun *Process* searches by verb and noun and surfaces Get-Process even if you'd never have guessed it.

## Segment 4 (outro)

Get-Help and Get-Command together mean you can sit down at any server and find the right command, no internet required. Next up: variables and data types.
