# Rolling, Blue-Green & Canary Deployments

An approved deployment still has to actually happen without taking the application down — Northbridge Retail can't simply stop every pod running the old version of `storefront-api` and start the new one, because that gap would mean checkout is offline for every customer mid-deploy. This lesson covers three real strategies Kubernetes supports for swapping versions while staying up.

## What you'll learn

- How a rolling update replaces pods gradually, and the two settings that control how gradually
- Why blue-green deployment keeps two complete environments running and switches traffic instantly
- How canary deployment sends a small slice of real traffic to the new version before trusting it fully
- Which strategy fits which situation, and why Northbridge Retail doesn't use just one

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

## Key terms

| Term | Meaning |
|---|---|
| Rolling update | Replacing old pods with new ones gradually, controlled by `maxUnavailable`/`maxSurge` |
| Blue-green deployment | Running two full environments and switching all traffic over in one atomic cutover |
| Canary deployment | Sending a small percentage of real traffic to a new version before trusting it fully |
| Blast radius | How much of real traffic/users is exposed to a new version if it turns out to be broken |
