# Script — Runtime Security

## Segment 1 (title)

Every control so far in this chapter runs before or at deploy time. Runtime security watches a container while it's actually running in production — because some things only reveal themselves once a workload is live.

## Segment 2 (steps)

An image scan checks what's installed; Kubernetes posture checks what a pod is allowed to do. Neither can see what a container actually does once running. Falco, built on eBPF, watches kernel-level system calls from every running container in real time and evaluates them against a rule set.

## Segment 3 (code)

A real Falco rule's condition is the actual detection logic — here, it fires whenever bash runs inside a container rather than on the bare host. The output fills in the live user and container name when the rule triggers.

## Segment 4 (steps)

Northbridge Retail's checkout container, hardened and distroless back in Lesson 20, doesn't even have a shell binary to run. If this rule ever fires there, it's not a developer debugging — there's no legitimate reason for that event to exist at all, which makes it a far louder signal than it would be in an unhardened container.

## Segment 5 (outro)

A Falco alert firing in production is exactly the kind of event that kicks off Chapter 6's incident response process. Next up, Lesson 24: policy as code.
