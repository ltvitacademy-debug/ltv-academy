# Lesson 2 — APIs, Web Services and Integration Concepts

**Chapter 1 · API Foundations · Lesson 2 of 22**

## What you'll learn

- What a web service actually is, underneath the buzzword
- REST vs. SOAP as two competing design styles, not two unrelated technologies
- HTTP verbs, resources, and statelessness — the vocabulary this entire course relies on
- Synchronous vs. asynchronous integration, and why that choice matters for API selection

## What a web service is

A **web service** is simply a way for two separate software systems to exchange data over a network, using a documented, structured format both sides agree on — as opposed to, say, a human reading a report and typing numbers into another system by hand. Salesforce's APIs are all web services: an external client sends a structured request over HTTP, Salesforce processes it and sends back a structured response.

## REST vs. SOAP

Salesforce supports both major web service styles, and this course teaches both because real integration work still runs into both:

- **REST** (REpresentational State Transfer) treats everything as a **resource**, addressed by a URL, manipulated with standard HTTP verbs (`GET`, `POST`, `PATCH`, `DELETE`). Payloads are typically JSON. REST has no official contract file — you just read the documentation or inspect example calls.
- **SOAP** (Simple Object Access Protocol) wraps every request and response in an XML envelope and is described by a formal contract document called a **WSDL** (Web Services Description Language) file, which a client can use to generate strongly-typed code automatically. SOAP predates REST and is heavier, but that formal contract is exactly why some legacy enterprise middleware still prefers it.

Neither is "wrong" — they're different trade-offs between flexibility (REST) and formal, generated-code contracts (SOAP). Lesson 3 and Lesson 4 cover each in Salesforce-specific detail.

## HTTP verbs and resources

Every REST call in this course uses one of four HTTP verbs, each with a conventional meaning:

```http
GET    /resource        -- read
POST   /resource         -- create
PATCH  /resource/{id}    -- update (partial)
DELETE /resource/{id}    -- delete
```

A **resource** is just the "noun" the URL addresses — an Account record, a list of query results, an org's API limits. The verb is the "verb" acting on that noun. This noun/verb split is the core idea behind every REST API Salesforce exposes.

## Statelessness

REST APIs (and Salesforce's REST API specifically) are **stateless**: each request carries everything the server needs to process it — including an authentication token — and the server doesn't remember anything about a previous request when handling the next one. This is why every single API call, not just the first one, must include a valid access token in its `Authorization` header. There's no server-side "session" the way a logged-in browser tab has one; each call stands alone.

## Synchronous vs. asynchronous integration

Not every integration happens, or should happen, instantly:

- **Synchronous** calls (most REST and SOAP calls) wait for an immediate response — the caller is blocked until Salesforce replies, suited to a user-facing action like looking up a single record.
- **Asynchronous** calls (Bulk API 2.0 is the clearest example) submit a job and return immediately with a job ID; the actual processing happens in the background, and the caller polls or gets notified later when it's done. This is the right model for work that takes minutes, not milliseconds — loading a million records synchronously would time out and doesn't match how a human or system actually needs to consume that result.

Choosing synchronous vs. asynchronous, and REST vs. SOAP, are both decisions this course keeps returning to, because picking the wrong style for the job is one of the most common integration mistakes.

## Key terms

| Term | Meaning |
|---|---|
| Web service | A structured way for two systems to exchange data over a network |
| REST | A resource-oriented API style using URLs, HTTP verbs, and (usually) JSON, with no formal contract file |
| SOAP | An XML-envelope API style described by a formal WSDL contract document |
| Resource | The "noun" a REST URL addresses (a record, a query result, a limits report) |
| Stateless | Each API request is self-contained; the server retains no memory of previous requests |
| Synchronous call | A request the caller waits on for an immediate response |
| Asynchronous call | A request that returns a job reference immediately while processing continues in the background |

## Lab

Take these four real integration requirements and classify each one as synchronous or asynchronous, and explain your reasoning in a sentence:

1. A point-of-sale terminal needs to check a customer's loyalty points balance while they're standing at the register.
2. An overnight batch job needs to import 500,000 historical transaction records once a month.
3. A support agent's screen needs to show a case's current status the instant they open it.
4. A data warehouse needs to pull every Opportunity that changed in the last 24 hours, once a night.

## Check yourself

Can you explain, without looking, the difference between REST and SOAP in terms of contract and payload format? Can you explain what "stateless" means for why every single REST call needs its own authentication token, even the tenth call in a row from the same client?