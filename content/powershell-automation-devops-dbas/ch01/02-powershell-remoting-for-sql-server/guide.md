# PowerShell Remoting for SQL Server

dbatools gives you commands, but a real DBA environment usually has dozens of SQL Server
instances, not one. Once you need to run the same script against many servers — or run
something that has to execute *on* the server itself rather than just connect to it —
you need PowerShell Remoting, not just a dbatools connection string.

## What you'll learn

- What PowerShell Remoting actually is, and the transport it runs on
- `Invoke-Command`, `New-PSSession`, and when to use each
- The real DBA use case: one script, many servers, zero RDP sessions
- Why remoting into a machine is a different thing from dbatools connecting to an instance

## WinRM: the transport underneath

PowerShell Remoting runs on **WinRM** (Windows Remote Management), Microsoft's
implementation of the WS-Management protocol. WinRM listens on TCP port 5985 (HTTP) or
5986 (HTTPS), and it has to be enabled and configured before remoting will work:

```powershell
# Run once, as admin, on any machine you want to remote INTO
Enable-PSRemoting -Force

# Confirm the WinRM service and listener are up
Get-Service WinRM
Test-WSMan -ComputerName SQLPRD01
```

`Enable-PSRemoting` starts the WinRM service, creates a listener, and opens the firewall
rule for it. In a domain environment this is frequently handled once for you via Group
Policy, but it's worth knowing what's actually running underneath `Invoke-Command` —
it's not magic, it's an HTTP-based management protocol with its own service and port.

## Invoke-Command: run it once, on many machines

`Invoke-Command` runs a script block on one or more remote computers and returns the
results to your local session:

```powershell
Invoke-Command -ComputerName SQLPRD01, SQLPRD02, SQLPRD03 -ScriptBlock {
    Get-Service MSSQLSERVER | Select-Object MachineName, Status
}
```

Because the script block executes *on each remote machine*, this is the tool for tasks
that are about the server itself — checking a Windows service, reading a local file, or
running a dbatools command that needs to execute from that box specifically. Compare that
to a direct dbatools call like `Get-DbaDatabase -SqlInstance SQLPRD01`, which runs from
wherever *you* are and just talks to the SQL Server over the network — no remoting
involved at all. Those are two different transports solving two different problems, and
mixing them up is a common point of confusion for DBAs new to this.

## Persistent sessions with New-PSSession

`Invoke-Command -ComputerName` opens a new connection, runs the block, and tears the
connection down every time you call it. If you're running several commands against the
same servers, that's wasteful. `New-PSSession` creates a persistent, reusable connection:

```powershell
$sessions = New-PSSession -ComputerName SQLPRD01, SQLPRD02, SQLPRD03

Invoke-Command -Session $sessions -ScriptBlock {
    Get-Volume | Where-Object { $_.SizeRemaining -lt 10GB }
}

# Run something else against the same open sessions
Invoke-Command -Session $sessions -ScriptBlock { Get-Date }

Remove-PSSession $sessions
```

The sessions stay open in the background until you explicitly remove them, which avoids
the authentication and connection overhead of reconnecting for every single command —
meaningful when a script touches ten or twenty servers in a loop.

## The real DBA use case

The pattern DBAs reach for most: run one dbatools command against every server in an
estate, from a single script, with no RDP session opened anywhere:

```powershell
$servers = 'SQLPRD01', 'SQLPRD02', 'SQLPRD03'

Invoke-Command -ComputerName $servers -ScriptBlock {
    Import-Module dbatools
    Test-DbaLastBackup -SqlInstance localhost
} | Select-Object ComputerName, Database, RestoreResult
```

Notice `-SqlInstance localhost` inside the script block — the command runs *on* each
remote machine, so from that machine's own point of view, the SQL instance is local.
That's the combination worth internalizing: PowerShell Remoting gets your code running on
the right box; dbatools does the actual SQL Server work once it's there.

## Key terms

| Term | Meaning |
|---|---|
| WinRM | Windows Remote Management — the WS-Management-based service PowerShell Remoting runs on, ports 5985/5986 |
| `Invoke-Command` | Runs a script block on one or more remote computers, one connection per call |
| `New-PSSession` | Opens a persistent, reusable remote connection for multiple commands |
| `Enable-PSRemoting` | One-time setup that starts WinRM and opens the firewall on the target machine |

## Check yourself

Why is `Test-DbaLastBackup -SqlInstance localhost` correct inside an `Invoke-Command`
script block targeting a remote server, rather than a mistake? What would change if you
ran that same line without wrapping it in `Invoke-Command` first?
