# Lesson 16 — Encryption and Key Management in Azure and AWS

**Chapter 4 · Security and Compliance · Lesson 16 of 25**

## What you'll learn

- Why encryption at rest is largely automatic in both clouds, and why key management is where the real decisions live
- How Azure Key Vault stores and reveals secrets, keys, and certificates
- How AWS KMS organizes customer managed keys, and what "cryptographic configuration" actually means
- The three key-ownership tiers both clouds offer, and when each one matters for governance

## Encryption at rest is the default, not the decision

Both Azure and AWS now encrypt data at rest by default across their major storage services — Azure Storage, Azure SQL, S3, and EBS all apply encryption automatically, with no action required. That default has quietly shifted the real governance question away from *whether* data is encrypted and onto *who controls the key* that encrypts it — because the key is what actually determines who can prove ownership, who can revoke access instantly, and who satisfies a given compliance framework's key-custody requirements (a theme Lesson 17 picks up directly).

## Azure Key Vault: secrets, keys, and certificates together

**Azure Key Vault** is Azure's managed store for all three categories an application typically needs to protect: secrets (connection strings, passwords), keys (used directly for encryption operations), and certificates. A secret's version page shows exactly what's stored and how access to the value itself is gated:

![Screenshot showing a Key Vault secret version page with a Show Secret Value button and the value hidden.](/courses/cloud-data-governance-azure-and-aws/ch04/16-encryption-and-key-management-in-azure-and-aws/keyvault-secret-hidden.png)
*A secret version — metadata (created, updated, identifier) is visible by default; the value itself is not.*

Revealing it requires an explicit, separate action — **Show Secret Value** — which is itself a logged, auditable event, not something that happens incidentally while browsing the vault:

![Screenshot showing the same secret with Hide Secret Value and the plaintext value now visible.](/courses/cloud-data-governance-azure-and-aws/ch04/16-encryption-and-key-management-in-azure-and-aws/keyvault-secret-shown.png)
*After Show Secret Value — the plaintext appears, and the button flips to Hide Secret Value.*

This two-step pattern — metadata visible, value gated behind an explicit action — is the same design principle behind Always Encrypted and cell-level encryption from the T-SQL encryption lesson earlier in this catalog: separate who can see that a secret *exists* from who can see what it actually *contains*.

## AWS KMS: one key, several configuration dimensions

**AWS Key Management Service (KMS)** is the AWS equivalent, organizing access around **customer managed keys** — KMS keys an account creates and controls, as opposed to AWS managed keys created automatically on the account's behalf. A key's detail page splits its properties across general configuration and cryptographic configuration tabs:

![Screenshot showing an AWS KMS customer managed key's detail page, with General configuration and Cryptographic configuration tabs.](/courses/cloud-data-governance-azure-and-aws/ch04/16-encryption-and-key-management-in-azure-and-aws/kms-key-details.png)
*A symmetric KMS key — ARN, status, and (on the Cryptographic configuration tab) key type, origin, spec, and usage.*

The **Cryptographic configuration** tab answers four separate questions about the same key: its **Key Type** (symmetric or asymmetric), its **Origin** (AWS KMS-generated, imported, or backed by CloudHSM), its **Key Spec** (the specific algorithm family), and its **Key Usage** (encrypt/decrypt vs. sign/verify). Those four dimensions combine into real decisions — a key imported from an on-premises HSM for regulatory reasons is a different governance posture than one AWS generates and rotates automatically, even though both can look identical from an application calling `Encrypt`.

## Three tiers of key ownership, in both clouds

Both platforms converge on a strikingly similar three-tier model:

| Tier | Azure | AWS |
|---|---|---|
| Platform-managed | Platform-managed keys (no visibility) | AWS owned keys |
| Service-managed, visible | Microsoft-managed keys in Key Vault | AWS managed keys |
| Customer-managed | Customer-managed keys (CMK) in Key Vault | Customer managed keys (CMK) |

The governance-relevant tier is always the last one: a **customer-managed key** is the one an organization can rotate on its own schedule, restrict access to with its own policy, and — critically — **revoke**, which immediately makes every object encrypted under that key unreadable, anywhere, instantly. That revocation property is why regulated workloads (healthcare, financial services) frequently mandate customer-managed keys specifically, rather than accepting whatever tier a service defaults to.

## Key terms

| Term | Meaning |
|---|---|
| Azure Key Vault | Azure's managed store for secrets, keys, and certificates |
| AWS KMS | AWS's managed key service, organized around customer managed and AWS managed keys |
| Customer managed key (CMK) | A key the account creates and fully controls — rotation, access policy, and revocation |
| Key Spec | The specific cryptographic algorithm family a KMS key uses (e.g., SYMMETRIC_DEFAULT) |

## Lab

In a test Key Vault, create a secret, note what's visible before and after selecting Show Secret Value. Separately, in a test AWS account, create a symmetric customer managed KMS key and record its Key Spec, Origin, and Key Usage from the Cryptographic configuration tab — then explain in one sentence why those three fields matter more for governance than the key's actual numeric value ever would.

## Check yourself

- Why is "is data encrypted at rest" no longer the interesting governance question in either cloud?
- What's the practical, real-world consequence of revoking a customer-managed key that's actively encrypting live data?
- Name the Azure and AWS terms for the key tier an organization fully owns and controls, as opposed to the tier the platform manages invisibly.
