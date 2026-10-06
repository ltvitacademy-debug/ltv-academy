# Lesson 10 — Sets & Tuples

**Chapter 2 · Data Structures for AI Work · Lesson 10 of 37**

## What you'll learn

- What a set is, and the one problem it solves better than a list: uniqueness
- Set operations — union, intersection, difference
- What a tuple is, and why "immutable" is the whole point
- When to reach for each of the four structures covered so far

## Sets: a collection with no duplicates, ever

A **set** is an unordered collection where every item is automatically unique — adding a duplicate does nothing:

```python
models_used = {"gpt-4o", "claude-opus", "gpt-4o", "gemini-pro"}
print(models_used)
# {"gpt-4o", "claude-opus", "gemini-pro"}  — only 3 items, duplicate dropped
```

The most common real use: de-duplicating a list.

```python
model_calls = ["gpt-4o", "gpt-4o", "claude-opus", "gpt-4o"]
unique_models = set(model_calls)
# {"gpt-4o", "claude-opus"}
```

## Set operations

Sets support real mathematical set operations, useful for comparing two groups of items:

```python
team_a_models = {"gpt-4o", "claude-opus"}
team_b_models = {"claude-opus", "gemini-pro"}

team_a_models | team_b_models   # union: all models from either team
team_a_models & team_b_models   # intersection: models both teams use
team_a_models - team_b_models   # difference: only team A's models
```

## Tuples: a list that can't change

A **tuple** looks like a list but uses `( )` instead of `[ ]`, and once created, it **cannot be modified** — no append, no item assignment:

```python
coordinates = (40.7128, -74.0060)   # latitude, longitude — a fixed pair

coordinates[0]        # 40.7128 — reading works fine
coordinates[0] = 41.0 # TypeError! Tuples are immutable
```

## Why immutability is the point, not a limitation

A tuple's unchangeability is exactly why it's useful: it signals "this data is fixed and shouldn't be modified," and — critically — it can be used as a dictionary key, while a list cannot:

```python
cache = {}
cache[("gpt-4o", 0.7)] = "cached response"   # tuple as a dict key — works
cache[["gpt-4o", 0.7]] = "cached response"   # TypeError! Lists can't be keys
```

A common real pattern: returning multiple values from a function (Lesson 5) actually returns a tuple behind the scenes.

## Choosing the right structure

```
list    — ordered, changeable, duplicates allowed    [1, 2, 2, 3]
dict    — key-value pairs, looked up by name          {"a": 1}
set     — unordered, unique items only                {1, 2, 3}
tuple   — ordered, fixed, can be a dict key            (1, 2)
```

## Key terms

| Term | Meaning |
|---|---|
| Set | An unordered collection where every item is automatically unique |
| `|`, `&`, `-` | Set union, intersection, and difference operators |
| Tuple | An ordered, immutable collection created with `( )` |
| Immutable | Cannot be changed after creation |

## Check yourself

Before Lesson 11, be able to explain why a tuple can be used as a dictionary key while a list cannot, and when you'd reach for a set instead of a list.
