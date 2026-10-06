# Lesson 11 — Working With Nested, JSON-Like Structures

**Chapter 2 · Data Structures for AI Work · Lesson 11 of 37**

## What you'll learn

- What a real AI API response actually looks like: nested dicts and lists
- How to navigate several levels deep without it turning into a mess
- Safe navigation with chained `.get()` calls
- `json.dumps()` — going the other direction, Python back to JSON text

## A real API response is nested

A real AI API response isn't flat — it's dictionaries containing lists containing more dictionaries. Here's a simplified but realistic shape, modeled on how chat completion APIs actually respond:

```python
response = {
    "model": "gpt-4o",
    "choices": [
        {
            "message": {"role": "assistant", "content": "Hello there!"},
            "finish_reason": "stop",
        }
    ],
    "usage": {"prompt_tokens": 12, "completion_tokens": 8, "total_tokens": 20},
}
```

## Navigating several levels deep

You chain lookups: a key, then a list index, then another key:

```python
first_choice = response["choices"][0]
message_text = first_choice["message"]["content"]
# "Hello there!"

# Or in one line:
response["choices"][0]["message"]["content"]
```

Read it right to left in your head: "the response's choices, the first one, its message, the content."

## Safe navigation: chained `.get()`

Real API responses sometimes omit fields — an error response might have no `choices` at all. Chaining raw `[ ]` lookups crashes the instant one link is missing. Chain `.get()` calls instead, each with a sensible default:

```python
content = (
    response.get("choices", [{}])[0]
    .get("message", {})
    .get("content", "")
)
```

This reads awkwardly at first, but the pattern is important: `.get("choices", [{}])` falls back to a list with one empty dict if `choices` is missing, so the `[0]` right after it never crashes.

## Token usage: a flatter, common case

Not everything is deeply nested — usage stats are usually just one level down:

```python
usage = response.get("usage", {})
total_tokens = usage.get("total_tokens", 0)
print(f"This call used {total_tokens} tokens")
```

## Going back: `json.dumps()`

`json.loads()` turns JSON text into a Python dict (Lesson 9); `json.dumps()` does the reverse — turning a Python dict back into JSON text, which is exactly what you send *to* most AI APIs:

```python
import json

request_body = {"model": "gpt-4o", "temperature": 0.7}
json_text = json.dumps(request_body)
# '{"model": "gpt-4o", "temperature": 0.7}'
```

## Key terms

| Term | Meaning |
|---|---|
| Nested structure | A dict or list containing other dicts/lists, several levels deep |
| Chained `.get()` | `.get(key, default)` calls strung together for safe deep lookups |
| `json.dumps()` | Converts a Python dict into a JSON text string (the reverse of `.loads()`) |

## Check yourself

Before Lesson 12, be able to write the chained lookup to pull `content` out of the nested `response` shape above, and explain why chained `.get()` calls are safer than chained `[ ]` lookups on real API data.
