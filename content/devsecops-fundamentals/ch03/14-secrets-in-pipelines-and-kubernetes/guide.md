# Secrets in Pipelines & Kubernetes

This chapter has covered three places to store a secret properly — Key Vault, Secrets Manager, Vault — and Lesson 10 covered how secrets leak when they aren't stored properly. This closing lesson connects the two: how do secrets actually get from one of those vaults into a running pipeline or a running pod, without recreating the leak patterns along the way?

## What you'll learn

- Why a Kubernetes Secret object is not encryption, by itself, and what that means in practice
- How CI/CD platforms like GitHub Actions handle secrets, including automatic log masking
- How the External Secrets Operator pattern syncs a vault's secret into a Kubernetes Secret automatically
- Why "secret in an environment variable" still needs care, even when the vault did its job correctly
- A full worked scenario: a deployment that exposes a real secret through an incorrectly configured object type

## Kubernetes Secrets: base64 is not encryption

A Kubernetes `Secret` object looks like it's doing something more than it actually is:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: checkout-db-creds
  namespace: checkout
type: Opaque
data:
  password: cGFzc3dvcmQxMjM=
```

That `data` value is base64-encoded, not encrypted. Anyone who can read the Secret object through the Kubernetes API — which is exactly what the RBAC rules from Lesson 8 control — can decode it in one command. Base64 is an encoding, used so the YAML can represent arbitrary binary-safe data, not a security control. By default, Secret objects are also stored unencrypted in etcd unless the cluster has **encryption at rest** explicitly configured. This is exactly why Lesson 8's namespaced RBAC matters so much: the Secret object's real protection comes from who's allowed to read it, not from how it's encoded.

## The External Secrets Operator pattern

Rather than manually copying a value from Key Vault, Secrets Manager, or Vault into a Kubernetes Secret (which recreates a manual, easy-to-forget rotation step), Northbridge Retail uses the **External Secrets Operator** pattern: a controller running in the cluster watches an `ExternalSecret` resource, fetches the current value from the real vault, and keeps a Kubernetes Secret object synced automatically.

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: checkout-db-creds
spec:
  secretStoreRef: {name: vault-backend, kind: SecretStore}
  target: {name: checkout-db-creds}
  data:
  - secretKey: password
    remoteRef: {key: secret/checkout/db, property: password}
```

The vault stays the source of truth. If the value rotates in Vault, the synced Kubernetes Secret updates automatically on the next sync interval — no pipeline step, no manual copy, and nothing for a developer to remember.

## Secrets in CI/CD: GitHub Actions

Pipeline platforms have their own secret stores, separate from (but often fed by) the vaults covered earlier in this chapter. In GitHub Actions, a secret is referenced through the `secrets` context and never appears in the workflow file itself:

```yaml
jobs:
  deploy:
    steps:
      - name: Deploy checkout service
        env:
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
        run: ./deploy.sh
```

GitHub Actions automatically masks any value matching a referenced secret in the job's log output, replacing it with `***` — even if a script accidentally echoes it. That masking is a safety net, not a guarantee: it matches the literal secret value, so a script that transforms the value first (base64-encoding it, for instance) can still leak it past the mask. The habit that actually prevents this is simple — never deliberately print a secret in a pipeline step, masking or not.

## Why "it's in an environment variable" still needs care

Even correctly sourced from a vault, a secret sitting in a process's environment variables has its own exposure surface: it can appear in a crash dump, get logged by an overly verbose error handler, or be readable by any other process with access to `/proc/<pid>/environ` on a shared host. None of this means environment variables are unsafe to use — it means the chain has to be considered end to end: vault access control (this chapter), RBAC on who can read the Secret object (Lesson 8), and ordinary application-level care about what gets logged (Chapter 4's upcoming scanning tools help catch the ones that slip through).

## Troubleshooting scenario: a secret deployed as a ConfigMap

**Problem description.** During a routine security review, Northbridge's security team finds
`checkout`'s PaymentPro API key readable by far more people and services than it should be — not
because of a leaked file or a bad RBAC grant, but because of how the value itself was deployed.

**Available evidence.**

```bash
$ kubectl get configmap checkout-config -n checkout -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: checkout-config
  namespace: checkout
data:
  PAYMENTPRO_API_KEY: "pp_live_9k2mXnR7qYhT4vLp8sWdF3cJ6aN1oE5b"
  LOG_LEVEL: "info"
  CACHE_TTL_SECONDS: "300"
```

