# Lesson 15 — AWS Secrets Manager and Parameter Store

**Chapter 4 · Secrets Management in the Cloud · Lesson 15 of 32**

## What you'll learn

- What **AWS Secrets Manager** stores and its standout feature: automatic rotation for supported services
- What **Systems Manager Parameter Store** stores, and why it's a simpler, cheaper alternative for many use cases
- The real tradeoff between the two services — cost vs. built-in rotation — and how to decide which one fits a given value
- Why AWS offers two overlapping services instead of just one

## AWS Secrets Manager: built for rotation

**AWS Secrets Manager** is purpose-built for storing secrets —
database credentials, API keys, OAuth tokens — and its defining
feature is **automatic rotation**. For supported services, most
notably **Amazon RDS**, Secrets Manager can rotate the stored
credential on a schedule without any manual intervention: it
generates a new password, updates it on the RDS instance, and
updates the stored secret value, all through a managed rotation
Lambda function AWS provides. An application that always fetches
the current value from Secrets Manager at connection time never
notices the password changed underneath it.

```
# Application always asks for the current value --
# it never knows or cares that rotation happened last night
response = secrets_client.get_secret_value(SecretId="prod/orders-db")
password = response["SecretString"]
```

Secrets Manager charges per secret stored per month, plus per API
call — which is the cost side of the tradeoff.

## Parameter Store: simpler and cheaper

**AWS Systems Manager Parameter Store** stores configuration values
and secrets as named, hierarchical parameters (e.g.
`/prod/orders-service/db-host`). Its **Standard** tier is free for a
generous number of parameters and API calls, which makes it the
default choice for ordinary configuration — feature flags, hostnames,
non-sensitive settings — and it also supports basic secrets as a
`SecureString` parameter type, encrypted with AWS KMS. What it
doesn't have is Secrets Manager's built-in automatic rotation
workflow; rotating a `SecureString` parameter is something you'd have
to script yourself.

## The real tradeoff

| | Secrets Manager | Parameter Store |
|---|---|---|
| Cost | Per-secret, per-month + API calls | Standard tier is free |
| Automatic rotation | Built in for supported services (e.g. RDS) | Not built in — rotate manually or with your own automation |
| Best for | Database credentials and anything that needs scheduled rotation | Config values, feature flags, and less-sensitive parameters |
| Basic secret support | Yes | Yes, via encrypted `SecureString` |

The decision isn't "which service is better" — it's which property
a given value needs most. A production database password that must
be rotated on a schedule is worth Secrets Manager's cost. A feature
flag or an internal hostname doesn't need rotation at all, so paying
Secrets Manager's per-secret charge for it would be wasted spend —
Parameter Store covers it for free.

## Key terms

| Term | Meaning |
|---|---|
| AWS Secrets Manager | A secrets service with built-in automatic rotation for supported services like RDS |
| Automatic rotation | Secrets Manager generating and applying a new credential value on a schedule, with no manual step |
| Systems Manager Parameter Store | A hierarchical configuration/secrets store; Standard tier is free, no built-in rotation |
| SecureString parameter | A Parameter Store value type encrypted with AWS KMS, used for basic secrets |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
would a team choose AWS Secrets Manager for a production RDS
password but Parameter Store for an internal service's hostname?
