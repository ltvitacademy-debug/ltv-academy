# Lesson 7 — Making Your First GET Request

**Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 7 of 19**

## What you'll learn

- The three pieces of every HTTP request: method, URL, headers
- Which headers a GET request to Oracle Fusion needs, and why
- How to read a real curl command calling an Oracle Fusion REST resource
- The shape of a typical Oracle Fusion list response: items, count, hasMore, limit, offset, links

## Three pieces, every time

Every HTTP request — including every call to Oracle Fusion's REST API
— is made of the same three pieces:

1. **Method** — `GET` for a read, which never modifies data.
2. **URL** — the full resource path: pod hostname, `fscmRestApi`,
   version, resource name.
3. **Headers** — metadata about the request itself. Two matter on
   nearly every call:
   - `Authorization` — your credentials (Chapter 3 covers this fully).
   - `Accept: application/json` — tells Fusion to respond in JSON.

## A real GET call

```bash
curl -u 'integration.user:********' \
  -H 'Accept: application/json' \
  'https://myco.fa.us2.oraclecloud.com/fscmRestApi\
   /resources/11.13.18.05/invoices?limit=5'
```

`curl` is a widely used command-line tool for sending HTTP requests —
useful for testing an API call before wiring it into an integration
tool. The `-u` flag here sends Basic Authentication (covered fully in
Lesson 12); `limit=5` caps the response to five records.

## What comes back

A list (collection) response from Oracle Fusion is a JSON object, not
a bare array:

```json
{
  "items": [ { "InvoiceId": 300000182 }, ... ],
  "count": 5,
  "hasMore": true,
  "limit": 5,
  "offset": 0,
  "links": [ ... ]
}
```

- `items` holds the actual records.
- `count` is how many records are in *this* response.
- `hasMore` tells you whether more records exist beyond this page.
- `limit` / `offset` echo back the paging you requested.
- `links` gives related resource URLs (self, next page, and so on).
## Key terms

| Term | Meaning |
|---|---|
| curl | A common command-line tool for sending HTTP requests, useful for testing API calls |
| Accept header | Tells the server what response format you want — application/json here |
| items | The array holding the actual records in a list response |
| hasMore | A flag telling you whether more records exist beyond the current page |

## Check yourself

A GET request to the invoices resource comes back with "hasMore": true and "limit": 5. What does that tell you about the data you just received, and what would you need to do to get the next batch?
