# Making HTTP Calls

**Chapter 5 · Working With APIs in Python · Lesson 23 of 37**

Lesson 22 covered a bare GET request. Real API calls — including every AI API call — almost always need query parameters, custom headers, or a JSON body you're sending rather than receiving. This lesson covers all three.

## What you'll learn

- Adding query parameters to a GET request with `params`
- Sending a JSON body with a POST request using `json`
- Setting custom headers on any request
- Setting a `timeout` so a slow server can't hang your program forever

## GET with query parameters

Instead of hand-building a URL string with `?key=value&key2=value2`, pass a dictionary to `params` and `requests` builds the query string for you — correctly encoding special characters along the way.

```python
import requests

response = requests.get(
    "https://api.github.com/search/repositories",
    params={"q": "python", "sort": "stars"}
)
print(response.url)
# https://api.github.com/search/repositories?q=python&sort=stars
```

## POST with a JSON body

Most AI APIs expect you to **POST** data — a prompt, a set of messages — as JSON. Pass a Python dict to the `json` parameter and `requests` serializes it and sets the right `Content-Type` header automatically.

```python
response = requests.post(
    "https://api.example.com/v1/chat",
    json={"model": "gpt-4", "messages": [{"role": "user", "content": "Hi"}]}
)
```

Note the difference from `params`: `params` builds a query string appended to the URL (for GET), while `json` builds the request *body* (for POST) — two different places data can travel in an HTTP request.

## Setting headers

Headers carry metadata about the request — most commonly, authentication (Lesson 25 covers this in depth) and content type. Pass a dictionary to `headers`:

```python
response = requests.get(
    "https://api.example.com/v1/models",
    headers={"Authorization": "Bearer sk-demo-key", "Accept": "application/json"}
)
```

`json=` already sets `Content-Type: application/json` for you automatically — you only need to add it yourself if you're sending a body some other way.

## Always set a timeout

Without a `timeout`, a request that never gets a response can hang your program indefinitely. Always pass one:

```python
try:
    response = requests.get("https://api.example.com/v1/models", timeout=10)
except requests.exceptions.Timeout:
    print("The request took too long and was cancelled.")
```

Ten seconds is a common default; a slow or loaded API might need longer, but *some* timeout is non-negotiable in real code (Lesson 24 covers the rest of this error-handling pattern).

## Recap

- `params={}` on a GET request builds and encodes the URL's query string for you.
- `json={}` on a POST request serializes a dict as the request body and sets the content-type header.
- `headers={}` sets custom headers, most commonly authentication.
- Always pass `timeout=` — an API call without one can hang forever.
- Next lesson: reading what comes back, including when something goes wrong.
