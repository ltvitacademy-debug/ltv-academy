# Script — Capstone Write-Up

## Segment 1 (title)

This is the final lesson of the whole course. Lesson 34 asked you to design a platform for Northline Analytics. This lesson is about turning that design into a document someone else would actually want to read.

## Segment 2 (steps)

A write-up that just lists what you'd build reads like a shopping list. A real one opens with the problem and the current state in plain language, moves into the proposed architecture — where every term from this course earns its place — then covers tradeoffs, the section most people skip, and closes with sequencing and a reliability plan.

## Segment 3 (steps)

No design is free, and naming the costs is what makes a write-up credible. A central feature store adds a new operational dependency in exchange for consistency. Canary deployments slow releases down, on purpose, trading speed for safety. And per-model SLOs mean someone has to actually own and decide each target — that's real, recurring work, not something a config file does by itself.

## Segment 4 (steps)

A reviewer isn't checking whether you memorized the right words. They're checking for specificity — why a piece exists, not just its name — for honest tradeoff reasoning, since a design with zero downsides reads as inexperienced, and for reliability treated as a first-class section, not a single afterthought sentence about monitoring.

## Segment 5 (steps)

Here's this course, in seven chapters. Chapter one covered what a platform even does, and the scale inflection point. Chapter two, feature stores — online and offline, training serving skew. Chapter three, experiment tracking and registries — lineage from data to deployed model. Chapter four, pipelines — scheduling, failure handling, retraining.

## Segment 6 (steps)

Chapter five, deployment infrastructure — canary, rollback, approval gates. Chapter six, data and model versioning — reproducibility and auditability. And chapter seven, this chapter — SLOs, on-call, and incident response, turning "is it working" from a vibe into a number, and a number into a process.

## Segment 7 (outro)

This is the third course in the AI Infrastructure and ML Systems Engineer path, and everything in it assumed training was already solved — this was the layer a team builds once the real problem becomes running many models reliably, not just one. Congratulations — this completes ML Infrastructure and Platform Engineering.
