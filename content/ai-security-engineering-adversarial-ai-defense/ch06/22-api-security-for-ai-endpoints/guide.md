# Lesson 22 — API Security for AI Endpoints

**Chapter 6 · Securing AI Application Architecture · Lesson 2 of 4**

## What you'll learn

- Why every endpoint that fronts a model is still an ordinary API
  first, and why the fundamentals you already own — authentication,
  rate limiting, input validation, output handling — still apply in
  full
- Why rate limiting an AI endpoint by request count alone misses the
  real cost driver, and what a **denial-of-wallet** attack is
- Why input size limits matter differently for a model endpoint than
  for a typical REST API
- Why output filtering has to happen on the way out, not just input
  validation on the way in

## An AI endpoint is still an API

It's easy to treat a model endpoint as a special case that needs its
own security model from scratch. It doesn't. Every endpoint that
accepts a prompt, runs retrieval, or triggers an agent is still an
HTTP API, and everything you already know about securing one still
applies: it needs authentication on every call, authorization checks
scoped to what the caller is allowed to do, rate limiting, input
validation, TLS in transit, and careful handling of whatever it
returns. None of that goes away. What this lesson covers is the
handful of places where an AI endpoint's specific behavior — wildly
variable compute cost per call, large and unstructured input, and
model-generated output instead of a fixed response shape — changes
how those same fundamentals need to be tuned.

## Authentication, scoped the same way it always should be

Every call to a model endpoint needs to be authenticated, whether the
caller is an end user through your application's own auth, or a
service calling the endpoint internally. Service-to-service calls
should use short-lived tokens or mutual TLS rather than a static API
key pasted into a config file, and the credential presented should
scope exactly what that caller is allowed to do — a caller permitted
to query a customer-support model shouldn't hold a credential that
also lets it call an internal admin model with access to more
sensitive data. This is ordinary least-privilege API design; nothing
about it changes because the backend is a language model instead of
a database.

## Rate limiting has to account for cost, not just request count

A traditional API rate limit — a fixed number of requests per minute
— assumes each request costs roughly the same to serve. That
assumption breaks for a model endpoint: a two-sentence prompt and a
prompt that fills the entire context window with pasted documents can
cost orders of magnitude apart in compute, and therefore in money,
even though both are "one request." An attacker who understands this
can launch a **denial-of-wallet** attack — not trying to take the
service down, but deliberately sending expensive, large-context
requests at a rate that stays under a request-count limit while
running up inference cost far faster than normal traffic would.

The defense is rate limiting measured in tokens or estimated compute
cost, not just request count: track input tokens plus a cap on
expected output tokens per caller, over a rolling window, and throttle
or reject once a caller's *cost budget* is exhausted — not just once
their *request count* is exhausted. Pair that with a hard per-request
input size limit (reject prompts beyond a defined token ceiling
outright) so a single call can't consume an outsized share of budget
before the rolling window even notices.

## Input size limits are a cost and attack-surface control, not just hygiene

For a typical REST endpoint, an input size limit mostly guards against
malformed or oversized payloads. For a model endpoint, it's also a
direct cost control and an attack-surface control — a larger context
window gives an attacker more room to embed prompt-injection content,
and it directly drives cost per call. Set an explicit maximum on
prompt length, retrieved-context length, and file upload size for any
multimodal input, enforced at the API layer before anything reaches
the model, not as an afterthought the model itself is expected to
handle gracefully.

## Output filtering: the response needs a security check too

Input validation is only half the job. A model's response is
generated text, not a value your code constructed, so it can contain
things that weren't supposed to leave the building: fragments of
another user's retrieved content if an access-control bug upstream
let it through, PII the model reproduced from its context, or raw
markdown and HTML that gets rendered client-side and becomes a
client-side injection risk if the client trusts it blindly. Before a
response reaches the caller, run it through an output stage: scan for
disallowed content categories, validate against an expected schema
when the response is meant to be structured, and encode or strip
markup the client will render rather than assuming model output is
automatically safe to display as-is.

## Key terms

| Term | Meaning |
|---|---|
| Denial of wallet | An attack that drives up an AI endpoint's compute cost by sending expensive, large-context requests, rather than trying to exhaust a request-count limit |
| Token-based rate limiting | Throttling callers based on consumed or estimated token volume and cost, not just request count, since AI calls vary widely in compute cost |
| Input size limit | A hard ceiling on prompt, retrieved-context, and upload size enforced at the API layer, controlling both cost and prompt-injection attack surface |
| Output filtering | A security check run on model-generated responses before they reach the caller — content screening, schema validation, and safe encoding of rendered markup |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
does a request-count rate limit fail to protect an AI endpoint the
way it would protect a traditional API, and what should a rate limit
measure instead?
