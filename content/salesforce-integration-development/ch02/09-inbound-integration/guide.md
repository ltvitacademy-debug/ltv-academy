# Lesson 9 — Inbound Integration

**Chapter 2 · Inbound Integration · Lesson 9 of 23**

## What you'll learn

- The full menu of mechanisms an external system can use to call into Salesforce
- Why Salesforce's standard APIs cover most needs without any custom code
- When Platform Events function as an inbound channel, not just an outbound one
- How inbound integration flips which side owns the contract, compared to outbound
- How to recognize which inbound mechanism a given requirement actually calls for

## The inbound toolbox

An external system that needs to read or write Salesforce data, or trigger Salesforce logic, has several real options:

- **Standard REST API / SOAP API** — Salesforce's own generic, pre-built APIs for CRUD on any standard or custom object. No custom Apex required. This covers the large majority of simple "read/write records" integration needs, and is almost always the right starting point before reaching for custom code.
- **Custom Apex REST web services** (Lesson 8) — a hand-written `@RestResource` class, for custom business logic beyond plain CRUD: validation, multi-object transactions, or a response shape the standard API doesn't produce.
- **Custom Apex SOAP web services** (Lesson 12) — the `webservice` keyword, mainly relevant for legacy enterprise systems that only speak SOAP.
- **Platform Events published from outside Salesforce** — an external system can publish a platform event into Salesforce via the Pub/Sub API or the sObject-based REST API, making event publishing itself a legitimate inbound integration channel, not just something Salesforce does outbound (Lesson 14 covers the Apex side of publishing and subscribing).

## Why "standard API first" is the right default

A lot of integration requirements sound more custom than they actually are. "The ERP needs to create an Account and three Contacts whenever a new customer signs a contract" is plain CRUD — the standard REST/SOAP API handles that with zero custom Apex, and it's immediately versioned, documented, and supported the same way across every Salesforce org. Reaching for a custom Apex REST service when the standard API would do adds a maintenance burden (your own class to patch, test, and keep working across releases) for no real benefit. Custom Apex REST earns its complexity only when the requirement genuinely needs logic beyond CRUD.

## Direction flips who owns the contract

In outbound integration (Chapter 1), Salesforce is the client, so Salesforce code has to adapt to whatever shape the external system's API already expects — Salesforce has no say in that contract. In inbound integration, it's the reverse: Salesforce (or more precisely, the developer building the Apex REST service) defines the contract, and every external caller has to conform to it. This is exactly why Lesson 11 on versioning matters specifically for inbound services — once an external system has integrated against your contract, you can't quietly change it without breaking them, the same way you'd be broken if an external API you called changed shape on you without warning.

## Recognizing which mechanism fits

A quick mental checklist for a new inbound requirement: Is it plain CRUD on standard/custom objects? Use the standard API. Does it need custom logic, validation, or a bespoke response shape, and the caller speaks REST/JSON? Build a custom Apex REST service. Does the caller only speak SOAP? Build a custom Apex SOAP web service. Is the integration really about notifying Salesforce that something happened elsewhere, rather than synchronously fetching or writing a specific record? Consider having the external system publish a platform event instead of calling a request/response endpoint at all.

## Key terms

| Term | Meaning |
|---|---|
| Standard REST/SOAP API | Salesforce's built-in, no-code APIs for CRUD on any object |
| Custom Apex REST/SOAP web service | Hand-written code exposing custom logic beyond plain CRUD |
| Inbound Platform Event publishing | An external system publishing an event into Salesforce via the Pub/Sub or REST API |
| Contract ownership | In inbound integration, Salesforce defines the contract; external callers must conform to it |

## Lab

Scenario-analysis exercise: a partner company needs to (1) create a new Lead whenever someone fills out a form on their own website, (2) check real-time inventory availability before confirming an order on their site, and (3) be notified the moment a Salesforce case status changes to "Escalated," without polling. For each of these three needs, decide which inbound mechanism from this lesson actually fits, and write one sentence justifying each choice.

## Check yourself

List the four inbound mechanisms covered in this lesson from memory. Then explain, in your own words, why "standard API first" is good default advice before reaching for custom Apex REST.
