# Lesson 11 — Drift Detection and Automatic Reconciliation

**Chapter 3 · GitOps Principles · Lesson 3 of 4**

## What you'll learn

- What "drift" actually is in a GitOps context, and the everyday ways
  it creeps into a cluster that's supposedly managed entirely by Git
- How a GitOps agent detects drift by continuously diffing live cluster
  state against Git, rather than checking once at deploy time
- The difference between being alerted to drift and automatically
  self-healing it, and why a GitOps agent can do either
- The fourth OpenGitOps principle, **Continuously Reconciled**, and how
  it closes the loop that the first three principles set up

## What drift looks like in practice

You've already seen that a pull-based agent applies manifests from
Git. But nothing stops a human from reaching around that agent and
changing the cluster directly. Picture an on-call engineer, mid-
incident, running:

```
kubectl scale deployment payments-api --replicas=10
```

to throw more capacity at a traffic spike. It works immediately. It
also creates **drift**: the live cluster now says `replicas: 10`, while
Git — the declared source of truth from Lesson 9 — still says
`replicas: 5`. Nobody opened a pull request. Nobody committed anything.
The two no longer agree, and from this point forward, every teammate
who reads the Git repo to understand "what's actually running" is
reading something false.

Drift isn't always this dramatic. It can be a `ConfigMap` edited by
hand to silence an alert, a `Secret` rotated outside the normal
pipeline, or simply someone testing a change directly against
production and forgetting to revert it. Each case has the same shape:
cluster state has departed from Git without Git knowing.

## Detecting drift: continuous diffing, not a one-time check

A GitOps agent like Argo CD or Flux doesn't just apply manifests once
and walk away. It runs a **continuous reconciliation loop** — the same
observe-diff-act pattern you've already met in Kubernetes controllers
themselves, just operating one level up, over whole sets of manifests
instead of individual resource fields:

```
loop forever:
  desired = read manifests from Git
  live    = read actual state from the cluster
  if live != desired:
    mark as OutOfSync / drifted
    (then: alert, or reconcile automatically)
  sleep briefly, or wait for a Git webhook / live-state change event
```

That loop runs whether or not anyone touched Git recently — which is
exactly what catches the `kubectl scale` from the example above. Argo
CD surfaces this as an application-level `OutOfSync` status in its UI;
Flux's controllers expose similar reconciliation status through
Kubernetes conditions you can read with `kubectl describe` or `flux
get`. Either way, the drift is visible and timestamped the moment the
agent's next diff cycle runs — typically within seconds to a few
minutes, not whenever someone happens to notice production behaving
oddly.

## Reconciliation: alert, or self-heal

Once drift is detected, the agent has two possible responses, and which
one it takes is a configuration choice, not a given:

- **Alert only** — surface the `OutOfSync` state and let a human decide
  whether to re-sync (overwrite the live state with Git) or instead
  update Git to match what's now live, if the manual change turns out
  to be one you want to keep.
- **Automatic self-heal** — re-apply the Git-declared manifests without
  waiting for a human, silently reverting the manual `kubectl scale`
  back down to `replicas: 5` on the very next reconciliation pass. In
  Argo CD this is the `selfHeal: true` setting on an `Application`'s
  sync policy.

Self-healing sounds aggressive, and in an incident it can genuinely
undo a well-intentioned manual fix — which is exactly why the right
move during an incident is to commit the real fix to Git immediately,
not to fight the reconciler with repeated manual edits. The upside is
real, though: an agent that automatically reconciles is enforcing the
"Git is the source of truth" claim from Lesson 9 as an actual guarantee
instead of a policy nobody can verify.

## Continuously Reconciled — the fourth OpenGitOps principle

This is the OpenGitOps principle **Continuously Reconciled**: *"Software
agents continuously observe actual system state and attempt to apply
the desired state."* "Continuously" is doing real work in that sentence
— not "on deploy," not "when someone remembers to run a check," but as
an ongoing, standing process. Put all four OpenGitOps principles
together — declarative, versioned and immutable, pulled automatically,
continuously reconciled — and you have the complete definition of
GitOps this chapter has been building toward, one principle per lesson.

## Key terms

| Term | Meaning |
|---|---|
| Drift | Any divergence between live cluster state and the state declared in Git, usually caused by a manual change made outside the normal pipeline |
| Reconciliation loop | The agent's continuous observe-diff-act cycle that compares live state to Git and decides whether to alert or correct |
| OutOfSync | Argo CD's status label for an application whose live state no longer matches its Git-declared manifests |
| Self-healing | Automatically re-applying Git's declared state to overwrite manual drift, without waiting for a human decision |
| Continuously Reconciled | The OpenGitOps principle requiring agents to continuously observe actual state and attempt to apply desired state, not just at deploy time |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what
specifically causes drift, how does a GitOps agent detect it without
anyone reporting a problem, and what's the real difference between an
agent that only alerts on drift and one configured to self-heal?
