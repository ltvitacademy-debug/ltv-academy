# Lesson 2 — Choosing the Right Tool: PowerShell, Python, or CLI

**Chapter 1 · Scripted Infrastructure: Why and How · Lesson 2 of 32**

## What you'll learn

- Why this course teaches three different tools instead of declaring one the winner
- When PowerShell is the right call — and why its Verb-Noun pattern and Az module support make it a
  natural fit for Windows-heavy, Azure-heavy shops
- When Python earns its extra setup cost — cross-platform work, complex logic, and libraries that go
  beyond what any cloud SDK offers
- When a plain CLI script in Bash is actually the better choice than either one

## There is no single right answer

New automation learners often ask "which one should I just learn and use for everything?" The
honest answer is that experienced administrators carry all three, because each one is genuinely
the best tool for a different kind of job. Treating this as a contest with one winner leads to
people writing a forty-line Python script for a task that was three lines of Bash, or forcing
PowerShell onto a Linux box where it's an awkward guest. The real skill isn't picking a favorite —
it's recognizing which tool fits the task in front of you.

## PowerShell: Windows-heavy, Azure-heavy shops

PowerShell is the natural choice when you're automating Windows Server, Active Directory, or
Azure resources, and especially when you're already working somewhere that's standardized on it.
Two things make it strong here specifically: the **Az module**, which gives nearly every Azure
operation a native, well-documented cmdlet (`New-AzResourceGroup`, `Get-AzVM`, `Set-AzStorageAccount`,
and hundreds more), and the same `Verb-Noun` pattern this course already covered in the PowerShell
Fundamentals course — so a script calling `New-AzVM -ResourceGroupName "rg-prod" -Name "web01"` reads
the same way `New-Item` or `Get-ChildItem` already did. If your environment is Windows and Azure
end to end, PowerShell usually needs the least translation between what you already know and what
a script does.

## Python: cross-platform, complex logic, and libraries beyond the cloud

Python earns its place when a task needs to run identically on Windows, Linux, and macOS, when the
logic is genuinely complex (branching decisions, retries, data transformations, calling multiple
unrelated APIs in one script), or when you need a library that has nothing to do with cloud
infrastructure at all — parsing a spreadsheet, hitting a REST API that isn't AWS or Azure, doing
math on the results before deciding what to provision next. Both major clouds ship full-featured
Python SDKs (the Azure SDK for Python, and Boto3 for AWS, both covered in Chapter 3), so Python
isn't a step down from PowerShell for cloud work — it's the better choice specifically once the
script needs to do more than call cloud APIs in a straight line.

## Raw CLI scripting in Bash: simple, quick, portable

Sometimes the job really is just "run these five CLI commands in order, with one piece of output
feeding the next command." For that, a short Bash script that calls `az` or `aws` directly is often
faster to write and easier for a teammate to read than either PowerShell or Python, because there's
no module to import and no SDK syntax to look up — just the same CLI commands you'd type by hand,
saved into a file. It's also the most portable option: a Bash script using the `az` or `aws` CLI
runs the same way on a Linux CI server, a Mac laptop, or WSL on Windows, with nothing extra
installed beyond the CLI itself. Chapter 4 builds real examples of exactly this kind of script.

## Key terms

| Term | Meaning |
|---|---|
| Az module | PowerShell's native module for Azure, giving nearly every Azure operation a dedicated cmdlet |
| Azure SDK for Python / Boto3 | Python's native libraries for calling Azure and AWS APIs, respectively |
| CLI scripting | Writing a shell script (e.g. Bash) that calls `az` or `aws` commands directly, in order |
| Cross-platform | Code that runs the same way on Windows, Linux, and macOS without changes |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: given a task that's "run six `az`
commands in order on a Linux build server," which of the three tools from this lesson is the best
fit, and why would the other two be more trouble than they're worth here?
