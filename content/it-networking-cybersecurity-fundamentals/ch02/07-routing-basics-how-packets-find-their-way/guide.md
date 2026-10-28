# Lesson 7 — Routing Basics: How Packets Find Their Way

**Chapter 2 · Networking Fundamentals II · Lesson 7 of 32**

## What you'll learn

- What a routing table is and how a router uses it
- The default gateway and why every device needs one
- Static routes vs. dynamic routing protocols
- The difference between an IGP and an EGP, at a conceptual level

## The routing table

A router's job is to move packets between different networks, and it decides how using
a **routing table** — a list of known destination networks and which direction
("next hop") to send traffic toward each one. For every packet, the router checks its
destination IP against the routing table and forwards it toward the best-matching entry.
When multiple entries could match, the router picks the **most specific** match — a
/32 route (one exact host) beats a /24 route (a whole subnet), which beats a /0 route
(the default route, matching everything).

## The default gateway

Every device on a network is configured with a **default gateway** — the router it sends
traffic to whenever the destination isn't on its own local subnet. If a device at
`192.168.1.10/24` wants to reach `8.8.8.8` (outside its own `192.168.1.0/24` subnet), it
doesn't know how to get there directly — it hands the packet to its default gateway, and
the gateway's own routing table takes it from there. This is exactly why "can the device
ping its default gateway" is such a common first troubleshooting step: it isolates
whether the local network segment itself is working before blaming anything further
upstream.

## Static routes vs. dynamic routing

A **static route** is manually configured by an administrator — simple, predictable, and
fine for small or stable networks, but it doesn't adapt if a link goes down; someone has
to notice and fix it.

**Dynamic routing protocols** let routers automatically learn about networks and
recalculate paths when something changes, by exchanging routing information with
neighboring routers. The two broad families:

- **Interior Gateway Protocols (IGPs)** — used within a single organization's network
  (an "autonomous system"). Examples: OSPF, EIGRP.
- **Exterior Gateway Protocols (EGPs)** — used between separate autonomous
  systems, most notably across the public internet. BGP (Border Gateway Protocol) is the
  protocol that effectively holds the entire internet's routing together — every major
  ISP exchanges routes with its neighbors using BGP.

This course doesn't require you to configure OSPF or BGP, but recognizing these names and
what tier of network each one operates at is expected baseline knowledge — a BGP
route leak or route hijack, for example, is a real, documented category of
internet-scale security incident.

## Why routing matters to a SOC analyst specifically

Understanding routing isn't just network-engineer trivia for a security role. Traffic
that takes an unexpected path — a route that shouldn't exist, a device sending traffic
somewhere it has no legitimate reason to reach — is a real indicator worth
investigating. Reading a `traceroute` output and understanding what each hop represents
is a practical, everyday skill for tracing where traffic actually goes versus where it's
supposed to go.

## Key terms

| Term | Meaning |
|---|---|
| Routing table | A router's list of known destination networks and the next hop to reach each one |
| Default gateway | The router a device sends traffic to when the destination isn't on its own local subnet |
| Static route | A manually configured route that doesn't automatically adapt to network changes |
| BGP | The exterior gateway protocol that holds internet-scale routing together between autonomous systems |

## Check yourself

A device can ping its default gateway but can't reach anything outside its own subnet.
What does that specifically rule in, and what does it rule out, about where the problem
lives?
