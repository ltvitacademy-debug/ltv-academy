# Lesson 9 — APIs in Integration Architecture

**Chapter 2 · Integration Design · Lesson 9 of 28**

## What you'll learn

- Salesforce's main API families and what each one is actually for, at an architect's level of detail
- What "API-led connectivity" means and the three-layer model (System, Process, Experience) it's built on
- What Named Credentials and External Services are for, conceptually, and how they reduce integration risk
- Why choosing the right API for a given job is itself an architectural decision, not a technical detail

## Salesforce's API families, and what each one is for

Salesforce exposes several distinct APIs, and an architect's job includes matching the right one to the actual integration need rather than defaulting to whichever one a developer already knows. The **REST API** and **SOAP API** both support general-purpose CRUD operations (create, read, update, delete) on records, synchronously, one call at a time or in small batches — REST is the modern default for most new integration work, while SOAP persists mainly in older integrations that haven't been migrated. The **Bulk API** is purpose-built for moving large volumes of data asynchronously: rather than one record per call, it processes data in large batches behind the scenes, which is the right tool for a nightly sync of hundreds of thousands of records rather than hammering the REST API with that many individual calls. The **Streaming API family** (including Platform Events, CDC, and generic/PushTopic streaming) supports the event-driven and asynchronous patterns from Chapter 1. **Metadata API** and **Tooling API** are for working with an org's configuration and development artifacts rather than its business data, and come up more in DevOps/release contexts (covered in other courses) than in day-to-day data integration.

## API-led connectivity: a three-layer model

**API-led connectivity** is the architectural approach Salesforce (through its MuleSoft acquisition) promotes for structuring APIs so they can be reused rather than rebuilt for every new consumer. It organizes APIs into three layers:

- **System APIs** sit closest to a backend system (an ERP, a legacy database, Salesforce itself) and expose that system's data in a stable way, hiding the backend's actual implementation details and quirks behind a consistent interface.
- **Process APIs** sit above System APIs and orchestrate business logic across one or more of them — combining data from several System APIs, applying business rules, and shaping the result into something that matches a business process rather than any one backend's native shape.
- **Experience APIs** sit closest to the actual consumer — a mobile app, a partner portal, a specific UI — and shape data exactly to that consumer's needs, often reusing the same Process API layer underneath for multiple different front-end experiences.

The point of the three-layer split is reuse: a System API built once for an ERP can support many different Process APIs over time, and a Process API can support several different Experience APIs, without rebuilding the backend connection each time a new consumer shows up. This is the direct antidote to the N-squared point-to-point problem from Lesson 3, applied specifically to API design rather than to middleware topology.

## Named Credentials and External Services

**Named Credentials** are a Salesforce feature that bundles a callout's endpoint URL together with its authentication details (OAuth, a password, a certificate, or another supported protocol) into a single reusable reference, so Apex code and declarative tools like Flow can make an authenticated callout without ever hard-coding a URL or a credential directly in code or configuration. This matters architecturally because it centralizes where authentication details live and how they're rotated or updated — change the Named Credential once, and every piece of code or Flow using it picks up the change, rather than hunting down every hard-coded callout. Salesforce's newer Named Credentials model (paired with a separate External Credential for the authentication piece) is the currently recommended approach, with the older legacy Named Credential format being phased out over time.

**External Services** builds on Named Credentials to let an admin register an external API (described by an OpenAPI/Swagger-style specification) and have Salesforce auto-generate invocable actions for it — actions that Flow Builder can call declaratively, without an Apex developer having to hand-write the callout code for each individual operation the external API exposes.

## Key terms

| Term | Meaning |
|---|---|
| Bulk API | Salesforce's API purpose-built for moving large data volumes asynchronously in large batches |
| API-led connectivity | A three-layer API design approach (System, Process, Experience) built for reuse |
| System API | The API layer closest to a backend system, exposing its data through a stable, implementation-hiding interface |
| Process API | The API layer that orchestrates business logic and combines data across one or more System APIs |
| Experience API | The API layer shaped to a specific consumer's needs, often reusing a shared Process API layer |
| Named Credential | A Salesforce feature bundling a callout endpoint and its authentication so credentials aren't hard-coded |
| External Services | A feature that registers an external API by specification and auto-generates Flow-invocable actions for it |

## Lab

A company's mobile app, partner portal, and internal dashboard all need account and order data that lives partly in Salesforce and partly in an ERP. Using the API-led connectivity model, sketch which layer (System, Process, or Experience) you'd build for the ERP connection, which layer combines Salesforce and ERP data into a single "customer order summary," and which layer each of the three consumers (mobile app, partner portal, dashboard) would call — and explain why none of the three consumers should call the ERP's System API directly.

## Check yourself

Can you name Salesforce's main API families and state, for each, the kind of integration job it's actually built for? Can you explain, in your own words, why the System/Process/Experience split exists and how it supports reuse rather than rebuilding a connection for every new consumer?
