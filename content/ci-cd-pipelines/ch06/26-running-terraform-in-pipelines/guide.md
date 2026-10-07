# Running Terraform in Pipelines

Northbridge Retail's platform team doesn't provision infrastructure by running `terraform apply` from a laptop anymore. Their VPC, EKS cluster, and supporting AWS resources are defined in Terraform, and every change to that code goes through the same kind of pipeline that builds and tests the application itself — except this pipeline's job is to safely change real cloud infrastructure instead of shipping a container.

## What you'll learn

- Why Terraform needs a **remote backend** with locking before it can run safely from CI
- The standard CI shape: `fmt` → `validate` → `plan` on every pull request
- Why `apply` is a separate, gated job that only runs after a human approves it
- How Northbridge Retail authenticates the pipeline to AWS without storing long-lived keys

## Remote state comes first

Running Terraform locally, state lives in a file on your laptop. The moment a second person — or a CI runner — might run Terraform against the same infrastructure, that stops being safe: two applies running at once can corrupt the state file or fight over the same resources. Northbridge Retail's pipeline uses a remote backend with locking before it runs a single `plan`:

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "northbridge-retail-tfstate"
    key            = "platform/eks-cluster/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "northbridge-retail-tf-locks"
    encrypt        = true
  }
}
```

The S3 bucket holds the actual state file; the DynamoDB table is just a lock — Terraform writes a row to it while a plan or apply is in progress, and any other run that tries to start sees the lock and waits (or fails) instead of racing.

## Plan on every pull request

Every PR that touches the `infra/` directory runs the same three-step check, and nothing in this job can change real infrastructure — `plan` is read-only:

```yaml
# .github/workflows/terraform.yml
name: Terraform

on:
  pull_request:
    paths: ["infra/**"]
  push:
    branches: [main]
    paths: ["infra/**"]

jobs:
  plan:
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # required for OIDC auth to AWS
      contents: read
    defaults:
      run:
        working-directory: infra
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.9.5"

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::111122223333:role/northbridge-tf-ci
          aws-region: us-east-1

      - run: terraform fmt -check
      - run: terraform init
      - run: terraform validate
      - run: terraform plan -out=tfplan
```

`fmt -check` fails the build on inconsistent formatting instead of silently reformatting it. `validate` catches syntax and type errors before Terraform ever talks to AWS. `plan` is the step that actually matters: it shows exactly what would change, and on a pull request that plan output gets posted as a PR comment so a reviewer can read "this will destroy and recreate 1 resource" before approving the code, not after.

## Apply is a separate, gated job

`apply` only runs on `main`, in its own job, behind a GitHub **environment** that requires a named reviewer to click approve — Terraform never applies unattended just because a PR merged:

```yaml
  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production   # requires manual approval in GitHub settings
    permissions:
      id-token: write
      contents: read
    defaults:
      run:
        working-directory: infra
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.9.5"
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::111122223333:role/northbridge-tf-ci
          aws-region: us-east-1
      - run: terraform init
      - run: terraform apply -auto-approve tfplan
```

Note what's *not* in this file: no AWS access key or secret key anywhere. `permissions: id-token: write` plus `aws-actions/configure-aws-credentials` lets GitHub Actions request a short-lived AWS credential through OIDC federation — AWS trusts GitHub's token issuer directly, so there's no long-lived key sitting in a repo secret for someone to leak.

## Key terms

- **Remote backend** — where Terraform stores its state file outside the local machine (here, an S3 bucket)
- **State locking** — a mechanism (here, a DynamoDB table) preventing two Terraform runs from writing state at the same time
- **`terraform plan`** — a read-only preview of what would change; safe to run on every PR
- **`terraform apply`** — the step that actually changes infrastructure; gated behind review
- **OIDC federation** — a way for CI to get short-lived cloud credentials without storing long-lived secrets
