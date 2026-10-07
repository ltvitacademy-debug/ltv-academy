# Rollback Strategies for Models

Every deployment strategy you've seen so far — canary, shadow, and blue-green still to come — exists mainly to make one thing possible: catching a bad model before it does damage, and undoing it fast when something slips through anyway. A rollback strategy that only exists in someone's head doesn't count. It has to be something you can execute in minutes, under pressure, without re-deriving it from scratch.

## What you'll learn

- The difference between an infrastructure rollback and a model rollback
- How to roll back a Kubernetes-based deployment with `kubectl rollout undo`
- How to roll back a model served via an alias without touching infrastructure at all
- What should trigger an automatic rollback vs. requiring a human decision
- Why rollback speed depends on decisions made earlier, at packaging and registry time

## Two different things called "rollback"

"Roll back the model" can mean two genuinely different operations, and conflating them is a common source of confusion during an incident:

1. **Infrastructure rollback** — revert the serving deployment (the container, the `InferenceService`, the Kubernetes `Deployment`) to a previous revision. This undoes a bad *deploy*, including a bad config change, not just a bad model.
2. **Model rollback** — point the serving layer back at a previous *model version*, often without redeploying any infrastructure at all, by moving a registry alias or a traffic weight back.

Model rollback is almost always faster, because it doesn't require rebuilding or rescheduling anything — it's a pointer change.

## Infrastructure-level rollback

```bash
kubectl rollout undo deployment/fraud-detector -n ml-serving
kubectl rollout status deployment/fraud-detector -n ml-serving
```

`kubectl rollout undo` reverts to the previous `ReplicaSet` Kubernetes already has on hand — it works because Kubernetes keeps a revision history by default. This is the right tool when the problem is the deployment itself (a bad resource limit, a broken startup probe), not just the model's predictions.

## Model-level rollback via alias

If you've been using a model registry with aliases (Lesson 11), rollback can be a single API call that never touches Kubernetes:

```python
client.set_registered_model_alias(
    name="fraud-detector", alias="champion", version=3
)
```

Moving `@champion` back to version 3 takes effect the next time a serving job resolves the alias — often within seconds, with no pod restart required if the serving layer polls for alias changes. This is the fastest rollback path available, and it's a direct payoff of designing the registry around aliases in the first place.

## Traffic-level rollback

If the bad model is live as part of a canary (Lesson 23), the rollback is simply setting its traffic weight back to zero:

```yaml
http:
  - route:
      - destination:
          host: fraud-detector-v3
        weight: 100
      - destination:
          host: fraud-detector-v4
        weight: 0
```

Nothing about `v4` has to be deleted or rebuilt — it just stops receiving traffic, which also preserves it for post-incident analysis.

## What should trigger a rollback automatically

Waiting for a human to notice a dashboard is too slow for some failure modes. A rollback should trigger automatically when:

- Error rate or latency crosses a hard threshold for a sustained window (not a single spike)
- A canary's prediction distribution diverges sharply from the incumbent's, suggesting a data or serving bug rather than a genuine model improvement
- A downstream business metric (approval rate, fraud catch rate) moves outside an expected band

Anything less clear-cut — a borderline metric change, a slow degradation — should route to a human decision instead of auto-rollback, which is exactly what Lesson 25's approval gates are for.

## Why rollback speed is decided earlier

A team that only ever deploys by replacing the production model in place has no fast rollback path — reverting means redeploying the old artifact from scratch. Rollback speed is actually decided back at packaging and registry time: alias-based registries, traffic-split routing, and keeping old `ReplicaSets` around all exist specifically so that "go back" is a pointer change, not a rebuild.

## Key terms

| Term | Meaning |
|---|---|
| Infrastructure rollback | Reverting the serving deployment itself to a previous revision |
| Model rollback | Pointing the serving layer back at a previous model version via a registry alias |
| `kubectl rollout undo` | Kubernetes command that reverts a Deployment to its previous ReplicaSet |
| Traffic-level rollback | Setting a bad version's traffic weight back to zero without removing it |
| Automatic rollback trigger | A hard, sustained metric threshold that reverts a deployment without waiting for a human |

## Recap

Rollback isn't one operation — it's infrastructure-level (`kubectl rollout undo`), model-level (moving a registry alias), or traffic-level (zeroing a canary's weight), and the fastest of these depends entirely on choices made earlier in packaging and registry design. Clear, sustained metric breaches should trigger rollback automatically; anything murkier belongs in front of a human. Next, in Lesson 25, you'll see where that human decision formally fits into the pipeline as an approval gate.
