# Script — Load Balancing Across GPUs

## Segment 1 (title)

Autoscaling answered how many replicas. This lesson answers the next question: once you have several GPU replicas running the same model, how do you decide which one gets each request? The naive answer, round robin, is a worse fit here than it is for ordinary web traffic.

## Segment 2 (steps)

Round robin assumes every request costs roughly the same, which is false for LLM inference. Prompt lengths vary wildly, output lengths vary too, and KV cache memory footprint scales with context length — so sending every fifth request to the same replica regardless of what it's already carrying reliably creates hot and cold replicas instead of balanced ones.

## Segment 3 (steps)

Least-outstanding-requests routing sends each new request to whichever replica currently has the fewest in flight — a much better proxy for real load. Session or prefix affinity routes the same conversation back to the same replica so it can reuse a cached prompt prefix instead of recomputing it. And a replica failing health checks should be pulled out of rotation immediately.

## Segment 4 (code)

Here's a minimal Nginx upstream block using least-connections routing across three GPU replicas, with a failure threshold that pulls a struggling backend out of rotation after two failures — a real, runnable load-balancer shape.

## Segment 5 (outro)

Round robin treats every request as equal cost, which inference requests aren't — least-outstanding-requests and session affinity fit much better, and a load balancer that's aware of each replica's actual capacity can also weight traffic across a fleet of mixed GPU generations instead of splitting it evenly. Up next, lesson twenty-five: what happens when it isn't one model behind the load balancer, but several?
