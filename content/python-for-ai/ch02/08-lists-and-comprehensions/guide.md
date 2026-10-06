# Lesson 8 — Lists & List Comprehensions

**Chapter 2 · Data Structures for AI Work · Lesson 8 of 37**

## What you'll learn

- Creating, indexing, and slicing lists
- The list methods you'll use constantly: `append`, `extend`, `sort`
- List comprehensions — Python's compact way to build a new list from an existing one
- Why this matters directly for AI work: shaping batches of prompts and responses

## Creating and indexing a list

A **list** is an ordered, changeable collection of values:

```python
models = ["gpt-4o", "claude-opus", "gemini-pro"]

models[0]        # "gpt-4o"      — first item, index 0
models[-1]       # "gemini-pro"  — last item, negative indexing
models[0:2]      # ["gpt-4o", "claude-opus"] — a slice
```

Indexing starts at `0`, not `1`. Negative indices count from the end, so `-1` is always the last item — useful when you don't know a list's length in advance.

## Common list methods

```python
models.append("mistral-large")   # adds one item to the end
models.extend(["llama-3", "command-r"])  # adds multiple items
models.sort()                     # sorts in place, alphabetically
len(models)                       # how many items are in the list
"gpt-4o" in models                 # True — checks membership
```

## List comprehensions: building a new list in one line

A **list comprehension** builds a new list by transforming or filtering an existing one, in a single readable line, instead of a multi-line `for` loop:

```python
# Without a comprehension:
upper_models = []
for model in models:
    upper_models.append(model.upper())

# With a comprehension — same result, one line:
upper_models = [model.upper() for model in models]
```

The pattern is `[expression for item in iterable]`. You can add a condition to filter:

```python
long_names = [m for m in models if len(m) > 8]
```

That reads as: "a list of `m`, for each `m` in `models`, but only if `len(m) > 8`."

## Why this matters for AI work

Shaping data is most of what you do when integrating with an AI API. A list comprehension is exactly how you'd pull just the text out of a batch of API responses, or format a list of prompts before sending them:

```python
responses = [{"text": "Hello!", "tokens": 12}, {"text": "Hi there", "tokens": 15}]
texts_only = [r["text"] for r in responses]
# ["Hello!", "Hi there"]
```

## Key terms

| Term | Meaning |
|---|---|
| List | An ordered, changeable collection, created with `[ ]` |
| Index | A position in a list, starting at `0`; negative counts from the end |
| Slice | `list[start:end]` — a sub-list between two positions |
| List comprehension | `[expr for item in iterable]` — builds a new list in one line |

## Check yourself

Before Lesson 9, be able to write a list comprehension that doubles every number in a list, and explain what `models[-1]` and `models[0:2]` each return.
