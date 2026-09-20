# Automating Index & Statistics Maintenance

The SQL Server DBA course covered index and statistics maintenance manually — checking
fragmentation, deciding between a rebuild and a reorganize, updating statistics — as
T-SQL run by hand or through Ola Hallengren's well-known maintenance scripts. This lesson
automates that same decision-making with dbatools' own native cmdlet, and shows the
Hallengren-via-PowerShell path for anyone whose environment is already standardized on it.

## What you'll learn

- `Invoke-DbaDbOptimize`, dbatools' native index/statistics maintenance cmdlet
- How it makes the same rebuild-vs-reorganize decision the DBA course taught manually
- Wrapping Ola Hallengren's `IndexOptimize` procedure via `Invoke-Command`/`Invoke-DbaQuery`
- Why automating this needs the same safety patterns from Lessons 4 and 5

## Invoke-DbaDbOptimize

```powershell
Invoke-DbaDbOptimize -SqlInstance SQLPRD01 `
    -Database Sales `
    -FragmentationLow Skip `
    -FragmentationMedium IndexReorganize `
    -FragmentationHigh IndexRebuild `
    -UpdateStatistics
```

This is dbatools' own native command for exactly the rebuild-vs-reorganize decision the
SQL Server DBA course taught with T-SQL: low fragmentation, skip; medium fragmentation,
reorganize (cheaper, online); high fragmentation, rebuild (more thorough, more expensive).
`-UpdateStatistics` folds statistics maintenance into the same pass instead of a separate
step. The thresholds for "low," "medium," and "high" follow the same general fragmentation
percentage bands (roughly under 10%, 10–30%, over 30%) that the DBA course used for the
same manual decision.

## The alternative: wrapping Ola Hallengren's procedure

Many shops already standardized on Ola Hallengren's `IndexOptimize` stored procedure long
before adopting PowerShell. Rather than replace it, you can call it through
`Invoke-DbaQuery` (or `Invoke-Command` if it needs to run locally on the server), keeping
the existing, trusted T-SQL logic while gaining PowerShell's scripting around it:

```powershell
$query = "EXECUTE dbo.IndexOptimize
    @Databases = 'Sales',
    @FragmentationLow = NULL,
    @FragmentationMedium = 'INDEX_REORGANIZE',
    @FragmentationHigh = 'INDEX_REBUILD_ONLINE',
    @UpdateStatistics = 'ALL'"

Invoke-DbaQuery -SqlInstance SQLPRD01 -Database master -Query $query
```

This matters in practice: not every environment wants to swap a battle-tested T-SQL
procedure for a new cmdlet, and dbatools doesn't force that choice — `Invoke-DbaQuery` lets
PowerShell orchestrate the *scheduling, logging, and error handling* around Hallengren's
existing procedure without touching the procedure itself.

## Applying safety patterns from earlier lessons

Index maintenance is exactly the kind of destructive-adjacent operation Lesson 4's
`-WhatIf` pattern and Lesson 5's error handling exist for — a rebuild that fails partway
through, or runs against the wrong database because of a typo, is a real production risk:

```powershell
function Invoke-IndexMaintenance {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Mandatory)][string]$SqlInstance,
        [Parameter(Mandatory)][string]$Database
    )

    try {
        if ($PSCmdlet.ShouldProcess("$SqlInstance\$Database", "Run index/statistics maintenance")) {
            Invoke-DbaDbOptimize -SqlInstance $SqlInstance -Database $Database `
                -FragmentationHigh IndexRebuild -UpdateStatistics -ErrorAction Stop
        }
    }
    catch {
        Write-Error "Index maintenance failed on $SqlInstance\$Database: $($_.Exception.Message)"
    }
}
```

Wrapping the maintenance call in `-WhatIf` support and a `try`/`catch` is what turns "a
command that does index maintenance" into a script that's actually safe to schedule and
walk away from — the entire premise of this chapter.

## Key terms

| Term | Meaning |
|---|---|
| `Invoke-DbaDbOptimize` | dbatools' native cmdlet for automated index/statistics maintenance |
| `IndexOptimize` | Ola Hallengren's widely-used T-SQL maintenance procedure |
| `Invoke-DbaQuery` | Runs arbitrary T-SQL (like a call to `IndexOptimize`) against an instance from PowerShell |
| Fragmentation bands | Low/medium/high thresholds that decide skip/reorganize/rebuild, same concept from the DBA course |

## Check yourself

A shop already relies on Ola Hallengren's `IndexOptimize` procedure and doesn't want to
replace it. What does this lesson suggest instead of switching entirely to
`Invoke-DbaDbOptimize`, and what does PowerShell still add in that scenario?
