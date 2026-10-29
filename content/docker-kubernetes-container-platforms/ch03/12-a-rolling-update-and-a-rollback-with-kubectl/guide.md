# Lesson 12 — A Rolling Update and a Rollback with kubectl

**Chapter 3 · Kubernetes Architecture & Core Objects · Lesson 4 of 4**

## What you'll learn

- How `kubectl set image` triggers a real rolling update on a running
  Deployment, and what `maxSurge`/`maxUnavailable` actually control
- How to watch a rollout happen live with `kubectl rollout status`
- How Kubernetes keeps a revision history, and how to read it with
  `kubectl rollout history`
- How to undo a bad rollout in seconds with `kubectl rollout undo`,
  and why that's possible at all because of the Deployment/ReplicaSet
  relationship from Lesson 10

## Triggering a rolling update

Picking up the Deployment from Lesson 10, shipping version `1.4.3` is one
command — no new YAML file, no `kubectl delete` first:

```
kubectl set image deployment/web-app web-app=myregistry.azurecr.io/web-app:1.4.3
```

That's the imperative shortcut. The declarative version — the one you'd
actually use in a GitOps pipeline — is editing the image tag in your
manifest and re-applying it:

```
kubectl apply -f deployment.yaml
```

Either way, the Deployment controller does exactly what Lesson 10
described: it creates a **new** ReplicaSet with the updated Pod template,
and starts shifting replicas from the old ReplicaSet to the new one. By
default, the strategy is `RollingUpdate`, and it's controlled by two
fields you can set explicitly in the manifest:

```yaml
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

`maxUnavailable: 0` means the rollout can never drop below 3 *available*
Pods — it must bring a new one fully up before removing an old one.
`maxSurge: 1` means it's allowed to go one *above* the target of 3
temporarily (so briefly 4 Pods exist) while the swap happens. Together
they describe exactly how cautious or how fast the rollout is allowed to
be; `maxUnavailable: 0, maxSurge: 1` is the safest common setting for a
production service that can't take a capacity dip.

## Watching the rollout happen

```
kubectl rollout status deployment/web-app
```

```
Waiting for deployment "web-app" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "web-app" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "web-app" rollout to finish: 1 old replicas are pending termination...
deployment "web-app" successfully rolled out
```

That command blocks until the rollout finishes or fails, which makes it a
natural health gate to put directly inside a CI/CD pipeline step — if the
new ReplicaSet's Pods never pass their readiness probe, this command
times out and returns a non-zero exit code instead of silently hanging.

While it's in progress, `kubectl get replicasets` shows the handoff
directly: the old ReplicaSet's `DESIRED`/`CURRENT` counting down as the new
one counts up.

```
NAME                   DESIRED   CURRENT   READY
web-app-7d9f8c6b5d     0         1         1
web-app-5c8d7f9b4a     2         2         2
```

## Why a rollback is possible at all

Every time you change a Deployment's Pod template, Kubernetes doesn't
delete the old ReplicaSet — it scales it to zero and keeps it around as a
revision record. That's the entire mechanism behind rollback: undoing a
Deployment means scaling a *previous* ReplicaSet back up and the current
one back down, the exact same mechanism as a forward rollout, just run in
the opposite direction.

```
kubectl rollout history deployment/web-app
```

```
REVISION  CHANGE-CAUSE
1         kubectl apply --filename=deployment.yaml
2         kubectl set image deployment/web-app web-app=...:1.4.3
```

`CHANGE-CAUSE` is only populated if you set the
`kubernetes.io/change-cause` annotation (or pass `--record`, deprecated in
newer `kubectl` but still common), so it's worth setting deliberately on
real deployments — otherwise this history is just a list of unlabeled
numbers.

## Rolling back

```
kubectl rollout undo deployment/web-app
```

That reverts to the immediately prior revision. To go back further, name
a specific revision:

```
kubectl rollout undo deployment/web-app --to-revision=1
```

```
kubectl rollout status deployment/web-app
```

```
deployment "web-app" successfully rolled out
```

The rollback itself *is* a rolling update — it respects the same
`maxSurge`/`maxUnavailable` settings, so reverting a bad release is just as
gradual and just as safe as the deploy that caused the problem.
`kubectl get pods` immediately afterward shows Pods running the prior
image tag again, and `kubectl rollout history` now shows a new revision
entry recording the rollback itself — rolling back forward, in effect.

## Key terms

| Term | Meaning |
|---|---|
| `kubectl set image` | Imperatively updates a Deployment's container image, triggering a rolling update |
| `RollingUpdate` strategy | The default rollout strategy; replaces old Pods with new ones gradually rather than all at once |
| `maxSurge` | How many Pods above the target replica count are allowed to exist temporarily during a rollout |
| `maxUnavailable` | How many Pods below the target replica count are tolerated during a rollout |
| `kubectl rollout status` | Blocks until a rollout finishes or fails — usable as a CI/CD health gate |
| `kubectl rollout history` | Lists retained revisions (scaled-down ReplicaSets) for a Deployment |
| `kubectl rollout undo` | Reverts a Deployment to a previous revision by scaling that ReplicaSet back up |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: what
`maxUnavailable: 0` actually guarantees during a rollout, why a rollback is
possible without re-applying an old YAML file, and what command you'd run
to watch a rollout's progress from a CI/CD pipeline step.
