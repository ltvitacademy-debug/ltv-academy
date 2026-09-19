# Script — Cross-Service Access Patterns

## Segment 1 (title)

A Lambda function, a Glue job, an EC2 instance — none of them can authenticate the way a human does. No console sign-in, no typed access key. So how does a service get permission to call other AWS services on your behalf?

## Segment 2 (steps: how a Glue job gets permissions)

Each workload is configured with an execution role. At runtime, the service itself — Glue, Lambda, whichever — assumes that role automatically, and AWS STS issues temporary, scoped credentials. No access key ever touches the job.

## Segment 3 (code: trust policy naming the service)

That assumption is only possible because of the role's trust policy — a resource-based policy on the role naming exactly who's allowed to assume it. Here, the Principal names the Glue service specifically: only glue.amazonaws.com can assume this role.

## Segment 4 (code: cross-account, same mechanism)

The same sts:AssumeRole mechanism powers cross-account access too. Account B creates a role trusting Account A as Principal; a user in Account A calls AssumeRole; STS hands back temporary credentials. Neither account ever issues a standing user in the other.

## Segment 5 (outro)

That's the identity model this entire course leans on. Chapter Four starts putting it to work from the terminal — next up, AWS CLI basics.
