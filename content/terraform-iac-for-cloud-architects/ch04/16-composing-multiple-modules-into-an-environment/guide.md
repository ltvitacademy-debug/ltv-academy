# Lesson 16 — Composing Multiple Modules into an Environment

**Chapter 4 · Modules & Reusability · Lesson 4 of 4**

## What you'll learn

- How a real environment is built from several independent modules —
  network, compute, and database — each one focused on one job
- How to wire one module's output directly into another module's
  input, with no value ever copied by hand
- Why Terraform figures out the right create order on its own, from
  those references, without an explicit `depends_on`
- Why each module stays independently testable even once it's part of
  a larger composed environment

## Three modules, three jobs

A real environment is rarely one module — it's several, each
responsible for one layer. This lesson composes three: the `network`
module from Lesson 14 (a VNet and its subnets), a `compute` module
(a VM and its network interface), and a `database` module (a SQL
server and a firewall rule). Each one is written the same way Lesson
14 wrote `network` — its own `variables.tf`, `main.tf`, and
`outputs.tf` — and each one can be tested on its own, with its own
inputs, independent of the other two.

```hcl
# modules/compute/outputs.tf
output "private_ip" {
  value = azurerm_network_interface.this.private_ip_address
}
```

```hcl
# modules/database/variables.tf
variable "allowed_ip" {
  type        = string
  description = "A single IP address allowed through the SQL firewall"
}
```

## Wiring network into compute

The composition lives in the root configuration, where each module is
called and its outputs are passed into the next. `compute` needs
somewhere to put its network interface, and `network` already produced
exactly that:

```hcl
module "network" {
  source              = "./modules/network"
  vnet_name            = "vnet-prod"
  address_space        = ["10.2.0.0/16"]
  subnet_count         = 2
  location             = "eastus"
  resource_group_name  = azurerm_resource_group.prod.name
}

module "compute" {
  source              = "./modules/compute"
  vm_name              = "vm-app-prod"
  subnet_id            = module.network.subnet_ids[0]
  resource_group_name  = azurerm_resource_group.prod.name
  location             = "eastus"
  admin_username       = "ltvadmin"
  admin_password       = var.vm_admin_password
}
```

`subnet_id = module.network.subnet_ids[0]` is the whole pattern: no
subnet ID is typed in by hand anywhere, so it can never drift out of
sync with whatever `network` actually created. Because `compute`'s
input literally references `module.network`'s output, Terraform's
dependency graph already knows `network` has to be created first —
there's no `depends_on` to write, the reference *is* the dependency.

## Wiring compute into database

The same pattern chains a second time. `database` needs to know which
IP address its firewall should allow in, and `compute`'s VM is the
thing that needs to reach it:

```hcl
module "database" {
  source              = "./modules/database"
  server_name          = "sql-app-prod"
  resource_group_name  = azurerm_resource_group.prod.name
  location             = "eastus"
  admin_login          = "sqladmin"
  admin_password       = var.sql_admin_password
  allowed_ip           = module.compute.private_ip
}
```

`allowed_ip = module.compute.private_ip` means the firewall rule is
always built from the VM's *actual* private IP, whatever it turns out
to be, instead of a value someone guessed and hard-coded. Three
`terraform apply`-worthy resources — network, compute, database — come
up from a single `terraform apply`, in the right order, wired together
correctly, because each module's inputs say exactly what they depend
on.

## Why this holds together

Nothing about this composition is a new Terraform feature — it's the
same `module` block and the same `module.<name>.<output>` syntax
Lesson 14 introduced, used three times and chained together. What
makes it work at scale is that each module still does exactly one job
and can still be tested alone, with made-up input values, the same way
Lesson 7 of the PowerShell-for-Azure-Automation course described
testing one function in isolation rather than running an entire
200-line script to see if one piece works. Composing modules is how a
real multi-tier environment stays both buildable in one `apply` and
reviewable one module at a time.

## Key terms

| Term | Meaning |
|---|---|
| Composition | Building a full environment by calling several modules together from one root configuration |
| Implicit dependency | A dependency Terraform infers automatically because one module's input references another module's output |
| `module.<name>.<output>` | How a module's output is passed as another module's input, with no value copied by hand |
| Independently testable | Each module can still be called on its own, with its own inputs, outside the larger composition |

## Check yourself

You're ready for Lesson 17 when you can explain, without looking: why
doesn't `module "database"` in this lesson's example need an explicit
`depends_on` to make sure `module "compute"` runs first?
