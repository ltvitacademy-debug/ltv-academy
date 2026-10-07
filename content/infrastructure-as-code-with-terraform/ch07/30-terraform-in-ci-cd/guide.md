# Terraform in CI/CD

Running `terraform apply` from a laptop works for learning, but it doesn't scale to a team — two engineers can't both safely run it against the same state at the same time, and nobody else gets to see the plan before it runs. This lesson moves Northbridge Retail's Terraform runs into a CI/CD pipeline, where every change is reviewed before it touches real infrastructure.

## What you'll learn

- Why running Terraform locally doesn't scale to a team
- The shape of a Terraform pipeline: format check, plan, gated apply
- A real GitHub Actions workflow running `terraform fmt`, `plan`, and `apply`
- Why `apply` should be gated behind a merge to the main branch, not run on every push

## The problem with applying from a laptop

If every engineer runs `terraform apply` from their own machine, there's no shared record of who ran what, when, or what the plan actually said before it executed. Two people running Terraform against the same state at the same time can also corrupt it (Chapter 3 covered why state locking prevents that, but it doesn't make concurrent applies a good idea in the first place). Moving the `apply` step into CI/CD means it only ever runs in one consistent, logged environment.

## The shape of a Terraform pipeline

A typical pipeline has three stages: check formatting, show a plan on every change, and only apply after a human has reviewed that plan and merged it.

```yaml
# .github/workflows/terraform.yml
name: terraform
on:
  pull_request:
    paths: ["infra/**"]
  push:
    branches: ["main"]
    paths: ["infra/**"]

jobs:
  plan:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform fmt -check
        working-directory: infra
      - run: terraform init
        working-directory: infra
      - run: terraform plan -no-color
        working-directory: infra

  apply:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: infra
      - run: terraform apply -auto-approve
        working-directory: infra
```

## Why plan runs on the pull request, and apply only on main

The `plan` job runs on every pull request touching `infra/**`, posting what would change for reviewers to see before approving — the same review process Northbridge's team already uses for application code. The `apply` job only runs after that pull request is merged to `main`, so nothing ever applies without having first been reviewed as a plan. Credentials for both providers (`AZURE_CLIENT_ID`/`AZURE_CLIENT_SECRET`/`AWS_ACCESS_KEY_ID`, etc.) live in the CI platform's encrypted secrets store, never in the repository.

## Key terms

| Term | Meaning |
|---|---|
| `terraform fmt -check` | Fails the pipeline if any file isn't formatted to Terraform's canonical style |
| CI-run plan | A `terraform plan` executed automatically on a pull request, visible to reviewers before merge |
| Gated apply | Running `terraform apply` only after a change has been reviewed and merged, not on every push |
| CI secrets store | Where provider credentials live for pipeline runs — never committed to the repository |
