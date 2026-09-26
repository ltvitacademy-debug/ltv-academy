# IAM for Data Science Work

Every lesson so far quietly depended on permissions. Your notebook reads S3, a Glue job writes a table, Redshift unloads to a bucket, and soon a SageMaker training job will pull data and save a model. Each of those actions is done by an **identity** that AWS Identity and Access Management (IAM) has allowed to do it. The AWS Fundamentals and Data Engineer paths teach IAM users, roles, policies and least privilege in depth. Here we apply them to one question: what permissions does a data science project actually need, and how do we grant only those?

AWS snippets below are illustrative and **not run here**. The JSON documents were checked for valid structure, and the parameter names of the IAM calls were checked against the boto3 service model, but nothing was created in an account.

## What you'll learn

- The identities involved in a data science project
- What a SageMaker execution role is and how its trust policy looks
- Why the broad managed policy is a starting point, not an endpoint
- How to scope S3 access to a project prefix
- What `iam:PassRole` is for, and how to get your role in a notebook

## Three identities to keep straight

1. **You**, signing in as an IAM user or through your organization's sign-in. Your permissions decide what you can start.
2. **The SageMaker execution role.** The SageMaker AI docs explain that the service performs operations on your behalf using other AWS services, and you grant it permission through an IAM execution role. When a training job reads your dataset, it uses this role, not your personal login.
3. **Service roles** for other tools, such as the Glue job role from Lesson 2 or the IAM role Redshift assumes in `UNLOAD`.

Most "access denied" errors in ML work come from mixing these up: you can read the bucket, but the role your job runs as cannot.

## The trust policy

Every role has a **trust policy** saying who may assume it. For a SageMaker execution role, the documented principal is the SageMaker service:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "sagemaker.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}
```

The permissions policies attached to the role then say what it can do.

## Start broad, then scope down

You can create an execution role with the managed policy `AmazonSageMakerFullAccess`. The docs are explicit about its S3 limit: it grants certain S3 actions only on buckets or objects with `SageMaker`, `Sagemaker`, `sagemaker`, or `aws-glue` in the name, plus a few actions on any S3 resource. My bucket `my-ds-bucket` has none of those words, so a role with only that policy could not read objects in it. I confirmed the name rule with a small script. To reach your data you attach an additional policy that names your bucket.

Do not fix this with a wildcard over every bucket. Scope the policy to your project. Here is a sketch for the churn project:

```json
{"Effect": "Allow",
 "Action": ["s3:GetObject"],
 "Resource": "arn:aws:s3:::my-ds-bucket/churn-project/raw/*"},
{"Effect": "Allow",
 "Action": ["s3:GetObject", "s3:PutObject"],
 "Resource": [
   "arn:aws:s3:::my-ds-bucket/churn-project/processed/*",
   "arn:aws:s3:::my-ds-bucket/churn-project/models/*"]}
```

Raw data is read-only, and writes go only to `processed/` and `models/`. Listing the bucket needs a separate statement on the **bucket** ARN (`arn:aws:s3:::my-ds-bucket`), optionally limited with an `s3:prefix` condition. As an illustration, I tested those two resource patterns against sample keys with simple wildcard matching, where `*` matches any characters. The processed and models keys matched, while `raw/customers.parquet` and `hr-data/salaries.csv` did not. Real IAM evaluation has more rules (explicit denies, boundaries, resource policies), so treat this as a picture, not a substitute for testing.

## iam:PassRole

When you start a training job you hand SageMaker a role to run as. That requires the `iam:PassRole` permission for that role. The docs show it with an `iam:PassedToService` condition; naming one role in `Resource`, as below, tightens it further:

```json
{"Effect": "Allow",
 "Action": "iam:PassRole",
 "Resource": "arn:aws:iam::111122223333:role/ChurnSageMakerRole",
 "Condition": {"StringEquals":
   {"iam:PassedToService": "sagemaker.amazonaws.com"}}}
```

This lets you pass only that role, and only to SageMaker. The account ID here is a placeholder.

## Getting the role in a notebook

Inside a SageMaker environment, the Python SDK can return the role attached to your space. The import differs by SDK version, so check which you have:

```python
# SageMaker Python SDK v2
from sagemaker import get_execution_role
# SDK v3 (per current AWS docs)
from sagemaker.core.helper.session_helper import (
    get_execution_role)

role = get_execution_role()
```

The docs warn that this raises an error outside a SageMaker environment.

## Recap

- Jobs run as roles, not as you; keep the identities straight.
- The trust policy names `sagemaker.amazonaws.com`.
- Scope S3 access to project prefixes, read-only for raw data.
- Restrict `iam:PassRole` with `iam:PassedToService`.
- Never paste access keys into a notebook.

Next, Chapter 2 begins with the SageMaker environment itself.
