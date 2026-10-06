# Lesson 9 — Dictionaries

**Chapter 2 · Data Structures for AI Work · Lesson 9 of 37**

## What you'll learn

- Creating and accessing a dictionary with keys and values
- `.get()` vs. `[ ]` — and why `.get()` is usually the safer choice
- Looping over keys, values, and both together
- Why dictionaries matter so much: they're what JSON actually becomes in Python

## Creating and accessing a dictionary

A **dictionary** (`dict`) stores key-value pairs — unlike a list, you look things up by name, not position:

```python
response = {
    "model": "gpt-4o",
    "tokens_used": 142,
    "finish_reason": "stop",
}

response["model"]          # "gpt-4o"
response["tokens_used"]    # 142
```

## `.get()` vs. `[ ]`

Using `[ ]` on a missing key raises a `KeyError` and crashes your program. `.get()` returns `None` instead — or a default value you choose:

```python
response["missing_key"]              # KeyError! Crashes.
response.get("missing_key")          # None — no crash
response.get("missing_key", "n/a")   # "n/a" — your own default
```

When working with real API responses, where a field might legitimately be absent, `.get()` is almost always the safer default.

## Modifying a dictionary

```python
response["new_field"] = "added"      # add or overwrite a key
del response["finish_reason"]         # remove a key
"model" in response                   # True — checks if a key exists
```

## Looping over a dictionary

```python
for key in response:                       # loops over keys
    print(key)

for key, value in response.items():        # loops over both
    print(f"{key}: {value}")

for value in response.values():            # loops over values only
    print(value)
```

`.items()` is what you'll reach for most — it gives you both the key and value together in one loop.

## Dictionaries ARE how JSON looks in Python

This is the single most important fact in this lesson: every AI API sends back **JSON**, and Python's `json` module turns that JSON directly into a dictionary (and nested dictionaries, for nested JSON):

```python
import json

api_response_text = '{"model": "gpt-4o", "tokens_used": 142}'
data = json.loads(api_response_text)   # now it's a real dict

print(data["model"])   # "gpt-4o"
```

Every time you call an AI API in this course from Chapter 5 onward, the response comes back as a dictionary built exactly this way.

## Key terms

| Term | Meaning |
|---|---|
| Dictionary (`dict`) | A collection of key-value pairs, created with `{ }` |
| `.get(key, default)` | Looks up a key safely, returning a default instead of crashing |
| `.items()` | Loops over a dictionary's keys and values together |
| `json.loads()` | Converts a JSON text string into a Python dictionary |

## Check yourself

Before Lesson 10, be able to explain why `.get()` is usually safer than `[ ]` for reading a dictionary, and why dictionaries are the structure you'll see constantly once you start calling real AI APIs.
