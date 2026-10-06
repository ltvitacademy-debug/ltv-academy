# Lesson 4 — Control Flow: if, for & while

**Chapter 1 · Python Fundamentals · Lesson 4 of 37**

## What you'll learn

- How `if` / `elif` / `else` make your code choose between paths
- How `for` loops repeat over a known collection of items
- How `while` loops repeat until a condition becomes false
- Why indentation is not optional in Python — it's the syntax

## Indentation is the syntax

Unlike many languages, Python doesn't use `{ }` to mark a block of code — it uses **indentation** (4 spaces, consistently). Any line indented under an `if`, `for`, or `while` is considered "inside" it:

```python
if temperature > 1.0:
    print("High temperature — more random output")
```

Get the indentation wrong, and Python raises an `IndentationError` rather than guessing what you meant.

## if / elif / else: choosing a path

```python
temperature = 0.9

if temperature < 0.3:
    print("Low — focused, deterministic output")
elif temperature < 0.8:
    print("Medium — balanced output")
else:
    print("High — creative, varied output")
```

Python checks each condition top to bottom and runs the first branch that's true. `elif` ("else if") lets you chain multiple conditions; `else` is the catch-all if none matched.

## for loops: repeating over items

A `for` loop walks through every item in a collection — a list of strings, a range of numbers, anything iterable:

```python
models = ["gpt-4o", "claude-opus", "gemini-pro"]

for model in models:
    print(f"Checking {model}...")
```

`range(n)` is the common way to loop a fixed number of times:

```python
for i in range(3):
    print(f"Attempt {i + 1}")
# Attempt 1
# Attempt 2
# Attempt 3
```

## while loops: repeating until something changes

A `while` loop keeps running as long as its condition is true — useful when you don't know in advance how many times you'll need to repeat, like retrying a failed API call:

```python
attempts = 0
success = False

while not success and attempts < 3:
    attempts += 1
    print(f"Attempt {attempts}...")
    success = attempts == 3  # pretend the 3rd attempt succeeds
```

Be careful: if the condition never becomes false, you get an infinite loop. Always make sure something inside the loop moves it toward ending.

## break and continue

`break` exits a loop immediately; `continue` skips to the next iteration without finishing the current one:

```python
for model in models:
    if model == "claude-opus":
        break        # stop looping entirely
    print(model)
```

## Key terms

| Term | Meaning |
|---|---|
| Indentation | Python's way of marking a block of code — 4 spaces, consistently |
| `elif` | "Else if" — chains additional conditions after an `if` |
| `for item in collection` | Loops once per item in a list, range, or other iterable |
| `while condition` | Loops as long as the condition stays true |
| `break` / `continue` | Exit a loop early / skip to the next iteration |

## Check yourself

Before Lesson 5, be able to write a `for` loop over a list of three model names, and explain the difference between a `for` loop and a `while` loop in terms of when each one stops.
