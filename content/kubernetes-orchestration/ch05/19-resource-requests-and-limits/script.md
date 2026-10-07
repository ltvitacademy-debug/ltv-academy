# Script — Resource Requests & Limits

## Segment 1 (title)

If every Pod could use unlimited CPU and memory, one misbehaving checkout Pod could starve everything else on its node. Requests and limits are how Kubernetes prevents that — requests guide placement, limits cap usage.

## Segment 2 (code)

A request is what the scheduler reserves before it will even place a Pod on a node — it's a placement guarantee, not a usage cap. CPU is measured in millicores, so 250m is a quarter of one core; memory uses binary suffixes like Mi and Gi. A limit is the hard ceiling once the Pod is actually running.

## Segment 3 (steps)

The two resources behave differently when a container hits its limit. Memory can't be throttled back, so exceeding it gets the container OOMKilled and restarted. CPU can be throttled, so exceeding its limit just slows the container down — it keeps running.

## Segment 4 (steps)

Kubernetes uses requests and limits to assign every Pod a Quality of Service class. Guaranteed means requests equal limits on every resource, and it's evicted last under node pressure. Burstable sets requests without matching limits. BestEffort sets neither, and gets evicted first.

## Segment 5 (outro)

Northbridge's critical checkout service is a good candidate for Guaranteed, setting requests equal to limits so it survives longest under resource pressure. Next lesson: health probes, which tell Kubernetes when a Pod is actually ready to serve traffic at all.
