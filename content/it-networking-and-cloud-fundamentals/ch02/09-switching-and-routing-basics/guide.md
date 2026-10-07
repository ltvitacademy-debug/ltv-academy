# Switching & Routing Basics

This chapter has built up the pieces one at a time: networks, layers, IP addresses, subnets. This lesson is where it all comes together and actually moves traffic. Two devices do almost all of the work: the **switch**, which moves data within a subnet, and the **router**, which moves data between subnets and networks. Northbridge Retail's warehouse subnet, corporate office subnet, and guest Wi-Fi subnet from the last lesson only function as separate-but-connected networks because of exactly this pair of devices.

## What you'll learn

- What a switch does and how it learns which device is on which port
- What a router does and how it decides where to send a packet next
- How a decision is made, step by step, when a packet needs to leave its own subnet
- Where switches and routers sit relative to the OSI layers from Lesson 6

## Switching: moving data within a subnet

A **switch** connects devices within the same subnet — in Northbridge's warehouse, every scanner, access point, and the local server plugs into switch ports. A switch operates at the **Data Link layer** (OSI layer 2), making forwarding decisions based on **MAC addresses**, not IP addresses. When a switch first powers on, it doesn't know which device is on which port; it learns by watching traffic. As frames arrive, the switch records which MAC address showed up on which port in a **MAC address table**. Once it has learned a device's location, the switch forwards frames meant for that device directly out the correct port instead of blasting them out every port — fast, and far more efficient than earlier "dumb" hub technology that forwarded everything to every port, every time.

## Routing: moving data between subnets

A **router** connects separate subnets or separate networks together — the device Northbridge's three subnets (warehouse, corporate office, guest Wi-Fi) all connect through to reach each other, and the one that connects the whole site out to the internet. A router operates at the **Network layer** (OSI layer 3), making forwarding decisions based on **IP addresses**. It maintains a **routing table**: a list of known destination networks and which direction (which outgoing interface, or which next device) gets a packet closer to each one. When no specific route matches, most routing tables fall back to a **default route** — typically the path out to the internet — so unmatched traffic still has somewhere to go.

## A packet's decision, step by step

When a laptop on Northbridge's corporate office subnet needs to reach the cloud-hosted order database:

1. The laptop checks whether the destination IP is on its own subnet. It isn't, so the laptop sends the packet to its **default gateway** — the router.
2. The router receives the packet and checks its routing table for the best match to the destination.
3. If the destination is another of Northbridge's own subnets, the router forwards it directly there, through its own Data Link/switching step for that subnet.
4. If the destination is out on the internet, the router forwards it toward its own default route — typically the connection to the internet service provider — and the packet continues hopping through other routers until it arrives.

Every one of those hops repeats the same pattern: check the destination, look it up, forward one step closer.

## Key terms

| Term | Meaning |
|---|---|
| Switch | A Layer 2 device connecting devices within the same subnet, forwarding by MAC address |
| MAC address table | A switch's learned record of which MAC address is reachable on which port |
| Router | A Layer 3 device connecting separate subnets/networks, forwarding by IP address |
| Routing table | A router's list of known destination networks and how to reach each one |
| Default gateway | The router address a device sends traffic to when the destination isn't on its own subnet |
| Default route | The fallback path a router uses for destinations not otherwise in its routing table |

## Recap

Switches move data within a subnet using MAC addresses and a learned table of ports; routers move data between subnets and networks using IP addresses and a routing table, falling back to a default route when nothing more specific matches. Together, they're what lets Northbridge Retail's separate subnets function as one connected network — and what closes out this chapter's foundation before the course moves on to wireless and cloud networking.
