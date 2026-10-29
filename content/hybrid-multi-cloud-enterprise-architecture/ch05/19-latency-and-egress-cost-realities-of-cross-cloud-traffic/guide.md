# Lesson 19 — Latency and Egress Cost Realities of Cross-Cloud Traffic

**Chapter 5 · Multi-Cloud Networking and Connectivity · Lesson 3 of 4**

## What you'll learn

- Why cross-cloud latency is both higher and less predictable than
  intra-cloud latency, even over a well-built link from Lesson 17
- The asymmetric shape of cloud data-transfer pricing — inbound data
  is typically free, outbound ("egress") is what gets metered and
  billed — and why that asymmetry is the real lever in multi-cloud
  network design
- Why a chatty, bidirectional service pattern is the most expensive
  possible way to use a cross-cloud link, and what to do instead
- How to decide where a service should actually live when its
  callers and its data are split across two providers

## Latency: real, and less predictable than you're used to

Two services in the same Azure region, same VNet, talk to each other
over infrastructure Microsoft fully controls end to end. Two services
split across Azure and AWS talk to each other over a link that leaves
one cloud's network, crosses a tunnel or a meet-point, and enters
another cloud's network — more hops, and hops that neither cloud's
SLA fully covers on its own. A gateway-to-gateway VPN adds the most
variability, since it still rides the public internet between the two
gateway endpoints; a colocation meet-point is more predictable because
it stays on private infrastructure, but it's still categorically
different from same-region, same-provider traffic. Neither path makes
cross-cloud calls as fast or as consistent as a local one, and a
design that assumes otherwise — a synchronous call chain that hops
clouds two or three times per request — will feel that latency
directly in user-facing response time.

## Egress is the expensive, asymmetric direction

Both Azure and AWS price data transfer the same basic shape: moving
data **into** a cloud from outside is typically free, while moving
data **out** — to the internet, to another cloud, to anywhere outside
that provider's network — is metered and billed per gigabyte. From
either cloud's point of view, the other cloud is simply an external
network, so this asymmetry applies in full to cross-cloud traffic: a
large response sent from AWS back to a caller in Azure is AWS egress,
billed on AWS's side, regardless of how the connection was built in
Lesson 17. That means the direction data flows, not just the volume,
has real cost consequences — and it's a genuinely asymmetric cost,
not a symmetric one, which is easy to miss if you only think in terms
of total bytes moved.

## Why this actually shapes architecture, not just the bill

A service that calls back and forth across the cloud boundary
repeatedly per request — fetch a record from AWS, enrich it in Azure,
write the result back to AWS, log a status update to Azure — pays
egress charges on every leg that crosses the boundary outbound,
multiplied by however often that chatty pattern repeats. That cost
curve is what pushes real multi-cloud designs toward a different
shape: minimize the number of cross-cloud round trips per request,
batch what can be batched instead of calling repeatedly, and cache
results locally in the calling cloud rather than re-fetching them
cross-cloud on every request.

## Deciding where a service should live

When a service's callers are concentrated in one cloud but its data
source lives in the other, the egress asymmetry is a real input into
where that service itself should run — not the only input, but a real
one. Running the service in the same cloud as its heaviest-volume
caller keeps the high-frequency traffic local and intra-cloud, pushing
the cross-cloud leg to the lower-frequency side of the relationship
(a periodic data sync, say, instead of a per-request lookup). That's
not a rule to apply blindly — data gravity, residency requirements,
and the strategic reasons a workload is multi-cloud at all (covered in
Chapter 2) all weigh in too — but ignoring the egress direction
entirely is how a cross-cloud design ends up costing far more than
anyone budgeted for.

## Key terms

| Term | Meaning |
|---|---|
| Cross-cloud latency | The round-trip time for a call that leaves one cloud's network and enters another's, higher and less predictable than intra-cloud calls |
| Egress | Data transfer out of a cloud's network to anywhere external, including another cloud — the direction both Azure and AWS meter and bill |
| Chatty cross-cloud pattern | A service design that makes many small, bidirectional cross-cloud calls per request, multiplying both latency and egress cost |
| Data-flow-aware placement | Choosing where a service runs based partly on which side of a cross-cloud relationship carries the higher-frequency traffic |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
is cloud data-transfer pricing asymmetric rather than symmetric, and
what specific service design pattern turns that asymmetry into a real
architecture problem instead of a minor line item?
