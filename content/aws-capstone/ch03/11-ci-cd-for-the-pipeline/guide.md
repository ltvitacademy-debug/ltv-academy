# CI/CD for the Pipeline

Every resource so far has been described as if it were built once, by hand, in the console. In a
real team, that stops being acceptable fast — someone edits the Glue script directly in
production, nobody reviews the change, and the next deploy silently reverts it. This lesson
deploys `northfield-orders-etl`'s script and `northfield-pipeline-orchestrator`'s state machine
definition through a GitHub Actions pipeline instead.

## What you'll learn

- The repo layout that holds this pipeline's deployable artifacts
- A real GitHub Actions workflow that deploys on merge to `main`
- Why deploys assume an IAM role via OIDC instead of storing long-lived AWS keys

## The repo

```
northfield-data-platform/
  glue-jobs/
    northfield-orders-etl.py
  state-machines/
    northfield-pipeline-orchestrator.asl.json
  .github/
    workflows/
      deploy.yml
```

Both deployable artifacts from this capstone — the PySpark script and the ASL state machine
definition — live in version control, not only in the AWS console. A pull request against either
file is now a reviewable, diffable change, the same as any application code change.

## The workflow

```yaml
name: Deploy Northfield Pipeline

on:
  push:
    branches: [main]
    paths:
      - "glue-jobs/**"
      - "state-machines/**"

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Assume deploy role via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::111122223333:role/northfield-github-actions-deploy-role
          aws-region: us-east-1

      - name: Deploy Glue job script
        run: |
          aws s3 cp glue-jobs/northfield-orders-etl.py \
            s3://northfield-glue-scripts/jobs/northfield-orders-etl.py
          aws glue update-job --job-name northfield-orders-etl \
            --job-update Command='{ScriptLocation=s3://northfield-glue-scripts/jobs/northfield-orders-etl.py}'

      - name: Deploy state machine definition
        run: |
          aws stepfunctions update-state-machine \
            --state-machine-arn arn:aws:states:us-east-1:111122223333:stateMachine:northfield-pipeline-orchestrator \
            --definition file://state-machines/northfield-pipeline-orchestrator.asl.json
```

The `paths:` filter means this workflow only runs when a change actually touches a deployable
file — a README edit doesn't trigger a deploy. And the workflow only ever runs against `main`,
after a pull request has merged — no direct pushes deploy anything.

## Why OIDC, not stored AWS keys

`aws-actions/configure-aws-credentials` uses GitHub's OIDC identity provider to assume
`northfield-github-actions-deploy-role` for the duration of the job — no long-lived AWS access
key sits in GitHub Secrets waiting to be leaked. The trust policy on that role restricts which
repo and branch can assume it, so even a compromised workflow file in a fork can't deploy to
Northfield's account.

```json
{
  "Effect": "Allow",
  "Principal": { "Federated": "arn:aws:iam::111122223333:oidc-provider/token.actions.githubusercontent.com" },
  "Action": "sts:AssumeRoleWithWebIdentity",
  "Condition": {
    "StringEquals": { "token.actions.githubusercontent.com:sub": "repo:northfield-org/northfield-data-platform:ref:refs/heads/main" }
  }
}
```

## Key terms

| Term | Meaning |
|---|---|
| CI/CD | Continuous Integration/Continuous Deployment — automated build, test, and deploy on code change |
| OIDC | OpenID Connect — lets GitHub Actions assume an AWS role without stored long-lived credentials |
| Path filter | A workflow trigger condition limiting runs to changes in specific file paths |
| Trust policy | The IAM policy on a role defining who/what is allowed to assume it |

## Check yourself

Why does the GitHub Actions workflow use OIDC to assume `northfield-github-actions-deploy-role`
instead of storing an AWS access key and secret as GitHub Secrets?
