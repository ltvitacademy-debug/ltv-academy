# Lesson 8 — Scheduling PowerShell Scripts with Azure Automation

**Chapter 2 · PowerShell for Azure Automation · Lesson 8 of 32**

## What you'll learn

- Why a script that only runs when someone's laptop happens to be open isn't real automation
- What an Azure Automation account and a **runbook** actually are
- How to create one, import a script into it, and schedule it with real cmdlets
- Why a runbook authenticates with a managed identity instead of a stored password

## The problem this chapter has been building toward

Every lesson in this chapter has built one function at a time — checking VM power state, stopping
tagged VMs, wrapping that logic in `Get-StoppedVMs`. All of it still has the same weakness: it
only runs when a person opens a console and types the command, or when a Scheduled Task on some
VM fires it off. A laptop that's closed or asleep doesn't run anything. A VM running a Scheduled
Task has to stay on 24/7 just to execute a script that might take two minutes — which is directly
at odds with Chapter 6's cost-savings automation that shuts VMs down overnight. Azure Automation
solves this by running the script inside Azure itself, on a managed schedule, with no server of
your own required.

## Azure Automation accounts and runbooks

An **Automation account** is the Azure resource that holds everything Azure Automation manages —
runbooks, schedules, credentials, modules. A **runbook** is the actual script, imported into that
account; runbook types include PowerShell, PowerShell Workflow, and Python, matching the exact
same two languages this course teaches. Creating the account and importing a runbook both have
real cmdlets:

```
New-AzAutomationAccount -ResourceGroupName "rg-automation" -Name "aa-ops" -Location "eastus"

Import-AzAutomationRunbook `
    -AutomationAccountName "aa-ops" `
    -ResourceGroupName "rg-automation" `
    -Name "Stop-DevVMsNightly" `
    -Path ".\Stop-DevVMsNightly.ps1" `
    -Type PowerShell

Publish-AzAutomationRunbook -AutomationAccountName "aa-ops" -ResourceGroupName "rg-automation" -Name "Stop-DevVMsNightly"
```

A runbook has to be published before it can run on a schedule — `Import-AzAutomationRunbook`
uploads the draft, `Publish-AzAutomationRunbook` makes that draft the live version.

## A real runbook, built from this chapter's own logic

The runbook itself is just PowerShell — the same filter-and-loop pattern from Lesson 6, now
running inside Azure instead of on a console:

```
# Stop-DevVMsNightly.ps1 — the runbook's content
Connect-AzAccount -Identity

Get-AzVM | Where-Object { $_.Tags["Environment"] -eq "Dev" } | ForEach-Object {
    Stop-AzVM -ResourceGroupName $_.ResourceGroupName -Name $_.Name -Force -NoWait
}
```

`Connect-AzAccount -Identity` is the key difference from every earlier lesson: inside a runbook,
Azure Automation can sign in using the Automation account's own **system-assigned managed
identity** — an identity Azure manages for you, with no app ID, no client secret, and nothing for
a script to store or leak. That identity just needs the right Azure role (like Virtual Machine
Contributor) assigned to it, the same way any other identity would.

## Scheduling it

A **schedule** is a separate Azure Automation object, created once and then linked to whichever
runbook should run on it:

```
New-AzAutomationSchedule `
    -AutomationAccountName "aa-ops" -ResourceGroupName "rg-automation" `
    -Name "Nightly-8PM" -StartTime (Get-Date "20:00:00") -DayInterval 1

Register-AzAutomationScheduledRunbook `
    -AutomationAccountName "aa-ops" -ResourceGroupName "rg-automation" `
    -RunbookName "Stop-DevVMsNightly" -ScheduleName "Nightly-8PM"
```

`-DayInterval 1` means every day; `Register-AzAutomationScheduledRunbook` is the step that
actually attaches the schedule to the runbook. From that point on, the script runs inside Azure at
8 p.m. every night, whether anyone's laptop is open, whether anyone remembers, and without a VM
having to sit there running just in case.

## Key terms

| Term | Meaning |
|---|---|
| Automation account | The Azure resource that holds runbooks, schedules, and related settings |
| Runbook | A script (PowerShell or Python) imported into an Automation account to run there |
| Managed identity | An Azure-managed identity a runbook authenticates with — no stored secret |
| Schedule | An Automation object defining when a runbook runs, linked via `Register-AzAutomationScheduledRunbook` |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why does running a script as an
Azure Automation runbook solve a real problem that a Scheduled Task on a VM doesn't, and what does
`Connect-AzAccount -Identity` let a runbook skip entirely?
