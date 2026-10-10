# Lesson 13 — Pub/Sub API Overview

**Chapter 3 · Applying Events · Lesson 13 of 16**

## What you'll learn

- What the Pub/Sub API is and why Salesforce built it as a successor to CometD-based streaming
- The gRPC/HTTP-2 and Protocol Buffers/Avro foundations that distinguish it from Streaming API
- What a Pub/Sub API client can do that a CometD client cannot do in one unified API
- How a Pub/Sub API event differs from a CometD event in its identifying fields
- When you'd choose Pub/Sub API over `lightning/empApi` or a custom CometD client

## A newer, unified API for external clients

Lesson 5 covered the Streaming API, built on CometD and the Bayeux protocol. The **Pub/Sub API** is Salesforce's newer event-streaming API, aimed primarily at **external, non-Salesforce clients** that need to publish and subscribe to platform events, Change Data Capture events, and other event types. Where a CometD client needs separate mechanisms to discover an event's schema, publish, and subscribe, Pub/Sub API consolidates publishing, subscribing, and schema/topic discovery into a single API — removing the need to build and maintain a custom CometD client, which Salesforce's own developer blog specifically called out as a common pain point for developers without prior CometD experience.

## The technical foundation: gRPC, HTTP/2, Protocol Buffers, Avro

Pub/Sub API is built on **gRPC** over **HTTP/2**, rather than the Bayeux/CometD long-polling model from Lesson 5. This matters practically: gRPC is a language-agnostic RPC framework with generated client code available for many programming languages, so a Pub/Sub API client isn't limited to JavaScript/CometD-style libraries the way a traditional Streaming API integration often was. Event payloads are encoded using **Avro**, a binary serialization format, which a client decodes using the event's published schema (retrieved via the API itself) rather than assuming a fixed JSON shape.

## One API, several capabilities

A single Pub/Sub API client can:

- **Publish** events (platform events) from an external application directly into Salesforce's event bus.
- **Subscribe** to platform events, CDC events, and other supported event types, receiving them as a binary-encoded stream over the gRPC connection.
- **Request schema information** for an event type, so the client knows how to decode a given event's Avro payload without hardcoding field layouts.
- **Request topic information**, confirming details about a channel before subscribing to it.

This is a meaningful difference from the CometD model, where publishing, subscribing, and discovering a PushTopic or event's shape were handled through separate mechanisms rather than one coherent API surface.

## Identifying events: `id` instead of `EventUuid`

Lesson 10 covered `EventUuid`, the field a CometD client (API version 52.0+) can use to uniquely identify a specific platform event message for matching and deduplication purposes. A Pub/Sub API client does not see an `EventUuid` field at all — for Pub/Sub API clients, the event's own `id` field carries that same UUID value instead. If you're building (or reviewing) a subscriber's idempotency logic from Lesson 10 and it's a Pub/Sub API client rather than a CometD/`empApi` one, the field name you check changes even though the underlying concept — a stable, system-generated unique identifier per event message — is exactly the same.

## When to reach for Pub/Sub API

Inside an LWC, you'll keep using `lightning/empApi` (Lessons 3–4) — it already wraps the Streaming API connection for you, and there's no reason to hand-roll a Pub/Sub API client inside Salesforce's own UI layer. Pub/Sub API becomes the right tool specifically for an **external** application — a middleware platform, a custom integration service running outside Salesforce, a data pipeline — that needs to publish or subscribe to Salesforce events without a Salesforce admin building and maintaining a custom CometD client by hand. Salesforce's own materials position Pub/Sub API as the forward-looking choice for new external streaming integrations, while CometD-based Streaming API remains documented and supported for existing integrations already built on it.

## Key terms

| Term | Meaning |
|---|---|
| Pub/Sub API | Salesforce's gRPC/HTTP-2-based event API unifying publish, subscribe, and schema/topic discovery for external clients |
| gRPC | A language-agnostic, HTTP/2-based RPC framework Pub/Sub API is built on |
| Avro | The binary serialization format used to encode Pub/Sub API event payloads |
| `id` field (Pub/Sub API) | The field carrying an event's UUID in Pub/Sub API clients, in place of CometD's `EventUuid` |

## Lab

Write a short comparison table (you can do this in the guide's Markdown style, no code required) contrasting Streaming API/CometD (Lesson 5) with Pub/Sub API on four dimensions: underlying protocol, payload encoding, which field identifies a specific event uniquely, and the kind of client each is best suited for. Then write two sentences recommending which one you'd choose for a brand-new external data pipeline that needs to subscribe to CDC events on `Opportunity`, and why.

## Check yourself

What capability does Pub/Sub API unify into one API that required separate mechanisms under the CometD-based Streaming API? If you're writing idempotency-tracking logic for a Pub/Sub API subscriber instead of a CometD one, which field do you check for the event's unique identifier?
