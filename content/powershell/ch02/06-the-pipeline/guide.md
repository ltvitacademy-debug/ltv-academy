# Lesson 6 — The Pipeline

**Chapter 2 · Working With Objects & Pipelines · Lesson 6 of 18**

## What you'll learn

- How the pipe operator `|` chains commands together, passing the previous command's full output forward
- Why "full output" means something different in PowerShell than it does in `bash` — this is Lesson 1's big claim, made concrete
- What `$_` means and how to use it inside a pipeline block
- How to read a multi-stage pipeline left to right without getting lost

## The pipe operator: output becomes input

You've already used `|` without much explanation back in Lesson 1's
comparison. Now it gets its own lesson because it's the mechanism
that makes everything in this chapter work. `|` takes whatever the
command on its left produced and hands it to the command on its
right, as input:

```
Get-Process | Sort-Object CPU
```

`Get-Process` lists every running process; `Sort-Object CPU` sorts
whatever it receives by the `CPU` property. Nothing gets printed to
the screen in between — the object list flows directly from the
first command into the second.

## What actually flows through the pipe

Here's the part Lesson 1 promised and this lesson delivers: what
flows through `|` is not the *text* you'd see if you ran
`Get-Process` alone. It's the real, full **object** — every property
`Get-Process` knows about, whether or not that property happened to
be visible in the console's default columns. That's why
`Sort-Object CPU` works at all: `CPU` is a real property on the
object being piped, not a column of text that `Sort-Object` has to
parse and reinterpret. You can chain several stages, and each one
still receives full objects, not the previous stage's screen output:

```
Get-Process | Where-Object {$_.CPU -gt 100} | Sort-Object CPU -Descending
```

Three stages: get every process, keep only the ones using more than
100 CPU seconds, then sort what's left, highest CPU first. Each `|`
hands the full object set forward — filtering doesn't strip
properties, it just narrows which objects continue.

## `$_`: the current object inside the pipeline

Inside a script block passed to a cmdlet like `Where-Object` or
`ForEach-Object`, `$_` refers to **the current object flowing through
the pipeline at that point** — one at a time, for every object in
turn. In `{$_.CPU -gt 100}` above, `$_` is each process object in
turn, and `.CPU` reads that process's `CPU` property. You'll see
`$_` constantly from here forward; it's the single most common
variable name in PowerShell scripts that use the pipeline, precisely
because the pipeline is used constantly.

## Reading a pipeline left to right

The habit worth building now: read a pipeline one stage at a time,
left to right, and ask what each stage receives and what it hands
forward.

```
Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object Name
```

Stage one: every service on the machine. Stage two: keep only the
ones whose `Status` property equals `"Running"`. Stage three: from
what's left, keep only the `Name` property. Read that way, even a
long pipeline stops looking like a wall of syntax and starts looking
like a sequence of plain, ordinary filters — which is exactly what
it is.

## Key terms

| Term | Meaning |
|---|---|
| Pipe operator `\|` | Passes the previous command's full object output to the next command as input |
| `$_` | Inside a pipeline script block, refers to the current object being processed |
| Pipeline stage | One command in a chain of commands connected by `\|` |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: in
`Get-Process | Where-Object {$_.CPU -gt 100}`, what exactly does
`$_` refer to, and why does `.CPU` work on it reliably?
