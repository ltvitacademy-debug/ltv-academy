# Script — Cost-Aware Scaling

## Segment 1 (title)

Every pattern in this chapter so far was framed around reliability and latency. Each one is also, directly, a cost decision — because GPU instances are priced meaningfully higher per hour than typical CPU instances.

## Segment 2 (steps: this chapter's levers)

Reread through a cost lens: max instances is the hard ceiling on worst-case cost. Every cache hit is an inference call you simply don't pay for. And a queue absorbs a burst with existing capacity, instead of immediately paying for new instances.

## Segment 3 (code: spot instances)

Spot or preemptible instances are sixty to ninety percent cheaper than on-demand — but they can be reclaimed by the cloud provider with little warning, seconds to minutes. They're a great fit for batch jobs and queue-and-worker patterns. They're a bad fit when a user is actively waiting on that exact request.

## Segment 4 (code: alert on the bill)

Traffic and latency alerts answer whether the service is healthy. A cost alert answers a different question entirely: is it still cheap enough to run this way? A service can be perfectly healthy and still be quietly burning far more money than expected.

## Segment 5 (outro)

That closes out scaling and reliability. Everything from here is the capstone — taking a real AI app through containerizing, deploying, and autoscaling it, end to end.
