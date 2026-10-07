# Troubleshooting Pods & Nodes

Charts install cleanly in a demo and then something doesn't come up right in a real cluster. A Northbridge checkout Pod sits at `Pending` for ten minutes, or crashes in a loop, or a whole node stops scheduling new work. This lesson is the troubleshooting playbook: the commands to run, in order, and what the common failure states actually mean.

## What you'll learn

- The standard first three commands for any broken Pod: `get`, `describe`, `logs`
- What the common Pod states — `Pending`, `CrashLoopBackOff`, `ImagePullBackOff`, `OOMKilled` — each actually indicate
- How to diagnose node-level problems with `describe node` and `top node`
- Cordoning and draining a node safely for maintenance

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

## Key terms

- **Events** — the timestamped log inside `kubectl describe pod`/`describe node` output showing what the scheduler and kubelet attempted
- **CrashLoopBackOff** — Kubernetes repeatedly restarting a container that keeps exiting, with increasing delay between attempts
- **OOMKilled** — a container terminated because it exceeded its memory limit
- **Cordon** — marking a node unschedulable for new Pods without affecting Pods already running there
- **Drain** — evicting existing Pods off a node so it can be safely taken down for maintenance
