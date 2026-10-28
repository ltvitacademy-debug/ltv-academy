# Lesson 5 — IPv4 Addressing and Subnetting

**Chapter 2 · Networking Fundamentals II · Lesson 5 of 32**

## What you'll learn

- How an IPv4 address is structured and what a subnet mask actually does
- CIDR notation and how to read it
- How to calculate a subnet's network address, broadcast address, and usable host range
- Why subnetting matters for both network design and security segmentation

## IPv4 address structure

An IPv4 address is a 32-bit number, written as four decimal octets separated by dots —
`192.168.1.10`. Each octet ranges from 0 to 255. Every IPv4 address is split
conceptually into a **network portion** and a **host portion**, and the subnet mask is
what tells a device exactly where that split happens.

A subnet mask, like `255.255.255.0`, uses binary 1s to mark the network portion and
binary 0s to mark the host portion. `255.255.255.0` in binary is
`11111111.11111111.11111111.00000000` — 24 ones, meaning the first 24 bits (three
octets) are the network portion, and the last 8 bits are available for host addresses.

## CIDR notation

Classless Inter-Domain Routing (CIDR) notation writes the subnet mask as a slash
followed by the number of network bits — `192.168.1.10/24` means the same thing as
`192.168.1.10` with a `255.255.255.0` mask. CIDR is how you'll see addresses written in
almost every modern configuration file, router command, and cloud console.

```
/24  = 255.255.255.0        = 256 addresses, 254 usable hosts
/25  = 255.255.255.128      = 128 addresses, 126 usable hosts
/26  = 255.255.255.192      =  64 addresses,  62 usable hosts
/27  = 255.255.255.224      =  32 addresses,  30 usable hosts
/28  = 255.255.255.240      =  16 addresses,  14 usable hosts
```

## Calculating a subnet by hand

Take `192.168.1.0/26`. A /26 leaves 6 host bits (32 - 26 = 6), giving 2^6 = 64 total
addresses per subnet. The block size in the last meaningful octet is 256 / 4 = 64 (since
a /26 splits the last octet into 4 blocks of 64). So the subnets are:
`192.168.1.0`, `192.168.1.64`, `192.168.1.128`, `192.168.1.192`.

For the first subnet, `192.168.1.0/26`:

- **Network address** (all host bits 0): `192.168.1.0`
- **Broadcast address** (all host bits 1): `192.168.1.63`
- **Usable host range**: `192.168.1.1` through `192.168.1.62` (62 usable addresses — the
  network and broadcast addresses are never assignable to a host)

## Why subnetting matters beyond "we ran out of addresses"

Subnetting isn't just about not wasting a full /24 (254 usable hosts) on a point-to-point
link that only needs 2 addresses. It's also a core security tool: placing servers,
user workstations, and IoT/guest devices in separate subnets lets you apply different
firewall rules, different access controls, and different monitoring to each group —
instead of one flat network where anything can reach anything. This principle —
segmentation — reappears constantly in Chapter 7's defense-in-depth material and
throughout the Advanced Specialization stage of this path.

## Key terms

| Term | Meaning |
|---|---|
| Subnet mask | Marks which bits of an IPv4 address are the network portion vs. the host portion |
| CIDR notation | Writing a subnet mask as a slash plus the number of network bits, e.g. /24 |
| Network address | The first address in a subnet (all host bits 0) — identifies the subnet itself, never assignable to a host |
| Broadcast address | The last address in a subnet (all host bits 1) — reaches every host on that subnet, never assignable to a host |

## Check yourself

For `10.0.5.0/28`, what are the network address, broadcast address, and usable host
range?
