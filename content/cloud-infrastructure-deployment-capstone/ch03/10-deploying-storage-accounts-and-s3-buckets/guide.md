# Lesson 10 — Deploying Storage Accounts and S3 Buckets

**Chapter 3 · Deploying Compute & Storage · Lesson 10 of 32**

## What you'll learn

- Why "create a storage account" or "create a bucket" is the easy part — the real deployment decision is its access configuration
- How to create a storage account or bucket that starts private by default, the same default-deny posture this program has taught since the identity and security chapters
- How to grant access to only the specific network or identity that actually needs it, instead of opening it broadly
- Real CLI for locking a storage account to a VNet and for turning on an S3 bucket's Block Public Access settings

## The create command is the easy 10%

You already know what a storage account and an S3 bucket are — the earlier Azure and AWS courses covered the account kinds, performance tiers, and storage classes in depth. Creating one is a single command. What actually matters in a real deployment is what happens right after creation: deciding exactly who, and what, is allowed to reach it. Skip that step and you've deployed working storage with the wrong security posture, which is an easier mistake to make than it sounds, because the storage itself works fine either way.

## Azure: deny by default, then open one specific path

```
az storage account create \
  --name ltvappstorage01 \
  --resource-group rg-prod-eastus \
  --location eastus \
  --sku Standard_LRS \
  --kind StorageV2 \
  --allow-blob-public-access false \
  --default-action Deny

az storage account network-rule add \
  --account-name ltvappstorage01 \
  --resource-group rg-prod-eastus \
  --vnet-name vnet-prod-eastus \
  --subnet snet-app-tier
```

`--allow-blob-public-access false` turns off anonymous public read access at the account level, and `--default-action Deny` means the account's firewall denies every request by default — including from inside Azure — until a rule explicitly allows it. The `network-rule add` call then opens exactly one path in: traffic from `snet-app-tier`, the subnet Lesson 9's VM is sitting in. Nothing else gets through unless a later rule adds it.

## AWS: Block Public Access, explicitly, every time

```
aws s3api create-bucket \
  --bucket ltv-app-prod-data \
  --region us-east-1

aws s3api put-public-access-block \
  --bucket ltv-app-prod-data \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

`create-bucket` alone doesn't make a bucket public — new buckets already default to private — but it also doesn't guarantee it stays that way if someone later attaches a permissive bucket policy or ACL. `put-public-access-block` with all four settings set to `true` is the explicit, account-level guarantee: no ACL, no bucket policy, and no cross-account grant can make this bucket or its objects public, no matter what gets configured on it later. That's the same "private by default, access granted deliberately" posture Lesson 9 applied to the network, now applied to storage.

## Granting access to the one thing that needs it

Neither of these commands grants anyone actual read or write access yet — they just lock the door. The next lesson, wiring compute to storage, is where the one VM or EC2 instance that genuinely needs to reach this storage gets a specific, scoped grant: a role assignment in Azure, an IAM policy in AWS. That two-step order — lock it down, then open exactly one path — is deliberate, and it's the same order this program has used for secrets and IAM since the identity chapters.

## Key terms

| Term | Meaning |
|---|---|
| `--default-action Deny` | Azure storage firewall setting that blocks all traffic by default until a rule allows it |
| Network rule (storage account) | An explicit exception to the default-deny firewall, scoped to a specific VNet/subnet |
| S3 Block Public Access | Account- or bucket-level settings that override any ACL or policy to guarantee a bucket can't be made public |
| Least privilege (storage) | Granting only the specific access a workload needs, not broad or public access "to be safe later" |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why does locking a storage account or S3 bucket down to deny-by-default, and only then opening one specific path, matter more than the fact that the storage account or bucket was created successfully?
