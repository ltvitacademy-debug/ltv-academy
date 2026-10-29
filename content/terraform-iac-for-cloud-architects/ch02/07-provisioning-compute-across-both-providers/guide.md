# Lesson 7 — Provisioning Compute Across Both Providers

**Chapter 2 · Provisioning Real Infrastructure · Lesson 3 of 4**

## What you'll learn

- How `azurerm_linux_virtual_machine` and `aws_instance` provision a real VM
  into the networks Lessons 5 and 6 already built
- Why Azure requires a separate `azurerm_network_interface` resource sitting
  between a VM and a subnet, where AWS doesn't
- How to reference last lesson's subnet resources — `azurerm_subnet.web.id`
  and `aws_subnet.web.id` — directly inside a compute resource block
- The real required arguments each VM resource type needs before Terraform
  will actually provision one

## Azure: a network interface sits between the VM and the subnet

In Azure's resource model, a virtual machine never attaches to a subnet
directly — it attaches to a **network interface**, and the network interface
attaches to the subnet. That's its own resource type in Terraform,
`azurerm_network_interface`, and it's the first resource in this lesson to
reference a resource from Lesson 5:

```hcl
resource "azurerm_network_interface" "web" {
  name                = "nic-web-01"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.web.id
    private_ip_address_allocation = "Dynamic"
  }
}
```

`subnet_id = azurerm_subnet.web.id` is the same implicit-dependency pattern
from Lesson 5, just reaching one lesson further back: this NIC can't exist
until `azurerm_subnet.web` does, and Terraform's graph enforces that
automatically. `private_ip_address_allocation = "Dynamic"` means Azure
assigns the private IP from the subnet's range rather than you pinning one.

## `azurerm_linux_virtual_machine`

With the NIC in place, the VM resource itself is mostly configuration —
size, image, and credentials:

```hcl
resource "azurerm_linux_virtual_machine" "web" {
  name                   = "vm-web-01"
  resource_group_name    = azurerm_resource_group.example.name
  location               = azurerm_resource_group.example.location
  size                   = "Standard_B1s"
  admin_username         = "azureuser"
  network_interface_ids  = [azurerm_network_interface.web.id]

  admin_ssh_key {
    username   = "azureuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
}
```

`network_interface_ids` takes a **list** — Azure VMs can have more than one
NIC attached, so even a single-NIC VM like this one still wraps it in
brackets. `admin_ssh_key` and `os_disk` are required nested blocks;
`source_image_reference` is how you tell Azure which marketplace image to
boot from, here a specific Ubuntu 22.04 LTS release.

## AWS: `aws_instance` attaches straight to a subnet

AWS skips the separate network-interface resource for the common case. An
EC2 instance can reference a subnet directly:

```hcl
resource "aws_instance" "web" {
  ami                         = "ami-0c7217cdde317cfec"
  instance_type                = "t3.micro"
  subnet_id                    = aws_subnet.web.id
  associate_public_ip_address  = true

  tags = {
    Name = "ec2-web-01"
  }
}
```

`subnet_id = aws_subnet.web.id` references Lesson 6's subnet the same way
Azure's NIC referenced Lesson 5's — same implicit-dependency mechanics,
different point in the chain. `ami` identifies the machine image to boot
(AWS's equivalent of `source_image_reference`), and `instance_type` is AWS's
name for VM size (`t3.micro` here, where Azure used `Standard_B1s`).

## Why the shapes differ

This isn't an arbitrary quirk — it reflects a real difference in how each
cloud models networking. Azure treats a network interface as a first-class,
independently manageable resource: you can detach one from a VM and attach
it to another, or give a single VM several NICs, each configured separately.
AWS creates an **elastic network interface (ENI)** behind the scenes for
`aws_instance` automatically, and you only reach for an explicit
`aws_network_interface` resource when you need more than the default single
NIC — most configurations, like this one, never need to.

## Key terms

| Term | Meaning |
|---|---|
| `azurerm_network_interface` | The resource that sits between an Azure VM and a subnet; required even for a single-NIC VM |
| `ip_configuration` | The nested block on a NIC that assigns it to a subnet and sets its IP allocation method |
| `aws_instance` | The AWS EC2 resource type; attaches directly to a subnet via `subnet_id`, no separate NIC resource required |
| ENI (elastic network interface) | AWS's networking object, created implicitly behind `aws_instance` unless you manage one explicitly |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does
`azurerm_linux_virtual_machine` need a separate `azurerm_network_interface`
resource in between it and the subnet, while `aws_instance` can reference
`aws_subnet.web.id` directly?
