# Lesson 16 — Testing Disaster Recovery for Real, Not Just on Paper

**Chapter 4 · Resilience and Disaster Recovery · Lesson 16 of 32**

## What you'll learn

- Why a disaster recovery plan that has never actually been executed
  is a hypothesis, not a working system
- What specifically goes stale in a DR plan over time, and why a
  tabletop walkthrough doesn't catch most of it
- The difference between a tabletop exercise and a real failover
  drill, and why both have a place but only one proves anything
- What to do with a failed DR test — and why a test that fails is more
  valuable than one that "passes" without exercising anything real

## A plan that's never been run is a guess

Every pattern covered in this chapter — multi-AZ, multi-region,
active-active, active-passive — eventually gets written down as a
runbook: which alarms fire, who gets paged, which commands promote the
secondary, how DNS gets repointed, what order services come back up in.
Writing that runbook feels like finishing the job. It isn't. A runbook
describes what *should* happen; it says nothing about whether it
*actually* happens, because the only way to know that is to make it
happen and watch.

This matters because infrastructure drifts constantly, and a document
doesn't drift with it. The DR region's Terraform state can fall behind
production's as new resources get added to one and not the other. A
hardcoded IP address or resource ID in a script written eighteen months
ago can point at something that no longer exists. A secret or credential
scoped to the DR environment can expire quietly, with nothing noticing
until the moment it's actually needed. The engineer who wrote the
runbook can leave the company, taking undocumented context about *why*
a step exists with them. None of that shows up by rereading the document
— it only shows up by running it.

## Tabletop exercises catch some gaps, not most of them

A **tabletop exercise** — walking through the runbook step by step as a
group, narrating what would happen without actually doing it — is a
real and useful practice. It surfaces obvious gaps: a missing owner for
a step, an ambiguous escalation path, a step nobody can explain the
reason for. It's cheap, low-risk, and worth doing regularly.

But a tabletop exercise cannot catch the failures that only show up in
execution: a DNS record with a longer TTL than anyone remembered,
which means traffic keeps hitting the dead region for far longer than
the runbook assumes; a connection string in application config that's
still hardcoded to the primary region's database endpoint; an IAM role
in the DR account that was never actually granted the permission the
runbook assumes it has; a dependency on a regional-only service that
has no equivalent in the failover region at all. Every one of those is
invisible on paper and immediately visible the first time someone
actually tries to fail over.

## A real failover drill is the only thing that proves RTO and RPO

A real drill means actually failing something over — ideally
production itself on a planned schedule, or at minimum a
production-like environment that exercises the same infrastructure,
the same data stores, and the same runbook steps, under conditions
close enough to real that the gaps a tabletop exercise can't see are
forced into the open. This is the practice behind terms like **game
day** and **chaos engineering**: deliberately triggering the failure
condition you're defending against, on your own schedule, so you find
out what breaks while you're the one controlling the blast radius.

A real drill is also the only way to actually measure RTO and RPO,
rather than estimate them. You can calculate that a warm standby
*should* be able to take traffic within fifteen minutes. You find out
whether it actually does by starting a clock and watching DNS
propagate, the secondary promote, and the application come back —
and discovering, often, that the real number is different from the
estimate, for reasons the estimate never accounted for.

## A failed test is more useful than a skipped one

The instinct to avoid running a real DR test — because it's risky, or
because a failed test looks bad — is exactly backwards. A DR test that
fails did its job: it found a gap in the DR region's configuration, an
expired credential, a missing permission, before a real disaster found
it instead, at a moment when there was no controlled way to recover. A
DR plan that has never been tested carries all of that same risk
invisibly; the only difference is that nobody has discovered it yet.
Treating regular, scheduled failover drills as routine — not a one-time
certification exercise, but something repeated as the environment
changes — is what keeps a DR plan describing a system that still
actually works, rather than one that worked on the day someone last
wrote it down.

## Key terms

| Term | Meaning |
|---|---|
| Runbook | The written, step-by-step procedure for executing a failover — describes intended behavior, not proven behavior |
| Tabletop exercise | Walking through a runbook as a group without executing it — catches obvious gaps, not execution-time failures |
| Game day / chaos engineering | Deliberately triggering a real failure condition, on a controlled schedule, to find out what actually breaks |
| Configuration drift | The gradual divergence between a DR environment's actual state and what the runbook assumes about it |
| Failed DR test | A test that surfaces a real gap before a real disaster does — more valuable than a test that passes without exercising anything |

## Check yourself

You're ready to move on when you can explain, without looking: name two
specific kinds of failure — each mentioned in this lesson — that a
tabletop exercise cannot catch but a real failover drill can, and why
the only way to actually measure whether a design meets its RTO and
RPO targets is to run it for real.
