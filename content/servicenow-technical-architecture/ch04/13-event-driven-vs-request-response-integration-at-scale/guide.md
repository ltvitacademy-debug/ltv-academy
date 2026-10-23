# Lesson 13 — Event-Driven vs. Request-Response Integration at Scale

**Chapter 4 · Integration Architecture · Lesson 13 of 32**

## What you'll learn

- A one-sentence recap of the REST and IntegrationHub mechanics course 7 taught
- What request-response (synchronous) integration actually is, and the real coupling it creates
- What event-driven (asynchronous, pub/sub-style) integration is, and what it genuinely costs to adopt
- Practical architectural guidance for choosing between them at enterprise volume
- Why this is a tradeoff decision, not a "pick the modern-sounding one" decision

## What you already know

Course 7 showed you how to call a REST Message or stand up an
IntegrationHub spoke so one system can talk to another. This lesson
isn't about how to build either connection — it's about a decision
that sits above that mechanics: once volume and the number of
dependent systems grow, should the calling transaction *wait* for an
answer, or should it hand off work and move on?

## Request-response: simple, but tightly coupled

**Request-response** is what most people picture when they think
"integration." A ServiceNow transaction sends a REST call to an
external system and waits for a response before continuing. It's
simple to build and simple to reason about — the code reads top to
bottom, success or failure is known immediately, and there's no
separate infrastructure to maintain for message delivery.

The real cost is coupling. The calling transaction's performance is
now directly tied to the external system's performance. If that
external system is slow, the ServiceNow transaction is slow. If it's
down, the ServiceNow transaction fails or hangs until it times out.
At low integration volume, with a handful of calls to a reliable
system, this is a completely reasonable tradeoff. At enterprise scale
— hundreds of integrations, some to systems the ServiceNow team
doesn't control and can't guarantee the uptime of — that dependency
becomes a real liability, because an outage in someone else's system
can now directly degrade the ServiceNow user's experience.

```
Request-response:
ServiceNow  --REST call-->  External system
            <--waits for response--
Calling transaction's speed = External system's speed
```

## Event-driven: decoupled, but genuinely more complex

**Event-driven** integration flips the relationship. Instead of
calling and waiting, ServiceNow publishes an event ("incident
created," "change approved") to a message channel, and one or more
subscribers pick it up and act on it whenever they're ready. The
calling transaction doesn't wait on the subscriber at all — it fires
the event and moves on.

This is genuinely more resilient. If a downstream subscriber is slow
or temporarily down, the publishing transaction in ServiceNow isn't
affected; the event sits in the channel until the subscriber catches
up. Multiple subscribers can react to the same event independently,
without the publisher needing to know who they are.

The honest tradeoff is complexity. Event-driven systems raise real
questions that request-response mostly avoids: What order do events
need to be processed in, and does that order matter? What happens if
an event is delivered twice — is the subscriber's logic safe to run
twice on the same event (idempotent)? What happens if an event is
never delivered at all — does anything notice and retry? Designing,
implementing, and troubleshooting those guarantees takes real
architectural effort that a simple REST call doesn't require.

```
Event-driven:
ServiceNow  --publishes event-->  Message channel  --delivers-->  Subscriber(s)
            (doesn't wait)                                        (acts independently)
Publisher's speed is independent of any subscriber's speed
```

## Practical guidance: match the pattern to the actual need

Neither pattern is categorically "better" — each fits a different
real situation:

- **Request-response fits** low-volume integrations where the calling
  transaction genuinely needs an immediate answer to continue — for
  example, a form that needs to validate an address against an
  external service before the user can submit it.
- **Event-driven fits** high-volume, loosely-coupled needs where the
  calling system doesn't need to wait for a response — for example,
  every incident update across a large instance needing to flow to a
  downstream analytics platform, where a few seconds or minutes of
  delay is completely acceptable.

The architectural judgment call is recognizing which situation you're
actually in. Defaulting to request-response because it's simpler to
build, for a high-volume integration that doesn't need an immediate
answer, creates unnecessary coupling and a scaling bottleneck.
Defaulting to event-driven for a low-volume integration that genuinely
needs an immediate answer adds complexity the situation never asked
for.

## Key terms

| Term | Meaning |
|---|---|
| Request-response | A synchronous integration pattern where the caller waits for an immediate response |
| Event-driven | An asynchronous, pub/sub-style pattern where the publisher doesn't wait on subscribers |
| Coupling | How directly one system's performance or availability affects another's |
| Idempotent (in this context) | A subscriber's logic produces the same correct result even if an event is delivered more than once |
| Delivery guarantee | A design commitment about whether, and in what order, events are reliably delivered |

## Check yourself

A high-volume integration sends every field service work order update
to a downstream billing system, and the ServiceNow user never needs to
see the billing system's response. It currently uses request-response
and occasionally slows down the technician's update form when billing
is under load. Explain why event-driven is the architecturally correct
fix here, and name one real complexity that adopting it will introduce.
