# Script — Kubernetes Security Posture

## Segment 1 (title)

A hardened image from Lesson 20 can still run dangerously if the cluster lets it run as root with every capability enabled. Kubernetes security posture is about the rules the cluster enforces on every pod, independent of how the image was built.

## Segment 2 (steps)

Kubernetes defines three Pod Security Standards: Privileged, which opts out of enforcement entirely; Baseline, which blocks known privilege escalations; and Restricted, which enforces non-root execution and drops all capabilities by default. These apply per namespace, through a single label — so Northbridge Retail can hold its checkout namespace to the strictest tier without touching individual pod specs.

## Segment 3 (code)

securityContext is where a pod actually implements that policy: runAsNonRoot refuses to start as root at all, allowPrivilegeEscalation false stops a process from gaining more privilege than it started with, a read-only root filesystem blocks writing a backdoor to disk, and dropping all capabilities means nothing extra is available unless it's added back explicitly.

## Segment 4 (steps)

Enforcing this at the namespace level means every pod in checkout inherits the restricted standard automatically, while a less sensitive namespace can stay on baseline — one label instead of auditing every pod spec by hand.

## Segment 5 (outro)

Nothing about a hardened image stops the cluster from running it as root if nothing at the Kubernetes level prevents that — this is what makes "runs safely" a guarantee instead of a hope. Next up, Lesson 22: securing CI/CD pipelines.
