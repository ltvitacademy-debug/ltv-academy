# Lesson 15 — AWS CLI Basics

**Chapter 4 · Working in AWS · Lesson 15 of 18**

## What you'll learn

- How to install and configure the AWS CLI with `aws configure`
- The CLI's general command shape, and how it maps directly onto the
  IAM actions from Chapter 3
- Real, common S3 commands you'll use constantly as a data engineer
- Named profiles, and why they matter once you touch more than one
  set of credentials

## Installing and configuring the CLI

The **AWS CLI** (`aws`) is a command-line tool that wraps every AWS
service's API. Once installed, the first command you run is almost
always:

```
$ aws configure
AWS Access Key ID [None]:     AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/...
Default region name [None]:   us-east-1
Default output format [None]: json
```

This writes two files under `~/.aws/` (or
`%USERPROFILE%\.aws\` on Windows): `credentials`, holding the access
key pair, and `config`, holding the region and output format. Every
subsequent `aws` command reads from these unless told otherwise.

This is also where Chapter 3 becomes concrete: whatever IAM identity
those access keys belong to — a user, ideally in a group with a
scoped policy — is exactly what determines which of the following
commands will succeed and which will return an `AccessDenied` error.

## The general shape of a command

Every AWS CLI command follows the same pattern:

```
aws <service> <action> [parameters]

aws s3 ls                                  # service: s3, action: ls
aws s3 cp file.csv s3://my-bucket/         # action: cp, with args
aws iam list-users                          # service: iam, action: list-users
aws glue start-job-run --job-name daily-etl # service: glue, action: start-job-run
```

The `<service> <action>` pair maps almost directly onto a policy's
`Action` field from Lesson 12 — `aws s3 cp` is backed by the
`s3:PutObject` permission, `aws glue start-job-run` by
`glue:StartJobRun`. Reading a CLI command and predicting the IAM
permission it needs is a skill worth building early.

## Real S3 commands you'll use constantly

```
aws s3 ls                              # list all buckets
aws s3 ls s3://my-bucket/               # list objects in a bucket
aws s3 cp local.csv s3://my-bucket/raw/  # upload a file
aws s3 cp s3://my-bucket/raw/data.csv .  # download a file
aws s3 sync ./local-folder s3://my-bucket/raw/  # sync a whole folder
aws s3 rm s3://my-bucket/raw/old.csv     # delete an object
```

`aws s3 sync` is the one you'll reach for most as a data engineer —
it only transfers files that are new or changed, which matters once
"upload a folder" means thousands of files.

## Named profiles: more than one identity

Most real engineers touch more than one AWS identity — a personal
sandbox account and a work account, or separate dev/prod credentials.
The CLI handles this with **named profiles**:

```
$ aws configure --profile work
$ aws s3 ls --profile work
$ aws s3 ls --profile personal
```

Each profile is a separate named block in `~/.aws/credentials` and
`~/.aws/config`. Forgetting `--profile` silently falls back to the
`[default]` profile — a common source of "why did that command touch
the wrong account" confusion.

## Key terms

| Term | Meaning |
|---|---|
| AWS CLI | The command-line tool that wraps every AWS service's API |
| `aws configure` | The command that writes access keys, region, and output format to `~/.aws/` |
| `aws s3 sync` | Uploads/downloads only new or changed files between a local folder and S3 |
| Named profile | A separate, labeled set of credentials selected with `--profile` |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what
determines whether a given `aws` CLI command succeeds or returns
`AccessDenied`, and where does that decision actually get made?
