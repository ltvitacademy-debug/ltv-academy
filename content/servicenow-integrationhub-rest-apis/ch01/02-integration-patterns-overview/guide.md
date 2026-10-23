# Lesson 2 — Integration Patterns: Overview

**Chapter 1 · Integration Fundamentals · Lesson 2 of 29**

## What you'll learn

- The three integration pattern categories that cover nearly every real ServiceNow integration: inbound, outbound, and event-driven/bidirectional
- The two concrete inbound mechanisms you've already touched — Scripted REST APIs and Import Sets — and when each fits
- Outbound integration via REST Messages and IntegrationHub spoke actions
- How to choose a pattern: who initiates the data movement, and how real-time it needs to be

## Inbound: data pushed into ServiceNow

An inbound integration is any case where an external system pushes data **into** ServiceNow. You've already built the receiving end of one inbound mechanism in course 6: a **Scripted REST API** is a custom endpoint you define on the ServiceNow instance, and an external system calls it — typically with an HTTP POST carrying a JSON payload — to create or update records. This is the right fit when the external system can initiate an HTTP call itself and you need the data to land quickly, often in near real time.

The other inbound mechanism, covered in course 2 of this path, is **Import Sets** — staging tables that take in data (often from a scheduled file drop, like a nightly CSV export from an HR system) and transform it into target tables through a Transform Map. Import Sets fit when the external system can't call an API directly, or when the data arrives in a batch rather than as discrete events — a nightly payroll extract is a batch; a single new-hire event firing the moment HR finalizes it is not.

## Outbound: ServiceNow calling out

An outbound integration is the mirror image: ServiceNow initiates the call, reaching out to an external system to pull data in or push an action out. Starting in the next chapter, you'll build this with a **REST Message** record — a reusable definition of an HTTP endpoint (URL, headers, authentication, and one or more named HTTP methods) that a Business Rule, Script Include, or Flow can invoke whenever ServiceNow's own process needs to reach outside itself. A Change Request getting approved and triggering a call to a deployment tool, described in Lesson 1, is a REST Message in action.

IntegrationHub, covered starting in Chapter 5, builds on the same outbound idea at a higher level: a **spoke** packages a REST Message (or several) behind a reusable, drag-and-drop **action** that a Flow Designer flow can call without anyone hand-writing the HTTP details each time. IntegrationHub doesn't replace REST Messages — it wraps them in a layer that's easier to reuse and maintain across many flows.

## Event-driven and bidirectional patterns

The third category doesn't fit neatly into "ServiceNow calls out" or "something calls ServiceNow" as a single request/response. **Event-driven integration** is built around something happening — an event — immediately producing a notification that's pushed to whoever's listening, rather than either side having to repeatedly ask "has anything changed yet?" A webhook that fires the instant a record changes in an external system, which ServiceNow receives and reacts to, is event-driven. So is the monitoring-tool-creates-an-Incident example from Lesson 1: the outage is the event, and the Incident creation is the near-real-time reaction to it, not a scheduled check.

Many production integrations end up **bidirectional** in practice even if no single call is bidirectional: ServiceNow receives new Incidents from a monitoring tool (inbound/event-driven) and also pushes Incident status changes back out to that same tool so its dashboard stays current (outbound). Thinking of this as one mechanism doing two things is the wrong mental model — it's two separate, simpler patterns running side by side.

## Choosing the right pattern

Three questions settle almost every pattern choice:

- **Who initiates the data movement?** If the external system has the trigger, you need an inbound mechanism (Scripted REST API or Import Set). If ServiceNow's own process has the trigger, you need an outbound mechanism (REST Message or spoke action).
- **How real-time does it need to be?** A nightly batch extract fits Import Sets; a this-second notification fits a Scripted REST API call or an event-driven webhook.
- **Can the external system make outbound HTTP calls at all?** Some legacy systems genuinely can't — which is exactly when a scheduled, file-based Import Set is still the right answer today, even though it looks old-fashioned next to a webhook.

## Key terms

| Term | Meaning |
|---|---|
| Inbound integration | An external system pushes data into ServiceNow (Scripted REST API or Import Set) |
| Outbound integration | ServiceNow initiates a call out to an external system (REST Message or IntegrationHub spoke action) |
| Event-driven integration | A pattern triggered by something happening, pushing a notification immediately rather than being polled |
| Bidirectional | Two separate inbound/outbound patterns running side by side to keep both systems in sync |
| Spoke | An IntegrationHub package of reusable, drag-and-drop actions built on top of REST Messages |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: a legacy mainframe billing system can only export a flat file once a night and cannot accept any inbound HTTP calls. Which pattern category does that constraint point to, and why would a Scripted REST API be the wrong tool here even though it's the more "modern" option?
