# Lesson 10 — Azure Key Vault and AWS KMS Concepts

**Chapter 3 · Cloud Encryption: At Rest and In Transit · Lesson 10 of 32**

## What you'll learn

- What Azure Key Vault actually is: a centralized store for keys, secrets, and certificates
- What AWS KMS actually is, and how its scope is narrower than Key Vault's on purpose
- The core jobs both services do at a conceptual level: generate, store, rotate, and gate access to keys
- Why centralizing key management like this matters, instead of letting every application manage its own keys

## Azure Key Vault: keys, secrets, and certificates in one place

**Azure Key Vault** is Microsoft's centralized service for managing encryption keys, secrets, and
certificates used by applications and other Azure services. Rather than each application generating
and storing its own encryption key, apps and services call Key Vault to create one, and Key Vault
handles generating it, storing it in hardware-protected storage, and controlling who's allowed to
use it. Key Vault covers three distinct things under one roof: cryptographic **keys** (used to
encrypt and decrypt data, the subject of this lesson), **secrets** (connection strings, API keys —
covered in depth in Chapter 4), and **certificates** (TLS certificates used for encryption in
transit, covered later in this chapter).

## AWS KMS: AWS's dedicated key-management service

**AWS KMS** (Key Management Service) is AWS's direct counterpart to Key Vault's key-management role
— but its scope is narrower, on purpose. KMS is scoped specifically to encryption keys: generating
them, storing them in hardware security modules, and controlling which IAM users, roles, or AWS
services are allowed to use a given key to encrypt or decrypt data. Unlike Key Vault, KMS doesn't
itself store general-purpose secrets or certificates — AWS splits that responsibility out to separate
services (AWS Secrets Manager and AWS Certificate Manager), which later lessons cover for secrets and
TLS certificates specifically.

## What both services actually do

Strip away the branding, and Key Vault and KMS do the same four jobs: **generate** — create a new
key using the provider's underlying hardware random generator; **store** — keep the key inside a
hardware-backed vault that your code never directly retrieves; **rotate** — periodically replace the
key material on a schedule without breaking the applications that use it; and **gate access** —
check every single request to use a key against an access policy before allowing an encrypt or
decrypt operation to go through. Applications don't pull the raw key out; they send data and ask the
service to perform the cryptographic operation for them.

## Why centralize key management at all

Without a key management service, each team and application would generate, hardcode, and rotate its
own keys — creating exactly the sprawling, unauditable mess that encryption at rest was meant to
guard against in the first place. Centralizing in Key Vault or KMS gives an organization one place to
see every key in use, one place to enforce a rotation policy, and one audit log showing exactly which
identity used which key, and when. This centralized model is also the mechanism behind
customer-managed keys, which Lesson 11 covers in depth.

## Key terms

| Term | Meaning |
|---|---|
| Azure Key Vault | Microsoft's centralized service for storing and managing keys, secrets, and certificates |
| AWS KMS | AWS's Key Management Service — scoped specifically to generating, storing, and controlling access to encryption keys |
| Hardware security module (HSM) | A physical or virtual device that generates and stores keys so the raw key material never leaves it |
| Key rotation | Periodically replacing a key's underlying material on a schedule, without breaking apps that use it |

## Check yourself

Why does Azure Key Vault manage secrets and certificates alongside encryption keys, while AWS KMS
keeps its scope limited to just keys?
