# Lesson 21 — Automating VM Start/Stop Schedules for Cost Savings

**Chapter 6 · Automating Operational Tasks · Lesson 21 of 32**

## What you'll learn

- Why a dev/test VM running 24/7 is almost always paying for hours nobody uses
- How to tag VMs for a stop/start schedule and act on that tag with the Az PowerShell module
- How to wire a stop script and a start script into Azure Automation so they run on their own, every day
- The real percentage cost reduction of a 10-hour weekday schedule versus running around the clock

## The hours nobody's using

A dev or test VM exists so engineers can build and test against it during the workday. Nobody is
using it at 2 AM, and nobody is using it on Saturday. Yet by default, once a VM is started it keeps
running — and keeps billing for compute — until someone stops it. That gap between "hours it runs"
and "hours anyone actually needs it" is pure waste, and it's exactly the kind of spend Chapter 5's
cost analysis view (Lesson 28 of the Azure Administration course) would surface if you grouped spend
by resource group and noticed compute cost that never dips on weekends.

Do the arithmetic once and the waste is hard to ignore. A week has 168 hours. A typical business
week — 8 AM to 6 PM, Monday through Friday — is 50 hours. Running only those 50 hours instead of all
168 is a **70% reduction in VM runtime**, which on a VM billed by the hour is roughly a 70% cut to
that VM's compute cost. Scale that across a resource group with thirty dev/test VMs and the monthly
bill drops by a comparable amount, with zero change to what the VMs can do during business hours.

## Tagging VMs for the schedule

The schedule only needs to touch VMs that are supposed to follow it — production VMs that serve
real traffic around the clock must be left alone. A tag makes that selection explicit and
auditable, the same tagging discipline from Chapter 1 and Lesson 22's compliance checks:

```
Update-AzTag -ResourceId $vm.Id -Tag @{ AutoShutdown = "true" } -Operation Merge
```

Every VM meant to stop overnight gets `AutoShutdown = true`. Anything without that tag — production
VMs, always-on domain controllers — is invisible to the schedule scripts below, by design.

## The stop script

This script runs every weekday evening. It finds every VM tagged for auto-shutdown and stops it —
critically, using `-Force` so it doesn't wait on a confirmation prompt that nobody is there to
answer at 6 PM:

```
# stop-tagged-vms.ps1 — run weekday evenings
$vms = Get-AzResource -TagName "AutoShutdown" -TagValue "true" `
    -ResourceType "Microsoft.Compute/virtualMachines"

foreach ($vm in $vms) {
    Write-Output "Stopping $($vm.Name)..."
    Stop-AzVM -ResourceGroupName $vm.ResourceGroupName `
        -Name $vm.Name -Force
}
```

`Stop-AzVM` **deallocates** the VM rather than just shutting down its OS — that distinction matters
because deallocation releases the compute hardware and stops the per-hour compute charge. A VM
that's merely shut down inside the guest OS but not deallocated keeps billing.

## The start script

The matching script runs every weekday morning and starts the same VMs back up, so the team has a
running environment waiting for them when the workday begins:

```
# start-tagged-vms.ps1 — run weekday mornings
$vms = Get-AzResource -TagName "AutoShutdown" -TagValue "true" `
    -ResourceType "Microsoft.Compute/virtualMachines"

foreach ($vm in $vms) {
    Write-Output "Starting $($vm.Name)..."
    Start-AzVM -ResourceGroupName $vm.ResourceGroupName -Name $vm.Name
}
```

## Scheduling both scripts with Azure Automation

Neither script is useful if someone has to remember to run it by hand — that defeats the entire
point of Lesson 8's scheduling lesson. Both scripts are published as **runbooks** in an Azure
Automation account, each with its own **schedule asset**: the stop runbook attached to a schedule
that fires at 6:00 PM every weekday, the start runbook attached to one that fires at 8:00 AM every
weekday. Once both schedules are created, the VMs stop and start themselves indefinitely, with no
one logging in to click anything.

## Key terms

| Term | Meaning |
|---|---|
| Deallocate | Releasing a VM's compute hardware so hourly compute billing stops, as opposed to just shutting down its OS |
| AutoShutdown tag | A tag used to mark which VMs should follow the stop/start schedule, leaving untagged VMs alone |
| Runbook | A script published inside Azure Automation so it can run on a schedule without a person triggering it |
| Schedule asset | The Azure Automation object that defines when a runbook fires, e.g. 6:00 PM every weekday |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why does `Stop-AzVM` need to
deallocate the VM rather than just shut down its operating system for the cost savings to actually
happen, and roughly what percentage of compute cost does a 50-hour weekly schedule save compared to
running 168 hours a week?
