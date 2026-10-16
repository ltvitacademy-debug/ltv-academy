# Lesson 17 — Calling a REST API With requests

**Chapter 3 · Python for Data Engineers · Lesson 17 of 48**

## What you'll learn

- `requests.get()` against a real, public, documented API — GitHub's
  REST API — instead of a toy example
- Reading `response.status_code` and converting a JSON response body
  into a Python dict with `.json()`
- `response.raise_for_status()`, and why checking the status code
  matters before you trust the data
- The real shape of a GitHub API JSON response, so you know what to
  expect before you write code against it

## A real GET request

GitHub's REST API (`https://api.github.com`) is free, public, and
needs no authentication for read-only requests against public
repositories — which makes it a genuinely useful API to practice
against, not a fictional stand-in.

```python
import requests

response = requests.get("https://api.github.com/repos/pandas-dev/pandas")
print(response.status_code)

data = response.json()
print(data["full_name"])
print(data["description"])
print(data["stargazers_count"])
print(data["language"])
```

```
200
pandas-dev/pandas
Flexible and powerful data analysis / manipulation library for Python, providing labeled data structures similar to R data.frame objects, statistical functions, and much more
45000+
Python
```

`requests.get()` sends the HTTP request and returns a `Response`
object. `.json()` parses the response body — which is just a JSON
string, same as `json.loads()` from Lesson 15 — into a Python dict.
`200` means the request succeeded; you're reading real, live data
about the real `pandas` repository, including fields like
`stargazers_count` and `open_issues_count` that change every day.

## Checking the status code before trusting the data

```python
response = requests.get("https://api.github.com/repos/pandas-dev/pandas")

if response.status_code == 200:
    data = response.json()
    print(data["full_name"], "has", data["forks_count"], "forks")
else:
    print(f"Request failed with status {response.status_code}")
```

A typo'd URL doesn't raise a Python exception on its own — GitHub just
returns a `404` with a normal, well-formed JSON body like
`{"message": "Not Found", ...}`. Code that calls `.json()` and reaches
into `data["full_name"]` without checking the status first will crash
with a confusing `KeyError`, not an error that tells you what actually
went wrong. The cleaner alternative is `raise_for_status()`:

```python
response = requests.get("https://api.github.com/repos/pandas-dev/pandas")
response.raise_for_status()  # raises requests.HTTPError on 4xx/5xx
data = response.json()
```

Combined with Lesson 16's `try`/`except`, that gives you a pattern
you'll reuse constantly once you're pulling data from APIs in ETL
pipelines starting in Chapter 6:

```python
try:
    response = requests.get("https://api.github.com/repos/pandas-dev/pandas")
    response.raise_for_status()
    data = response.json()
except requests.HTTPError as e:
    print(f"GitHub API request failed: {e}")
```

## A list endpoint: contributors

Not every endpoint returns a single object — many return a JSON array:

```python
response = requests.get(
    "https://api.github.com/repos/pandas-dev/pandas/contributors"
)
contributors = response.json()

print(len(contributors))
print(contributors[0]["login"])
print(contributors[0]["contributions"])
```

```
30
<top contributor's GitHub username>
<their contribution count>
```

Each item is a dict with keys like `login` (the GitHub username),
`id`, `avatar_url`, and `contributions` (a commit count). By default
GitHub only returns the first 30 contributors per page — exactly the
limitation Lesson 18 covers next.

## Key terms

| Term | Meaning |
|---|---|
| `requests.get(url)` | Sends an HTTP GET request; returns a `Response` object |
| `response.status_code` | The HTTP status (`200` success, `404` not found, etc.) |
| `response.json()` | Parses the response body as JSON into a Python dict/list |
| `response.raise_for_status()` | Raises `requests.HTTPError` if the status is 4xx/5xx |
| Endpoint | A specific URL path on an API that returns a specific kind of data |

## Lab

Write a script that calls `https://api.github.com/repos/psf/requests`
(the `requests` library's own repository) and prints its description,
star count, and primary language, using `raise_for_status()` inside a
`try`/`except requests.HTTPError` block so a failed request prints a
clear message instead of crashing.

```python
import requests

try:
    response = requests.get("https://api.github.com/repos/psf/requests")
    response.raise_for_status()
    data = response.json()
    print(data["description"])
    print(data["stargazers_count"], "stars")
    print(data["language"])
except requests.HTTPError as e:
    print(f"Request failed: {e}")
```

## Check yourself

Without looking back: why doesn't a `404` response raise a Python
exception on its own, and what does `raise_for_status()` actually do
about that? What's the difference between calling `.json()` on a
response for a single-repo endpoint versus a contributors endpoint?
