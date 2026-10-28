# Lesson 14 — Blob Storage: Containers and Access Tiers

**Chapter 4 · Azure Storage · Lesson 14 of 32**

## What you'll learn

- How **blob containers** organize object storage inside a storage account, and why the namespace
  underneath them is still flat
- The three real **access tiers** — Hot, Cool, and Archive — and the cost/latency tradeoff each one makes
- How to walk through a real backup scenario and decide which tier fits which part of its lifecycle
- How to create a container and upload a blob at a specific tier with the Azure CLI

## Containers: a flat namespace with folder-like names

A **blob container** is where your actual objects live inside a storage account — the Azure
equivalent of the "bucket" concept from the prior course's object-storage lesson (an S3 bucket is
the closest parallel). Underneath a container, blob names can contain `/` characters that make the
Azure portal *display* something that looks like folders, but the storage itself stays flat — the
same object/block/file idea you already learned, now with Azure's real names attached to it.

```bash
az storage container create \
  --account-name ltvstorage01 \
  --name db-backups \
  --auth-mode login
```

## The three access tiers: Hot, Cool, Archive

Every blob sits in one of three **access tiers**, and the tradeoff is always the same shape: lower
storage cost in exchange for higher retrieval cost and latency.

- **Hot** — highest storage cost, lowest access cost, no retrieval delay. For data you read or
  write frequently.
- **Cool** — lower storage cost than Hot, higher access cost, meant for data accessed infrequently
  but still needed within milliseconds — think data you keep for at least 30 days.
- **Archive** — the cheapest storage cost by far, but the data is offline: a rehydration request is
  required before you can read it, and that can take **hours**, not milliseconds. Archive is for
  data you're very unlikely to touch but must retain, often for compliance.

## A real example: tiering nightly database backups

Say a team takes a nightly backup of a production database. For the first 7 days, those backups
stay in **Hot** — if something breaks, you want the most recent backup instantly. After 7 days,
move them to **Cool** — still retrievable fast, but you're not paying Hot prices for a backup
you're unlikely to restore. After 90 days, move them to **Archive** — you're required to keep a
year of backups for compliance, but you'd only ever need one in a genuine disaster-recovery event,
and an hours-long rehydration wait is acceptable in that scenario. (Lesson 16 automates exactly this
tier progression with a lifecycle management policy, instead of moving blobs by hand.)

```bash
az storage blob upload \
  --account-name ltvstorage01 \
  --container-name db-backups \
  --name 2026-10-28-nightly.bak \
  --file ./2026-10-28-nightly.bak \
  --tier Cool
```

## Key terms

| Term | Meaning |
|---|---|
| Blob container | The namespace inside a storage account where blobs live — Azure's version of a "bucket" |
| Hot tier | Highest storage cost, lowest/no access cost — frequently accessed data |
| Cool tier | Lower storage cost than Hot, some access cost — infrequently accessed data kept 30+ days |
| Archive tier | Cheapest storage, offline — a rehydration request (hours) is required before reading |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why would a company keep a
one-year-old compliance backup in Archive instead of Cool, even though Cool is still much cheaper
than Hot?
