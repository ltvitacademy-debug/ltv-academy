# Lesson 4 — Calling REST APIs: Authentication, Pagination, and Rate Limits

**Chapter 1 · Python for Security Automation Fundamentals · Lesson 4 of 4**

## What you'll learn

- How to call a REST API from Python with the `requests` library, and what
  actually happens on the wire when you do
- How the OAuth2 client credentials flow works — the grant type used by
  almost every machine-to-machine security integration
- How to walk a paginated API response using next-page tokens, instead of
  assuming one call returns everything
- How to detect and recover from HTTP 429 rate-limit responses with backoff,
  so a script doesn't get an API key throttled or revoked

## Making the call: `requests` basics

Nearly every SIEM, EDR, threat-intel platform, and ticketing system this
course has touched exposes a REST API, and Python's `requests` library is the
de facto standard for calling one:

```python
import requests

response = requests.get(
    "https://api.example-tip.com/v1/indicators",
    headers={"Authorization": "Bearer <token>"},
    params={"type": "ipv4-addr", "confidence_min": 80},
    timeout=10,
)
response.raise_for_status()  # raises an exception on 4xx/5xx instead of failing silently
data = response.json()
```

Three habits worth building immediately: always pass `timeout=` (a hung
request with no timeout can stall a script indefinitely), always call
`raise_for_status()` or check `response.status_code` explicitly rather than
assuming success, and always parse the response with `.json()` rather than
string-slicing it.

## OAuth2 client credentials: the machine-to-machine flow

Most security platform APIs don't accept a username/password; they use
**OAuth2**, and specifically the **client credentials grant** — the flow
designed for one application authenticating to another with no human user
involved. You register an app with the platform and get a `client_id` and
`client_secret`; your script trades those for a short-lived access token:

```python
import requests
import time

def get_access_token(client_id: str, client_secret: str, token_url: str) -> str:
    response = requests.post(
        token_url,
        data={
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        },
        timeout=10,
    )
    response.raise_for_status()
    token_data = response.json()
    return token_data["access_token"]  # typically expires in token_data["expires_in"] seconds

token = get_access_token(CLIENT_ID, CLIENT_SECRET, "https://api.example-tip.com/oauth2/token")
headers = {"Authorization": f"Bearer {token}"}
```

That access token is short-lived — the response usually includes
`expires_in` (seconds). Production scripts cache the token and its
expiry time, and only request a new one once it's close to expiring, rather
than fetching a fresh token on every single API call.

## Pagination: next-page tokens

Security APIs almost never return everything in one response — a request for
"all indicators" might return 100 records plus a token pointing to the next
page. The exact field names vary by vendor (`next_page_token`, `cursor`,
`next`), but the pattern is the same: loop, following the token, until the
API tells you there isn't one.

```python
def get_all_indicators(base_url: str, headers: dict) -> list:
    all_items = []
    params = {"page_size": 100}
    while True:
        response = requests.get(base_url, headers=headers, params=params, timeout=10)
        response.raise_for_status()
        payload = response.json()
        all_items.extend(payload["results"])

        next_token = payload.get("next_page_token")
        if not next_token:
            break
        params["page_token"] = next_token

    return all_items
```

The bug this guards against: a script that calls the endpoint once, gets
back the first 100 of 4,000 records, and quietly treats that as the whole
data set. Always check the API's documentation for how it signals "there's
more" — a `next_page_token` field, a `Link` response header (common in
GitHub-style APIs), or an `offset`/`limit` pair you increment yourself.

## Handling 429: rate limits and backoff

Every API you'll call in production enforces a rate limit, and exceeding it
returns an **HTTP 429 Too Many Requests** response — often with a
`Retry-After` header telling you how long to wait. A script that ignores
429s and keeps hammering the endpoint risks getting its API key throttled
further, or revoked entirely. The standard fix is **exponential backoff**:
wait, retry, and if it fails again, wait longer.

```python
import time
import requests

def get_with_backoff(url: str, headers: dict, params: dict, max_retries: int = 5):
    delay = 1
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers, params=params, timeout=10)
        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", delay))
            time.sleep(retry_after)
            delay *= 2
            continue
        response.raise_for_status()
        return response.json()
    raise RuntimeError(f"Exceeded {max_retries} retries against {url}")
```

Respecting `Retry-After` when the API provides it is more reliable than
guessing your own delay — the server knows its own limits better than your
script does. When it isn't provided, doubling the delay each retry
(1s, 2s, 4s, 8s...) is the standard fallback.

## Putting it together

A real integration script in this course's style combines all three pieces:
get (and cache) an OAuth2 token, page through results until there's no
next-page token left, and wrap every request in backoff logic that respects
429 responses. That combination — not any single piece alone — is what
makes a script safe to run unattended against a production security API.

## Key terms

| Term | Meaning |
|---|---|
| Client credentials grant | The OAuth2 flow for machine-to-machine authentication with no human user, using a client ID/secret to get an access token |
| Pagination token | A value (cursor, next_page_token, etc.) an API returns to let a client request the next page of results |
| HTTP 429 | The status code an API returns when a client has exceeded its rate limit |
| Exponential backoff | A retry strategy that doubles the wait time between attempts after a failure, rather than retrying immediately |

## Check yourself

You're ready to move on when you can write, from memory, the shape of a
Python function that pages through a hypothetical API's results using a
`next_page_token`, and explain what you'd add to that same function to make
it correctly handle an HTTP 429 response without crashing the script.
