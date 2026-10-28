# Lesson 23 — Network Attacks: MITM, DoS/DDoS, and Spoofing

**Chapter 6 · Common Attack Types & Social Engineering · Lesson 23 of 32**

## What you'll learn

- How a Man-in-the-Middle attack intercepts traffic between two parties who think they're talking directly
- The real difference between a DoS and a DDoS attack, and why that distinction matters for defense
- How IP spoofing and ARP spoofing forge a source identity, and what each one is used for
- Practical indicators that point a SOC analyst toward each of these attack types

## Man-in-the-Middle: a silent third party

A **Man-in-the-Middle (MITM)** attack happens when an attacker secretly positions
themselves between two parties who believe they're communicating directly with each
other, intercepting — and potentially altering — the traffic passing between them.
Neither side necessarily notices anything wrong, because the attacker can relay the
conversation along in both directions while reading (or modifying) everything that
passes through. A classic setup is an attacker on an unsecured public Wi-Fi network
intercepting traffic between a user's laptop and the legitimate access point, which is
exactly why sensitive traffic should always be protected by HTTPS or a VPN rather than
trusted to the network itself — encryption is what makes intercepted traffic useless to
the attacker even when the interception succeeds.

## DoS vs. DDoS: one source versus many

A **Denial of Service (DoS)** attack floods a target — a server, a service, an entire
network — with so much traffic or so many requests that it can no longer respond to
legitimate users. The defining trait of a DoS attack is that it comes from a **single
source**. A **Distributed Denial of Service (DDoS)** attack has the identical goal
(overwhelm the target so legitimate traffic can't get through) but the traffic comes
from **many sources at once** — typically a botnet of hundreds or thousands of
compromised devices spread across the internet, all directed at the same target
simultaneously. That distributed nature is exactly what makes DDoS so much harder to
defend against: blocking one IP address does nothing when the next thousand requests
are each coming from a different one.

## Spoofing: forging a source identity

**Spoofing** is the general technique of forging the source information in a
communication to make it appear as if it came from somewhere — or someone — else. Two
common forms show up constantly in network security:

- **IP spoofing** forges the source IP address in a packet, making traffic appear to
  originate from a trusted or different address than it actually did. It's used both to
  evade source-based filtering and as a building block in some DoS techniques.
- **ARP spoofing** (also called ARP poisoning) sends falsified Address Resolution
  Protocol messages on a local network, tricking devices into associating the
  attacker's MAC address with the IP address of a legitimate device, like the default
  gateway. That misdirection is a common way attackers set up a Man-in-the-Middle
  position on a local network in the first place.

## Watching for the signs

Each of these attacks leaves indicators a defender can watch for: a sudden spike in
ARP table changes or duplicate IP/MAC mappings points toward ARP spoofing and a possible
MITM setup in progress; a flood of traffic from one consistent source IP points toward
DoS, while the same flood arriving from thousands of unrelated, geographically scattered
IPs points toward DDoS; and unexpected certificate warnings or an HTTPS connection that
silently downgrades to HTTP is a strong sign that a MITM attack is actively intercepting
a session.

## Key terms

| Term | Meaning |
|---|---|
| Man-in-the-Middle (MITM) | An attacker secretly intercepts traffic between two parties who believe they're communicating directly |
| Denial of Service (DoS) | Flooding a target from a single source until it can't serve legitimate users |
| Distributed Denial of Service (DDoS) | The same goal as DoS, but traffic floods in from many sources at once, usually a botnet |
| Spoofing | Forging source information (IP address, MAC address) to impersonate a trusted origin |
| ARP spoofing | Falsifying ARP messages to associate an attacker's MAC address with a legitimate device's IP |

## Check yourself

A target suddenly receives an overwhelming flood of traffic, but every packet traces
back to the exact same source IP address. Is this most consistent with a DoS or a DDoS
attack, and what specific detail tells you which one?
