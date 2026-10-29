# Lesson 21 — Encryption at Rest and in Transit: Who Holds the Key

**Chapter 6 · Data Protection in the Cloud · Lesson 1 of 4**

## What you'll learn

- The real difference between platform-managed and customer-managed
  encryption keys, and why that difference is about control, not
  about strength
- How Azure Storage, Azure SQL, and AWS S3/EBS/RDS each implement
  encryption at rest, and where a customer-managed key plugs in
- Why encryption in transit is a *setting you enforce*, not a
  property you get automatically
- When a customer-managed key is actually required, versus when it's
  just extra operational overhead with no real security gain

## Encryption at rest isn't a yes/no question anymore

Every major Azure and AWS data service encrypts data at rest by
default now — that part stopped being a differentiator years ago. The
question that actually matters in a security engineering role is
**who holds the key that does the encrypting**, because that
determines who can decrypt the data, who can revoke access to it
instantly, and who has to prove control over it during an audit.

There are two models in play, under different names on each cloud:

**Platform-managed keys** (Microsoft-managed keys on Azure,
AWS-managed keys in SSE-S3/default KMS) — the cloud provider
generates, stores, and rotates the key entirely inside their own
infrastructure. You never see it, never touch it, and can't revoke it
independently of deleting the resource itself. This is the default on
nearly every service, it costs nothing extra, and for a large share of
workloads it's genuinely sufficient — the data is encrypted, the key
is managed by people whose whole job is managing keys correctly.

**Customer-managed keys (CMK)** — you create and own the key, in
Azure Key Vault or AWS KMS, and the storage/database service calls out
to that key vault to perform the actual encrypt/decrypt operations.
You control the key's access policy, its rotation schedule, and
critically, you can **revoke access to the key** — which immediately
makes the encrypted data unreadable, even though the ciphertext itself
never moves. That "kill switch" property is the entire reason CMK
exists: certain compliance frameworks (and certain customer contracts)
require that the customer retain the ability to independently cut off
access to their own data, separate from anything the cloud provider
does.

## How this looks on Azure

- **Azure Storage (blobs, files, queues, tables)**: encrypted at rest
  by default with Microsoft-managed keys (Storage Service Encryption).
  Switch the storage account's encryption setting to a customer-managed
  key, and it points at a key in Azure Key Vault instead — the storage
  account needs a managed identity with permission to call that vault.
- **Azure SQL Database / Managed Instance**: Transparent Data Encryption
  (TDE) is on by default, Microsoft-managed. You can bring your own
  TDE protector key from Key Vault if you need customer control over
  the database encryption key specifically.
- **Azure Disk Encryption** on VMs layers BitLocker (Windows) or
  dm-crypt (Linux) on top, with the encryption keys stored in Key
  Vault either way — this one's customer-managed by design, not an
  optional upgrade.

## How this looks on AWS

- **S3** gives you three real choices: **SSE-S3** (AWS holds and
  manages the key, default and free), **SSE-KMS** (the key lives in
  AWS KMS — can be the AWS-managed `aws/s3` key or a customer-managed
  KMS key you control), and **SSE-C** (you supply your own key on
  every request, and AWS never stores it at all — the highest
  customer-control model, and also the easiest to lock yourself out of
  if you lose the key).
- **EBS volumes**: encrypted by default in modern accounts, backed by
  a KMS key — AWS-managed or customer-managed, same tradeoff as S3.
- **RDS**: encryption is set at instance creation and can't be toggled
  on afterward without a snapshot-and-restore; again backed by a KMS
  key you can choose to manage yourself.

## Encryption in transit is a setting, not a given

This is the part engineers get wrong most often: encryption *at rest*
being on by default does not mean encryption *in transit* is enforced.
By default, most storage services will still answer a plain HTTP
request right alongside an HTTPS one unless you explicitly turn that
off.

- On Azure Storage, the **"Require secure transfer"** setting forces
  every connection to use HTTPS (or SMB 3.0 with encryption for Azure
  Files) and rejects plain HTTP outright. It's a per-storage-account
  toggle, off doesn't mean insecure-by-design, it means *unenforced*.
- On AWS S3, there's no single toggle — you enforce TLS with a bucket
  policy statement that denies any request where
  `aws:SecureTransport` is `false`. Miss that policy, and the bucket
  will serve plain HTTP to anyone who asks.
- Azure SQL Database and AWS RDS both support (and increasingly
  default to) enforced TLS for client connections, but connection
  strings that don't specify `Encrypt=true` or an SSL mode can still
  fall back to unencrypted in some driver configurations — check the
  client side, not just the server side.

The pattern across both clouds: **"encrypted in transit" is something
you configure and verify, not something you can assume because the
service supports TLS.**

## Choosing: when CMK is worth the overhead

Customer-managed keys cost real operational effort — key rotation
policies to maintain, access policies to audit, and a new single
point of failure if the key becomes inaccessible. Reach for CMK when:
a compliance framework or customer contract explicitly requires
customer-controlled key revocation, you need an audit trail of exactly
who accessed the key material (Key Vault and KMS both log every key
operation), or you need to guarantee data becomes unreadable the
moment you disable the key — for example, during an offboarding or a
suspected breach, independent of anyone deleting the underlying
storage. Outside those cases, platform-managed keys are not a lesser
security posture — they're the same encryption, managed by a team
whose only job is rotating and protecting keys correctly.

## Key terms

| Term | Meaning |
|---|---|
| Platform-managed key | Encryption key generated, stored, and rotated entirely by the cloud provider (Microsoft-managed key on Azure, AWS-managed key via SSE-S3/default KMS) |
| Customer-managed key (CMK) | A key you create and control in Azure Key Vault or AWS KMS; the service calls out to it, giving you independent revoke/rotate control |
| SSE-S3 / SSE-KMS / SSE-C | S3's three server-side encryption modes — AWS-managed key, KMS-backed key (AWS- or customer-managed), and customer-supplied key respectively |
| Require secure transfer | Azure Storage account setting that rejects plain HTTP/unencrypted SMB connections outright |
| `aws:SecureTransport` | The S3 bucket policy condition key used to deny any request not made over TLS |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: what
specific capability does a customer-managed key give you that a
platform-managed key does not, and why is "encryption at rest is
on by default" not the same claim as "encryption in transit is
enforced"?
