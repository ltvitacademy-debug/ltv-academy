# The requests Library

**Chapter 5 · Working With APIs in Python · Lesson 22 of 37**

Every AI API call — whether you write it by hand or a provider SDK does it for you — boils down to an HTTP request and a response. This lesson introduces `requests`, the library this entire chapter is built around, and the shape of a response object you'll be reading for the rest of the course.

## What you'll learn

- Installing `requests` and making your first GET request
- The anatomy of a `Response` object: `status_code`, `text`, `.json()`
- Why `requests` exists on top of Python's built-in networking tools
- A first look at the public API this chapter will keep using

## Installing it

```
pip install requests
```

`requests` isn't part of the Python standard library, but it's the de facto standard third-party HTTP library — nearly every tutorial, SDK, and course (including this one) assumes it.

## Your first request

```python
import requests

response = requests.get("https://api.github.com")
print(response.status_code)
print(type(response))
# 200
# <class 'requests.models.Response'>
```

`requests.get(url)` sends an HTTP GET request and returns a `Response` object — not raw text, not a dictionary, but an object with its own attributes and methods for everything you'd want to know about what came back.

## The Response object's core pieces

```python
response = requests.get("https://api.github.com")

print(response.status_code)   # 200 — the HTTP status code
print(response.text[:60])     # the raw body, as a string
print(response.headers["content-type"])
# application/json; charset=utf-8
```

`status_code` is a plain integer (Lesson 24 covers what the different ranges mean). `text` is the entire response body as a Python string — useful for plain-text responses, but most APIs you'll call return JSON.

## Parsing JSON automatically

Rather than parsing `response.text` yourself, call `.json()` and `requests` hands you back a Python dictionary (or list) directly:

```python
data = response.json()
print(type(data))        # <class 'dict'>
print(data["current_user_url"])
```

This is the method you'll use constantly for the rest of this chapter — nearly every AI API returns JSON, and `.json()` turns that straight into the dictionaries and lists from Chapter 2.

## Why requests, not Python's built-in `urllib`

Python does ship a built-in way to make HTTP requests (`urllib`), but it's verbose and awkward for anything beyond the simplest case. `requests` wraps that complexity behind a small, readable API — one line to send a request, one method call to get JSON back — which is exactly why it became the ecosystem standard every AI SDK is itself built on top of.

## Recap

- `pip install requests`, then `requests.get(url)` sends a GET request and returns a `Response` object.
- `response.status_code` is the HTTP status; `response.text` is the raw body string.
- `response.json()` parses a JSON body straight into a Python dict or list.
- `requests` exists because Python's built-in networking tools are too low-level for daily use.
- Next lesson: GET requests with query parameters, and POST requests with a JSON body.
