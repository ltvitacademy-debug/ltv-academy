# Script — DaemonSets, Jobs & CronJobs

## Segment 1 (title)

Deployment and StatefulSet both run long-lived services. Not every workload looks like that. Northbridge needs a log agent on every node, a one-time database migration, and a nightly report that runs on its own. This lesson covers the three objects built for exactly those shapes.

## Segment 2 (code)

A DaemonSet asks a different question than a Deployment — not how many Pods total, but one Pod on every node, automatically, including nodes added later. There's no replicas field; there's nothing to count. When a new node joins through cluster autoscaling, the DaemonSet controller schedules a Pod onto it with no YAML change. Log collectors and monitoring agents are the standard use case.

## Segment 3 (code)

A Job tracks completions, not a standing count. It creates Pods, waits for them to exit successfully, and considers itself done — it never restarts a Pod that already succeeded. Northbridge runs exactly this before a catalog release that needs a schema migration. backoffLimit caps how many retries happen before the whole Job is marked failed.

## Segment 4 (steps)

A CronJob doesn't run containers directly — it creates a new Job on a schedule, using standard cron syntax. Northbridge's nightly catalog report runs this way: every night at two a.m., the CronJob creates a fresh Job, which creates a Pod, runs to completion, and exits.

## Segment 5 (outro)

Deployment for always-on stateless apps, StatefulSet for stateful ones, DaemonSet for one-per-node, Job for one-and-done, CronJob for recurring. Next up, chapter three: giving a moving set of Pods a stable address with Services.
