# Script — StatefulSets

## Segment 1 (title)

Everything so far assumed Pods are interchangeable. That breaks for a database. If Northbridge runs a clustered database inside Kubernetes, Pod identity and storage both have to persist. That's what StatefulSet is for.

## Segment 2 (steps)

A Deployment's Pods are deliberately interchangeable — today's Pod might be replaced tomorrow by one with a different name and a different IP, same role. Fine for a stateless web service. Not fine for a replicated database, which needs a stable predictable name, the exact same storage volume reattached after a restart, and ordered startup so a primary comes up before its replicas.

## Segment 3 (code)

StatefulSet gives Pods predictable names instead of random suffixes — catalog-db-0, catalog-db-1, catalog-db-2. And volumeClaimTemplates creates a separate persistent volume claim per replica, so when catalog-db-1 gets recreated after a crash, it reattaches to the same claim, not a fresh empty volume. The data survives the Pod.

## Segment 4 (steps)

By default a StatefulSet starts Pods in order, zero then one then two, waiting for each to be ready before starting the next, and tears down in reverse. That matters when a replica needs its primary already running before it can safely join. But Northbridge's checkout and catalog application servers stay on Deployment — they're stateless and don't need any of this. StatefulSet is for the pieces underneath that genuinely hold state.

## Segment 5 (outro)

Many teams reach for a managed database service instead of self-hosting state in Kubernetes at all — StatefulSet exists for when that's not an option. Next up, lesson ten: DaemonSets, Jobs, and CronJobs, for every other shape of task.
