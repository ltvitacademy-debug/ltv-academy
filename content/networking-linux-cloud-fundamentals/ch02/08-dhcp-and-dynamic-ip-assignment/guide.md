# Lesson 8 — DHCP & Dynamic IP Assignment

**Chapter 2 · Network Infrastructure & Services · Lesson 8 of 32**

## What you'll learn

- The real DHCP process — Discover, Offer, Request, Acknowledge (DORA) — step by step
- What a DHCP server actually hands a device, beyond just an IP address
- What a lease time is, and what happens when it's about to run out
- Why a device without DHCP has to be configured by hand, and when you'd actually do that

## Why DHCP exists

Every device on a network needs an IP address, a subnet mask, a default gateway, and usually a DNS
server before it can do anything useful. Configuring all of that by hand on every laptop, phone,
and printer on a real network doesn't scale — one typo in a subnet mask and a device can't talk to
anything. **DHCP (Dynamic Host Configuration Protocol)** automates that entire handoff: a device
joins the network, asks, and gets fully configured within a second or two, with no human involved.

## The real process: DORA

DHCP isn't a single request-and-response — it's a four-step exchange, and the acronym for it is
worth memorizing cold: **DORA**.

1. **Discover** — the device, which has no IP address yet, broadcasts a DHCPDISCOVER to the entire
   local network (destination `255.255.255.255`), essentially asking "is there a DHCP server out
   there?"
2. **Offer** — a DHCP server on that network replies with a DHCPOFFER, proposing a specific IP
   address and the rest of the configuration it would hand out.
3. **Request** — the device replies with a DHCPREQUEST, formally asking to actually use the offered
   address (this step matters because more than one DHCP server might have offered — the device is
   explicitly saying which offer it's accepting, and every server on the segment sees that
   broadcast).
4. **Acknowledge** — the server confirms with a DHCPACK, and the device is now configured and can
   start using that address immediately.

```
Client                                   DHCP Server
  | ---- DHCPDISCOVER (broadcast) ----->   |
  | <---- DHCPOFFER -------------------  |
  | ---- DHCPREQUEST (broadcast) ------>   |
  | <---- DHCPACK ----------------------  |
```

All four messages are broadcasts in the initial exchange — the client doesn't have an IP address
yet, so it has no way to send a normal unicast packet, and it needs every DHCP server on the
segment to see the Request so a server whose offer wasn't chosen knows to let that address go.

## What a DHCP server actually hands out

A DHCP offer isn't just an IP address — it's a full configuration bundle, typically including:

| Field | Purpose |
|---|---|
| IP address | The actual address the device will use |
| Subnet mask | Defines which addresses are "local" vs. require routing |
| Default gateway | The router address for traffic leaving the subnet |
| DNS server(s) | Which resolver(s) the device should query for name lookups |
| Lease time | How long this configuration is valid before it must be renewed |

That last field, **lease time**, is why DHCP addresses are called "dynamic" in the first place —
the assignment isn't permanent.

## Lease time: why addresses expire and get renewed

A DHCP lease is granted for a fixed duration — commonly 24 hours on a home router, often longer on
a corporate network. Well before the lease expires (typically at the 50% mark), the device quietly
tries to **renew** it directly with the server that issued it, usually getting the same address
back without the full DORA exchange or any visible interruption. If that renewal fails and the
lease fully expires, the device has to start over with a fresh DHCPDISCOVER, and may land on a
different IP address than before.

This matters in practice: if you ever see a device's IP address change between reboots, lease
expiration (or a router restart that cleared the DHCP server's lease table) is usually why.

## When you'd configure an IP by hand instead

DHCP isn't used for everything. A server, a printer with a fixed network share, or a router's own
management interface is usually given a **static IP** instead — configured by hand once, so its
address never changes and other devices can reliably find it by that fixed address. DHCP is the
default for end-user devices precisely because their addresses don't need to be predictable;
static IPs are reserved for the handful of devices where predictability matters more than
convenience.

## Key terms

| Term | Meaning |
|---|---|
| DHCP | Dynamic Host Configuration Protocol — automatically assigns IP configuration to a device |
| DORA | Discover, Offer, Request, Acknowledge — the four-step DHCP exchange |
| Lease time | How long a DHCP-assigned configuration is valid before it must be renewed |
| Static IP | An IP address configured by hand, so it never changes — used for servers, printers, and network gear |

## Check yourself

Why are all four messages in the DORA exchange sent as broadcasts, even though a DHCP server is
specifically replying to one particular device?
