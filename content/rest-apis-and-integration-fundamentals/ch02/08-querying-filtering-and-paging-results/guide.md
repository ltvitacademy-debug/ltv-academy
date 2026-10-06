# Lesson 8 — Querying, Filtering and Paging Results

**Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 8 of 19**

## What you'll learn

- How the q parameter filters a collection, similar to a SQL where clause
- What finder, fields, and expand each do differently from q
- How limit and offset page through a large result set
- The hasMore flag's role in knowing when to stop paging

## Four parameters that narrow a GET

| Parameter | Purpose |
|---|---|
| `q` | A filter expression — a "where clause" using operators like `=`, `>=`, `LIKE`, `AND`/`OR` |
| `finder` | A predefined, named lookup with its own bind parameters, for conditions `q` can't express |
| `fields` | Restricts the response to only the named attributes |
| `expand` | Pulls a related child resource into the same response |

```
GET /invoices?q=InvoiceAmount>1000;InvoiceStatus='UNPAID'

GET /invoices?fields=InvoiceNumber,InvoiceAmount

GET /invoices/300000182?expand=invoiceLines
```

In a `q` expression, a semicolon joins conditions with **AND**.
`finder` is used as `?finder=findByX;ParamName=value` and reaches
some lookups that `q` alone cannot express.

## Paging: limit, offset, hasMore

Even a filtered result can be too large for one response. Oracle
Fusion pages results with:

- **`limit`** — records per page (most resources cap this at 500).
- **`offset`** — how many records to skip before the page starts
  (default `0`).
- **`hasMore`** (in the response) — `true` means more records exist
  beyond this page.

The paging pattern: request with a given `limit`, check `hasMore`,
and if it's `true`, request again with `offset` increased by that
same `limit` — repeating until `hasMore` is `false`.
## Key terms

| Term | Meaning |
|---|---|
| q | A filter expression parameter, similar to a SQL where clause |
| finder | A predefined, named lookup with bind parameters |
| expand | Pulls a child resource into the parent's response in one call |
| offset | How many records to skip before the current page begins |

## Check yourself

You need all unpaid AP invoices over $10,000 that are more than 30 days old. Sketch the q expression you'd use, and explain how you'd page through the results if there were more than 500 of them.
