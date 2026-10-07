# Data Sources

Every resource block you've written so far describes something Terraform should create and manage. But Northbridge Retail's Azure subscription already has things in it that this configuration shouldn't manage, yet still needs to read — a networking team's shared resource group, say, or a base VM image published by a vendor. This lesson covers the `data` block, which reads information about existing infrastructure without taking it over.

## What you'll learn

- What a `data` source is, and how it differs from a `resource`
- The `data "type" "name" { }` syntax, and how to reference what it returns
- A real example on Azure (`azurerm_resource_group`) and one on AWS (`aws_ami`)
- Why you'd reach for a data source instead of hardcoding a value

## `resource` creates and manages; `data` only reads

A `resource` block tells Terraform "create this, and manage its entire lifecycle — update it if the config changes, destroy it if the block is removed." A `data` block tells Terraform something very different: "go look this up, and hand me its attributes — I'm not managing it, someone or something else is." Terraform never creates, modifies, or destroys anything described by a `data` block.

## Reading an existing Azure resource group

Suppose Northbridge's networking team already created a shared resource group that every application team deploys into, and your configuration needs to deploy a storage account there without owning the resource group itself:

```hcl
data "azurerm_resource_group" "shared_networking" {
  name = "rg-northbridge-shared-network"
}

resource "azurerm_storage_account" "images" {
  name                     = "northbridgeprodimages"
  resource_group_name      = data.azurerm_resource_group.shared_networking.name
  location                 = data.azurerm_resource_group.shared_networking.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}
```

Notice the reference syntax: `data.azurerm_resource_group.shared_networking.location` — it's the same `<type>.<local name>.<attribute>` pattern from Lesson 7, just prefixed with `data.` to mark it as a lookup rather than something this configuration manages.

## Reading a vendor-published image on AWS

Data sources are especially common for finding the latest version of something you don't control, like an Amazon Machine Image published by a vendor:

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.medium"
}
```

Without this data source, you'd have to hardcode a specific AMI ID — one that goes stale the moment Canonical publishes a newer patched image. The `data` block instead looks up whichever AMI currently matches the filter at `plan` time, every time.

## Why reach for a data source at all

- **You don't own the resource.** Another team or another Terraform configuration manages it, and you only need to read it.
- **The value changes outside your control.** A vendor-published AMI, the latest version of a managed service, a resource some manual process created.
- **You want to avoid hardcoding something that could drift.** A hardcoded AMI ID or resource group name silently goes stale; a data source always reflects current reality at plan time.

## Key terms

| Term | Meaning |
|---|---|
| Data source | A `data` block that reads attributes of existing infrastructure without managing it |
| `data.<type>.<name>.<attribute>` | The reference pattern for a value returned by a data source |
| AMI | Amazon Machine Image — a template AWS uses to launch an EC2 instance |
| Lifecycle | Create, update, and destroy — what `resource` blocks manage and `data` blocks never do |
