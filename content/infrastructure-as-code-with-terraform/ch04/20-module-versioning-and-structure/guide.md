# Module Versioning & Structure

Last lesson's `terraform-aws-modules/vpc/aws` call pinned `version = "~> 5.0"` without explaining what that constraint actually means. Left unpinned, a registry module can quietly upgrade to a new major version the next time someone runs `terraform init -upgrade`, changing behavior Northbridge Retail never asked for. This closes out the chapter: version constraints, the recommended folder structure for any module you write, and the judgment call of when a pattern deserves its own module at all.

## What you'll learn

- How Terraform's version constraint operators (`~>`, `>=`, exact pins) behave
- The standard module folder layout: `main.tf`, `variables.tf`, `outputs.tf`, `README.md`
- Pinning a local module isn't needed — only registry (or other remote) sources take `version`
- A rule of thumb for when a resource pattern is worth turning into a module

## Version constraints

A `version` argument on a `module` block (or a `required_providers` block) accepts a few operators:

```
version = "5.8.1"   # exact version only
version = ">= 5.0"  # 5.0 or any later version, including 6.x
version = "~> 5.0"  # >= 5.0, < 6.0 -- the last digit can increase, not the middle one
version = "~> 5.8"  # >= 5.8, < 5.9 -- patch releases only
```

`~>`, the "pessimistic constraint" operator, is the one you'll use most. `~> 5.0` allows Terraform to pick up `5.1`, `5.9`, anything in the `5.x` line, but refuses to jump to `6.0` on its own. Since the Terraform Registry expects published modules to follow semantic versioning, a major version bump (`5.x` to `6.0`) is the project's own signal that it may contain breaking changes — exactly the kind of upgrade Northbridge Retail wants to review deliberately, not pick up by accident during a routine `terraform init -upgrade`.

Local modules, called with a relative path like `source = "./modules/storage-account"`, don't take a `version` argument at all — there's no published release to pin, since the module's code lives right there in the same repository as whatever's calling it.

## The standard module folder structure

The Terraform Registry expects, and the community follows, a consistent file layout for any module meant to be reused — local or published:

```
modules/storage-account/
  main.tf         # the resource blocks themselves
  variables.tf     # every input the module accepts
  outputs.tf       # every value the module exposes
  README.md        # what the module does, its inputs/outputs, usage example
```

None of this is enforced by Terraform itself — a module still works if everything is crammed into one `main.tf`. It's a convention, but a strong one: anyone opening `variables.tf` immediately sees the module's whole required-input list without reading resource logic, and a `README.md` is what shows up rendered on the module's Terraform Registry page if it's ever published there.

## When to split a module vs. leave resources inline

Not every resource belongs in a module. A reasonable rule of thumb:

- **Keep it inline** when the resource appears exactly once, in exactly one environment, and isn't likely to be copied elsewhere — a one-off resource group, for instance.
- **Extract a module** when the same combination of resources needs to exist more than once (dev/staging/prod, like Northbridge Retail's storage account), or when the configuration is complex enough that hiding its internals behind a handful of variables genuinely simplifies the root module.

Turning everything into a module "for consistency" adds a layer of indirection with no payoff — Terraform doesn't reward over-modularizing, and every extra module is one more `source` and `version` to keep track of.

## Key terms

- **Version constraint** — the `version` argument restricting which published module releases are acceptable
- **`~>` (pessimistic constraint)** — allows the rightmost version segment to increase, blocks the one left of it
- **Standard module layout** — `main.tf`, `variables.tf`, `outputs.tf`, `README.md`
- **Module judgment call** — extract a module when a pattern repeats or is complex; leave a one-off resource inline
