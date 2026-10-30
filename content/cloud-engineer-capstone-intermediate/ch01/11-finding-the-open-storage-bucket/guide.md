# Lesson 11 — Finding an Open Storage Bucket Nobody Flagged

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 11 of 16**

## What you'll learn

- Why a thorough review pass checks more than just the one thing that triggered it
- The two policy layers that control S3 access, and which one actually failed here
- Exactly how `driftwood-outdoor-backups` ended up readable by anyone with the object URL, not
  just Driftwood's own AWS account
- Why "nobody flagged it" is a normal, common way this kind of mistake survives for months

## A review pass widens, on purpose

Lesson 10 closed the loop on the autoscaling cost anomaly, but Theo doesn't stop there. The same
end-to-end review that caught the Kubernetes misconfiguration is a natural moment to check the
other piece of infrastructure that went live around the same time: the AWS S3 backup bucket set up
in Lesson 6 and wired into cross-cloud replication in Lesson 7. Nothing prompted this specifically
— no alert, no complaint — it's simply good practice to look at everything that shipped in the same
window, not just the part that happened to cost money.

## What the bucket's Permissions tab shows

Opening `driftwood-outdoor-backups` in the S3 console, the **Permissions** tab shows a banner that
should never be ignorable: **"Public access: Not blocked"**, with **"Objects can be public"** next
to it. That's not a guess or an inference — it's AWS telling Theo directly that this bucket's
objects can be reached by someone who isn't part of Driftwood's AWS account at all.

Pulling the actual bucket policy confirms why:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowBackupAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::driftwood-outdoor-backups",
        "arn:aws:s3:::driftwood-outdoor-backups/*"
      ]
    }
  ]
}
```

`"Principal": "*"` means **anyone** — not "anyone in Driftwood's AWS account," not "only the
replication job," literally anyone on the internet who has, or guesses, an object URL. And because
**S3 Block Public Access** was never enabled on this bucket, nothing was in place to override that
mistake the way it's designed to.

## What it was actually supposed to be

The intent from Lesson 6 was narrow and specific: only the IAM role used by the Azure-to-AWS
replication job set up in Lesson 7 — call it `driftwood-backup-writer` — should be able to read or
write these backup objects. That's a single, named principal, not a wildcard. Somewhere during
setup, the policy statement was written (or copied from a quick-start example) with `Principal: "*"`
left in place instead of being scoped down to that role's ARN, and no one caught it before the
bucket went live — there was no separate check at the time looking specifically for this.

## Why "nobody flagged it" isn't surprising

This is one of the most common real-world causes of cloud data exposure, precisely because it's
easy to miss: the bucket works perfectly fine for its intended purpose the whole time. The
replication job writes backups successfully. Nothing breaks. There's no error message, no failed
health check, no reason for anything to call attention to itself — the only way to catch an
overly-broad bucket policy is to actually open the Permissions tab or scan the policy and look,
which is exactly what a 40%-over-budget cost anomaly review happened to prompt Theo to do, even
though the two problems have nothing to do with each other.

## What happens next

Two separate, confirmed findings now sit on Theo's list: the autoscaling floor from Lesson 10, and
this bucket policy. Lesson 12 fixes both and proves, with real evidence, that each fix actually
worked.

## Key terms

| Term | Meaning |
|---|---|
| Bucket policy | A resource-based JSON policy attached directly to an S3 bucket, stating which principals can do what |
| `Principal: "*"` | A policy statement that applies to anyone, not a specific account, role, or user — the classic cause of accidental public exposure |
| S3 Block Public Access | A setting that overrides any policy or ACL that would otherwise make a bucket public, when enabled |
| `driftwood-backup-writer` | The specific IAM role meant to be the only principal with access to the backup bucket |

## Lab

Rewrite the `Principal` field of the bucket policy above so it grants access only to the
`driftwood-backup-writer` role (assume account ID `123456789012`), and name the one additional S3
setting that should also be turned on even after that fix.

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what specifically made this
bucket's objects reachable by the public internet, and why did the bucket's normal operation never
surface that fact on its own?
