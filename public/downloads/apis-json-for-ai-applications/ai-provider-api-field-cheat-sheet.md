# AI Provider API Field Cheat Sheet

## Anthropic Messages API vs. OpenAI-style Chat Completions (Lesson 11)

| What you want | Anthropic Messages API | OpenAI-style Chat Completions |
|---|---|---|
| Reply text | `content[0].text` | `choices[0].message.content` |
| Why it stopped | `stop_reason` | `finish_reason` |
| Input token cost | `usage.input_tokens` | `usage.prompt_tokens` |
| Output token cost | `usage.output_tokens` | `usage.completion_tokens` |

A request body looks almost identical between the two families (`model`
+ a `messages` array of `{role, content}` objects) — it's the *response*
shape where they diverge, because OpenAI-style wraps the reply in a
`choices` array to support multiple candidate replies per call.

## Rate-limit headers (Lesson 19)

```
anthropic-ratelimit-requests-remaining: 50
anthropic-ratelimit-requests-reset: 2026-10-05T14:32:00Z
anthropic-ratelimit-tokens-remaining: 18000
retry-after: 12
```

- `-remaining` — headroom left before the next reset. Present on **every**
  response, success or not.
- `-reset` — exactly when the limit refills.
- `retry-after` — only appears on a `429` itself; the exact number of
  seconds the API is telling you to wait. Read it, don't guess.
- The real algorithm is a **token bucket**: capacity refills continuously
  rather than resetting all at once on a timer.

**Proactive throttling pattern** — slow down before you actually get
limited:

```python
remaining = int(resp.headers.get("anthropic-ratelimit-requests-remaining", 999))
if remaining < 5:
    time.sleep(1)
```

## Cursor-based pagination loop (Lesson 15)

```python
cursor = None
all_items = []
while True:
    page = client.list_endpoint(starting_after=cursor)
    all_items.extend(page["data"])
    if not page["has_more"]:
        break
    cursor = page["data"][-1]["id"]
```

Keep paginating while `has_more` is `true`; stop the moment it flips to
`false`. Cursor-based pagination (an object ID, not a page number) is
the pattern AI provider list endpoints — models, batches, files — tend
to use, because it doesn't skip or repeat items if the underlying list
changes between requests.
