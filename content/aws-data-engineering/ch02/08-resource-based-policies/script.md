# Script — Resource-Based Policies

## Segment 1 (title)

Every policy so far has been attached to an identity — a role. But S3 buckets can carry their own resource-based policy too, naming who's allowed to access them from the resource's own point of view.

## Segment 2 (code: a bucket policy)

A bucket policy is the resource-based policy type for S3. Same JSON policy language as an identity policy, but the Principal field is required — since it's not attached to an identity, it has to name who the policy applies to.

## Segment 3 (steps: how they merge)

When a request hits S3, AWS evaluates every applicable policy together: either the identity policy or the bucket policy can grant an Allow, one is enough. But an explicit Deny from either side always wins, overriding any Allow. And if nothing matches at all, the request is denied by default.

## Segment 4 (outro)

Resource-based policies down. Next up: cross-account access — assuming a role across AWS accounts, and the external ID pattern that keeps it safe.
