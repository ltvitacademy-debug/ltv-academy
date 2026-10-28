# Lesson 6 — Amazon Machine Images (AMIs) and the EC2 Lifecycle

**Chapter 2 · AWS Compute: EC2 · Lesson 6 of 32**

## What you'll learn

- What an AMI actually is, and what it supplies to a launched instance
- The real EC2 instance lifecycle states, from `pending` to `terminated`
- The critical difference between **stopping** and **terminating** an
  instance — and why that difference can cost you data
- How to check an instance's state from the CLI

## An AMI is the template, not the instance

An **Amazon Machine Image (AMI)** is a template that contains everything an
EC2 instance needs to boot: a snapshot of the root volume (the operating
system plus any software already installed on it), launch permissions
(which AWS accounts are allowed to use the AMI), and a block device mapping
(which volumes get attached and how). When you pick `--image-id ami-xxxxx`
in a `run-instances` call, you are not configuring an instance from scratch —
you're telling AWS "build this instance's root volume from that template."

AWS and its partners publish a large catalog of ready-made AMIs for common
operating systems (Amazon Linux, Ubuntu, Windows Server) in the AMI
catalog — these are kept patched and are the normal starting point. You can
also build your **own** AMI by configuring an instance exactly the way you
want (software installed, configs in place) and then running
`aws ec2 create-image` against it, which captures that instance's current
disk state as a new, reusable AMI. Launching ten identical application
servers from one custom AMI is the standard way to make sure they're
actually identical, instead of hoping ten manual setups matched.

```
aws ec2 create-image \
  --instance-id i-0123456789abcdef0 \
  --name "app-server-v3" \
  --no-reboot
```

## The lifecycle: states an instance actually moves through

Every EC2 instance reports one of a small set of states, visible in the
console or via `aws ec2 describe-instances`:

- **pending** — the instance is being provisioned; not yet ready for use
- **running** — the instance is up and billing for compute
- **stopping** — a stop was requested; the instance is shutting down
- **stopped** — the instance is off; you're no longer billed for compute,
  but the root EBS volume still exists and still costs storage money
- **shutting-down** — a terminate was requested; the instance is being torn
  down
- **terminated** — the instance is gone permanently; this state is final

```
aws ec2 describe-instances \
  --instance-ids i-0123456789abcdef0 \
  --query "Reservations[0].Instances[0].State.Name"
```

## Stop vs. terminate: the distinction that costs people data

This is the single most important distinction in this lesson, because
getting it backwards can delete something you meant to keep:

- **`aws ec2 stop-instances`** powers the instance off but **preserves the
  root EBS volume**. The instance ID stays the same, you can start it again
  later with `start-instances`, and anything on the root volume is exactly
  as you left it. You stop paying for compute, but you keep paying (a small
  amount) for the EBS storage. Any **instance store** volumes, though — the
  kind physically attached to the host rather than EBS-backed — are wiped on
  stop, because the instance may restart on completely different hardware.
- **`aws ec2 terminate-instances`** shuts the instance down **and deletes
  it permanently**. By default, the root EBS volume's `DeleteOnTermination`
  flag is `true`, so the root volume is deleted along with the instance
  unless you explicitly set that flag to `false` before terminating. Any
  additional (non-root) EBS volumes default to `DeleteOnTermination: false`
  and survive the termination as orphaned volumes you're still paying for.

The practical rule: if you might need the instance again, **stop** it. If
you're certain you're done with it, **terminate** it — and double-check the
root volume's `DeleteOnTermination` setting first if that disk matters.

## Key terms

| Term | Meaning |
|---|---|
| AMI (Amazon Machine Image) | A template containing a root volume snapshot, launch permissions, and a block device mapping, used to boot new instances |
| `create-image` | The CLI call that captures a running or stopped instance's disk state as a reusable custom AMI |
| Stop | Powers the instance off; preserves the root EBS volume; compute billing stops |
| Terminate | Permanently deletes the instance; by default also deletes the root EBS volume (`DeleteOnTermination: true`) |

## Check yourself

Why does stopping an instance preserve its root EBS volume, but terminating
it deletes that same volume by default? What setting controls that
behavior, and when would you change it?
