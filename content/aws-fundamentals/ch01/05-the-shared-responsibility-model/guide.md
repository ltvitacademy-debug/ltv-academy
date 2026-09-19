# Lesson 5 — The Shared Responsibility Model

**Chapter 1 · Cloud & AWS Concepts · Lesson 5 of 18**

## What you'll learn

- The exact split AWS draws between "security of the cloud" and "security in the cloud"
- Why that split moves depending on which kind of service you're using
- Concrete examples across EC2, S3, and RDS
- Why a data breach caused by a misconfigured S3 bucket is the customer's responsibility, not AWS's

## Security *of* the cloud vs. security *in* the cloud

AWS draws one line, everywhere, to describe who secures what: AWS is
responsible for **security of the cloud**, and the customer is
responsible for **security in the cloud**.

```
AWS's job — security OF the cloud:      Your job — security IN the cloud:
  physical data centers                   your data
  hardware, host OS, virtualization       IAM configuration (who can do what)
  global network infrastructure           OS patching (on services you manage)
                                            security group / firewall rules
                                            encryption choices
```

AWS secures the facilities, the racks, the hypervisor, the network
backbone — everything underneath what you touch. You secure
everything you configure on top of it: who has access, how data is
encrypted, which ports are open, whether an S3 bucket is
accidentally public. This isn't a courtesy split — it's contractual,
and it's the single most-tested concept on every AWS certification
exam for a reason: misunderstanding it is the single most common
cause of real AWS security incidents.

## The line moves depending on the service

The split isn't fixed at the same point for every service — it slides
based on how much AWS manages for you.

```
EC2 (you manage a lot):      RDS (AWS manages more):      S3 (AWS manages most):
  guest OS patching            AWS patches the DB engine     no OS to patch at all
  firewall (security groups)   you manage IAM + backups      you manage bucket
  IAM + data + network config  policy + access config         policy + object access
```

With **EC2**, a virtual server, you're responsible for patching the
guest operating system, configuring firewall rules, and everything
above that. With **RDS**, a managed database, AWS takes over patching
the underlying database engine — but you still control IAM
permissions, backup retention, and network access. With **S3**,
there's no operating system in the relationship at all — but bucket
policies, public-access settings, and encryption choices are entirely
yours to get right.

## Why this shows up in real incidents

The most common category of real-world AWS security incident isn't
AWS's infrastructure being breached — it's a customer-side
misconfiguration: an S3 bucket left publicly readable, an overly
broad IAM policy, unencrypted data that should have been encrypted.
Every one of those sits squarely on the "security in the cloud" side
of the line. AWS providing a durable, physically secure S3 service
doesn't help you if you've configured the bucket to be open to the
internet.

## Key terms

| Term | Meaning |
|---|---|
| Security of the cloud | AWS's responsibility: physical infrastructure, hardware, host OS, global network |
| Security in the cloud | The customer's responsibility: data, IAM, OS patching (where applicable), network config, encryption |
| Shared Responsibility Model | AWS's framework describing where its security obligations end and the customer's begin |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: for
an EC2 instance versus an S3 bucket, how does the line between "AWS's
job" and "your job" actually shift, and why?
