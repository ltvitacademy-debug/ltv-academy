# Lesson 18 — Common Cloud Misconfigurations CSPM Catches

**Chapter 5 · Cloud Security Posture Management · Lesson 2 of 4**

## What you'll learn

- The real, specific misconfigurations that show up over and over in CSPM findings lists,
  across both Azure and AWS
- What a publicly-exposed storage resource and an overly permissive security group actually
  look like as settings
- Why an IAM policy can be technically valid and still be a serious finding
- Why encryption and MFA gaps keep appearing even though both are widely available by default

## Public storage: the most common finding of all

The single most familiar CSPM finding is a storage resource — an **S3 bucket** or an **Azure
Storage account** — left with **public read access enabled**. It happens innocently: someone
needs to quickly share a file, flips on public access to make it easy, and never flips it back
off. A CSPM scan compares the account's access configuration against the baseline rule that says
storage should default to private, and flags the mismatch immediately — it doesn't matter whether
anything sensitive is actually inside; the setting itself is the finding.

## Overly permissive security groups

A **security group** (or network security group in Azure) controls which network traffic can
reach a resource. The classic misconfiguration is a rule allowing `0.0.0.0/0` on a sensitive
port — most infamously port 22 (SSH) or port 3389 (RDP). `0.0.0.0/0` means "any IPv4 address on
the internet," so that rule effectively opens the resource's administrative access to the entire
world, not just the organization's own network. CSPM tools check every security group's rules
against a baseline that says administrative ports should never be opened that broadly.

## Excessive IAM permissions

An **IAM policy** can be syntactically correct and still be a real security finding. A policy
whose `Action` field is `"*"` and whose `Resource` field is also `"*"` grants every possible
action on every possible resource — far more access than almost any real job requires. This
usually isn't malicious; it's the result of someone granting broad access because scoping a
policy down precisely takes more time than typing a wildcard. CSPM flags these wildcard grants as
**excessive permissions**, a specific and very common finding category.

## Missing encryption and unenforced MFA

Two more checks round out the most common list:

- **Encryption at rest not enabled** — a resource (a disk, a database, a storage account) where
  encryption has been explicitly disabled or configured weaker than the organization's required
  baseline, even though most cloud providers offer encryption at rest by default.
- **MFA not enforced on privileged accounts** — an admin or other privileged account that can
  authenticate with a password alone, with no additional factor required, leaving exactly the
  kind of account an attacker most wants to compromise reachable through a single credential.

```
Security group:
  0.0.0.0/0 -> port 22 (SSH)

Storage account:
  public access = enabled

IAM policy:
  "Action": "*"
  "Resource": "*"
```

## A concrete example

Imagine a quick review of one AWS account turns up all five patterns at once: an S3 bucket left
public from an old file-sharing task, a security group still allowing `0.0.0.0/0` on port 22 from
early testing, a developer's IAM role with `"Action": "*"`, an unencrypted EBS volume attached to
a database instance, and a root-level admin account with no MFA device registered. None of these
required an attacker's skill to create — each one was a convenience decision someone made and
never revisited. That's exactly the gap CSPM closes: it doesn't need to guess which settings
matter, because the baseline already says what every one of these should look like.

## Key terms

| Term | Meaning |
|---|---|
| Public storage misconfiguration | A storage bucket/account left with public read access enabled |
| `0.0.0.0/0` | A network rule meaning "any IPv4 address" — opening a port this broadly exposes it to the internet |
| Excessive IAM permissions | An IAM policy granting far more access (often via wildcards) than the job actually needs |
| Encryption at rest | Encrypting stored data; a common finding when it's disabled or weaker than the required baseline |
| MFA enforcement | Requiring a second authentication factor beyond a password, especially on privileged accounts |

## Check yourself

A security group rule reads: allow `0.0.0.0/0` on port 3389. Explain what that rule actually does,
which protocol/use it's exposing, and why a CSPM scan would flag it as a finding without needing
to know anything else about the resource behind it.
