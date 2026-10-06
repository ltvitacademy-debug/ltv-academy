# Lesson 9 — Parsing & Validating JSON

**Chapter 2 · JSON Deep Dive · Lesson 9 of 22**

## What you'll learn

- The difference between a JSON **string** (text) and a parsed JSON
  **value** (an actual object/array/etc. your code can use)
- How to parse JSON text into a real object, and handle the moment it
  fails
- Why checking a response's status code comes *before* trying to parse
  its body
- How to validate a parsed object's shape before trusting it, without
  needing a full JSON Schema library

## Parsing: text in, real values out

What arrives over the wire — in a request or response body — is JSON
**text**: a string of characters. Your code can't do `response.user.name`
on raw text; it has to **parse** that text into an actual object first:

```python
import json

raw_text = '{"name": "Ada", "role": "admin"}'
data = json.loads(raw_text)      # parse: text -> real dict
print(data["name"])              # "Ada" - now it's usable
```

`json.loads` ("load string") parses JSON text into native objects and
dicts. The reverse — turning your own data back into JSON text to send
— is `json.dumps` ("dump string").

## Parsing fails loudly, on purpose

Malformed JSON text (a stray trailing comma, an unclosed brace) raises
an exception when you try to parse it — it does not silently return
`None` or an empty object:

```python
try:
    data = json.loads(raw_text)
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
```

That's a feature, not an inconvenience: silently continuing with broken
data is far worse than failing immediately, where you can see exactly
what went wrong.

## Check the status code before you parse the body

Lesson 3 taught status codes for a reason: a `500` or `404` response's
body often isn't even JSON — it might be an HTML error page. Check
`response.status_code` *before* calling `.json()` on it, or you'll get a
confusing parse error that hides the real problem (a failed request).

## Validating shape, not just syntax

Parsing succeeding only proves the text was valid JSON — it says
nothing about whether the right *fields* are there:

```python
if "name" not in data or "role" not in data:
    raise ValueError("Missing required field")
if data["role"] not in ("admin", "member"):
    raise ValueError("Invalid role")
```

This is Lesson 8's schema, enforced by hand. Larger projects use a
schema-validation library instead of hand-written checks like these, but
the underlying idea — confirm the shape before you trust it — is
identical either way.

## Key terms

| Term | Meaning |
|---|---|
| Parse | Convert JSON text into a real object/array your code can use |
| `json.loads` | Python: parse JSON text into native objects |
| `json.dumps` | Python: convert native objects into JSON text |
| `JSONDecodeError` | Raised when parsing fails on malformed JSON text |

## Check yourself

Why does this lesson insist on checking `response.status_code` *before*
calling `.json()` on a response, rather than just wrapping the parse
itself in a `try`/`except`?
