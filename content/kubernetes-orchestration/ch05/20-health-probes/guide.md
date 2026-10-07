# Health Probes

A checkout container can be running without being *working* — deadlocked, stuck waiting on a database connection it will never get, or still loading product data at startup. Kubernetes can't tell any of that just from "is the process alive." **Health probes** let Northbridge's Pods actually report their own condition, so Kubernetes knows when to restart one and when to simply stop sending it traffic.

## What you'll learn

- The three probe types — liveness, readiness, and startup — and what each one actually triggers
- The probe mechanisms available: HTTP, TCP, and exec
- The timing fields that control how forgiving a probe is
- Why getting readiness wrong causes real customer-facing outages

## Liveness probes: is this container stuck?

A **liveness probe** answers "should this container be restarted?" If it fails repeatedly, the kubelet kills and restarts the container — useful for recovering from a deadlock or an unrecoverable internal state, something a restart actually fixes.

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
  failureThreshold: 3
```

## Readiness probes: should this Pod receive traffic?

A **readiness probe** answers a completely different question: "should this Pod currently be sent traffic?" A failing readiness probe does *not* restart the container — it removes the Pod from the Service's Endpoints list until the probe passes again. This matters enormously during startup: if checkout takes 15 seconds to warm its cache before it can actually serve requests, a readiness probe keeps it out of rotation for those 15 seconds instead of sending it customers it can't yet serve.

```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
  failureThreshold: 3
```

Confusing these two is a common, costly mistake: using a liveness probe where a readiness probe belongs means a temporarily overloaded Pod gets killed and restarted instead of just paused from receiving new traffic — making an already-struggling service worse, not better.

## Startup probes: for slow-starting containers

A **startup probe** disables liveness and readiness checks until it succeeds once, giving a genuinely slow-starting container (one doing a large cache warm-up or schema migration) room to finish without the liveness probe prematurely killing it mid-startup:

```yaml
startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

This allows up to 300 seconds (30 × 10s) for startup before liveness checks even begin.

## Probe mechanisms

All three probe types can be checked via `httpGet` (a 2xx/3xx response counts as success), `tcpSocket` (a successful connection counts as success), or `exec` (a command that exits `0` counts as success) — pick whichever matches what the application can actually expose.

## Key terms

- **Liveness probe** — detects a stuck container; failure triggers a restart
- **Readiness probe** — detects a temporarily unready container; failure removes it from Service Endpoints without restarting it
- **Startup probe** — delays liveness/readiness checks until a slow-starting container finishes initializing
- **failureThreshold** — consecutive failures required before a probe is considered failed
- **initialDelaySeconds** — how long to wait after container start before the first probe attempt
