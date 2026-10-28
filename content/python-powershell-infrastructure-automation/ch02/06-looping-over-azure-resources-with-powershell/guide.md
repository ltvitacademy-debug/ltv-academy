# Lesson 6 — Looping Over Azure Resources with PowerShell

**Chapter 2 · PowerShell for Azure Automation · Lesson 6 of 32**

## What you'll learn

- Why checking or changing "all the VMs in a subscription" means looping, not typing one command per VM
- The difference between a `foreach` statement and the `ForEach-Object` pipeline cmdlet
- A real worked example that reports the power state of every VM in a subscription
- A real worked example that stops every VM carrying a specific tag

## One command, one VM — that doesn't scale

`Get-AzVM`, `Stop-AzVM`, and the rest of the Az cmdlets from Lesson 5 each act on one resource at a
time by default. That's fine for a single VM typed at a console, but it breaks down fast once a
subscription has fifteen VMs and you need to know which ones are running, or stop all of them
before a maintenance window. The fix isn't fifteen separate commands — it's a loop that runs the
same logic once per resource, automatically.

## `foreach`: looping a collection already in memory

`Get-AzVM` with no arguments returns every VM in the current subscription as a collection. A
`foreach` statement walks that collection one item at a time:

```
$vms = Get-AzVM

foreach ($vm in $vms) {
    Write-Host "$($vm.Name) is in resource group $($vm.ResourceGroupName)"
}
```

`$vm` is just a loop variable — each pass through the loop, it holds the next VM object from
`$vms`, with the same `.Name`, `.ResourceGroupName`, and other properties any single `Get-AzVM`
result has.

## `ForEach-Object`: looping in the pipeline

PowerShell's pipeline gives you a second way to do the same thing, piping `Get-AzVM`'s output
straight into `ForEach-Object` without storing it in a variable first:

```
Get-AzVM | ForEach-Object {
    Write-Host "$($_.Name) is in resource group $($_.ResourceGroupName)"
}
```

Inside the `{ }` block, `$_` represents the current pipeline object, the same role `$vm` played
above. The two forms do the same thing here; `foreach` is usually a hair faster because it loops
an already-built collection in memory, while `ForEach-Object` streams objects through the pipeline
one at a time as they arrive — a real difference on a very large collection, but not one that
matters for a subscription's VM list.

## Worked example: a power-state report for every VM

`Get-AzVM -Status` adds a `PowerState` property (`"VM running"`, `"VM stopped"`,
`"VM deallocated"`) to each VM object it returns. Looping over the result turns that into a real
report:

```
Get-AzVM -Status | ForEach-Object {
    [PSCustomObject]@{
        Name          = $_.Name
        ResourceGroup = $_.ResourceGroupName
        PowerState    = $_.PowerState
    }
} | Format-Table -AutoSize
```

Wrapping each result in `[PSCustomObject]@{ }` builds a clean, custom object per VM instead of
printing the full raw `Get-AzVM` object — exactly the pattern a scheduled script would use to
generate a readable report.

## Worked example: acting on a filtered subset

Looping gets more useful once it's combined with filtering. This stops every VM tagged
`Environment = Dev`, the exact pattern Chapter 6's cost-savings automation lesson builds on later
in this course:

```
Get-AzVM | Where-Object { $_.Tags["Environment"] -eq "Dev" } | ForEach-Object {
    Stop-AzVM -ResourceGroupName $_.ResourceGroupName -Name $_.Name -Force -NoWait
}
```

`Where-Object` filters the collection down to just the tagged dev VMs before the loop ever runs;
`-Force` skips the confirmation prompt `Stop-AzVM` would otherwise show for each one; `-NoWait`
submits all the stop requests without waiting for each one to finish before starting the next.

## Key terms

| Term | Meaning |
|---|---|
| `foreach` | A statement that loops over a collection already stored in a variable |
| `ForEach-Object` | A pipeline cmdlet that loops over objects as they arrive from another command |
| `$_` | The current object inside a `ForEach-Object` (or `Where-Object`) pipeline block |
| `PowerState` | A property `Get-AzVM -Status` adds, reporting whether a VM is running, stopped, or deallocated |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what does `Get-AzVM -Status`
add to each VM object, and how does piping `Get-AzVM` into `Where-Object` before `ForEach-Object`
change which VMs the loop acts on?
