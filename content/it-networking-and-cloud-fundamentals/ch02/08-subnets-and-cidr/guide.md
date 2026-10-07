# Subnets & CIDR

The last lesson said a subnet mask is what decides exactly where an IP address splits into its network portion and host portion, but left the details for here. This lesson works through that split with real numbers, using CIDR notation — the shorthand you'll see everywhere in real network diagrams, cloud consoles, and firewall rules. By the end, you'll be able to look at an address like `192.168.10.0/24` and know exactly what it means.

## What you'll learn

- What a subnet is and why Northbridge Retail splits its network into several of them
- How CIDR notation (the `/24` in an address) expresses the subnet mask
- How to calculate the number of usable host addresses in a subnet
- A worked example: sizing a subnet for the Northbridge warehouse's 40 devices

## Why subnet at all

A **subnet** is a smaller network carved out of a larger address block. Northbridge Retail doesn't put every device — warehouse scanners, office laptops, the guest Wi-Fi in the break room — on one flat network. Instead, it splits its address space into separate subnets: one for the warehouse floor, one for corporate office machines, one for guest Wi-Fi. This keeps broadcast traffic contained to the subnet that needs it, lets Northbridge apply different security rules to each group, and means a problem on the guest Wi-Fi subnet can't flood traffic onto the warehouse scanners' subnet.

## CIDR notation: the shorthand for the subnet mask

**CIDR (Classless Inter-Domain Routing)** notation writes the subnet mask as a slash followed by a number, like `/24`. That number is simply **how many of the address's 32 bits are the network portion** — everything left over is the host portion. `192.168.10.0/24` means the first 24 bits (the first three octets: `192.168.10`) are the network portion, and the last 8 bits (the last octet) are the host portion. A `/24` is extremely common because it lines up neatly with octet boundaries, but CIDR can cut anywhere — `/25`, `/26`, `/27` — to create smaller subnets with fewer available addresses.

## Counting usable hosts

The number of host bits left determines how many addresses a subnet has. With `n` host bits, there are 2^n total addresses — but two are always reserved: the **network address** (all host bits zero, identifies the subnet itself) and the **broadcast address** (all host bits one, used to reach every device on the subnet at once). So the usable host count is 2^n − 2.

- `/24` leaves 8 host bits → 2^8 = 256 total → 254 usable hosts
- `/25` leaves 7 host bits → 2^7 = 128 total → 126 usable hosts
- `/26` leaves 6 host bits → 2^6 = 64 total → 62 usable hosts
- `/27` leaves 5 host bits → 2^5 = 32 total → 30 usable hosts

## Worked example: sizing the warehouse subnet

Northbridge Retail's warehouse has about 40 devices today — scanners, a local server, access points — with room to grow to maybe 55. A `/27` (30 usable hosts) is too small. A `/26` gives 62 usable hosts, comfortably covering current devices plus growth, without wasting as much address space as a full `/24` (254 usable hosts) would for a floor that will never need that many. Northbridge's network team assigns the warehouse `192.168.10.0/26`: network address `192.168.10.0`, usable hosts `192.168.10.1` through `192.168.10.62`, broadcast address `192.168.10.63`. The next subnet, for the corporate office, starts cleanly at `192.168.10.64/26`.

## Key terms

| Term | Meaning |
|---|---|
| Subnet | A smaller network carved out of a larger IP address block |
| CIDR notation | The `/n` suffix stating how many bits of an address are the network portion |
| Network address | The first address in a subnet (all host bits zero); identifies the subnet itself |
| Broadcast address | The last address in a subnet (all host bits one); reaches every device on it |
| Usable hosts | 2^(host bits) − 2, excluding the network and broadcast addresses |

## Recap

CIDR notation's `/n` tells you how many of an address's 32 bits are the network portion, and the remaining host bits determine the subnet's size: 2^n − 2 usable addresses, after reserving the network and broadcast addresses. Northbridge sizes each subnet to fit its device count with room to grow, rather than defaulting to one flat network. Next up, Lesson 9: switching and routing basics, where these addresses actually get used to move traffic.
