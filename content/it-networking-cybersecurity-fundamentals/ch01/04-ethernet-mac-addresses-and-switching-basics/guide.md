# Lesson 4 — Ethernet, MAC Addresses, and Switching Basics

**Chapter 1 · Networking Fundamentals I · Lesson 4 of 32**

## What you'll learn

- What Ethernet is and why it's the dominant Layer 2 technology
- How MAC addresses are structured and why they're globally unique
- How a switch actually learns and forwards traffic
- The difference between a switch, a hub, and a router

## Ethernet: the dominant Layer 2 standard

Ethernet is the family of standards that defines how devices on a local network frame
and transmit data at Layer 2. It's been the dominant wired LAN technology for decades,
and nearly every wired network you'll touch professionally runs Ethernet over twisted-pair
copper or fiber, at speeds now ranging from 1 Gbps to 100 Gbps or more.

## MAC addresses: physical addressing

Every network interface card (NIC) has a Media Access Control (MAC) address burned into
its hardware — a 48-bit identifier typically written as six pairs of hexadecimal digits,
like `00:1A:2B:3C:4D:5E`. The first 24 bits identify the manufacturer (the Organizationally
Unique Identifier, or OUI); the last 24 bits are assigned by that manufacturer to make
the address unique. In theory, no two NICs anywhere should ever share a MAC address —
though software can "spoof" a MAC address, which is itself a real attack technique
covered in Chapter 6.

## How a switch learns and forwards

A switch builds and maintains a MAC address table — a map of which MAC address is
reachable out of which physical port. It builds this table by *learning*:

1. A frame arrives on port 3 with source MAC `AA:AA:AA:AA:AA:AA`.
2. The switch records: `AA:AA:AA:AA:AA:AA` is reachable via port 3.
3. For the destination, the switch checks its table. If it already knows which port the
   destination MAC lives on, it forwards the frame out *only* that port.
4. If the destination MAC isn't in the table yet, the switch *floods* the frame out every
   port except the one it arrived on — a one-time broadcast-like behavior until it learns
   where that device actually is.

This learn-then-forward behavior is why switches are dramatically more efficient than
the hubs they replaced. A hub has no intelligence at all — it repeats every incoming
frame out every port, regardless of destination, turning every port into shared
bandwidth and every other device into something that can see all of that traffic. A
switch, by contrast, sends traffic only where it needs to go, which is also a real
security property: on a switched network, another device generally can't passively see
traffic that isn't addressed to it — a core reason attackers specifically target
switching weaknesses (like ARP spoofing) when they want to intercept traffic that
switching would otherwise keep private.

## Switch vs. hub vs. router

| Device | Layer | Behavior |
|---|---|---|
| Hub | Layer 1 | Repeats every frame out every port — no intelligence, no addressing |
| Switch | Layer 2 | Learns MAC addresses, forwards frames only to the port that needs them |
| Router | Layer 3 | Forwards packets between different networks based on IP address |

## Broadcast domains

All devices connected to a switch (or a chain of switches) share one **broadcast
domain** — a broadcast frame (destination `FF:FF:FF:FF:FF:FF`) reaches every device in
that domain. Routers, by design, do not forward broadcasts between networks, which is
why routers are what actually separate one broadcast domain from another. VLANs
(virtual LANs) let a single physical switch be logically split into multiple separate
broadcast domains — a topic this course returns to when it covers network segmentation.

## Key terms

| Term | Meaning |
|---|---|
| MAC address | A 48-bit hardware address burned into a NIC, used for Layer 2 addressing |
| MAC address table | A switch's map of which MAC address is reachable via which port |
| Flooding | A switch sending a frame out every port (except the one it arrived on) because it doesn't yet know the destination's port |
| Broadcast domain | The set of devices that all receive a broadcast frame — bounded by routers, not switches |

## Check yourself

Why does flooding a frame out every port only happen once per unknown destination MAC,
rather than every time that device communicates?
