# Lesson 10 — Writing a .ps1 Script

**Chapter 3 · Scripts & Control Flow · Lesson 10 of 18**

## What you'll learn

- What a `.ps1` file actually is — nothing more than saved PowerShell commands
- Execution policy: why Windows blocks scripts by default, and the one command that fixes it
- Why you have to type `.\script.ps1` instead of just `script.ps1`
- The two most common first-run errors, and what each one means

## A .ps1 file is just saved commands

There's no special magic to a PowerShell script. A `.ps1` file is a
plain text file containing the exact same commands you'd type at the
console, one after another, run in order when the file executes.
Everything you learned in Chapters 1 and 2 — cmdlets, the pipeline,
variables, `Where-Object` — works identically whether you type it
live or save it in a file:

```powershell
# check-disk-space.ps1
$drive = Get-PSDrive -Name C
$freeGB = [math]::Round($drive.Free / 1GB, 2)
Write-Host "Drive C: has $freeGB GB free"
```

Save that in any text editor (VS Code, from Lesson 2, is the real
tool for this) with a `.ps1` extension, and it's a script.

## Execution policy: a real first-run gotcha

The first time you try to run a script on a Windows machine, you'll
likely hit this:

```
.\check-disk-space.ps1 : File check-disk-space.ps1 cannot be loaded
because running scripts is disabled on this system.
```

This isn't a bug — it's PowerShell's **execution policy**, a safety
setting that blocks scripts from running by default so a malicious
`.ps1` file can't silently execute just by being double-clicked.
Check the current policy:

```powershell
Get-ExecutionPolicy
# Restricted
```

The real, common fix — the one you'll actually use on a workstation
you control — is:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

`RemoteSigned` means: scripts you write locally run freely, but
anything downloaded from the internet needs a trusted digital
signature first. That's the practical middle ground almost every DBA
and admin actually runs with — locked all the way to `Restricted`
is unworkable, and `Unrestricted` gives up the protection entirely.
`-Scope CurrentUser` changes the policy for your account only, which
usually doesn't require administrator rights.

## Running the script

Once the policy allows it, run the script by its path, not just its
name:

```powershell
.\check-disk-space.ps1
```

That leading `.\` is required, and it trips up almost everyone
coming from `cmd.exe`. Unlike a traditional shell, PowerShell doesn't
search the current directory for executables by default — that's a
deliberate security choice, so a malicious file named the same as a
real command can't get run by accident. Forgetting the `.\` gives you:

```
check-disk-space.ps1 : The term 'check-disk-space.ps1' is not
recognized as the name of a cmdlet, function, script file...
```

The fix is always the same: add `.\` (or use the full path) so
PowerShell knows you mean a file in the current folder.

## Key terms

| Term | Meaning |
|---|---|
| `.ps1` file | A plain text file of PowerShell commands, run in order |
| Execution policy | A safety setting controlling which scripts are allowed to run |
| `RemoteSigned` | The common real-world policy: local scripts run freely, downloaded ones need a signature |
| `.\` prefix | Required to run a script from the current directory — it isn't searched by default |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking:
what does `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
actually change, and why does typing just `script.ps1` (without the
`.\`) fail even when the file is right there in your current folder?
