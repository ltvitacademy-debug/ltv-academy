# Troubleshooting Pods & Nodes

Charts install cleanly in a demo and then something doesn't come up right in a real cluster. A Northbridge checkout Pod sits at `Pending` for ten minutes, or crashes in a loop, or a whole node stops scheduling new work. This lesson is the troubleshooting playbook: the commands to run, in order, and what the common failure states actually mean.

## What you'll learn

- The standard first three commands for any broken Pod: `get`, `describe`, `logs`
- What the common Pod states — `Pending`, `CrashLoopBackOff`, `ImagePullBackOff`, `OOMKilled` — each actually indicate
- How to diagnose node-level problems with `describe node` and `top node`
- Cordoning and draining a node safely for maintenance
- A full worked scenario: diagnosing a Service that can't reach another Service, when every individual Pod looks healthy

## Step one: always start with kubectl get

```bash
kubectl get pods -n northbridge-retail -o wide
```

The `STATUS` column narrows the problem immediately. `-o wide` adds the node each Pod landed on, which matters once the problem turns out to be node-level rather than Pod-level.

## Step two: kubectl describe for the full story

```bash
kubectl describe pod checkout-7d9f8c6b5-x2k9p -n northbridge-retail
```

The **Events** section at the bottom of the output is where most answers live — it's a timestamped log of everything the scheduler and kubelet tried and why it failed (failed scheduling, failed image pull, failed liveness probe, and so on).

## Step three: kubectl logs for what the container itself said

```bash
kubectl logs checkout-7d9f8c6b5-x2k9p -n northbridge-retail

# a container that already restarted — read the PREVIOUS attempt's logs
kubectl logs checkout-7d9f8c6b5-x2k9p -n northbridge-retail --previous

# a Pod with more than one container
kubectl logs checkout-7d9f8c6b5-x2k9p -c checkout -n northbridge-retail
```

## Reading the common Pod states

| State | What it means | Where to look |
|---|---|---|
| `Pending` | Pod accepted by the API server but not yet scheduled to a node | `kubectl describe pod` → Events (usually insufficient CPU/memory, or no node matches a nodeSelector/taint) |
| `ImagePullBackOff` | Kubelet can't pull the container image | Wrong image name/tag, private registry needing `imagePullSecrets`, or the registry is unreachable |
| `CrashLoopBackOff` | Container starts, exits, and Kubernetes keeps restarting it with increasing backoff | `kubectl logs --previous` — almost always an application-level failure on startup |
| `OOMKilled` | Container exceeded its memory `limit` and the kernel killed it | Check `resources.limits.memory` against actual usage with `kubectl top pod` |

## Node-level problems

```bash
# Is the node itself healthy and schedulable?
kubectl describe node node-03

# Live CPU/memory usage per node or Pod
kubectl top node
kubectl top pod -n northbridge-retail

# All Pods currently on a specific node
kubectl get pods --all-namespaces --field-selector spec.nodeName=node-03
```

`kubectl describe node` shows **Conditions** (`Ready`, `MemoryPressure`, `DiskPressure`, `PIDPressure`) and **Taints**. A node under memory pressure will actively evict Pods to protect itself — that shows up as Pods disappearing from one node and rescheduling elsewhere, not as a crash in application logs.

## Taking a node out of rotation safely

```bash
# Stop new Pods from being scheduled here, without touching what's running
kubectl cordon node-03

# Safely evict existing Pods so they reschedule elsewhere, then the node is empty
kubectl drain node-03 --ignore-daemonsets --delete-emptydir-data

# ...do the maintenance (patch, reboot, replace)...

# Allow scheduling again
kubectl uncordon node-03
```

`--ignore-daemonsets` is required because DaemonSet Pods are meant to run on every node and `drain` can't evict them in the normal sense; `--delete-emptydir-data` acknowledges that any Pod using an `emptyDir` volume on that node will lose that data when evicted.

## Troubleshooting scenario: product-catalog can't reach checkout

Everything above diagnoses a Pod that's visibly unhealthy. This scenario is the harder case:
every Pod involved shows `Running` and `1/1 Ready`, and the problem only shows up as a
downstream failure.

