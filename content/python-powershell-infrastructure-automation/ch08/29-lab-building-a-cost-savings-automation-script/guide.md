# Lesson 29 — Lab: Building a Cost-Savings Automation Script

**Chapter 8 · Capstone: An Automated Operations Toolkit · Lesson 29 of 32**

## What you'll learn

- How to combine idempotency and real error handling (Chapter 1) into one script that's safe to run unattended, every night, without anyone watching it
- How tag-based targeting keeps a start/stop script from ever touching a VM it shouldn't
- Why checking a VM's current power state before acting — not just firing the command and hoping — is what actually makes a script safe to rerun
- How this script would be scheduled in production using the Azure Automation approach from Chapter 2, instead of someone remembering to run it by hand

## The scenario: Thornfield Analytics' dev/test bill

Thornfield Analytics keeps a resource group, `rg-devtest`, full of virtual machines that
engineers use for testing during the day and never touch overnight or on weekends. Finance
noticed the obvious problem: every one of those VMs is billed around the clock, whether anyone
is using it or not. The fix Chapter 6 taught — automating VM start/stop schedules for cost
savings — is exactly what this lab builds, but this time with the full toolkit from Chapters
1 through 3 behind it, not just the happy-path version.

The script needs to do three things well: only touch VMs that are supposed to be on this
schedule, never fail outright just because one VM in the list has a problem, and never error
out or do something destructive if it runs twice in a row by accident.

## Step one: targeting only the right VMs

Not every VM in the subscription belongs on this schedule — a handful of long-running
reference environments shouldn't ever be auto-stopped. Rather than hardcoding a list of VM
names (which goes stale the moment someone provisions a new one), the script filters on a tag,
the same tagging discipline Chapter 6's compliance work depends on:

```powershell
$vms = Get-AzVM -ResourceGroupName "rg-devtest" | Where-Object {
    $_.Tags["AutoShutdown"] -eq "true"
}
```

Any VM tagged `AutoShutdown = true` is in scope. Anything else — including that handful of
reference VMs — is invisible to this script by design, not by exception-list maintenance.

## Step two: the idempotency check that makes this safe to rerun

Chapter 1's idempotency lesson made one point that matters enormously here: a script that's
safe to rerun checks the current state before it acts, instead of assuming it knows the state
already. If this script just called `Stop-AzVM` on every tagged VM every time it ran, running
it twice in the same hour — which a flaky scheduler or a manual re-trigger will eventually do —
would be harmless for an already-stopped VM, but it would also mean the script never actually
knows whether it did anything. Worse, the mirror-image "start" run has a real failure mode: calling `Start-AzVM`
on a VM that's already running is harmless, but skipping the check entirely means the script
can't tell you what it changed versus what was already in the state it wanted.

```powershell
$status = Get-AzVM -ResourceGroupName "rg-devtest" -Name $vm.Name -Status
$state  = ($status.Statuses | Where-Object Code -like "PowerState/*").DisplayStatus

if ($state -eq "VM running") {
    Write-Output "Stopping $($vm.Name)..."
    Stop-AzVM -ResourceGroupName "rg-devtest" -Name $vm.Name -Force -ErrorAction Stop
}
else {
    Write-Output "$($vm.Name) is already '$state' — nothing to do."
}
```

That `else` branch is the whole point. The script reads the actual, current power state first,
and only acts when the current state doesn't match the desired one. Run it ten times in a row
and nine of those runs do nothing at all — which is exactly correct, not a bug.

## Step three: error handling that keeps the loop alive

Chapter 1's other lesson — error handling — matters here because this script manages a list,
not a single VM. If VM number 7 out of 40 has a transient API error or got deleted out from
under the script, a script without error handling stops dead, and VMs 8 through 40 never get
evaluated at all. Wrapping the per-VM logic in `try`/`catch` with a `continue` keeps one bad VM
from taking down the whole run:

```powershell
foreach ($vm in $vms) {
    try {
        $status = Get-AzVM -ResourceGroupName "rg-devtest" -Name $vm.Name -Status
        $state  = ($status.Statuses | Where-Object Code -like "PowerState/*").DisplayStatus

        if ($state -eq "VM running") {
            Stop-AzVM -ResourceGroupName "rg-devtest" -Name $vm.Name -Force -ErrorAction Stop
        }
    }
    catch {
        Write-Warning "Failed to stop $($vm.Name): $($_.Exception.Message)"
        continue
    }
}
```

`-ErrorAction Stop` forces `Stop-AzVM` to throw a catchable exception instead of just writing a
non-terminating error to the console, so the `catch` block actually runs. The `Write-Warning`
line means Thornfield's team finds out which VM failed and why, instead of discovering it three
days later when someone's environment is still running and nobody knows why.

## Why PowerShell here, and how it gets scheduled

Chapter 1's tool-choice lesson applies directly: this is an Azure-native operational task
against Azure VMs, which is squarely PowerShell's Az module territory, the same reasoning that
applies to the Python version of this same logic using the Azure SDK's `compute_client`
(`begin_power_off()` / `begin_start()`) if Thornfield's team preferred Python instead — the
idempotency check and the try/except-with-continue pattern translate directly. Either way, this
script doesn't belong running from someone's laptop at 7 PM. Chapter 2's Azure Automation
lesson is what actually puts it into production: the script becomes a Runbook, and a schedule
resource in Azure Automation triggers it at 7 PM and 7 AM, Monday through Friday, with no human
in the loop at all.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | Safe to run more than once — checks current state and only acts when a change is actually needed |
| Tag-based targeting | Selecting which resources a script acts on by filtering a tag, instead of a hardcoded list |
| `-ErrorAction Stop` | Forces a cmdlet to throw a catchable exception so a `try`/`catch` block can actually respond to it |
| Azure Automation Runbook | A PowerShell or Python script hosted and scheduled by Azure Automation, instead of run manually |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why does checking the VM's
current power state before calling `Stop-AzVM` or `Start-AzVM` matter more than just calling the
right cmdlet — and what would go wrong, specifically, if this script skipped that check and ran
twice in the same hour?
