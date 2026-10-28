# Lesson 10 — S3 Versioning, Lifecycle Rules, and Access Control

**Chapter 3 · AWS Storage: S3 and EBS · Lesson 10 of 32**

## What you'll learn

- How **versioning** protects an S3 bucket from accidental overwrites and deletes, and what
  actually happens to a "deleted" object once it's turned on
- How a **lifecycle rule** automates moving objects to cheaper storage classes, or expiring
  them, purely by age
- The two policy layers that control S3 access — **bucket policies** and **IAM policies** —
  and how they interact
- Why an accidentally public bucket is one of the most common real-world cloud security
  mistakes, and the setting that exists specifically to stop it

## Versioning: nothing is really gone

By default, uploading an object to a key that already exists **overwrites** it, and deleting an
object removes it for good. **Versioning**, once enabled on a bucket, changes both of those
behaviors: every `PUT` to the same key creates a brand-new version with its own version ID
instead of erasing the old one, and a plain `DELETE` doesn't actually destroy anything — it adds
a **delete marker** on top of the existing versions, which just makes the object appear gone
until you either remove the marker or deliberately delete a specific version ID. That's the real
protection versioning buys you: someone fat-fingering a delete, or a script overwriting the wrong
file, is recoverable instead of catastrophic.

```bash
aws s3api put-bucket-versioning \
  --bucket ltv-academy-media-backups \
  --versioning-configuration Status=Enabled
```

## Lifecycle rules: aging data out automatically

A **lifecycle rule** is a policy attached to a bucket (optionally scoped to a prefix) that
automatically transitions objects between storage classes, or expires them outright, based purely
on how old they are. Instead of someone remembering to move last year's logs to Glacier, you write
the rule once and S3 enforces it forever. Lifecycle rules can also target **noncurrent versions**
specifically — a common pairing with versioning, so old versions don't quietly pile up (and cost
money) forever once you turn versioning on.

```bash
aws s3api put-bucket-lifecycle-configuration \
  --bucket ltv-academy-media-backups \
  --lifecycle-configuration file://lifecycle.json
```

```json
{
  "Rules": [
    {
      "ID": "age-out-old-logs",
      "Status": "Enabled",
      "Filter": { "Prefix": "logs/" },
      "Transitions": [{ "Days": 30, "StorageClass": "GLACIER" }],
      "Expiration": { "Days": 365 }
    }
  ]
}
```

## Access control: two policy layers, and a danger that's all too real

S3 access is governed by two kinds of policy that both have to allow an action:

- **Bucket policies** — a resource-based JSON policy attached directly to the bucket, stating
  which principals can do what. It travels with the bucket regardless of who's asking.
- **IAM policies** — identity-based policies attached to a user or role, stating what *that
  principal* is allowed to do across S3 (and everything else in the account).

The real danger is a **bucket policy accidentally written (or a legacy ACL left) to allow public
access** — this is one of the most common real-world causes of cloud data leaks, because it only
takes one overly broad `Principal: "*"` statement. AWS's **S3 Block Public Access** setting exists
specifically to override that mistake: once enabled on a bucket or account, it blocks public
access even if a policy or ACL would otherwise grant it.

```bash
aws s3api put-public-access-block \
  --bucket ltv-academy-media-backups \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

## Key terms

| Term | Meaning |
|---|---|
| Versioning | Keeps every version of an object; a delete adds a marker instead of erasing data |
| Delete marker | What a plain delete creates on a versioned object — the object looks gone but isn't |
| Lifecycle rule | A bucket policy that transitions or expires objects automatically, based on age |
| Bucket policy | Resource-based JSON policy attached to the bucket itself |
| IAM policy | Identity-based policy attached to a user or role |
| S3 Block Public Access | Setting that overrides any policy/ACL that would otherwise make a bucket public |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: if versioning is enabled and
someone runs a plain delete on an object, is the data actually destroyed — and how would you get
it back?
