# Lesson 3 — HTTP Methods and Status Codes

**Chapter 1 · API Foundations · Lesson 3 of 19**

## What you'll learn

- The four HTTP methods Oracle Fusion's REST API uses most: GET, POST, PATCH, DELETE
- Why the same resource URL behaves differently depending on the method
- The three ranges of HTTP status codes and what each means
- Specific status codes you'll see constantly: 200, 201, 400, 401, 404, 500

## The verb changes what happens, not the address

A resource's URL stays fixed; the HTTP method determines the action.
Oracle Fusion's REST APIs rely on four methods:

| Method | Action | Example |
|---|---|---|
| GET | Read a resource — never modifies data | `GET /invoices/300000182` |
| POST | Create a new resource | `POST /invoices` |
| PATCH | Update part of an existing resource | `PATCH /invoices/300000182` |
| DELETE | Remove a resource | Rarely permitted on financial records |

Notice `GET` and `PATCH` target the *same* URL — the specific
invoice. `POST` targets the *collection* URL, because the resource
being created doesn't have an ID yet.

## Status codes: the server's answer, in three ranges

| Range | Meaning | Common examples |
|---|---|---|
| 2xx | Success | `200 OK` (read succeeded), `201 Created` (POST succeeded) |
| 4xx | Something about *your* request was wrong | `400` bad request body, `401` bad/missing credentials, `403` permission denied, `404` resource doesn't exist |
| 5xx | Something failed on the *server's* side | `500` unexpected error, `503` temporarily unavailable |

The range alone tells you where to start looking: a 4xx means check
your request; a 5xx means the problem isn't something you can fix by
changing what you sent.
## Key terms

| Term | Meaning |
|---|---|
| GET | Reads a resource; never modifies data |
| POST | Creates a new resource at a collection URL |
| PATCH | Updates part of an existing resource at its own URL |
| Status code | A 3-digit number telling you whether, and how, a request succeeded |

## Check yourself

An integration developer gets a 404 back when trying to GET a specific invoice by ID, and a 500 on a different call. What's the key difference in what each code tells you to check first?
