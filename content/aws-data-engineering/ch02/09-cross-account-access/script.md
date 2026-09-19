# Script — Cross-Account Access

## Segment 1 (title)

Real data platforms rarely live in a single AWS account. A partner might need to drop files into your bucket. The standard, secure way to make that work across an account boundary is cross-account role assumption.

## Segment 2 (code: a trust policy with an external ID)

The role in the account that owns the resource trusts the other account's ID as a principal — but it also requires an external ID, a shared secret the caller has to pass alongside AssumeRole. Trusting the account alone isn't enough.

## Segment 3 (steps: what has to be true on both sides)

Cross-account access needs permission granted twice: the resource account's trust policy has to name the caller's account, the caller's own identity policy has to allow sts AssumeRole on that specific role ARN, and an external ID closes the confused deputy problem — where a third party could otherwise trick a trusted service into misusing its own legitimate access.

## Segment 4 (outro)

Cross-account access down. Next up: IAM best practices for pipelines — least privilege, scoped ARNs, and getting rid of standing access keys for good.
