# Lesson 9 — What Chaos Engineering Actually Tests For

**Chapter 3 · Chaos Engineering and Resilience Testing · Lesson 1 of 4**

## What you'll learn

- Why chaos engineering is a disciplined, hypothesis-driven practice —
  not "randomly breaking things in production"
- What a **steady-state hypothesis** is, and why an experiment has to
  start with one
- The four-part structure every real chaos experiment follows: steady
  state, hypothesis, real-world failure, comparison
- Where this practice actually came from, and what it is testing that
  load testing and unit tests can't

## It is not what it sounds like

The name "chaos engineering" does the practice a disservice. People
who've only heard the term assume it means something like "let's see
what breaks if we unplug stuff" — mischief with a production
environment. That is not what the discipline that grew out of
Netflix's engineering org in the early 2010s actually is. The team
built **Chaos Monkey**, a tool that randomly terminated production EC2
instances, specifically *because* they had migrated to AWS and needed
confidence that losing an instance wouldn't take down the service —
and they wanted to find out on a Tuesday afternoon with engineers
watching, not during an unrelated outage at 3 a.m. Chaos Monkey was
later open-sourced as part of Netflix's "Simian Army," and it's the
historical root of a now much broader, more rigorous practice. The
"chaos" in the name refers to the unpredictability of real production
failure — not to the discipline of testing for it.

## The steady-state hypothesis

Every real chaos experiment starts the same way a scientific experiment
does: by defining what "normal" looks like, in measurable terms. This
is the **steady-state hypothesis** — a specific, observable signal
that represents the system behaving correctly. Not "the service is
up," but something concrete: checkout success rate stays at or above
99.9%, p99 API latency stays under 400ms, order processing throughput
stays within its normal band. Without a precise steady state defined
*before* the experiment starts, there's nothing to compare against
afterward, and "it seemed fine" is not a result you can act on.

## Form a hypothesis, then inject a real failure

Once steady state is defined, the team forms a hypothesis: "if we kill
one of the three payment-service pods, checkout success rate will stay
at or above 99.9% because traffic reroutes to the remaining two." That
sentence is the whole point of the practice — it's a falsifiable claim
about how the system is *supposed* to behave under a specific,
realistic failure. Then, and only then, the team injects that exact
failure — terminating a pod, introducing network latency between two
services, blacking out a dependency, exhausting CPU on a node — and
watches what the steady-state signal actually does. This is the part
that separates chaos engineering from a thought experiment or an
architecture review: the failure is real, injected against a real
running system, not simulated on a whiteboard.

## Comparing the result to the hypothesis

The experiment ends with a direct comparison: did the steady-state
signal hold, or did it degrade? If checkout success rate held at
99.9%, the hypothesis was confirmed — the system has the resilience
the team believed it had, and that belief is now backed by evidence
instead of assumption. If it dropped to 94%, the hypothesis was wrong,
and the team has just found a real weakness in a controlled setting,
with people watching, instead of finding it during an actual incident.
Both outcomes are useful. That's the core thing chaos engineering
tests for: not "does this specific component work," the way a unit
test does, but whether the *system's actual behavior under real
failure* matches what the team believes about its resilience. Load
testing tells you how the system behaves under volume. Chaos
engineering tells you how it behaves when a piece of it breaks.

## Key terms

| Term | Meaning |
|---|---|
| Steady-state hypothesis | A specific, measurable signal (e.g. checkout success rate ≥ 99.9%) that defines normal system behavior before an experiment starts |
| Chaos Monkey | Netflix's original tool (part of the Simian Army) that randomly terminated production instances to test resilience to real infrastructure failure |
| Blast radius | The scope of a chaos experiment's potential impact — what and how much of the system the injected failure can actually touch |
| Failure injection | Deliberately introducing a real, specific failure (killed process, added latency, blacked-out dependency) into a running system to observe the result |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: what
are the four parts of a real chaos experiment, and why is "checkout
success rate stayed at 99.9%" a usable steady-state hypothesis while
"the service seemed okay" is not?
