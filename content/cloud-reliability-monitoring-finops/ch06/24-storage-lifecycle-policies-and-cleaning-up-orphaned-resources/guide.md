# Lesson 24 — Storage Lifecycle Policies and Cleaning Up Orphaned Resources

**Chapter 6 · Optimizing Cloud Spend Without Breaking Reliability · Lesson 4 of 4**

## What you'll learn

- Why storage is the quietest category of cloud waste — nobody gets
  paged for a forgotten disk
- How Azure Blob Storage lifecycle management and Amazon S3 Lifecycle
  rules move data to cheaper tiers automatically, on real age and
  access patterns
- How to find and safely remove orphaned snapshots and unattached
  managed disks before deleting anything
- Why cleanup work needs its own change-control discipline, even
  though none of it looks like a production deployment

## Storage waste doesn't trigger an incident, so nobody fixes it

Compute waste tends to get noticed eventually — someone reviews a cost
report, sees a line item, and asks why a VM is that size. Storage
waste rarely gets that same scrutiny, because an unattached disk or an
old snapshot doesn't show up on an availability dashboard, doesn't
page anyone, and keeps costing money in near-total silence for as long
as nobody goes looking. This chapter's earlier lessons were about
compute that's actively running and oversized. This lesson is about
spend from resources that may not even be doing anything at all.

## Lifecycle policies: moving data to the tier it actually needs

Both major clouds let you set rules that automatically move or expire
data based on age and access pattern, rather than relying on someone
to remember to do it manually:

**Azure Blob Storage lifecycle management** rules work against a
storage account or container and act on blob age or last-access time:

```json
{
  "rules": [
    {
      "name": "move-and-expire-logs",
      "enabled": true,
      "type": "Lifecycle",
      "definition": {
        "filters": { "blobTypes": ["blockBlob"], "prefixMatch": ["logs/"] },
        "actions": {
          "baseBlob": {
            "tierToCool": { "daysAfterModificationGreaterThan": 30 },
            "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
            "delete": { "daysAfterModificationGreaterThan": 365 }
          }
        }
      }
    }
  ]
}
```

**Amazon S3 Lifecycle** rules do the equivalent through transitions and
expiration actions on a bucket or prefix — moving objects to
S3 Standard-IA, then S3 Glacier, then expiring them entirely after a
defined number of days, following the same shape: hot while it's
actually being read, cooler as it ages, archived or gone once it's
past its useful life.

The tier choice has a real retrieval-time and retrieval-cost tradeoff,
not just a storage-cost one — cool and archive tiers are cheaper to
store in but slower and sometimes costlier to read back out of.
Lifecycle rules belong on data whose access pattern genuinely matches
that curve: logs, backups, completed batch outputs, compliance
archives. They don't belong on data an application reads routinely —
moving that to archive tier "to save money" just moves the cost from
storage to a retrieval bill, with a latency hit on top.

## Finding orphaned snapshots and unattached disks

Unlike lifecycle tiering, which runs on a schedule once configured,
finding orphaned resources is a search-and-verify problem. The
classic candidates:

- **Unattached managed disks** — an Azure Managed Disk or an EBS
  volume left behind after the VM that used it was deleted, still
  billing for provisioned capacity with nothing reading or writing to
  it.
- **Old snapshots with no retention policy** — a snapshot taken before
  a risky change, as a safety net, that outlived the change it was
  protecting against by months or years.
- **Disks from decommissioned environments** — a test or staging
  environment that was torn down, except for the disks, which aren't
  part of the compute teardown and have to be cleaned up separately.

Finding them is a query against the resource inventory, not a manual
hunt:

```
# Azure CLI: managed disks with no attached VM
az disk list --query "[?diskState=='Unattached'].{name:name, sizeGB:diskSizeGb, id:id}" -o table

# AWS CLI: EBS volumes in 'available' (i.e. unattached) state
aws ec2 describe-volumes --filters Name=status,Values=available \
  --query "Volumes[].{Id:VolumeId,Size:Size,Created:CreateTime}" --output table
```

## Deleting is irreversible — treat it that way

Everything up to the point of deletion in this lesson — tiering,
listing, flagging — is low-risk and reversible. Deleting a snapshot or
a disk is not. Before removing anything found this way:

1. **Confirm it's actually orphaned**, not just quiet. A disk
   unattached today might be mid-migration, about to be reattached by
   an automated process, or intentionally detached pending a planned
   reattachment next week.
2. **Check retention and compliance requirements.** Some snapshots
   exist to satisfy a backup policy, not because someone forgot to
   clean up — deleting those is a compliance gap, not a cost win.
3. **Tag before you delete, don't delete on sight.** A common safe
   pattern is tagging candidates for deletion and waiting a defined
   grace period (commonly 7–30 days) before the actual delete runs,
   so anyone who notices the tag has time to object.
4. **Run cleanup through the same change process as any other
   production change.** It doesn't look like a deployment, but
   deleting the wrong disk has the same blast radius as one.

## Key terms

| Term | Meaning |
|---|---|
| Lifecycle policy | A rule that automatically moves data between storage tiers or expires it based on age/access pattern (Azure Blob lifecycle management, Amazon S3 Lifecycle) |
| Cool / Archive tier | Cheaper storage tiers with slower and sometimes costlier retrieval, appropriate for data that's rarely read |
| Orphaned resource | A disk, snapshot, or volume still billing for capacity with no attached VM or active owner |
| Deletion grace period | A waiting window between tagging a resource for deletion and actually deleting it, so an unnoticed dependency has time to surface |

## Check yourself

You're ready to move on when you can explain, without looking: why is
an unattached managed disk a different kind of waste than an oversized
VM, and what step should always happen between finding an orphaned
snapshot and deleting it?
