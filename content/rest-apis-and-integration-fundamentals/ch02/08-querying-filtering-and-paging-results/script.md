# Lesson 8 — Querying, Filtering and Paging Results · Voiceover script

Segments map 1:1 to slides. Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 8 of 19.

---

## S1 · TITLE CARD

A raw GET on a collection like invoices can return thousands of records. Four query parameters let you narrow that down to exactly what you need, instead of pulling everything and filtering afterward.

## S2 · STEPS CARD

q works like a where clause — a filter expressed with comparison operators. finder runs a predefined, named lookup that supports conditions q alone can't express. fields restricts the response to only the attributes you name, which keeps payloads small. expand pulls a child resource, like an invoice's lines, into the same response instead of requiring a second call.

## S3 · CODE CARD

In practice, that looks like this: q equals InvoiceAmount greater than 1000, semicolon, InvoiceStatus equals UNPAID — the semicolon joins the two conditions with AND. A fields call returns only InvoiceNumber and InvoiceAmount. And expand equals invoiceLines pulls the invoice's lines into the same response as its header.

## S4 · STEPS CARD

Even after filtering, a result set can still be too large for one response. limit controls how many records come back per page, capped at 500. offset controls how many records to skip before that page starts. The pattern is simple: keep increasing offset by your limit and re-requesting until hasMore comes back false.

## S5 · OUTRO CARD

q, finder, fields, expand, limit, offset — together they turn a raw collection into exactly the records you need, exactly shaped the way you need them. Next lesson, we flip direction: creating and updating records instead of just reading them.
