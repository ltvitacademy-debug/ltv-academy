# Lesson 2 — terraform init, plan, and apply in Depth

**Chapter 1 · Terraform Fundamentals · Lesson 2 of 4**

## What you'll learn

- What `terraform init` actually does to a working directory, and why
  you have to run it again whenever you add a provider or module
- Why `terraform plan` is a dry run — what it shows you, and why
  nothing in your cloud changes when you run it
- How to read real plan output, including the `+`, `-`, and `~`
  symbols that tell you create, destroy, and update-in-place
- What `terraform apply` actually does, and why it asks for
  confirmation before it does it

## `terraform init`: preparing the working directory

Before Terraform can do anything with a configuration, the working
directory has to be initialized:

```
terraform init
```

Running it against the `required_providers` block from Lesson 1 does
three concrete things: it downloads the `azurerm` provider plugin
(matching the version constraint) into a hidden `.terraform` folder,
it initializes the backend that will store state (by default, a local
`terraform.tfstate` file, right in the working directory), and it
writes a `.terraform.lock.hcl` file that pins the exact provider
version it resolved, so a teammate running `init` later gets the same
one. You only need to run `init` again when something about the
configuration's dependencies changes — a new provider, a new module,
or a changed version constraint. Running it again when nothing's
changed is harmless; it just confirms everything's already in place.

## `terraform plan`: a dry run, nothing more

Once initialized, you run:

```
terraform plan
```

`plan` builds a complete picture of what Terraform *would* do, and
shows it to you — and then stops. It does not touch your cloud
subscription in any way. Internally, it reads your current
`.tf` files, reads the current state file, and (for most providers)
calls out to the real API to refresh its knowledge of each resource's
actual current values, then diffs "what you've declared" against
"what state says exists" to produce an execution plan. That plan is
the entire value of the command: it's your chance to see exactly what
would change before committing to it, the same role `az deployment
group what-if` plays on the Bicep side.

## Reading plan output

Say your configuration declares one `azurerm_resource_group`. The
first time you run `plan` against an empty state, you'd see something
like:

```
Terraform will perform the following actions:

  # azurerm_resource_group.rg will be created
  + resource "azurerm_resource_group" "rg" {
      + id       = (known after apply)
      + location = "eastus"
      + name     = "rg-ltv-demo"
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

The symbols at the start of each attribute line are the whole
vocabulary you need to read any plan:

- `+` — this will be **created**
- `-` — this will be **destroyed**
- `~` — this will be **updated in place**, without destroying and
  recreating it

Change `location` to `"westus2"` on an already-applied resource group
and plan again, and you'd instead see a `~` next to `location`,
because changing that property on an existing resource group updates
it rather than creating a new one. Some attribute changes force a
destroy-and-recreate instead of an in-place update — plan always
tells you which one you're looking at, so you never have to guess.

## `terraform apply`: making it real

`terraform apply` runs the same plan, shows it to you the same way,
and then — if you confirm — actually executes it:

```
terraform apply
```

```
Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

azurerm_resource_group.rg: Creating...
azurerm_resource_group.rg: Creation complete after 2s

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

That confirmation prompt is a real safety feature, not decoration —
only typing `yes` proceeds, and anything else cancels with nothing
changed. Once it does proceed, Terraform calls the real Azure API
through the `azurerm` provider, creates the resource group, and then
writes the result back into `terraform.tfstate` — which is exactly
what Lesson 3 picks up: how Terraform uses that state file to know
what it's managing the next time you run `plan`.

## Key terms

| Term | Meaning |
|---|---|
| `terraform init` | Downloads required providers into `.terraform/`, sets up the state backend, writes `.terraform.lock.hcl` |
| `terraform plan` | A dry run — shows what would change without changing anything |
| `terraform apply` | Runs the plan again and, after you confirm, actually creates/updates/destroys real resources |
| `+` / `-` / `~` | Plan symbols for create / destroy / update-in-place |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: what
is the practical difference between running `terraform plan` and
running `terraform apply`, and why does `plan` never change anything
in your cloud subscription?
