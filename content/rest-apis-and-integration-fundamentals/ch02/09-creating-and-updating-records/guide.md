# Lesson 9 — Creating and Updating Records

**Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 9 of 19**

## What you'll learn

- The difference between POST (create) and PATCH (update) in practice
- Why POST targets a collection URL while PATCH targets a specific record's URL
- What a minimal create payload for an Oracle Fusion invoice looks like
- Why PATCH only changes the fields you actually include in the request body

## POST creates, PATCH updates

- **POST** targets the **collection** URL (`/invoices`), because the
  record being created doesn't have an ID yet. Fusion assigns one and
  returns the created record, including its new ID, in the response.
- **PATCH** targets **one record's own** URL (`/invoices/300000182`)
  and updates *only* the fields included in the request body — every
  other field on that record stays exactly as it was. This is what
  makes PATCH a *partial* update, unlike a full replace.

Both need a `Content-Type: application/json` header, telling Fusion
the request body is JSON.

## Creating an invoice (POST)

```
POST /fscmRestApi/resources/11.13.18.05/invoices
Content-Type: application/json

{
  "BusinessUnit": "US Business Unit",
  "InvoiceCurrency": "USD",
  "InvoiceDate": "2026-10-01",
  "Supplier": "Acme Supply Co",
  "SupplierSite": "ACME-US-01"
}
```

This is a minimal header-only example. A real invoice create typically
includes an `invoiceLines` array as a child resource in the same
call, since an invoice without lines has nothing to post to the
ledger.

## Updating one field (PATCH)

```
PATCH /fscmRestApi/resources/11.13.18.05/invoices/300000182
Content-Type: application/json

{ "Description": "Reissued per vendor request" }
```

Only `Description` changes. The invoice's amount, currency, supplier,
and every other field remain untouched — PATCH never requires you to
resend the whole record just to change one field.
## Key terms

| Term | Meaning |
|---|---|
| POST | Creates a new record at a collection URL; Fusion assigns the new ID |
| PATCH | Updates only the fields included in the request body on an existing record |
| Content-Type | A header telling the server the format of the request body — application/json here |
| Child resource | A resource nested under a parent, like invoiceLines under an invoice |

## Check yourself

Why would sending a PATCH with just { "Description": "..." } be safer than resending the entire invoice record with one field changed? What could go wrong with the latter approach?
