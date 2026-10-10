# Lesson 1 — Salesforce API Overview

**Chapter 1 · API Foundations · Lesson 1 of 22**

## What you'll learn

- Why Salesforce exposes nearly everything through an API, not just a UI
- The major API families this course covers, and the one-sentence job of each
- What all Salesforce APIs have in common: a base URL, a version number, and required authentication
- How this course is organized around "which API, when" rather than one API in isolation

## Everything in Salesforce is API-first

Salesforce was built API-first: almost every action a user can take by clicking in the Salesforce UI — creating a record, running a report query, deploying a new field — has a corresponding API call that does the same thing programmatically. This is why Salesforce has such a large integration ecosystem: any external system, from a custom web app to an enterprise middleware platform, can read and write Salesforce data and metadata the same way a human admin would, just over HTTP instead of a browser.

This course is about that layer. Not building things inside Salesforce with Apex or Lightning Web Components, but talking **to** Salesforce from the outside — or having Salesforce talk to something else.

## The major API families

Salesforce doesn't have one API — it has several, each suited to a different job. This course covers five in depth:

- **REST API** — the default choice for most modern integrations: simple, JSON-based, resource-oriented HTTP calls for querying and manipulating records one or a few at a time.
- **SOAP API** — an older, XML-based, WSDL-contract style of API, still used by some enterprise systems and legacy integrations.
- **Bulk API 2.0** — purpose-built for moving large volumes of data (thousands to millions of records) asynchronously, rather than looping single-record calls.
- **Metadata API** — for deploying and retrieving an org's *configuration* (object definitions, fields, flows, profiles) rather than its data — the API underneath tools like Salesforce CLI and change sets.
- **Streaming API** (and its modern successors, Platform Events and Change Data Capture) — for getting pushed notifications in real time when something changes, instead of repeatedly asking "did anything change yet?"

Later lessons add Composite API and GraphQL API, which don't fetch new kinds of data so much as let you combine or reshape REST-style requests more efficiently.

## What every Salesforce API has in common

Despite their differences, all of these APIs share three things:

1. **A base URL tied to your org.** Most modern integrations use "My Domain" — a URL like `https://yourcompany.my.salesforce.com` — rather than a generic `salesforce.com` login host.
2. **A version number in the request.** REST, SOAP, and Bulk calls all specify an API version (for example `v61.0`). Pinning a version protects your integration from behavior changes in newer versions, even as your org itself upgrades to new seasonal releases.
3. **Required authentication.** No Salesforce API accepts anonymous requests. Virtually every modern integration authenticates with OAuth 2.0 and sends an access token on every call — Lesson 7 covers this in depth.

## How this course is organized

Chapter 1 introduces each API family on its own terms. Chapter 2 gets hands-on with the REST API specifically — authentication, payloads, CRUD, querying, and error handling, since REST is what most new integrations use day to day. Chapter 3 goes deeper on limits, Bulk API 2.0 practice, and Composite requests. Chapter 4 steps back and asks the real architectural question every integration eventually faces: given all these options, which API actually fits this job?

## Key terms

| Term | Meaning |
|---|---|
| API-first | A design philosophy where every UI action has an equivalent programmatic API call |
| My Domain | An org-specific subdomain (`yourcompany.my.salesforce.com`) used as the base URL for API calls |
| API version | A number (e.g. `v61.0`) specified on every REST/SOAP/Bulk call that pins the API's behavior |
| REST API | Salesforce's JSON-based, resource-oriented API for day-to-day record CRUD and queries |
| SOAP API | Salesforce's older, XML/WSDL-based API, still used in legacy enterprise integrations |
| Bulk API 2.0 | Salesforce's API for high-volume asynchronous data loads |
| Metadata API | Salesforce's API for deploying/retrieving org configuration, not application data |
| Streaming API | Salesforce's real-time push-notification API family (PushTopics, Platform Events, CDC) |

## Lab

Without writing any code yet, sketch out (in a short paragraph each) which API family from this lesson you'd reach for in these three situations, and why:

1. A nightly job needs to load 2 million new leads from a marketing system into Salesforce.
2. A mobile app needs to let a field rep look up a single Account and update its phone number while standing in front of a customer.
3. A warehouse system needs to be notified within seconds whenever an Order's status changes to "Shipped," so it can trigger a packing slip print.

You'll revisit this exact exercise with full technical detail in Lesson 20.

## Check yourself

Can you name all five API families this course covers and state, in one sentence each, what each one is for? Can you explain why "API-first" means more than just "Salesforce has an API" — what does it imply about the relationship between the UI and the API?