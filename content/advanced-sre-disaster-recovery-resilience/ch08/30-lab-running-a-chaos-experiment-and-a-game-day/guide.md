# Lesson 30 — Lab: Running a Chaos Experiment and a Game Day

**Chapter 8 · Capstone: Building a Resilient Enterprise System · Lesson 30 of 32**

## What you'll learn

- How to turn "what if payment is slow" into a real, falsifiable chaos experiment with a stated
  hypothesis and a steady-state metric
- Why abort criteria have to be written down and agreed on before an experiment starts, not
  decided in the moment it starts hurting
- How to design and run a structured game day that rehearses the team, not just the architecture
- Why a chaos experiment and a game day are two different tools, testing two different things

## The scenario, continued

Lesson 29 proved Tier 1's failover plan works for a clean, scoped database and routing failure.
That doesn't prove checkout actually survives a slow or failing dependency while it's still
running — or that the team itself knows what to do during a real outage, not just that a script
exists. This lab runs both tests.

## Part 1 — A real chaos experiment on the payment integration

### Hypothesis, stated before anything runs

```
Hypothesis: If payment-integration's external gateway calls take longer than 2 seconds,
checkout-api's circuit breaker opens within 10 seconds and falls back to "pay on delivery"
instead of hanging the request.

Steady state (must be true before injection): checkout success rate >= 99.5%,
p95 payment latency < 800ms.
```

A chaos experiment is an experiment, not a demolition. Without a hypothesis and a steady state to
compare against, there's no way to say afterward whether anything was actually learned.

### Abort criteria, agreed before injection starts

```yaml
# abort-criteria.yaml -- written down BEFORE the experiment, not decided mid-experiment
abort_if:
  - checkout_success_rate < 98%        # real customers failing, not simulated ones
  - any_order_charged_twice: true      # financial correctness always wins
  - manual_abort_signal: "#chaos-room" # any engineer can call it off, no vote needed
max_blast_radius: "5% of production traffic, canary cohort only"
rollback: "Remove fault injection rule; traffic reverts within 30 seconds."
```

Abort criteria exist precisely so no one has to argue, mid-incident, about whether to stop. If a
threshold is crossed, the experiment ends — that decision was already made in advance.

### Injecting the fault

```bash
# Inject 2.5s of added latency on 5% of payment-integration calls, for 10 minutes.
az chaos experiment start \
  --resource-group rg-wrenhaven-dr \
  --name "payment-latency-canary" \
  --target-service payment-integration \
  --fault-type network-latency \
  --latency-ms 2500 \
  --traffic-percent 5 \
  --duration 10m
```

### Result

The circuit breaker opened at 8 seconds, two seconds inside the hypothesis, and checkout fell back
to "pay on delivery" for the affected canary slice. Checkout success rate held at 99.6% — steady
state preserved. The hypothesis was confirmed, not assumed.

## Part 2 — The game day: rehearsing the team, not the code

A chaos experiment tests the architecture. A game day tests the people — whether the team
actually executes an incident response correctly under simulated pressure.

```
Scenario briefed to the team at 10:00: "East US 2 has gone fully unreachable. Treat this as real
until told otherwise." (Secretly: a tabletop/synthetic drill, no real region is down.)

Roles assigned:
  Incident Commander -- runs the timeline, makes the call to fail over, owns communication
  Scribe             -- timestamps every action and decision in the incident channel
  Comms lead         -- drafts the customer-facing status page update
  Ops                -- actually executes failover-tier1.sh from Lesson 29

Timeline (scribe's real log):
10:00  Scenario briefed. IC declared.
10:02  Ops confirms East US 2 "unreachable" per the drill's injected signal.
10:03  IC calls for Tier 1 failover. Comms drafts status page update.
10:05  Ops runs failover-tier1.sh. Status page published.
10:09  Health check green on Central US. IC declares Tier 1 stable.
10:11  IC asks: "Is anything else silently depending on East US 2 right now?"
```

That last line in the timeline is the one that matters most — and it's exactly what Lesson 31's
case study picks up.

## Debrief, blameless, immediately after

Chapter 7's blameless-culture practice applies here directly: the debrief asks what the plan
missed, not who executed it wrong. Today's finding: the IC's 10:11 question didn't get answered in
the moment, because nobody on the call could say for certain. That open question becomes Lesson
31's starting point.

## Key terms

| Term | Meaning |
|---|---|
| Steady state | The measurable, normal-operating baseline a chaos experiment compares against before and during injection |
| Abort criteria | Thresholds agreed on before an experiment starts that automatically end it, removing mid-incident judgment calls |
| Game day | A structured rehearsal of the team's incident response, testing people and process rather than architecture |
| Blameless debrief | Reviewing what the plan or system missed, not who executed a step incorrectly |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why does a chaos experiment need
abort criteria decided in advance, and why is a game day's incident commander asking "what else
secretly depends on this?" a more valuable outcome than the failover itself completing on time?
