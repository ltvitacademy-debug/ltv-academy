# Rolling Updates & Rollbacks

Lesson 7 showed that a Deployment swaps an old ReplicaSet for a new one when its template changes. This lesson covers the two knobs that control exactly how that swap happens — `maxUnavailable` and `maxSurge` — and the rollback commands that undo it the moment something goes wrong, like checkout starting to 500 right after a deploy.

## What you'll learn

- The default `RollingUpdate` strategy, step by step
- What `maxUnavailable` and `maxSurge` actually control, with real numbers
- How to watch a rollout in progress and tell if it's stuck
- How to roll back to the previous version in one command

## The default strategy: RollingUpdate

Unless told otherwise, a Deployment updates gradually, never taking the whole service down at once:

```yaml
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1   # at most 1 Pod below desired count at a time
      maxSurge: 1          # at most 1 extra Pod above desired count at a time
```

With `replicas: 10`, `maxUnavailable: 1`, `maxSurge: 1`: Kubernetes can run up to 11 Pods total during the rollout (10 + surge) and never drops below 9 ready (10 - unavailable). It brings up one new Pod, waits for it to pass its readiness probe (Chapter 5), then retires one old Pod, repeating until every Pod runs the new image. Checkout stays reachable the entire time because it's never down to zero.

## Watching a rollout

```bash
kubectl apply -f checkout-deployment.yaml
kubectl rollout status deployment/checkout     # blocks until the rollout finishes or stalls
kubectl get rs -l app=checkout                  # watch old ReplicaSet shrink, new one grow
```

A rollout that's stuck — new Pods crash-looping on the new image — shows up here before customers notice anything, as long as someone is watching `rollout status` or has alerting wired to it.

## Rolling back

If the new checkout image turns out to 500 on every request, don't scramble to find the previous image tag — Kubernetes already remembers:

```bash
kubectl rollout history deployment/checkout            # list past revisions
kubectl rollout undo deployment/checkout                 # revert to the previous revision
kubectl rollout undo deployment/checkout --to-revision=3  # revert to a specific one
```

`rollout undo` works exactly like a forward rollout in reverse — it's still a RollingUpdate, swapping back to the previous ReplicaSet gradually, so the rollback itself never causes a full outage either.

## Pausing a rollout mid-flight

```bash
kubectl rollout pause deployment/checkout     # freeze — useful to inspect a few new Pods before going further
kubectl rollout resume deployment/checkout    # continue
```

Northbridge's platform team uses `pause` when a new checkout version needs a few minutes of manual observation under partial real traffic before committing to a full rollout — the Pods that are already up keep running; nothing new gets scheduled until `resume`.

## Key terms

- **RollingUpdate** — the default Deployment strategy that replaces Pods gradually, never taking the service fully down
- **maxUnavailable** — the maximum number of Pods allowed below the desired count during a rollout
- **maxSurge** — the maximum number of extra Pods allowed above the desired count during a rollout
- **kubectl rollout status** — blocks and reports on an in-progress rollout
- **kubectl rollout undo** — reverts a Deployment to a previous ReplicaSet revision
