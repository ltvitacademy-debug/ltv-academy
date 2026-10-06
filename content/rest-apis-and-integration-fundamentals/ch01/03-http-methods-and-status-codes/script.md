# Lesson 3 — HTTP Methods and Status Codes · Voiceover script

Segments map 1:1 to slides. Chapter 1 · API Foundations · Lesson 3 of 19.

---

## S1 · TITLE CARD

REST reuses HTTP's existing methods to express actions instead of inventing custom endpoint names. Oracle Fusion's REST APIs use four of them constantly, and the status code that comes back tells you exactly what happened.

## S2 · STEPS CARD

GET reads a resource and never changes any data — the safest method to experiment with. POST creates a brand-new resource, like a new invoice. PATCH updates part of an existing resource, changing only the fields you send. DELETE removes a resource, though Oracle restricts this heavily on financial records for audit reasons.

## S3 · CODE CARD

Notice the URL for a given invoice doesn't change across these calls. GET on that URL reads the invoice. PATCH on that same URL updates a field on it. POST goes to the collection URL instead, because you're creating something new that doesn't have an ID yet.

## S4 · STEPS CARD

Status codes fall into three ranges. Two-hundreds mean success — 200 OK for a read, 201 Created after a successful POST. Four-hundreds mean something about your request was wrong — 400 for bad data, 401 for bad credentials, 404 for a resource that doesn't exist. Five-hundreds mean the problem is on Oracle's end, not yours.

## S5 · OUTRO CARD

GET, POST, PATCH, DELETE, and the status codes that report back — that's the full request/response cycle. Next lesson, JSON: the actual data format every one of these requests and responses is written in.
