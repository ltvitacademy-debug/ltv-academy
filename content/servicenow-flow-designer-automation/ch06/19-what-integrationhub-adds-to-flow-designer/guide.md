# Lesson 19 — What IntegrationHub Adds to Flow Designer

**Chapter 6 · Integration Hub Actions in Flow Designer · Lesson 19 of 27**

## What you'll learn

- What IntegrationHub actually is, and why it's a separately-licensed add-on in many editions
- The two concrete things it adds to Flow Designer: spokes and the generic REST step
- Why a Script step is usually the alternative without IntegrationHub, and why that's worse
- Where this chapter stops, and where the full IntegrationHub/REST API course picks up

## IntegrationHub, in one sentence

IntegrationHub is ServiceNow's integration add-on. Like Performance Analytics in Course 2 of
this path, it's often a separately licensed capability layered on top of the base platform —
not something every instance has turned on by default. What it buys you, specifically, is the
ability to reach outside ServiceNow from inside a flow, using configuration instead of code.

## The two things it adds

Everything IntegrationHub contributes to Flow Designer falls into two buckets:

**1. Spokes.** A spoke is a packaged, pre-built set of flow actions for one specific external
system. Real examples include the Microsoft Teams Spoke, the Slack Spoke, and the generic REST
and SOAP spokes. Instead of hand-building "send a message to a Teams channel" from scratch, the
Teams Spoke gives you a ready-made action — drop it into a flow, fill in a channel and a message,
done. Someone else already solved the authentication and the API shape for you.

**2. The generic REST step.** Not every external system has a spoke. For everything else,
IntegrationHub adds a REST step — a flow action that calls any REST API directly: you specify a
method, an endpoint URL, headers, a request body, and an authentication profile, all inside the
flow canvas. No spoke required, but also no custom script required.

```
Without IntegrationHub:                 With IntegrationHub:
Script step, hand-written code          Spoke action (Teams, Slack, generic
calling an HTTP library, parsing        REST/SOAP) — configuration, no code
the response manually                   REST step — configured method, URL,
                                         headers, body, auth profile
```

## The real value proposition

Without IntegrationHub, calling an external system from a flow typically means dropping in a
Script step and writing custom code: building the HTTP request by hand, handling authentication,
and parsing whatever comes back. That code lives inside the flow, is harder for a non-developer
admin to maintain, and has to be re-written for every new integration.

With IntegrationHub, a large share of integrations become configuration instead of code. A spoke
turns "call this external system" into filling out a form. The REST step turns "call some other
external system that has no spoke" into filling out a different form — method, URL, headers,
body — rather than writing a script from scratch. You're not eliminating integration work, you're
moving it from custom scripting into structured, reviewable flow configuration.

## Where this chapter stops

This chapter teaches IntegrationHub at the Flow-Designer-usage level: what it adds, and how to
drop a REST step or a spoke action into a flow you're already building. It does not go deep into
REST API design, authentication schemes, or IntegrationHub's scripting surface — that's the full
subject of a later course in this path, "ServiceNow IntegrationHub & REST APIs." Think of this
chapter as "how do I use IntegrationHub inside a flow," and that later course as "how does
IntegrationHub actually work under the hood."

## Key terms

| Term | Meaning |
|---|---|
| IntegrationHub | ServiceNow's integration add-on; often separately licensed, adds spokes and the generic REST step to Flow Designer |
| Spoke | A packaged, pre-built set of flow actions for one specific external system (e.g., Microsoft Teams, Slack) |
| REST step | A generic flow action that calls any REST API by configuring method, URL, headers, body, and auth — no spoke needed |
| Script step | A flow action that runs custom code; the typical fallback for calling external systems without IntegrationHub |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: what are the two concrete
things IntegrationHub adds to Flow Designer, and why does having a spoke for a system (like
Teams) save more work than using the generic REST step for that same system?
