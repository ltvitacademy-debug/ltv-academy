# Script — Deploying Your First Resource

## Segment 1 (title)

Time to run the full loop yourself: create a real AWS resource from the CLI, verify it actually worked, and clean it up. S3 is the right first target — no server to provision, no network to configure.

## Segment 2 (steps: create, verify, clean up)

Four steps, every time: create the resource, put something in it, verify it's actually there, and clean up afterward. Nothing here is a new concept — it's the CLI from Lesson 15, scoped by the IAM policies from Lessons 12 and 13.

## Segment 3 (code: create and upload)

aws s3 mb creates the bucket, aws s3 cp uploads a file into it. One catch worth knowing: S3 bucket names are globally unique across every AWS account on Earth, not just yours — which is why real naming conventions fold in an account ID or company prefix.

## Segment 4 (code: verify, then clean up)

A clean exit code isn't verification — aws s3 ls actually confirms the object is there. And cleanup matters: aws s3 rm removes the object, then aws s3 rb removes the bucket — and rb deliberately refuses to run on a bucket that still has anything in it.

## Segment 5 (outro)

That's a complete, real deploy-verify-cleanup loop, start to finish. Last stop in this course: the AWS certification landscape, and where AWS Fundamentals actually leaves you.