The API key is sitting in plain text, in a `ConfigMap`, next to ordinary non-sensitive config
values like `LOG_LEVEL`.

**Diagnostic questions.**

- Is a `ConfigMap` the right Kubernetes object for a secret at all, independent of whether it's
  base64-encoded?
- Who can read a `ConfigMap` in this namespace, compared to who can read a `Secret` — are those
  actually the same set of people and services?
- How did a real production API key end up here instead of coming from the vault, the way
  `checkout-db-creds` does earlier in this lesson?

**Expected investigation sequence.**

```bash
# Step 1 -- confirm this isn't a Secret masquerading as a ConfigMap --
# it's a genuine ConfigMap, which was never meant to hold sensitive data
kubectl get configmap checkout-config -n checkout -o jsonpath='{.kind}'
ConfigMap

# Step 2 -- compare RBAC on ConfigMaps vs. Secrets in this namespace.
# Even with correct RBAC on Secrets (per Lesson 8), a role granting
# read on ConfigMaps is typically far broader -- CI tooling, other
# services, anyone debugging the deployment -- because ConfigMaps are
# assumed to hold only non-sensitive config
kubectl auth can-i get configmaps -n checkout --as=system:serviceaccount:checkout:readonly-debug
yes
kubectl auth can-i get secrets -n checkout --as=system:serviceaccount:checkout:readonly-debug
no

# Step 3 -- find how it got there: check the Helm chart that renders
# this ConfigMap
grep -r PAYMENTPRO charts/checkout/templates/
charts/checkout/templates/configmap.yaml:  PAYMENTPRO_API_KEY: {{ .Values.paymentproApiKey }}
```

**Correct resolution.** The key is confirmed as a *genuinely live* production PaymentPro key (not
already a known-leaked test value), so it's rotated immediately with PaymentPro, following the
same precautionary step as the near-miss pattern this course discusses elsewhere — a key that was
exposed, even internally, is treated as compromised rather than assumed safe. The template is
changed from a `ConfigMap` entry to an `ExternalSecret`/`Secret` reference, following exactly the
pattern already established for `checkout-db-creds` earlier in this lesson, sourced from the
vault rather than a Helm values file at all.

**Why this failure happens, and why it's distinct from a leaked secret.** This isn't a leak in
the sense Lesson 10 covers (a secret that escaped to somewhere it was never meant to be) — it's a
secret that was deployed exactly where someone intended, using the wrong object type for that
intent. The lesson's own point that "the Secret object's real protection comes from who's allowed
to read it" cuts both ways: using a `ConfigMap` instead of a `Secret` doesn't just skip
base64-encoding, it opts the value into a completely different, broader RBAC surface, because
`ConfigMap` read access is routinely granted to debugging tools, other services, and junior roles
specifically on the assumption that nothing sensitive lives there.

**Prevention.** A policy-as-code rule (the kind covered later in this course) that scans rendered
Helm output for high-entropy strings or known secret-pattern keys (`API_KEY`, `PASSWORD`,
`TOKEN`) inside any `ConfigMap` — not just `Secret` objects — and blocks the deploy would catch
this class of mistake specifically, since gitleaks-style commit scanning alone wouldn't flag a
value that was always intended to be there, just in the wrong object type.

## Key terms

- **Kubernetes Secret** — an API object storing base64-encoded data; not encrypted by default without etcd encryption at rest configured
- **External Secrets Operator** — a pattern/controller that syncs a vault's secret into a Kubernetes Secret automatically, keeping the vault as the source of truth
- **Log masking** — a CI/CD platform feature (like GitHub Actions') that redacts known secret values from log output
- **Encryption at rest** — cluster-level configuration that actually encrypts Secret data stored in etcd, beyond base64 encoding
- **Object-type misconfiguration** — storing a sensitive value in a Kubernetes object type (like ConfigMap) that was never designed to restrict its visibility, independent of any RBAC or encryption settings on the correct object type

## Recap

A Kubernetes Secret's base64 encoding isn't encryption — real protection comes from RBAC and, ideally, etcd encryption at rest. The External Secrets Operator pattern keeps a real vault as the source of truth instead of manual copying, and CI/CD log masking is a safety net, not a substitute for never printing a secret on purpose. That closes Chapter 3 — next up, Chapter 4 covers the automated scanning that catches whatever still slips through.
