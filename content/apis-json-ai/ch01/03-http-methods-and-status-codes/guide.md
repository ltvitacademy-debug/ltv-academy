# Lesson 3 — HTTP Methods & Status Codes

**Chapter 1 · Understanding APIs · Lesson 3 of 22**

## What you'll learn

- The five HTTP methods you'll actually use: GET, POST, PUT, PATCH, DELETE
- What "idempotent" means and which methods have that property
- The five status code classes (1xx–5xx) and what each class means
- The specific status codes worth memorizing now

## The five methods that matter

| Method | Means | Idempotent? |
|---|---|---|
| `GET` | Read a resource — never changes anything | Yes |
| `POST` | Create a new resource | No |
| `PUT` | Replace a resource entirely | Yes |
| `PATCH` | Partially update a resource | No (usually) |
| `DELETE` | Remove a resource | Yes |

**Idempotent** means calling it once has the same effect as calling it
five times. `DELETE /orders/1001` run twice still ends with the order
gone — the second call just finds nothing left to delete. `POST
/orders` run twice creates **two** orders — each call is a brand-new
creation, so POST is not idempotent.

## PUT vs. PATCH

`PUT` replaces the *entire* resource with what you send — any field you
omit is treated as cleared. `PATCH` changes only the fields you include,
leaving everything else alone. Sending `PATCH /users/42` with just
`{"email": "new@example.com"}` updates only the email; sending the same
body as a `PUT` could wipe out every other field on that user.

## Status codes: five classes

```
1xx — informational   (rare; "request received, continuing")
2xx — success          (the request worked)
3xx — redirection      (go look somewhere else)
4xx — client error     (you did something wrong)
5xx — server error     (the server did something wrong)
```

The first digit tells you the category before you even read the rest.

## Codes worth memorizing now

| Code | Meaning |
|---|---|
| `200 OK` | Success, here's your data |
| `201 Created` | Success, a new resource now exists |
| `204 No Content` | Success, nothing to send back (common after DELETE) |
| `400 Bad Request` | Your request was malformed |
| `401 Unauthorized` | Missing or invalid credentials |
| `403 Forbidden` | Credentials are valid, but you're not allowed |
| `404 Not Found` | That resource doesn't exist |
| `429 Too Many Requests` | You're being rate-limited |
| `500 Internal Server Error` | The server failed while handling an otherwise valid request |

Chapter 3's lesson on handling API errors and retries comes back to
several of these — 429 and 5xx in particular — when you build real retry
logic.

## Check yourself

If `POST /orders` run twice creates two separate orders, why is `DELETE
/orders/1001` run twice still considered idempotent, even though the
second call technically "does less work" than the first?
