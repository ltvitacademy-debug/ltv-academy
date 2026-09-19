# Lesson 9 — Sorting & Filtering

**Chapter 2 · Working With Objects & Pipelines · Lesson 9 of 18**

## What you'll learn

- `Sort-Object` — ordering objects by one property, or by several in priority order
- How `Sort-Object` combines with `Where-Object` and `Select-Object` into one real, practical pipeline
- A complete worked example: the 5 SQL Server processes using the most memory, sorted descending
- What Chapter 2 covered and what Chapter 3 does with it next

## Sort-Object: ordering by one or more properties

`Sort-Object` reorders whatever reaches it, by whichever property (or
properties) you name:

```
Get-Process | Sort-Object CPU

Get-Process | Sort-Object CPU -Descending
```

Ascending is the default; `-Descending` reverses it. You can sort by
more than one property, and order matters — PowerShell sorts by the
first property first, then uses the second property only to break
ties within each group of the first:

```
Get-Process | Sort-Object -Property StartTime, CPU -Descending
```

Like `Where-Object` and `Select-Object`, `Sort-Object` doesn't remove
anything or change property values — it just reorders the same
objects.

## One real pipeline: the practical task

Chapter 2's four cmdlets — the pipeline itself, real objects instead
of text, `Where-Object`/`Select-Object`/`ForEach-Object`, and now
`Sort-Object` — combine into pipelines that answer real
questions a DBA actually has. Here's one: **the 5 SQL Server
processes using the most memory, sorted highest first**:

```
Get-Process -Name "sqlservr" |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 5 Name, Id, @{Name="MemoryMB";Expression={[math]::Round($_.WorkingSet/1MB,1)}}
```

Read it stage by stage, the same way Lesson 6 taught: get every
`sqlservr` process, sort by working-set memory highest first, then
keep only the top 5 and shape the output down to a name, process ID,
and a calculated memory-in-megabytes column. Every stage still works
with real objects the whole way through — nothing gets parsed as
text until the moment this prints to your screen.

## Filtering and sorting together

Add a `Where-Object` stage and the same pipeline answers a narrower
question — **only the `sqlservr` processes over a memory threshold**,
sorted:

```
Get-Process -Name "sqlservr" |
    Where-Object {$_.WorkingSet -gt 500MB} |
    Sort-Object WorkingSet -Descending |
    Select-Object Name, Id, WorkingSet
```

Filter, then sort, then shape — three of Chapter 2's ideas in one
line that a DBA might genuinely run during a memory-pressure
investigation.

## Chapter 2 complete

That closes out **Working With Objects & Pipelines**: the pipe
operator passing real objects, proving objects survive display
formatting, the three cmdlets that filter, shape, and act, and now
sorting — everything needed to read data out of a live system and
shape it into an answer. Chapter 3, **Scripts & Control Flow**, is
next: saving what you've been typing interactively into a real
`.ps1` file, and adding `if`/`else`, loops, and functions so a script
can make decisions instead of running the same fixed pipeline every
time.

## Key terms

| Term | Meaning |
|---|---|
| `Sort-Object` | Reorders objects by one or more named properties; `-Descending` reverses the default ascending order |
| Calculated property | A custom column built with `@{Name=...; Expression={...}}` inside `Select-Object` |
| Multi-property sort | Sorting by a first property, with a second property breaking ties within it |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking:
in a pipeline that filters, sorts, and selects, why does the order
you chain those three stages in actually matter for what the final
output looks like?
