# Authentication & Tokens

Northbridge Retail's checkout service needs to call their payment processor's API to look up transaction status — but that API won't answer anonymous requests. It needs proof of who's calling. This lesson covers the three ways you'll run into that proof in practice: a static API key, a bearer token, and a full OAuth2 client-credentials flow where your script requests its own temporary token.

## What you'll learn

- How to send a static API key in a request header
- How a Bearer token differs from an API key
- How the OAuth2 client-credentials flow works: request a token, use it, refresh it before it expires
- Why credentials belong in environment variables, never in your source code

## API keys in headers

The simplest form of authentication is a long, secret string issued to your account, sent with every request in a header. It proves "this request came from Northbridge," nothing more:

```python
import os
import requests

response = requests.get(
    "https://api.paymentpro.com/v1/transactions",
    headers={"X-API-Key": os.environ["PAYMENTPRO_API_KEY"]},
    timeout=10,
)
response.raise_for_status()
```

Notice the key comes from `os.environ`, not a literal string. You covered why in lesson 12: a hardcoded secret ends up in your git history forever, even if you delete it in a later commit.

## Bearer tokens

A **Bearer token** is sent the same way — in a header — but using the `Authorization` header with the `Bearer` scheme instead of a custom key name:

```python
headers = {"Authorization": f"Bearer {access_token}"}
response = requests.get(
    "https://api.paymentpro.com/v1/transactions",
    headers=headers,
    timeout=10,
)
```

The difference that matters: an API key is usually long-lived and assigned once, while a bearer token is usually short-lived and *issued* to you by the API, often through an OAuth2 flow — which is where it gets more interesting.

## The OAuth2 client-credentials flow

PaymentPro doesn't hand Northbridge a permanent API key. Instead, Northbridge has a `client_id` and `client_secret`, and trades them for a short-lived access token whenever it needs one:

```python
import os
import time
import requests

_token_cache = {"access_token": None, "expires_at": 0}

def get_access_token():
    if _token_cache["access_token"] and time.time() < _token_cache["expires_at"]:
        return _token_cache["access_token"]

    response = requests.post(
        "https://api.paymentpro.com/oauth/token",
        data={
            "grant_type": "client_credentials",
            "client_id": os.environ["PAYMENTPRO_CLIENT_ID"],
            "client_secret": os.environ["PAYMENTPRO_CLIENT_SECRET"],
        },
        timeout=10,
    )
    response.raise_for_status()
    token_data = response.json()

    _token_cache["access_token"] = token_data["access_token"]
    _token_cache["expires_at"] = time.time() + token_data["expires_in"] - 30
    return _token_cache["access_token"]
```

Three things are happening: the client ID and secret (both read from environment variables) are traded for a token, the token and its expiry are cached in memory, and the `- 30` gives a 30-second safety margin so you refresh *before* the token actually dies mid-request.

## Using the token — and letting it refresh itself

Any function that needs to call PaymentPro just asks for a token first. Because `get_access_token()` checks the cache, you get automatic refresh for free:

```python
def get_transactions():
    token = get_access_token()
    response = requests.get(
        "https://api.paymentpro.com/v1/transactions",
        headers={"Authorization": f"Bearer {token}"},
        timeout=10,
    )
    response.raise_for_status()
    return response.json()["transactions"]
```

Call `get_transactions()` ten times over an hour and it only hits the `/oauth/token` endpoint once, or again after the cached token expires — never more often than it needs to.

## Key terms

| Term | Meaning |
|---|---|
| API key | A static secret string sent with each request to identify the caller |
| Bearer token | A credential sent via `Authorization: Bearer <token>`, often short-lived |
| OAuth2 client-credentials flow | A machine-to-machine flow trading a client ID/secret for a temporary access token |
| Token expiry | The timestamp after which a token stops working and must be refreshed |

## Recap

API keys are long-lived secrets sent in a header; bearer tokens are usually short-lived and issued through a flow like OAuth2 client-credentials. Request the token, cache it, and refresh it a little before it expires — and keep every credential in an environment variable, never in code. Next up, lesson 16: using a cloud SDK instead of hand-rolling REST calls like these.
