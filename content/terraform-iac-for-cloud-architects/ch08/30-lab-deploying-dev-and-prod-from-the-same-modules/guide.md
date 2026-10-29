# Lesson 30 — Lab: Deploying Dev and Prod from the Same Modules

**Chapter 8 · Capstone: A Real Multi-Environment Terraform Project · Lesson 30 of 32**

## What you'll learn

- How to deploy two differently sized environments from the exact same `modules/network` source —
  no copy-pasted resource blocks, no forked module
- How a directory-per-environment layout (`envs/dev`, `envs/prod`) keeps dev and prod state
  completely isolated, each with its own backend key
- How `.tfvars` files, the pattern from Chapter 5, supply the values that actually differ between
  environments
- Why Caldwell Ridge chose separate state files per environment over Terraform workspaces, and what
  that tradeoff from Lesson 18 looks like on a real project

## The scenario, continued

Lesson 29 proved the `modules/network` module works by deploying one dev network by hand. Now
Caldwell Ridge needs the real thing: a small dev network for testing, and a materially larger prod
network for actual customer traffic, built from the identical module source. The module doesn't
change at all between the two. What changes is which values get fed into it — and Chapter 5
already settled *how* to feed in different values per environment: `.tfvars` files.

## A root config that takes variables instead of hard-coding them

```hcl
# envs/dev/main.tf

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.100"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rg-cra-tfstate"
    storage_account_name = "stcratfstate"
    container_name       = "tfstate"
    key                  = "network/dev.tfstate"
  }
}

provider "azurerm" { features {} }

variable "environment"        { type = string }
variable "vnet_address_space" { type = list(string) }
variable "subnet_count"       { type = number }

module "network" {
  source             = "../../modules/network"
  environment        = var.environment
  vnet_address_space = var.vnet_address_space
  subnet_count       = var.subnet_count
}
```

`envs/prod/main.tf` is byte-for-byte identical, except its `key` reads `"network/prod.tfstate"`.
That's the real directory-per-environment pattern: two small folders, each with its own literal
backend key, both calling the one shared module. Backend blocks can't reference variables or
functions — the `key` has to be typed in as a plain string in each folder's file, which is exactly
why it's the one line that differs.

## The values that actually differ: `.tfvars`

```hcl
# envs/dev/dev.tfvars
environment        = "dev"
vnet_address_space  = ["10.10.0.0/20"]
subnet_count        = 2

# envs/prod/prod.tfvars
environment        = "prod"
vnet_address_space  = ["10.20.0.0/16"]
subnet_count        = 6
```

Dev's `/20` parent block and prod's `/16` parent block both rely on the module's default
`subnet_newbits = 8` from Lesson 29 — and because `/20 + 8 = /28` while `/16 + 8 = /24`, that exact
same default automatically gives dev small, 14-address subnets and prod much larger, 254-address
subnets. Nobody had to override `subnet_newbits` by hand to get a "bigger" prod network; a bigger
parent address space with the same math produces bigger subnets on its own.

## Running it

```
cd envs/dev
terraform init
terraform plan  -var-file="dev.tfvars"
terraform apply -var-file="dev.tfvars"

cd ../prod
terraform init
terraform plan  -var-file="prod.tfvars"
terraform apply -var-file="prod.tfvars"
```

Each `terraform init` reads that folder's own backend block, so dev's state lands at
`network/dev.tfstate` and prod's lands at `network/prod.tfstate`, inside the same storage account —
two completely separate state files, never read or written by the same `terraform apply`.

## Why separate state files instead of a workspace

Lesson 18 already laid out the real tradeoff: a single configuration with
`terraform workspace new prod` keeps one set of files but one shared state backend and, by default,
identical access for anyone who can run `terraform apply` in that folder at all. Caldwell Ridge
rejected that for this project on purpose — prod needs a CI/CD approval gate (Chapter 7) and a
smaller set of people with write access to its state, and a directory-per-environment layout makes
that boundary physical: a mistake in `envs/dev` can never touch `envs/prod`'s state, because it's a
different backend key, in a different folder, that dev's own pipeline simply has no path to.

## Key terms

| Term | Meaning |
|---|---|
| Directory-per-environment | A separate root folder per environment (`envs/dev`, `envs/prod`), each with its own backend block, calling a shared module |
| `.tfvars` file | A file of variable values passed with `-var-file`, supplying what differs between environments |
| Backend key | The literal, non-interpolated path identifying one state file inside a shared backend — must differ per environment folder |
| Blast radius | The scope of damage a mistake can cause; separate state files per environment shrink it compared to a shared workspace backend |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: why can't a Terraform backend
block use a variable or a function to compute its `key`, and what did Caldwell Ridge do instead to
keep dev's and prod's state completely separate?
