# Pulling Data From APIs

An API (application programming interface) is a web address that returns data instead of a web page. Companies and governments publish APIs for weather, currency rates, public records, and their own systems. If a dataset is available through an API, you can pull it straight into Python, always fresh and with no manual downloads. This lesson covers the core workflow with the `requests` library, and the habits that keep you out of trouble.

## What you'll learn

- How to make a GET request and read the status code and JSON body
- How to turn a JSON response into a DataFrame
- How to send query parameters and loop through pages
- How to be a responsible API user: timeouts, errors, rate limits, terms of use
- How to handle API keys safely

## Setup and the practice API

`requests` is a third-party library: install it with `pip install requests` if you don't have it. We will use **JSONPlaceholder** (`https://jsonplaceholder.typicode.com`), a free public practice API. It needs no account or key and returns made-up data (fictional users and posts), so it is safe to experiment with. Nothing about it is real customer data.

## Your first request

```python
import requests
import pandas as pd

url = "https://jsonplaceholder.typicode.com/users"
resp = requests.get(url, timeout=10)

resp.status_code                       # 200
resp.headers.get("Content-Type")       # application/json; charset=utf-8
data = resp.json()                     # a list of 10 dictionaries
list(data[0].keys())
# ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company']
```

- `get` sends the request; `timeout=10` stops your code from waiting forever.
- `status_code` 200 means success. 404 means not found; 401 or 403 means you are not authorized.
- `.json()` parses the body into Python lists and dictionaries.

## From JSON to DataFrame

The response is a list of nested dictionaries (for example `address` contains a `geo` dictionary), which is exactly what `json_normalize` from Lesson 27 flattens:

```python
df = pd.json_normalize(data)
df.columns.tolist()
# ['id', 'name', 'username', 'email', 'phone', 'website',
#  'address.street', 'address.suite', 'address.city', 'address.zipcode',
#  'address.geo.lat', 'address.geo.lng',
#  'company.name', 'company.catchPhrase', 'company.bs']

df[["id", "name", "address.city"]].head(3)
#    id              name   address.city
# 0   1     Leanne Graham    Gwenborough
# 1   2      Ervin Howell    Wisokyburgh
# 2   3  Clementine Bauch  McKenziehaven
```

From here everything in the pandas chapters applies.

## Query parameters and pagination

Pass filters as a dictionary rather than gluing them onto the URL:

```python
r = requests.get("https://jsonplaceholder.typicode.com/posts",
                 params={"userId": 1}, timeout=10)
r.url    # https://jsonplaceholder.typicode.com/posts?userId=1
```

Many APIs return a limited number of records per request, so you fetch pages in a loop and combine them. JSONPlaceholder supports `_page` and `_limit`, but other APIs use different parameter names, so always read the provider's documentation.

```python
frames = []
for page in (1, 2, 3):
    r = requests.get(
        "https://jsonplaceholder.typicode.com/posts",
        params={"_page": page, "_limit": 10}, timeout=10)
    r.raise_for_status()
    frames.append(pd.DataFrame(r.json()))

posts = pd.concat(frames, ignore_index=True)
posts.shape       # (30, 4)
```

`raise_for_status()` raises an error on any 4xx or 5xx response. For example, asking for `/users/9999` returned status 404, and `raise_for_status()` raised `HTTPError: 404 Client Error: Not Found`. A loud failure is better than quietly building a DataFrame from an error message.

## Being a good API citizen

- **Check status and set timeouts** on every call.
- **Respect rate limits.** Many APIs cap requests per minute and answer `429 Too Many Requests` when you exceed the cap. Pause between calls with `time.sleep`, and follow the provider's documented limits.
- **Read the terms of use.** Data can carry licensing, attribution, or commercial-use rules.
- **Cache responses** by saving the JSON to disk, so re-running your notebook does not repeat the requests.
- **Avoid paid or metered services** until you understand how they bill; some charge per call.

## API keys

Some APIs require a key or token. Never paste it into a notebook or commit it to a repository. Read it from an environment variable and send it in a header. The exact header name and format vary by provider, so follow their documentation. This pattern is illustrative and was not run here:

```python
import os

token = os.environ["API_TOKEN"]
headers = {"Authorization": f"Bearer {token}"}
r = requests.get(url, headers=headers, timeout=10)
```

## Recap

- `requests.get(url, params=..., timeout=...)` fetches data; `.json()` parses it.
- `pd.json_normalize` turns nested JSON into a flat DataFrame.
- Loop over pages, `raise_for_status()`, and `pd.concat` the pieces.
- Respect rate limits and terms, cache results, and keep keys out of your code.
