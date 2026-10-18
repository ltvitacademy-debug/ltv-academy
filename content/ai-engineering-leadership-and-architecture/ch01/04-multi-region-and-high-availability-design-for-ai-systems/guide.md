# Multi-Region and High-Availability Design for AI Systems

Lesson 1 named failure modes as one of the four things that change at scale: at real production volume, some component is statistically always degraded somewhere. This lesson covers the architectural response — designing for high availability — and the specific, added failure modes an AI system has on top of what any production software system already deals with: model API outages, rate-limit throttling, and provider-side degradation that a database-only system never has to plan for.

## What you'll learn

- The math behind why redundancy improves availability, and its real-world limits
- AI-specific failure modes beyond ordinary infrastructure outages: model API downtime, rate limiting, silent quality degradation
- Multi-region and multi-provider design as the response to each
- Graceful degradation: what Northbeam's assistant should do when it can't do everything

## The math of redundancy

A single region running at 99.9% uptime sounds solid — until you compute what that actually means in downtime per year:

```python
single_region_uptime = 0.999
annual_downtime_minutes = (1 - single_region_uptime) * 365 * 24 * 60
print(f"Single region: {annual_downtime_minutes:.1f} minutes of downtime per year")
```

```
Single region: 525.6 minutes of downtime per year
```

That's nearly 9 hours a year — a lot, for a customer-facing assistant. Running two independent regions in an active-active configuration, where either one alone can serve all traffic, changes the math: the combined system only fails if *both* regions fail at the same time.

```python
combined_uptime = 1 - (1 - single_region_uptime) ** 2
annual_downtime_minutes_combined = (1 - combined_uptime) * 365 * 24 * 60
print(f"Two independent regions: {combined_uptime:.6%} uptime")
print(f"Two independent regions: {annual_downtime_minutes_combined:.3f} minutes of downtime per year")
```

```
Two independent regions: 99.999900% uptime
Two independent regions: 0.526 minutes of downtime per year
```

Two regions, each individually no better than before, combine to under one minute of downtime a year — **as long as their failures are genuinely independent.** That caveat is not a footnote; it's the entire catch. If both regions depend on the same upstream model API provider, the same shared authentication service, or the same single cloud account's billing system, a failure in any of those shared dependencies takes both regions down simultaneously — and the redundancy math above silently stops being true. Real high-availability design spends as much effort finding and removing shared dependencies as it does standing up the second region.

## AI-specific failure modes beyond ordinary infrastructure

A database-backed web application has a well-understood set of failure modes: the database goes down, a server crashes, the network partitions. An AI system serving requests through a third-party model API has all of those, plus several that are specific to this domain:

- **Model API outage.** The provider hosting the LLM goes down entirely — a failure mode a self-hosted database simply doesn't have, since the critical dependency now sits outside the company's own infrastructure.
- **Rate limiting.** Even when the provider is fully healthy, exceeding a negotiated rate limit causes requests to fail — a failure mode that can appear suddenly during a traffic spike with no warning and no code change on either side.
- **Silent quality degradation.** The provider pushes a model update, and the API keeps returning 200 OK responses — but answer quality quietly drops. This is arguably the hardest of the three to detect, because nothing *looks* broken; Chapter 3 of `ai-security-evaluation-and-monitoring` covers the drift-detection techniques that catch this.

## Responses: multi-region, multi-provider, and graceful degradation

**Multi-region** addresses infrastructure-level outages (a data center or cloud region going down) the same way it would for any web application. **Multi-provider** is the AI-specific extension: architecting the system so a second model provider can be substituted if the primary one has an outage or a rate-limit incident, even if the two providers' outputs aren't perfectly identical. **Graceful degradation** is the honest fallback for when neither option is available: rather than the whole assistant going down, Northbeam's system could fall back to retrieval-only results (showing the matched support documents directly, with no LLM-generated summary) — a worse experience than normal, but a functioning one, instead of a hard failure. Designing *what* the degraded mode actually does, in advance, is real architectural work — a system with no defined degraded mode just goes fully down the moment its primary path breaks.

## Key terms

| Term | Meaning |
|---|---|
| Independent failure | A failure in one redundant component that does not also cause failure in the other — the assumption redundancy math depends on |
| Shared dependency | A single point both "redundant" components actually rely on, which silently breaks the independence assumption |
| Graceful degradation | A system's planned, reduced-functionality fallback mode, used instead of a hard failure when its primary path is unavailable |

## Check yourself

Two regions each independently running at 99.9% uptime combine to 99.9999% uptime — but only under one specific assumption. What is that assumption, and what real-world situation would silently break it?
