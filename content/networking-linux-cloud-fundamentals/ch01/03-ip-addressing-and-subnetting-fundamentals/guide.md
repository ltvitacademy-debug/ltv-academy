# Lesson 3 — IP Addressing & Subnetting Fundamentals

**Chapter 1 · Networking Fundamentals · Lesson 3 of 32**

## What you'll learn

- How an IPv4 address is structured, and what the network and host portions actually mean
- What a subnet mask does and how CIDR notation expresses it
- How to figure out how many usable hosts a subnet actually has
- Why subnetting exists at all, instead of every device sharing one giant network

## An IPv4 address has two parts

An IPv4 address is 32 bits, written as four decimal numbers 0-255 separated by dots (dotted
decimal), like `192.168.1.10`. Every address splits into a **network portion** (which network a
device belongs to) and a **host portion** (which specific device on that network). The subnet
mask is what tells a device exactly where that split happens.

A subnet mask, like `255.255.255.0`, is also 32 bits — the 1-bits mark the network portion, the
0-bits mark the host portion. `255.255.255.0` in binary is `11111111.11111111.11111111.00000000`
— 24 ones, then 8 zeros, meaning the first three octets identify the network and the last octet
identifies the host.

## CIDR notation: the shorthand everyone actually uses

Writing out a full subnet mask gets tedious, so **CIDR notation** (Classless Inter-Domain
Routing) expresses the same thing as a slash and a number — the count of network bits.
`192.168.1.10/24` means the same thing as `192.168.1.10` with mask `255.255.255.0`: 24 network
bits, 8 host bits.

```
/24  = 255.255.255.0      = 256 total addresses, 254 usable hosts
/25  = 255.255.255.128    = 128 total addresses, 126 usable hosts
/26  = 255.255.255.192    = 64 total addresses,  62 usable hosts
/27  = 255.255.255.224    = 32 total addresses,  30 usable hosts
/30  = 255.255.255.252    = 4 total addresses,   2 usable hosts (common for point-to-point links)
```

The formula for usable hosts in any subnet: **2^(host bits) - 2**. You subtract 2 because every
subnet reserves its very first address as the **network address** (identifies the subnet itself,
can't be assigned to a device) and its very last address as the **broadcast address** (sends to
every device on that subnet at once).

## Worked example

Take `192.168.1.0/27`. With a /27, there are 32 - 27 = 5 host bits, so 2^5 = 32 total addresses,
minus 2 reserved = **30 usable host addresses**.

```
Subnet:            192.168.1.0/27
Network address:   192.168.1.0    (reserved — identifies the subnet)
First usable host: 192.168.1.1
Last usable host:  192.168.1.30
Broadcast address: 192.168.1.31   (reserved — reaches every host on this subnet)
```

## Why subnet instead of using one giant network?

Three practical reasons a real network gets broken into subnets rather than one flat address
space: it **contains broadcast traffic** (a broadcast only floods within its own subnet, not the
whole organization), it **isolates and secures** groups of devices from each other (servers on
one subnet, guest Wi-Fi on another, with a firewall between them), and it makes **routing and
troubleshooting** dramatically easier, since a subnet maps naturally to "one physical location"
or "one logical group of devices."

## Key terms

| Term | Meaning |
|---|---|
| Subnet mask | A 32-bit value that marks which bits of an IP address are network vs. host |
| CIDR notation | Shorthand for a subnet mask — a slash followed by the count of network bits, e.g. /24 |
| Network address | The first address in a subnet, reserved to identify the subnet itself |
| Broadcast address | The last address in a subnet, reserved to reach every device on it at once |

## Check yourself

Given the subnet `10.0.5.0/28`, how many host bits are there, how many total addresses does
that give you, and how many of those are actually usable by devices?
