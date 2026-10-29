# Lesson 21 — Why Architecture Decisions Need a Written Record

**Chapter 6 · Architecture Decision Records and Documentation · Lesson 1 of 4**

## What you'll learn

- Why an architecture decision that only lives in people's heads doesn't
  actually survive contact with a real team
- How undocumented decisions get silently reversed or re-litigated,
  and why that's more expensive than it looks
- Where the Architecture Decision Record (ADR) idea comes from, and why
  it spread well beyond the team that invented it
- What a written record buys you that a diagram, a Slack thread, or a
  meeting ever can't

## The oral-history problem

Every one of the last five chapters involved a real tradeoff. You picked
hub-and-spoke over a dual transit-gateway topology. You chose RTO/RPO
targets that ruled out an active-active design for one workload and
required it for another. You drew a line around which accounts get
their own landing zone and which share one. In the moment, the reasoning
for each of those calls was obvious to the people in the room.

That's exactly the problem. The reasoning was obvious *to the people in
the room, at that time*. Six months later, half of that context is
gone: someone left the team, the person who remembers the failed
AWS Control Tower pilot moved to a different project, or everyone's
memory of "we picked this because X" has quietly eroded into "I think
we picked this because X, maybe." A brand-new engineer joining the team
has none of that context at all — they only see the current state of
the infrastructure, with no record of what was considered and rejected
to get there.

## How decisions get silently reversed or re-litigated

This shows up in two failure modes, and both are expensive:

1. **Silent reversal.** A new engineer, or even a returning one, looks
   at a piece of infrastructure that seems unnecessarily complicated —
   say, a hub VNet peered to a dozen spokes instead of one flat
   network — and "simplifies" it, because nothing on disk explains why
   the complexity exists. The constraint that justified the design
   (blast-radius isolation across business units, in this case) gets
   removed along with the complexity, and nobody notices until the
   failure mode it was protecting against actually happens.
2. **Re-litigation.** The same debate — active-active vs. active-passive,
   Terraform workspaces vs. separate state files, which account
   boundary to use — gets re-argued from scratch every time a new
   stakeholder joins, because there's no artifact to point to that says
   "we already had this conversation, here's what we decided and why."
   Every re-litigation costs real meeting time, and there's no
   guarantee the second conversation reaches the same, already-correct
   conclusion.

Both failure modes have the same root cause: the decision was made, but
the *reasoning* was never captured anywhere durable.

## Where the Architecture Decision Record comes from

The fix doesn't require new tooling or a heavyweight process. It's a
short text file, checked into version control, written down at the
moment a significant decision is made. Michael Nygard described the
pattern in a widely read 2011 blog post, "Documenting Architecture
Decisions," and the idea was simple: stop writing architecture
documents that describe the current state of a system (which go stale
immediately) and instead write small, dated records that describe one
decision, one time, with the reasoning intact. ThoughtWorks later
listed ADRs on its public Technology Radar as a practice worth
adopting, and the pattern has since spread across the industry — not
because it's clever, but because it solves exactly the problem above at
almost no cost.

## What a written record actually buys you

An ADR doesn't make a decision better. It makes a decision *legible*
to everyone who wasn't in the room — including the future version of
the same team. Concretely, it gives you:

- A permanent answer to "why is it built this way?" that doesn't depend
  on any one person's memory
- A record of the alternatives that were considered and rejected, so
  re-litigation starts from "here's what we already ruled out and why"
  instead of from zero
- An honest list of the tradeoffs accepted at the time — including the
  downsides — so a later engineer can tell whether those tradeoffs
  still make sense as circumstances change
- A timestamped artifact that can itself be revisited, superseded, or
  deprecated, instead of silently ignored or silently broken

The next lesson walks through the actual format — Context, Options
Considered, Decision, Consequences — with a full worked example.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A short, dated, version-controlled text record that captures one architecture decision and the reasoning behind it |
| Oral history problem | The failure mode where the reasoning behind a decision exists only in people's memories and disappears as the team changes |
| Silent reversal | A later engineer undoes a decision because nothing on disk explains why it was made |
| Re-litigation | A settled decision gets re-argued from scratch because no artifact records that it was already decided |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: what
are the two specific failure modes that happen when an architecture
decision is never written down, and why does a short dated text file
fix both of them at once?
