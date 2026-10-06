# Lesson 10 — Working with a REST Client

**Chapter 2 · Working with Oracle Fusion REST APIs · Lesson 10 of 19**

## What you'll learn

- What a REST client is and why consultants use one before code is involved
- The pieces of a saved, reusable request: method, URL, auth, headers, parameters
- A repeatable workflow for building, sending, and verifying a request
- Why saving working requests matters for troubleshooting later

## What a REST client is for

A **REST client** (such as Postman or Insomnia, or the command-line
`curl`) is a tool for building, sending, and inspecting HTTP requests
directly — without writing or deploying any integration code. For a
Financials consultant, it's the practical way to:

- **Try a call safely** before an integration tool (like Oracle
  Integration Cloud) is built to depend on it.
- **Inspect the real response** — the exact fields and shape Fusion
  actually returns, rather than relying on documentation alone.
- **Save it for reuse** — a working request becomes a repeatable test
  case for the next person troubleshooting the same integration.

## What a saved request holds

```
Method:  GET
URL:     {{base}}/fscmRestApi/resources/{{v}}/invoices
Auth:    Basic — integration.user
Headers: Accept: application/json
Params:  q=InvoiceStatus='UNPAID'
```

Tools like Postman support variables (like `{{base}}` and `{{v}}`
above) so the same saved request can point at a test versus production
environment without rewriting it.

## A repeatable workflow

1. **Set authentication once**, at the collection level, so every
   request inside it reuses the same credentials automatically.
2. **Build the request** from its pieces — method, URL, query
   parameters, body — the same pieces covered in Lessons 7-9.
3. **Send it and inspect** both the HTTP status code and the response
   body, not just whether it "worked."
4. **Save it**, with a clear name, so it becomes documentation the
   next person can run instead of rebuilding from scratch.
## Key terms

| Term | Meaning |
|---|---|
| REST client | A tool (Postman, Insomnia, curl) for building and testing HTTP requests directly |
| Collection | A saved, organized group of requests sharing settings like authentication |
| Variable | A placeholder (like {{base}}) letting one saved request point at different environments |
| Test case | A saved, repeatable request used to verify or troubleshoot an integration |

## Check yourself

Why is it useful to set authentication once at the collection level in a REST client, rather than re-entering credentials on every individual saved request?
