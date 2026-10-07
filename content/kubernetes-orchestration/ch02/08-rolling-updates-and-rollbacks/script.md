# Script — Rolling Updates & Rollbacks

## Segment 1 (title)

Last lesson showed a Deployment swaps an old ReplicaSet for a new one when its template changes. This lesson covers exactly how that swap happens, and how to undo it the moment something goes wrong.

## Segment 2 (code)

The default strategy is RollingUpdate, controlled by two numbers. maxUnavailable caps how many Pods can be below the desired count at once. maxSurge caps how many extra Pods can exist above it. With ten replicas and both set to one, Kubernetes never drops below nine ready Pods and never exceeds eleven total — it brings up one new Pod, waits for it to pass its readiness check, retires one old Pod, and repeats.

## Segment 3 (steps)

You can watch this happen. rollout status blocks until the rollout finishes or stalls, and get rs lets you watch the old ReplicaSet shrink while the new one grows. A stuck rollout — new Pods crash-looping on the new image — shows up here before customers ever notice, as long as someone's watching.

## Segment 4 (code)

If checkout starts returning errors right after a deploy, you don't scramble to find the old image tag — Kubernetes already remembers every revision. rollout history lists them, and rollout undo reverts to the previous one, or a specific revision by number. The rollback itself is still a RollingUpdate, just in reverse, so it never causes a full outage either.

## Segment 5 (outro)

You can also pause a rollout mid-flight to inspect a few new Pods under real traffic before committing further, then resume. Next up, lesson nine: what happens when identical, disposable Pods aren't enough.
