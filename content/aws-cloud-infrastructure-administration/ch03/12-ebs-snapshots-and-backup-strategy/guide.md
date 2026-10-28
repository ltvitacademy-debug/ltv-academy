# Lesson 12 — EBS Snapshots and Backup Strategy

**Chapter 3 · AWS Storage: S3 and EBS · Lesson 12 of 32**

## What you'll learn

- What an **EBS snapshot** actually is: a point-in-time, incremental backup of a volume, stored
  behind the scenes in S3
- Why the **first** snapshot and every snapshot after it cost and take different amounts of time
- How to restore a snapshot into a brand-new volume — including in a different Availability Zone
- Why a real backup strategy means **scheduled** snapshots, not a one-time manual backup and hope

## Snapshots: a point-in-time, incremental backup

An **EBS snapshot** is a point-in-time copy of everything on a volume at the moment you take it,
and AWS stores snapshots in **S3 behind the scenes** — you don't manage a bucket for it yourself,
but that's the real storage layer underneath. The important word is **incremental**: the first
snapshot of a volume copies every block, but every snapshot after that only copies the blocks
that **changed** since the last snapshot. That's why a nightly snapshot schedule doesn't cost or
take anywhere near as much as a full copy every night — AWS is only persisting the delta, even
though each snapshot still represents the complete state of the volume at that point in time when
you restore from it.

```bash
aws ec2 create-snapshot \
  --volume-id vol-0abcd1234efgh5678 \
  --description "nightly backup 2026-10-28"
```

## Restoring: create a new volume from a snapshot

A snapshot by itself isn't something an instance can use directly — to actually use that data
again, you restore it by creating a **new volume** from the snapshot. The new volume doesn't have
to be in the same Availability Zone the original volume was in, which is the real escape hatch
from the AZ-binding covered in Lesson 11: if you need to move data to a different AZ (or recover
after one fails), you snapshot the volume, then create the replacement volume from that snapshot
in whichever AZ you need.

```bash
aws ec2 create-volume \
  --availability-zone us-east-1b \
  --snapshot-id snap-0a1b2c3d4e5f67890
```

## Backup strategy: scheduled, not hopeful

A single manual snapshot is better than nothing, but it isn't a backup **strategy** — it's a
snapshot of whatever the volume looked like on the one day someone remembered to take it. A real
strategy means **scheduled, automated snapshots** with a defined retention policy, so there's
always a recent recovery point no matter when a volume actually fails. AWS's **Amazon Data
Lifecycle Manager (DLM)** exists specifically to automate this: you define a policy that takes
snapshots of tagged volumes on a schedule and deletes snapshots past a retention age, so the
backup plan keeps running whether or not anyone remembers it that day.

## Key terms

| Term | Meaning |
|---|---|
| EBS snapshot | A point-in-time, incremental backup of a volume, stored in S3 behind the scenes |
| Incremental | Only blocks changed since the last snapshot are copied — not a full re-copy every time |
| Restore | Creating a new EBS volume from a snapshot, in any Availability Zone |
| Amazon Data Lifecycle Manager (DLM) | AWS service that automates snapshot scheduling and retention |

## Check yourself

You're ready for Chapter 4 when you can explain, without looking: why does a nightly snapshot
schedule stay cheap over time even though each snapshot represents the volume's full state at
that moment?
