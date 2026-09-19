# Lesson 12 — Loops: foreach, while & for

**Chapter 3 · Scripts & Control Flow · Lesson 12 of 18**

## What you'll learn

- `foreach` — looping over a collection you already have
- `while` — looping until a condition becomes false
- `for` — looping a specific number of times with a counter
- Why these are genuinely different tools, not three syntax variants of the same thing

## foreach: over a collection

`foreach` is what you reach for constantly as a DBA — you have a
list of servers, databases, or files, and you need to do the same
thing to each one:

```powershell
$servers = "SQL-PROD-01", "SQL-PROD-02", "SQL-PROD-03"

foreach ($server in $servers) {
    Write-Host "Checking $server..."
}
# Checking SQL-PROD-01...
# Checking SQL-PROD-02...
# Checking SQL-PROD-03...
```

Notice this is doing the same job `ForEach-Object` does in a
pipeline (Lesson 8) — the difference is that `foreach` here is a
language keyword operating on a collection you already have in a
variable, while `ForEach-Object` receives items one at a time from
the pipeline. Both are common; which one you reach for depends on
whether you already have the collection or you're mid-pipeline.

## while: until a condition is false

`while` doesn't know how many times it'll run in advance — it keeps
going as long as its condition stays true:

```powershell
$attempts = 0
$connected = $false

while (-not $connected -and $attempts -lt 5) {
    $attempts++
    Write-Host "Connection attempt $attempts..."
    # $connected = Test-Connection ... (simplified for the example)
    if ($attempts -eq 3) { $connected = $true }
}
# Connection attempt 1...
# Connection attempt 2...
# Connection attempt 3...
```

This is the right tool when you're waiting on something to become
true — a retry loop, polling a service until it responds, watching
a job status until it finishes. `foreach` can't express this well,
because `foreach` needs a collection to iterate up front; `while`
just needs a condition.

## for: a counter you control

`for` is for when you need an actual counter — not iterating items,
counting iterations:

```powershell
for ($i = 1; $i -le 5; $i++) {
    Write-Host "Backup check $i of 5"
}
# Backup check 1 of 5
# Backup check 2 of 5
# ...
# Backup check 5 of 5
```

The three parts inside the parentheses are: starting value
(`$i = 1`), the condition checked before each pass (`$i -le 5`), and
what happens after each pass (`$i++`, increment by one). `for` is
less common day-to-day than `foreach`, but it's the right shape when
the loop itself is about counting — running something exactly `n`
times, or stepping through index positions.

## Choosing the right one

These aren't interchangeable — each answers a different question:

- **"I have a list, do this to each item"** → `foreach`
- **"Keep going until something becomes true"** → `while`
- **"Run this exactly N times, or by index"** → `for`

Reaching for the wrong one usually means forcing a collection where
there isn't one yet (`foreach` when you should `while`), or hand-
rolling a counter when you already have a collection (`for` when you
should `foreach`).

## Key terms

| Term | Meaning |
|---|---|
| `foreach` | Iterates over a collection already in a variable |
| `while` | Repeats until its condition becomes false — unknown iteration count |
| `for` | Repeats a controlled number of times using a counter |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking:
you need to retry a database connection up to 5 times, waiting for
success — which loop fits, and why would the other two be a worse
choice for that specific job?
