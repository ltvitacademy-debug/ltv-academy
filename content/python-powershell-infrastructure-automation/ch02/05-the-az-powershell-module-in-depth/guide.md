# Lesson 5 — The Az PowerShell Module in Depth

**Chapter 2 · PowerShell for Azure Automation · Lesson 5 of 32**

## What you'll learn

- Why `Az` is really a collection of dozens of smaller, service-specific modules, not one giant one
- How to check which Az sub-modules and versions are actually installed on a machine
- How to sign a script in to Azure without a human present, using a service principal
- Why keeping `Az` updated is an automation concern, not just housekeeping

## One name, many modules underneath

The PowerShell Fundamentals course and the Azure CLI & PowerShell Administration lesson already
covered `Install-Module -Name Az` and `Connect-AzAccount`. What's worth seeing explicitly is what
`Install-Module -Name Az` actually installs: not one module, but an umbrella that pulls in a whole
family of service-specific sub-modules — `Az.Accounts`, `Az.Compute`, `Az.Storage`, `Az.Network`,
`Az.Resources`, `Az.Sql`, and dozens more, one per Azure service area. `Get-AzVM` lives in
`Az.Compute`; `Get-AzStorageAccount` lives in `Az.Storage`. You can see the whole family on any
machine:

```
Get-Module -Name Az.* -ListAvailable |
    Select-Object Name, Version |
    Sort-Object Name
```

This matters for automation because a script's dependencies are really on specific sub-modules,
not just "Az" — a runbook that only touches VMs and resource groups technically only needs
`Az.Accounts`, `Az.Compute`, and `Az.Resources` imported, which is exactly how Azure Automation's
own module management works, as Lesson 8 will show.

## Signing in without a human in the loop

`Connect-AzAccount` by itself opens an interactive browser sign-in — fine at a console, useless
inside a script that runs unattended at 2 a.m. For that, Azure PowerShell authenticates as a
**service principal** (an application identity, not a user identity) using a client secret:

```
$secret = ConvertTo-SecureString $env:AZURE_CLIENT_SECRET -AsPlainText -Force
$cred   = New-Object System.Management.Automation.PSCredential($appId, $secret)

Connect-AzAccount -ServicePrincipal -Credential $cred -Tenant $tenantId
```

`$appId` is the service principal's application (client) ID, used as the credential's "username";
the secret is its password equivalent. Nothing here waits on a browser or a person clicking
"Allow" — which is the whole point of a script that's meant to run on a schedule rather than when
someone happens to be watching.

## Checking and switching context

Once signed in, `Get-AzContext` shows which subscription and identity a session is currently
using, and `Get-AzContext -ListAvailable` shows every context PowerShell remembers across sign-ins
on that machine. A script that needs to work across multiple subscriptions can save a context to
disk and reload it later instead of signing in again:

```
Save-AzContext -Path "C:\automation\azcontext.json"
Import-AzContext -Path "C:\automation\azcontext.json"
```

That's a real time-saver for local testing, though Lesson 8's Azure Automation runbooks use a
different, even simpler mechanism — a managed identity — that skips stored secrets entirely.

## Keeping `Az` current

Azure ships new features and occasional breaking changes constantly, and the `Az` module tracks
that pace with frequent releases. Three commands cover the whole maintenance cycle:

```
Get-InstalledModule -Name Az
Update-Module -Name Az
Get-Module -Name Az.Accounts -ListAvailable
```

`Get-InstalledModule` shows what's on the machine right now, `Update-Module` pulls the newest
version from the PowerShell Gallery, and checking a single sub-module's version afterward confirms
the update actually landed. An automation script written against a cmdlet parameter that changed
in a newer release is a real, documented failure mode — the Az module's own release notes call out
breaking changes release by release — so this isn't optional hygiene for anything running
unattended on a schedule.

## Key terms

| Term | Meaning |
|---|---|
| `Az` sub-modules | Service-specific pieces of the `Az` family, e.g. `Az.Compute`, `Az.Storage`, `Az.Network` |
| Service principal | An application identity used to sign a script in to Azure without a human present |
| `Save-AzContext` / `Import-AzContext` | Persist and reload a signed-in session's subscription/identity across runs |
| `Update-Module` | Pulls the latest version of an installed module from the PowerShell Gallery |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why does `Connect-AzAccount`
alone not work inside an unattended script, and what does a service principal provide instead?
