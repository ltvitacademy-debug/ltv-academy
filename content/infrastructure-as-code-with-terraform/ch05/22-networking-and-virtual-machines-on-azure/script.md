## Segment 1 (title)

With the provider authenticated, Northbridge Retail's order-processing service is next -- it still runs on virtual machines, not containers, and before a single VM can exist it needs a network to live in. This lesson builds that network from the ground up: virtual network, subnet, firewall, and finally the VM itself.

## Segment 2 (code: virtual network and subnet)

Every networked Azure resource lives inside a virtual network, divided into subnets. Northbridge's VNet claims a /16 address space -- over sixty-five thousand addresses -- and the order-processing subnet carves out a /24 slice of that, two hundred fifty-six addresses dedicated to this one VM tier.

## Segment 3 (code: network security group and association)

A network security group is Azure's distributed firewall, a list of allow and deny rules evaluated by priority, lowest number first. This one allows SSH on port 22, but only from Northbridge's bastion subnet -- everything else is denied by Azure's implicit rule. Defining the security group alone doesn't apply it to anything; the separate association resource is what actually attaches it to the subnet.

## Segment 4 (code: network interface and the Linux VM)

The VM itself needs a network interface living in that subnet, then the azurerm_linux_virtual_machine resource referencing that interface. It authenticates with an SSH public key instead of a password, defines an OS disk, and points at a specific Ubuntu image so every apply produces the same machine.

## Segment 5 (steps: the build order)

Six resources, one dependency graph: the VNet before its subnet, the security group before its association, the network interface before the VM. You never write that order anywhere -- Terraform infers every step of it from the references between blocks.

## Segment 6 (outro)

Northbridge's order-processing VM tier is now fully defined as code, network and firewall included, ready to be planned and applied like any other configuration. Next up, Lesson 23: App Services, storage, and Key Vault for the storefront API.
