# Error Handling in DBA Scripts

An unhandled error in a typical script usually just means a failed run and a red error
message. An unhandled error in the *middle* of a DBA maintenance script can mean a
database left mid-backup, an index rebuild abandoned halfway, or a security change
applied to half a server estate and not the rest. Error handling matters more here than
in most scripting contexts, because the blast radius of getting it wrong is production
data.

## What you'll learn

- `try`/`catch`/`finally`, and what each block is actually responsible for
- `$ErrorActionPreference` and why relying on its default is risky
- `-ErrorAction Stop`, and why it's required for `catch` to trigger at all
- Why DBA scripts specifically need more error handling discipline than most scripts

## try / catch / finally

```powershell
try {
    Backup-DbaDatabase -SqlInstance SQLPRD01 -Database Sales -Path \\backups\sales -ErrorAction Stop
    Write-Output "Backup succeeded."
}
catch {
    Write-Error "Backup failed: $($_.Exception.Message)"
    # Send-MailMessage / write to a log here, so someone actually finds out
}
finally {
    Write-Output "Backup attempt finished at $(Get-Date)."
}
```

`try` wraps the code that might fail. `catch` runs only if something inside `try` throws a
*terminating* error, and gives you `$_` — the error record — to inspect or log. `finally`
runs every time, whether the `try` block succeeded or the `catch` block fired, which makes
it the right place for cleanup that always has to happen (closing a connection, writing a
"finished" log line) regardless of outcome.

## Why -ErrorAction Stop matters

This is the detail that catches people out: by default, most cmdlets produce a
**non-terminating** error, which prints in red but does *not* trigger `catch` — the script
just keeps going to the next line as if nothing happened:

```powershell
try {
    Backup-DbaDatabase -SqlInstance SQLPRD01 -Database Sales -Path \\backups\sales
    # If this fails with a non-terminating error, catch below never runs —
    # execution falls straight through to "Write-Output" as if it succeeded
    Write-Output "Backup succeeded."
}
catch {
    Write-Error "This will never print without -ErrorAction Stop above."
}
```

Adding `-ErrorAction Stop` forces that specific command's errors to be treated as
terminating, so `catch` actually fires. This one flag is the difference between a
try/catch block that looks correct and one that silently does nothing when it matters
most.

## $ErrorActionPreference

`$ErrorActionPreference` sets the default behavior for the whole script instead of one
command at a time. Setting it to `Stop` at the top of a script means every error in that
script becomes terminating by default, without adding `-ErrorAction Stop` to every single
line:

```powershell
$ErrorActionPreference = "Stop"

try {
    Get-DbaDatabase -SqlInstance SQLPRD01
    Backup-DbaDatabase -SqlInstance SQLPRD01 -Database Sales -Path \\backups\sales
}
catch {
    Write-Error "Something in the maintenance job failed: $($_.Exception.Message)"
}
```

This is a reasonable default for an unattended maintenance script — you generally want any
failure to stop and get logged, not get silently skipped while the script marches on and
reports "success" at the end.

## Why this matters more for DBA scripts

A script that fails partway through a report generation just produces an incomplete
report — annoying, but low-risk. A DBA maintenance script that fails partway through can
leave a database in a genuinely bad state: a backup job that failed silently gives you a
false sense that recovery is possible; an index rebuild interrupted mid-operation can
leave a table locked or in an inconsistent state; a security remediation script that
errors on server six of ten and keeps going leaves four servers unpatched with nobody
told. Robust `try`/`catch`/`finally`, `-ErrorAction Stop`, and deliberate logging aren't
defensive-programming nice-to-haves in this context — they're what turns "a script that
usually works" into something safe to actually run unattended against production.

## Key terms

| Term | Meaning |
|---|---|
| `try` / `catch` / `finally` | Blocks for attempting risky code, handling terminating errors, and running cleanup regardless of outcome |
| Terminating error | An error that stops execution and can be caught by `catch` |
| Non-terminating error | An error that prints but lets the script continue — `catch` does not fire |
| `-ErrorAction Stop` | Forces a specific command's errors to be treated as terminating |
| `$ErrorActionPreference` | Script-wide default for error handling behavior |

## Check yourself

A DBA writes a `try`/`catch` block around `Backup-DbaDatabase` but never adds
`-ErrorAction Stop` and never sets `$ErrorActionPreference`. What actually happens if that
backup command fails, and why might the script appear to report success anyway?
