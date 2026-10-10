# Lesson 11 — Querying With the REST API

**Chapter 2 · Using the APIs · Lesson 11 of 22**

## What you'll learn

- How a SOQL query gets sent through the `/query` resource
- The `totalSize`/`done`/`records` response shape, and pagination with `nextRecordsUrl`
- SOSL full-text search through `/search`
- Why query results page instead of returning everything at once

## Running a SOQL query

The `/query` resource runs a SOQL statement and returns matching records. The query string is passed as a URL-encoded `q` parameter:

```http
GET /services/data/v61.0/query/?q=SELECT+Id,Name,Industry+FROM+Account+WHERE+Industry='Technology'
Authorization: Bearer 00D...xyz
```

```json
{
  "totalSize": 2,
  "done": true,
  "records": [
    { "attributes": { "type": "Account", "url": "..." }, "Id": "001xx...1", "Name": "Acme Corp", "Industry": "Technology" },
    { "attributes": { "type": "Account", "url": "..." }, "Id": "001xx...2", "Name": "Globex Inc", "Industry": "Technology" }
  ]
}
```

`totalSize` is the total number of matching records, `done` tells you whether this response contains all of them, and `records` is the array itself.

## Pagination with `nextRecordsUrl`

A single response doesn't return every matching record if the result set is large — results page at 2,000 records per batch. When `done` is `false`, the response also includes a `nextRecordsUrl` you call to get the next batch:

```json
{
  "totalSize": 5000,
  "done": false,
  "nextRecordsUrl": "/services/data/v61.0/query/01gxx0000000123AAA-2000",
  "records": [ "...2000 records..." ]
}
```

```http
GET /services/data/v61.0/query/01gxx0000000123AAA-2000
Authorization: Bearer 00D...xyz
```

You keep following `nextRecordsUrl` until a response finally comes back with `"done": true`. This is the REST equivalent of SOAP's `queryMore` call from Lesson 4 — same underlying idea, different API.

## Full-text search with SOSL

While SOQL queries one specific object with a `WHERE` filter, **SOSL** (Salesforce Object Search Language) searches *across* several object types at once for a text match — closer to a search-engine query than a database filter. It runs through the `/search` resource:

```http
GET /services/data/v61.0/search/?q=FIND+{Acme}+IN+ALL+FIELDS+RETURNING+Account(Id,Name),Contact(Id,Name)
Authorization: Bearer 00D...xyz
```

This single call can return matching Accounts *and* matching Contacts in one response — something a single SOQL query cannot do, since SOQL is always scoped to one object (plus its relationships).

## Choosing SOQL vs. SOSL

Use SOQL (`/query`) when you know which object you're filtering and want precise field-based conditions. Use SOSL (`/search`) when a user is typing a search term and you don't know in advance which object type(s) the match might live in — a global search box is the classic SOSL use case.

## Key terms

| Term | Meaning |
|---|---|
| `/query` | The REST resource that runs a SOQL query |
| `totalSize` / `done` / `records` | The three fields in every query response: match count, completeness flag, and the records themselves |
| `nextRecordsUrl` | The URL to fetch the next batch of a query result when `done` is `false` |
| `/search` | The REST resource that runs a SOSL full-text search across multiple object types |
| SOSL | Salesforce Object Search Language — a text search across multiple objects, unlike SOQL's single-object filter |

## Lab

A query against `/query/?q=SELECT Id, Name FROM Contact` returns 7,500 matching Contacts. Write out, step by step, how many `/query` calls you'd need to make to retrieve every record, and what field in each response tells you whether to keep going. Then write a SOSL request that searches for the text "Johnson" across both the Account and Contact objects.

## Check yourself

Can you explain what `done: false` in a query response means, and what you do next? Can you explain, in one sentence, when you'd reach for SOSL instead of SOQL?