# Lesson 20 — IaC in CI/CD

**Chapter 4 · IaC in Practice · Lesson 20 of 22**

## What you'll learn

- Running `terraform plan` automatically on every pull request, via GitHub Actions
- Requiring a human approval before `terraform apply` ever runs on merge
- Storing cloud credentials as CI secrets, never in a `.tf` file
- How this reuses Git/GitHub/CI-CD Lessons 18–20 and 23, applied to infrastructure instead of application code

## Plan on every pull request

Git/GitHub/CI-CD Lesson 18 introduced GitHub Actions; Lesson 19 had a workflow run tests automatically on every commit. The same pattern applies to infrastructure: a workflow that runs `terraform plan` on every pull request, so the plan output — the actual computed diff — sits right there in the PR for review, not buried on someone's laptop.

```
# .github/workflows/terraform-plan.yml
on:
  pull_request:
    branches: [main]
jobs:
  plan:
    steps:
      - run: terraform plan -no-color
```

## A human approval gate before apply

Merging to `main` should trigger `terraform apply` — but not without a person saying so. GitHub's `environment` setting can require a reviewer's approval before a job proceeds, the same discipline Git/GitHub/CI-CD Lesson 20's real, start-to-finish workflow modeled for deploying application code.

```
# .github/workflows/terraform-apply.yml
on:
  push:
    branches: [main]
jobs:
  apply:
    environment: production   # requires human approval
    steps:
      - run: terraform apply -auto-approve
```

Without that gate, merging a PR would provision or destroy real Azure infrastructure with nobody in the loop at the moment it actually happens — even if the PR itself was reviewed.

## Credentials as CI secrets, never in code

Both workflows need Azure credentials to authenticate the `azurerm` provider. Git/GitHub/CI-CD Lesson 23 covered exactly this: environment variables and secrets in CI/CD. Those credentials — a service principal's client ID, secret, tenant ID, subscription ID — live as GitHub Actions secrets, injected as environment variables at run time, and never appear in a `.tf` file or a commit.

## Key terms

| Term | Meaning |
|---|---|
| Plan on PR | Running `terraform plan` automatically for every pull request, before merge |
| Approval gate | A required human sign-off before a CI job (like `terraform apply`) proceeds |
| CI secret | A credential stored by the CI platform and injected at run time, never committed to code |

## Check yourself

You're ready for Lesson 21 — the start of this course's capstone, and Chapter 5 — when you can explain: why does automatically running `terraform plan` on every pull request matter even if a human still has to approve the apply?
