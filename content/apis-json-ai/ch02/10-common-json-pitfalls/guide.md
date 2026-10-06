# Lesson 10 — Common JSON Pitfalls

**Chapter 2 · JSON Deep Dive · Lesson 10 of 22**

## What you'll learn

- Five specific mistakes that trip up even experienced developers
  working with JSON
- Why trailing commas and single quotes are the most common "invalid
  JSON" errors
- Why a number that looks safe in JSON can silently lose precision
- Why `null` and a missing key are **not** the same thing — and why
  that distinction matters when reading responses

## Pitfall 1 — trailing commas

```json
{"name": "Ada", "role": "admin",}
```

That trailing comma after `"admin"` is invalid. JSON (unlike JavaScript
object literals, despite the similar look) does not allow a comma after
the last item in an object or array. This is the single most common
reason hand-written JSON fails to parse.

## Pitfall 2 — single quotes instead of double

```json
{'name': 'Ada'}          // invalid
{"name": "Ada"}          // valid
```

JSON requires **double** quotes for strings and keys — always. Single
quotes are valid in Python and JavaScript source code, which is exactly
why this mistake is so easy to make when hand-writing JSON inside
either language.

## Pitfall 3 — large numbers losing precision

```
{"id": 9007199254740993}
```

JSON numbers don't have a fixed size limit, but many languages parse
JSON numbers into a 64-bit float — which can only represent integers
exactly up to about 9 quadrillion. Past that, large IDs (common in
some AI provider responses) can silently round. The fix: APIs that need
exact large integers send them as **strings**, not numbers.

## Pitfall 4 — `null` vs. a missing key

```json
{"nickname": null}        // key exists, value is explicitly nothing
{}                        // key doesn't exist at all
```

`data.get("nickname")` returns `None` for *both* of these cases in
Python, which can hide a real difference: one means "we checked, there
genuinely isn't one," the other means "this field was never sent at
all." APIs that care about this distinction document it explicitly.

## Pitfall 5 — assuming a field is always the same type

A field documented as a string can arrive as `null` on some responses
(an optional field with no value) — code that assumes it's always a
string will crash the moment that happens. Always handle the documented
*optional* case, not just the common one.

## Key terms

| Pitfall | The fix |
|---|---|
| Trailing comma | Remove the comma after the last item |
| Single quotes | Always double quotes for strings and keys |
| Large number precision | Represent very large IDs as strings |
| `null` vs. missing | Check explicitly if the distinction matters |

## Check yourself

Why does sending a very large ID as a JSON **string** avoid the
precision problem that sending it as a JSON **number** doesn't?
