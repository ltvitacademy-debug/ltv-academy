# Pod Security

RBAC and ServiceAccounts control who can talk to the Kubernetes API. Neither one stops a container from running as root, writing to its own filesystem, or escalating privileges once it's actually started. That's a different layer: **Pod Security** — the settings on the container itself, and the namespace-wide policy that enforces a baseline across every Pod.

## What you'll learn

- What `securityContext` controls at the Pod and container level
- The three built-in Pod Security Standards: privileged, baseline, restricted
- How to enforce a standard on a namespace with Pod Security Admission labels
- Why checkout's Pods specifically should never run as root

## securityContext: locking down one Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: checkout
  namespace: checkout
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: checkout
      image: northbridge/checkout:2.4
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop: ["ALL"]
```

`runAsNonRoot: true` refuses to start the container at all if its image tries to run as UID 0. `allowPrivilegeEscalation: false` blocks a process from gaining more privileges than it started with. `readOnlyRootFilesystem: true` means the container's filesystem can't be written to outside of volumes it's explicitly given — useful against an attacker trying to drop a malicious binary. `capabilities.drop: ["ALL"]` strips every Linux capability the container doesn't explicitly need back.

## Pod Security Standards: three built-in levels

Kubernetes defines three standard profiles, from loosest to strictest:

- **privileged** — effectively unrestricted; appropriate only for trusted system components
- **baseline** — blocks known privilege escalations but stays broadly compatible with common workloads
- **restricted** — enforces current Pod hardening best practice, including the `securityContext` settings above

## Enforcing a standard with namespace labels

Rather than trust every Pod spec to set `securityContext` correctly by hand, **Pod Security Admission** enforces a chosen standard at the namespace level:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: checkout
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/warn: restricted
```

With `enforce: restricted` set, the API server rejects any Pod submitted to `checkout` that doesn't meet the restricted profile — a Pod trying to run as root never gets scheduled in the first place, regardless of who wrote its YAML.

## Why this matters for checkout specifically

Checkout handles customer payment flows. If that container were ever compromised through a dependency vulnerability, running as a non-root user with a read-only root filesystem and no extra capabilities caps how much damage the attacker can do from inside it — they can't write new files, gain root, or use capabilities the container never had.

## Key terms

- **securityContext** — Pod- and container-level settings controlling user ID, filesystem writability, privilege escalation, and Linux capabilities
- **Pod Security Standards** — Kubernetes's three built-in profiles: privileged, baseline, restricted
- **Pod Security Admission** — the namespace-label mechanism that enforces a chosen standard on every Pod submitted to that namespace
- **Capabilities** — fine-grained Linux kernel privileges that can be dropped individually instead of running fully privileged or fully unprivileged
