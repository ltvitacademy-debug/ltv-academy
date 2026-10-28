# Lesson 17 — Configuring and Using the AWS CLI

**Chapter 5 · AWS CLI & Automation Basics · Lesson 17 of 32**

## What you'll learn

- What `aws configure` actually prompts for, and why each answer matters
- Where those answers actually get stored on disk: `~/.aws/credentials` and `~/.aws/config`
- How named profiles let you manage more than one AWS account from the same terminal
- The one detail about profile names that trips up almost everyone the first time

## Why a CLI, when the console already works

Every chapter so far has used the AWS Management Console — clicking through screens to launch an
EC2 instance, create a bucket, or attach a security group. That works, but it doesn't scale: it's
not repeatable, it can't run unattended, and it can't be checked into version control. The **AWS
CLI** turns the exact same actions into commands you can type, save in a script, and run again
identically a hundred times. Before you can run a single command against your account, though, the
CLI needs to know who you are and which account to talk to — that's what `aws configure` sets up,
and it's the first thing every AWS administrator does after installing the tool.

## `aws configure`: four questions, in order

Run `aws configure` and it asks exactly four questions:

```
aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

The access key ID and secret access key are the credential pair issued to an **IAM user** (Chapter
1) — never the root account's credentials, and never shared between people. The default region
tells every command which AWS region to run against unless you override it with `--region`. The
default output format controls how results print, and `json` is the usual choice because it's the
format every other tool, including `--query` in the next lesson, actually works with.

## Where those answers actually live

`aws configure` doesn't store anything in some hidden settings database — it writes two plain-text
files you can open yourself:

```
~/.aws/credentials
[default]
aws_access_key_id = AKIAIOSFODNN7EXAMPLE
aws_secret_access_key = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

~/.aws/config
[default]
region = us-east-1
output = json
```

`credentials` holds only the secret material; `config` holds everything else. Splitting them this
way means you can share a sanitized `config` file with a teammate or back it up without ever
touching the file that contains actual keys.

## Named profiles: more than one account, one terminal

Most administrators work with more than one AWS account — a dev account, a production account,
maybe a client's. **Named profiles** handle that without overwriting your default setup:

```
aws configure --profile prod
```

This creates a second, independent set of credentials. Here's the detail that catches almost
everyone once: in `~/.aws/credentials`, the new section is named just `[prod]`, but in
`~/.aws/config`, it's `[profile prod]` — every profile section in the config file except `default`
gets a literal `profile` prefix. Once it's set up, any CLI command accepts `--profile` to pick
which account it runs against:

```
aws s3 ls --profile prod
```

## Key terms

| Term | Meaning |
|---|---|
| `aws configure` | Interactive command that sets up credentials, default region, and default output format |
| Access key ID / secret access key | The credential pair issued to an IAM user for CLI access |
| `~/.aws/credentials` | File storing access keys, one section per profile |
| `~/.aws/config` | File storing region, output format, and other settings, one section per profile |
| Named profile | A labeled, independent set of credentials/settings, selected with `--profile` |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: for a profile named `prod`, how
is its section named differently in `~/.aws/config` compared to `~/.aws/credentials`, and why does
that matter if you're troubleshooting a profile that isn't working?
