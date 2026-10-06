# Lesson 4 — Request/Response Anatomy

**Chapter 1 · Understanding APIs · Lesson 4 of 22**

## What you'll learn

- The four parts of every HTTP request: method, URL, headers, body
- The three parts of every HTTP response: status line, headers, body
- What a real request and response look like, captured from a live tool
- Where query parameters live versus where a request body lives

## A request has four parts

```
POST /get?spacecraft=Apollo11 HTTP/1.1     <- method + URL (+ query params)
Host: postman-echo.com                      <- headers...
Content-Type: application/json
Authorization: Bearer <token>

{"note": "this is the body"}                <- body (optional on GET)
```

1. **Method** — GET, POST, PUT, PATCH, DELETE (Lesson 3)
2. **URL** — the resource's address, plus optional **query parameters**
   after the `?` (`?spacecraft=Apollo11&type=orbiter`)
3. **Headers** — metadata about the request: content type, auth token,
   accepted response format
4. **Body** — the actual payload, for methods that carry one (POST, PUT,
   PATCH); GET conventionally has none

## A real request, captured live

The screenshot below is a real request built in Postman, a tool widely
used to build and test API calls by hand before writing any code. The
query parameters table shows `spacecraft` and `type` as separate
key/value pairs — these get appended to the URL after a `?`, exactly as
shown in the code block above.

## A response has three parts

```
HTTP/1.1 200 OK                              <- status line
Content-Type: application/json               <- headers...
Content-Length: 128

{"id": 42, "status": "confirmed"}            <- body
```

1. **Status line** — the status code (Lesson 3) plus a short reason
   phrase
2. **Headers** — metadata about the response: content type, length,
   caching rules
3. **Body** — the actual data the server is sending back, almost always
   JSON in the APIs this course covers

## A real response, captured live

The second screenshot shows a real response from the same tool: `200
OK`, the response time (`100 ms`), the response size (`1.03 KB`), and
tabs for `Body`, `Cookies`, `Headers`, and `Test Results` — all parts of
the same response, just organized into different views by the tool.

## Key terms

| Term | Lives in | Example |
|---|---|---|
| Query parameter | The URL, after `?` | `?spacecraft=Apollo11` |
| Header | Both request and response | `Content-Type: application/json` |
| Body | Both request and response | `{"id": 42}` |
| Status line | Only the response | `HTTP/1.1 200 OK` |

## Check yourself

Given a raw HTTP request, could you point to exactly where the method
is, where the query parameters are, and where the body starts — without
any tool's UI to label it for you?
