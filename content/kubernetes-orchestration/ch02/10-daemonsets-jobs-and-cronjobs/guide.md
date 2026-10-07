# DaemonSets, Jobs & CronJobs

Deployment and StatefulSet both run long-lived services. Not every workload looks like that. Northbridge needs a log-collecting agent on every single node, a one-time database migration that runs to completion and stops, and a nightly report that regenerates automatically. This lesson covers the three object types built for exactly those shapes.

## What you'll learn

- What a DaemonSet guarantees, and why "one per node" is a different problem than "N replicas"
- How a Job tracks completions instead of maintaining a replica count
- How a CronJob wraps a Job on a schedule
- Which of the three fits a given task, using real Northbridge examples

## DaemonSet: exactly one Pod per node

A ReplicaSet-backed Deployment asks "how many Pods total." A DaemonSet asks a different question: "one Pod on every node, automatically, including nodes added later."

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: log-agent
spec:
  selector:
    matchLabels:
      app: log-agent
  template:
    metadata:
      labels:
        app: log-agent
    spec:
      containers:
        - name: log-agent
          image: northbridgeretail/log-agent:3.0.0
```

No `replicas` field — there's nothing to count. When a new node joins the cluster (cluster autoscaling, Chapter 5), the DaemonSet controller schedules a `log-agent` Pod onto it automatically, with no YAML change. This is the standard pattern for node-level agents: log collectors, monitoring agents, and CNI network plugins all typically run as DaemonSets.

## Job: run to completion, not forever

A Job tracks **completions**, not a standing replica count. It creates Pods, waits for them to exit successfully, and considers itself done — it never restarts a Pod that already succeeded.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: catalog-db-migration
spec:
  template:
    spec:
      containers:
        - name: migrate
          image: northbridgeretail/catalog-migrator:1.2.0
          command: ["./migrate", "--up"]
      restartPolicy: Never
  backoffLimit: 3
```

Northbridge runs exactly this kind of Job before a product-catalog release that needs a schema change. `backoffLimit` caps how many times Kubernetes retries a failing Pod before giving up on the whole Job. Unlike a Deployment, reapplying the same Job spec with no changes doesn't do anything useful — Jobs are meant to run once, not be reconciled forever.

```bash
kubectl get jobs
kubectl logs job/catalog-db-migration
```

## CronJob: a Job on a schedule

A CronJob doesn't run containers directly — it creates a new Job, on a schedule, using standard cron syntax:

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-catalog-report
spec:
  schedule: "0 2 * * *"      # 2:00 AM every day
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: report
              image: northbridgeretail/catalog-report:1.0.0
          restartPolicy: OnFailure
```

Northbridge's nightly catalog report runs this way: every night at 2 a.m., the CronJob controller creates a fresh Job, which creates a Pod, which runs to completion and exits. `kubectl get cronjobs` shows the schedule and when it last ran; `kubectl get jobs` shows the individual runs it has spawned.

## Choosing between the three

| Need | Object |
|---|---|
| A stateless app that should always be running, N copies | Deployment |
| A stateful app needing stable identity/storage | StatefulSet |
| Exactly one Pod on every node | DaemonSet |
| A task that runs once and finishes | Job |
| A task that runs on a recurring schedule | CronJob |

## Key terms

- **DaemonSet** — ensures exactly one Pod runs on every (matching) node in the cluster
- **Job** — runs Pods to completion and tracks successful completions, not a standing replica count
- **backoffLimit** — the maximum retry count for a failing Job before it's marked failed
- **CronJob** — creates a new Job on a recurring schedule, using cron syntax
