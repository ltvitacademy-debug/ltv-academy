# Script — Pods

## Segment 1 (title)

Chapter one mentioned Pods without fully defining one. The Pod is the smallest thing you can actually deploy in Kubernetes — not the container itself. Understanding why explains a lot of what's coming in this chapter.

## Segment 2 (steps)

A Pod wraps one or more containers that always get scheduled together onto the same node, and they share two things. Network — every container in a Pod shares one IP and one port space, talking to each other over localhost. And storage — a Pod can define volumes that every container inside it mounts.

## Segment 3 (code)

Some of Northbridge's services need a helper running tightly alongside the main one, like a log shipper. That helper needs to start and stop with the main container and share its network. That's what a multi-container Pod is for. But most Pods, including most of Northbridge's, still run exactly one container — this is the exception, not the default pattern.

## Segment 4 (steps)

A Pod moves through phases: pending, running, succeeded or failed. The critical part is what happens on failure — a failed Pod is never restarted in place with the same identity. A replacement gets scheduled, with a new name and often a new IP. That's why you almost never create a Pod directly in practice; you use a controller that recreates Pods automatically.

## Segment 5 (outro)

Nothing in a well-built system should assume a specific Pod survives. Next up, lesson seven: the ReplicaSet and Deployment controllers that actually manage a set of Pods for you.
