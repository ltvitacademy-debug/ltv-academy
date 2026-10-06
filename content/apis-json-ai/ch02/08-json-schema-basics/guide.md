# Lesson 8 — JSON Schema, Basics

**Chapter 2 · JSON Deep Dive · Lesson 8 of 22**

## What you'll learn

- What JSON Schema is for: describing the *shape* JSON must have, as
  JSON itself
- The four keywords that cover most real-world schemas: `type`,
  `properties`, `required`, `enum`
- How to read a schema and tell whether a given instance would pass or
  fail it
- Where this shows up later: AI provider "structured output" and tool
  definitions (Chapter 3) are JSON Schema underneath

## A schema is just JSON, describing JSON

**JSON Schema** is a specification — maintained at json-schema.org — for
describing what a piece of JSON is *allowed* to look like: which fields
must exist, what type each one is, and what values are valid. A schema
is itself written in JSON:

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "age": {"type": "number"},
    "role": {"enum": ["admin", "member"]}
  },
  "required": ["name", "role"]
}
```

## The four keywords worth knowing first

| Keyword | Says |
|---|---|
| `type` | What JSON type this value must be (`object`, `string`, `number`...) |
| `properties` | For an object, the allowed keys and each one's own schema |
| `required` | Which keys from `properties` must be present |
| `enum` | The value must be exactly one of this fixed list |

## Checking an instance against the schema

```json
{"name": "Ada", "role": "admin"}          // valid
{"name": "Ada", "role": "owner"}          // invalid: "owner" not in enum
{"age": 36, "role": "member"}             // invalid: missing required "name"
```

`age` is optional (not in `required`), so leaving it out is fine. A
`role` outside the `enum` list fails, and so does dropping `name` — even
though `age` was never required, `name` and `role` both are.

## Where this comes back

Chapter 3 shows that when an AI provider offers "structured output" or
"tool calling," what you hand it is a JSON Schema describing the shape
you want the model's JSON response to match. Everything in this lesson —
`type`, `properties`, `required` — is exactly what that schema is built
from.

## Check yourself

Given the schema above, would `{"name": "Ada"}` (no `role` at all) pass
or fail — and which keyword makes that the answer?
