# Lesson 14 — Dependency Mapping So You Know What's Actually in the Blast Radius

**Chapter 4 · Advanced Disaster Recovery Architecture · Lesson 14 of 32**

## What you'll learn

- Why no one can hold an accurate dependency graph for dozens of
  services in their head, and what has to replace that mental model
- What a real **service catalog** needs to track beyond a name and an
  owner — tier, RTO/RPO, and every upstream/downstream dependency
- Why **discovered** dependencies, found through distributed tracing,
  are often more accurate than **documented** ones
- Why blast radius is the transitive closure of a dependency graph,
  not just the first hop out from the service that failed

## The problem Lesson 13 only showed you a glimpse of

Lesson 13's checkout-and-pricing example had exactly one dependency in
it, and it was still enough to break a failover that looked clean on
paper. Real enterprise estates don't have one dependency between two
services — they have dozens of services, each calling several others,
each of those calling several more. Nobody can correctly answer "what
actually gets affected if this fails" from memory at that scale, no
matter how senior they are or how long they've worked there. Answering
it correctly requires something written down, current, and queryable
— not a diagram someone drew eighteen months ago.

## A real service catalog, not a static diagram

The artifact that replaces "ask the person who's been here longest"
is a **service catalog**: a record, for every service, of who owns
it, what DR tier it's in with its RTO and RPO, and — critically —
exactly what it calls and what calls it. Tools like Backstage exist
specifically to host this as a living system rather than a document,
because the value of a service catalog isn't that it exists once;
it's that it stays accurate as the estate keeps changing. A catalog
that was correct at launch and hasn't been touched since is the same
failure mode as the stale runbook from the previous course — a
document that describes a system that no longer quite exists.

## Documented dependencies and real dependencies aren't the same thing

Here's the uncomfortable part: even a diligently maintained catalog
tends to be wrong, because people document what they intended to
build, not necessarily what actually shipped. A developer adds a
"temporary" synchronous call under deadline pressure, intending to
remove it later, and the architecture diagram never gets updated. Six
months later that call is permanent, load-bearing, and completely
invisible to anyone reading the documented dependency list.

**Distributed tracing** — instrumenting real requests with
OpenTelemetry or similar tooling and following them across service
boundaries — finds what documentation misses, because it's observing
what the system actually does rather than what someone wrote down. A
trace through checkout might confirm the documented calls to
pricing-service and inventory-service, and then also reveal that
inventory-service makes an undocumented synchronous call into a
legacy warehouse database that nobody flagged as a dependency at all.
That coupling is real whether or not it was ever written down, and
the only reliable way to find it is to go looking in the traffic
itself, not the diagram.

## Blast radius is a graph query, not a guess

Once the graph is accurate — ideally kept current by feeding real
trace data back into the catalog, not just updated by hand — blast
radius stops being an educated guess and becomes something you can
actually compute. The blast radius of a failure isn't the one service
that failed; it's the full **transitive closure** of the dependency
graph starting from that service: everything that calls it directly,
everything that calls those callers, and so on outward until the
graph stops producing new nodes. A checkout database failure doesn't
just hit checkout. It hits order-history directly, then reaches
pricing-service and inventory-service, then the legacy warehouse
database and tax-rules-service through those, and finally a
notifications service that reads from order-history and has no idea
checkout even exists.

## Why this has to happen before a failover decision, not after

The payoff of doing this work isn't academic. Before a failover
decision ships — automated or human-approved — the question "what else
is in this blast radius" needs a real answer, because failing over a
service without accounting for everything downstream of it is exactly
how Lesson 13's boundary failure happens at scale: dozens of times,
simultaneously, across an estate nobody fully mapped. The dependency
graph is also what makes Lesson 13's failover domains concrete — a
failover domain isn't a judgment call about which services "feel"
related, it's the services the graph actually says move together.

## Key terms

| Term | Meaning |
|---|---|
| Service catalog | A living record of every service's owner, DR tier, RTO/RPO, and dependencies — not a one-time diagram |
| Discovered dependency | A real coupling found through distributed tracing, as opposed to one that was only ever documented |
| Distributed tracing | Instrumenting real requests to follow them across service boundaries, revealing actual call paths |
| Transitive closure | Every node reachable from a starting point by following dependency edges outward, however many hops it takes |
| Blast radius | The full transitive closure of services, data stores, and shared infrastructure affected by a given failure |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
can a service catalog that was accurate at launch become actively
misleading over time, and why does distributed tracing catch
dependencies that documentation alone reliably misses?
