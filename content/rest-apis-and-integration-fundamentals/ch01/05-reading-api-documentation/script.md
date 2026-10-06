# Lesson 5 — Reading API Documentation · Voiceover script

Segments map 1:1 to slides. Chapter 1 · API Foundations · Lesson 5 of 19.

---

## S1 · TITLE CARD

Oracle publishes a dedicated REST API guide for Financials on docs.oracle.com, organized resource by resource — invoices, journals, receivables invoices, and so on — with the documentation version tied to a specific Fusion release, like 25D or 26A.

## S2 · STEPS CARD

Within that guide, each page documents one operation — "Create an invoice," "Get all invoices," "Update an invoice hold." Knowing the structure of these pages is what lets you go from reading documentation to actually sending a working request.

## S3 · STEPS CARD

Every operation page has the same five things. The HTTP method and the resource path. The request parameters you can add to a GET, like q, fields, expand, and limit. The request body schema for a POST or PATCH, listing which fields are required. And the response schema, usually with a worked example payload.

## S4 · CODE CARD

Here's what reading one operation actually looks like: "Create an invoice" is a POST to the invoices path, and the documentation tells you up front which fields are required — BusinessUnit, InvoiceCurrency, InvoiceDate, Supplier, and SupplierSite — before you ever try sending anything.

## S5 · OUTRO CARD

Method, path, parameters, required fields, example response — that's how you read any Oracle Fusion REST doc page. Chapter 2 starts next, where we work with the actual Financials resources themselves.
