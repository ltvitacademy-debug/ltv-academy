# Lesson 3 — HTTP Methods & Status Codes · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Five HTTP methods cover almost everything you'll do with a REST API: GET,
POST, PUT, PATCH, DELETE. And every response comes back with a status
code that tells you, in one number, exactly what happened.

## S2 · STEPS CARD (the five methods)

GET reads a resource and never changes anything. POST creates a new one.
PUT replaces a resource entirely — any field you leave out gets cleared.
PATCH updates only the fields you include. DELETE removes it. Four of
these five are idempotent — calling them once has the same end effect as
calling them five times.

## S3 · CODE CARD (idempotency example)

Here's why that matters. Delete order 1001 twice — the second call just
finds nothing left to delete, so the end state is identical. Post to
slash orders twice, though, and you get two separate orders — each POST
is a brand-new creation. That's the difference between idempotent and
not.

## S4 · STEPS CARD (status code classes)

Every status code's first digit tells you the category before you even
read the rest. Two-xx means success. Four-xx means you, the client, did
something wrong — a bad request, missing auth. Five-xx means the server
failed while handling an otherwise valid request.

## S5 · CODE CARD (codes to memorize)

A handful are worth knowing cold: 200 OK, 201 Created, 204 No Content,
400 Bad Request, 401 Unauthorized, 404 Not Found, 429 Too Many Requests,
and 500 Internal Server Error. You'll see 429 and the 500s again in
chapter three, when we build real retry logic around them.

## S6 · OUTRO CARD

Methods say what you're doing; status codes say what happened. Next
lesson, we put both inside the full anatomy of a real request and a real
response.
