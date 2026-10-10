# Lesson 16 — Outbound Messaging and Flow HTTP Callouts

**Chapter 3 · Asynchronous and Event-Based Integration · Lesson 16 of 23**

## What you'll learn

- How legacy Outbound Messaging works: Workflow Rule, SOAP envelope, acknowledgment, retry
- How modern Flow HTTP Callouts work, and what building blocks they share with Apex
- The concrete differences between the two: protocol, format, setup, and era
- Why you'd still encounter Outbound Messaging in an existing org today
- How to decide which one fits a new declarative integration requirement

## Outbound Messaging: the legacy, no-code mechanism

Outbound Messaging predates Flow entirely. It's configured as an **Outbound Message** (defining a target endpoint URL and which fields to send), tied to a **Workflow Rule**, which must be activated for the message to ever fire. When the rule's criteria are met, Salesforce sends a message to the configured endpoint as a **SOAP/XML envelope** — a single message can batch up to **100 notifications** together. Salesforce also generates a WSDL describing the outbound message's exact shape once the rule and message are configured, so the receiving endpoint's developer knows precisely what to expect.

The receiving endpoint has a real responsibility here: it must respond with a SOAP acknowledgment envelope containing `<Ack>true</Ack>` over HTTP 200. If Salesforce doesn't receive that acknowledgment, it **retries sending for up to 24 hours**, backing off at increasing intervals. This built-in retry behavior is one of Outbound Messaging's genuinely useful properties even today — it's more resilient by default than a one-shot callout with no retry logic of its own.

## Flow HTTP Callouts: the modern, declarative mechanism

Starting Spring '23 (GA'd through Winter '24 with POST/PUT/PATCH/DELETE support added incrementally), Flow Builder gained a native **HTTP Callout** action, letting an admin build a callout with no Apex. Setup uses the exact same building blocks as Apex callouts from Chapter 1: an External Credential, a Principal, a Permission Set, and a Named Credential. The admin supplies a sample request and response, and Salesforce parses them into a schema — this generates an **External Service** (Lesson 17), an API spec, and an **invocable action** the Flow can call directly, with no hand-written integration code at all.

Important constraints: Flow HTTP Callouts support **JSON only** (not XML/SOAP), and a callout action can't run when a paused Flow interview resumes, or inside an Apex Queueable context.

## The real contrast

| | Outbound Messaging | Flow HTTP Callouts |
|---|---|---|
| Era | Legacy (pre-Flow) | Modern (Spring '23+) |
| Trigger | Workflow Rule | Any Flow (Record-Triggered, Screen, Scheduled, etc.) |
| Format | SOAP/XML only | JSON only |
| Built-in retry | Yes, up to 24 hours | No — the Flow itself must handle retry logic |
| Setup | Outbound Message + Workflow Rule | Named Credential + sample request/response |
| Batching | Up to 100 notifications per message | One callout per action invocation |

## Why you'll still encounter Outbound Messaging

Workflow Rules themselves are a legacy automation tool Salesforce has steered admins away from for years in favor of Flow, but orgs that adopted Outbound Messaging early often still run it today for established integrations, because its built-in 24-hour retry is genuinely hard to replicate casually, and because "it still works" is a real reason not to touch a stable integration. As an integration developer, you'll more often be maintaining or extending an existing Outbound Messaging setup than building a brand-new one — new declarative work should default to Flow HTTP Callouts instead.

## Key terms

| Term | Meaning |
|---|---|
| Outbound Message | Legacy object defining a SOAP/XML notification's endpoint and fields, tied to a Workflow Rule |
| Ack envelope | The required SOAP `<Ack>true</Ack>` response an endpoint must send to stop Outbound Messaging's retries |
| Flow HTTP Callout action | Modern, declarative, JSON-only callout action built into Flow Builder since Spring '23 |
| Invocable action | What Salesforce generates from a Flow HTTP Callout's sample request/response, usable directly in Flow |

## Lab

Scenario-analysis exercise: an existing org has an Outbound Message configured on Case escalation, sending a SOAP notification to a legacy ticketing system, which has worked reliably for years. A new requirement comes in: notify a modern JSON-based Slack-style webhook whenever a Case is escalated too. Decide, in writing, whether to extend the existing Outbound Message, add a second one, or build a new Flow HTTP Callout for the new requirement — and justify your choice using the comparison table above.

## Check yourself

Name the SOAP acknowledgment an Outbound Messaging endpoint must send, and what happens if it doesn't. Then list two concrete differences between Outbound Messaging and Flow HTTP Callouts from memory.
