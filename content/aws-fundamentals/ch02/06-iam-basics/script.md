# Script — IAM Basics

## Segment 1 (title)

IAM is AWS's global identity and access management service — global meaning it isn't scoped to a Region at all. An IAM user or role you create is available account-wide.

## Segment 2 (code: the four entities)

Four core entities: users are long-term identities, usually for people; groups collect users so you can assign policies in bulk; roles are temporary identities anything can assume; and policies are the JSON documents that actually grant or deny permissions.

## Segment 3 (steps: roles over access keys)

A role is different from a user in one crucial way — nothing owns its credentials long-term. A Lambda function reading from S3 doesn't get access keys hardcoded into it; it gets an execution role, and AWS hands it temporary, auto-rotated credentials each time it runs.

## Segment 4 (outro)

That's least privilege in practice: the minimum permissions actually needed, nothing baked in "just in case." Next up: EC2 and Lambda, AWS's core compute services.
