# Script — API Gateways & Load Balancing

## Segment 1 (title)

Lesson 12 ended with a single service and a default domain. Two more pieces usually sit in front of that before real traffic reaches it — and they're not the same job.

## Segment 2 (code: two different jobs)

A load balancer spreads traffic across multiple instances of the same service, so one crashed instance doesn't take the whole app down. An API gateway handles routing, auth, and rate limiting before a request ever reaches your application code. One asks "which healthy instance?" The other asks "should this request even get through?"

## Segment 3 (screenshot: creating a resource)

A real gateway console flow starts with creating a resource. The proxy resource pattern — slash proxy, curly brace, plus — is especially common for AI apps: one resource forwards everything under a path to your backend, which handles its own internal routing from there.

## Segment 4 (screenshot: stage and invoke URL)

Once a resource is wired to a backend, you deploy it to a stage — Prod, Dev — and get a real invoke URL, the public address clients actually call, distinct from your service's own address. That same stage screen is also where rate and burst limits live, enforced at the gateway before your app ever sees the request.

## Segment 5 (screenshot: test method)

You can even test a method directly in the console: a real request, routed through the gateway's own logic, with a real response — no separate HTTP client needed yet.

## Segment 6 (code: why this matters for AI apps)

This matters more for an AI app than a plain CRUD API. Prompt payloads are large, a single inference call is slow and expensive, and one careless client stuck in a loop can hammer a model endpoint fast.

## Segment 7 (outro)

Gateway-level rate limits exist to catch exactly that, before it turns into an enormous autoscaling bill or an outage. Next up: shipping a new version of that service without taking it down — blue-green deployment.
