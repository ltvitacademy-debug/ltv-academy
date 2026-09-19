# Lesson 11 — if/else & switch

**Chapter 3 · Scripts & Control Flow · Lesson 11 of 18**

## What you'll learn

- `if` / `elseif` / `else` — making a script branch on a condition
- Comparison operators PowerShell actually uses (`-eq`, `-gt`, `-lt`, not `==` or `<`)
- `switch` for multiple discrete cases, and why it beats a long `if`/`elseif` chain
- A real example: routing on a database's status

## if / elseif / else

A script that always does the same thing regardless of circumstances
isn't very useful. `if` lets it branch:

```powershell
$freeGB = 8.2

if ($freeGB -lt 5) {
    Write-Host "CRITICAL: low disk space"
} elseif ($freeGB -lt 20) {
    Write-Host "WARNING: disk space getting low"
} else {
    Write-Host "OK: disk space normal"
}
```

Notice the comparison operators: `-lt` (less than), not `<`. PowerShell
uses letter-based operators — `-eq`, `-ne`, `-gt`, `-ge`, `-lt`,
`-le` — because the punctuation symbols (`<`, `>`) are already
reserved for redirecting output to a file, a holdover from the
shell's command-line roots. This trips up almost everyone coming
from another language on day one; there's no way around it, it's
just PowerShell's syntax.

## switch: multiple discrete cases

`if`/`elseif` chains get unwieldy once you're checking one variable
against many specific values. `switch` is built for exactly that:

```powershell
$status = "Offline"

switch ($status) {
    "Online"    { Write-Host "All good" }
    "Degraded"  { Write-Host "Investigate now" }
    "Offline"   { Write-Host "Page the on-call DBA" }
    default     { Write-Host "Unknown status: $status" }
}
# Page the on-call DBA
```

The `default` block runs when nothing else matches — the `switch`
equivalent of a final `else`. Compare that to the same logic written
as `if`/`elseif`:

```powershell
if ($status -eq "Online") { Write-Host "All good" }
elseif ($status -eq "Degraded") { Write-Host "Investigate now" }
elseif ($status -eq "Offline") { Write-Host "Page the on-call DBA" }
else { Write-Host "Unknown status: $status" }
```

Both work identically here. The real reason to prefer `switch`: once
you're past two or three discrete values, repeating `$status -eq`
on every line adds noise `switch` doesn't have — it states the
variable once and lists every case underneath it, which reads faster
and is harder to typo. Reach for `if`/`elseif` when the branches are
based on a genuine condition (a range, a comparison); reach for
`switch` when you're really just matching one variable against a
list of known, discrete values.

## Key terms

| Term | Meaning |
|---|---|
| `-eq` `-gt` `-lt` etc. | PowerShell's letter-based comparison operators — `<` `>` are reserved for redirection |
| `elseif` | An additional condition checked only if the prior `if` was false |
| `switch` | Matches one variable against a list of discrete values, with `default` as the fallback |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking:
why does PowerShell use `-eq` instead of `==`, and when would you
reach for `switch` instead of a chain of `elseif`s?
