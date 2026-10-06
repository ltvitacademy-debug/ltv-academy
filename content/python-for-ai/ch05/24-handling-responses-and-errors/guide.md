# Handling Responses & Errors

**Chapter 5 · Working With APIs in Python · Lesson 24 of 37**

A network call can fail in more ways than it can succeed: the server might be down, the connection might drop, or the request might be slow enough to hit your timeout. This lesson covers reading status codes correctly and catching the specific `requests` exceptions each failure mode raises.

## What you'll learn

- The meaning of HTTP status code ranges (2xx, 4xx, 5xx)
- `response.raise_for_status()` — failing fast on a bad response
- The specific exceptions `requests` raises, and when each one happens
- A complete try/except pattern for a real API call

## Status code ranges

```
2xx — Success             (200 OK, 201 Created)
4xx — Client error        (400 Bad Request, 401 Unauthorized, 404 Not Found, 429 Too Many Requests)
5xx — Server error        (500 Internal Server Error, 503 Service Unavailable)
```

A 4xx means *your* request was the problem (bad input, missing auth); a 5xx means the problem is on the server's side, often worth retrying. Lesson 26 covers 429 specifically.

## Checking status without raising

```python
response = requests.get("https://api.example.com/v1/models", timeout=10)
if response.status_code == 200:
    data = response.json()
else:
    print(f"Request failed: {response.status_code}")
```

This works, but checking every status code by hand gets repetitive across a real codebase.

## `raise_for_status()` — fail fast instead

`raise_for_status()` checks the status code for you: if it's 4xx or 5xx, it raises `requests.exceptions.HTTPError`; if it's 2xx, it does nothing and execution continues.

```python
response = requests.get("https://api.example.com/v1/models", timeout=10)
response.raise_for_status()   # raises HTTPError on 4xx/5xx
data = response.json()        # only reached if the call succeeded
```

## The exceptions requests can raise

```python
import requests

try:
    response = requests.get("https://api.example.com/v1/models", timeout=10)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.Timeout:
    print("The request took too long.")
except requests.exceptions.ConnectionError:
    print("Couldn't reach the server — network issue or bad URL.")
except requests.exceptions.HTTPError as e:
    print(f"Server returned an error status: {e}")
except requests.exceptions.RequestException as e:
    print(f"Something else went wrong: {e}")
```

Order matters here — Lesson 14's inheritance rule applies again. `requests.exceptions.RequestException` is the base class every other `requests` exception inherits from, so it has to come *last*; an earlier, broader `except` would swallow the more specific ones before they ever get a chance to run.

## Recap

- 2xx means success, 4xx means your request was the problem, 5xx means the server's.
- `raise_for_status()` turns a bad status code into a raised `HTTPError` instead of a value you have to remember to check.
- `Timeout`, `ConnectionError`, and `HTTPError` are specific, catchable failure modes; `RequestException` is their shared base class.
- Catch specific exceptions before the general `RequestException`, the same inheritance-ordering rule from Lesson 16.
- Next lesson: authentication — sending API keys correctly, and the specific errors a bad key produces.
