# The Plan and Apply Workflow

Every lesson in this chapter has shown you pieces of HCL — blocks, arguments, references, functions. This lesson puts them all into motion with the four commands you'll run on nearly every Terraform configuration you ever write: `init`, `plan`, `apply`, and `destroy`. By the end, you'll have watched Northbridge Retail's resource group and storage account actually come to life, end to end.

## What you'll learn

- What `terraform init` does, and why it's the first command in any new configuration
- How to read a `terraform plan`'s output before anything changes
- What `terraform apply` actually does, and how it differs from `plan`
- How `terraform destroy` tears infrastructure back down, and when you'd use it

## Step 1: `terraform init`

`init` downloads the providers your configuration declares in `required_providers` and sets up the local working directory:

```bash
$ terraform init

Initializing the backend...
Initializing provider plugins...
- Finding hashicorp/azurerm versions matching "~> 3.80"...
- Installing hashicorp/azurerm v3.84.0...
- Installed hashicorp/azurerm v3.84.0 (signed by HashiCorp)

Terraform has been successfully initialized!
```

You run `init` once per configuration directory, and again any time you change a provider version or add a backend. Nothing in Azure or AWS is touched yet — this step only prepares your local machine.

## Step 2: `terraform plan`

`plan` compares your configuration against the real infrastructure Terraform currently knows about, and shows exactly what would change — without changing anything:

```bash
$ terraform plan

Terraform will perform the following actions:

  # azurerm_resource_group.northbridge will be created
  + resource "azurerm_resource_group" "northbridge" {
      + location = "eastus2"
      + name     = "rg-northbridge-prod"
    }

  # azurerm_storage_account.images will be created
  + resource "azurerm_storage_account" "images" {
      + account_replication_type = "GRS"
      + account_tier             = "Standard"
      + name                     = "northbridgeprodimages"
      + resource_group_name      = (known after apply)
    }

Plan: 2 to add, 0 to change, 0 to destroy.
```

`+` means create, `~` means update in place, and `-` means destroy — you'll see all three once configurations change over time, not just the create-only plan above. `(known after apply)` marks a value Terraform can't show yet because it depends on a resource that doesn't exist until `apply` actually runs. Reading this output before running `apply` is the single habit that prevents most "wait, why did it destroy that?" surprises.

## Step 3: `terraform apply`

`apply` runs the same comparison as `plan`, shows you the identical plan output, and then asks for confirmation before actually creating, updating, or destroying anything:

```bash
$ terraform apply

Plan: 2 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

azurerm_resource_group.northbridge: Creating...
azurerm_resource_group.northbridge: Creation complete after 1s
azurerm_storage_account.images: Creating...
azurerm_storage_account.images: Still creating... [10s elapsed]
azurerm_storage_account.images: Creation complete after 14s

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

Only after typing `yes` does Terraform actually call the Azure API. In CI/CD pipelines, `apply` is typically run with `-auto-approve` to skip the interactive prompt — appropriate once a human has already reviewed the plan elsewhere in the pipeline.

## Step 4: `terraform destroy`

`destroy` tears down every resource the configuration currently manages, in reverse dependency order:

```bash
$ terraform destroy

Plan: 0 to add, 0 to change, 2 to destroy.

Do you really want to destroy all resources?
  Enter a value: yes

azurerm_storage_account.images: Destroying...
azurerm_storage_account.images: Destruction complete after 6s
azurerm_resource_group.northbridge: Destroying...
azurerm_resource_group.northbridge: Destruction complete after 3s

Destroy complete! Resources: 2 destroyed.
```

You'll reach for `destroy` most often to tear down a temporary dev or test environment, never typically for production. Notice the order: the storage account is destroyed before the resource group it lives in — the exact reverse of the creation order from `apply`, following the same dependency graph in the opposite direction.

## Key terms

| Term | Meaning |
|---|---|
| `terraform init` | Downloads required providers and prepares the working directory; run once and after provider changes |
| `terraform plan` | Shows what would change, without changing anything |
| `terraform apply` | Shows the plan, asks for confirmation, then actually creates/updates/destroys resources |
| `terraform destroy` | Tears down every resource the configuration manages, in reverse dependency order |

## Recap

You now know enough HCL — blocks, resources, providers, variables, outputs, data sources, expressions, functions — and enough of the core workflow to build and tear down real infrastructure end to end. The one thing left unexplained is how Terraform remembers what it already created between runs. That's state, and it's the entire subject of Chapter 3, starting with Lesson 12: What State Is.
