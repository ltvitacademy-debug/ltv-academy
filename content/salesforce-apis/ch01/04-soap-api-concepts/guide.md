# Lesson 4 — SOAP API Concepts

**Chapter 1 · API Foundations · Lesson 4 of 22**

## What you'll learn

- The two WSDL flavors Salesforce offers, and when each one is the right choice
- The `login()` call, and how session handling differs from REST's bearer token
- The core SOAP operations: create, update, upsert, delete, query, queryMore, retrieve
- Why SOAP still shows up in real integration work despite REST's popularity

## Enterprise WSDL vs. Partner WSDL

Salesforce's SOAP API is described by a WSDL (Web Services Description Language) document, and Salesforce actually publishes two different ones, because they solve different problems:

- **Enterprise WSDL** is generated specifically for one org's current schema — every custom object and custom field your org has is baked in as a strongly typed element. This lets a client generate fully typed code (an `Account` class with an `AccountName` property, for instance), but that generated code has to be regenerated every time the org's schema changes.
- **Partner WSDL** is generic and loosely typed — it works against *any* org without regeneration, representing every record as a generic name/value structure instead of typed classes. Tools and integrations built to work across many different orgs (rather than one specific org) almost always use the Partner WSDL.

## Logging in and session handling

Unlike REST, where you present a pre-obtained OAuth access token on every call, SOAP has its own login call:

```xml
<soapenv:Envelope ...>
  <soapenv:Body>
    <urn:login>
      <urn:username>integration@acme.com</urn:username>
      <urn:password>mypasswordMYSECURITYTOKEN</urn:password>
    </urn:login>
  </soapenv:Body>
</soapenv:Envelope>
```

A successful `login()` call returns two things you need for every subsequent call: a **`sessionId`** and a **`serverUrl`**. Every following SOAP request is sent to that `serverUrl`, with the `sessionId` placed inside a `SessionHeader` element in the request's SOAP header. In practice, most new integrations authenticate with OAuth instead of the raw `login()` call — but the `login()`/`sessionId` pattern is still common in legacy systems built directly against SOAP, and understanding it matters for working with them.

## Core SOAP operations

A small set of calls covers most SOAP API work:

| Call | What it does |
|---|---|
| `create` | Inserts one or more new records |
| `update` | Updates one or more existing records by ID |
| `upsert` | Inserts or updates based on an external ID field |
| `delete` | Deletes one or more records by ID |
| `query` | Runs a SOQL query, returning up to a batch size of results |
| `queryMore` | Fetches the next batch of a `query` result that didn't fit in one response |
| `retrieve` | Fetches specific fields from specific IDs, without a full SOQL query |
| `describeSObjects` | Returns field-level metadata for one or more object types |

```xml
<urn:query>
  <urn:queryString>SELECT Id, Name FROM Account WHERE Industry = 'Technology'</urn:queryString>
</urn:query>
```

## Why SOAP still matters

REST is the default for new Salesforce integrations, and this course reflects that by spending far more time on REST, Bulk, and the newer APIs. But SOAP hasn't disappeared: some enterprise middleware platforms, older ETL tools, and systems built a decade ago against Salesforce's SOAP API are still in production, and they rely on the strongly-typed contract a WSDL provides rather than reading REST documentation. Knowing SOAP's shape means you can recognize it, read it, and reason about it when you inherit or integrate with one of these systems — you don't need to default to building new integrations this way.

## Key terms

| Term | Meaning |
|---|---|
| WSDL | The XML contract document describing a SOAP API's operations and data types |
| Enterprise WSDL | A strongly-typed WSDL generated for one specific org's current schema |
| Partner WSDL | A generic, loosely-typed WSDL that works against any org without regeneration |
| `login()` | The SOAP call that authenticates and returns a `sessionId` and `serverUrl` |
| `sessionId` | The SOAP equivalent of a bearer token, placed in a `SessionHeader` on every subsequent call |
| `queryMore` | The SOAP call used to fetch the next batch of a query result too large for one response |

## Lab

A legacy middleware platform your company inherited integrates with Salesforce using the SOAP API's Enterprise WSDL. Write a short scenario analysis: what has to happen on the middleware side every time an admin adds a new custom field to the `Account` object in Salesforce, and why wouldn't this same problem occur if the integration had used the Partner WSDL instead?

## Check yourself

Can you explain the difference between the Enterprise and Partner WSDL, and name one reason an integration team would deliberately choose each one? Can you describe what a successful `login()` call returns and where those two values get used on every subsequent SOAP call?