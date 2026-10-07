# IP Addressing

The last lesson named the Network/Internet layer as the one responsible for delivery across different networks. This lesson is about the address that makes that possible: the IP address. Every device on Northbridge Retail's network — a warehouse scanner, a cash register, a laptop in the corporate office — needs one, and understanding how an IP address is actually structured is the foundation for everything in the next two lessons on subnetting and routing.

## What you'll learn

- What an IP address is and why it has two parts: a network portion and a host portion
- IPv4 dotted-decimal notation and what's really underneath it (32 bits)
- Public vs. private IP address ranges, and why Northbridge's internal devices use private addresses
- Static vs. dynamic addressing, and how DHCP assigns addresses automatically

## What an IP address actually is

An IPv4 address is a 32-bit number, almost always written in **dotted-decimal notation**: four numbers from 0-255, separated by dots, like `192.168.1.10`. Each of those four numbers is one **octet** — 8 bits — and the whole address is those four octets strung together. Every IP address splits into two parts: a **network portion**, identifying which network the device is on, and a **host portion**, identifying which specific device within that network. A subnet mask (covered in full next lesson) is what tells you exactly where that split happens. For now, think of it like a building address: the street name is the network portion, and the apartment number is the host portion — you need both to find one specific unit.

## Public vs. private addresses

Not every IP address is reachable from the open internet. Certain ranges are reserved as **private** addresses, meant only for use inside a single organization's internal network: `10.0.0.0–10.255.255.255`, `172.16.0.0–172.31.255.255`, and `192.168.0.0–192.168.255.255`. Northbridge Retail's warehouse scanners, registers, and office laptops all use addresses from these private ranges — for example, the warehouse LAN might run on `192.168.10.0/24`. Private addresses are never routed on the public internet; they only have to be unique inside Northbridge's own network. When a device on the warehouse LAN needs to reach something on the public internet, like a shipping carrier's tracking API, Northbridge's router performs **Network Address Translation (NAT)**, swapping the private source address for one **public** address that is globally unique and reachable from anywhere.

## Static vs. dynamic addressing

A device can get its IP address in one of two ways. A **static** address is manually configured once and never changes — Northbridge assigns static addresses to things that other devices need to find reliably, like the warehouse's local server and its network printer. A **dynamic** address is assigned automatically, usually by a **DHCP (Dynamic Host Configuration Protocol)** server, which hands out an address from a defined pool whenever a device joins the network and reclaims it when the device leaves. Dynamic addressing is what makes it painless for a new warehouse laptop, or a visitor's phone on the guest Wi-Fi, to just connect and get online without anyone manually configuring anything. Most of Northbridge's day-to-day devices use DHCP; only the handful of devices that need a predictable, unchanging address get a static one.

## Key terms

| Term | Meaning |
|---|---|
| IPv4 address | A 32-bit address, written as four dotted-decimal octets (e.g. 192.168.1.10) |
| Octet | One of the four 8-bit sections of an IPv4 address |
| Network portion / host portion | The two parts of an IP address: which network, and which device on it |
| Private address range | IP ranges (10.x, 172.16-31.x, 192.168.x) reserved for internal use, never routed on the public internet |
| NAT (Network Address Translation) | Translates private internal addresses to a public address for internet access |
| DHCP | A protocol/server that automatically assigns IP addresses to devices as they join a network |

## Recap

Every IP address has a network portion and a host portion, written as four dotted-decimal octets. Private ranges keep Northbridge's internal devices off the public internet directly, with NAT bridging the gap; DHCP assigns most addresses automatically, while a few critical devices get a static address. Next up, Lesson 8: subnets and CIDR, which is exactly where that network/host split gets defined precisely.
