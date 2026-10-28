# Lesson 11 — EBS Volumes and How They Attach to EC2

**Chapter 3 · AWS Storage: S3 and EBS · Lesson 11 of 32**

## What you'll learn

- What **EBS (Elastic Block Store)** actually is, and how it differs from the S3 object storage
  you just spent two lessons on
- The two volume types you'll reach for most — **gp3** and **io2** — and what workload each one
  is built for
- The real rule governing how an EBS volume attaches to an EC2 instance
- How to create a volume and attach it to a running instance with the AWS CLI

## EBS: a virtual hard drive, delivered over the network

Everything in Chapter 3 so far has been **object storage** — S3 stores whole files, addressed by
a key, accessed over HTTP. **EBS (Elastic Block Store)** is a completely different kind of
storage: **block storage**, the same category as a physical hard drive. An EBS volume behaves
like a disk the operating system can format, partition, and mount — except it's **network-attached**,
not physically inside the EC2 instance's host hardware. That's the core mental model: EBS gives an
EC2 instance a virtual hard drive that happens to live on AWS's network instead of in the box, and
because of that, the volume's data survives independently of the instance (unless you've set
**Delete on Termination**, which many root volumes have on by default).

## Volume types: gp3 for most workloads, io2 for the demanding ones

AWS offers several EBS volume types, but two cover the vast majority of real workloads:

- **gp3** (General Purpose SSD) — the default recommendation for almost everything. It delivers a
  baseline of 3,000 IOPS and 125 MB/s throughput **independent of volume size**, and you can
  provision more of either if a workload needs it, without having to over-provision capacity just
  to get performance.
- **io2** (Provisioned IOPS SSD) — built for workloads that genuinely need very high IOPS at low,
  consistent latency, like a large relational database handling heavy transactional traffic. io2
  also carries a higher durability guarantee (99.999%) than gp3, which matters for workloads where
  volume failure isn't an acceptable risk at all.

```bash
aws ec2 create-volume \
  --availability-zone us-east-1a \
  --size 100 \
  --volume-type gp3
```

## Attaching a volume: one instance at a time, same Availability Zone

An EBS volume attaches to **exactly one EC2 instance at a time**, under typical configurations,
and it has to be in the **same Availability Zone** as that instance — EBS doesn't span AZs. If you
need to move a volume to an instance in a different AZ, you'd snapshot it first (Lesson 12) and
create a new volume from that snapshot in the target AZ. To reattach a volume somewhere else, you
detach it first:

```bash
aws ec2 attach-volume \
  --volume-id vol-0abcd1234efgh5678 \
  --instance-id i-0123456789abcdef0 \
  --device /dev/sdf

aws ec2 detach-volume \
  --volume-id vol-0abcd1234efgh5678
```

## Key terms

| Term | Meaning |
|---|---|
| EBS | Elastic Block Store — network-attached block storage volumes for EC2 |
| Block storage | Storage that behaves like a raw disk the OS formats and mounts, unlike S3's object model |
| gp3 | General Purpose SSD — baseline 3,000 IOPS / 125 MB/s regardless of size, default choice |
| io2 | Provisioned IOPS SSD — for high-IOPS, low-latency workloads, higher durability than gp3 |
| Availability Zone (AZ) binding | An EBS volume must be in the same AZ as the instance it attaches to |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why can't you attach an EBS
volume sitting in `us-east-1a` directly to an instance running in `us-east-1b`?
