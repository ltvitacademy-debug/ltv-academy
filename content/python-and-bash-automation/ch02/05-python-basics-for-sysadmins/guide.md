# Python Basics for Sysadmins

You've spent Chapter 1 writing Bash scripts, and you've seen where Bash starts to strain: real data structures, real branching logic, and anything more than a few lines of state. Python picks up exactly there. This lesson covers the core language — variables, data types, lists and dictionaries, if/for/while, and functions — using the same kind of task you'd actually script at a company like Northbridge Retail, a mid-size e-commerce retailer currently modernizing its server fleet. No "hello world." Every example here checks disk usage, loops over real servers, or decides whether something needs an alert.

## What you'll learn

- How Python's core data types (strings, numbers, booleans) hold the values an ops script actually works with
- How to store structured data in lists and dictionaries instead of a pile of separate variables
- How to branch with `if`/`elif`/`else` and repeat work with `for` and `while`
- How to turn repeated logic into a small, reusable function

## Variables and data types

Every Python value has a type, and you rarely have to declare it — Python figures it out from what you assign.

```python
hostname = "nbr-web-01"          # str
disk_usage_percent = 87.5        # float
alert_threshold = 90             # int
is_critical = disk_usage_percent >= alert_threshold   # bool

print(f"{hostname}: {disk_usage_percent}% used (critical={is_critical})")
# nbr-web-01: 87.5% used (critical=False)
```

That last line is an **f-string** — put `f` before the quotes and you can drop any variable straight into the text with `{curly braces}`. You'll use this constantly for log lines and alert messages.

## Lists and dictionaries

A single hostname is fine for one server. Northbridge Retail has dozens. For a collection of servers, use a **list**; for "look this hostname up and get its data," use a **dictionary**.

```python
servers = ["nbr-web-01", "nbr-web-02", "nbr-db-01", "nbr-cache-01"]

disk_usage = {
    "nbr-web-01": 87.5,
    "nbr-web-02": 54.2,
    "nbr-db-01": 92.1,
    "nbr-cache-01": 40.0,
}

for server in servers:
    print(f"{server}: {disk_usage[server]}%")
```

`disk_usage[server]` looks up the value by key. If you're not sure the key exists, `disk_usage.get(server)` returns `None` instead of raising an error.

## Branching and looping: if, for, while

```python
alert_threshold = 90

for server, usage in disk_usage.items():
    if usage >= alert_threshold:
        print(f"ALERT: {server} is at {usage}% disk usage")
    elif usage >= 75:
        print(f"WARNING: {server} is at {usage}%")
    else:
        print(f"OK: {server} is at {usage}%")
```

`disk_usage.items()` gives you both the key and the value on each pass, which is almost always what you want when looping over a dictionary.

A `while` loop repeats as long as a condition stays true — useful when you don't know in advance how many times you'll loop:

```python
remaining = list(disk_usage.keys())
checked = []

while remaining:
    server = remaining.pop(0)
    checked.append(server)

print(f"Checked {len(checked)} servers")
```

## Writing small functions

Once a check gets used more than once, pull it into a function so you're not copy-pasting logic.

```python
def is_over_threshold(usage_percent, threshold=90):
    """Return True if usage_percent meets or exceeds threshold."""
    return usage_percent >= threshold

for server, usage in disk_usage.items():
    if is_over_threshold(usage):
        print(f"{server} needs attention")

    # override the default threshold for the database tier
    if is_over_threshold(usage, threshold=95):
        print(f"{server} is at CRITICAL database-tier levels")
```

`threshold=90` is a **default argument** — callers can leave it out and get 90, or pass their own value like `threshold=95`. The triple-quoted string right under `def` is a **docstring**: a short description of what the function does.

## Key terms

- **Variable** — a name bound to a value; Python infers the type automatically
- **f-string** — a string prefixed with `f` that lets you embed `{expressions}` directly
- **List** — an ordered, changeable collection, written with `[ ]`
- **Dictionary** — a collection of key-value pairs, written with `{ }`, looked up by key
- **Function** — a named, reusable block of logic defined with `def`, optionally with default arguments

## Recap

You now have the four building blocks every automation script rests on: typed variables for single values, lists and dictionaries for collections, `if`/`for`/`while` for decisions and repetition, and functions for packaging logic you don't want to repeat. Next up, Lesson 6: pointing these same skills at the filesystem with `os` and `pathlib`.
