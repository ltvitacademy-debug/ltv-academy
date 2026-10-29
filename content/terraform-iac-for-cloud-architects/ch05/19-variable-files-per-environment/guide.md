# Lesson 19 — Variable Files Per Environment

**Chapter 5 · Terraform Workspaces & Environments · Lesson 19 of 32**

## What you'll learn

- What a `.tfvars` file is, and how it's different from the
  `variables.tf` declarations you've already been writing since
  Chapter 1
- How to point `terraform apply` at a specific `.tfvars` file with
  `-var-file`
- A real worked example: the same module producing a small dev
  environment and a much larger prod environment from two different
  variable files
- How this pattern complements, rather than replaces, workspaces and
  separate state files

## `.tfvars` files: values, not declarations

`variables.tf` declares *what* inputs a configuration accepts and
their types — it doesn't say what values to actually use. A
`.tfvars` file supplies those values, one file per situation:

```hcl
# dev.tfvars
environment    = "dev"
instance_count = 1
vm_size        = "Standard_B1s"
```

```hcl
# prod.tfvars
environment    = "prod"
instance_count = 4
vm_size        = "Standard_D4s_v3"
```

Same variable names, same types declared once in `variables.tf` —
completely different values depending on which file you load. Nothing
about the module or the root configuration changes between
environments; only the numbers going in do.

## Loading a `.tfvars` file with `-var-file`

Terraform never guesses which `.tfvars` file to use — you tell it,
explicitly, on the command line:

```
terraform apply -var-file="dev.tfvars"
terraform apply -var-file="prod.tfvars"
```

That explicitness matters in a CI/CD pipeline: a dev branch's pipeline
stage runs the first command, a prod branch's stage runs the second,
and which environment gets built is visible right there in the
pipeline definition, not buried in a workspace someone forgot to
select. (Terraform does auto-load two special cases without a flag —
a file literally named `terraform.tfvars`, and any file ending in
`.auto.tfvars` — but naming your files `dev.tfvars`/`prod.tfvars` and
passing `-var-file` explicitly avoids relying on either.)

## One module, two very different environments

```hcl
# main.tf
variable "environment"    { type = string }
variable "instance_count" { type = number }
variable "vm_size"        { type = string }

module "webapp" {
  source         = "./modules/webapp"
  environment    = var.environment
  instance_count = var.instance_count
  vm_size        = var.vm_size
}
```

Run `terraform apply -var-file="dev.tfvars"` and the `webapp` module
receives `instance_count = 1` on `Standard_B1s` — a single small VM,
cheap to leave running all day for testing. Run `terraform apply
-var-file="prod.tfvars"` against the same `main.tf` and the same
module receives `instance_count = 4` on `Standard_D4s_v3` — four much
larger instances. It's the exact same module code from Chapter 4,
producing a deliberately tiny dev footprint and a deliberately
substantial prod footprint, purely because the input values changed.

## How this fits with workspaces and state files

Lesson 17 and 18 were about *where state lives* — one shared backend
with named workspaces, or separate backends per directory.
`.tfvars` files are about something different: *what values a given
apply uses*. The two combine naturally — a separate `envs/prod/`
directory (real isolation) loading `prod.tfvars` (the right sizing)
against the same shared module (no duplicated logic) is a completely
realistic, production-grade layout, and it's the pattern Chapter 8's
capstone builds in full.

## Key terms

| Term | Meaning |
|---|---|
| `.tfvars` file | A file supplying concrete values for variables already declared in `variables.tf` |
| `-var-file` | The `terraform apply`/`plan` flag that explicitly loads a named `.tfvars` file |
| `terraform.tfvars` | The one filename Terraform auto-loads without `-var-file`, along with any `*.auto.tfvars` file |
| Same module, different inputs | The core pattern: one module's code never changes; only the `.tfvars` file driving it does |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
does passing `-var-file="prod.tfvars"` explicitly on the command line
make a CI/CD pipeline easier to audit than relying on whichever
workspace happens to be selected?
