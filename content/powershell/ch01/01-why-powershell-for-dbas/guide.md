# Lesson 1 — What Is PowerShell & Why for DBAs and Admins?

**Chapter 1 · PowerShell Basics · Lesson 1 of 18**

## What you'll learn

- What this course actually aims to make you: someone who can read, modify, and run a script — not a PowerShell developer
- Why Azure Database Administrator Lesson 66 could only give you an overview, and what this course adds
- The one property that makes PowerShell different from every other shell you might have used
- What the next 17 lessons cover, in order

## Not a developer course, on purpose

This course's goal is stated plainly, and it matters: by the end,
you should be able to **read an existing PowerShell script, understand
what it does, modify it safely, and run it** — not write a 500-line
module from scratch. Azure Database Administrator Lesson 66 already
introduced PowerShell and the Azure CLI at the level a DBA needed
in the moment; this course is the actual depth behind that overview,
still aimed at the same real job: a DBA who can automate a routine
task and troubleshoot a script that already exists, not a software
engineer.

## The one thing that makes PowerShell different

If you've used `bash` or `cmd.exe`, the biggest adjustment is this:
**PowerShell's pipeline passes real objects between commands, not
plain text.**

```
Traditional shell:              PowerShell:
ls -l | grep "Jan"               Get-ChildItem | Where-Object {
  -- text piped to text,              $_.LastWriteTime.Month -eq 1
     parsed by pattern-matching   }
                                  -- a real .NET object piped to the
                                     next command, with real properties
```

That distinction is the entire reason Lesson 6's pipeline and Lesson
7's "objects vs. text" get their own dedicated lessons — it's not a
minor syntax quirk, it's the thing that makes PowerShell scripts more
reliable than an equivalent shell script that's silently depending on
a specific text format never changing.

## Why this matters specifically for a DBA

A DBA doesn't script for fun — real, common jobs this course builds
toward: checking a fleet of servers for a specific configuration
drift, automating a routine maintenance task across many databases
(tying back to Azure DBA Lesson 63's automation content but from the
PowerShell side instead of SQL Server Agent), and connecting to Azure
resources without clicking through the Portal every time (Chapter
4's whole focus).

## What's ahead

```
Ch1  PowerShell Basics             cmdlets, syntax, help, variables
Ch2  Objects & Pipelines           the real distinction from other shells
Ch3  Scripts & Control Flow        .ps1 files, if/else, loops, functions
Ch4  PowerShell for Azure & SQL    the Az module, dbatools, a real script
```

Chapter 4 is where this stops being generic PowerShell and becomes
specifically useful to the work this catalog's other courses assume
— connecting to Azure, running T-SQL from a script via dbatools, and
the genuinely practical skill of reading and safely modifying a
script someone else already wrote.

## Key terms

| Term | Meaning |
|---|---|
| Object pipeline | PowerShell passes real objects between commands, not plain text |
| Cmdlet | A PowerShell command, always named `Verb-Noun` (e.g. `Get-ChildItem`) |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: why
does piping real objects instead of text make a PowerShell script
more reliable than an equivalent `bash` script parsing command
output?
