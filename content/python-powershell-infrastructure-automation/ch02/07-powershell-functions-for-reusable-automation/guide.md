# Lesson 7 — PowerShell Functions for Reusable Automation

**Chapter 2 · PowerShell for Azure Automation · Lesson 7 of 32**

## What you'll learn

- Why a loop you've copy-pasted into three different scripts is a maintenance problem waiting to happen
- The real syntax for a PowerShell function, including its `param()` block
- A real worked example: wrapping Lesson 6's VM-filtering loop in a reusable `Get-StoppedVMs` function
- Why a function also makes a piece of automation logic easier to test on its own

## The problem with copy-pasted loops

Lesson 6 ended with a loop that finds every VM tagged `Environment = Dev` and stops it. That logic
is genuinely useful — useful enough that it'll want to show up in more than one script: a nightly
shutdown script, a cost-report script, maybe an incident-response script that needs to check the
same thing. Copy-pasting the loop into each one works, right up until the tag name changes or a
bug is found — then it has to be fixed in every copy, and it's easy to miss one. A **function**
solves this by giving the logic one name and one home.

## Function syntax: `function`, a name, and a `param()` block

A PowerShell function looks like this:

```
function Get-StoppedVMs {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ResourceGroupName
    )

    Get-AzVM -ResourceGroupName $ResourceGroupName -Status |
        Where-Object { $_.PowerState -ne "VM running" }
}
```

`function Get-StoppedVMs { ... }` names it — following the same `Verb-Noun` convention real Az
cmdlets use, which makes a custom function read exactly like a built-in one to anyone calling it.
`param()` declares what it accepts: `[string]$ResourceGroupName` says the parameter must be a
string, and `[Parameter(Mandatory = $true)]` means PowerShell will prompt for it (or error in a
non-interactive script) if it's left out, rather than silently running with nothing. Once this is
loaded into a session or dot-sourced from a script file, calling it looks exactly like calling any
Az cmdlet:

```
Get-StoppedVMs -ResourceGroupName "rg-prod-web"
```

## Functions calling functions

A second function can build directly on the first, which is where reusability starts to compound:

```
function Start-AllStoppedVMs {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ResourceGroupName
    )

    Get-StoppedVMs -ResourceGroupName $ResourceGroupName | ForEach-Object {
        Start-AzVM -ResourceGroupName $_.ResourceGroupName -Name $_.Name
    }
}

Start-AllStoppedVMs -ResourceGroupName "rg-prod-web"
```

`Start-AllStoppedVMs` doesn't repeat `Get-StoppedVMs`'s filtering logic — it just calls it and
loops over whatever comes back. If the definition of "stopped" ever needs to change (adding
`"VM deallocated"` as a separate case, say), it changes in exactly one place, and every function
built on top of `Get-StoppedVMs` picks up the fix automatically.

## Why this also makes automation testable

A loop buried inside a 200-line script is hard to test in isolation — you'd have to run the whole
script to see if that one piece works. A function can be called on its own, with a specific
resource group, and its output checked against what you expected, independent of everything else
the larger automation does. That separation — one function, one clear job, callable by itself —
is exactly what later testing tools like Pester build on, and it's also what makes a script
readable to a teammate who only needs to understand `Get-StoppedVMs` by its name, not by reading
its internals.

## Key terms

| Term | Meaning |
|---|---|
| `function` | Declares a named, reusable block of PowerShell logic |
| `param()` | The block inside a function that declares its accepted parameters |
| `[Parameter(Mandatory = $true)]` | An attribute requiring a parameter to be supplied when the function is called |
| Dot-sourcing | Loading a function's definition from a `.ps1` file into the current session with `. .\file.ps1` |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what problem does wrapping a
loop in a function solve that copy-pasting the same loop into three scripts doesn't, and what does
`[Parameter(Mandatory = $true)]` actually enforce?
