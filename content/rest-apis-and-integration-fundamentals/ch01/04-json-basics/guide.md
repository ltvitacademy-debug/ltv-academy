# Lesson 4 — JSON Basics

**Chapter 1 · API Foundations · Lesson 4 of 19**

## What you'll learn

- What JSON is and why Oracle Fusion's REST APIs use it for requests and responses
- The three building blocks of JSON: objects, arrays, and key-value pairs
- The value types JSON supports: string, number, boolean, and null
- How to read a JSON invoice payload shaped like Oracle Fusion's real attributes

## JSON is the shared language of the request/response cycle

**JSON (JavaScript Object Notation)** is a lightweight, text-based
format for structuring data. Oracle Fusion's REST APIs send and receive
JSON almost exclusively — whatever you POST to create an invoice, and
whatever Fusion sends back when you GET one, is JSON text.

## Three building blocks

- **Object `{ }`** — an unordered set of named key-value pairs, almost
  always representing one record, like a single invoice header.
- **Array `[ ]`** — an ordered list of values, often a list of
  objects, like the lines on an invoice.
- **Key-value pair** — a quoted field name, a colon, then its value:
  `"InvoiceAmount": 4250.00`.

## An invoice header as JSON (illustrative shape)

```json
{
  "InvoiceNumber": "INV-20451",
  "InvoiceAmount": 4250.00,
  "InvoiceCurrency": "USD",
  "InvoiceDate": "2026-09-30",
  "PaymentStatusFlag": false
}
```

The field names here mirror the real attribute names Oracle Fusion's
Payables invoice resource uses — `InvoiceNumber`, `InvoiceAmount`,
`InvoiceCurrency`, `InvoiceDate` — though the exact set of fields
returned depends on the specific resource and version.

## Value types

| Type | Looks like | Notes |
|---|---|---|
| String | `"USD"` | Always double-quoted |
| Number | `4250.00` | Never quoted |
| Boolean | `true` / `false` | Unquoted literal |
| null | `null` | Explicitly "no value" — different from omitting the field |

## Common pitfalls

- Keys **must** be double-quoted strings — `InvoiceAmount` without
  quotes is invalid JSON.
- No trailing comma after the last item in an object or array.
- JSON is case-sensitive: `InvoiceAmount` and `invoiceamount` are
  different keys.
## Key terms

| Term | Meaning |
|---|---|
| JSON | A text-based data format used by nearly all modern REST APIs, including Oracle Fusion's |
| Object | A set of key-value pairs in curly braces, usually one record |
| Array | An ordered list of values in square brackets |
| null | An explicit "no value," distinct from a field being absent |

## Check yourself

Write, by hand, a small JSON object representing a customer with a name, an account number, and whether the account is active. Which parts need quotes, and which don't?
