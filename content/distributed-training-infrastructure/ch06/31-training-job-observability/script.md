# Script — Training Job Observability

## Segment 1 (title)

Lessons 29 and 30 covered hardware signals — GPU utilization and cost — that exist whether or not anyone's watching. This lesson is about a different layer: observing the training job itself. A node full of busy, correctly-utilized H100s doesn't help if the job wrapped around them has silently stopped making progress.

## Segment 2 (code)

The Kubeflow Training Operator tracks a PyTorchJob's lifecycle as its own object, independent of any individual pod. A job can show Running while one of its worker pods is actually stuck in a crash loop — the Training Operator reports what it believes the job's overall state is, but catching why a job is unhealthy still means looking at pod-level status underneath.

## Segment 3 (screenshot)

This is the real Kubeflow Central Dashboard — the web UI both the language-modeling and multimodal teams use as their starting point, with navigation to notebooks, pipelines, and the training tooling underneath. A researcher checking on a run doesn't typically start at the command line — they start here, then drill into the specific tool they need.

## Segment 4 (code)

Training Solara-70B across sixty-four nodes means sixty-four separate worker pods, each producing its own logs — checking them one at a time doesn't scale. The Training Operator automatically labels every pod belonging to a job, so a single label-selector query pulls logs across all sixty-four workers at once, instead of sixty-four manual lookups.

## Segment 5 (outro)

Training job observability means watching the job's own status conditions, pulling logs across every worker with one query, and tracking loss curves separately in TensorBoard. Next, Lesson 32 turns that observability into action: alerting automatically when a run stalls.
