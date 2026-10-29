# Lesson 22 — Writing a Real ADR: Context, Options, Decision, Consequences

**Chapter 6 · Architecture Decision Records and Documentation · Lesson 2 of 4**

## What you'll learn

- The four sections every real Architecture Decision Record needs:
  Context, Options Considered, Decision, and Consequences
- Why each section exists, and what a reader loses if you skip it
- A complete worked ADR, written the way you'd actually commit one
- The most common ways teams write ADRs that look right but fail to
  do their job

## The four-part format

An ADR is deliberately small — usually one Markdown file, often no
more than a page. It is not a design document describing the whole
system; it's a record of one decision, made at one point in time. The
format that has stuck, across the countless variations teams have
tried, is four sections:

- **Context.** The situation that forced a decision to be made. What
  constraint, requirement, or problem made the status quo untenable?
  This section should let a reader with zero prior knowledge understand
  *why a decision was needed at all*.
- **Options Considered.** The real alternatives that were on the
  table, including the one that was rejected and the one that was
  chosen. Listing only the winning option is the single most common way
  ADRs fail — without the rejected alternatives, a reader can't tell
  whether a changed circumstance should reopen the question.
- **Decision.** A direct, unambiguous statement of what was chosen.
  No hedging, no "we're leaning toward" — this is the one place in the
  document that should read like a decision, not a discussion.
- **Consequences.** What follows from the decision — the benefits you
  were going for, and, just as importantly, the downsides you accepted
  to get them. An ADR that lists only upsides isn't a record of a
  tradeoff; it's marketing copy for a decision that was never actually
  weighed against anything.

## A worked example

Here's a real ADR for a decision this course already walked through in
Chapter 3 — choosing a hub-and-spoke network topology over a
dual-transit-gateway design for a multi-region platform:

```markdown
# ADR-0012: Hub-and-Spoke Topology for Multi-Region Network

Status: Accepted
Date: 2026-04-02

## Context
The platform is expanding from a single-region deployment to three
regions, each with multiple application teams' VNets. We need a
network topology that lets every spoke reach shared services (DNS,
firewall, logging) without every spoke having a direct relationship
with every other spoke, and that keeps a compromised or misconfigured
spoke from having a network path to unrelated spokes by default.

## Options Considered
1. **Full mesh peering** — every VNet peered directly to every other
   VNet. Rejected: peering relationships grow quadratically with the
   number of spokes, and there is no natural chokepoint for shared
   firewall or logging enforcement.
2. **Dual transit gateways (one per region pair)** — handles
   cross-region routing well, but still requires each region's VNets
   to peer directly with each other inside the region, which
   reintroduces the mesh problem at the regional level.
3. **Hub-and-spoke, one hub per region, hubs connected by backbone** —
   every spoke peers only with its regional hub; the hub hosts the
   shared firewall, DNS resolver, and egress point; hubs connect to
   each other for cross-region traffic.

## Decision
We will use hub-and-spoke, one hub per region, with all spoke-to-spoke
and spoke-to-internet traffic forced through the regional hub's
firewall.

## Consequences
- Adding a new spoke is a single peering operation against the
  regional hub, not N peering operations against every existing spoke.
- All inter-spoke and egress traffic is inspectable at one chokepoint
  per region, which is what the compliance team required.
- The hub becomes a single point of contention for network throughput
  within a region; we accept this and will monitor hub bandwidth as a
  capacity-planning metric going forward.
- Spoke-to-spoke latency within a region now includes one extra hop
  through the hub, which was measured at under 2ms and judged
  acceptable for this platform's workloads.
```

Notice what that Consequences section does: it states the actual
latency cost and the hub-as-bottleneck risk, in writing, instead of
only listing the win. That's what makes it a real record of a
tradeoff rather than a justification written after the fact.

## Where ADRs commonly go wrong

- **Decision without Context.** "We chose hub-and-spoke" with no
  explanation of what problem made that choice necessary. A reader six
  months later has no way to tell if the original problem still
  applies.
- **No real alternatives.** Listing the chosen option as "Option 1"
  and nothing else isn't Options Considered — it's just restating the
  Decision twice.
- **Consequences that are all upside.** If an ADR's Consequences
  section reads like a sales pitch, the tradeoff either wasn't real or
  wasn't honestly recorded. Every meaningful architecture decision has
  a downside; write it down.
- **No status field.** An ADR needs a `Status` (Proposed, Accepted,
  Deprecated, or Superseded by ADR-XXXX) so a reader immediately knows
  whether the record still reflects reality — the next lesson covers
  diagramming standards, and Lesson 24 covers keeping this status
  current as the system evolves.

## Key terms

| Term | Meaning |
|---|---|
| Context | The section explaining what problem or constraint made a decision necessary |
| Options Considered | The real alternatives evaluated, including the ones rejected |
| Decision | The unambiguous statement of what was actually chosen |
| Consequences | The resulting tradeoffs — upsides and downsides both — accepted by making this decision |
| Status | A field (Proposed/Accepted/Deprecated/Superseded) marking whether an ADR still reflects the current design |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
does an ADR need a documented list of rejected alternatives, and what
goes wrong with a Consequences section that only lists benefits?
