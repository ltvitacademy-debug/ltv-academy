# Lesson 5 — Variables & Data Types

**Chapter 1 · PowerShell Basics · Lesson 5 of 18**

## What you'll learn

- How to create a variable with `$variable = value`
- Why PowerShell is loosely/dynamically typed by default, and what that means in practice
- The common data types you'll actually run into: `[int]`, `[string]`, `[array]`
- How to use `Get-Member` to find out what type something really is, instead of guessing

## Creating a variable

Every PowerShell variable starts with a dollar sign, and assignment
uses a single `=`:

```
$serverName = "SQLPROD01"
$maxConnections = 100
```

No separate declaration step, no explicit type required up front —
you just assign a value and the variable exists. Variable names are
case-insensitive (`$ServerName` and `$servername` refer to the same
variable), though this course keeps a consistent casing for
readability.

## Loose typing: PowerShell figures out the type for you

By default, PowerShell is **dynamically typed** — it looks at the
value you assign and picks a type automatically. `$serverName` above
became a `[string]` because `"SQLPROD01"` is text in quotes;
`$maxConnections` became an `[int]` because `100` has no quotes and
looks like a whole number. This is convenient, but it has a real
consequence worth knowing up front: PowerShell will often
**auto-convert** types where a stricter language would refuse to.
`"5" + 3` produces the string `"53"` (text concatenation), while
`5 + 3` produces the integer `8` — same-looking numbers, different
result, depending entirely on whether quotes made one of them a
string. When a script's output looks wrong, checking whether a
value picked up an unexpected type is one of the first things to
check.

## Common data types

You'll see a handful of types constantly:

```
[string]   "SQLPROD01"           text
[int]      100                   whole number
[double]   99.5                  decimal number
[bool]     $true / $false        true or false
[array]    @("a", "b", "c")      an ordered list of values
[datetime] (Get-Date)            a date and time value
```

You can force a type explicitly by putting it in brackets before the
variable, which is worth doing when you need to be certain:

```
[int]$retryCount = 3
```

## Get-Member: what type is this, really?

Loose typing is convenient until you're not sure what you're actually
holding. `Get-Member` answers that directly — pipe anything into it
and it lists the object's real type and every property and method
available on it:

```
$serverName | Get-Member
```

The first line of the output (`TypeName: System.String`) tells you
exactly what PowerShell decided `$serverName` is. This is the exact
same tool that makes Lesson 7's "objects vs. text" distinction
concrete instead of abstract — `Get-Member` is how you prove, on your
own machine, that something PowerShell handed you is a real object
with real properties, not just formatted text that happens to look
like one.

## Chapter 1 complete

That closes out **PowerShell Basics**: the console and VS Code,
cmdlets and their Verb-Noun syntax, finding help without memorizing
commands, and now variables and types. Chapter 2, **Working With
Objects & Pipelines**, is next — it's where the "objects, not text"
idea from Lesson 1 stops being a comparison to bash and becomes
something you use directly, starting with the pipe operator itself.

## Key terms

| Term | Meaning |
|---|---|
| Variable | `$name = value` — no separate declaration step required |
| Dynamic typing | PowerShell infers a variable's type from the value assigned to it |
| `[int]`, `[string]`, `[array]` | The most common explicit type names you'll see or force |
| `Get-Member` | Lists an object's real type name, properties, and methods |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does `"5" + 3` produce `"53"` while `5 + 3` produces `8`, and how
would `Get-Member` help you confirm which type you're actually
holding?
