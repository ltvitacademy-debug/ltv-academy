# Lesson 23 — Autoscaling as a Cost Lever, Not Just a Performance Lever

**Chapter 6 · Optimizing Cloud Spend Without Breaking Reliability · Lesson 3 of 4**

## What you'll learn

- Why autoscaling is usually configured only to protect performance,
  and the cost savings this leaves on the table
- How to use a Kubernetes Horizontal Pod Autoscaler (HPA) and a VM
  scale set deliberately as a cost control, not just a safety net
- What "scale to zero" and "scale to minimum off-hours" actually mean
  in practice, and which workloads can safely do it
- Why autoscaling and right-sizing (Lesson 21) are the same discipline
  applied on two different axes

## Autoscaling already exists for a reason — use it for a second one

If autoscaling is already configured on a workload, it's almost always
there to answer one question: "what happens when traffic spikes?" A
Horizontal Pod Autoscaler watches CPU or a custom metric and adds
pods; a VM scale set watches the same kind of signal and adds
instances. That's the performance half of autoscaling, and most teams
stop there.

The other half — and the half this lesson is about — is the same
mechanism run in reverse, deliberately, as a cost control: scaling
**down** aggressively when demand actually drops, instead of coasting
at whatever peak capacity the last traffic spike left behind. Fixed
capacity sized for the worst hour of the week pays for that worst hour
24 times over for every day it isn't actually happening.

## Scale-to-minimum off-hours

Most workloads don't run at the same intensity around the clock. An
internal analytics dashboard used by one time zone, a batch-processing
fleet that only has work overnight, a staging/QA environment that's
only touched during business hours — these all have a cost case for
scaling down hard outside their real usage window, not just
autoscaling up when busy.

Two shapes of this pattern show up constantly in production:

- **Scheduled scale-down** — a known, predictable low-usage window
  (nights, weekends, a staging environment nobody touches after 6pm)
  gets a scheduled minimum replica/instance count lower than the
  always-on floor, often driven by a CronJob-triggered patch to the
  HPA's `minReplicas`, or a scheduled action on the scale set.
- **Scale-to-zero** — for workloads that are genuinely only needed
  on demand (a dev/test environment, an internal tool nobody is using
  at 3am, an event-driven batch job), the minimum isn't just lowered,
  it's set to zero: no running instances at all until a request or a
  trigger arrives. This is the deepest form of the cost lever, and
  it only works for workloads where a brief cold-start delay on the
  first request after idle is acceptable — it is the wrong setting for
  anything a customer expects to be instantly available.

## Setting the floor without breaking reliability

The failure mode to watch for is scaling the minimum down past the
point where the system can actually recover gracefully. A
`minReplicas` of 1 looks like a cost win right up until that one pod
dies during a deploy or a node drain and there's a real availability
gap while the HPA reacts and a replacement schedules. The reliability
guardrail here is the same one from the SLO work in Chapter 7: know
what minimum replica count your error budget can actually tolerate
before you treat "lower" as automatically better.

A workable approach:

- Set the **off-hours minimum** based on real, observed low-traffic
  utilization (the same percentile analysis from Lesson 21) — not a
  guess, and not zero unless the workload is actually tolerant of a
  cold start.
- Keep the **autoscaling ceiling (maxReplicas)** generous enough that
  a real traffic spike during the "off" window — an on-call engineer
  debugging at 2am, an unexpected batch re-run — still gets served
  rather than throttled.
- Test the scale-down and scale-back-up transitions themselves, not
  just the steady states. The actual cost and reliability risk usually
  lives in the transition, not in running at either extreme.

## HPA and VM scale sets as the same lever, two platforms

On Kubernetes, the Horizontal Pod Autoscaler's `minReplicas` and
`maxReplicas` fields are the direct knobs — pairing it with a
`CronJob` or a GitOps-driven scheduled patch gives you the
scheduled-scale-down pattern without needing a separate tool. Many
clusters pair HPA with the Kubernetes Cluster Autoscaler (or Karpenter
on AWS) so that scaling pods down also lets the underlying nodes scale
down, rather than paying for idle nodes with no pods to show for them.

On VM scale sets (Azure VMSS, AWS Auto Scaling Groups), the same idea
applies through scheduled scaling actions — a scheduled action that
drops the desired/minimum instance count during a known off-hours
window, combined with the normal metric-based scaling policy that
still protects against an unexpected spike. The platform differs; the
discipline is identical: don't pay for capacity sized for the loudest
hour of the week around the clock.

## Key terms

| Term | Meaning |
|---|---|
| Horizontal Pod Autoscaler (HPA) | Kubernetes controller that adjusts pod replica count based on observed metrics; `minReplicas`/`maxReplicas` are the cost-relevant floor and ceiling |
| Scale-to-minimum off-hours | Deliberately lowering the autoscaler's floor during a known low-usage window, instead of only scaling up for spikes |
| Scale-to-zero | Setting the minimum running instance count to zero for genuinely on-demand workloads, accepting a cold-start delay on the next request |
| Cluster Autoscaler / Karpenter | The node-level autoscaler that lets underlying VM capacity shrink along with pod count, so scaling pods down actually reduces spend |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
is setting `minReplicas` to zero a reasonable cost decision for one
workload and a reliability mistake for another, and what determines
which category a given workload falls into?
