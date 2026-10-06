# Authentication Headers & API Keys

**Chapter 5 · Working With APIs in Python · Lesson 25 of 37**

Every AI API requires you to prove who you are before it answers. This lesson covers the standard way that happens — a Bearer token in an HTTP header — and, just as importantly, how to keep that key out of your source code and version control.

## What you'll learn

- The `Authorization: Bearer <key>` header pattern
- Why an API key belongs in an environment variable, never hardcoded
- Loading a key with `os.environ` and `python-dotenv`
- What a 401 response actually means, and how to catch it specifically

## The Bearer token pattern

Most AI APIs authenticate requests via an HTTP header, not the URL and not the request body:

```python
import requests

response = requests.get(
    "https://api.example.com/v1/models",
    headers={"Authorization": "Bearer sk-demo-key-123"},
    timeout=10
)
```

`Bearer` signals the token type; the key itself follows after a space. The server checks this header on every request — there's no separate "login" step the way a website might have.

## Never hardcode a key in your source

```python
# DON'T DO THIS — the key is now in your source code,
# and likely your git history, forever:
headers = {"Authorization": "Bearer sk-live-abc123..."}
```

A hardcoded key in a public (or even private) GitHub repo is one of the most common real-world ways API keys leak. Once committed, it's in the project's history even after you delete the line — rotating the key is the only real fix at that point.

## The fix: environment variables

Store the key outside your code entirely, in an environment variable, and read it at runtime:

```python
import os
import requests

api_key = os.environ["API_KEY"]   # raises KeyError if it's not set
response = requests.get(
    "https://api.example.com/v1/models",
    headers={"Authorization": f"Bearer {api_key}"},
    timeout=10
)
```

`os.environ["API_KEY"]` reads the variable from your shell or deployment environment — never typed into the file itself.

## `.env` files with python-dotenv

For local development, typing `export API_KEY=...` into your terminal every session is tedious. `python-dotenv` reads key-value pairs from a local `.env` file and loads them into `os.environ` for you:

```python
# pip install python-dotenv
from dotenv import load_dotenv
import os

load_dotenv()   # reads .env into the environment
api_key = os.environ["API_KEY"]
```

The `.env` file itself must be added to `.gitignore` — it holds real secrets and should never be committed, only `.env.example` (same variable names, placeholder values) belongs in version control.

## What a bad key actually looks like

A missing or invalid key doesn't crash your Python program — it gets a normal HTTP response, just with a 401 status:

```python
response = requests.get(url, headers=headers, timeout=10)
if response.status_code == 401:
    print("Authentication failed — check your API key.")
```

## Recap

- Send credentials via `Authorization: Bearer <key>`, not the URL or body.
- Never hardcode an API key in source code — once committed, it's in your git history.
- Load keys from environment variables (`os.environ`), optionally via a `.env` file with `python-dotenv`.
- `.env` goes in `.gitignore`; only `.env.example` (no real values) is committed.
- Next lesson: rate limiting — what happens when you call an API too often, even with a valid key.
