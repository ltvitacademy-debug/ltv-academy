# Lesson 26 — Pod Security Standards: Replacing PodSecurityPolicy

**Chapter 7 · Kubernetes Security & RBAC · Lesson 2 of 4**

## What you'll learn

- Why `PodSecurityPolicy` was deprecated in Kubernetes 1.21 and removed
  outright in 1.25, and what replaced it
- The three **Pod Security Standards** levels — Privileged, Baseline, and
  Restricted — and what each one actually blocks
- How **Pod Security Admission (PSA)**, the built-in admission controller,
  enforces those levels through plain namespace labels
- How to write a `securityContext` that passes the Restricted standard,
  at both the Pod and container level
- When a cluster reaches for a policy engine like OPA Gatekeeper or
  Kyverno instead of relying on PSA alone

## Why PodSecurityPolicy went away

`PodSecurityPolicy` (PSP) was Kubernetes' original built-in mechanism for
restricting what a Pod's spec was allowed to contain — no privileged
containers, no running as root, no host namespaces. It worked, but it was
notoriously hard to use correctly: policies were matched to Pods through
RBAC bindings in a way that was confusing to reason about, and a
misconfigured binding could silently leave workloads unprotected. It was
deprecated in Kubernetes 1.21 and removed completely in 1.25. Its
replacement is simpler on purpose: the **Pod Security Standards**, a set
of three predefined policy profiles, enforced through a built-in admission
controller instead of a bespoke policy object.

## The three Pod Security Standards

The standards define a ladder of restriction:

- **Privileged** — fully unrestricted; equivalent to no policy at all.
  Reserved for system-level and infrastructure workloads (CNI plugins,
  storage drivers) that genuinely need that access.
- **Baseline** — blocks the most obviously dangerous settings while
  staying compatible with most common workloads: no privileged
  containers, no host namespaces (`hostNetwork`, `hostPID`, `hostIPC`),
  no mounting the host filesystem via `hostPath` into sensitive paths,
  restricted Linux capabilities.
- **Restricted** — the hardened profile, layering on top of Baseline:
  containers must run as a non-root user, `allowPrivilegeEscalation`
  must be `false`, all Linux capabilities must be dropped except `NET_BIND_SERVICE`
  if explicitly added back, and a `seccompProfile` must be set.

## Pod Security Admission: enforcement by namespace label

Since Kubernetes 1.25, **Pod Security Admission (PSA)** is a built-in
admission controller, on by default — no extra component to install. It
reads three possible labels on a **namespace** and enforces (or just
reports on) the matching standard for every Pod created in it:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: payments
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/enforce-version: latest
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

`enforce` actually rejects a Pod that violates the standard. `audit` lets
the Pod through but records a violation in the audit log. `warn` lets it
through but prints a warning to the client — useful for rolling out a
stricter standard without breaking anything yet: set `warn` and `audit` to
`restricted` first, watch what would have failed, then flip `enforce` once
you're confident.

## Writing a Pod that actually passes Restricted

The labels only enforce what's already *in* the Pod spec — you still have
to write a `securityContext` that satisfies the standard:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: billing-api
  namespace: payments
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: billing-api:2.3
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
```

`runAsNonRoot: true` at the Pod level refuses to start any container that
would run as UID 0. `allowPrivilegeEscalation: false` blocks a process
from gaining more privileges than its parent (closing off `setuid`-style
escalation). `capabilities.drop: ["ALL"]` strips every Linux capability
by default — add back only the one or two a container genuinely needs,
by name, in an `add:` list. `readOnlyRootFilesystem: true` isn't part of
the Restricted standard itself, but it's a cheap, high-value addition: a
compromised process can't write a payload to disk if the filesystem
underneath it is read-only.

## When PSA alone isn't enough

PSA enforces exactly three fixed profiles — it has no concept of "allow
this specific image registry" or "require this specific label." For rules
that specific, clusters reach for a dedicated policy engine: **OPA
Gatekeeper** or **Kyverno**, both of which plug in as admission webhooks
and let you write custom constraints (e.g. "every image must come from
`registry.internal.example.com`") on top of whatever PSA is already
enforcing. PSA and a policy engine aren't an either/or — PSA covers the
baseline Pod-hardening rules for free, and a policy engine covers whatever
is specific to your organization.

## Key terms

| Term | Meaning |
|---|---|
| PodSecurityPolicy (PSP) | Deprecated in 1.21, removed in 1.25; the original, hard-to-manage Pod restriction mechanism |
| Pod Security Standards | Three predefined profiles — Privileged, Baseline, Restricted — that replaced PSP |
| Pod Security Admission (PSA) | The built-in admission controller that enforces a namespace's chosen standard via labels |
| `enforce` / `audit` / `warn` | The three PSA namespace-label modes: reject, log only, or warn the client only |
| `securityContext` | The Pod/container spec fields (runAsNonRoot, capabilities, seccompProfile, etc.) that a standard actually checks |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: what
specifically does the Restricted standard require that Baseline doesn't,
and how would you roll out `restricted` on a namespace that's currently
running workloads without immediately breaking them?
