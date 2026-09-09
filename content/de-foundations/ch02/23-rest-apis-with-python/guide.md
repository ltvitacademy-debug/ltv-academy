# Lesson 23 — REST APIs with Python

**Chapter 2 · Python for Data Engineers · Lesson 23 of 62**

## What you'll learn

- The `requests` library — Python's standard way to call a REST API
- Status codes, and why you always check one before trusting a response
- Turning a JSON response into a DataFrame directly
- Pagination — Lesson 17's `while` loop, put to real use

## A basic GET request

```python
import requests

response = requests.get("https://data.cityofnewyork.us/resource/xyz.json")
print(response.status_code)   # 200 means success
data = response.json()        # parses the JSON body into Python objects
```

NYC's own Open Data portal (the same city agency behind this course's
Taxi data) exposes a real Socrata API — exactly this pattern, against a
real government dataset, is genuinely how a lot of civic and research
data engineering pulls source data with no file to download at all.

## Always check the status code

```python
response = requests.get("https://data.cityofnewyork.us/resource/xyz.json")

if response.status_code == 200:
    data = response.json()
else:
    print("Request failed:", response.status_code)
```

`200` means success; `404` means the resource doesn't exist; `429` means
you're being rate-limited; `500` means the server itself failed. Lesson
19's exception handling and this status-code check solve two different
problems: exceptions catch things that crash your code outright (a
broken network connection); status codes tell you the request
*completed* but didn't necessarily *succeed*.

## From JSON response straight to a DataFrame

```python
import pandas as pd

response = requests.get("https://data.cityofnewyork.us/resource/xyz.json")
data = response.json()          # a list of dictionaries — Lesson 15's shape
df = pd.DataFrame(data)
```

If the API returns a list of JSON objects (the common case), it's the
exact same shape Lesson 21 built a DataFrame from directly — `requests`
gets you the data, `pd.DataFrame()` gives you a table.

## Pagination: Lesson 17's while loop, for real

Many APIs return data one page at a time. This is exactly the situation
Lesson 17 described — you don't know in advance how many pages there
are:

```python
all_records = []
offset = 0
page_size = 1000

while True:
    response = requests.get(
        f"https://data.cityofnewyork.us/resource/xyz.json?$limit={page_size}&$offset={offset}"
    )
    page = response.json()
    if not page:
        break                       # empty page means we're done
    all_records.extend(page)
    offset = offset + page_size

df = pd.DataFrame(all_records)
```

## Key terms

| Term | Meaning |
|---|---|
| `requests.get()` | Sends an HTTP GET request to a URL |
| Status code | A number indicating whether the request succeeded (200) or not |
| `.json()` | Parses a response's body into Python lists/dictionaries |
| Pagination | Fetching data one page at a time until there's no more |

## Lab

```python
import requests

response = requests.get("https://jsonplaceholder.typicode.com/todos")
print(response.status_code)
data = response.json()
print(len(data), "records")
print(data[0])
```

Confirm you get a `200` status and a real list of records back.

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
does checking `status_code` matter separately from exception handling,
and why does pagination use a `while` loop instead of `for`?
