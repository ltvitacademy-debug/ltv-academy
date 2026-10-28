# Lesson 16 — Storage Redundancy (LRS/ZRS/GRS) and Lifecycle Management

**Chapter 4 · Azure Storage · Lesson 16 of 32**

## What you'll learn

- What **LRS**, **ZRS**, and **GRS** actually replicate, and how many copies of your data each one keeps
- The real cost-vs-durability tradeoff behind choosing a redundancy option
- How **lifecycle management policies** move blobs between Hot, Cool, and Archive automatically, and delete them, by age — instead of you doing it by hand
- How to set the redundancy option on a storage account and create a lifecycle policy with the Azure CLI

## LRS: three copies, one datacenter

**Locally Redundant Storage (LRS)** keeps **three synchronous copies** of your data within a single
datacenter in your chosen region. It's the cheapest redundancy option and protects against drive
and rack-level hardware failure, but it does **not** protect against a datacenter-wide outage — if
that one datacenter goes down, your data is unavailable until it recovers.

## ZRS: three copies, spread across availability zones

**Zone-Redundant Storage (ZRS)** also keeps three copies, but spreads them **synchronously across
separate Availability Zones** within the same region (the same Availability Zones you met back in
Chapter 3 for VM resilience). That protects you against a single datacenter failure, at a modest
cost increase over LRS, because the data is never only in one physical building.

## GRS: replicated to a paired region, asynchronously

**Geo-Redundant Storage (GRS)** takes LRS in your primary region and **asynchronously replicates**
a second LRS copy to Azure's designated **paired region**, hundreds of miles away. That protects
against a regional disaster — the kind of event ZRS can't survive, because ZRS never leaves one
region. The tradeoff is cost (you're now paying for storage in two regions) and the fact that
replication is asynchronous, so a handful of the most recent writes could theoretically be lost in
a true regional failure. **RA-GRS** is the same idea with one addition: read access to the
secondary region's copy even while the primary is healthy.

```bash
az storage account update \
  --name ltvstorage01 \
  --resource-group rg-storage-lab \
  --sku Standard_GRS
```

## Lifecycle management: automating the tier moves from Lesson 14

Lesson 14's backup example moved blobs from Hot to Cool to Archive by hand, on a schedule you kept
track of yourself. A **lifecycle management policy** does that automatically: a rule you define once
that Azure evaluates continuously, moving (or deleting) blobs in a container based on how long it's
been since they were last modified.

```bash
az storage account management-policy create \
  --account-name ltvstorage01 \
  --policy '{
    "rules": [{
      "name": "tier-and-expire-backups",
      "type": "Lifecycle",
      "definition": {
        "filters": { "blobTypes": ["blockBlob"], "prefixMatch": ["db-backups/"] },
        "actions": {
          "baseBlob": {
            "tierToCool":    { "daysAfterModificationGreaterThan": 7 },
            "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
            "delete":        { "daysAfterModificationGreaterThan": 365 }
          }
        }
      }
    }]
  }'
```

That one policy encodes the entire backup tiering plan from Lesson 14 — Hot for 7 days, Cool after
that, Archive after 90 days, deleted after a year — without a human ever touching a blob's tier
again.

## Key terms

| Term | Meaning |
|---|---|
| LRS | Locally Redundant Storage — 3 copies in one datacenter, cheapest, no datacenter-outage protection |
| ZRS | Zone-Redundant Storage — 3 copies across Availability Zones in one region |
| GRS | Geo-Redundant Storage — an LRS copy asynchronously replicated to a paired region |
| Lifecycle management policy | A rule that automatically tiers or deletes blobs based on age since last modification |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why does GRS protect against a
disaster that ZRS cannot, and what's the real cost you accept in exchange for that protection?
