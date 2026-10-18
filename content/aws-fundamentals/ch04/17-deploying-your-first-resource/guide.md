# Lesson 17 — Deploying Your First Resource

**Chapter 4 · Working in AWS · Lesson 17 of 18**

## What you'll learn

- A complete, real walkthrough: creating an S3 bucket from the CLI,
  putting an object in it, and reading it back
- Why S3 bucket names are globally unique, and what that means in
  practice
- How to verify a deploy actually worked instead of assuming it did
- How to clean up afterward, so you're not leaving billable resources
  running
- A second walkthrough, for a different kind of resource entirely: an
  EC2 instance, watched with a real CloudWatch alarm

## Why S3, and why the CLI

S3 is the right first resource to deploy by hand: it has no server to
provision, no network to configure, and it directly exercises
everything from Chapters 3 and 4 — the identity making the call, the
policy that allows it, and the CLI syntax to issue it.

## Step 1: create the bucket

```
$ aws s3 mb s3://ltv-academy-demo-2026 --region us-east-1
make_bucket: ltv-academy-demo-2026
```

**Bucket names are globally unique across every AWS account on
Earth** — not just your account, not just your region. If
`ltv-academy-demo-2026` is already taken by anyone, anywhere,
`mb` (make-bucket) fails with `BucketAlreadyExists`. This is why real
naming conventions usually fold in an account ID or a company-specific
prefix.

## Step 2: put an object in it

```
$ echo "hello from the CLI" > hello.txt
$ aws s3 cp hello.txt s3://ltv-academy-demo-2026/
upload: ./hello.txt to s3://ltv-academy-demo-2026/hello.txt
```

## Step 3: verify — don't assume

A command returning without an error is a good sign, but *verifying*
means actually checking the resource exists and looks right:

```
$ aws s3 ls s3://ltv-academy-demo-2026/
2026-09-19 10:14:02         20 hello.txt

$ aws s3 cp s3://ltv-academy-demo-2026/hello.txt -
hello from the CLI
```

The second command downloads the object to stdout instead of a file
(`-` means "standard output") — a fast way to confirm content without
cluttering your local folder. This habit — verify, don't assume —
matters even more once you're deploying through Infrastructure as
Code later in your AWS journey, where a "successful" deploy can still
produce a misconfigured resource.

## Step 4: clean up

Every resource you create keeps costing money (even if S3 storage for
one tiny file is fractions of a cent) until you remove it. Cleaning up
after yourself is a habit worth building from lesson one, not
something to learn the hard way from a surprise bill:

```
$ aws s3 rm s3://ltv-academy-demo-2026/hello.txt
delete: s3://ltv-academy-demo-2026/hello.txt

$ aws s3 rb s3://ltv-academy-demo-2026
remove_bucket: ltv-academy-demo-2026
```

`rb` (remove-bucket) only works on an **empty** bucket — this is a
deliberate safety guard against accidentally deleting a bucket full of
data, which is why the object had to be removed first.

## The full round trip

```
mb (make bucket) → cp (put object) → ls / cp - (verify)
                                            ↓
                                      rm → rb (clean up)
```

Everything in this walkthrough is exactly the same CLI you learned in
Lesson 15, scoped by exactly the kind of IAM policy you learned to
write in Lessons 12–13. There's no new concept here — just the first
time you've run the full loop yourself.

## A second resource: EC2, with real monitoring

S3 is the right *first* resource because it has no server behind it — but most of a DevOps
engineer's actual day-to-day work involves resources that do: EC2 instances, containers,
Lambda functions. This second walkthrough deploys an EC2 instance and, unlike the S3 bucket,
gives it something worth watching.

### Launching the instance

```
$ aws ec2 run-instances \
    --image-id ami-0abcdef1234567890 \
    --instance-type t3.micro \
    --key-name ltv-demo-key \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=ltv-demo-instance}]'

{
    "Instances": [{
        "InstanceId": "i-0a1b2c3d4e5f67890",
        "State": {"Name": "pending"},
        ...
    }]
}
```

