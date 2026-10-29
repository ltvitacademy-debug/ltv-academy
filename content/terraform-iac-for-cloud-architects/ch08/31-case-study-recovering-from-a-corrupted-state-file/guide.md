# Lesson 31 — Case Study: Recovering from a Corrupted State File

**Chapter 8 · Capstone: A Real Multi-Environment Terraform Project · Lesson 31 of 32**

## What you'll learn

- How a routine manual fix in the Azure Portal can leave Terraform's state pointing at resources
  that no longer exist, and why the resulting `terraform plan` output is often confusing rather
  than obviously wrong
- Why backing up the state file is the very first step of any recovery, before running a single
  state-modifying command
- How to read `terraform state list` to see exactly what Terraform believes it manages
- When to reach for `terraform state rm` versus `terraform import`, and why those are two different
  tools for two different situations

## The incident

Caldwell Ridge's prod network (Lesson 30) has a network security group protecting its first
subnet:

```hcl
# envs/prod/main.tf (additions)

resource "azurerm_network_security_group" "prod_web" {
  name                = "nsg-cra-prod-web"
  location            = "eastus2"
  resource_group_name = module.network.resource_group_name
}

resource "azurerm_subnet_network_security_group_association" "prod_web" {
  subnet_id                 = module.network.subnet_ids[0]
  network_security_group_id = azurerm_network_security_group.prod_web.id
}
```

While investigating a connectivity ticket on a Friday afternoon, a teammate opens the Azure Portal,
finds `nsg-cra-prod-web`, and deletes it directly — convinced it's an orphaned leftover, and
forgetting it's Terraform-managed. On Monday, the next `terraform plan` on `envs/prod` fails:

```
Error: updating Subnet "snet-cra-prod-0" (Virtual Network "vnet-cra-prod" / Resource Group
"rg-cra-prod-network"): network.SubnetsClient#CreateOrUpdate: ... NetworkSecurityGroupNotFound:
Resource ... "nsg-cra-prod-web" ... could not be found.
```

That error is thrown against the *subnet association*, not plainly against the NSG — which is
exactly why these incidents feel confusing. Nothing in the message says "someone deleted your
NSG." It takes a careful read to connect "NetworkSecurityGroupNotFound" back to a resource that
Terraform's state still insists exists.

## First move: back up the state, before touching anything

Before running a single state-modifying command, pull a local copy of the current state:

```
terraform state pull > prod-backup-2026-10-28.tfstate
```

The remote Azure Storage backend from Chapter 3 already keeps blob versions, but that's a safety
net for the backend, not a substitute for having a known-good local copy in hand *right now*,
before any `state rm` or `import` command. State surgery is unforgiving — a wrong resource address
can silently drop something Terraform still needs to track. Always have a way back.

## Reading what Terraform believes exists

```
terraform state list | grep network_security_group
```

```
azurerm_network_security_group.prod_web
azurerm_subnet_network_security_group_association.prod_web
```

Both are still tracked, pointing at an NSG that no longer exists in Azure and an association that
depends on it. This is the moment to decide which of two real situations you're in.

## Path A: nothing replaced it — `terraform state rm`

If the NSG is simply gone and nothing has filled the gap, the state entries are now just stale —
Terraform is tracking objects that don't exist. Remove them from state (this does **not** touch
anything in Azure; it only edits Terraform's bookkeeping):

```
terraform state rm azurerm_subnet_network_security_group_association.prod_web
terraform state rm azurerm_network_security_group.prod_web
```

`terraform plan` now shows a clean pair of creates instead of a confusing error, and
`terraform apply` rebuilds both exactly as the code already defines them.

## Path B: someone already recreated it by hand — `terraform import`

Suppose instead the teammate, trying to unblock the same ticket, had manually recreated an NSG
named `nsg-cra-prod-web` with roughly the same rules. Now Azure has a real object Terraform doesn't
know about. Running `apply` without fixing state first would try to create a duplicate and fail
with an "already exists" error — or worse, silently diverge. The right move is to adopt the
existing object into state instead of recreating it:

```
terraform import azurerm_network_security_group.prod_web \
  /subscriptions/<sub-id>/resourceGroups/rg-cra-prod-network/providers/Microsoft.Network/networkSecurityGroups/nsg-cra-prod-web
```

`terraform plan` right after an import is the real verification step — it shows exactly where the
hand-made rules drifted from what the code expects, so that drift gets reconciled deliberately
instead of guessed at.

## Key terms

| Term | Meaning |
|---|---|
| State drift | When Terraform's state no longer matches the real infrastructure, usually from a manual change outside Terraform |
| `terraform state pull` | Downloads the current remote state to a local file — the backup step before any state surgery |
| `terraform state rm` | Removes a resource from state without touching the real infrastructure, for entries that are now stale |
| `terraform import` | Brings an existing, unmanaged real resource under Terraform's management without recreating it |

## Check yourself

You're ready for Lesson 32 when you can explain, without looking: why does `terraform state rm`
never delete anything in Azure, and what would have gone wrong if Path B's NSG had been imported
without running `terraform plan` immediately afterward?
