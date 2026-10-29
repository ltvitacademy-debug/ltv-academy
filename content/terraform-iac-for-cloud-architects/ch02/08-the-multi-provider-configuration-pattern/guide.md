# Lesson 8 — The Multi-Provider Configuration Pattern

**Chapter 2 · Provisioning Real Infrastructure · Lesson 4 of 4**

## What you'll learn

- How one Terraform configuration declares both `azurerm` and `aws` in
  `required_providers` and manages both clouds from a single
  `terraform apply`
- What a provider **alias** is, and why you need one the moment a config
  touches two regions or subscriptions of the *same* cloud
- How to point a specific resource at a specific aliased provider with the
  `provider = ` argument
- A real reason to reach for each pattern: genuine multi-cloud, and
  multi-region resilience within one cloud

## Two providers, one state file

Lessons 5 through 7 built an Azure network and VM, then an AWS network and
instance — as if they were two separate configurations. They don't have to
be. Declare both providers in the same `required_providers` block, and both
sets of resources live in one file, one state file, one `terraform apply`:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.9.0"
}

provider "azurerm" {
  features {}
}

provider "aws" {
  region = "us-east-1"
}
```

Nothing here is new syntax — it's literally Lesson 5's `azurerm` block and
Lesson 6's `aws` block, declared together. Terraform doesn't care that one
provider talks to Azure Resource Manager and the other to AWS's APIs; it
builds one dependency graph across every resource in the file, regardless of
which provider each resource belongs to, and plans/applies them together.

## A real reason to do this

This pattern earns its complexity when an organization genuinely needs both
clouds managed from the same codebase and the same state — for example,
during a cloud migration where workloads are moving from AWS to Azure in
stages, or a deliberate split where compute runs on one cloud and a
specific managed service (object storage, a CDN, a DNS zone) is
intentionally kept on the other. Rather than maintaining two disconnected
Terraform projects with two separate `terraform apply` runs that have to be
coordinated by hand, one configuration plans both sides together and shows
you the full blast radius of a change in a single `plan` output.

## Provider aliases: more than one configuration of the same provider

A single `provider "aws" {}` block configures one region. The moment a
design needs two regions of the *same* cloud — a primary region and a
disaster-recovery region, for instance — one block isn't enough, because
`region` can only hold one value per provider block. The fix is a provider
**alias**:

```hcl
provider "aws" {
  alias  = "east"
  region = "us-east-1"
}

provider "aws" {
  alias  = "west"
  region = "us-west-2"
}
```

Each aliased block is a fully independent `aws` provider configuration —
same provider type, same credentials, different region. A resource that
doesn't specify a provider uses the default (unaliased) block; a resource
that needs a specific aliased one says so explicitly with `provider = `:

```hcl
resource "aws_instance" "primary" {
  provider      = aws.east
  ami           = "ami-0c7217cdde317cfec"
  instance_type = "t3.micro"
}

resource "aws_instance" "dr" {
  provider      = aws.west
  ami           = "ami-0a0e5d9c7acc336f1"
  instance_type = "t3.micro"
}
```

## A real use case for aliases: disaster recovery without juggling credentials

This is exactly the pattern a disaster-recovery design needs: a primary
instance in `us-east-1` and a cold or warm standby in `us-west-2`, using the
same AWS account and the same credentials, planned and applied together from
one configuration and one state file. Without aliases, managing a second
region would mean a second, entirely separate Terraform project — with
aliases, it's two `provider` blocks and a `provider = ` argument on the
resources that belong to each region.

## Key terms

| Term | Meaning |
|---|---|
| Multi-provider configuration | A single `.tf` file/state declaring `required_providers` for more than one cloud |
| Provider alias | A second (or third) named configuration of the same provider, declared with `alias = ` |
| `provider = ` | The resource-level argument that routes a resource to a specific aliased provider instead of the default |
| Default provider | The unaliased `provider` block a resource uses automatically when it doesn't set `provider = ` |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: why does a
design that needs resources in `us-east-1` and `us-west-2` require a provider
alias, when a design using only Azure and only AWS together — as this
lesson's first example did — doesn't need one at all? One state file now
holds every resource from both clouds — Chapter 3's next lesson, "Why Local
State Doesn't Scale to a Team," is about exactly what goes wrong when that
single state file is sitting on one person's laptop.
