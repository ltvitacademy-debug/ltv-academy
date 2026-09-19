# Lesson 3 — Cmdlets & Syntax

**Chapter 1 · PowerShell Basics · Lesson 3 of 18**

## What you'll learn

- Why every PowerShell command follows a strict `Verb-Noun` pattern, and why that's a deliberate design choice, not an accident
- How parameters like `-Name` and `-Path` let you tell a cmdlet exactly what to act on
- The difference between a positional parameter and a named parameter, and why named is almost always the safer choice
- How to read a line of PowerShell you've never seen before, just from its shape

## Verb-Noun: discoverability by design

Every PowerShell command is called a **cmdlet** (pronounced
"command-let"), and every cmdlet is named `Verb-Noun` —
`Get-ChildItem`, `Set-Location`, `Stop-Service`, `New-Item`. This
isn't a style preference someone picked; it's a deliberate design
choice. PowerShell maintains an approved list of verbs (`Get`, `Set`,
`New`, `Remove`, `Start`, `Stop`, `Restart`, and a few dozen more),
so once you know a handful of them, you can often **guess** the
cmdlet you need. Want to stop a service? It's almost certainly
`Stop-Service`. Want to remove an item? `Remove-Item`. That
predictability is the entire point — it's what makes PowerShell
learnable by pattern instead of by memorizing an arbitrary command
list, and it's what Lesson 4's `Get-Command -Verb Get` search relies
on entirely.

## Parameters: telling a cmdlet what to act on

A cmdlet by itself is rarely useful — `Get-ChildItem` alone lists the
current folder, but you usually want to point it somewhere specific.
**Parameters** do that, and they start with a dash:

```
Get-ChildItem -Path "C:\Logs" -Recurse
```

Here `-Path` tells `Get-ChildItem` which folder to look in, and
`-Recurse` (a **switch parameter** — no value needed, just present or
absent) tells it to include subfolders. Most cmdlets accept several
parameters, and you can usually see them by pressing Tab after typing
a dash in VS Code's integrated terminal or the console, which will
cycle through the valid parameter names for that cmdlet.

## Positional vs. named parameters

PowerShell lets you skip the parameter name for the first parameter
or two, if you supply the values in the order the cmdlet expects:

```
# Positional — relies on order
Get-ChildItem "C:\Logs"

# Named — explicit, order doesn't matter
Get-ChildItem -Path "C:\Logs"
```

Both lines do the same thing. Positional syntax is shorter and fine
for a quick console command, but **named parameters are the safer
choice** for anything you're going to save in a script: they're
self-documenting (anyone reading the script sees `-Path` right there),
and they don't silently break if you ever add another parameter
before it or reorder your arguments. From Chapter 3 onward, this
course writes scripts using named parameters almost everywhere.

## Reading a line you've never seen before

Put those two pieces together and most PowerShell lines become
readable on sight, even ones you've never seen. Take
`Restart-Service -Name "Spooler" -Force`: `Restart-Service` tells you
the verb (restart) and the noun (a service) even before you know
anything about print spoolers, `-Name` tells you which one, and
`-Force` (another switch) tells you it won't ask for confirmation
first. That's the real payoff of the Verb-Noun pattern and named
parameters together — you can often understand a script someone else
wrote without looking anything up, which is exactly the skill this
course is built around.

## Key terms

| Term | Meaning |
|---|---|
| Cmdlet | A PowerShell command, always named `Verb-Noun` |
| Parameter | An input to a cmdlet, written with a leading dash, e.g. `-Path` |
| Switch parameter | A parameter that takes no value — its presence alone turns on a behavior, e.g. `-Recurse` |
| Positional parameter | A parameter value supplied by position/order instead of by name |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
does naming parameters explicitly (`-Path "C:\Logs"`) make a saved
script safer than relying on positional order?
