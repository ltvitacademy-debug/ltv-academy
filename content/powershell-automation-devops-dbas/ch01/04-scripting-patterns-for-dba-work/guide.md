# Scripting Patterns for DBA Work

A one-off command in the console and a script other people (or a scheduled task) will run
unattended are different problems. Once a script touches production, three habits
separate a script that's safe and reusable from one that's a liability: parameterizing
instead of hardcoding, supporting `-WhatIf` on anything destructive, and splatting long
parameter lists so they stay readable.

## What you'll learn

- Why hardcoded server names turn a script into a one-time-use liability
- How `SupportsShouldProcess` and `-WhatIf` add a safety net to destructive commands
- Splatting, and why it matters more as a script's parameter list grows
- How these three patterns work together in one real script

## Parameterize instead of hardcoding

A script with `SQLPRD01` typed directly into it only ever runs against `SQLPRD01`. The
fix is a `param()` block, turning the script into a reusable tool instead of a single-use
artifact:

```powershell
param(
    [Parameter(Mandatory)]
    [string]$SqlInstance,

    [string]$Database = "master",

    [int]$RetentionDays = 14
)

Get-DbaDatabase -SqlInstance $SqlInstance -Database $Database
```

Now the same script runs against any server, any database, with defaults for the values
that usually don't change. This is the difference between a script and a *tool* — one you
and your team can actually reuse instead of copy-pasting and hand-editing every time.

## SupportsShouldProcess and -WhatIf

Anything that deletes, drops, or overwrites data should support `-WhatIf`, so a person (or
a nervous first run) can preview exactly what the script *would* do without it actually
happening:

```powershell
function Remove-OldBackupFile {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [string]$Path,
        [int]$RetentionDays = 14
    )

    Get-ChildItem $Path -Filter *.bak |
        Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$RetentionDays) } |
        ForEach-Object {
            if ($PSCmdlet.ShouldProcess($_.FullName, "Delete old backup file")) {
                Remove-Item $_.FullName
            }
        }
}

Remove-OldBackupFile -Path \\backups\sales -WhatIf
```

`[CmdletBinding(SupportsShouldProcess)]` on the function and a call to
`$PSCmdlet.ShouldProcess()` around the actual destructive line are what make `-WhatIf`
(and `-Confirm`) work. Run with `-WhatIf` and PowerShell prints "What if: Performing the
operation..." for every file instead of deleting anything — genuinely safe to run against
production to see what a script would touch before trusting it.

## Splatting for readable parameter lists

Once a command takes five or six parameters, a single long line becomes hard to read and
easy to typo. Splatting collects parameters into a hashtable and passes them with `@`
instead of `$`:

```powershell
$backupParams = @{
    SqlInstance = "SQLPRD01"
    Database    = "Sales"
    Path        = "\\backups\sales"
    Type        = "Full"
    CompressBackup = $true
}

Backup-DbaDatabase @backupParams
```

Every parameter gets its own line, name and value both visible, and adding or removing one
later means editing a hashtable key instead of untangling a 150-character command line.

## Putting the three together

```powershell
function Backup-DbaDatabaseSafely {
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Mandatory)]
        [string]$SqlInstance,

        [Parameter(Mandatory)]
        [string]$Database,

        [string]$Path = "\\backups\default"
    )

    $backupParams = @{
        SqlInstance    = $SqlInstance
        Database       = $Database
        Path           = $Path
        CompressBackup = $true
    }

    if ($PSCmdlet.ShouldProcess("$SqlInstance\$Database", "Run full backup")) {
        Backup-DbaDatabase @backupParams
    }
}
```

Parameterized (works against any server), safe (`-WhatIf` previews before it runs), and
readable (splatted rather than a wall of inline arguments) — this is the shape most
production-ready DBA scripts should take.

## Key terms

| Term | Meaning |
|---|---|
| `param()` block | Declares a script or function's inputs instead of hardcoding values |
| `SupportsShouldProcess` | CmdletBinding option that enables `-WhatIf` / `-Confirm` support |
| `$PSCmdlet.ShouldProcess()` | Call that actually gates a destructive action behind `-WhatIf`/`-Confirm` |
| Splatting | Passing a hashtable of parameters with `@` instead of listing them inline with `$` |

## Check yourself

What two things does `[CmdletBinding(SupportsShouldProcess)]` on its own *not* do, and
what call inside the function is required to actually make `-WhatIf` prevent a destructive
action from running?
