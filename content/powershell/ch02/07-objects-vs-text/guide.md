# Lesson 7 — Objects vs. Text

**Chapter 2 · Working With Objects & Pipelines · Lesson 7 of 18**

## What you'll learn

- Why what you *see* printed in the console is not the same thing as what actually flows through the pipeline
- A real example where `Format-Table` output looks exactly like plain text — but isn't, until you ask for it to be
- Why parsing that printed text (a common habit carried over from `bash`) breaks the moment formatting changes, and why reading properties directly doesn't
- The real rule: format for display last, work with objects everywhere else

## What you see vs. what's actually there

Run this:

```
Get-Process | Select-Object -First 3
```

The console prints something that looks exactly like a plain text
table — columns, headers, aligned whitespace. It's tempting to treat
that as the output. It isn't. PowerShell is auto-formatting real
`System.Diagnostics.Process` objects for your eyes, on the fly,
because printing raw object dumps to a console would be unreadable.
Prove it with the tool from Lesson 5:

```
Get-Process | Get-Member
```

```
   TypeName: System.Diagnostics.Process

Name             MemberType Definition
----             ---------- ----------
Handles          Property   int Handles {get;}
CPU              Property   double CPU {get;}
Id               Property   int Id {get;}
ProcessName      Property   string ProcessName {get;}
```

Every one of those is a real, queryable property on a real object —
`CPU`, `Id`, `ProcessName`, dozens more — whether or not they showed
up as a column in the console.

## Format-Table: display-only, and it says so

Now do this on purpose:

```
Get-Process | Format-Table Name, CPU -AutoSize
```

This *also* prints what looks like a plain text table — visually,
barely different from the unformatted output above. But something
real changed: `Format-Table` converts the pipeline into formatting
instruction objects meant for the console to render, not the original
`Process` objects anymore. That's why Microsoft's own guidance is
that a `Format-*` cmdlet should be the **last** thing in a pipeline —
pipe its output into `Select-Object` or `Where-Object` expecting the
original properties, and you won't get them; you'll get formatting
data instead.

## The bash-habit mistake

If you're used to `bash`, the instinct when you need one column out
of console output is to parse the printed text — grep it, `awk` it,
split it on whitespace. Try that here and it breaks in a specific,
predictable way: `Format-Table -AutoSize` sizes each column to fit
the *widest value currently in that batch of results*. Add one
process with a longer name tomorrow, and every column shift width.
Text parsed by counting characters or splitting on spaces silently
misreads a script that worked yesterday — and it fails quietly,
producing wrong data instead of an error you'd notice.

```
# Fragile — depends on formatted column widths never changing
Get-Process | Format-Table Name, CPU -AutoSize | Out-String

# Reliable — reads the real property, immune to display formatting
Get-Process | Select-Object Name, CPU
```

`Select-Object Name, CPU` above still returns real objects with just
those two properties kept — not formatted text. You can sort it,
filter it, or pipe it into another cmdlet, and every value is exactly
where PowerShell says it is, regardless of how wide any name happens
to be.

## The real rule

Work with objects through every stage of a pipeline —
`Where-Object`, `Sort-Object`, `Select-Object` — and only reach for a
`Format-*` cmdlet at the very end, right before something is meant to
be read by a human on screen or written to a text file. That single
habit is what keeps a PowerShell script reliable in a way an
equivalent `bash` script parsing command output often isn't, exactly
as Lesson 1 claimed at the start of this course.

## Key terms

| Term | Meaning |
|---|---|
| Auto-formatting | PowerShell formats objects for console display automatically, without changing what flows through the pipeline — until you explicitly format |
| `Format-Table` / `Format-List` | Converts objects into display-only formatting data; should be the last thing in a pipeline |
| Text parsing | Reading printed output as strings — fragile, breaks silently when formatting changes |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
does `Get-Process | Format-Table Name, CPU -AutoSize | Select-Object
CPU` not reliably give you the CPU property back, when `Get-Process |
Select-Object Name, CPU` does?
