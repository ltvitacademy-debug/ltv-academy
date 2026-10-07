# AWS IAM Roles & Policies

Northbridge Retail doesn't run on Azure alone — part of its data pipeline runs on AWS. The underlying principle doesn't change: least privilege, enforced through identity. What changes is the vocabulary. This lesson covers AWS Identity and Access Management (IAM), with a particular focus on the distinction that trips up almost everyone new to AWS: users versus roles.

## What you'll learn

- The difference between an IAM user and an IAM role, and why roles are almost always the better choice for services
- How IAM policies are structured, and what a policy document actually grants
- The difference between a trust policy and a permissions policy
- How Northbridge Retail scopes an EC2 instance role to exactly the access it needs

## IAM users vs. IAM roles

An **IAM user** represents a long-term identity — historically a person, though it can represent an application. Users can have a password for console access and long-term access keys for programmatic access. Those access keys are a liability: if they leak into a public GitHub repo or a log file, they work indefinitely until someone notices and rotates them.

An **IAM role** has no long-term credentials at all. Instead, a role is *assumed* — a trusted principal (an EC2 instance, a Lambda function, a user, or even another AWS account) exchanges a request for temporary, automatically-expiring credentials. This is why AWS guidance consistently pushes services toward roles instead of users with embedded access keys: a role's credentials can't leak into a repository because they're never written down anywhere permanent in the first place. At Northbridge Retail, the EC2 instances running the data pipeline use an **instance role** — not an IAM user — so there are no long-term access keys sitting on disk to leak.

![AWS console showing a user actively using a switched-to role, with options to switch back](/courses/devsecops-fundamentals/ch02/07-aws-iam-roles-and-policies/iam-console-switch-role.png)
*The AWS console's role-switching panel. Notice the console tracks both the original signed-in user and the role currently being used — temporary, and reversible with "Switch back."*

## Two kinds of policy on every role

A role actually carries two separate policy documents, and conflating them is a common source of confusion:

- **Trust policy** (also called an assume-role policy) — defines *who is allowed to assume this role*. It doesn't grant any AWS permissions by itself; it only says which principal can exchange itself for the role's temporary credentials.
- **Permissions policy** — defines *what the role can actually do once assumed*: which AWS actions, on which resources, under which conditions.

A role with a wide-open trust policy but a narrow permissions policy limits what happens if the role is assumed unexpectedly. A role with a tight trust policy but an overly broad permissions policy is still a problem the moment that one trusted principal is compromised. Both halves matter.

## Reading a permissions policy

IAM policies are JSON documents built from statements. Each statement has an effect (Allow or Deny), one or more actions (the specific API calls permitted, like `s3:GetObject`), and a resource (which specific AWS resource the action applies to, identified by its ARN). Here's a permissions policy scoped the way least privilege demands — read-only access to exactly one S3 bucket, not every bucket in the account:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::nb-checkout-logs/*"
  }]
}
```

Compare that to a policy using `"Action": "s3:*"` and `"Resource": "*"` — syntactically valid, but a least-privilege violation, since it grants every S3 action on every bucket the account owns, not just the one log bucket this particular pipeline stage actually reads from.

## Northbridge Retail's EC2 instance role

The data pipeline's EC2 instances need to read log files from one specific S3 bucket. Their instance role's trust policy allows only the EC2 service to assume it; its permissions policy allows only `s3:GetObject` on that one bucket's ARN. If an attacker ever gained code execution on that instance, the IAM role itself limits what they could do next — read those specific logs, and nothing else in the AWS account.

## Key terms

- **IAM user** — a long-term identity, often with a password and/or long-lived access keys
- **IAM role** — an identity with no long-term credentials, assumed by a trusted principal for temporary, auto-expiring access
- **Trust policy** — defines who is allowed to assume a role
- **Permissions policy** — defines what a role can do once assumed
- **ARN (Amazon Resource Name)** — the unique identifier used to scope a policy to a specific resource

## Recap

IAM roles replace long-term credentials with temporary ones, and every role is really two policies: trust (who can assume it) and permissions (what it can do). Scoping both tightly — as Northbridge Retail does for its EC2 instance role — is AWS's version of the least-privilege principle from Lesson 5. Next up: the same idea again, inside a Kubernetes cluster.