**Problem description.** Northbridge's `product-catalog` service starts returning `502 Bad
Gateway` on any request that needs to check live pricing from `checkout`. Nothing crashed —
`kubectl get pods -n northbridge-retail` shows every `checkout` Pod `Running` and `1/1 Ready`,
and every `product-catalog` Pod is healthy too.

**Available evidence.**

```bash
$ kubectl get pods -n northbridge-retail -l app=checkout
NAME                        READY   STATUS    RESTARTS   AGE
checkout-7d9f8c6b5-x2k9p    1/1     Running   0          2h
checkout-7d9f8c6b5-m4nqr    1/1     Running   0          2h

$ kubectl logs -n northbridge-retail product-catalog-5c8d9f-abc12
ERROR: connect to http://checkout/ failed: connection refused
```

**Diagnostic questions.**

- If every `checkout` Pod is `Running` and `Ready`, is the problem in the Pods at all, or in how
  traffic finds them?
- `product-catalog` is calling `checkout` by its Service DNS name. Does the Service actually
  have anything behind it right now?
- Did anything about the `checkout` Pods' *labels* change recently — a redeploy, a manifest edit?

**Expected investigation sequence.**

```bash
# Step 1 -- the Pods are fine, so check what the Service itself is
# actually routing to:
kubectl get endpoints checkout -n northbridge-retail

NAME       ENDPOINTS   AGE
checkout   <none>      2h

# Step 2 -- an Endpoints object with no addresses means the Service's
# selector matches zero Pods. Compare the Service's selector...
kubectl get svc checkout -n northbridge-retail -o jsonpath='{.spec.selector}'
{"app":"checkout","tier":"backend"}

# ...against the actual Pods' labels:
kubectl get pods -n northbridge-retail -l app=checkout --show-labels
NAME                        LABELS
checkout-7d9f8c6b5-x2k9p    app=checkout,version=v2
checkout-7d9f8c6b5-m4nqr    app=checkout,version=v2
```

**Correct resolution.** The Service's selector requires `tier=backend`, but the current
`checkout` Pods — deployed from an updated manifest — only carry `app=checkout,version=v2`; the
`tier: backend` label was dropped in the edit. The Pods are healthy, the Service is healthy, but
the Service's selector matches nothing, so its Endpoints list is empty and every request to
`checkout` has nowhere to go — which is exactly why `kubectl logs` on `product-catalog` shows a
plain connection failure rather than any kind of HTTP error: there's no Pod on the other end to
even refuse the connection politely. Adding `tier: backend` back to the Deployment's Pod template
(not editing the running Pods directly, which a future rollout would overwrite anyway) and letting
it roll out restores the Endpoints and resolves the 502s.

**Why this failure happens, and why it's easy to miss.** `kubectl get pods` only answers "are my
Pods healthy," never "is anything actually routing to them." A Service with a selector that
matches zero Pods is not an error state Kubernetes surfaces loudly — it's valid, just useless. Two
things that look unrelated — Pod labels, and a Service's selector — are actually one coupled
system, and a change to either side alone can silently break the connection between them.

**Prevention.** `kubectl get endpoints <service>` after any Deployment or label change to confirm
the count is non-zero is the single fastest sanity check — cheaper than the DNS, network-policy,
and firewall rabbit holes this symptom often sends people down first. A readiness probe alone
wouldn't have caught this either: the Pods genuinely are ready, the problem is upstream of
anything a probe checks.

## Key terms

- **Events** — the timestamped log inside `kubectl describe pod`/`describe node` output showing what the scheduler and kubelet attempted
- **CrashLoopBackOff** — Kubernetes repeatedly restarting a container that keeps exiting, with increasing delay between attempts
- **OOMKilled** — a container terminated because it exceeded its memory limit
- **Cordon** — marking a node unschedulable for new Pods without affecting Pods already running there
- **Drain** — evicting existing Pods off a node so it can be safely taken down for maintenance
- **Endpoints** — the list of Pod IPs a Service is actually routing to, derived live from its selector matching Pod labels
- **Selector mismatch** — a Service and its intended Pods disagreeing on labels, producing a Service with zero working Endpoints despite every Pod being healthy
