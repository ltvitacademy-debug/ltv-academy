# AWS Secrets Manager

For the AWS-side pieces of Northbridge Retail's data pipeline, the equivalent of Key Vault is AWS Secrets Manager. The core idea carries over directly from Lesson 11 — store the secret in a managed service, grant access through IAM instead of handing out the raw value — but Secrets Manager adds one capability Key Vault doesn't handle quite the same way: built-in, scheduled credential rotation.

## What you'll learn

- How a secret is created and stored in Secrets Manager, console and CLI alike
- Why Secrets Manager stores structured key/value data, not just a single string
- How automatic rotation works, and why it matters more than manual rotation ever could
- How access to a secret is controlled through IAM, mirroring the Key Vault RBAC pattern from Lesson 11

## Creating a secret

In the console, creating a secret starts with choosing a secret type: database credentials (with built-in support for RDS, Redshift, and DocumentDB connection details), or **Other type of secret** for anything else — an API key, an OAuth token, a set of arbitrary key/value pairs. Unlike a Key Vault secret, which stores one string value, a Secrets Manager secret is commonly structured as JSON key/value pairs — a database credential naturally needs a username *and* a password *and* a host, stored together as one secret rather than three separate ones.

The same action from the AWS CLI looks like this:

```bash
aws secretsmanager create-secret \
  --name NorthbridgeCheckoutDbCreds \
  --secret-string '{"username":"checkout_svc",
    "password":"REPLACE_ME"}'
```

## Automatic rotation

This is Secrets Manager's signature feature. Instead of a human remembering to rotate a database password on a schedule — which, realistically, means it never happens — Secrets Manager can invoke a Lambda function on a defined schedule that generates a new credential, updates it in the target system (like an RDS database), and updates the secret's stored value, all without any application downtime if done correctly. Applications that fetch the secret at runtime (rather than caching it indefinitely) simply get the new value on their next read.

For Amazon RDS and Redshift specifically, AWS provides **managed rotation** — Secrets Manager handles the entire rotation Lambda for you, rather than requiring Northbridge Retail to write and maintain custom rotation logic for every database credential.

## Resource policies and cross-account access

Beyond IAM policies on the principal side, a secret itself can carry a **resource policy** — similar in spirit to an S3 bucket policy — controlling which principals, including those in other AWS accounts, can access it. This matters for Northbridge Retail's setup, where a shared services account hosts some secrets that need to be readable by workloads running in a separate production AWS account, without copying the secret's value into both accounts.

## Access control through IAM

Reading a secret's value requires `secretsmanager:GetSecretValue` permission on that secret's specific ARN — the same least-privilege shape from Lesson 7's IAM policy example, just pointed at a secret instead of an S3 bucket:

```json
{
  "Effect": "Allow",
  "Action": ["secretsmanager:GetSecretValue"],
  "Resource": "arn:aws:secretsmanager:us-east-1:111122223333:secret:NorthbridgeCheckoutDbCreds-??????"
}
```

Notice the trailing six-character suffix in the ARN — Secrets Manager appends a random suffix to every secret's full ARN specifically so that a policy can't accidentally match a *different* secret that happens to share a name prefix.

## Key terms

- **Secrets Manager secret** — a managed, typically JSON-structured credential store, analogous to a Key Vault secret
- **Managed rotation** — AWS-provided, pre-built rotation logic for supported services like RDS and Redshift
- **Resource policy** — a policy attached directly to the secret controlling which principals (including cross-account) can access it
- **GetSecretValue** — the IAM action required to actually read a secret's stored value

## Recap

AWS Secrets Manager plays the same role as Key Vault — centralized, IAM-governed secret storage — with built-in scheduled rotation as its standout feature. Next up: HashiCorp Vault, a cloud-agnostic option for teams (or chapters of a pipeline) that don't live entirely inside one cloud provider.
