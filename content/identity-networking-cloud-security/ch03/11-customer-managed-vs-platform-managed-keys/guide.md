# Lesson 11 — Customer-Managed vs. Platform-Managed Keys

**Chapter 3 · Cloud Encryption: At Rest and In Transit · Lesson 11 of 32**

## What you'll learn

- What a platform-managed key is, and why it's the default protecting nearly everything you create
- What a customer-managed key (CMK) is, and what extra control it actually buys you
- The real compliance reason some organizations require CMKs
- The real, well-documented risk CMKs introduce that platform-managed keys don't have

## Platform-managed keys: zero setup, the default

When you create an Azure Storage Account or an Amazon S3 bucket and do nothing extra, the encryption
at rest from Lesson 9 is already active using a **platform-managed key**. The cloud provider
generates this key, stores it, rotates it on its own internal schedule, and manages its entire
lifecycle without you ever seeing or touching it. This is exactly why default encryption needs zero
setup — there's no key for you to create, configure, or lose. The tradeoff is that you also have no
direct control: you can't set a custom rotation schedule, you can't see a detailed log of every single
use of that specific key, and you can't revoke it yourself.

## Customer-managed keys: you hold the key

A **customer-managed key (CMK)** flips that. You generate (or import) the key yourself inside Azure
Key Vault or AWS KMS, then point your Storage Account, S3 bucket, or managed disk at that specific
key instead of letting the platform supply its own. You now decide the rotation schedule, you can see
every encrypt and decrypt operation against that key in the service's audit log, and you can revoke
access to the key — or delete it outright — whenever you choose.

## Why some organizations require CMKs

Several compliance frameworks and contractual requirements specifically mandate customer-managed
keys, not because platform-managed keys are cryptographically weaker (both still rely on AES-256
under the hood) but because auditors want documented proof that the *customer*, not the vendor,
controls access to the data. Regulated industries like healthcare, finance, and government contracting
commonly require this level of demonstrable key control as part of their compliance posture, which is
why "do you support customer-managed keys" is a routine question in enterprise security reviews.

## The real risk of managing your own key

Customer-managed keys come with a real, well-documented risk: if you delete or lose access to a CMK,
the data it was protecting becomes permanently, cryptographically unreadable — there's no "forgot my
key" recovery path, because the entire point of the key is that nobody, including the cloud provider,
can bypass it. This is also useful deliberately: deleting a CMK is a legitimate way to instantly and
irreversibly destroy access to everything it protects, sometimes called **crypto-shredding**. But it
means CMK adoption comes with real operational responsibility that platform-managed keys simply don't
carry.

## Key terms

| Term | Meaning |
|---|---|
| Platform-managed key (PMK) | A key the cloud provider generates and fully manages for you, with zero setup required |
| Customer-managed key (CMK) | A key you generate and control yourself in Key Vault or KMS, giving you rotation, audit, and revocation control |
| Crypto-shredding | Deliberately deleting a key to instantly and irreversibly destroy access to the data it protected |
| Compliance posture | The documented evidence an organization can show auditors that it meets a given framework's requirements |

## Check yourself

Why would a compliance auditor care whether a key is customer-managed, if both platform-managed and
customer-managed keys ultimately use the same AES-256 encryption underneath?
