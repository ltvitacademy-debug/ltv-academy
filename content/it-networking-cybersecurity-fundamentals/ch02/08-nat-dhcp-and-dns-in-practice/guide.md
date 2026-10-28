# Lesson 8 — NAT, DHCP, and DNS in Practice

**Chapter 2 · Networking Fundamentals II · Lesson 8 of 32**

## What you'll learn

- What NAT does and why nearly every home and office network uses it
- How DHCP automatically assigns IP addresses, and the four-step process behind it
- How DNS translates names into IP addresses
- How these three services work together every time a device connects to the internet

## NAT: Network Address Translation

Private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) are reserved for use
inside private networks and are never routable on the public internet. **Network
Address Translation (NAT)** is what lets dozens, hundreds, or thousands of devices on a
private network all share a single public IP address: as traffic leaves the network, the
router rewrites the source IP (and tracks the original port) so return traffic knows
which internal device to go back to.

This is also why NAT functions as an incidental, informal first layer of protection —
an unsolicited inbound connection from the internet has no existing NAT table entry to
match against, so it simply has nowhere to go. That's a side effect of how NAT works,
not a substitute for an actual firewall, but it's a real part of why a typical home
network isn't directly reachable from the internet by default.

## DHCP: Dynamic Host Configuration Protocol

Manually typing an IP address, subnet mask, gateway, and DNS server into every device
doesn't scale. **DHCP** automates this with a four-step exchange, remembered as
**DORA**:

```
Discover   The client broadcasts: "Is any DHCP server out there?"
Offer      A DHCP server responds: "Here's an IP address you can use."
Request    The client broadcasts: "I'll take that IP address, please."
Acknowledge The server confirms: "Confirmed — it's yours for this lease time."
```

The server hands out an address from a defined pool, for a limited **lease time** — the
client has to renew before the lease expires or risk losing that address to another
device. A **rogue DHCP server** — an unauthorized device answering DHCP requests with
false information — is a real, documented attack technique that can redirect victims'
traffic through an attacker-controlled gateway.

## DNS: Domain Name System

Humans use names; computers route by IP address. **DNS** is the distributed system that
translates one into the other — when you type a domain name, your device queries a DNS
resolver, which (if it doesn't already have the answer cached) walks a hierarchy of
servers to find the authoritative answer, then caches it for a defined time-to-live
(TTL) so it doesn't have to repeat that lookup on every single request.

DNS is also a frequent attack surface: **DNS spoofing/cache poisoning** feeds a resolver
a false answer so victims are silently redirected to an attacker's server instead of the
real one, and **DNS tunneling** smuggles data inside DNS queries/responses to evade
network controls that don't inspect DNS traffic closely. Recognizing unusual DNS query
volume or patterns is a real, practical SOC detection skill.

## How they work together

When a laptop joins a Wi-Fi network: DHCP (DORA) assigns it an IP address, subnet mask,
default gateway, and DNS server address. When the user opens a browser and types a
website name, DNS resolves that name to an IP address. When the laptop sends traffic to
that IP address out to the internet, NAT rewrites the source address so the response can
find its way back. Three separate services, one seamless (when it works) user
experience — and three separate places where something can quietly go wrong.

## Key terms

| Term | Meaning |
|---|---|
| NAT | Rewrites private source IPs to a shared public IP as traffic leaves a network, and reverses it for return traffic |
| DORA | DHCP's four-step process: Discover, Offer, Request, Acknowledge |
| Rogue DHCP server | An unauthorized device answering DHCP requests with false information, redirecting victims' traffic |
| DNS cache poisoning | Feeding a DNS resolver a false answer so victims are silently redirected to an attacker's server |

## Check yourself

Why does a brand-new unsolicited connection attempt from the internet have "nowhere to
go" on a typical NAT'd home network, even without a dedicated firewall blocking it?
