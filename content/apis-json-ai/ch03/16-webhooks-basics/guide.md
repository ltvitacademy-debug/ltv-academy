# Lesson 16 — Webhooks, Basics

**Chapter 3 · Working With AI Provider APIs · Lesson 16 of 22**

## What you'll learn

- How a webhook flips the normal request direction
- The real shape of a webhook event payload
- How signature verification proves an event actually came from the provider
- Why a webhook handler must respond fast, before doing real work

## The request direction flips

Every API call in this course so far has been you calling a server. A
**webhook** is the opposite: the provider calls *your* server, as an HTTP
POST, the moment something happens — a payment succeeds, a long-running
AI job finishes, a subscription renews. You register a public HTTPS URL
once, and the provider pushes events to it from then on.

## The real event shape

Here's the real shape Stripe sends (the same pattern — `id`, `type`, a
`data.object` payload — shows up across most webhook-sending platforms,
including AI providers that notify you when an async batch job completes):

```json
{
  "id": "evt_1NG8Du2eZvKYlo2C",
  "object": "event",
  "type": "payment_intent.succeeded",
  "created": 1492774577,
  "data": {"object": {"id": "pi_1NG8Du..."}}
}
```

`type` tells your handler what happened; `data.object` carries the actual
resource. One endpoint commonly handles many event types with a simple
`if/elif` (or `switch`) on `type`.

## Proving the event is real: signature verification

Anyone who finds your webhook URL could POST fake JSON to it. Providers
sign every real event, and you verify that signature before trusting the
payload. Stripe's real `Stripe-Signature` header looks like this:

```
Stripe-Signature:
  t=1492774577,
  v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

`t` is a timestamp; `v1` is an HMAC-SHA256 signature computed from the
timestamp, the raw request body, and a secret key only you and the
provider know. If the signature doesn't match what you compute yourself,
reject the request — it either isn't genuine or was tampered with.

## Respond fast, then do the real work

A webhook handler's first job is to return a `2xx` status quickly —
*before* running slow logic like updating a database or calling another
API. If you take too long, the provider treats the delivery as failed and
retries it, which can mean processing the same event twice. Queue the real
work asynchronously and return immediately.

## Key terms

| Term | Meaning |
|---|---|
| Webhook | The provider calling your server, instead of the reverse |
| `type` | Identifies which kind of event this is |
| Signature header | Proves the payload genuinely came from the provider |
| Idempotency | Handling a duplicate-delivered event safely (e.g. via its `id`) |

## Lab

Sketch a webhook handler (pseudocode is fine) that: reads the signature
header, verifies it, returns `200` immediately, and only then looks at
`type` to decide what to do with `data.object`.

## Check yourself

Why must a webhook handler verify the signature *before* trusting anything
in the request body — and why return a fast `2xx` before doing real work?
