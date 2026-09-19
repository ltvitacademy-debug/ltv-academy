# Cross-Account Access

Real data platforms rarely live in a single AWS account. A partner company might need to
drop files into your S3 bucket; your data platform account might need to read from a
source-system account owned by another team. Both cases need a principal in **Account A** to
act on a resource in **Account B** — and the standard, secure way to do that is **cross-account
role assumption**, not shared credentials.

## What you'll learn

- How AssumeRole works when the role lives in a different account than the caller
- What has to be true on both sides of the account boundary for it to work
- The external ID pattern, and the confused-deputy problem it prevents
- A concrete example: a partner account writing to your S3 bucket

## AssumeRole across accounts

Assuming a role in your own account is one API call. Assuming a role in **another** account
needs permission granted from both sides:

1. In **Account B** (the account that owns the role and the resource), the role's **trust
   policy** must name Account A's account ID (or a specific role ARN in Account A) as a
   trusted principal.
2. In **Account A** (the caller), the calling role or user needs an identity policy allowing
   `sts:AssumeRole` on that specific role ARN in Account B.

With both in place, a principal in Account A calls `sts:AssumeRole` with Account B's role
ARN, and gets back temporary credentials scoped to whatever the Account B role's permissions
policy allows — nothing more.

```json
// Account B's trust policy, on the role Account A will assume
{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::444455556666:root" },
  "Action": "sts:AssumeRole",
  "Condition": { "StringEquals": { "sts:ExternalId": "partner-acme-2024" } }
}
```

## The external ID pattern

The `Condition` block above adds an **external ID** — a shared secret string that Account A
must also pass when calling `AssumeRole`, in addition to being a trusted principal. This
exists to prevent the **confused deputy problem**: without it, if Account B's role trusts
"any caller from Account A's account ID," and a third party ever tricks a legitimate service
in Account A into assuming that role on their behalf, the third party inherits access they
shouldn't have. Requiring an external ID known only to the two parties that set up the
relationship closes that gap — it's standard practice whenever a third-party or partner
account is involved (this is exactly the mechanism AWS itself documents for granting access
to external SaaS vendors).

## A real use case: a partner writing to your bucket

A partner company needs to deliver daily files into your data lake's raw zone. Instead of
creating an IAM user with access keys and handing over credentials (a long-lived secret
crossing a company boundary), you create a role in your account scoped to exactly
`s3:PutObject` on `raw/partner-acme/*`, with a trust policy naming the partner's AWS account
ID and requiring their external ID. The partner's own systems assume that role, get
temporary credentials, and write only to that one prefix — they never see your account's
broader permissions, and there's no standing secret to leak.

## Key terms

| Term | Meaning |
|---|---|
| Cross-account access | A principal in one AWS account assuming a role owned by another account |
| Trust policy (cross-account) | Must name the other account's ID or role ARN as a trusted principal |
| External ID | Shared secret required alongside AssumeRole to prevent the confused deputy problem |
| Confused deputy problem | A third party tricking a trusted service into misusing its own legitimate permissions |

## Check yourself

A vendor's AWS account ID is trusted in your role's trust policy, but you didn't add an
external ID condition. What risk does that create, and how does adding an external ID close
it?
