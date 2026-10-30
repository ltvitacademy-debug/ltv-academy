# Lesson 7 — Configuring Cross-Cloud Replication

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 7 of 16**

## What you'll learn

- The nightly export that lands a portable backup of the storefront app's database in Azure Blob
  Storage
- The scheduled GitHub Actions workflow that copies that backup from Azure into the AWS S3 bucket
  from Lesson 6
- How the job authenticates to both clouds without a single stored long-lived secret
- How Theo verifies the first successful cross-cloud copy

## Step one: a portable export, landing in Blob Storage

Azure SQL Database already has point-in-time restore built in, but that only protects data
inside Azure. Driftwood wants a portable, cloud-agnostic backup file that can live anywhere — so
a nightly step exports the database to a `.bacpac` file in a Blob Storage container:

```bash
az sql db export \
  --resource-group rg-driftwood-prod \
  --server driftwood-sql-prod \
  --name storefrontdb \
  --storage-key-type StorageAccessKey \
  --storage-key "$BLOB_STORAGE_KEY" \
  --storage-uri "https://driftwoodstorageprod.blob.core.windows.net/db-backups/storefrontdb-$(date +%F).bacpac" \
  --admin-user "$SQL_ADMIN_USER" \
  --admin-password "$SQL_ADMIN_PASSWORD"
```

## Step two: a scheduled workflow that replicates it to AWS

A second workflow, separate from the deploy pipeline, runs on a cron schedule every night and
copies the newest Blob Storage export into the AWS S3 bucket Lesson 6 created:

```yaml
# .github/workflows/cross-cloud-replication.yml
on:
  schedule:
    - cron: "0 7 * * *"   # 07:00 UTC, every day

jobs:
  replicate:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Azure login (OIDC)
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Download latest backup from Blob Storage
        run: |
          az storage blob download \
            --account-name driftwoodstorageprod \
            --container-name db-backups \
            --name "storefrontdb-$(date -u +%F).bacpac" \
            --file ./latest-backup.bacpac

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/driftwood-replication-role
          aws-region: us-east-1

      - name: Upload to S3
        run: |
          aws s3 cp ./latest-backup.bacpac \
            s3://driftwood-app-backups/$(date -u +%F)/storefrontdb-$(date -u +%F).bacpac
```

## No stored long-lived secret, on either side

`azure/login@v2` authenticates with the same OIDC federated credential pattern from Lesson 5.
`aws-actions/configure-aws-credentials@v4` does the AWS-side equivalent: GitHub's OIDC token is
exchanged, through a trust relationship configured on `driftwood-replication-role`, for short-lived
AWS credentials scoped to exactly that role — the same role whose IAM policy Lesson 6 wrote,
allowing only `s3:PutObject` and `s3:ListBucket` on this one bucket. No AWS access key or secret
key is ever stored in GitHub Secrets.

## Verifying the first successful copy

```bash
aws s3 ls s3://driftwood-app-backups/
```

```
                           PRE 2026-10-29/
                           PRE 2026-10-30/
```

A new dated prefix appearing after the scheduled run confirms the chain works end to end: Azure
SQL export → Blob Storage → scheduled workflow → S3, with every hop authenticated and nothing
copy-pasted by hand.

## Key terms

| Term | Meaning |
|---|---|
| `.bacpac` export | A portable Azure SQL Database backup format, usable outside Azure |
| Scheduled workflow (`cron`) | A GitHub Actions workflow triggered on a time schedule instead of a push |
| `role-to-assume` (AWS OIDC) | The AWS IAM role a GitHub workflow assumes via short-lived token exchange, with no static keys |
| Cross-cloud replication | Copying data from one cloud provider's storage into another's, for disaster recovery |

## Lab

Write the cron expression for "every day at 2:00 AM UTC" yourself, and explain in one sentence why
a scheduled workflow is the right tool here instead of triggering replication on every `git push`.

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: what two separate OIDC trust
relationships does this replication job rely on, and what command would you run to confirm last
night's backup actually landed in the S3 bucket?
