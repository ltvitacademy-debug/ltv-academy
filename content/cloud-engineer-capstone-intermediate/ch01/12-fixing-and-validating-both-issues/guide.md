# Lesson 12 — Fixing and Validating Both Issues

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 12 of 16**

## What you'll learn

- Why a fix without validation is just an unverified hope, and what "validated" actually means for
  each of these two issues
- The exact Terraform change that corrects the autoscaling floor, and how to confirm it in both
  cost and cluster behavior
- The exact bucket policy change that closes the open-access gap, and how to confirm it with AWS's
  own tooling rather than trusting the JSON by eye
- Why both fixes go through the same pull-request and `terraform plan` discipline as any other
  production change, not a quick manual edit

## Fix one: correcting the scaling profile

Lesson 10 traced the cost overshoot to Terraform referencing the `peak-season` scaling profile
instead of `standard`. The fix is a one-line change to the module reference from Lesson 10's Lab:

```hcl
# modules/storefront-app/hpa.tf — corrected
module "storefront_hpa" {
  source       = "../scaling-profile"
  profile_name = "standard"   # minReplicas: 2, maxReplicas: 6
}
```

This goes through the same path as any other infrastructure change: a pull request, a
`terraform plan` that shows the HPA resource being updated in place (not destroyed and
recreated), review, then `terraform apply`. No manual `kubectl edit` on the live cluster — the
whole point of Lesson 4's Terraform setup was that the configuration in source control is the
source of truth, and a manual edit would just drift silently out of sync with it again.

### Validating the fix

Two kinds of evidence, not one:

```bash
kubectl get hpa storefront-app -n production
# MINPODS   MAXPODS   REPLICAS
# 2         6         2
```

That confirms the cluster is actually running the corrected floor. The cost side takes longer to
confirm — a few days of Azure Cost Analysis data at the new replica count — but the forecast line
settles back down toward the original **$1,750/month** projection from Lesson 4, with the
~$700/month gap gone. Both pieces of evidence matter: a config change that looks right in
`kubectl` but hasn't actually dropped the node count, or a cost drop that happened to coincide with
something unrelated, would both be incomplete validation on their own.

## Fix two: tightening the bucket policy

Lesson 11's Lab already sketched the direction. The real fix replaces the wildcard principal with
the one role that actually needs access, and turns on the setting that exists specifically to
prevent this class of mistake:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowBackupWriterOnly",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:role/driftwood-backup-writer" },
      "Action": ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::driftwood-outdoor-backups",
        "arn:aws:s3:::driftwood-outdoor-backups/*"
      ]
    }
  ]
}
```

```bash
aws s3api put-public-access-block \
  --bucket driftwood-outdoor-backups \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

### Validating the fix

Trusting that the JSON "looks right" isn't validation — Theo confirms it two ways. First, AWS's
own check:

```bash
aws s3api get-bucket-policy-status --bucket driftwood-outdoor-backups
# "IsPublic": false
```

Second, the thing that actually matters operationally: the Lesson 7 cross-cloud replication job
still runs successfully end to end, proving the tightened policy didn't accidentally lock out the
one principal that's supposed to have access. A security fix that silently breaks the backup job
it's protecting isn't actually a fix.

## Both issues, same discipline

Neither fix was a late-night emergency patch. Both went through a pull request, a visible
`terraform plan` (for the HPA) or an explicit policy diff (for the bucket), and concrete
after-the-fact evidence — not just an assumption that the change did what it was supposed to.
That discipline is exactly what Lesson 13 turns into something automatic, so neither mistake has
to be caught by a human noticing a cost chart or a permissions banner ever again.

## Key terms

| Term | Meaning |
|---|---|
| `terraform plan` | Shows a Terraform change will be applied in place, not destroyed/recreated, before anyone approves it |
| `get-bucket-policy-status` | AWS CLI call that reports whether S3 considers a bucket's effective policy public |
| Validation | Concrete, after-the-fact evidence that a fix produced the intended behavior — not just confidence that the change looks correct |
| Scoped principal | A bucket policy principal naming one specific role or account, instead of a wildcard |

## Lab

List the two pieces of evidence Theo gathered for the autoscaling fix and the two pieces gathered
for the bucket policy fix. For each pair, explain what gap would remain if only one of the two had
been checked.

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: why does confirming the bucket
policy isn't public need a second check — that the replication job still works — and not just the
`IsPublic: false` result on its own?
