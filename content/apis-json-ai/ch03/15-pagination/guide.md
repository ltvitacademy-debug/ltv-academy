# Lesson 15 — Pagination

**Chapter 3 · Working With AI Provider APIs · Lesson 15 of 22**

## What you'll learn

- Why no API hands you 50,000 records in a single response
- Page-based pagination, with GitHub's real `Link` header
- Cursor-based pagination, with Stripe's real `has_more`/`starting_after`
- Which style AI provider list endpoints (models, batches, files) tend to use

## Why pagination exists

Imagine a `GET /v1/customers` call that genuinely has ten million rows to
return. No server sends that in one response, and no client could process
it if it did. Pagination splits a large result set into pages, fetched one
request at a time — a pattern you'll meet constantly, from GitHub's issue
list to an AI provider's list of files or batch jobs.

## Page-based pagination: GitHub's Link header

GitHub's REST API uses `page` and `per_page` query parameters, and tells
you how to get the next page via a real HTTP `Link` header on the
response — no need to guess the next URL yourself:

```
GET /repos/octocat/Spoon-Knife/issues?per_page=2

link: <...?page=2>; rel="next", <...?page=515>; rel="last"
```

Your client reads the `rel="next"` URL straight out of that header and
requests it. When there's no `rel="next"` entry, you've reached the end.

## Cursor-based pagination: Stripe's has_more / starting_after

A lot of APIs — including Stripe's, and the pattern you'll see on AI
provider list endpoints (models, batches, files) — paginate with a
**cursor** instead of a page number: the ID of the last object you saw.

```json
{
  "object": "list",
  "url": "/v1/customers",
  "has_more": false,
  "data": [
    {"id": "cus_4QFJOjw2pOmAGJ", "object": "customer"}
  ]
}
```

Request the next page by passing `starting_after` with the `id` of the
last item from the previous page. Keep paginating while `has_more` is
`true`; stop the moment it flips to `false`.

## Why cursors instead of page numbers

Cursor-based pagination doesn't break when rows are added or deleted
between your requests — a page-number offset can skip or repeat items if
the underlying data shifts mid-list. That's exactly the failure mode you
want to avoid when polling a list of, say, in-progress batch jobs.

## Key terms

| Term | Meaning |
|---|---|
| `page` / `per_page` | Page-based pagination parameters (GitHub) |
| `Link` header | GitHub's own pointer to the next/last page URL |
| `has_more` | Boolean telling you whether another page exists (Stripe) |
| `starting_after` | Cursor parameter — the ID to resume after (Stripe) |

## Lab

Sketch a loop (pseudocode is fine) that keeps calling a cursor-based list
endpoint, collecting every item from `data`, and stops exactly when
`has_more` is `false`.

## Check yourself

What real problem does cursor-based pagination solve that page-number
pagination doesn't, when the underlying list keeps changing?
