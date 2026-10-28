# Lesson 9 — Encryption at Rest: How Cloud Providers Actually Do It

**Chapter 3 · Cloud Encryption: At Rest and In Transit · Lesson 9 of 32**

## What you'll learn

- What "encryption at rest" actually means, and the specific threat it defends against
- That Azure and AWS encrypt almost all of their storage services by default now, not as an opt-in extra
- Which real services this applies to — Storage Accounts, Amazon S3, Managed Disks, Amazon EBS — and the algorithm underneath (AES-256)
- Why encryption at rest alone doesn't stop someone who already has valid access to your data

## Encrypted by default now

Azure Storage Accounts, Azure Managed Disks, Amazon S3, and Amazon EBS volumes are all encrypted at
rest using **AES-256** by default now — you don't flip a switch or write a line of code to turn it
on. The provider generates an encryption key, encrypts your data with it before writing to physical
storage, and decrypts it automatically when an authorized request reads it back. This used to be an
optional, extra-cost feature on both platforms years ago; today it's simply the default state for
nearly every storage service you'll touch in Azure or AWS.

## What "at rest" actually means

"At rest" specifically means data sitting on a physical disk, SSD, or tape, rather than data moving
across a network or actively being processed in memory — the "in transit" and "in use" cases this
chapter and others cover separately. The real threat encryption at rest defends against is **physical
access to the underlying hardware**: a decommissioned drive pulled from a data center, a stolen
backup tape, or a technician handling a failed disk after it's swapped out of a server. Without
encryption at rest, that physical media would hold your raw, readable data; with it, the media holds
unreadable ciphertext that's useless without the key.

## What it doesn't protect against

Encryption at rest does **not** protect you from someone who already has valid, authorized access to
your data through the normal API or portal. A leaked access key, an over-permissioned IAM role, or a
compromised admin account can all still read your data in plain form, because the cloud platform
decrypts it transparently for any authorized request — that's the whole point of the data being
usable at all. Encryption at rest is a defense against stolen or mishandled hardware, not a
substitute for the identity and access controls covered in Chapters 1 and 2.

## Who's actually holding the key

Right now, the key doing all of this encrypting and decrypting is generated and managed entirely by
the cloud provider — you never see it. That's convenient, but it also means you're trusting the
provider's own key-management process completely. The next lesson looks at the two services that
actually generate and guard these keys: Azure Key Vault and AWS KMS.

## Key terms

| Term | Meaning |
|---|---|
| Encryption at rest | Encrypting data while it's stored on physical media (disk, SSD, tape), not while it's moving or being processed |
| AES-256 | The symmetric encryption algorithm most cloud providers use by default for data at rest |
| Platform-managed key | An encryption key the cloud provider generates and manages for you automatically (covered in depth in Lesson 11) |
| Threat model | The specific kind of attack or access a given protection is designed to stop |

## Check yourself

If a cloud storage service encrypts everything at rest automatically, why can an attacker with a
stolen but valid access key still read your data in plain, readable form?
