# Configuration as Code

Provisioning gets you a server. It doesn't get you a server with the right `sp_configure`
values, the right max server memory, or the right database options — every time, on every
instance, without someone remembering to set it by hand. That's what configuration as code is
for: expressing the *desired state* of a running SQL Server instance declaratively, the same way
IaC expresses the desired state of the infrastructure underneath it.

## What you'll learn

- What PowerShell DSC (Desired State Configuration) actually is, and the declarative shape it
  uses
- How a declarative config resource differs from an imperative script that just runs commands
  once
- Where a category like Ansible-style configuration management fits, described honestly without
  overclaiming specific product details

## PowerShell DSC's declarative shape

DSC is a management platform built into PowerShell for declaring the state a system should be
in, then having an engine repeatedly reconcile the system to that state — not just running a
script once, but continuously enforcing it. A DSC configuration block for a SQL Server setting
looks like this:

```powershell
Configuration SqlServerBaseline {
    Import-DscResource -ModuleName SqlServerDsc

    Node 'SQLPRD01' {
        SqlMaxDop 'SetMaxDop' {
            ServerName     = 'SQLPRD01'
            InstanceName   = 'MSSQLSERVER'
            MaxDop         = 4
            DynamicAlloc   = $false
        }
    }
}
```

The `SqlServerDsc` module (a real, Microsoft-adjacent open-source DSC resource module) exposes
resources for common SQL Server settings. You declare `MaxDop = 4`; the DSC engine checks the
current value and only changes it if it doesn't already match — the same "declare desired state,
let the tool reconcile" idea from IaC, just aimed one level down, at the instance's own settings
rather than at the VM.

## Declarative vs. imperative, concretely

The contrast matters because it's easy to write something that *looks* like configuration as
code but is really just a script:

```powershell
# Imperative — runs once, doesn't know or care about current state
Invoke-DbaQuery -SqlInstance SQLPRD01 -Query "EXEC sp_configure 'max degree of parallelism', 4; RECONFIGURE"
```

```powershell
# Declarative — DSC resource; re-applying it is a no-op if already correct
SqlMaxDop 'SetMaxDop' { ServerName = 'SQLPRD01'; MaxDop = 4 }
```

Both can set the same value. The imperative version doesn't know if the setting already matches
— it just runs. The declarative version can be safely re-applied on a schedule, catching drift
(someone manually changing the setting later) without a DBA having to remember to re-run
anything by hand.

## Where Ansible-style config management fits

Outside the Microsoft/PowerShell ecosystem, Ansible-style configuration management tools follow
the same declarative-state idea using YAML playbooks instead of PowerShell DSC resources —
describing target state for a fleet of servers and letting an agent-less run reconcile it. This
course doesn't go deep on any one such tool's exact syntax or feature set (that's genuinely
outside DBA-specific scope), but it's worth knowing the category exists: if your organization's
config-management standard is already Ansible-based rather than DSC-based, the same
"configuration as code" principle applies through that tool instead.

## Key terms

| Term | Meaning |
|---|---|
| DSC (Desired State Configuration) | PowerShell platform for declaring and continuously enforcing a system's configuration state |
| `SqlServerDsc` | Open-source DSC resource module exposing SQL Server-specific configuration resources |
| Declarative configuration | Describes the desired end state; re-applying is a no-op if the state already matches |

## Check yourself

Why can a declarative DSC resource be safely re-run on a recurring schedule, while re-running an
imperative `sp_configure` script on the same schedule is riskier or at least less meaningful?
