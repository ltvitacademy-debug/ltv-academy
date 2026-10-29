# Lesson 12 — Importing Existing Infrastructure into Terraform State

**Chapter 3 · State Management · Lesson 4 of 4**

## What you'll learn

- Why you'd ever need `terraform import` — infrastructure that already
  exists, created by hand or by another tool, that you now want under
  Terraform's management
- Exactly what `terraform import` does and doesn't do: it only writes
  to state, it never touches real infrastructure
- The real workflow — write the matching resource block yourself,
  import, then reconcile with `plan`
- The classic gotcha: import without a matching config block leaves
  the next `plan` wanting to destroy the very thing you just imported

## Why import exists

Not every real resource starts life under Terraform. Someone clicks
"Create" in the Azure portal to spin up a resource group quickly,
or an existing S3 bucket was provisioned years ago by a different
tool, or by a different team, long before this project adopted
Terraform at all. That resource is real, it's running, and recreating
it under Terraform management would mean destroying and rebuilding
something that's already working — not an option for, say, a
production storage account with real data in it. `terraform import`
exists for exactly this: bringing a resource that already exists into
Terraform's state, without touching it, so Terraform can start
managing it going forward.

## What `terraform import` actually does

This is the one fact to hold onto for this entire lesson: `import`
only ever writes to **state**. It reads the real resource from the
cloud provider's API and records it in `terraform.tfstate` — it never
creates, modifies, or destroys anything in the real world. The syntax
names a resource address from your config and the real-world ID of the
thing to import:

```
terraform import azurerm_resource_group.rg /subscriptions/0f2b6a1e-.../resourceGroups/rg-app-prod
```

```
terraform import aws_s3_bucket.data acme-data-bucket
```

The first argument, `azurerm_resource_group.rg` or `aws_s3_bucket.data`,
is the resource address — exactly how you'd reference that resource
in `.tf` config. The second is whatever ID that provider needs to find
the real object: an Azure resource ID, or for S3, simply the bucket
name. Run either command, and Terraform writes a new entry to state
mapping that address to that real resource. Nothing else happens.

## The real workflow: config first, then import

That last sentence is the trap. `terraform import` has no idea what
your `.tf` files say, and it doesn't write one for you (by default —
more on that below). The real workflow writes the resource block
*first*:

```hcl
resource "azurerm_resource_group" "rg" {
  name     = "rg-app-prod"
  location = "eastus"
}
```

Then you run the import command, pointing that address at the real
resource ID. Then — this is the step people skip — you run
`terraform plan` and actually read the diff. If your resource block's
arguments don't exactly match the real resource's current values,
plan shows a change it wants to make to bring them in line, which is
your signal to edit the config to match reality, not the other way
around, until `plan` reports no changes at all. Only then is the
resource genuinely, safely under Terraform's management.

A real convenience worth knowing: Terraform 1.5+ can generate that
starting config for you with
`terraform plan -generate-config-out=generated.tf`, after an `import`
block (an alternative, declarative form of import added in the same
release) is present in your config — it writes out a best-guess
resource block from the real object's current attributes, which you
then review and clean up rather than typing from scratch.

## The gotcha: import without a matching resource block

Here's exactly what happens if you run `terraform import` and stop
there, without ever adding a matching resource block to your config.
The resource now exists in state, but your configuration never
declared it. The next `terraform plan` compares config against state,
sees a resource recorded in state with nothing in config asking for
it, and concludes you want it gone:

```
  # azurerm_resource_group.rg will be destroyed
  # (because azurerm_resource_group.rg is not in configuration)
  - resource "azurerm_resource_group" "rg" {
      - name     = "rg-app-prod" -> null
      - location = "eastus" -> null
    }

Plan: 0 to add, 0 to change, 1 to destroy.
```

That's not a bug — it's Terraform doing exactly what it always does:
reconciling config against state, and finding the resource absent from
one of them. The fix is simply the workflow above, in the right
order: the resource block has to exist in config, matching reality,
before you consider the import finished.

## Key terms

| Term | Meaning |
|---|---|
| `terraform import` | A command that writes an existing real resource into Terraform state, without creating, modifying, or destroying anything |
| Resource address | The `type.name` reference (e.g. `azurerm_resource_group.rg`) used both in config and as the first argument to `import` |
| `-generate-config-out` | A Terraform 1.5+ flag that writes a best-guess resource block from an imported object's real attributes |
| Orphaned resource | A resource present in state with no matching block in config — `plan` marks it for destruction |

## Check yourself

You're ready to move on to Chapter 4 when you can explain, without
looking: if you run `terraform import` successfully but never add a
matching resource block to your `.tf` config, what does the next
`terraform plan` show, and why?
