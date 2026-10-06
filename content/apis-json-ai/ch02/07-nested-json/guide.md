# Lesson 7 — Nested JSON

**Chapter 2 · JSON Deep Dive · Lesson 7 of 22**

## What you'll learn

- Why real API responses are rarely flat — they nest objects inside
  objects, and arrays inside objects
- How to read dot notation and bracket notation to reach a deeply
  nested value
- How to tell, at a glance, how many levels deep a value sits
- Why AI provider responses in particular nest several levels deep

## Flat JSON is the exception, not the rule

Lesson 6 showed a flat example — one object, no nesting. Real API
responses almost never look that simple. A single response usually
mixes objects inside objects, and arrays of objects, several levels
deep:

```json
{
  "user": {
    "name": "Ada Lovelace",
    "address": {
      "city": "London",
      "country": "UK"
    }
  },
  "orders": [
    {"id": 1001, "total": 42.50},
    {"id": 1002, "total": 19.99}
  ]
}
```

`user` is an object containing another object (`address`). `orders` is
an array where **each item is itself an object**. Nesting can combine
objects-in-objects and objects-in-arrays freely, as deep as the data
needs.

## Reading a path to a nested value

To reach a value, you chain keys and indexes together, outside-in:

```
user.address.city        -> "London"
orders[0].id              -> 1001
orders[1].total            -> 19.99
```

Each `.` steps into an object by key; each `[n]` steps into an array by
position. Read the path left to right, one level at a time, and you'll
never lose track of where you are — even five levels deep.

## Why this matters for AI provider APIs

Lesson 11 (Chapter 3) shows the real shape of an AI provider's response,
and it nests several levels: a `content` array, where each item is an
object, where one of *that* object's fields is the actual reply text.
Something like `content[0].text` — an array index followed by a key —
is exactly the pattern this lesson teaches, just with real field names
attached.

## Key terms

| Term | Meaning |
|---|---|
| Nesting | An object or array containing another object or array as a value |
| Dot notation | `user.address.city` — step into an object by key |
| Bracket notation | `orders[0]` — step into an array by position |
| Path | The full chain of keys/indexes needed to reach one value |

## Check yourself

Given `{"data": {"items": [{"id": 7}]}}`, can you write the exact path
to the value `7`, and explain each step of that path out loud?
