# Script — HashiCorp Vault Overview

## Segment 1 (title)

Key Vault and Secrets Manager work well inside one cloud, but Northbridge Retail's pipeline spans both Azure and AWS. HashiCorp Vault is built for exactly that: one secrets platform, independent of any single cloud provider.

## Segment 2 (steps)

The AKS-hosted checkout service and the EKS-hosted data pipeline both need to read and write secrets through one consistent API and access model, regardless of which cloud is asking. Vault runs as its own service and authenticates workloads from any environment through pluggable auth methods, instead of being tied to one cloud's identity system.

## Segment 3 (screenshot)

Vault organizes everything around secrets engines — pluggable components, each mounted at its own path, each handling a different kind of secret. The dashboard lists what's currently enabled, with the key-value engine as the most common starting point.

## Segment 4 (screenshot)

Enabling a new engine means choosing a mount path — the API route it's reachable at. Vault also ships engines beyond key-value: a database engine that generates short-lived credentials on demand, a PKI engine acting as an internal certificate authority, and a transit engine for encryption operations that never stores the plaintext itself.

## Segment 5 (screenshot)

The version choice matters too. KV version 2 adds data versioning, check-and-set to prevent accidental overwrites, and soft-delete — nearly every new mount should use it over the simpler, non-versioned version 1.

## Segment 6 (outro)

Vault's dynamic secrets go a step past scheduled rotation — a database credential generated fresh per request, with automatic expiration, means there's no long-lived credential to rotate in the first place. Next up: getting secrets into pipelines and Kubernetes correctly.
