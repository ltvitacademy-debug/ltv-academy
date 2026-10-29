# Lesson 6 — Provisioning an AWS VPC with Terraform

**Chapter 2 · Provisioning Real Infrastructure · Lesson 2 of 4**

## What you'll learn

- Real `aws_vpc` and `aws_subnet` resource blocks, written the same way
  Lesson 5 wrote their Azure equivalents
- Why AWS resources reference each other by a generated `id` attribute
  (`aws_vpc.example.id`), where `azurerm_subnet` referenced its VNet by a
  plain name string
- How to pin a subnet to an Availability Zone in HCL — the same
  AZ-per-subnet rule the AWS Networking course already covered with the CLI
- How `tags` works as a generic map argument shared across almost every AWS
  resource type, instead of a dedicated top-level `name` argument

## Declaring the `aws` provider

Lesson 1 declared `azurerm` in a `required_providers` block; the `aws`
provider is declared the same way, just with a different provider-level
configuration block underneath:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.9.0"
}

provider "aws" {
  region = "us-east-1"
}
```

Where `provider "azurerm" {}` needed an empty `features {}` block, `provider
"aws" {}` needs a `region` — AWS has no single global endpoint the way Azure
Resource Manager does; every API call the `aws` provider makes is scoped to
one region, so the provider block has to say which one.

## `aws_vpc`: the real resource behind the VPC you already built with the CLI

The AWS Networking course built a VPC with `aws ec2 create-vpc`. Here's the
same VPC as a Terraform resource:

```hcl
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "vpc-prod"
  }
}
```

`cidr_block` is the required argument — the same `10.0.0.0/16` block Lesson 5
gave its VNet, since both represent the identical underlying idea. There's no
separate `name` argument on `aws_vpc` at all; instead, AWS's convention is a
`Name` key inside the `tags` map, which is what the AWS console actually
displays as the resource's name.

## `aws_subnet`: referencing the VPC by `id`, not by name

```hcl
resource "aws_subnet" "web" {
  vpc_id            = aws_vpc.example.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "snet-web"
  }
}

resource "aws_subnet" "app" {
  vpc_id            = aws_vpc.example.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-east-1b"

  tags = {
    Name = "snet-app"
  }
}
```

Compare `vpc_id = aws_vpc.example.id` to Lesson 5's
`virtual_network_name = azurerm_virtual_network.example.name`. `azurerm_subnet`
referenced its VNet by a plain name string you chose yourself.
`aws_subnet` references its VPC by `id` — an identifier AWS generates at
create time (something like `vpc-0abc123456789def0`), which Terraform reads
back out of state and substitutes in automatically. Same implicit dependency
mechanics as Lesson 5; a different kind of value flowing through the
reference. `availability_zone` pins each subnet to one AZ, exactly as the AWS
Networking course's CLI examples did — `us-east-1a` for the web subnet,
`us-east-1b` for the app subnet, so the two aren't both exposed to the same
AZ failing.

## `tags`: a map, not a dedicated block

Azure resources generally get a human-readable identity through their
top-level `name` argument. Most AWS resources don't have one of those at
all — identity comes from the generated `id`, and the human-readable label
you see in the console is just a convention: a `Name` entry inside a generic
`tags` map that almost every AWS resource type accepts. `tags` isn't
special-cased per resource the way `name` is in azurerm; it's the same kind
of key-value map argument everywhere it appears, which is why you'll see it
on VPCs, subnets, and the EC2 instances Lesson 7 provisions next.

## Key terms

| Term | Meaning |
|---|---|
| `aws_vpc` | The resource type for an AWS VPC; its one required argument is `cidr_block` |
| `aws_subnet` | A subnet resource pinned to one Availability Zone via `availability_zone` |
| `.id` attribute reference | AWS resources are referenced by a generated identifier, not a chosen name string |
| `tags` | A generic key-value map argument shared across most AWS resource types; `Name` is the console's display-name convention |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why does
`aws_subnet.web` reference `aws_vpc.example.id` instead of something like
`aws_vpc.example.name`, and what does that tell you about how AWS resources
are identified compared to Azure resources?
