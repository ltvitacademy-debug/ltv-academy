# Lesson 13 — Functions

**Chapter 3 · Scripts & Control Flow · Lesson 13 of 18 — Chapter Close**

## What you'll learn

- `function Verb-Noun { param(...) ... }` — writing your own cmdlet-shaped command
- Parameters with types and default values
- Why the `Verb-Noun` naming convention matters even for a function nobody else will ever see
- That Chapter 3 is done — what Chapter 4 adds next

## Your own cmdlet

Every cmdlet you've used since Lesson 3 — `Get-ChildItem`,
`Where-Object`, `Get-Process` — is `Verb-Noun` shaped. When you write
your own reusable piece of logic, you shape it the same way:

```powershell
function Test-DiskSpace {
    param(
        [string]$ComputerName = $env:COMPUTERNAME,
        [int]$ThresholdGB = 20
    )

    $drive = Get-PSDrive -Name C
    $freeGB = [math]::Round($drive.Free / 1GB, 2)

    if ($freeGB -lt $ThresholdGB) {
        Write-Host "$ComputerName: LOW ($freeGB GB free)"
    } else {
        Write-Host "$ComputerName: OK ($freeGB GB free)"
    }
}
```

Once defined (by running the script, or dot-sourcing it — loading it
into your current session), you call it exactly like a built-in
cmdlet:

```powershell
Test-DiskSpace
# DESKTOP-A1B2C3: OK (187.42 GB free)

Test-DiskSpace -ThresholdGB 200
# DESKTOP-A1B2C3: LOW (187.42 GB free)
```

## Parameters: types and defaults

`param(...)` is where a function declares what it accepts.
`[string]$ComputerName` and `[int]$ThresholdGB` are **typed**
parameters — PowerShell rejects a call that passes the wrong kind of
value, catching a mistake immediately instead of failing confusingly
three lines into the function body. `= $env:COMPUTERNAME` and `= 20`
are **default values** — if the caller doesn't supply that
parameter, the function uses the default instead of erroring. That's
why `Test-DiskSpace` with no arguments at all still worked above.

## Why Verb-Noun, even for yourself

It would work fine to name this function `CheckSpace` or
`diskCheck`. The reason not to: consistency compounds. Every cmdlet
you've called all course — `Get-Help`, `Where-Object`,
`Set-ExecutionPolicy` — taught you to guess at a command's name
before checking (`Get-` for reading something, `Set-` for changing
it, `Test-` for a true/false check). A function you write that
breaks that pattern is a small tax on every future reader, including
you in six months. `Test-DiskSpace` reads immediately as "returns
whether disk space passes some test" — `diskCheck` doesn't carry
that same instant meaning. The approved verb list is enforced by the
`Get-Verb` cmdlet if you want to check whether a verb you're
considering is a recognized one.

## Chapter 3 is done

That closes Chapter 3 — Scripts & Control Flow. You can now write a
`.ps1` file, handle execution policy, branch with `if`/`switch`,
repeat work with the right loop, and package logic into your own
`Verb-Noun` function. Chapter 4, **PowerShell for Azure & SQL**, is
next — where all of that stops being generic scripting and gets
pointed at the actual job: the `Az` module, connecting to Azure,
running T-SQL from PowerShell via dbatools, and a real automated
script tying everything together.

## Key terms

| Term | Meaning |
|---|---|
| `function Verb-Noun { }` | Defines your own cmdlet-shaped, reusable command |
| `param(...)` | Declares what a function accepts, with optional types and defaults |
| Typed parameter | `[int]$X` rejects the wrong kind of value at call time |
| Default value | `$X = 20` — used automatically when the caller doesn't supply that parameter |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking:
why does naming your own function `Test-DiskSpace` instead of
`diskCheck` matter, given that nobody but you may ever call it?
