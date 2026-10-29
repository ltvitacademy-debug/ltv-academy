# Lesson 9 — Why Local State Doesn't Scale to a Team

**Chapter 3 · State Management · Lesson 1 of 4**

## What you'll learn

- What `terraform.tfstate` actually contains and why Terraform can't
  work without it
- Why a state file sitting on one person's laptop breaks down the
  moment a second person touches the same infrastructure
- How two people running `apply` independently against the same
  config can corrupt state or make conflicting changes
- Why committing `terraform.tfstate` to git is a real security
  problem, not just a bad habit

## What's actually in the state file

Every time you run `terraform apply`, Terraform writes the real-world
result to `terraform.tfstate` — a JSON file mapping each resource
block in your config to the actual object that exists in the cloud:
its resource ID, every attribute Terraform knows about it, and enough
metadata to diff "what's declared" against "what's really there" the
next time you run `plan`. Without that file, Terraform has no memory.
It would have to guess whether `azurerm_resource_group.rg` already
exists or needs creating, and guessing wrong means either a failed
apply or, worse, a duplicate resource.

By default — with no `backend` block anywhere in your configuration —
Terraform writes that file to the current working directory. That's
the **local backend**, and it's exactly what you've been using through
Chapters 1 and 2.

```hcl
# No backend block anywhere in this config = Terraform defaults
# to the local backend. terraform.tfstate lands right here, in
# whatever folder you ran `terraform apply` from.

resource "azurerm_resource_group" "rg" {
  name     = "rg-app-prod"
  location = "eastus"
}
```

## The one-laptop problem

Local state works fine for a solo learning project because there's
only ever one copy of the truth, and it's always wherever you are. The
moment a second engineer needs to run `terraform plan` against the
same infrastructure, that stops being true. They don't have your
`terraform.tfstate` — it's not in git (and shouldn't be, more on that
below), so their checkout of the config has no state file at all.
Terraform sees zero resources on record and a config that declares
several, and the only honest plan it can produce is "create
everything" — which, against infrastructure that already exists, is
exactly wrong. There is no **shared source of truth**, so there's no
way for a team to collaborate on the same Terraform-managed
infrastructure at all, let alone safely.

## Two people applying at the same time

Even if you solved that by, say, emailing the state file around,
you'd hit a worse problem: local state has no coordination mechanism.
If two teammates both have a copy and both run `terraform apply`
within the same few minutes, there's nothing stopping either of them.
Each reads its own on-disk state, calculates its own plan, and writes
its own result back — whichever one finishes and saves last silently
overwrites the other's changes, or two near-simultaneous writes to the
same file can leave it corrupted or holding whatever Terraform build.
Terraform has a whole mechanism for preventing exactly this —
**locking**, covered in Lesson 11 — but it only works when everyone is
reading and writing the same remote file. Two independent local copies
can't be locked against each other; they're not even the same file.

## Why `terraform.tfstate` never belongs in git

State files routinely contain sensitive values in plain text:
database admin passwords set via a resource argument, storage account
access keys, connection strings, anything Terraform needed to know to
create or manage a resource gets recorded in the state, unencrypted,
whether or not it was marked `sensitive` in your config. Committing
`terraform.tfstate` to a git repository — even a private one — puts
every one of those secrets into your commit history forever, readable
by anyone with repo access and nearly impossible to fully scrub once
pushed. Every real Terraform project's `.gitignore` excludes it:

```
# .gitignore
*.tfstate
*.tfstate.*
.terraform/
```

Fixing both problems — no shared source of truth, and secrets sitting
in a file nobody should commit — is exactly what a **remote backend**
does, which is where Lesson 10 picks up.

## Key terms

| Term | Meaning |
|---|---|
| `terraform.tfstate` | The JSON file mapping each config resource to its real-world ID and attributes |
| Local backend | Terraform's default when no `backend` block is configured — state lives on disk, wherever you ran the command |
| Source of truth | The one authoritative record of what infrastructure actually exists; local state can't be shared, so it can't serve as one for a team |
| State corruption | Damage to the state file from unsynchronized concurrent writes, e.g. two teammates applying at once |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
does a teammate who checks out your Terraform config, with no copy of
your `terraform.tfstate`, get a plan that wants to create everything
from scratch — and why is committing that state file to git not a
safe fix for that?
