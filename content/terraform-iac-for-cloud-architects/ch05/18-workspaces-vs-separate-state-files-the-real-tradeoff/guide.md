# Lesson 18 — Workspaces vs. Separate State Files: The Real Tradeoff

**Chapter 5 · Terraform Workspaces & Environments · Lesson 18 of 32**

## What you'll learn

- The honest difference between workspaces and separate directories/
  state files per environment — not "which is correct," but which
  problem each one actually solves
- Why workspaces trade isolation for convenience, and why that trade
  is sometimes exactly backwards for what an environment needs
- What a real directory-per-environment layout looks like, backend
  block and all
- A rule of thumb for choosing between them on a real project

## What workspaces actually buy you — and what they don't

Lesson 17 showed workspaces at their best: one configuration, several
named state files, `terraform.workspace` driving naming and sizing.
That's low overhead — one directory, one set of `.tf` files to
maintain, one `terraform apply` cycle per environment. But every
workspace in that setup shares the same backend, the same `provider`
block, and almost always the same credentials. There is no built-in
way to say "only this service principal can touch the `prod`
workspace" — if a credential can reach the backend, it can reach
every workspace in it. For environments that are genuinely identical
except for scale, that's an acceptable trade. For an environment that
needs a different team, a different approval gate, or a different set
of permissions, it isn't.

## Separate state files: more duplication, real isolation

The alternative is a directory per environment, each with its own
backend configuration, calling the same shared modules:

```
envs/
  dev/
    backend.tf   # key = "dev/network.tfstate"
    main.tf      # module "network" { source = "../../modules/network" ... }
    dev.tfvars
  prod/
    backend.tf   # key = "prod/network.tfstate", different storage account
    main.tf      # module "network" { source = "../../modules/network" ... }
    prod.tfvars
```

```hcl
# envs/prod/backend.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-tfstate-prod"
    storage_account_name = "sttfstateprod"
    container_name        = "tfstate"
    key                    = "prod/network.tfstate"
  }
}
```

Now `prod`'s state lives in its own storage account, which can sit in
its own resource group with its own access policy — a completely
different set of Azure RBAC role assignments than `dev`'s storage
account. `prod`'s pipeline can require a different service principal
and a manual approval step; `dev`'s doesn't have to. The cost is real:
every environment directory needs its own `backend.tf`, and you're
responsible for keeping each one calling the shared modules
correctly — nothing enforces that the way one shared config file does.

## Choosing between them on a real project

Reach for **workspaces** when environments are structurally identical,
the same people and credentials are trusted to touch all of them, and
the overhead of several directories isn't worth it — short-lived
feature environments or a small team's dev/staging split are the
classic case. Reach for **separate directories and state files** when
you need real isolation: different teams own different environments,
`prod` needs a stricter approval gate than `dev`, compliance requires
separating who can even *read* `prod` state, or the environments have
started to genuinely diverge in configuration, not just scale. Many
real projects land on both at once — directories for the hard boundary
between, say, non-production and production, and a module underneath
(the pattern from Chapter 4) that's reused across both.

## Key terms

| Term | Meaning |
|---|---|
| Workspace isolation gap | All workspaces in one backend share the same provider credentials and permissions — nothing enforces separation between them |
| `backend.tf` per environment | A separate backend block (often a different storage account/container) giving each environment directory its own state location |
| Blast radius | How much real infrastructure a mistake can reach — separate state files shrink it; shared workspaces don't |
| Shared module, separate directories | The common real-world pattern: one reusable module (Chapter 4), called from isolated per-environment directories |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: if
a company's compliance policy requires that only a production-support
team can even *view* production infrastructure's state, why does that
requirement rule out a workspace-only approach?
