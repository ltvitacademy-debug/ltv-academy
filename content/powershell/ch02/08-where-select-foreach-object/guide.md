# Lesson 8 — Where-Object, Select-Object & ForEach-Object

**Chapter 2 · Working With Objects & Pipelines · Lesson 8 of 18**

## What you'll learn

- `Where-Object` — keeps or drops whole objects based on a condition
- `Select-Object` — chooses which properties (or how many rows) survive, without touching who survives
- `ForEach-Object` — runs an action against every object that reaches it
- Why beginners mix these three up, and the one question that tells them apart

## Three different jobs, often confused

These three cmdlets show up in almost every real pipeline, and
they're commonly confused because they all take a script block in
curly braces and all use `$_`. But they each do a genuinely different
job, and keeping that straight matters:

```
Where-Object   -> filters WHICH objects continue (a yes/no per object)
Select-Object  -> chooses WHICH PROPERTIES survive (or how many rows)
ForEach-Object -> runs an ACTION against each object that arrives
```

## Where-Object: filtering by condition

`Where-Object` decides, one object at a time, whether that object
continues down the pipeline. It doesn't change the object at all —
it either lets it through or drops it:

```
Get-Process | Where-Object {$_.CPU -gt 100}
```

Every process object with `CPU` greater than 100 passes through,
completely unchanged. Everything else is filtered out entirely — it
never reaches whatever comes next.

## Select-Object: choosing properties, or limiting rows

`Select-Object` doesn't ask yes/no about each object — it either
narrows which properties an object carries forward, or limits how
many objects pass through, regardless of what condition they meet:

```
Get-Process | Select-Object Name, CPU, Id

Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
```

The first line keeps every process but strips every property down to
just `Name`, `CPU`, and `Id`. The second keeps every property but
only lets the first five objects (after sorting) through. Neither one
is asking "does this object qualify?" — that's `Where-Object`'s job.

## ForEach-Object: taking an action per item

`ForEach-Object` doesn't filter and doesn't reshape — it **runs code
against every object that reaches it**, one at a time, often for a
side effect rather than to produce new pipeline output:

```
Get-Service -Name "wuauserv", "Spooler" | ForEach-Object {
    Write-Host "Checking $($_.Name): $($_.Status)"
}
```

Here nothing is being filtered or trimmed — every service that comes
in gets a line written to the screen. `ForEach-Object` is what you
reach for when the goal is "do something to each item," not "narrow
the list."

## The one question that tells them apart

When you're not sure which of the three you need, ask: **am I
deciding which objects survive (Where-Object), deciding what those
objects look like once they survive (Select-Object), or doing
something to each one (ForEach-Object)?** Real pipelines often use
all three together, each doing its own job:

```
Get-Process |
    Where-Object {$_.CPU -gt 100} |
    Select-Object Name, CPU |
    ForEach-Object { Write-Host "$($_.Name): $($_.CPU) sec" }
```

Filter first, then shape, then act — read left to right and each
stage's job is unambiguous.

## Key terms

| Term | Meaning |
|---|---|
| `Where-Object` | Filters which whole objects continue, based on a condition |
| `Select-Object` | Chooses which properties survive, or limits row count (`-First`/`-Last`) |
| `ForEach-Object` | Runs an action against every object that arrives |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: in a
pipeline that needs to keep only stopped services, show just their
names, and print each one — which cmdlet handles each of those three
jobs, and in what order would you chain them?
