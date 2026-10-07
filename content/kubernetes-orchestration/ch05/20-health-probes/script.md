# Script — Health Probes

## Segment 1 (title)

A checkout container can be running without actually working — deadlocked, or still warming up at startup. Kubernetes can't tell that just from "is the process alive." Health probes let Pods report their own condition.

## Segment 2 (code)

A liveness probe answers "should this container be restarted?" If it fails repeatedly, the kubelet kills and restarts the container — the right tool for recovering from a genuine deadlock, something a restart actually fixes.

## Segment 3 (code)

A readiness probe asks a completely different question: should this Pod receive traffic right now? A failing readiness probe doesn't restart anything — it just pulls the Pod out of the Service's Endpoints list until it passes again. That matters hugely during a slow startup.

## Segment 4 (steps)

Mixing these two up is a common, costly mistake — using liveness where readiness belongs means an overloaded Pod gets killed and restarted instead of simply paused from new traffic, making things worse. A startup probe exists for genuinely slow-starting containers, holding off both liveness and readiness checks until it succeeds once.

## Segment 5 (outro)

All three probe types can check over HTTP, a raw TCP connection, or a command's exit code — whatever the application can actually expose. Next lesson: Horizontal Pod Autoscaling, which scales replica count automatically based on demand.
