# Lesson 20 — Which API to Use When

**Chapter 4 · Choosing an API · Lesson 20 of 22**

## What you'll learn

- A single decision framework covering every API this course has taught
- Why "which API" is really a question about volume, timing, and shape of data needed
- Where Metadata API fits, as the one API that moves configuration, not data
- How to justify an API choice out loud, not just make one by instinct

## The decision framework

Every API in this course answers a different combination of three questions: how much data, how urgently, and in what shape?

| API | Best for | Not suited for |
|---|---|---|
| **REST API** | Real-time single/few-record CRUD and queries from web/mobile apps | High-volume batch loads; deeply nested multi-object reads in one call |
| **SOAP API** | Legacy/enterprise systems needing a strongly-typed WSDL contract | New integrations with no existing SOAP dependency |
| **Bulk API 2.0** | Large-volume asynchronous data loads (thousands to millions of records) | Real-time, single-record, user-facing operations |
| **Streaming API / Platform Events / CDC** | Real-time push notification the instant something changes | One-off queries where polling isn't actually a problem |
| **GraphQL API** | Fetching a specific, deeply nested data shape in one round trip | Simple single-object CRUD, where it adds unneeded complexity |
| **Composite API** (incl. Collections, Graph) | Combining several related operations into one call, optionally atomically | Independent operations with no real relationship to each other |
| **Metadata API** | Deploying/retrieving org *configuration* (objects, fields, flows, profiles) | Moving or querying application *data* — that's every other API's job |
| **Salesforce Connect** | Displaying external-system data live, without copying it in | Data that genuinely should live inside Salesforce |

## The one API that's categorically different: Metadata API

Every other row in that table moves **data** — records, the actual business information Salesforce stores. The **Metadata API** moves **metadata** — the definitions that describe what the org *looks like*: custom fields, page layouts, flows, validation rules, profiles. It's the API underneath tools like Salesforce CLI (`sf`) and the change-set deployment process. If a task is "move this configuration from a sandbox to production," that's Metadata API territory, not REST or Bulk — no matter how large or small the amount of configuration is.

## Volume and timing are usually the real question

In practice, most "which API" decisions collapse to two questions. **Volume**: is this a handful of records (REST, Composite) or a genuinely large batch (Bulk API 2.0)? **Timing**: does the caller need an answer right now (REST, synchronous), or is it fine for processing to happen in the background (Bulk, asynchronous)? and separately: does the *other side* need to be told the instant something changes (Streaming/CDC), or is an occasional check-in enough? Getting the shape question (GraphQL vs. REST, Composite vs. plain REST) right matters too, but volume and timing are usually what actually breaks an integration if you get them wrong.

## Key terms

| Term | Meaning |
|---|---|
| Decision framework | Choosing an API based on data volume, timing/urgency, and the shape of data needed |
| Metadata API | The API that moves org configuration, as distinct from every other API in this course, which moves data |

## Lab

For each of these five real-world integration needs, name the single best-fit API from this course and justify your choice in one sentence referencing volume, timing, or shape: (1) A mobile app needs to show one Contact's details when a user taps it. (2) A company needs to deploy 30 new custom fields from a sandbox into production. (3) A nightly job loads 2 million transaction records from an ERP system. (4) A dashboard needs an Account with all its related Contacts and Opportunities in one call, shaped exactly for the UI. (5) A fulfillment system needs to know within seconds whenever an Order's status changes to "Shipped."

## Check yourself

Can you explain, from memory, why Metadata API is categorically different from every other API in this course? Can you walk through the volume/timing/shape framework and apply it out loud to a new scenario you make up yourself?