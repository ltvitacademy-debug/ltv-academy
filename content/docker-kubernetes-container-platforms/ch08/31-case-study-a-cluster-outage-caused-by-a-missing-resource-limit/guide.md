# Lesson 31 — Case Study: A Cluster Outage Caused by a Missing Resource Limit

**Chapter 8 · Capstone: Running a Real Application on Kubernetes · Lesson 3 of 4**

*This is an illustrative scenario for teaching purposes — Harrow Creek Goods and the incident
below are fictional, built to show a real failure mode, not a report of an actual event.*

## What you'll learn

- Why a pod with no CPU or memory `requests`/`limits` can quietly destabilize every other pod on
  its node, not just itself
- How the kubelet's OOMKiller decides which pod to kill when a node runs out of memory, and why
  that decision is rarely the one an on-call engineer expects
- The difference between a pod being **OOMKilled** and a pod being **evicted**, and why both
  showed up in this incident
- What a `LimitRange` does differently from a per-pod `resources` block, and why Harrow Creek added
  one after this incident instead of trusting every future YAML file to get it right

## The incident

Harrow Creek Goods' platform team ships a new internal reporting job as a Kubernetes `CronJob`.
It's meant to be lightweight — a nightly export that reads from the database and writes a CSV.
The engineer who wrote it copies an older manifest as a starting point, trims it down, and ships
it without noticing the original had no `resources` block at all:

```yaml
# reporting-cronjob.yaml -- the version that actually shipped
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-report
spec:
  schedule: "0 2 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: report
              image: registry.harrowcreek.dev/nightly-report:1.0.0
              # no resources block at all
          restartPolicy: Never
```

On most nights, the export finishes in under a minute using a small, predictable amount of memory.
One night, an upstream schema change causes the query to return a much larger result set than
usual, and the report container's memory use climbs steadily instead of finishing quickly.

## Why one unlimited pod can take down its neighbors

A pod with no `resources.requests` or `resources.limits` gets Kubernetes' `BestEffort` QoS
class — the lowest priority for everything. More importantly, with no memory `limit` set at all,
the container has no ceiling: it keeps allocating memory as long as the node has any free, because
nothing inside Kubernetes is telling the kernel to stop it earlier.

The `order-api` and `order-worker` pods from Lessons 29–30 happen to be scheduled on the same node
as this CronJob's pod. As the report container's memory climbs, the node's total memory usage
climbs with it — and it isn't just the report container's own memory at risk. When a node runs low
on memory system-wide, the kubelet starts evicting pods to protect the node itself, and the Linux
kernel's OOMKiller may separately kill whichever process looks like the best candidate by its own
scoring, regardless of which pod "deserves" it.

## Reading the aftermath with kubectl

```
kubectl get pods -o wide
```

```
NAME                            READY   STATUS                   RESTARTS   NODE
order-worker-7f8d9c7b6-k2n4p    0/1     OOMKilled                3          node-3
nightly-report-28891234-abc12   0/1     Error                    0          node-3
order-api-5c9b8f7d4-m8x2q       0/1     Evicted                  0          node-3
```

Two different failure modes, both real, both on the same node. `order-worker` shows
**OOMKilled** — the kernel's OOMKiller picked that container specifically and sent it `SIGKILL`
because *that process* looked like a good candidate when memory ran out. `order-api`'s pod shows
**Evicted** — the kubelet itself proactively removed that pod from the node to relieve
system-wide memory pressure, before the kernel had to intervene at all. Neither `order-worker` nor
`order-api` did anything wrong; both were healthy, correctly-configured pods that got caught in the
blast radius of a neighbor with no ceiling on its own memory use.

## The fix: requests and limits on the CronJob

```yaml
# reporting-cronjob.yaml -- corrected
          containers:
            - name: report
              image: registry.harrowcreek.dev/nightly-report:1.0.0
              resources:
                requests:
                  cpu: "100m"
                  memory: "128Mi"
                limits:
                  cpu: "500m"
                  memory: "512Mi"
```

With a `memory.limit` of `512Mi`, the same runaway query would have caused this one container to
get OOMKilled on its own — restarted by the CronJob's own retry behavior, a contained, expected
failure — instead of destabilizing every other pod sharing its node. The `requests` values are
just as important: they're what the scheduler uses to decide which node has room for this pod in
the first place, and a pod with no `requests` can get packed onto a node far more tightly than its
real usage justifies.

## The platform-wide fix: a LimitRange

A single corrected CronJob doesn't prevent the next engineer from copying an old manifest and
making the same mistake. Harrow Creek's platform team adds a `LimitRange` to every namespace:

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-resource-limits
spec:
  limits:
    - type: Container
      default:
        cpu: "500m"
        memory: "512Mi"
      defaultRequest:
        cpu: "100m"
        memory: "128Mi"
```

A `LimitRange` doesn't edit any existing YAML file — it's a namespace-level object that fills in
`requests`/`limits` automatically for any container that doesn't specify its own, at the moment
that container is admitted to the cluster. The *next* engineer who forgets a `resources` block
gets Harrow Creek's safe defaults automatically, instead of a repeat of this incident.

## Key terms

| Term | Meaning |
|---|---|
| `BestEffort` QoS | The scheduling priority a pod gets when it has no CPU/memory requests or limits at all — lowest priority, no memory ceiling |
| OOMKilled | The Linux kernel's OOMKiller killed a specific container's process because it ran out of memory and that process scored as the best candidate |
| Evicted | The kubelet proactively removed a pod from a node under system-wide resource pressure, before the kernel had to act |
| `LimitRange` | A namespace-level object that supplies default `requests`/`limits` to any container that doesn't declare its own |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why did `order-worker` and
`order-api` fail during this incident even though their own manifests were correctly configured,
and what does a `LimitRange` fix that a single corrected CronJob manifest doesn't?
