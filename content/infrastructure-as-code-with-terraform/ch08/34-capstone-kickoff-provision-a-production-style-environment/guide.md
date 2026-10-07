# Capstone Kickoff: Provision a Production-Style Environment

Everything in this course has been building toward one project. Northbridge Retail's platform team needs a small but genuinely production-style environment provisioned across both of their clouds — and you're going to build it, using modules, remote state, variables, and everything else from Chapters 1 through 7. This lesson lays out the brief.

## What you'll learn

- The capstone's scope: what Northbridge actually needs provisioned, on both Azure and AWS
- The folder structure you'll build it in
- The acceptance criteria your finished configuration needs to meet
- How the next two lessons will walk through building and wrapping it up

## The brief

Northbridge's checkout service needs a home on both clouds, following the dual-cloud pattern from Chapters 5 and 6: an Azure side (resource group, virtual network, and an App Service running the storefront API) and an AWS side (a VPC, an S3 bucket for product images, and a Lambda function for order-confirmation emails). Both sides are tied together by shared conventions — consistent naming, consistent tagging, and one remote backend per environment.

## The folder structure

```
capstone/
├── modules/
│   ├── azure-network/       # vnet, subnet, nsg
│   └── aws-network/         # vpc, subnet, security group
├── environments/
│   └── dev/
│       ├── main.tf          # calls both modules + top-level resources
│       ├── variables.tf
│       ├── outputs.tf
│       ├── backend.tf       # remote state for this environment
│       └── terraform.tfvars
└── .gitignore
```

This mirrors the directory-per-environment pattern from Chapter 7 — a real team would add `environments/staging/` and `environments/prod/` the same way, each with its own backend and `.tfvars`, calling the same shared modules.

## Acceptance criteria

Your finished `environments/dev` configuration needs to meet all of the following before it counts as done:

```
✓ terraform init runs clean, with both azurerm and aws providers configured
✓ terraform validate reports no errors
✓ terraform plan shows a clean diff with no unexpected changes
✓ every resource carries at least an "environment" and "project" tag
✓ no secret or credential appears anywhere in a committed file
✓ state is configured for a remote backend, not left local
```

## What's next

Lesson 35 walks through writing the actual root configuration — the modules, the resources, and a real `terraform plan` output showing exactly what Northbridge's environment will contain. Lesson 36 wraps up the project: reviewing the apply, tearing it down safely, and how to talk about this build in a portfolio or an interview.

## Key terms

| Term | Meaning |
|---|---|
| Root module | The top-level `environments/dev/main.tf` that calls other modules and declares top-level resources |
| Acceptance criteria | The specific, checkable conditions a finished configuration must meet |
| Shared modules | Reusable `modules/azure-network` and `modules/aws-network`, called identically from every environment |
