# Capstone: Build It

The last lesson laid out the brief and the symptom. This one walks through actually building the office network end-to-end, and applying the troubleshooting methodology to find exactly where the connection to the cloud-hosted inventory system is breaking.

## What you'll learn

- How to turn the office's requirements into an actual addressing plan
- How to apply the identify-isolate-test-resolve methodology to the broken scenario from the last lesson
- Where the fault in this specific scenario actually turns out to be
- How firewall rules and VPN configuration both had to agree for the fix to work

## Building the addressing plan

With roughly 50 devices to support, a `/26` subnet (64 addresses, 62 usable) comfortably covers the office with room to grow, carved out of Northbridge Retail's larger private address space. Workstations and printers get addresses handed out automatically by DHCP; the office's local servers get static addresses reserved outside the DHCP pool, so they don't risk getting reassigned.

```
Office subnet:     10.20.4.0/26      (62 usable addresses)
DHCP pool:          10.20.4.10 - 10.20.4.60
Static reservations: 10.20.4.2 - 10.20.4.9   (local servers)
```

## Applying the methodology

Chapter 5 laid out a structured approach for exactly this kind of problem, and this is where it earns its keep:

1. **Identify** — the symptom is precise: the cloud inventory system times out from this office specifically, while it's reachable from every other office and every other local resource works fine. That already rules out a problem with the inventory system itself or with general office connectivity.
2. **Isolate** — a `ping` to the inventory system's IP address from inside the office fails, but a `ping` to the VPN gateway itself succeeds. The VPN tunnel is up, just like the teammate said — the problem is something past the tunnel, not the tunnel itself.
3. **Test** — checking the firewall's outbound rules at the office's edge turns up the actual issue: a rule written for the deadline allows traffic to the checkout service's IP range, but was never updated to also include the inventory system's IP range when it was added later.
4. **Resolve** — adding the missing rule for the inventory system's address range restores connectivity immediately.

## Why "the VPN is up" wasn't wrong, but also wasn't the whole picture

This is the exact trap Chapter 5 warned about: a single true statement ("the VPN is up") got treated as proof that the whole path was fine, when a VPN tunnel being up only guarantees connectivity through the tunnel itself — not that every device on the other end is actually allowed to send traffic through it. The firewall rule sitting in front of that tunnel was a separate, independent control, and it was the one actually blocking traffic.

## Key terms

| Term | Meaning |
|---|---|
| /26 subnet | A subnet with 64 total addresses (62 usable), sized for roughly 50-60 devices |
| Static reservation | An address deliberately excluded from the DHCP pool for a server that shouldn't change |
| Outbound firewall rule | A rule controlling what traffic is allowed to leave a network toward a specific destination |
| Isolate (methodology step) | Narrowing down which specific segment of a path is failing, rather than guessing at the whole thing |
