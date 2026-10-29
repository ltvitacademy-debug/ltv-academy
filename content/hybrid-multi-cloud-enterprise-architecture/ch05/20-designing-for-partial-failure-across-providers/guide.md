# Lesson 20 — Designing for Partial Failure Across Providers

**Chapter 5 · Multi-Cloud Networking and Connectivity · Lesson 4 of 4**

## What you'll learn

- Why Azure and AWS are genuinely independent failure domains, and
  why that independence is a benefit a multi-cloud design has to be
  built to actually use, not one it gets automatically
- How an unguarded cross-cloud dependency lets one provider's
  degradation cascade into the healthy provider through exhausted
  connections and blocked threads
- Concrete patterns — timeouts, circuit breakers, health-check-driven
  failover, graceful degradation — that turn independence into real
  resilience
- Why the Lesson 17 "use both paths" pattern and this lesson's
  partial-failure design are really the same idea applied at
  different layers

## Independent failure domains are a fact, not a feature

Azure and AWS do not go down together. A regional Azure outage has no
mechanism to take down an AWS region, and the reverse is equally true
— the two providers don't share power, don't share networking fabric,
and don't share an incident response team. That independence is
exactly why Lesson 5 and 6's multi-cloud strategy material treats
redundancy as a real motivation for going multi-cloud in the first
place. But independence is a property of the infrastructure, not of
your application. A design that assumes both clouds either work or
both fail together gets none of that benefit — and worse, a design
that doesn't actively account for one side failing while the other
stays healthy can turn a single-provider outage into a platform-wide
one of its own making.

## How an unguarded dependency cascades

Picture a service in Azure that calls a dependency in AWS on every
request, with no timeout configured. If that AWS dependency starts
responding slowly — not down, just degraded — every one of those
calls now hangs rather than failing fast. Each hung call holds a
connection and a thread in the Azure service open and waiting. Enough
of them, and the Azure service runs out of connections or threads
entirely, and a service that was perfectly healthy becomes unavailable
too, purely because it never stopped waiting on a struggling
dependency. The AWS outage caused it, but the Azure outage is the one
users actually see, and it was entirely preventable.

## Patterns that make the independence real

- **Timeouts on every cross-cloud call.** A call that doesn't return
  in a bounded time fails fast instead of hanging indefinitely,
  freeing the connection and thread immediately.
- **Circuit breakers.** After enough consecutive failures or timeouts
  to a specific dependency, stop calling it for a cooldown period
  instead of continuing to pile up failing calls — this is what
  actually stops the cascade described above.
- **Health-check-driven failover.** If a workload has a path through
  either provider (say, read replicas in both, or a service that can
  run in either), active health checks against each provider's path
  let routing move traffic to the healthy one automatically, rather
  than waiting for a human to notice.
- **Graceful degradation.** Decide in advance what a service does when
  its cross-cloud dependency is unavailable — serve the last-known-good
  cached value, skip a non-critical enrichment step, return a reduced
  response — rather than failing the whole request because one piece
  of it was unreachable.

## The same principle, two different layers

Lesson 17 ended on a specific version of this idea: a VPN tunnel
configured as failover for a colocation meet-point circuit, because
two independent paths are what actually makes a connection resilient,
not either path alone. Partial-failure design is that same principle
one layer up the stack — two independent cloud providers are what
actually makes an application resilient to a single vendor's bad day,
but only if the application itself is built to notice one side failing
and keep functioning on the other, instead of assuming failure always
arrives for both at once.

## Key terms

| Term | Meaning |
|---|---|
| Independent failure domain | Infrastructure (Azure, AWS) that can fail without causing the other to fail, due to no shared power, network, or operational dependency |
| Cascading failure | A failure in one system propagating into a healthy system because the healthy system has no protection against the first one's degradation |
| Circuit breaker | A pattern that stops calling a failing dependency after a threshold of failures, instead of continuing to send calls that are likely to fail or hang |
| Graceful degradation | A predefined, reduced-but-functional behavior a service falls back to when a dependency is unavailable, instead of failing the entire request |

## Check yourself

You're ready to move on when you can explain, without looking: how
does an unguarded cross-cloud call with no timeout turn one provider's
degradation into an outage on the healthy provider too, and what
specific pattern stops that from happening?
