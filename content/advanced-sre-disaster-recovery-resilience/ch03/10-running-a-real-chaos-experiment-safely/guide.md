# Lesson 10 — Running a Real Chaos Experiment Safely

**Chapter 3 · Chaos Engineering and Resilience Testing · Lesson 2 of 4**

## What you'll learn

- Why blast radius is the first decision in any chaos experiment, and
  why you always start smaller than you think you need to
- What a kill switch and abort criteria are, and why they're defined
  *before* the experiment starts, never improvised mid-run
- Why real chaos experiments run during business hours with the team
  watching — and why a surprise 3 a.m. test is a red flag, not rigor
- What tools like Gremlin and Chaos Mesh actually do at a conceptual
  level, and why neither replaces the discipline above

## Start with the smallest blast radius that teaches you anything

**Blast radius** is the scope of what an experiment can actually
touch — one pod instead of a whole deployment, 1% of traffic instead
of 100%, a single availability zone instead of the whole region. The
single most important safety habit in chaos engineering is starting
with the smallest blast radius that still produces a useful answer,
and only widening it once that smaller experiment has gone well. A
team confident enough in their system to kill one payment-service pod
in production should still do exactly that first — not jump straight
to killing all three — because the first run is also testing whether
their own understanding of the blast radius is correct. If it isn't,
you want to find that out at 1% scale, not 100%.

## Kill switch and abort criteria, defined before you start

Every real chaos experiment has two things decided *before* a single
failure gets injected: an **abort criterion** — a specific, measurable
threshold that means "this experiment is doing real damage, stop" —
and a **kill switch** — the actual mechanism to stop it immediately
and restore normal state. "We'll just watch the dashboards and use our
judgment" is not a kill switch; by the time judgment kicks in during a
live incident, you're often arguing about whether it's bad enough to
stop while it keeps getting worse. A real abort criterion looks like
"if checkout success rate drops below 97% for more than 60 seconds,
abort immediately" — unambiguous, pre-agreed, and written down where
the person running the experiment can act on it without a debate.

## Business hours, with people watching

A chaos experiment that runs unannounced at 3 a.m., with no one
watching, isn't rigorous — it's just an unmonitored outage you
scheduled yourself. Real practice is close to the opposite: run
experiments during business hours, with the team that owns the
service actively watching dashboards, ready to pull the kill switch,
and with other teams aware an experiment is in progress so a real
alert doesn't get misread as a drill. The entire value of controlled
failure injection comes from controlling *when* and *who's watching* —
remove either one and you've just recreated an unplanned incident on
purpose, with none of the safety benefit.

## What tools like Gremlin and Chaos Mesh actually do

You don't need custom scripts to inject failure safely — a
mature ecosystem of tools exists for exactly this. **Gremlin** is a
commercial chaos engineering platform that lets a team dial in
specific "attacks" — CPU exhaustion, added network latency, a
blacked-out dependency — against a chosen, scoped target, with
built-in halt controls. **Chaos Mesh**, a CNCF project built for
Kubernetes, works declaratively: you define the failure as a
Kubernetes custom resource, and the Chaos Mesh controller carries it
out against exactly the pods your selector matches:

```yaml
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: pod-kill-payment-service
  namespace: chaos-testing
spec:
  action: pod-kill
  mode: one
  selector:
    namespaces:
      - production
    labelSelectors:
      app: payment-service
```

That `mode: one` is the blast-radius control — it kills exactly one
matching pod, not every pod with that label. Neither tool is the
safety practice itself; they're the mechanism that makes the practice
from the last two sections easy to execute precisely and easy to stop.

## Key terms

| Term | Meaning |
|---|---|
| Blast radius | The scope of what a chaos experiment can touch — start as small as still produces a useful answer |
| Abort criterion | A specific, measurable threshold, agreed before the experiment starts, that means "stop now" |
| Kill switch | The actual mechanism to immediately halt an experiment and restore normal state |
| Chaos Mesh | A CNCF Kubernetes-native chaos tool; failures are declared as custom resources like `PodChaos` |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
is "we'll use our judgment" not an acceptable abort criterion, and why
does running a chaos experiment during business hours with people
watching make it safer, not less rigorous?
