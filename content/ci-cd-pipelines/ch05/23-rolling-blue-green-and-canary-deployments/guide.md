# Rolling, Blue-Green & Canary Deployments

An approved deployment still has to actually happen without taking the application down — Northbridge Retail can't simply stop every pod running the old version of `storefront-api` and start the new one, because that gap would mean checkout is offline for every customer mid-deploy. This lesson covers three real strategies Kubernetes supports for swapping versions while staying up.

## What you'll learn

- How a rolling update replaces pods gradually, and the two settings that control how gradually
- Why blue-green deployment keeps two complete environments running and switches traffic instantly
- How canary deployment sends a small slice of real traffic to the new version before trusting it fully
- Which strategy fits which situation, and why Northbridge Retail doesn't use just one
- How to make a canary's rollback automatic instead of something an on-call engineer has to decide and trigger by hand

## Rolling update: Kubernetes' default

A **rolling update** replaces old pods with new ones a few at a time, never taking capacity fully offline:

```yaml
spec:
  replicas: 6
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1   # at most 1 pod down at a time
      maxSurge: 1          # at most 1 extra pod above the target count
```

With 6 replicas, `maxUnavailable: 1` means Kubernetes never drops below 5 healthy pods while updating, and `maxSurge: 1` lets it briefly run 7 pods so a new one can come up before an old one is removed. It's simple and the Kubernetes default — but during the rollout, some requests hit the old version and some hit the new one, which matters if the two versions aren't fully compatible with each other's data.

## Blue-green: two full environments, one switch

**Blue-green deployment** runs two complete, identical production environments — "blue" (currently live) and "green" (the new version) — and cuts traffic over all at once:

- Deploy the new version fully to "green" while "blue" keeps serving 100% of real traffic.
- Run final checks against "green" with zero customer exposure.
- Flip a load balancer or Kubernetes `Service` selector so all traffic now hits "green."
- Keep "blue" running, untouched, as an instant rollback target.

The appeal is that there's no in-between state where old and new versions serve traffic simultaneously — the cutover is a single atomic switch. The cost is running two full-size environments at once, even if only briefly.

## Canary: a small slice of real traffic, first

**Canary deployment** sends a small percentage of real traffic to the new version while most traffic still goes to the old one, and watches closely before going further:

- Deploy the new version as a small fraction of total pods (say, 1 out of 10).
- Route roughly 10% of real traffic to it; the other 90% stays on the known-good version.
- Watch error rates and latency on that 10% specifically.
- If healthy, gradually shift more traffic over; if not, roll back the small slice — only a fraction of users were ever affected.

Canary is the strategy best suited to catching a problem that only shows up under real production load or real user behavior — something staging, however production-like, didn't actually reproduce.

## Choosing a strategy

Northbridge Retail doesn't commit to one strategy forever. Routine `storefront-api` releases use a rolling update — simple, no extra infrastructure. A release touching the checkout payment flow uses canary, because the blast radius of a subtle bug there needs to be a small percentage of orders, not every order placed in the next ten minutes. Blue-green comes out for changes where even brief version-mixing is unacceptable — typically changes to the database schema itself.

## Making canary rollback automatic, not manual

"Watch error rates... if not, roll back" above describes canary analysis as something a human
does — reasonable for a first canary release, but it has a real weakness: it only works if
someone is actually watching the dashboard in real time, at exactly the moment a problem starts.
Northbridge Retail's checkout canaries use **Flagger**, a Kubernetes controller that runs that
same watch-and-decide loop automatically, against the Prometheus metrics Lesson 14 territory
(monitoring) already produces:

```yaml
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: checkout
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout
  service:
    port: 8080
  analysis:
    interval: 1m
    threshold: 10       # 10 consecutive failed checks triggers rollback
    maxWeight: 50
    stepWeight: 5        # shift 5% more traffic every interval, if healthy
    metrics:
      - name: request-success-rate
        thresholdRange:
          min: 99
        interval: 1m
      - name: request-duration
        thresholdRange:
          max: 500
        interval: 1m
```

On every `interval`, Flagger checks the canary's real traffic against both thresholds — success
rate must stay at or above 99%, p99 duration at or below 500ms. If both hold, it shifts 5% more
traffic to the canary and tries again; if a check fails enough times in a row to hit `threshold`,
Flagger rolls the canary back to 0% traffic itself, with no human needing to notice the dashboard
degrading and no human needing to run `kubectl rollout undo` under pressure. If the canary
reaches `maxWeight` healthy the whole way, Flagger promotes it to the primary version
automatically.

This doesn't replace the manual rollback mechanics from the next lesson — Flagger's automated
analysis only covers metrics it's told to watch, and a genuinely novel failure mode (one nobody
thought to put a threshold on) can still slip through needing a human response. What it does
remove is the single point of failure in "a person has to be watching, at the right moment, and
has to decide fast enough" for the failure modes that *are* already known and measurable.

## Key terms

| Term | Meaning |
|---|---|
| Rolling update | Replacing old pods with new ones gradually, controlled by `maxUnavailable`/`maxSurge` |
| Blue-green deployment | Running two full environments and switching all traffic over in one atomic cutover |
| Canary deployment | Sending a small percentage of real traffic to a new version before trusting it fully |
| Blast radius | How much of real traffic/users is exposed to a new version if it turns out to be broken |
| Flagger | A Kubernetes controller that automates canary traffic shifting and rollback based on live metric thresholds |
| `thresholdRange` | The acceptable min/max value for a metric Flagger checks on each analysis interval |
