# Lesson 1 — Integration Development Overview

**Chapter 1 · Outbound Integration · Lesson 1 of 23**

## What you'll learn

- The difference between outbound and inbound integration, and why that distinction drives which tool you reach for
- The four core integration mechanisms a Salesforce developer uses: Apex callouts, Named Credentials, External Services, and Platform Events
- Where declarative tools (Flow) fit next to Apex for integration work
- Why the synchronous/asynchronous split is the constraint that shapes almost every integration design decision
- How this course is organized, chapter by chapter

## Why integration is its own discipline

Salesforce almost never lives alone. A real org exchanges data with an ERP for order status, a payment gateway for billing, a tax engine for calculating sales tax, a marketing platform for campaign activity, and dozens of other systems depending on the business. "Integration development" is the set of skills for building and maintaining those connections reliably — not just making one callout work once in a sandbox, but making it keep working under load, under failure, and under governor limits in production.

This course assumes you already know core Apex (triggers, classes, SOQL) from earlier courses in this path. What's new here is the vocabulary and tooling specific to talking to systems outside Salesforce.

## Outbound vs inbound: two directions, two toolsets

Every integration has a direction, and the direction changes which side owns the contract:

- **Outbound** — Salesforce initiates a call to an external system. Salesforce is the client. This is Apex HTTP/SOAP callouts, Named Credentials, External Services, and declarative Flow HTTP Callouts — all covered in this chapter and Chapter 3.
- **Inbound** — an external system initiates a call into Salesforce. Salesforce is the server. This is the standard REST/SOAP APIs, custom Apex REST web services, and custom Apex SOAP web services — covered in Chapter 2.

A single business process often needs both directions. A real-time order sync, for example, might have Salesforce push a new order out to a warehouse system (outbound) while that same warehouse system calls back into Salesforce later to report a shipment (inbound).

## The toolbox you'll use in this course

Four mechanisms recur throughout this course:

1. **Apex HTTP/SOAP callouts** — hand-written code that builds a request, sends it, and parses the response. Full control, more code to maintain.
2. **Named Credentials and External Credentials** — the platform's way of storing an endpoint URL and its authentication separately from your Apex, so code never hard-codes a password or token.
3. **External Services** — generate Apex callout code and invocable Flow actions automatically from a third-party API's OpenAPI specification, instead of hand-writing the callout.
4. **Platform Events and Change Data Capture** — an event-driven, publish/subscribe mechanism for integration that doesn't fit the simple "ask a question, get an answer" shape.

Declarative Flow sits alongside all of these. Since Spring '23, Flow Builder can make its own HTTP callouts without Apex, using the same Named Credential and External Service building blocks a developer would use in code. Knowing when a callout belongs in Flow versus Apex is itself a design decision you'll practice in Chapter 4.

## Sync vs async: the constraint that shapes everything

Apex callouts come with a hard platform rule you'll see again in Lesson 7: a transaction can't make a callout while it has pending uncommitted DML, async work, or email in the same transaction. That single constraint is why so much integration code looks the way it does — callouts get sequenced carefully relative to saves, or pushed into `@future` or Queueable Apex so the save and the callout each get their own transaction. Understanding this constraint early will make every later lesson in this course make more sense.

## How this course is organized

- **Chapter 1 (this chapter):** outbound callouts — HTTP, Named Credentials, testing, error handling, limits.
- **Chapter 2:** inbound integration — exposing Salesforce as a web service, authentication, versioning.
- **Chapter 3:** asynchronous and event-based integration — Platform Events, Change Data Capture, External Services.
- **Chapter 4:** stepping back to named integration patterns, choosing between them, two hands-on practice projects, and monitoring integrations once they're live.

## Key terms

| Term | Meaning |
|---|---|
| Outbound integration | Salesforce calls out to an external system |
| Inbound integration | An external system calls into Salesforce |
| Callout | An Apex-initiated HTTP or SOAP request to an external endpoint |
| Named Credential | A platform object storing an endpoint and its authentication, separate from Apex code |
| Governor limits | Platform-enforced resource limits (callouts, DML, CPU time) that every Apex transaction runs within |

## Lab

No org work yet — this lesson is a planning exercise. Pick a fictitious retail company, "Riverstone Outfitters," running Salesforce for sales and service. List four integration needs it plausibly has (for example: syncing orders to a warehouse system, validating addresses at checkout, pulling shipment tracking numbers in, and notifying a marketing platform when a case closes). For each one, write down: is it outbound or inbound, and does it sound like it needs an immediate answer (synchronous) or can it happen in the background (asynchronous)? You'll refine this kind of analysis with real pattern names in Chapter 4.

## Check yourself

Without looking back at the lesson, explain the difference between outbound and inbound integration using your own example. Then name the one governor-limit-driven rule about callouts and pending DML that you'll see again in Lesson 7.
