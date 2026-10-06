# Lesson 5 — Reading API Documentation

**Chapter 1 · API Foundations · Lesson 5 of 19**

## What you'll learn

- Where Oracle publishes REST API documentation for Financials
- How the documentation is organized: one guide, one page per operation
- The five things every operation's doc page tells you
- How to identify required fields for a POST or PATCH before sending a request

## Where the documentation lives

Oracle publishes "REST API for Oracle Fusion Cloud Financials" on
`docs.oracle.com`, organized by resource — invoices, receivables
invoices, journals, GL account combinations, and so on. The
documentation URL includes the Fusion release it applies to (for
example, `25d` or `26a`), because resources and fields can change
slightly between releases.

## Structure: one page per operation

Each documented operation — "Get all invoices," "Create an invoice,"
"Update an invoice hold" — gets its own page. Learning to read one of
these pages means you can read all of them, because they share the
same five sections.

## The five things every operation page tells you

1. **Method + path** — the HTTP verb and the resource's URL, including
   where the version string goes.
2. **Request parameters** (for GET operations) — which query
   parameters are supported: `q`, `fields`, `expand`, `limit`,
   `offset`, and any resource-specific `finder`s.
3. **Request body schema** (for POST/PATCH) — every field the resource
   accepts, which ones are required, and their data types.
4. **Response schema** — the shape of what comes back, field by field.
5. **Example payload** — a worked sample request and/or response.

## Reading "Create an invoice"

```
Operation:  Create an invoice
Method:     POST
Path:       /fscmRestApi/resources/{version}/invoices
Requires:   BusinessUnit, InvoiceCurrency,
            InvoiceDate, Supplier, SupplierSite
```

Before you ever send a request, the documentation has already told you
what's mandatory. Skipping this step is the single most common cause
of an avoidable `400` error later.
## Key terms

| Term | Meaning |
|---|---|
| Operation | One documented action on a resource — e.g. 'Create an invoice' |
| Request body schema | The documented list of fields a POST or PATCH accepts, with which are required |
| Response schema | The documented shape of the data a resource returns |
| Release version | The Fusion release (e.g. 25D) the documentation page applies to |

## Check yourself

Before sending a POST to create a receivables invoice, what two things should you confirm from the documentation first, and why does skipping them usually lead to a 400 error?
