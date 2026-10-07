# Script — Horizontal Pod Autoscaling

## Segment 1 (title)

Northbridge's checkout Deployment runs 3 replicas most of the time, but Black Friday needs far more for a few hours, then back down. Manually editing replica counts isn't reliable at 2 a.m. The HorizontalPodAutoscaler automates exactly this.

## Segment 2 (steps)

Before CPU-based autoscaling works at all, the cluster needs the metrics-server add-on running — it aggregates real-time resource usage per Pod. The HPA controller periodically compares that actual metric against a target and adjusts replica count to close the gap, continuously.

## Segment 3 (code)

scaleTargetRef names the Deployment being scaled, and the metrics block says what to watch — here, average CPU utilization targeted at 70% of requested CPU. That's exactly why setting resource requests matters: utilization percentage is meaningless without a request value to measure against.

## Segment 4 (steps)

minReplicas sets a floor, so checkout never drops below 3 Pods even at near-zero traffic. maxReplicas sets a ceiling, protecting the cluster and the cloud bill if a metric spikes unexpectedly or a bug causes runaway CPU usage.

## Segment 5 (outro)

An HPA can also target memory, or custom metrics like queue depth, and can list several metrics at once — scaling to satisfy whichever one demands the most replicas. Next lesson: what happens when there's no node left with room, and Cluster Autoscaling takes over.
