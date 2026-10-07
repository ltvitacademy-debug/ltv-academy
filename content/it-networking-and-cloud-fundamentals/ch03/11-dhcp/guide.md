# DHCP

Every laptop, phone, and server on a network needs an IP address before it can send a single packet, but almost nobody types one in by hand anymore. The Dynamic Host Configuration Protocol, DHCP, is what hands a device an address automatically the moment it joins the network — along with the other settings it needs to actually be useful, like which DNS server to use and which router is the gateway out.

## What you'll learn

- Why networks use DHCP instead of assigning IP addresses by hand
- The four-step DORA process a device goes through to get an address
- What a DHCP lease is, and what happens when it expires or is renewed
- Why a fixed IP, or "reservation," is still sometimes needed even with DHCP in place

## Why DHCP exists

Imagine Northbridge Retail's distribution center bringing on 40 new warehouse scanners in a single afternoon. Assigning each one an IP address by hand — and keeping a spreadsheet of who has what, so two devices never collide on the same address — doesn't scale and invites mistakes. DHCP removes that entirely: a device joins the network, asks for an address, and a DHCP server hands one out automatically from a pool it manages, along with the subnet mask, default gateway, and DNS server the device should use.

## The DORA process

Every DHCP address assignment follows the same four-message exchange, commonly remembered as DORA:

1. **Discover** — the new device broadcasts a message onto the local network asking, in effect, "is there a DHCP server out there?" It doesn't have an address yet, so this goes out to everyone.
2. **Offer** — a DHCP server on the network responds with an offer: a specific available IP address, plus the lease terms and configuration that would come with it.
3. **Request** — the device broadcasts back, formally asking to take that specific offered address. Broadcasting the request (rather than a private reply) also tells any other DHCP server on the network that this address is now taken.
4. **Acknowledge** — the DHCP server confirms the assignment. The device is now configured and can start sending traffic.

## Leases, renewal, and reservations

A DHCP-assigned address isn't permanent — it's leased for a set period, often 24 hours on an office network. Partway through the lease, the device quietly asks the same server to renew it, and normally gets the same address back without going through the full DORA exchange again. If a device is offline when its lease expires and doesn't renew, the address returns to the pool and can be handed to someone else.

That flexibility is usually exactly what's wanted, but not always. Northbridge Retail's checkout service runs on a server that other systems need to reach by a predictable, unchanging address — if DHCP quietly handed it a different IP after a lease expired, every system pointing at the old address would break. For cases like that, network admins set up a **DHCP reservation**: the server is still configured through DHCP, but it's tied to the device's hardware (MAC) address, so it always receives the exact same IP address on every renewal.

## Key terms

| Term | Meaning |
|---|---|
| DHCP | The protocol that automatically assigns IP addresses and network settings to devices |
| DORA | The four-step exchange — Discover, Offer, Request, Acknowledge — used to assign an address |
| Lease | The time period a device is allowed to keep a DHCP-assigned address before renewing |
| Reservation | A DHCP configuration that always assigns the same IP address to a specific device's MAC address |
