# Kubernetes Security Posture

A hardened image from Lesson 20 can still run dangerously if the cluster lets it run as root, with every Linux capability enabled, and no restrictions on what it can do once it starts. Kubernetes security posture is about the rules the *cluster* enforces on every pod that runs inside it — independent of how carefully that pod's image was built.

## What you'll learn

- What Pod Security Standards are, and the three levels Kubernetes defines
- How `securityContext` fields actually restrict what a running container can do, with a real example
- How to enforce a security standard at the namespace level, not pod by pod
- Why cluster-level enforcement matters even for an already-hardened image

## Pod Security Standards: three levels, cluster-enforced

Kubernetes defines three built-in **Pod Security Standards**:

- **Privileged** — no restrictions at all; effectively opts out of pod security enforcement.
- **Baseline** — blocks known privilege escalations (like running privileged containers) while remaining broadly compatible with common workloads.
- **Restricted** — the hardening-focused tier: enforces non-root execution, drops all Linux capabilities by default, requires a seccomp profile, and blocks privilege escalation outright.

These standards are enforced per **namespace**, using labels like `pod-security.kubernetes.io/enforce: restricted` — meaning Northbridge Retail can hold its checkout namespace to the strictest tier while a less sensitive internal tooling namespace stays on baseline, without touching a single pod definition directly.

## What `securityContext` actually controls

Pod Security Standards are the policy; `securityContext` is where an individual pod and container spec actually implements it. Here's a real, verified example from Kubernetes' own documentation:

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: checkout
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
```

Each field closes a specific door: `runAsNonRoot` refuses to start the container as root at all; `allowPrivilegeEscalation: false` stops a process from gaining more privileges than it started with, even via a setuid binary; `readOnlyRootFilesystem` means even a compromised process can't write a backdoor to disk; and dropping all capabilities removes every Linux capability by default, so nothing beyond what the application actually needs gets added back explicitly.

## Why this matters even for a hardened image

Lesson 20's hardened, distroless image is still just a container image — nothing about it prevents the cluster from running it as root, with every capability enabled, if nothing stops that at the Kubernetes level. Pod Security Standards and `securityContext` are what make "runs safely" a property the cluster guarantees for every pod in a namespace, rather than a hope that every image author remembered every best practice.

## Key terms

- **Pod Security Standards** — Kubernetes' three built-in security policy tiers: Privileged, Baseline, and Restricted
- **Namespace-level enforcement** — applying a Pod Security Standard to every pod in a namespace via a label, rather than configuring each pod individually
- **securityContext** — the pod and container spec fields that actually implement privilege and capability restrictions
- **Linux capabilities** — fine-grained kernel permissions (beyond simple root/non-root) that can be individually dropped or added to a container
