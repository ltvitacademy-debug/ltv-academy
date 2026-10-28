# Lesson 30 — Lab: Securing and Monitoring the Environment

**Chapter 8 · Capstone: Deploying and Administering an AWS Environment · Lesson 30 of 32**

## What you'll learn

- How to scope a security group's rules to exactly the traffic a tier needs, instead of leaving it open
- Why an IAM role and an instance profile (Chapter 1) replace a hardcoded access key on an EC2 instance
- How to set a CloudWatch alarm (Chapter 6) that catches a CPU problem before anyone files a complaint
- How an EBS snapshot and an AWS Budget each guard against a different kind of loss

## Scoping the web tier's security group

Lesson 29 left `meridian-web-sg` with no inbound rules at all. The web tier needs exactly two things open to the public internet — HTTPS, and HTTP for anyone who hasn't typed the `s` yet — plus SSH, but only from Meridian's own office, not from anywhere on earth:

```
aws ec2 authorize-security-group-ingress --group-id sg-0meridianweb \
  --protocol tcp --port 443 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress --group-id sg-0meridianweb \
  --protocol tcp --port 80 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress --group-id sg-0meridianweb \
  --protocol tcp --port 22 --cidr 203.0.113.0/24
```

`203.0.113.0/24` is Meridian's office network. Opening port 22 to `0.0.0.0/0` instead of that specific block is the single most common security group mistake on a new AWS account — and it's the exact kind of rule Lesson 31's case study exists to catch.

## Scoping the app tier's security group

The app tier should hear from exactly one place: the web tier, on the port the app listens on. Chapter 4's security-group-to-security-group reference does this without ever typing an IP:

```
aws ec2 authorize-security-group-ingress --group-id sg-0meridianapp \
  --protocol tcp --port 8080 --source-group sg-0meridianweb
```

That single rule says "only traffic coming from something that belongs to `meridian-web-sg` may reach port 8080" — if Meridian ever launches a second web instance, it's covered automatically, with no CIDR math required.

## An IAM role instead of a hardcoded key

`meridian-app1` needs to read and write the `meridian-outfitters-app-data` bucket from Lesson 29. Chapter 1's whole argument against long-lived access keys applies directly here — a key baked into the app's config file is a key that leaks the day someone copies that config somewhere it shouldn't go. An IAM role avoids that entirely:

```
aws iam create-role --role-name meridian-app-role \
  --assume-role-policy-document file://ec2-trust-policy.json

aws iam attach-role-policy --role-name meridian-app-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam create-instance-profile --instance-profile-name meridian-app-profile

aws iam add-role-to-instance-profile \
  --instance-profile-name meridian-app-profile --role-name meridian-app-role

aws ec2 associate-iam-instance-profile --instance-id i-0meridianapp \
  --iam-instance-profile Name=meridian-app-profile
```

From this point on, any AWS SDK call `meridian-app1` makes picks up temporary, auto-rotating credentials from the instance's metadata — nothing to leak, nothing to rotate by hand.

## A CloudWatch alarm for the web tier

Chapter 6's CloudWatch alarms turn "we'll notice if it's slow" into something that actually pages someone:

```
aws cloudwatch put-metric-alarm --alarm-name meridian-web-high-cpu \
  --namespace AWS/EC2 --metric-name CPUUtilization --statistic Average \
  --period 300 --evaluation-periods 2 --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --dimensions Name=InstanceId,Value=i-0meridianweb \
  --alarm-actions arn:aws:sns:us-east-1:111122223333:meridian-alerts
```

Two consecutive five-minute periods above 80% CPU — not one momentary spike — triggers the alarm and publishes to the `meridian-alerts` SNS topic.

## An EBS snapshot and a budget, two different kinds of insurance

Chapter 3's EBS snapshots protect against losing the app tier's root volume:

```
aws ec2 create-snapshot --volume-id vol-0meridianapp \
  --description "meridian-app1 pre-launch backup"
```

Chapter 7's budgets protect against a different kind of loss — the bill itself getting away from you:

```
aws budgets create-budget --account-id 111122223333 \
  --budget file://meridian-budget.json \
  --notifications-with-subscribers file://meridian-notify.json
```

`meridian-budget.json` sets a $150 monthly limit; `meridian-notify.json` emails the ops team at 80% of actual spend. One guards the data, one guards the wallet, and both exist because Lesson 31's incident starts with exactly this kind of guardrail doing its job.

## Key terms

| Term | Meaning |
|---|---|
| `--source-group` | A security group rule scoped to another security group's members, not to an IP range |
| IAM instance profile | The container that lets an IAM role be attached to a running EC2 instance |
| CloudWatch alarm | A rule that watches a metric over time and takes an action once a threshold is crossed |
| AWS Budget | A spend threshold that triggers a notification before, not after, the bill arrives |

## Check yourself

Why does scoping `meridian-app-sg` with `--source-group sg-0meridianweb` hold up better over time than writing the web subnet's CIDR block, `10.50.1.0/24`, directly into the rule?
