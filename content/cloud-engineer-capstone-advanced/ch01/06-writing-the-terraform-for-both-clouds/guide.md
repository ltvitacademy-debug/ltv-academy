# Lesson 6 — Writing the Terraform for Both Clouds

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 6 of 26**

## What you'll learn

- How to express Lesson 3's target architecture — AKS primary, AWS backup/DR — as one Terraform-
  managed system instead of two disconnected sets of manifests
- How the multi-provider configuration pattern lets a single `terraform apply` plan changes across
  Azure and AWS together
- Why remote state and modules matter even more once two providers are involved
- What stays manually clicked-through versus what gets codified, and why that line is drawn
  deliberately, not left to whoever's in a hurry that week

## One root module, two providers

Theo's Terraform root module declares both providers up front, exactly the pattern from the
multi-provider lessons:

```hcl
terraform {
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.90" }
    aws     = { source = "hashicorp/aws",     version = "~> 5.50" }
  }
  backend "azurerm" {
    resource_group_name  = "rg-driftwood-tfstate"
    storage_account_name = "driftwoodtfstate"
    container_name       = "tfstate"
    key                  = "platform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

provider "aws" {
  region = "us-east-1"
}
```

The remote state backend lives on Azure Storage, with state locking so two engineers can't
`apply` conflicting changes to either cloud at once — the same problem the remote-state lessons
cover, just now with twice the blast radius if it's skipped.

## The AKS module

```hcl
module "aks" {
  source              = "./modules/aks"
  resource_group_name = azurerm_resource_group.prod.name
  location            = "eastus2"
  cluster_name         = "driftwood-prod-aks"
  availability_zones   = ["1", "2", "3"]
  system_pool_size     = { min = 3, max = 15 }
  app_pool_size        = { min = 3, max = 15 }
}
```

Inside `modules/aks`, the real resource is `azurerm_kubernetes_cluster` plus an
`azurerm_kubernetes_cluster_node_pool` for `apppool` — the same cluster shape Lesson 4 built by
hand with the Azure CLI, now expressed as code that can be planned, reviewed, and reapplied
consistently instead of re-run from memory.

## The AWS backup module

```hcl
module "aws_backup" {
  source               = "./modules/aws-backup"
  primary_bucket_name  = "driftwood-catalog-images"
  replica_region       = "us-west-2"
  db_instance_class    = "db.r6g.large"
  standby_read_replica = true
}
```

This module provisions the cross-region-replicated S3 bucket and the standby RDS read replica from
Lesson 3's architecture diagram — the backup/DR side, which stays idle under normal operation but
now exists as code instead of a one-time manual setup nobody can confidently reproduce.

## Why this is one system, not two

The real point of writing both clouds in the same Terraform project, sharing the same remote
state and the same `terraform plan` / `apply` workflow, is that the architecture diagram from
Lesson 3 stops being just a picture and becomes something enforced: a `terraform plan` shows
drift on *either* cloud, and nobody can quietly change the AWS backup's database instance size
without it showing up in the same review as an AKS change. Two separate Terraform projects, one
per cloud, would let the two sides of the architecture silently drift apart from each other —
exactly the kind of quiet disagreement earlier capstones have warned about in a different context.

## What's deliberately NOT in Terraform yet

Not everything is codified in this phase, and that's a scoping decision, not an oversight:

- **Kubernetes-level objects** — the Deployments, Services, and HPAs from Lessons 4 and 5 — stay
  as plain `kubectl`-applied YAML for now, not Terraform's `kubernetes` provider. Managing app-
  level objects and cloud infrastructure in the same Terraform state adds complexity this phase's
  deadline doesn't have room for.
- **The FinOps dashboard** built in Lesson 7 is deployed directly in Grafana/Azure Monitor, not
  through Terraform — dashboards change often enough during this build that code-managing them
  yet would slow down iteration without a clear payoff this close to the sale.

## Key terms

| Term | Meaning |
|---|---|
| Multi-provider configuration | A single Terraform project declaring more than one cloud provider, so one plan/apply cycle covers all of them |
| Remote state backend | Shared, locked Terraform state stored outside any one engineer's machine — here, on Azure Storage |
| Module | A reusable, parameterized Terraform unit — one here for the AKS cluster, one for the AWS backup infrastructure |
| Drift | A live resource's actual configuration diverging from what Terraform's state says it should be |

## Lab

1. Write out the `terraform` block declaring both the `azurerm` and `aws` providers plus the
   remote state backend, and explain in one sentence why state locking matters more with two
   providers involved than with one.
2. List the two things this lesson deliberately keeps out of Terraform (Kubernetes objects, the
   FinOps dashboard) and write one sentence defending each exclusion given the sale deadline.

## Check yourself

You're ready for Lesson 7 when you can explain why both clouds live in one Terraform project
instead of two, what the AKS and AWS backup modules each provision, and which two things this
phase deliberately leaves outside Terraform's management.
