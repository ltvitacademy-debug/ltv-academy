# Lesson 15 — Module Versioning and a Private Module Registry

**Chapter 4 · Modules & Reusability · Lesson 3 of 4**

## What you'll learn

- Why an unpinned module source is exactly as risky as the unpinned
  provider version Lesson 1 already warned against
- The real syntax for pinning a module to a specific version when it's
  sourced from a registry, versus pinning it to a specific git tag
  when it isn't
- What a **private module registry** actually is — Terraform
  Cloud/Enterprise's org-scoped registry for internal modules — and
  why it's consumed exactly like the public one
- How to decide, for a real module, which sourcing mechanism applies

## Why pinning a module's version matters

Lesson 14's `network` module lives in its own folder today, but once
it's useful enough for more than one project to call, it almost always
moves into its own Git repository or gets published to a registry — at
which point every caller needs a way to say "give me version 1.2, not
whatever the module's author pushes next." This is the identical
problem `required_providers`' `version = "~> 3.100"` solved back in
Lesson 1: without a pin, a change the module's author makes — renaming
a variable, changing a default, removing a resource — lands silently
in every project calling it, the next time someone runs `terraform
init -upgrade`. Pinning a module's version is the same discipline
applied one layer up: to a shared library of HCL instead of a shared
cloud-provider plugin.

## Pinning a registry-sourced module

When a module comes from the public Terraform Registry, or from a
private registry (covered next), the `module` block takes a `version`
argument directly, using the same constraint syntax as a provider:

```hcl
module "network" {
  source  = "app.terraform.io/ltv-academy/network/azurerm"
  version = "~> 1.2"
}
```

`source` here is a registry address — `<host>/<org>/<name>/<provider>`
— not a file path. `version = "~> 1.2"` constrains Terraform to the
`1.2.x` line of releases, so an unreviewed `2.0` with breaking changes
can't get pulled in automatically. `terraform init` resolves the exact
matching version and records it in `.terraform.lock.hcl`, the same
lock file Lesson 2 introduced for providers.

## Pinning a git-sourced module

A module doesn't have to go through a registry at all — it can be
sourced directly from a Git repository. This matters because the
`version` argument **only works for registry sources**; a git source
pins its version a different way, with a `?ref=` query parameter
appended to the URL itself:

```hcl
module "network" {
  source = "git::https://github.com/ltv-academy/terraform-modules.git//network?ref=v1.2.0"
}
```

`git::` tells Terraform the URL is a git repository rather than a
plain HTTP download. The double slash before `network` points at a
subdirectory inside that repo — useful when one repository holds
several modules side by side. `?ref=v1.2.0` is the pin: a specific git
tag, branch, or commit SHA. Change it to `v1.3.0` and run `terraform
init -upgrade` to move to that version deliberately, the same way
bumping `version = "~> 1.3"` would for a registry source.

## Terraform's private module registry

Terraform Cloud and Terraform Enterprise include a **private module
registry**: an org-scoped catalog, visible only to that organization,
where internal modules get published the same way HashiCorp publishes
public ones — by pushing a semantic-version git tag (`v1.2.0`) to the
module's repository. Once published, a private-registry module is
called exactly like the public-registry example above, just with the
org's own registry host in `source`. The real value isn't the
publishing step itself — it's that every team in the organization
consumes one reviewed, versioned `network` module from one place,
instead of each team keeping its own copy-pasted variant that quietly
drifts out of sync.

## Key terms

| Term | Meaning |
|---|---|
| Module version pin | Constraining which release of a shared module a caller gets, so unreviewed changes don't land silently |
| `version` argument | Pins a registry-sourced module; has no effect on a git-sourced module |
| `?ref=` | Pins a git-sourced module to a specific tag, branch, or commit, appended to the source URL |
| Private module registry | Terraform Cloud/Enterprise's org-scoped catalog for internal modules, published via git tags |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
does the `version` argument in a `module` block do nothing for a
git-sourced module, and what do you use instead to pin that module's
version?
