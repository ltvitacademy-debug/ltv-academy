# Lesson 17 — Designing a Client Class

**Chapter 4 · Building a Simple API Wrapper · Lesson 17 of 22**

## What you'll learn

- Why real projects wrap an API behind a class instead of calling `requests` everywhere
- How to structure an `__init__` that holds shared config (API key, base URL, session)
- Writing a first real method on top of the Messages API shape from Chapter 3
- What belongs on the class vs. what belongs in a one-off script

## Why wrap an API at all

Chapter 3 showed you the real request and response shapes. You *could*
call `requests.post(...)` with the right headers every time you need the
API — but scatter that across twenty places in a real codebase, and
changing one header, or adding retry logic, means editing twenty places.
A **client class** centralizes all of that in one spot.

## The __init__: shared config, built once

Everything a client needs on every call — the API key, the base URL, a
reusable HTTP session — gets set up once, in `__init__`:

```python
import requests

class AIClient:
    def __init__(self, api_key, base_url="https://api.anthropic.com"):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        })
```

Using a `requests.Session()` instead of calling `requests.post()` directly
means the connection (and those headers) gets reused across calls instead
of being rebuilt from scratch every time — a real performance win once
you're making many calls.

## A first real method

With the setup done, each method becomes a thin, readable wrapper around
one real endpoint — here, the Messages API from Lesson 11:

```python
def send_message(self, model, messages, max_tokens=1024):
    resp = self.session.post(
        f"{self.base_url}/v1/messages",
        json={"model": model, "messages": messages,
              "max_tokens": max_tokens},
    )
    resp.raise_for_status()
    return resp.json()
```

Callers now write `client.send_message("claude-sonnet-5", [...])` instead
of remembering the URL, headers, and JSON shape every single time.

## What belongs on the class

Shared, reused-everywhere things belong on the class: auth, base URL,
session, retry logic (Lesson 18), rate limiting (Lesson 19). One-off
logic that's specific to a single script — like deciding *what* prompt to
send — stays in the calling code, not inside the client.

## Key terms

| Term | Meaning |
|---|---|
| Client class | A class centralizing an API's shared setup and methods |
| `__init__` | Where shared config (keys, URLs, sessions) is set up once |
| `requests.Session` | A reusable HTTP connection, instead of one-off requests |
| `raise_for_status()` | Raises an exception on a 4xx/5xx HTTP status |

## Lab

Add a second method, `list_models`, to the `AIClient` class above, that
sends a `GET` request to `{base_url}/v1/models` using the same `self.session`.

## Check yourself

Why does putting the API key and headers in `__init__` (via a `Session`)
beat repeating them in every single method?
