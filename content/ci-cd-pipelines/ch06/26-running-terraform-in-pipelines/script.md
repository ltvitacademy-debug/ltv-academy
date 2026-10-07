# Script — Running Terraform in Pipelines

## Segment 1 (title)

Northbridge Retail's platform team provisions its VPC and EKS cluster with Terraform, and every change to that code runs through a pipeline, not a laptop. Today: how that pipeline is actually structured, and why the riskiest step is deliberately kept separate from the rest.

## Segment 2 (code: remote backend)

Before Terraform can run from CI at all, its state needs a safe home. Northbridge Retail stores state in an S3 bucket, with a DynamoDB table providing locking — so if two pipeline runs ever start at once, the second one waits instead of corrupting the state file. Without this, a laptop run and a CI run could fight over the same infrastructure.

## Segment 3 (code: plan on every PR)

Every pull request touching infrastructure code runs three checks, in order: fmt, validate, and plan. All three are read-only — nothing here changes real infrastructure. The plan output gets posted as a comment on the pull request itself, so a reviewer can read exactly what would change — created, modified, or destroyed — before ever approving the code.

## Segment 4 (code: gated apply)

Apply lives in its own job, and it only runs after a merge to main, behind a GitHub environment that requires a named reviewer's manual approval before it proceeds. Notice there's no AWS access key anywhere in the file — OIDC federation hands the job a short-lived role at run time instead of a long-lived secret sitting in the repo.

## Segment 5 (steps: the full gate)

Put the whole gate together: plan runs automatically on every pull request and changes nothing on its own. A human reads that plan before merging. Merging to main triggers the apply job. And even then, that job still waits for a manual approval click before it's allowed to touch real infrastructure.

## Segment 6 (outro)

Next lesson: once Terraform has provisioned the Kubernetes cluster itself, the pipeline's job shifts to building the application's container image and deploying it onto that cluster.
