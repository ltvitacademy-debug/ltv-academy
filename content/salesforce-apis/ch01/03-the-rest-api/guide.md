# Lesson 3 — The REST API

**Chapter 1 · API Foundations · Lesson 3 of 22**

## What you'll learn

- The base URI every Salesforce REST call is built from
- The core resources you'll use most: `/sobjects`, `/query`, `/search`, `/limits`
- How to discover which API versions an org supports
- What a typical REST response looks like, including the `attributes` wrapper

## The base URI

Every Salesforce REST API call is built on the same pattern:

```http
https://{instance}.my.salesforce.com/services/data/v61.0/
```

`{instance}` is your org's My Domain (e.g. `yourcompany`). `v61.0` is the API version (Lesson 18 covers versioning in depth). Everything after that base is a specific **resource**.

## Discovering available versions

Before hardcoding a version, a client can call the unversioned root resource to see what the org actually supports:

```http
GET /services/data/
```

```json
[
  { "version": "60.0", "label": "Summer 24", "url": "/services/data/v60.0" },
  { "version": "61.0", "label": "Winter 25", "url": "/services/data/v61.0" }
]
```

## Core resources

A handful of resources cover the vast majority of REST work:

- **`/sobjects/{SObjectType}`** — the main door into record data. `/sobjects/Account/describe` returns an object's full field metadata; `/sobjects/Account/{id}` reads, updates, or deletes a specific record (Lesson 10 covers this in depth).
- **`/query/?q={SOQL}`** — runs a SOQL query and returns matching records (Lesson 11).
- **`/search/?q={SOSL}`** — runs a SOSL full-text search across multiple objects at once.
- **`/limits`** — reports how much of the org's API allocation remains (Lesson 14).

```http
GET /services/data/v61.0/sobjects/Account/001xx000003DGb2AAG
Authorization: Bearer 00D...xyz
```

```json
{
  "attributes": {
    "type": "Account",
    "url": "/services/data/v61.0/sobjects/Account/001xx000003DGb2AAG"
  },
  "Id": "001xx000003DGb2AAG",
  "Name": "Acme Corporation",
  "Phone": "(555) 123-4567"
}
```

## The `attributes` wrapper

Notice the `attributes` object at the top of that response — it tells the client exactly what type of record this is and gives a canonical URL back to it. This is especially useful when a query returns records of mixed or unexpected types. You never need to *send* an `attributes` object yourself on a create or update request (Lesson 10) — it only appears in what Salesforce sends back.

## JSON by default, XML available

Salesforce's REST API returns JSON by default, which is why every example in this course uses JSON. XML is still available by setting an `Accept: application/xml` header, but virtually all modern integrations use JSON, and this course does too.

## Key terms

| Term | Meaning |
|---|---|
| Base URI | The `https://{instance}.my.salesforce.com/services/data/v61.0/` pattern every REST call builds on |
| `/sobjects` | The core resource for reading, creating, updating, and deleting individual records |
| `/query` | The resource that runs a SOQL query and returns matching records |
| `/search` | The resource that runs a SOSL full-text search |
| `/limits` | The resource reporting an org's remaining API request allocation |
| `attributes` | The metadata object (`type`, `url`) Salesforce includes on every record in a REST response |

## Lab

Write out, by hand, the exact `GET` request (full URL and the one required header) you would send to:

1. Retrieve the full field metadata for the `Contact` object.
2. Retrieve a single `Opportunity` record with ID `006xx000001a2Bc` by its record ID.
3. Check how many API requests the org has remaining today.

## Check yourself

Can you write the base URI pattern from memory, including where the version number goes? Can you explain what the `attributes` object on a REST response is for, and why you don't need to send one yourself when creating a record?