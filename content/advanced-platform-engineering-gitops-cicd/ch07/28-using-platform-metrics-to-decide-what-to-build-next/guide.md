# Lesson 28 — Using Platform Metrics to Decide What to Build Next

**Chapter 7 · Platform Observability and Developer Experience · Lesson 4 of 4**

## What you'll learn

- How to turn DORA metrics, SPACE signals, and the platform's own
  telemetry from the last three lessons into an actual prioritization
  input, instead of three separate dashboards nobody acts on
- Worked examples of a metric pointing directly at a specific thing
  to build next
- Why metrics alone aren't enough, and how qualitative signals
  (interviews, support tickets, portal usage data) have to triangulate
  with them before you commit real engineering time
- Goodhart's law, and how a platform team avoids turning its own
  metrics into something developers learn to game

## Three lessons of signal, one decision to make

Lesson 25 gave you delivery performance. Lesson 26 gave you developer
experience. Lesson 27 gave you the platform's own operational health.
None of that is worth collecting if it just sits in a dashboard. The
entire point of a platform team instrumenting all three is to answer
one practical question every sprint-planning cycle: given everything
we're seeing, what should we actually build next — not what does the
loudest team in Slack say they want, and not what the platform team
personally finds interesting to build.

## Worked examples: metric to roadmap item

**Lead time is long, and it's dominated by one approval gate.** If
you can see from your lead-time data (Lesson 25) that the median time
between commit and production is small for every pipeline stage
except a manual security sign-off that sits open for two days, you
don't need a survey to tell you what to build: automate that gate
with policy-as-code checks, or give it a committed SLA, before you
build anything else.

**Change failure rate is high, but only for one team's pipeline.**
Aggregate DORA numbers can hide this. If one team's change failure
rate is three times the org average, the fix isn't a platform-wide
initiative — it's targeted: give that specific pipeline better
automated test coverage or a canary/progressive-delivery rollout
(Chapter 5) it currently lacks.

**Time-to-first-deploy is long, and the pulse survey flags
onboarding pain.** When a quantitative signal (Lesson 26's
time-to-first-deploy) and a qualitative one (actual survey comments
about setup friction) point the same direction, that's the strongest
possible case for investing in better golden-path templates and
documentation — stronger than either signal alone.

**CI queue depth is spiking during business hours.** Platform
telemetry (Lesson 27) showing runner queue depth climbing every
weekday at 10am tells you the next investment is capacity or runner
autoscaling, not a new developer-facing feature at all.

## Metrics have to triangulate with qualitative signal

No single number should greenlight a roadmap item by itself. Combine
what the dashboards show with what people actually say: structured
interviews with a handful of engineers, the recurring themes in
platform-support tickets, and usage analytics from the portal itself
(which golden-path templates get used, which get abandoned
half-finished). A metric tells you *where* to look; a conversation
tells you *why* it's happening and whether automating it is even the
right fix.

## Goodhart's law, and why it matters here

Goodhart's law: when a measure becomes a target, people optimize the
measure instead of the underlying goal it was meant to represent.
Lesson 26 already showed one version of this with raw activity counts.
The same risk applies to the platform team's own roadmap decisions —
if "improve deployment frequency" becomes the stated goal, teams might
start splitting trivial changes into extra deploys just to move the
number, without actually shipping value faster. The fix isn't to stop
measuring; it's to keep multiple metrics in view at once (DORA,
SPACE, and platform telemetry together), so gaming one of them shows
up as a visible gap against the others.

## Key terms

| Term | Meaning |
|---|---|
| Triangulation | Confirming a quantitative signal (a metric) against a qualitative one (interviews, tickets, usage data) before committing engineering time to it |
| Goodhart's law | The principle that a measure, once made a target, gets optimized directly — sometimes at the expense of the real goal it stood in for |
| Targeted fix | Addressing a metric problem at the specific team or pipeline where it actually shows up, rather than a platform-wide initiative when the data doesn't support one |

## Check yourself

You're ready for the Chapter 8 capstone when you can explain, without
looking: walk through one example from this lesson where a DORA
metric, a SPACE signal, or a platform telemetry number pointed
directly at a specific thing to build, and explain why you'd still
want a qualitative signal to confirm it before committing real
engineering time.
