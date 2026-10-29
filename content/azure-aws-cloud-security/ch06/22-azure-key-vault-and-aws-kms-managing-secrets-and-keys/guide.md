# Lesson 22 — Azure Key Vault and AWS KMS: Managing Secrets and Keys

**Chapter 6 · Data Protection in the Cloud · Lesson 2 of 4**

## What you'll learn

- What Azure Key Vault actually stores, and the difference between
  its legacy access policies and Azure RBAC for Key Vault
- What AWS KMS actually stores, and how a KMS key policy differs from
  an IAM policy — including the "default key policy" trap
- How key rotation really works on each service, and what rotating a
  key does and doesn't change
- How applications are supposed to retrieve secrets and keys without
  anyone ever hardcoding them

## Azure Key Vault: one vault, three kinds of objects

Azure Key Vault is a managed store for three distinct object types,
and it's worth being precise about which is which: **keys**
(cryptographic keys used for encrypt/decrypt and sign/verify
operations — this is what backs customer-managed-key encryption from
the last lesson), **secrets** (arbitrary small blobs — connection
strings, API keys, passwords — stored as ciphertext and returned on
request), and **certificates** (X.509 certificates, with Key Vault
handling renewal from an integrated CA).

Access to a vault is controlled one of two ways, and this is a common
source of confusion because both still exist in live environments:

- **Vault access policies** (the original model) — a flat list
  attached directly to the vault, granting a security principal a set
  of permissions per object type (e.g., `get`/`list` on secrets,
  `decrypt` on keys). Access policies are vault-scoped only — you
  can't manage them with Azure RBAC, and they don't show up in a
  subscription-wide access review.
- **Azure RBAC for Key Vault** (the current recommended model) — the
  vault's data plane is governed by standard Azure role assignments
  (`Key Vault Secrets User`, `Key Vault Crypto Officer`, etc.), scoped
  at the vault, resource group, or subscription level like any other
  Azure RBAC role. This is what lets Key Vault access show up
  consistently in access reviews and Privileged Identity Management
  alongside everything else.

A vault is set to one model or the other — check which one before you
assume Azure RBAC role assignments are governing access, because a
vault still on access policies will quietly ignore them.

## AWS KMS: keys controlled by key policies, not just IAM

AWS KMS stores **customer master keys** (CMKs — now just called "KMS
keys") used for encrypt/decrypt and for generating the data keys that
back S3, EBS, and RDS encryption. KMS does **not** store arbitrary
secrets the way Key Vault does — that's AWS Secrets Manager's job
(itself encrypted using a KMS key underneath).

The access model is the part that trips people up coming from IAM:
every KMS key has its own **key policy** — a resource-based policy
attached directly to the key, separate from any IAM policy attached to
a user or role. For a principal to use a KMS key, **both** the IAM
policy on their identity and the key policy on the key have to allow
it — it's an intersection, not an either/or. Most customer-managed KMS
keys ship with a default key policy that simply delegates control back
to IAM policies in the account (`"Enable IAM User Permissions"`), which
is why many engineers never notice the key policy layer exists — until
they lock themselves out by editing it and removing that
delegation statement, at which point *no* IAM policy can restore
access without using the account root user.

## Key rotation: what actually changes

- **Key Vault**: keys can have a rotation policy that generates a new
  key version on a schedule (e.g., every 180 days). Rotation creates a
  **new version** of the key — old versions remain available so data
  encrypted under them can still be decrypted. Secrets don't
  auto-rotate; that's an application-level responsibility (often paired
  with Event Grid notifications when a secret is nearing expiry).
- **AWS KMS**: customer-managed keys support automatic annual
  rotation, and AWS-managed keys rotate automatically on their own
  schedule (roughly every year) with no option to disable it. Like
  Key Vault, rotation generates new cryptographic material while
  retaining old key material internally, so previously encrypted data
  stays decryptable — you're never forced to re-encrypt everything the
  moment a key rotates.

In both systems, rotating a key is **not** the same as re-encrypting
all the data under it — it changes what gets used for *new*
encryption going forward, while old ciphertext stays readable via
retained key material or key versions.

## Getting secrets to an application without hardcoding them

The pattern on both clouds is the same shape: give the compute
identity permission to the vault/secret store, and let the application
fetch secrets at runtime instead of baking them into code or config
files.

- **Azure**: a VM, App Service, or Function gets a **managed
  identity**, which is granted a Key Vault RBAC role or access policy.
  The app's SDK calls Key Vault at startup (or on demand) using that
  identity — no connection string, no client secret, ever checked into
  source control.
- **AWS**: an EC2 instance, Lambda function, or ECS task gets an
  **IAM role**, whose policy (intersected with the secret's resource
  policy, if any) allows `secretsmanager:GetSecretValue` or
  `kms:Decrypt`. The application calls Secrets Manager or KMS using
  that role's temporary credentials.

Either way, the goal is identical: the application authenticates as
*itself* to fetch the secret, rather than the secret being embedded
anywhere a `git log` or a disk image could expose it.

## Key terms

| Term | Meaning |
|---|---|
| Vault access policy | Azure Key Vault's original, vault-scoped permission model — not visible to Azure RBAC access reviews |
| Azure RBAC for Key Vault | The current recommended model: standard Azure role assignments govern the vault's data plane |
| KMS key policy | A resource-based policy attached directly to an AWS KMS key; must allow an action *in addition to* IAM, not instead of it |
| Automatic key rotation | Scheduled generation of new key material (Key Vault: configurable; KMS: annual for customer-managed keys) that preserves old versions so existing ciphertext stays decryptable |
| Managed identity / IAM role | The mechanism an application uses to authenticate to a vault/secret store without any credential hardcoded in code or config |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
can removing the default statement from a KMS key's key policy lock
everyone out even if their IAM policy grants full KMS access, and what
is the practical difference between Key Vault's access policies and
Azure RBAC for Key Vault?
