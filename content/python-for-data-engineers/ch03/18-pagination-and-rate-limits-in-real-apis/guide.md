# Lesson 18 — Pagination & Rate Limits in Real APIs

**Chapter 3 · Python for Data Engineers · Lesson 18 of 48**

## What you'll learn

- Why GitHub's API (and most real APIs) returns results one page at a
  time instead of everything at once
- Following `Link` headers to walk through every page with
  `requests`' built-in `response.links`
- Real rate-limit headers (`X-RateLimit-Remaining`), and what happens
  when you hit the limit
- Writing a loop that pulls every contributor of a repo without
  getting itself rate-limited

## Why pagination exists

`pandas-dev/pandas` has far more than 30 contributors, but Lesson 17
showed `/contributors` only returning 30. That's a deliberate limit —
returning thousands of records in one response would be slow for the
server and the client. GitHub, like almost every real API, paginates:
you ask for a page at a time with `page` and `per_page` query
parameters.

```python
import requests

response = requests.get(
    "https://api.github.com/repos/pandas-dev/pandas/contributors",
    params={"per_page": 100, "page": 1},
)
page_1 = response.json()
print(len(page_1))
```

```
100
```

`per_page=100` is GitHub's maximum per request; `page=2` would fetch
the next 100 after that.

## Following Link headers instead of guessing page numbers

Manually incrementing `page` until you get an empty list works, but
GitHub tells you directly whether there's a next page, in the
response's `Link` header. `requests` parses that header for you into
`response.links`:

```python
response = requests.get(
    "https://api.github.com/repos/pandas-dev/pandas/contributors",
    params={"per_page": 100, "page": 1},
)
print(response.links)
```

```
{'next': {'url': 'https://api.github.com/repositories/.../contributors?per_page=100&page=2', 'rel': 'next'}, 'last': {'url': '...page=...', 'rel': 'last'}}
```

`response.links` is a dict keyed by relation name (`"next"`, `"last"`,
sometimes `"prev"` and `"first"`). When you're on the final page,
`"next"` simply isn't in that dict anymore — which is exactly the
condition to loop on:

```python
contributors = []
url = "https://api.github.com/repos/pandas-dev/pandas/contributors"
params = {"per_page": 100, "page": 1}

while url:
    response = requests.get(url, params=params)
    response.raise_for_status()
    contributors.extend(response.json())

    if "next" in response.links:
        url = response.links["next"]["url"]
        params = None  # the next URL already has page/per_page baked in
    else:
        url = None

print(len(contributors))
```

This walks every page automatically, stopping the moment `"next"`
disappears from `response.links` — no hardcoded page count, no
guessing how many contributors `pandas` actually has.

## Rate limits: a real ceiling on how fast you can ask

Every response from GitHub's API includes rate-limit headers:

```python
response = requests.get("https://api.github.com/repos/pandas-dev/pandas")
print(response.headers["X-RateLimit-Limit"])
print(response.headers["X-RateLimit-Remaining"])
```

```
60
59
```

Unauthenticated requests to GitHub's API are capped at **60 requests
per hour, per IP address** — authenticating with a personal access
token raises that to 5,000/hour, but even that is a real limit a
pagination loop can hit if a repository has enough pages. Going over
it doesn't crash silently: GitHub returns a `403` status with a
message about the rate limit, and an `X-RateLimit-Reset` header giving
you a Unix timestamp for when it resets.

```python
response = requests.get("https://api.github.com/repos/pandas-dev/pandas")

remaining = int(response.headers["X-RateLimit-Remaining"])
if remaining < 5:
    print("Getting close to the rate limit — slow down or wait for reset.")
```

A real pipeline pulling many pages checks `X-RateLimit-Remaining`
before firing off the next request, and either pauses until
`X-RateLimit-Reset` or stops early with a clear log message — never
just keeps hammering the API and letting every call after the limit
fail with a `403`.

## Key terms

| Term | Meaning |
|---|---|
| Pagination | Returning results in fixed-size pages instead of all at once |
| `per_page` / `page` | Query parameters controlling page size and which page to fetch |
| `Link` header | A header listing related page URLs (`next`, `last`, etc.) |
| `response.links` | `requests`' parsed version of the `Link` header, as a dict |
| `X-RateLimit-Remaining` | Header showing how many requests you have left in the current window |
| `403` (rate limited) | Status returned once you exceed the API's request limit |

## Lab

Write a script that pages through
`https://api.github.com/repos/pandas-dev/pandas/contributors`
(`per_page=100`) using the `response.links` loop above, collecting
every contributor's `login` into a single list, and prints the total
count along with the value of `X-RateLimit-Remaining` from the final
response — so you can see exactly how much of your hourly budget the
whole pull used.

## Check yourself

Without looking back: how does a loop know when it has reached the
last page using `response.links`, without ever hardcoding a page
count? And what's the real-world consequence of ignoring
`X-RateLimit-Remaining` in a script that paginates through many pages?
