# Load Balancing Across GPUs

Autoscaling (Lesson 23) answers "how many replicas." This lesson answers the next question: once you have several GPU replicas running the same model, how do you decide which one gets each incoming request? The naive answer — round robin — is a worse fit for inference than it is for ordinary web traffic, because inference requests are far from equal cost.

## What you'll learn

- Why round-robin load balancing breaks down specifically for LLM inference
- Better routing strategies: least-outstanding-requests and session affinity
- Why session affinity matters for multi-turn chat and prefix/KV cache reuse
- How health-aware routing keeps a struggling replica from dragging down the whole pool

## Why round robin breaks down

Round robin assumes every request costs roughly the same amount of work, which is a reasonable assumption for short, uniform HTTP calls. It's a poor one for LLM inference:

- Prompt lengths vary wildly — a 50-token question and a 4,000-token pasted document cost very different amounts of prefill compute
- Output lengths vary too, and a replica serving several long generations is doing far more decode work than one serving short ones
- KV cache memory footprint per request scales with context length, so a replica can run out of GPU memory headroom well before another one does

Send every fifth request to the same replica regardless of what it's already carrying, and you reliably create "hot" replicas that are overloaded while "cold" ones sit underused — the opposite of what load balancing is supposed to prevent.

## Better routing strategies

- **Least outstanding requests (least connections)** — route each new request to whichever replica currently has the fewest in-flight requests. It's a much better proxy for actual load than a counter that ignores how long each request takes.
- **Queue-depth-aware routing** — a variant of the above that routes based on each replica's current queue length rather than raw connection count.
- **Session / prefix affinity** — for multi-turn chat or any workload that benefits from KV cache reuse, routing the *same* conversation back to the *same* replica avoids recomputing a shared prompt prefix from scratch. Consistent hashing on a session or conversation ID is the usual mechanism.
- **Health-aware removal** — a replica that's failing health checks, out of memory, or returning errors should be pulled out of rotation immediately, not just rebalanced around.

```nginx
upstream llm_backends {
    least_conn;
    server gpu-replica-1:8000 max_fails=2 fail_timeout=10s;
    server gpu-replica-2:8000 max_fails=2 fail_timeout=10s;
    server gpu-replica-3:8000 max_fails=2 fail_timeout=10s;
}
```

## Heterogeneous GPU pools

Not every fleet is uniform — some teams mix GPU generations or memory sizes as capacity gets added over time. A load balancer that's aware of each replica's actual capacity (rather than treating every backend as identical) can weight routing accordingly, sending a proportionally larger share of traffic to the more capable nodes instead of splitting evenly and let the weaker ones fall behind.

## Key terms

| Term | Meaning |
|---|---|
| Round robin | Routing requests to backends in strict rotating order, ignoring current load |
| Least outstanding requests | Routing to whichever backend currently has the fewest in-flight requests |
| Session / prefix affinity | Routing the same session's requests to the same replica to reuse cached context |
| Health-aware routing | Removing an unhealthy or failing replica from rotation automatically |

## Recap

Round robin treats every request as equal cost, which inference requests simply aren't — least-outstanding-requests routing and session affinity are much closer fits, and health-aware removal keeps one bad replica from dragging down the pool. Next up, Lesson 25: what happens when it isn't one model behind the load balancer, but several?
