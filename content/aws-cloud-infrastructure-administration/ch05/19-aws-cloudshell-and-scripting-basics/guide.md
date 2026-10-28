# Lesson 19 — AWS CloudShell and Scripting Basics

**Chapter 5 · AWS CLI & Automation Basics · Lesson 19 of 32**

## What you'll learn

- What AWS CloudShell actually is, and why it skips the `aws configure` step entirely
- What comes pre-installed, and what persists between sessions
- How to write a simple shell script that loops over your own AWS resources
- When CloudShell is the right tool, and when a local terminal or real automation is better

## What AWS CloudShell actually is

**AWS CloudShell** is a browser-based terminal, launched directly from the AWS Management
Console — there's a small terminal icon in the console's top navigation bar, and clicking it opens
a shell running in a small Amazon Linux container, with no setup required. Two things make it
genuinely useful rather than just a novelty:

- It's **pre-authenticated**. CloudShell inherits the same IAM permissions as whichever console
  user launched it, so there's no `aws configure` step and no access keys to manage — you're
  already signed in the moment the shell opens.
- It's **pre-installed**. The AWS CLI, Python, and several other common tools are already there,
  so there's nothing to install before you can run a command.

CloudShell also gives each user **1 GB of persistent storage per AWS Region**, under `$HOME`, that
survives between sessions — so a script you save today is still there the next time you open
CloudShell in that region.

## A real script: looping over your own resources

Because the CLI is already configured, you can write and run a script the moment the shell opens.
Here's a small one that lists every S3 bucket in the account and prints each bucket's object count
and total size:

```bash
#!/bin/bash
for bucket in $(aws s3 ls | awk '{print $3}'); do
  echo "Bucket: $bucket"
  aws s3 ls "s3://$bucket" --summarize | tail -2
done
```

Read it the way you'd read any shell script: `aws s3 ls` with no bucket name lists every bucket,
one per line, with the bucket name in the third column — `awk '{print $3}'` pulls just that column
out. The `for` loop then runs once per bucket name, and inside the loop, `aws s3 ls "s3://$bucket"
--summarize` lists that one bucket's contents with a summary line added, and `tail -2` keeps just
the "Total Objects" and "Total Size" lines instead of printing every object. This is the exact
pattern real AWS scripts use: one CLI command to get a list of things, a loop to act on each one,
and a second CLI command inside the loop.

## When CloudShell is the right tool

CloudShell is ideal for a quick, ad hoc task — checking something across every bucket, running a
one-off cleanup command — without installing anything locally. It has real limits worth knowing:
sessions time out after a period of inactivity, the persistent storage is capped at 1 GB per
Region, and it isn't meant for long-running or scheduled automation. For anything that needs to run
on a schedule or as part of a deployment pipeline, that job belongs in a scheduled Lambda function
or a CI/CD pipeline instead — CloudShell is for a human sitting at a keyboard, not for unattended
automation.

## Key terms

| Term | Meaning |
|---|---|
| AWS CloudShell | A pre-authenticated, pre-installed browser-based shell launched from the console |
| Pre-authenticated | CloudShell inherits the IAM permissions of the console user who launched it |
| Persistent storage | 1 GB per Region under `$HOME` that survives between CloudShell sessions |
| `for` loop over CLI output | The common scripting pattern: list resources with one command, act on each with another |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why doesn't CloudShell require
you to run `aws configure` before using it, and what's one real limitation that makes it the wrong
tool for scheduled automation?
