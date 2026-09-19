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

## Key terms

| Term | Meaning |
|---|---|
| `aws s3 mb` | Creates ("make bucket") a new S3 bucket |
| `aws s3 rb` | Removes ("remove bucket") an S3 bucket — only if it's empty |
| Globally unique bucket name | S3 bucket names must be unique across all AWS accounts, not just yours |
| Verify, don't assume | Checking a deployed resource actually exists and is correct, not just trusting a clean exit code |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why
does `aws s3 rb` fail on a bucket that still has an object in it, and
what real-world mistake does that restriction prevent?
