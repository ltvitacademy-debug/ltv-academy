# Lesson 11 — Wiring Compute to Storage Correctly

**Chapter 3 · Deploying Compute & Storage · Lesson 11 of 32**

## What you'll learn

- Why the VM or EC2 instance from Lesson 9 still can't reach the storage account or bucket from Lesson 10 — on purpose
- How a system-assigned managed identity gives a VM its own Azure AD identity, with no credential for anyone to manage
- How an EC2 instance profile does the identical job on AWS, exactly as covered back in the IAM fundamentals chapter
- How to scope the actual permission grant to one storage account or bucket, not a subscription or account-wide role

## Right now, nothing can reach the storage

Lesson 10 locked the storage account down to deny-by-default and the S3 bucket's public access down to blocked entirely. That was deliberate — and it means, as of right now, the VM from Lesson 9 has no way to read or write to either one. That's not a bug to fix by opening things back up. It's the correct intermediate state: compute and storage both exist, locked down, waiting for one specific, scoped connection between them.

## Azure: a managed identity, not a connection string

```
az vm identity assign \
  --resource-group rg-prod-eastus \
  --name vm-app01

az role assignment create \
  --assignee <principalId-from-identity-assign> \
  --role "Storage Blob Data Contributor" \
  --scope /subscriptions/<sub-id>/resourceGroups/rg-prod-eastus/providers/Microsoft.Storage/storageAccounts/ltvappstorage01
```

`az vm identity assign` gives `vm-app01` a system-assigned managed identity — the exact mechanism the identity chapter covered for Key Vault, now applied to storage. No password or key gets generated or stored anywhere. `role assignment create` then grants that identity the `Storage Blob Data Contributor` role, scoped with `--scope` to this one storage account specifically — not the resource group, not the subscription. The application on the VM authenticates using the VM's identity at runtime and never handles a storage account key at all, which is the whole point.

## AWS: the instance profile pattern, applied here

```
aws iam create-role \
  --role-name app-server-role \
  --assume-role-policy-document file://ec2-trust-policy.json

aws iam put-role-policy \
  --role-name app-server-role \
  --policy-name s3-read-write \
  --policy-document file://s3-data-bucket-policy.json

aws iam create-instance-profile --instance-profile-name app-server-profile
aws iam add-role-to-instance-profile \
  --instance-profile-name app-server-profile \
  --role-name app-server-role

aws ec2 associate-iam-instance-profile \
  --instance-id i-0123456789abcdef0 \
  --iam-instance-profile Name=app-server-profile
```

This is the identical pattern the IAM fundamentals chapter covered for an EC2 instance reaching S3: a role with a trust policy allowing EC2 to assume it, a policy scoped to the one bucket (`ltv-app-prod-data`) from Lesson 10, wrapped in an instance profile and attached to the running instance. AWS's STS issues temporary credentials behind the scenes — there's still no access key sitting in a config file on the instance.

## Why this is the whole point of the chapter

This is the connection the last three lessons were building toward: a VM or EC2 instance, deployed into the right subnet and security boundary, reaching storage that's locked down by default, through an identity-based grant scoped to exactly one resource. No embedded credential exists anywhere in this chain for anyone to leak, commit, or forget to rotate.

## Key terms

| Term | Meaning |
|---|---|
| System-assigned managed identity | An Azure AD identity tied to a specific VM's lifecycle, requiring no stored credential |
| `Storage Blob Data Contributor` | An Azure RBAC role granting read/write on blob data, scoped to a specific storage account |
| EC2 instance profile | The AWS mechanism that attaches an IAM role, and its temporary STS credentials, to a running instance |
| Scoped role assignment | Granting a role at the level of one specific resource, not a resource group, subscription, or account |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why is it correct, not broken, that the VM from Lesson 9 can't reach the storage from Lesson 10 until this lesson's identity-based grant is in place?
