# Script — IAM Roles for Services

## Segment 1 (title)

Every service in this course — Glue, Lambda, EMR, Redshift — needs permission to talk to S3 and to each other. None of them should do that with a long-lived access key. They do it by assuming an IAM role.

## Segment 2 (code: a trust policy naming a service principal)

A trust policy names a principal — for a service, that's a service principal like glue dot amazonaws dot com. This one says only the Glue service may assume the role. Lambda, naming a different principal, gets rejected outright.

## Segment 3 (steps: why services assume roles)

Roles beat access keys three ways: there are no standing credentials to leak, since temporary credentials expire on their own within about an hour by default; a role carries two separate policies, trust for who can assume it and permissions for what it can do once assumed; and the sts AssumeRole call happens automatically behind the scenes — you never make that call yourself.

## Segment 4 (outro)

IAM roles for services, down. Next up: resource-based policies — bucket policies versus identity policies, and how they combine.
