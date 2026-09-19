# Script — Azure PowerShell Module Basics

## Segment 1 (title)

PowerShell doesn't talk to Azure natively — that comes from a module you install. The current one is Az, the successor to the older AzureRM, which Microsoft has since retired.

## Segment 2 (code: installing it)

Install-Module -Name Az -Scope CurrentUser -Repository PSGallery — CurrentUser usually doesn't need admin rights, and PSGallery is Microsoft's trusted source. Az is actually dozens of smaller modules bundled together, one per Azure service area.

## Segment 3 (code: how it's organized)

That bundling is why Az cmdlets are named Verb-Az-Service-Noun — Connect-AzAccount, Get-AzSqlServer, New-AzResourceGroup. Once you know the pattern, guessing a cmdlet name gets a lot easier.

## Segment 4 (steps: checking what's installed)

Get-InstalledModule -Name Az -ListAvailable confirms what's actually on a machine — worth checking before assuming Az is ready, especially on a machine you didn't set up yourself.

## Segment 5 (outro)

Az is the standard; AzureRM is retired but still shows up in old scripts online. Next up: actually connecting to Azure with Connect-AzAccount.
