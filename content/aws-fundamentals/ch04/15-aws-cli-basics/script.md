# Script — AWS CLI Basics

## Segment 1 (title)

The AWS CLI wraps every AWS service's API into a single command-line tool. It's how most real AWS work actually gets done day to day — not clicking through the console.

## Segment 2 (code: aws configure)

The first command you run is almost always aws configure — it writes your access key ID, secret access key, default region, and output format under a hidden dot-aws folder, and every later command reads from it.

## Segment 3 (code: every command, same shape)

Every AWS CLI command follows the same shape: aws, then a service, then an action, then parameters. And that service-action pair maps almost directly onto a policy's Action field from Chapter Three — aws s3 cp needs s3 colon PutObject.

## Segment 4 (steps: named profiles)

Most real engineers juggle more than one AWS identity — a personal sandbox, a work account. Named profiles handle that: configure one with --profile work, pass --profile on each call, and watch out — forgetting the flag silently falls back to your default profile.

## Segment 5 (outro)

That's the CLI. Next up: the AWS SDK — the same identity model and the same underlying API, called directly from actual application code instead of a terminal.
