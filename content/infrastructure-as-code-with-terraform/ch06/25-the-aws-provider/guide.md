# The AWS Provider

Chapter 5 provisioned Northbridge Retail's Azure footprint and ended with its containerized checkout service running on AKS. Northbridge isn't an all-Azure shop, though — its order-processing fleet and product-image storage live on AWS, a deliberate multi-cloud split rather than an accident of history. This chapter provisions that AWS side, and this lesson starts where every provider story starts: telling Terraform which cloud account to talk to, and how to authenticate without ever writing a secret into a `.tf` file.

## What you'll learn

- How to declare the `aws` provider and pin it to a version
- The two safe ways to authenticate: a named AWS CLI profile, or environment variables
- Why access keys never belong in a `.tf` file, committed or not
- What `terraform init` does the first time you run it against a new provider

## Declaring the provider

Just like `azurerm` in Chapter 5, the `aws` provider is declared in a `required_providers` block and then configured separately:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
```

That's the minimum. `region` tells every `aws_*` resource in the configuration which AWS region to create itself in, unless a resource overrides it. Northbridge standardizes on `us-east-1` for this course.

## Authenticating: profile or environment variables, never hardcoded

The provider block above says *where*, not *who*. AWS needs credentials, and Terraform never wants to see them written in a file:

```hcl
provider "aws" {
  region  = "us-east-1"
  profile = "northbridge-prod"
}
```

A **profile** points at credentials already stored by the AWS CLI in `~/.aws/credentials` — Northbridge's platform engineers run `aws configure --profile northbridge-prod` once, and every `terraform` command afterward reads that profile. The alternative, common in CI pipelines that have no persistent home directory, is environment variables Terraform reads automatically:

```bash
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."
export AWS_DEFAULT_REGION="us-east-1"
```

With those exported, the `provider "aws"` block can omit `profile` entirely — Terraform finds the credentials in the environment. Either way, the keys never appear inside a `.tf` file. A hardcoded access key in version control is a permanent leak the moment that commit is pushed, and rotating it means hunting down every place it was copied.

## Initializing the provider

`terraform init` does the same job here it did for `azurerm` in Chapter 5 — it downloads the `aws` provider plugin matching the version constraint and records it in `.terraform.lock.hcl`:

```
$ terraform init

Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.0"...
- Installing hashicorp/aws v5.60.0...
- Installed hashicorp/aws v5.60.0 (signed by HashiCorp)

Terraform has been successfully initialized!
```

Only after this succeeds can Terraform plan or apply any `aws_*` resource — the next three lessons provision Northbridge's actual AWS infrastructure.

## Key terms

| Term | Meaning |
|---|---|
| Provider | A plugin Terraform uses to talk to a specific API — `aws`, here |
| Profile | A named set of credentials stored locally by the AWS CLI, referenced by name instead of value |
| Environment variable credentials | `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`, read automatically by the provider, common in CI |
| `terraform init` | Downloads and locks the provider plugin version before any plan or apply can run |
