# Lesson 6 — IPv6 Addressing Fundamentals

**Chapter 2 · Networking Fundamentals II · Lesson 6 of 32**

## What you'll learn

- Why IPv6 exists and the scale of its address space
- How to read and shorten IPv6 addresses correctly
- The difference between IPv6 address types: unicast, multicast, and link-local
- Why IPv6 has no broadcast address at all

## Why IPv6 exists

IPv4's 32-bit address space provides about 4.3 billion possible addresses — a number
that looked enormous in the 1980s and was effectively exhausted at the regional
registry level years ago. IPv6 solves this with a 128-bit address space: roughly
340 undecillion addresses (340 followed by 36 zeros), enough to assign a vast number of
addresses to every device, indefinitely.

## Reading an IPv6 address

A full IPv6 address is written as eight groups of four hexadecimal digits, separated by
colons:

```
2001:0db8:0000:0000:0000:ff00:0042:8329
```

Two shortening rules make this manageable:

1. **Leading zeros in each group can be dropped**: `0db8` becomes `db8`, `0042` becomes
   `42`.
2. **One run of consecutive all-zero groups can be replaced with `::`** (double colon) —
   but only once per address, since using it twice would make the address ambiguous.

Applying both rules: `2001:0db8:0000:0000:0000:ff00:0042:8329` becomes
`2001:db8::ff00:42:8329`.

## IPv6 address types

**Unicast** addresses identify a single interface — the IPv6 equivalent of a normal IPv4
address assigned to one device.

**Multicast** addresses (always starting with `ff00::/8`) identify a group of
interfaces; a packet sent to a multicast address is delivered to every member of that
group. IPv6 uses multicast for functions IPv4 handled with broadcast.

**Link-local** addresses (always starting with `fe80::/10`) are automatically
self-assigned on every IPv6-enabled interface and are only valid on that local network
segment — they're never routed. Every IPv6 interface has one, used heavily for
neighbor discovery (IPv6's replacement for ARP).

## No broadcast address

This is one of the most important differences from IPv4: **IPv6 has no broadcast
address at all.** Anything IPv4 did with a broadcast — like ARP requests or DHCP
discovery — IPv6 does with multicast instead, sent only to the specific group of
interfaces that actually need to receive it, rather than flooding every device on the
segment. This is a deliberate efficiency improvement, not an oversight.

## Why this matters for a SOC analyst

IPv6 is increasingly the default on modern operating systems, often running
side-by-side with IPv4 even on networks that "don't use IPv6" intentionally — a
misconfigured or forgotten IPv6 stack is a real, documented attack surface, since
security controls built only around IPv4 (an IPv4-only firewall rule set, for example)
can leave an IPv6 path completely unmonitored. Recognizing `fe80::`, `ff00::`, and a
normal global unicast address on sight is a baseline skill for reading any modern packet
capture or log.

## Key terms

| Term | Meaning |
|---|---|
| IPv6 | 128-bit addressing standard with roughly 340 undecillion possible addresses |
| :: (double colon) | Shorthand for one run of consecutive all-zero groups in an IPv6 address — usable only once per address |
| Link-local address | Self-assigned `fe80::/10` address, valid only on the local segment, never routed |
| Multicast | Delivers a packet to a defined group of interfaces — IPv6's replacement for IPv4 broadcast |

## Check yourself

Why can the `::` shorthand only be used once in a single IPv6 address, even if there are
two separate runs of all-zero groups?
