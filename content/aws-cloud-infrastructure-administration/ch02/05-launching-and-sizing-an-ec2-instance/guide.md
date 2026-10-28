# Lesson 5 — Launching and Sizing an EC2 Instance

**Chapter 2 · AWS Compute: EC2 · Lesson 5 of 32**

## What you'll learn

- What Amazon EC2 actually is, and the five decisions every launch requires
- What `aws ec2 run-instances` provisions, piece by piece
- Why the network choice (VPC and subnet) determines whether your instance is
  reachable from the internet at all
- How to read a complete `run-instances` command with intent, not by
  copy-pasting

## EC2: a virtual server you rent by the second

**Amazon EC2 (Elastic Compute Cloud)** is AWS's core compute service — a
virtual machine running in an AWS data center that you rent, typically billed
per second with a one-minute minimum. You already know what a VM is from the
Azure chapters earlier in this path; EC2 is AWS's version of the same idea,
built on AWS's own mechanics. Every EC2 instance you launch requires five
decisions, in this order:

1. **AMI** — which operating system and pre-installed software to boot from
   (Lesson 6 covers this in depth)
2. **Instance type** — how much CPU, memory, and network performance the
   instance gets (Lesson 7)
3. **Network** — which VPC and subnet the instance's network interface lives in
4. **Storage** — the root EBS volume size and type, plus any extra volumes
5. **Key pair and security group** — how you'll authenticate and what traffic
   is allowed to reach it (Lesson 8)

## What `run-instances` provisions

```
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t3.micro \
  --subnet-id subnet-0a1b2c3d4e5f67890 \
  --key-name my-ec2-keypair \
  --security-group-ids sg-0123456789abcdef0 \
  --block-device-mappings '[{"DeviceName":"/dev/xvda","Ebs":{"VolumeSize":20,"VolumeType":"gp3"}}]' \
  --count 1
```

One call, several resources: the instance itself, a root EBS volume built from
the AMI you named, and an **elastic network interface (ENI)** attached inside
the subnet you specified. Nothing here is optional — `--image-id` and
`--instance-type` are required on every call, and if you omit
`--subnet-id`, AWS launches into a default subnet of your account's default
VPC (which may not exist if you've deleted it, or may not be where you want a
production instance to live). `--key-name` and `--security-group-ids` aren't
strictly required by the API, but skipping them means you get an instance you
have no way to reach — Lesson 8 is why both matter.

## The network decision has consequences before you even boot

A subnet is **public** or **private** depending on whether its route table
sends `0.0.0.0/0` traffic to an internet gateway — that's a VPC topic covered
fully in Chapter 4, but it matters here because it decides whether your new
instance can get a public IP at all. Launch into a public subnet with
"auto-assign public IP" enabled, and the instance gets a reachable address the
moment it starts running. Launch into a private subnet, and it has no direct
path to or from the internet, by design — the right choice for an internal
application server or database that should never be dialed into directly.
You're not picking a network at random; you're deciding, at launch time,
whether this instance is meant to be reachable from outside AWS.

## Reading a launch command by intent

Once you know the five decisions, a `run-instances` call stops looking like
a wall of flags and starts reading as a checklist: `--image-id` answers "what
OS," `--instance-type` answers "how much hardware," `--subnet-id` answers
"where on the network," the block device mapping answers "how much disk," and
`--key-name` plus `--security-group-ids` answer "how do I get in, and what's
allowed to reach it." That's the skill this chapter builds toward — launching
with intent instead of pasting a command you don't understand.

## Key terms

| Term | Meaning |
|---|---|
| EC2 (Elastic Compute Cloud) | AWS's core virtual-machine service, billed per second |
| `run-instances` | The CLI/API call that provisions an EC2 instance plus its root EBS volume and network interface |
| Subnet | A range of IP addresses inside a VPC; public or private depending on its route table |
| Elastic network interface (ENI) | The virtual network card attached to an instance inside a subnet |

## Check yourself

A `run-instances` call omits `--subnet-id`. What does AWS do, and why might
that be the wrong behavior for a production launch?
