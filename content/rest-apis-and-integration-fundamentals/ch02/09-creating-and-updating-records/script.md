# Lesson 9 — Creating and Updating Records · Voiceover script

Segments map 1:1 to slides. Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 9 of 19.

---

## S1 · TITLE CARD

Reading data gets you most of the way through a consultant's day, but integrations also need to write data back into Fusion. Two methods handle that: POST to create, PATCH to update.

## S2 · STEPS CARD

POST goes to the collection's URL — invoices, not a specific invoice — because the record doesn't have an ID yet; Fusion assigns one and returns it. PATCH goes to one specific record's own URL and changes only the fields included in the body, leaving everything else on that record untouched. Both need a Content-Type: application/json header, telling Fusion the body it's about to read is JSON.

## S3 · CODE CARD

Here's a minimal POST creating an invoice header: BusinessUnit, InvoiceCurrency, InvoiceDate, Supplier, and SupplierSite — the same required fields Lesson 5 showed you'd find documented up front. A real integration would typically include an invoiceLines array alongside this, since an invoice without lines isn't useful.

## S4 · CODE CARD

And here's a PATCH updating a single field on an existing invoice, by its ID: just Description, nothing else. Everything else on that invoice — amount, currency, lines — stays exactly as it was, because PATCH only touches what you actually send.

## S5 · OUTRO CARD

POST for new records, PATCH for partial updates to existing ones, both carrying a JSON body with Content-Type set — that's the write side of the API. Next lesson, we look at the tools consultants actually use to build and test calls like these without writing a line of code.
