# Script — S3, IAM & Lambda on AWS

## Segment 1 (title)

Northbridge's order-processing fleet now has a network to run on. This lesson rounds out the rest of the core AWS footprint: an S3 bucket for product images, an IAM role scoped to exactly what that bucket's consumers need, and a Lambda function that sends the order-confirmation email customers see right after checkout.

## Segment 2 (code)

Product images get their own bucket, with versioning and encryption configured as separate resources attached to it. Versioning means an accidentally overwritten or deleted photo can be recovered from an earlier version instead of being gone for good. Server-side encryption means every object AWS stores gets encrypted at rest automatically, with no extra work from whoever uploads it.

## Segment 3 (code)

The Lambda function needs to read from that bucket and send email, nothing more. IAM expresses that as a role, and a policy describing the allowed actions. The assume role policy says which AWS service is allowed to use this role — here, Lambda itself. The policy's statement lists exactly two allowed actions: reading product images, and sending email.

## Segment 4 (steps)

That's least privilege in practice. The role defines who can assume this identity. The policy defines exactly what it's allowed to do, nothing broader. And the role policy attachment connects the two, so the role actually carries those permissions. A bug or a compromised function still can't do unrelated damage, because it was never granted the access to do it.

## Segment 5 (code)

With the role in place, the function itself is a short block pointing at deployed code and the role it assumes. Role references the IAM role block directly — Lambda assumes that role every time it runs, instead of the function carrying its own access keys. Services assume roles; they almost never hold long-lived credentials.

## Segment 6 (outro)

Northbridge's storage, access control, and serverless pieces are all in place. Up next, Lesson 28: EKS, the AWS-native home for Northbridge's containerized checkout service.
