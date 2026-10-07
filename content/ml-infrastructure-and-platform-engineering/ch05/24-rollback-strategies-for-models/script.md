# Script — Rollback Strategies for Models

## Segment 1 (title)

Every deployment strategy you've seen so far exists mainly to make one thing possible: catching a bad model before it does damage, and undoing it fast when something slips through anyway. A rollback strategy that only exists in someone's head doesn't count — it has to be something you can execute in minutes, under pressure.

## Segment 2 (steps)

Roll back the model actually means two different things. Infrastructure rollback reverts the serving deployment itself, the container, the Kubernetes deployment. Model rollback points the serving layer back at a previous model version, usually by moving a registry alias, without touching infrastructure at all. Model rollback is almost always faster, because it's a pointer change, not a rebuild.

## Segment 3 (code)

kubectl rollout undo reverts a deployment to the previous ReplicaSet that Kubernetes already keeps on hand by default. This is the right tool when the problem is the deployment itself, like a bad resource limit, not just the model's predictions.

## Segment 4 (code)

If you're using a registry with aliases, rollback can be a single API call that never touches Kubernetes at all. Moving champion back to version three takes effect the next time a serving job resolves the alias, often within seconds, with no pod restart required.

## Segment 5 (steps)

Not every bad signal should trigger the same response. A sustained threshold breach in error rate or latency, or a canary's predictions sharply diverging from the incumbent, should trigger an automatic rollback. Anything murkier, a borderline metric change, a slow degradation, belongs in front of a human decision instead.

## Segment 6 (outro)

Rollback speed is really decided earlier, at packaging and registry time — alias-based registries and traffic-split routing exist specifically so going back is a pointer change. Next, lesson twenty-five: where that human decision formally lives in the pipeline, as an approval gate.
