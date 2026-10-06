# Lesson 6 — JSON Syntax & Structure

**Chapter 2 · JSON Deep Dive · Lesson 6 of 22**

## What you'll learn

- Why JSON became the default body format for the request/response
  pattern Chapter 1 taught
- The six data types JSON supports — and nothing more
- The exact punctuation rules that make JSON valid (or invalid)
- How objects and arrays, the two container types, actually differ

## Why JSON, and not something else

Every request and response body you saw in Chapter 1 was JSON —
**J**ava**S**cript **O**bject **N**otation. It won out over older formats
like XML because it's compact, maps directly onto data structures nearly
every programming language already has (dictionaries/objects and
lists/arrays), and is readable by a human without extra tooling.

## Six types, no more, no less

```
"a string"        - text, always in double quotes
42                - number (int or float, no quotes)
true  /  false    - boolean
null              - explicitly "nothing"
{...}             - object (key/value pairs)
[...]             - array (ordered list)
```

That's the entire type system. No dates, no functions, no comments — if
you need a date, you send a string and agree on a format (Lesson 10
covers exactly this pitfall).

## The exact syntax rules

```json
{
  "name": "Ada Lovelace",
  "age": 36,
  "active": true,
  "nickname": null,
  "skills": ["math", "writing"]
}
```

- Keys are **always** strings, in double quotes — never single quotes,
  never unquoted
- Every key/value pair is separated by a comma — except the **last**
  one, which must **not** have a trailing comma
- Objects use curly braces `{}`; arrays use square brackets `[]`
- Whitespace (spaces, newlines) is ignored by parsers — it's there for
  humans only

## Objects vs. arrays

An **object** is unordered key/value pairs — you look things up by
*name* (`user["email"]`). An **array** is an ordered list — you look
things up by *position* (`items[0]`). Picking the right one matters:
Lesson 9's parsing code behaves differently depending on which one a
field actually is.

## Key terms

| Term | Meaning |
|---|---|
| Object | `{...}` — unordered key/value pairs, looked up by name |
| Array | `[...]` — ordered list, looked up by position (0-indexed) |
| Trailing comma | A comma after the last item — **not allowed** in JSON |
| `null` | JSON's explicit "nothing" value — distinct from an empty string |

## Check yourself

Without checking, can you name all six JSON data types, and explain why
`{"id": 42,}` (note the comma before the closing brace) is invalid JSON?
