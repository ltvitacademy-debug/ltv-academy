# Script — AWS IAM Roles & Policies

## Segment 1 (title)

Northbridge Retail's data pipeline runs partly on AWS, and the underlying principle doesn't change: least privilege, enforced through identity. What changes is the vocabulary. This lesson covers AWS IAM, starting with the distinction that trips up almost everyone new to AWS — users versus roles.

## Segment 2 (steps)

An IAM user is a long-term identity that can hold a password and long-lived access keys — a liability if those keys ever leak into a repo or a log. An IAM role has no long-term credentials at all; it's assumed by a trusted principal in exchange for temporary, automatically-expiring access instead.

## Segment 3 (screenshot)

In the console, assuming a role is visible and reversible — you can see both the original signed-in user and the role currently in use, with a straightforward switch back when you're done.

## Segment 4 (steps)

Every role actually carries two policies. The trust policy defines who's allowed to assume the role at all. The permissions policy defines what that role can actually do once assumed. Both halves matter — a tight permissions policy still isn't enough if the trust policy lets the wrong principal assume the role.

## Segment 5 (code)

Here's a permissions policy scoped the way least privilege demands: GetObject, on exactly one S3 bucket's ARN — not a wildcard action on every bucket the account owns. This is the policy behind Northbridge Retail's EC2 instance role, which only ever needs to read logs from one place.

## Segment 6 (outro)

If an attacker ever got code execution on that instance, the role itself limits the blast radius to exactly those logs. Next up: the same identity principle, this time inside a Kubernetes cluster.
