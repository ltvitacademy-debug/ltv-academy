# Secrets in Pipelines & Kubernetes

This chapter has covered three places to store a secret properly — Key Vault, Secrets Manager, Vault — and Lesson 10 covered how secrets leak when they aren't stored properly. This closing lesson connects the two: how do secrets actually get from one of those vaults into a running pipeline or a running pod, without recreating the leak patterns along the way?

## What you'll learn

- Why a Kubernetes Secret object is not encryption, by itself, and what that means in practice
- How CI/CD platforms like GitHub Actions handle secrets, including automatic log masking
- How the External Secrets Operator pattern syncs a vault's secret into a Kubernetes Secret automatically
- Why "secret in an environment variable" still needs care, even when the vault did its job correctly

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

## Key terms

- **Kubernetes Secret** — an API object storing base64-encoded data; not encrypted by default without etcd encryption at rest configured
- **External Secrets Operator** — a pattern/controller that syncs a vault's secret into a Kubernetes Secret automatically, keeping the vault as the source of truth
- **Log masking** — a CI/CD platform feature (like GitHub Actions') that redacts known secret values from log output
- **Encryption at rest** — cluster-level configuration that actually encrypts Secret data stored in etcd, beyond base64 encoding

## Recap

A Kubernetes Secret's base64 encoding isn't encryption — real protection comes from RBAC and, ideally, etcd encryption at rest. The External Secrets Operator pattern keeps a real vault as the source of truth instead of manual copying, and CI/CD log masking is a safety net, not a substitute for never printing a secret on purpose. That closes Chapter 3 — next up, Chapter 4 covers the automated scanning that catches whatever still slips through.
