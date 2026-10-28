# Lesson 11 — Authenticating Python Scripts to Azure and AWS

**Chapter 3 · Python for Cloud Automation · Lesson 11 of 32**

## What you'll learn

- Why `DefaultAzureCredential()` doesn't take a password or key as an argument, and what it actually
  does instead
- The real order Azure's credential chain checks, from environment variables to Managed Identity to
  your own `az login` session
- Boto3's own credential chain, and the real files and environment variables it checks
- Why hardcoding a secret directly in a script is exactly the mistake both of these chains are built
  to avoid

## DefaultAzureCredential: one object, several sources

```python
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
```

No key, no password — `DefaultAzureCredential` tries a sequence of real credential sources, in
order, until one works: **environment variables** (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`,
`AZURE_CLIENT_SECRET` for a service principal), **Managed Identity** (when the script runs on an
Azure resource — a VM, an App Service, a Function App — that already has a managed identity
assigned), then a **locally signed-in session** (your own `az login`, or a sign-in from Visual
Studio Code). The exact same line of code authenticates correctly whether it's run on your laptop,
in a pipeline, or on a VM in Azure — only the environment around it decides which source actually
wins.

## Boto3's own credential chain

`boto3.client("s3")` with no key arguments at all walks a similar search path: explicit arguments
passed in code (strongly discouraged), **environment variables** (`AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`), the shared credentials file at
`~/.aws/credentials`, the shared config file at `~/.aws/config`, and — when the script runs on an
EC2 instance, inside an ECS task, or as a Lambda function — an **IAM role** attached to that
compute resource, fetched automatically through the instance metadata service.

```python
import boto3

client = boto3.client("s3")
```

## Why not just hardcode the key?

A hardcoded client secret or access key sits in the script file forever — in source control
history, in every clone of the repo, readable by anyone who can read the file. This is the exact
mistake the Cybersecurity path's "never hardcode a secret" lesson warns about. Both credential
chains exist specifically so you never have to write a secret into a script at all: on your laptop
it comes from `az login` or your `~/.aws/credentials` file (both outside the repo); in production
it comes from a Managed Identity or an IAM role attached to the actual compute resource — meaning
there's no secret to leak in the first place.

## Key terms

| Term | Meaning |
|---|---|
| `DefaultAzureCredential` | Azure SDK class that tries several real credential sources in order, automatically |
| Managed Identity | An identity Azure assigns directly to a resource (VM, Function App) — no secret to manage |
| Boto3 credential chain | The ordered list of sources (env vars, `~/.aws/credentials`, IAM role) boto3 checks automatically |
| IAM role | AWS identity attached to compute (EC2, Lambda) instead of a long-lived access key |

## Check yourself

You're ready for Lesson 12 when you can explain why `DefaultAzureCredential()` and
`boto3.client("s3")` with no arguments are both more secure than passing a key or secret directly in
the call — and name the one source each chain checks when running on an actual Azure VM or EC2
instance.
