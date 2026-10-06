# Lesson 2 — REST API Basics

**Chapter 1 · API Foundations · Lesson 2 of 19**

## What you'll learn

- What "REST" means and why Oracle Fusion's APIs are built this way
- The three ideas that make an API RESTful: resources, statelessness, standard verbs
- How an Oracle Fusion resource like an invoice maps to a URL
- Why every Oracle Fusion REST call must carry its own credentials

## REST is a style, not a product

**REST (Representational State Transfer)** is an architectural style
for designing APIs, described by Roy Fielding in 2000 — not a protocol,
file format, or piece of software. Oracle's own documentation calls its
Financials, SCM, and Procurement APIs "REST APIs" because they follow
these conventions.

## Idea 1 — everything is a resource, addressed by a URL

REST organizes an API around **resources** — nouns, not actions. In
Oracle Fusion Financials, invoices, journals, receivables invoices, and
GL account combinations are all resources, each with its own URL under
a shared base path:

```
GET /fscmRestApi/resources/11.13.18.05/invoices
GET /fscmRestApi/resources/11.13.18.05/invoices/300000182
```

The resource itself (the invoice) lives in the URL. What happens to it
comes from the HTTP method, covered fully in Lesson 3.

## Idea 2 — statelessness

Each request to Oracle Fusion's REST API must carry **everything** the
server needs — authentication included — because the server remembers
nothing from your previous call. This is why every single request
includes credentials, even seconds after your last one. It also means
Oracle can route your request to any available server in its pool;
nothing is tied to one particular machine.

## Idea 3 — standard HTTP verbs, not custom action names

Instead of endpoint names like `/getInvoiceById` or
`/deleteJournal`, REST reuses the HTTP methods that already exist —
`GET`, `POST`, `PATCH`, `DELETE`. The resource's URL stays fixed;
the verb changes what happens to it.
## Key terms

| Term | Meaning |
|---|---|
| REST | An architectural style for designing APIs around resources |
| Resource | A "thing" — invoice, journal, customer — addressed by its own URL |
| Statelessness | Every request is self-contained; the server remembers nothing between calls |
| RESTful | An API that follows REST's conventions, as Oracle Fusion's do |

## Check yourself

Explain, in your own words, why Oracle Fusion's REST API requires credentials on every single call instead of letting you log in once and stay "logged in" the way the Oracle Fusion web UI does.
