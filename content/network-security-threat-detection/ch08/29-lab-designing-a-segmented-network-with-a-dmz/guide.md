# Lesson 29 — Lab: Designing a Segmented Network with a DMZ

**Chapter 8 · Capstone: Building a Layered Threat Detection Program · Lesson 29 of 32**

## What you'll learn

- How to lay out a perimeter firewall, a DMZ, and internal VLANs as one coherent design instead
  of three separate decisions
- Why a public-facing web server belongs in the DMZ and never on the internal network, even
  behind a firewall rule
- How to write the actual allow/deny rules between zones — perimeter-to-DMZ, DMZ-to-internal,
  and internal-to-internal — so each one defaults to deny
- Why Guest Wi-Fi needs its own VLAN with zero route to anything internal, not just a password

## The scenario

Castellan Retail is a mid-sized online retailer: a public order-tracking storefront, an office
full of staff workstations, a small server room, and a guest Wi-Fi network for visitors. Right
now everything sits on one flat network, and the public web server shares a subnet with the
payroll file share. This lab designs the layout that should have existed from day one, using
nothing but Chapter 1's firewall and segmentation concepts applied to one real company.

## Step 1: the perimeter firewall, three interfaces

The design starts with a single firewall holding three interfaces instead of two: **WAN**
(facing the ISP), **DMZ**, and **Internal**. This is the three-legged firewall layout from
Lesson 3 — one physical device enforcing the boundary between all three zones, rather than a
single inbound/outbound rule set that has to pretend the public web server and the payroll file
share are equally trustworthy.

```
WAN  --- [ Perimeter Firewall ] --- DMZ (web server, reverse proxy)
                   |
              Internal (VLANs 10/20/30)
```

## Step 2: the DMZ holds exactly one thing — public-facing servers

Castellan's order-tracking web server moves into the DMZ, alone with its reverse proxy. Nothing
else goes there. The point of a DMZ, from Lesson 3, is that a server the public internet can
reach is assumed to be reachable by an attacker eventually — so it's isolated in a zone that has
no direct path to payroll data, HR records, or the domain controller, even if that server is
fully compromised.

## Step 3: rules between WAN and DMZ

| Rule | Source | Destination | Action |
|---|---|---|---|
| 1 | Any (Internet) | DMZ web server, tcp/80, tcp/443 | Allow |
| 2 | Any (Internet) | DMZ, anything else | Deny |

Only the two ports the storefront actually needs are open, and only to the one host that needs
them — not the whole DMZ subnet.

## Step 4: internal VLANs, three zones with three purposes

The internal network splits into VLANs trunked off the core switch: **VLAN 10 — Workstations**
(staff machines), **VLAN 20 — Servers** (file server, domain controller, internal order
database), and **VLAN 30 — Guest Wi-Fi**. This is Lesson 4's segmentation strategy: a
compromised workstation on VLAN 10 should never be one hop from the domain controller on VLAN
20, and a visitor on the guest network should never be one hop from either.

## Step 5: the DMZ-to-internal rule — the one everyone gets wrong

The order-tracking web server needs *some* internal data (order status), which is where most
flat-network designs quietly undo their own DMZ by opening broad access back in. The correct
rule is narrow on every axis:

| Rule | Source | Destination | Action |
|---|---|---|---|
| 3 | DMZ web server (single host) | Internal order DB (single host), tcp/1433 | Allow |
| 4 | DMZ, anything else | Internal, anything else | Deny |

Host to host, one port, nothing else — not "DMZ subnet to internal subnet," which would let a
compromised web server reach everything on VLAN 20.

## Step 6: Guest Wi-Fi gets isolation, not just a password

VLAN 30 gets a rule permitting outbound Internet access and an explicit deny to VLANs 10 and 20
in both directions. A guest network is not a weaker internal network — it has no internal route
at all, so a compromised guest device can't reach a single Castellan asset no matter what
credentials it somehow obtained.

## Key terms

| Term | Meaning |
|---|---|
| Three-legged firewall | One firewall with separate WAN, DMZ, and internal interfaces, enforcing all inter-zone traffic |
| DMZ | An isolated segment for public-facing servers, with no default path to internal resources |
| Host-to-host rule | A firewall rule scoped to specific IPs, not whole subnets — the narrowest exception a DMZ exception should ever be |
| VLAN segmentation | Splitting one physical network into logical broadcast domains by purpose (workstations, servers, guest) |

## Check yourself

The DMZ-to-internal rule in Step 5 is scoped to one host, one port, instead of "DMZ subnet to
internal subnet." If the web server is fully compromised, what does that narrow scoping actually
prevent an attacker from doing next?
