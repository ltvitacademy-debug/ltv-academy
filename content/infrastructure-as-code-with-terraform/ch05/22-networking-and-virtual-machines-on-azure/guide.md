# Networking & Virtual Machines on Azure

With the `azurerm` provider authenticated and initialized, you're ready to provision real compute for Northbridge Retail. The order-processing service still runs on virtual machines rather than containers, so before a single VM can exist it needs a network to live in. This lesson builds that network from the ground up — virtual network, subnet, and network security group — then provisions the VM itself.

## What you'll learn

- `azurerm_virtual_network` and `azurerm_subnet` — carving out address space for Northbridge's VM tier
- `azurerm_network_security_group` — the firewall rules controlling what traffic reaches the VMs
- `azurerm_linux_virtual_machine` and the networking resources it depends on
- How these four resource types reference each other to form one dependency graph

## The virtual network and subnet

Every Azure resource that needs network connectivity lives inside a virtual network (VNet), which is further divided into subnets:

```hcl
resource "azurerm_virtual_network" "main" {
  name                = "vnet-northbridge-prod"
  address_space       = ["10.20.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

resource "azurerm_subnet" "order_processing" {
  name                 = "snet-order-processing"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.20.1.0/24"]
}
```

The VNet's `10.20.0.0/16` address space covers 65,536 addresses; the subnet carves out a `/24` slice of 256 addresses for Northbridge's order-processing tier specifically. Note `virtual_network_name` references the VNet by name, not by resource reference syntax — that's simply how this particular resource type's schema is defined.

## Locking down traffic with a network security group

A network security group (NSG) is Azure's distributed firewall — a set of allow/deny rules evaluated by priority:

```hcl
resource "azurerm_network_security_group" "order_processing" {
  name                = "nsg-order-processing"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  security_rule {
    name                       = "allow-ssh-from-bastion"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "10.20.100.0/24"
    destination_address_prefix = "*"
  }
}

resource "azurerm_subnet_network_security_group_association" "order_processing" {
  subnet_id                 = azurerm_subnet.order_processing.id
  network_security_group_id = azurerm_network_security_group.order_processing.id
}
```

Lower `priority` numbers are evaluated first. Here, only SSH traffic from Northbridge's bastion subnet (`10.20.100.0/24`) is allowed in on port 22 — everything else is denied by Azure's implicit deny-all rule. The separate `_association` resource is what actually attaches the NSG to the subnet; defining a security group alone doesn't apply it to anything.

## Provisioning the virtual machine

With networking in place, the VM itself needs a network interface plus the machine definition:

```hcl
resource "azurerm_network_interface" "order_processing" {
  name                = "nic-order-processing-01"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.order_processing.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_linux_virtual_machine" "order_processing" {
  name                = "vm-order-processing-01"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_D2s_v5"
  admin_username      = "azureuser"

  network_interface_ids = [
    azurerm_network_interface.order_processing.id,
  ]

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
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }
}
```

`network_interface_ids` is what connects the VM to the subnet and, through the NSG association, to the firewall rules you just wrote. Terraform resolves the entire chain — resource group, VNet, subnet, NSG, NIC, VM — in dependency order automatically, the same inference you saw with resource references back in earlier chapters.

## Key terms

| Term | Meaning |
|---|---|
| Virtual network (VNet) | Azure's isolated network address space; the container for subnets |
| Subnet | A smaller address range carved out of a VNet, where resources actually attach |
| Network security group (NSG) | Azure's firewall — allow/deny rules evaluated in priority order |
| Network interface (NIC) | Connects a VM to a subnet and carries its private IP configuration |
