# Geographic DR Considerations

Chapter 4 covered synchronous vs. asynchronous Availability Group replicas as a
performance and durability tradeoff. This lesson revisits that tradeoff specifically
through the lens of geography — because where a DR site physically sits changes what's
technically possible, not just what's convenient.

## What you'll learn

- Why network latency makes synchronous replication impractical over real distance
- Regulatory and data-residency considerations that can override a pure technical
  preference
- The real tradeoff between distance and replication lag

## Latency and distance

Synchronous replication (a synchronous AG replica, synchronous mirroring) requires the
primary to wait for confirmation that the secondary has hardened the transaction before
considering it committed. That confirmation has to travel the network round-trip
between sites. Across a data center's internal network, that round-trip is small enough
to ignore. Across a real geographic distance — a different region, a different country
— network latency (bounded by the physical speed of light over fiber, not just
bandwidth) adds real, measurable delay to every single transaction commit. Past a
certain distance, that per-transaction delay becomes unacceptable for application
performance, which is why a geographically distant DR site is almost always run
**asynchronously** — the primary doesn't wait for the distant secondary, accepting some
potential data loss in exchange for the primary's performance staying acceptable.

## The core tradeoff: distance vs. lag

This produces a real, unavoidable tradeoff, not a preference:

- **Close DR site** (same metro area, different building or availability zone) — low
  latency, synchronous replication is realistic, near-zero RPO achievable. But it
  doesn't protect against a disaster that affects the whole region — a regional power
  grid failure, a major regional weather event, a widespread outage that takes out both
  sites at once.
- **Distant DR site** (different region entirely) — genuinely protects against a
  regional disaster, since the two sites don't share regional risk. But the distance
  that provides that protection is exactly what forces asynchronous replication, which
  means accepting a non-zero RPO — some amount of data loss is possible in a real
  failover, proportional to however far behind the asynchronous secondary was at the
  moment of failure.

There is no configuration that gives both zero regional risk and zero replication lag
over real distance — that tradeoff is physics, not a product limitation.

## Regulatory and data-residency considerations

Beyond latency, some organizations don't get to choose the DR site's location purely on
technical merit. Data residency requirements (contractual, or regulatory depending on
industry and jurisdiction) can mandate that data physically stay within a specific
country or region, which constrains where a DR site is even allowed to exist — sometimes
forcing a *closer*, same-jurisdiction option even when a more distant site would
otherwise provide better protection against regional disasters. This is a real
constraint that has to be checked before designing a geographic DR topology, not an
afterthought.

## Bringing it back to the plan

This connects directly to the RPO/RTO lesson earlier in this chapter: a business that
insists on zero data loss *and* protection against a full regional disaster is asking
for something that current network physics doesn't allow over real distance. The
DBA's job is surfacing that tradeoff honestly during planning — not quietly picking one
side of it and hoping it's never questioned during an actual regional event.

## Key terms

| Term | Meaning |
|---|---|
| Network latency | Delay from the physical distance data must travel, which grows with real geographic distance |
| Asynchronous replication | Primary doesn't wait for secondary confirmation — necessary over real distance, accepts potential data loss |
| Regional disaster | An event affecting an entire geographic area — only a genuinely distant DR site protects against it |
| Data residency | Legal/contractual requirement that data remain within a specific geographic or jurisdictional boundary |

## Check yourself

A company wants a DR site "far enough away to survive a regional disaster" but also
wants synchronous replication with zero data loss to that site. Why can't both
requirements be satisfied at once, per this lesson?