Unlike `aws s3 mb`, which either succeeds or fails almost instantly, `run-instances` returns
while the instance is still `pending` — a reminder that "the command returned" and "the resource
is actually ready" are two different moments for most compute resources, in a way they simply
aren't for S3.

### Verify — the same discipline, a different check

```
$ aws ec2 describe-instances --instance-ids i-0a1b2c3d4e5f67890 \
    --query 'Reservations[0].Instances[0].State.Name'
"running"
```

Same principle as the S3 walkthrough — don't assume `run-instances` returning means the instance
is actually up — just a different command, because a different kind of resource has a different
kind of "ready."

### Watching it: a real CloudWatch alarm

An S3 bucket with nothing in it needs no monitoring. A running EC2 instance does — if it's
pegged at high CPU, you want to know before a customer does:

```
$ aws cloudwatch put-metric-alarm \
    --alarm-name ltv-demo-high-cpu \
    --metric-name CPUUtilization \
    --namespace AWS/EC2 \
    --statistic Average \
    --period 300 \
    --threshold 80 \
    --comparison-operator GreaterThanThreshold \
    --evaluation-periods 2 \
    --dimensions Name=InstanceId,Value=i-0a1b2c3d4e5f67890 \
    --alarm-actions arn:aws:sns:us-east-1:111122223333:ltv-demo-alerts
```

This alarm watches the instance's `CPUUtilization` metric (which EC2 reports to CloudWatch
automatically, no agent installation needed for basic instance-level metrics), averaged over
5-minute periods (`--period 300`), and fires if it stays above 80% for two consecutive periods
(`--evaluation-periods 2` — a deliberate choice: one noisy 5-minute spike shouldn't page anyone,
but ten sustained minutes above 80% is a real signal). `--alarm-actions` names an SNS topic to
notify — the alarm doesn't just sit there, it actually does something when it fires.

```
$ aws cloudwatch describe-alarms --alarm-names ltv-demo-high-cpu \
    --query 'MetricAlarms[0].StateValue'
"OK"
```

`StateValue` of `OK` means the alarm exists and the metric is currently within threshold — the
same verify-don't-assume habit from the S3 walkthrough, confirming the alarm is actually active
and watching, not just that the `put-metric-alarm` call didn't error.

### Clean up — more to remove than an S3 bucket

```
$ aws cloudwatch delete-alarms --alarm-names ltv-demo-high-cpu
$ aws ec2 terminate-instances --instance-ids i-0a1b2c3d4e5f67890
```

Order matters here in a way it didn't for S3: deleting the alarm first is tidy but not strictly
required, since a CloudWatch alarm watching a terminated instance's metrics simply goes to
`INSUFFICIENT_DATA` rather than erroring — but leaving it behind is still a loose end genuinely
worth cleaning up, the same billable-resource discipline from Step 4 above, just for a second
resource type (CloudWatch alarms themselves don't cost per-alarm in most cases, but an
unterminated EC2 instance absolutely keeps billing by the hour).

## Key terms

| Term | Meaning |
|---|---|
| `aws s3 mb` | Creates ("make bucket") a new S3 bucket |
| `aws s3 rb` | Removes ("remove bucket") an S3 bucket — only if it's empty |
| Globally unique bucket name | S3 bucket names must be unique across all AWS accounts, not just yours |
| Verify, don't assume | Checking a deployed resource actually exists and is correct, not just trusting a clean exit code |
| `aws ec2 run-instances` | Launches a new EC2 instance — returns before the instance is actually `running` |
| CloudWatch alarm | A rule watching one metric against a threshold over time, firing an action (like an SNS notification) when breached |
| `--evaluation-periods` | How many consecutive breaching periods are required before an alarm actually fires — filters out single noisy spikes |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does `aws s3 rb` fail on a bucket that still has an object in it, and
what real-world mistake does that restriction prevent?
