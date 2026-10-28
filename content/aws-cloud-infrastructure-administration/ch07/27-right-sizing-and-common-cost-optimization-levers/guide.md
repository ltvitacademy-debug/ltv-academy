# Lesson 27 — Right-Sizing and Common Cost Optimization Levers

**Chapter 7 · AWS Cost Management · Lesson 27 of 32**

## What you'll learn

- What right-sizing means, and how to tell an oversized instance from utilization data instead of guessing
- Why unattached EBS volumes and old snapshots quietly cost money long after anyone's using them
- How S3 lifecycle policies (introduced back in Chapter 3) move cold data to cheaper storage automatically
- A concrete example of right-sizing a specific, over-provisioned EC2 instance

## Right-sizing: matching instance size to actual usage

**Right-sizing** means matching an EC2 instance's size to what it actually
uses, not what seemed safe to pick at launch time. It's extremely common for
an instance to get launched a size or two larger than it needs — a cautious
guess that becomes permanent once nobody revisits it. The signal to look for
is CloudWatch's **CPUUtilization** and memory metrics (Chapter 6) averaged
over a couple of weeks: an instance that never breaks 10-15% CPU is a strong
candidate to downsize to a smaller instance type in the same family, which
lowers the hourly cost with no change in what the workload can actually do.

## Unattached EBS volumes: the cost that outlives the instance

Terminating an EC2 instance doesn't always terminate its EBS volumes — a
volume that isn't set to delete on termination is simply left behind,
**unattached**, still billing by the gigabyte-month even though nothing is
reading or writing to it. These accumulate quietly: a volume detached six
months ago and forgotten is pure waste. Periodically listing volumes in the
`available` state (meaning not attached to any instance) and deleting the
ones nobody needs is one of the simplest cost levers available.

## Old snapshots and S3 lifecycle policies

**EBS snapshots** (Chapter 3) are cheap individually but accumulate the same
way volumes do — years of nightly snapshots with no cleanup policy adds up.
A retention policy that keeps the last N snapshots and deletes older ones
closes that gap. **S3 lifecycle policies** (also Chapter 3) solve the same
problem for objects: a rule can automatically transition objects to a
cheaper storage class — Standard to **S3 Standard-IA**, then to **S3
Glacier**, then to **S3 Glacier Deep Archive** — as they age, and delete them
outright after a defined retention period, all without anyone manually
moving a single file.

## Example: right-sizing an over-provisioned instance

An `m5.xlarge` (4 vCPU, 16 GiB memory) web server has run for a year with
CloudWatch showing average CPU utilization under 8% and memory usage under
30%, even at peak traffic. That workload clearly never needed 4 vCPUs.
Resizing it down to an `m5.large` (2 vCPU, 8 GiB memory) — a stop, change
instance type, start sequence — cuts the hourly compute cost roughly in half
while leaving headroom well above what the workload has ever actually used.

## Key terms

| Term | Meaning |
|---|---|
| Right-sizing | Matching an instance's size to its actual observed CPU/memory usage, rather than its launch-time guess |
| Unattached EBS volume | A volume not attached to any instance, still billing by the gigabyte-month until deleted |
| S3 lifecycle policy | A rule that automatically transitions S3 objects to cheaper storage classes, or deletes them, based on age |
| S3 Glacier | A very low-cost S3 storage class intended for data that's rarely accessed |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: what
CloudWatch metric would you check before deciding an EC2 instance is a good
candidate for right-sizing, and why?
