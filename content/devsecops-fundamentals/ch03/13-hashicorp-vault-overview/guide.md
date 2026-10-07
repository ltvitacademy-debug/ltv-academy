# HashiCorp Vault Overview

Key Vault and Secrets Manager are excellent choices when a workload lives entirely inside one cloud. Northbridge Retail doesn't — pieces of its pipeline run in Azure and AWS, with Kubernetes clusters in both. HashiCorp Vault is the option built for exactly that situation: one secrets platform, independent of any single cloud provider.

## What you'll learn

- Why a cloud-agnostic secrets platform matters for a multi-cloud pipeline like Northbridge Retail's
- What a "secrets engine" is, and why Vault's KV engine is only one of several
- How enabling a secrets engine works in the Vault UI
- Vault's dynamic secrets model, and how it goes further than scheduled rotation

## Why cloud-agnostic matters

Key Vault only makes sense inside Azure; Secrets Manager only inside AWS. That's fine when a workload stays inside one cloud, but Northbridge Retail's architecture doesn't: the AKS-hosted checkout service and the EKS-hosted data pipeline both need a way to read and write secrets through one consistent API, with one consistent access model, regardless of which cloud (or on-prem system) is asking. Vault runs as its own service — self-hosted or through HashiCorp Cloud Platform — and authenticates workloads from any environment through pluggable auth methods, rather than being tied to one cloud's identity system the way Key Vault is tied to Entra ID.

## Secrets engines: more than key/value storage

Vault organizes everything around **secrets engines** — pluggable components, each mounted at its own path, each handling a different kind of secret. The dashboard shows what's currently enabled:

![Vault UI dashboard showing enabled secrets engines, including cubbyhole and a KV v2 mount](/courses/devsecops-fundamentals/ch03/13-hashicorp-vault-overview/vault-ui-dashboard.png)
*The Vault dashboard lists every enabled secrets engine. The KV engine (shown here as "secret/") is the most common starting point, but Vault supports many more.*

The **KV (key/value) engine** is the direct equivalent of a Key Vault secret or a Secrets Manager entry — arbitrary key/value data, versioned, read and written through a simple path. But Vault also ships engines for things neither Azure nor AWS's native secret stores do natively: a **database engine** that generates short-lived database credentials on demand (not just rotating a long-lived password — issuing a brand-new one per request, with automatic expiration), a **PKI engine** that acts as an internal certificate authority, and a **transit engine** that performs encryption/decryption operations without ever storing the plaintext data itself.

## Enabling a secrets engine

Enabling a new KV engine means choosing a mount path and a version:

![Enabling a KV secrets engine in the Vault UI, with the path field set to sre-secrets](/courses/devsecops-fundamentals/ch03/13-hashicorp-vault-overview/vault-ui-enable-kv-path.png)
*The path determines the API route this engine is mounted at — here, "sre-secrets" rather than the default "secret/".*

The version choice matters: KV version 2 adds data versioning, check-and-set to prevent accidental overwrites, and soft-delete — the same kind of safety net Key Vault's automatic versioning provides by default.

![KV secrets engine version option set to 2, with an explanation of the difference from version 1](/courses/devsecops-fundamentals/ch03/13-hashicorp-vault-overview/vault-ui-kv-version-option.png)
*Version 2 keeps a history of changes per key; version 1 is a simpler, non-versioned store. Nearly every new mount should use version 2.*

## Dynamic secrets: a step beyond rotation

Secrets Manager's scheduled rotation (Lesson 12) replaces a credential on a timer. Vault's **dynamic secrets** go further: the database engine, for example, generates a brand-new, short-lived database credential *per request* — a pipeline job that needs database access gets its own unique username and password, valid only for that job's lease duration, and automatically revoked when the lease expires. There's no shared, long-lived credential to rotate in the first place, because no long-lived credential was ever issued.

## Key terms

- **Secrets engine** — a pluggable Vault component, mounted at its own path, handling one category of secret
- **KV (key/value) engine** — Vault's general-purpose secret store, the direct equivalent of a Key Vault secret or Secrets Manager entry
- **Dynamic secrets** — credentials generated on demand, per request, with automatic expiration — rather than one long-lived value that gets rotated
- **Mount path** — the API route a secrets engine is enabled at, chosen when the engine is set up

## Recap

Vault's cloud-agnostic design and pluggable secrets engines make it the right fit for a pipeline spanning multiple clouds, and its dynamic secrets model goes a step beyond scheduled rotation by never issuing a long-lived credential at all. Next up: the last piece of this chapter — getting secrets into pipelines and Kubernetes correctly, instead of the leak patterns from Lesson 10.
