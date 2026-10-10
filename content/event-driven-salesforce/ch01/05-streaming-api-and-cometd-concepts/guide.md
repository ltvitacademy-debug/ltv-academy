# Lesson 5 — Streaming API and CometD Concepts

**Chapter 1 · Events in Salesforce · Lesson 5 of 16**

## What you'll learn

- What the Streaming API is, and how it relates to platform events, CDC, and PushTopics
- The Bayeux protocol and CometD, and why Salesforce built on them
- The handshake-then-subscribe sequence every CometD client follows
- What long polling is, and why it's the mechanic underneath "real-time" delivery
- Where `lightning/empApi` fits as a wrapper over this whole layer

## The Streaming API is the transport, not the event type

So far this chapter has covered *what* gets published — platform events (Lesson 2–3) and change events (Lesson 4). The **Streaming API** is the transport layer that actually moves those messages from Salesforce to a subscriber over a long-lived connection, instead of the subscriber asking "anything new?" over and over. It's also how an older event type, **PushTopics** (a declarative, SOQL-query-based notification on standard/custom objects, largely superseded by CDC for new work), gets delivered. When your LWC called `subscribe()` from `lightning/empApi` in Lessons 3 and 4, it was using the Streaming API underneath — `empApi` just hides the protocol details from you.

## Bayeux and CometD

The Streaming API is built on two layers from outside Salesforce:

- **Bayeux** is a protocol for transporting asynchronous messages, mostly over HTTP, defined independently of Salesforce.
- **CometD** is a scalable, HTTP-based event-routing implementation of Bayeux, using a long-held-connection technique generally called "Comet." Salesforce's Streaming API servers run CometD.

You don't need to hand-write CometD client code for an LWC, since `empApi` does that for you — but understanding the handshake/subscribe sequence underneath matters for any external subscriber (a middleware tool, a custom integration client) that talks to the Streaming API directly.

## Long polling, in plain terms

**Long polling** is the mechanic that makes this feel "real-time" without the server needing to open a true persistent socket to every client. The client sends a request; instead of responding immediately with an empty "nothing yet," the server **holds the request open** until an event actually occurs (or a timeout is reached), then sends the full response. The client immediately issues a new request the moment it gets a response, so from the client's perspective there's always an open request waiting for the next thing to happen.

## The handshake-then-subscribe sequence

Every CometD client follows the same order of operations:

1. **Handshake.** The client sends a handshake request to establish the session; this must succeed before anything else can happen.
2. **Subscribe.** Once handshaken, the client subscribes to one or more channels — a platform event channel (`/event/Order_Shipped__e`), a change event channel (`/data/AccountChangeEvent`), or a PushTopic channel (`/topic/MyPushTopic`).
3. **Connect (long poll).** The client issues a long-polling connect request and waits; when an event arrives on a subscribed channel, the server responds with it, and the client immediately reconnects to keep waiting.
4. **Unsubscribe / Disconnect.** The client explicitly unsubscribes from channels it no longer needs, and disconnects when it's done.

A couple of reconnection rules matter for any long-running subscriber: after receiving an event, the client must reconnect quickly or the server will consider the subscription expired and close the connection, forcing a fresh handshake and re-subscribe; and if the connection drops unexpectedly, a successful CometD reconnect still requires the client to **resubscribe**, because a rehandshake clears previous subscriptions. This is exactly why `empApi`'s `subscribe()` call is something you register once per component lifecycle (in `connectedCallback()`) rather than assuming a single subscription survives indefinitely without the library managing reconnection for you.

## Where this fits with Pub/Sub API

Lesson 13 covers the newer **Pub/Sub API**, which Salesforce built on gRPC/HTTP/2 instead of CometD/Bayeux, consolidating publish, subscribe, and schema lookups into a single API and removing the need for a hand-built CometD client. The Streaming API and CometD covered in this lesson remain fully documented and in use — `empApi` subscriptions from an LWC still go through this path — but for a new external, non-Salesforce client built today, Salesforce's own direction points toward Pub/Sub API as the modern choice. You'll see both in real Salesforce environments for the foreseeable future, which is why understanding the CometD mechanics here still matters even as Pub/Sub API becomes the default for new external integrations.

## Key terms

| Term | Meaning |
|---|---|
| Streaming API | Salesforce's CometD-based transport for delivering platform events, CDC events, and PushTopic notifications |
| Bayeux | The underlying protocol for asynchronous message transport over HTTP that CometD implements |
| CometD | The scalable HTTP event-routing implementation of Bayeux that Salesforce's Streaming API servers run |
| Long polling | Holding a client's request open until an event occurs, then responding, with the client immediately reconnecting |
| Handshake | The required first step of a CometD session, before any subscribe or connect can happen |

## Lab

Using the LWC you built in Lesson 3's lab, open the browser's Network tab while the component is on the page and publish an event from Execute Anonymous. Identify, from the network requests, evidence of the long-polling pattern described in this lesson (a request that stays pending until the event arrives, followed immediately by a new one). Write two or three sentences describing what you observed and connecting it back to the handshake-then-subscribe-then-connect sequence, even though `empApi` handled the handshake and reconnect logic for you automatically.

## Check yourself

In your own words, what problem does long polling solve compared to a client that just asks "anything new?" every few seconds? Why must a CometD client resubscribe after an unexpected disconnect and reconnect, even though its original subscribe request already succeeded once?
